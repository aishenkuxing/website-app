requirejs.config({
    baseUrl: '/resources/scripts',
    paths: {
      "mmPromise": "libs/avalon/mmPromise",
      "mmRequest": "libs/avalon/mmRequest",
      "avalon": "libs/avalon/avalon.shim",
	  "require": "libs/require/require",
      "domReady": "libs/require/domReady",
      "promise": "libs/require/requirejs-promise",
	  "text": "libs/combo/text",
	  "css": "libs/combo/css",
      "jquery": "libs/jquery",
      "jquery.json.min":"libs/jquery.json.min",
      "templates/widgets":"_templates/widgets"
    }
});