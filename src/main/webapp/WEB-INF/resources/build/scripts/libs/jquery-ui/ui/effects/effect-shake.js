/*!
 * jQuery UI Effects Shake @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Shake Effect
//>>group: Effects
//>>description: Shakes an element horizontally or vertically n times.
//>>docs: http://api.jqueryui.com/shake-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("shake",function(e,n){var t=1,i=$(this),a=e.direction||"left",f=e.distance||20,u=e.times||3,s=2*u+1,o=Math.round(e.duration/s),c="up"===a||"down"===a?"top":"left",r="up"===a||"left"===a,d={},m={},g={},h=i.queue().length;
// Shakes
for($.effects.createPlaceholder(i),
// Animation
d[c]=(r?"-=":"+=")+f,m[c]=(r?"+=":"-=")+2*f,g[c]=(r?"-=":"+=")+2*f,
// Animate
i.animate(d,o,e.easing);t<u;t++)i.animate(m,o,e.easing).animate(g,o,e.easing);i.animate(m,o,e.easing).animate(d,o/2,e.easing).queue(n),$.effects.unshift(i,h,s+1)})});