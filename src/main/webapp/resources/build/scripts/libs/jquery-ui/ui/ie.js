!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],e):
// Browser globals
e(jQuery)}(function($){
// This file is deprecated
return $.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())});