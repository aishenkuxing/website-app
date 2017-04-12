/*!
 * jQuery UI Effects Highlight @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Highlight Effect
//>>group: Effects
//>>description: Highlights the background of an element in a defined color for a custom duration.
//>>docs: http://api.jqueryui.com/highlight-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("highlight","show",function(e,n){var o=$(this),f={backgroundColor:o.css("backgroundColor")};"hide"===e.mode&&(f.opacity=0),$.effects.saveStyle(o),o.css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:n})})});