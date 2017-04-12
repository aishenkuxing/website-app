/*!
 * jQuery UI Focusable @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: :focusable Selector
//>>group: Core
//>>description: Selects elements which can be focused.
//>>docs: http://api.jqueryui.com/focusable-selector/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],e):
// Browser globals
e(jQuery)}(function($){
// Support: IE 8 only
// IE 8 doesn't resolve inherit to visible/hidden for computed values
function e(e){for(var i=e.css("visibility");"inherit"===i;)e=e.parent(),i=e.css("visibility");return"hidden"!==i}
// Selectors
return $.ui.focusable=function(i,t){var n,a,r,s,o,u=i.nodeName.toLowerCase();
// Form controls within a disabled fieldset are disabled.
// However, controls within the fieldset's legend do not get disabled.
// Since controls generally aren't placed inside legends, we skip
// this portion of the check.
return"area"===u?(n=i.parentNode,a=n.name,!(!i.href||!a||"map"!==n.nodeName.toLowerCase())&&(r=$("img[usemap='#"+a+"']"),r.length>0&&r.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(u)?(s=!i.disabled)&&(o=$(i).closest("fieldset")[0])&&(s=!o.disabled):s="a"===u?i.href||t:t,s&&$(i).is(":visible")&&e($(i)))},$.extend($.expr[":"],{focusable:function(e){return $.ui.focusable(e,null!=$.attr(e,"tabindex"))}}),$.ui.focusable});