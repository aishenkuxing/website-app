!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],e):
// Browser globals
e(jQuery)}(function($){return $.ui.safeActiveElement=function(e){var n;
// Support: IE 9 only
// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
try{n=e.activeElement}catch(t){n=e.body}
// Support: IE 9 - 11 only
// IE may return null instead of an element
// Interestingly, this only seems to occur when NOT in an iframe
// Support: IE 11 only
// IE11 returns a seemingly empty object in some cases when accessing
// document.activeElement from an <iframe>
return n||(n=e.body),n.nodeName||(n=e.body),n}});