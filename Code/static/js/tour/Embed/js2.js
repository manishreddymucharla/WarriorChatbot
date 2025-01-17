(function (window, scriptUrl, baseUrl, imgAssetsUrl, options) {
	// ignore cache busting logic for testing enviroment
	if (!isLocalEnviroment()) {
		var freshScript = document.getElementById("vt_fresh_script");
		if (options.sourceDomain && options.sourceDomain != window.location.host) {
			if (!freshScript) {
				// Bust the client cache if visitor changes domains. 
				var head = document.getElementsByTagName("head")[0];
				var script = document.createElement('script');
				script.id = "vt_fresh_script";
				script.src = baseUrl + "tour/Embed/js3?src=" + encodeURI(window.location.href);
				head.appendChild(script);
				return;
			}
		}
	}
	if (window.vt_initialized === undefined) {
		window.vt_initialized = false;
	} else {
		return;
	}

	var links = null,
		timer = -1,
		isIE = isIE(),
		runChecks = isIE == false;

	function isIE() {
		var tridentSearch = 'trident/';
		var msieSearch = 'msie ';
		var ua = navigator.userAgent.toLowerCase();


		// SEARCH FOR TRIDENT AND MSIE IN UA STRING
		var ti = ua.indexOf(tridentSearch);
		var mi = ua.indexOf(msieSearch);
		if (ti === -1 && mi === -1) { return false; }

		// GET VERSIONS AS INTEGERS
		var trident = 0, msie = 0;
		if (ti !== -1) { trident = parseInt(ua.substr(ti + tridentSearch.length, 3)); }
		if (mi !== -1) { msie = parseInt(ua.substr(mi + msieSearch.length, 3)); }

		// RETURNS IE VERSION FROM ENGINE VERSION COMPARED TO MSIE VERSION
		return Math.max(trident + 4, msie);
	}

	function isSupported() {
		var ua = navigator.userAgent.toLowerCase();

		if (options.uaIgnoreList && options.uaIgnoreList.length) {
			for (var index = 0; index < options.uaIgnoreList.length; index++) {
				if (ua.indexOf(options.uaIgnoreList[index].toLowerCase()) >= 0) {
					return true
				}
			}
		}

		return !(isIE == 6 || isIE == 7 || isIE == 8)

	}

	function isLocalEnviroment() {
		return options !== undefined && options.is_local_host_override === "TRUE";
	}

	function isMobile() {
		var check = false;
		(function (a, b) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|ad|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	}

	function addProtocol(url) {
		if (url.indexOf("http") !== 0) {
			url = window.location.protocol + url;
		}
		return url;
	}

	function addEvent(obj, evType, fn) {
		if (obj.addEventListener) { obj.addEventListener(evType, fn, false); return true }
		else if (obj.attachEvent) { var r = obj.attachEvent('on' + evType, fn); return r }
		else { return false }
	}

	function getElementsByClassName(node, classname) {
		if (node.getElementsByClassName !== undefined) {
			return node.getElementsByClassName(classname);
		}
		var a = [],
			re = new RegExp('(^| )' + classname + '( |$)'),
			els = node.getElementsByTagName("*");
		for (var i = 0, j = els.length; i < j; i++)
			if (re.test(els[i].className)) a.push(els[i]);
		return a;
	}

	function immediateLaunch() {
		var url = window.location.href.valueOf();
		var currentUrl = url;
		currentUrl = currentUrl.toLowerCase();

		if (currentUrl.indexOf("#virtualtour") > -1 && hasTourOnPage()) {
			if (window.history.replaceState !== undefined) {
				window.history.replaceState({ 'launching': false }, '', url.replace(/#virtualtour/ig, ''));
				window.history.pushState({ 'launching': true }, '', url);

			}

			var overlay = document.createElement("div"),
				windowHeight = window.innerHeight || document.documentElement.clientHeight,
				windowWidth = window.innerWidth || document.documentElement.clientWidth;
			if (windowHeight === 0) {
				windowHeight = document.documentElement.scrollHeight;
			}
			if (windowWidth === 0) {
				windowWidth = document.documentElement.scrollWidth;
			}

			overlay.id = "virtualtour_mask_overlay";
			overlay.style.position = "fixed";
			overlay.style.width = "100%";
			overlay.style.height = "100%";
			overlay.style.top = "0px";
			overlay.style.left = "0px";
			overlay.style.backgroundColor = "#000";
			overlay.style.backgroundImage = "url('" + imgAssetsUrl + "loadingLarge.gif'), url('" + baseUrl + "Assets/svg/logo.svg')";
			overlay.style.backgroundRepeat = "no-repeat, no-repeat";
			overlay.style.backgroundPosition = "50% calc(50% - 80px) , 50% calc(50% + 10px)";
			overlay.style.backgroundSize = "75px, 200px";
			overlay.style.zIndex = 99999999;

			document.body.appendChild(overlay);
			initialize(true);
			return true;
		}
		return false;
	}

	function initialize(immediateLaunch) {
		if (window.vt_initialized) return;
		window.vt_initialized = true;

		if (timer != -1) {
			clearTimeout(timer);
		}

		link = getLinks();

		baseUrl = addProtocol(baseUrl);
		imgAssetsUrl = addProtocol(imgAssetsUrl);
		scriptUrl = addProtocol(scriptUrl);

		window.vt_base_url = baseUrl;
		window.vt_image_assets_url = imgAssetsUrl;
		window.vt_run_checks = runChecks;
		window.vt_options = {
			"legacy": isIE == 8,
			"isMobile": isMobile(),
			"supported": isSupported(),
			"vhostSupported": isSupported(),
			"nonThirdPartyKeys": options !== undefined ? options.nonThirdPartyKeys : null,
			"imageFrameUrl": options !== undefined ? options.imageFrameUrl : null,
			"immersiveFrameUrl": options !== undefined ? options.immersiveFrameUrl : null,
			"hasCookieConsent": options !== undefined ? options.hasCookieConsent : true,
			"embed": options !== undefined ? options.embed : '',
			"ab_type": options !== undefined ? options.ab_type : '',
			"institutionsToHide": options !== undefined ? options.institutionsToHide : '',
			"locationsToHide": options !== undefined ? options.locationsToHide : '',
			// added this to resolve for 360 pano institutions
			"inst_without_360_pano": options !== undefined ? options.inst_without_360 : "",
			"ip_address": options !== undefined ? options.ip_address : "",
			"user_key": options !== undefined ? options.user_key : "",
			"estid": options !== undefined ? options.estid : "",
			"is_spa": options !== undefined ? options.is_spa : false,
			"ext_user_id": options !== undefined ? options.ext_user_id : "",
			"ext_partner_id": options !== undefined ? options.ext_partner_id : "",
			"source": options !== undefined ? options.source : "", // resolved source from inst id resolver,
			"cif_path": options !== undefined ? options.cif_path : "",
			//the following are overrides from js script query string
			"data_platform": options !== undefined ? options.data_platform : "",
			"utm_campaign": options !== undefined ? options.utm_campaign : "",
		}
		// if already set manually by client don't over ride with server
		var server_instid = options !== undefined ? options.yv_instid : undefined;
		window.yv_instid = window.yv_instid !== undefined ? window.yv_instid : server_instid;
		// resolve the detect js url
		window.yv_detect_js_url = options !== undefined ? options.yv_detect_js_url : undefined;
		window.vt_immediateLaunch = immediateLaunch;

		// when running locally smart script will ask for globals from the controller
		// not the other way around !
		if (!isLocalEnviroment()) {
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement('script');
			script.src = scriptUrl;
			head.appendChild(script);
		}


	}

	function getLinks() {
		if (links === null) {
			var allLinks = document.links;

			links = [];

			for (var i = 0; i < allLinks.length; i++) {
				if ((allLinks[i].href && allLinks[i].href.indexOf("/vte/") >= 0) || (allLinks[i].className && allLinks[i].className.indexOf("virtualtour_embed") >= 0)) {
					links.push(allLinks[i]);
				}
			}

			if (links.length === 0) {
				links = null;
			}
		}
		return links;
	}

	function hasTourOnPage() {
		var links = getLinks()
		return links && links.length > 0
	}

	function precheck() {
		links = getLinks();
		if (links !== null) {
			for (var i = 0; i < links.length; i++) {
				links[i].onclick = function () { return false; };
			}
		}
		initialize(false);
		timer = -1;
	}

	if (!immediateLaunch()) {
		timer = setTimeout(precheck, 100);
		addEvent(window, "load", function () { initialize(false) });
	}
})(window, 'https://www.youvisit.com/SmartScript/latest/smartscript.js?v=2024.9.2', 'https://www.youvisit.com/', 'https://cdn.youvisit.com/Assets/img/', {
    "nonThirdPartyKeys": [
        "v",
        "w",
        "f",
        "wa",
        "eseab",
        "wisr",
        "cappex"
    ],
    "imageFrameUrl": "https:\/\/cdn.youvisit.com\/tour\/Embed\/imageFrame?v=2024.9.2",
    "immersiveFrameUrl": "https:\/\/cdn.youvisit.com\/tour\/Embed\/immersiveIcon?v=2024.9.2&ab=",
    "ab_type": null,
    "embed": "543229710457548862",
    "hasCookieConsent": true,
    "institutionsToHide": "[60301,60417,60706,60807,60872,61014,61653,63093,63239,63906,120181,120231,121432,138396,139115,139147,139348,139387,139487,139493,139499,139508]",
    "locationsToHide": "[142298,142584,142521,142526,142551,142573,144481,144482,144483,143031,142612,142722,143637,144192,144193,144194,144195,144196,144197,144198,144199,144200,142550,141622,142302,142829,142582,141148,141157,141180,142989,143500,144525,144431,142574,144239,144240,144241,144242,144243,144244,142312,142567,142442,142392,142393,142263,142265,142266,142267,142653,142846,144515,142476,142477,142539,142540,142546,142297,142361,142152,142155,142929,142436,142437,142786,142787,142788,142789,142790,142791,142792,142793,142794,142795,142796,142797,142798,142799,142800,142801,142802,142803,142804,142805,143535,142699,142700,142701,142703,142704,142705,142706,142299,142300,142301,143926,143927,143928,143929,143930,142557,144203,144204,144205,144206,144207,144208,144209,144210,144211,144212,141883,144371,144170,144171,144172,144173,144174,144175,144176,144177,144178,144179,144180,144181,144182,144183,144184,144185,142403,142589,142590,142693,142710,142963,144411,142577,142578,142479,144435,142604,142960,142397,142399,142400,142305,142625,142924,142161,142236,142268,143551,142373,142642,142643,142644,143293,143295,141330,142343,142344,142676,143750,143751,144132,144246,144247,144248,144249,144250]",
    "yv_instid": "-10",
    "inst_without_360": [
        "-10",
        "61412",
        "64045",
        "72484",
        "88860",
        "89064",
        "62171",
        "64073",
        "99337",
        "115631",
        "60126",
        "105521",
        "59859",
        "62202",
        "92821",
        "78454",
        "64141",
        "80615",
        "59908",
        "60150",
        "62396",
        "80702",
        "62982",
        "63493",
        "59921",
        "63572",
        "119778",
        "63578",
        "90526",
        "119862",
        "63610",
        "69768",
        "81039",
        "119939",
        "70806",
        "119940",
        "72337",
        "86248",
        "110010",
        "113909",
        "119941",
        "63710",
        "112960",
        "60018"
    ],
    "analyticsEndpoint": "https:",
    "analyticsSalt": "yv19",
    "yv_detect_js_url": "https:\/\/www.youvisit.com\/Assets\/js\/tour\/embed\/detect.js?v=2024.9.2",
    "user_key": "543229710457548862",
    "ip_address": "139.180.211.179",
    "estid": "",
    "ext_partner_id": "",
    "ext_user_id": "",
    "source": "vhost",
    "sourceDomain": "",
    "cif_path": "https:\/\/www.youvisit.com\/registration-app\/latest\/index.html",
    "data_platform": "",
    "utm_campaign": "",
    "uaIgnoreList": [
        "Siteimprove"
    ],
    "is_spa": false,
    "is_local_host_override": ""
});