(async function() {
    const PANORAMA_SERVER_URL = 'https://panorama-api.yuja.com';
    const panoramaIdentifierKey = 'b100c89f3f5792322bac6e718d99aae81bda4d8e28d13dccf825ceef2d5220b0';
	const PANORAMA_CDN_URL = 'https://cdn-panorama.yuja.com';

    window.PANORAMA_SERVER_URL = PANORAMA_SERVER_URL;
    window.panoramaIdentifierKey = panoramaIdentifierKey;
	window.PANORAMA_CDN_URL = PANORAMA_CDN_URL;

    function loadScript(url) {
        const script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
    }

    try {
        const response = await fetch(`${PANORAMA_SERVER_URL}/panorama-visualizer/website-accessibility`, {cache: 'no-store'});
        const scriptUrl = await response.text();
        loadScript(scriptUrl);
    } catch (e) {
        console.error('Failed to load Panorama Website Accessibility: ', e);
    }
})();
