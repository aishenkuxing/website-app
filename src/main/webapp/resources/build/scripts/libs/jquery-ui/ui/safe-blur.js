!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],e):
// Browser globals
e(jQuery)}(function($){return $.ui.safeBlur=function(e){
// Support: IE9 - 10 only
// If the <body> is blurred, IE will switch windows, see #9420
e&&"body"!==e.nodeName.toLowerCase()&&$(e).trigger("blur")}});