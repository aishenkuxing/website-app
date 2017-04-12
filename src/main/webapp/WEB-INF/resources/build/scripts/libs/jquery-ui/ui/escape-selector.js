!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],e):
// Browser globals
e(jQuery)}(function($){
// Internal use only
return $.ui.escapeSelector=function(){return function(e){return e.replace(/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g,"\\$1")}}()});