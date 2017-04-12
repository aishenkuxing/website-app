/*!
 * jQuery UI Effects Fade @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Fade Effect
//>>group: Effects
//>>description: Fades the element.
//>>docs: http://api.jqueryui.com/fade-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("fade","toggle",function(e,n){var i="show"===e.mode;$(this).css("opacity",i?0:1).animate({opacity:i?1:0},{queue:!1,duration:e.duration,easing:e.easing,complete:n})})});