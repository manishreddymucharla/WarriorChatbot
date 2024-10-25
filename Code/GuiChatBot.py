import re
from flask import Flask, render_template, request
from markupsafe import Markup
from BotDefinition import OpenAIBot
# from flask_cors import CORS

app = Flask(__name__, static_folder='static')
# CORS(app)

# Create chatbot instance
chatbot = OpenAIBot("gpt-4", "courses_data2.json")

# Define a regular expression pattern for detecting URLs
url_pattern = r'(https?://[^\s]+)'

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/chat', methods=['POST'])
def chat():
    # Get prompt from user
    prompt = request.form['prompt']

    # Input validation: check if prompt is empty
    if not prompt:
        return "Please enter a prompt."

    # User can stop the chat by sending 'End Chat' as a prompt
    if prompt.upper() == 'END CHAT':
        return 'END CHAT'

    try:
        # Generate the response from the chatbot
        response = chatbot.generate_response(prompt)

        # Ensure to strip out any pre-existing HTML tags (if any)
        response = re.sub(r'<.*?>', '', response)

        # Function to replace URLs with the 'Click here' hyperlink
        def replace_url(match):
            url = match.group(0)
            return f'<a href="{url}" target="_blank">link</a>'

        # Replace URLs with proper 'Click here' links
        response = re.sub(url_pattern, replace_url, response)

        # Return the response wrapped in Markup for safe HTML rendering
        return Markup(response)

    except Exception as e:
        # In case of any error, return a user-friendly message
        return f"An error occurred: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
