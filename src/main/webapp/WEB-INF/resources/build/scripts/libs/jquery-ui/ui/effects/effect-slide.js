/*!
 * jQuery UI Effects Slide @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Slide Effect
//>>group: Effects
//>>description: Slides an element in and out of the viewport.
//>>docs: http://api.jqueryui.com/slide-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("slide","show",function(e,t){var i,o,n=$(this),c={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},f=e.mode,s=e.direction||"left",l="up"===s||"down"===s?"top":"left",p="up"===s||"left"===s,r=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0),u={};$.effects.createPlaceholder(n),i=n.cssClip(),o=n.position()[l],
// Define hide animation
u[l]=(p?-1:1)*r+o,u.clip=n.cssClip(),u.clip[c[s][1]]=u.clip[c[s][0]],
// Reverse the animation if we're showing
"show"===f&&(n.cssClip(u.clip),n.css(l,u[l]),u.clip=i,u[l]=o),
// Actually animate
n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:t})})});