!function(n){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],n):
// Browser globals
n(jQuery)}(function($){
// Support: IE8 Only
// IE8 does not support the form attribute and when it is supplied. It overwrites the form prop
// with a string, so we need to find the proper form.
return $.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):$(this[0].form)}});