/*!
 * jQuery UI Effects Blind @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Blind Effect
//>>group: Effects
//>>description: Blinds the element.
//>>docs: http://api.jqueryui.com/blind-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("blind","hide",function(e,t){var i={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},o=$(this),n=e.direction||"up",c=o.cssClip(),f={clip:$.extend({},c)},l=$.effects.createPlaceholder(o);f.clip[i[n][0]]=f.clip[i[n][1]],"show"===e.mode&&(o.cssClip(f.clip),l&&l.css($.effects.clipToBox(f)),f.clip=c),l&&l.animate($.effects.clipToBox(f),e.duration,e.easing),o.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:t})})});