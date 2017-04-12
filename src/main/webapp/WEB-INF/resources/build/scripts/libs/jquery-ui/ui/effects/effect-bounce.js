/*!
 * jQuery UI Effects Bounce @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Bounce Effect
//>>group: Effects
//>>description: Bounces an element horizontally or vertically n times.
//>>docs: http://api.jqueryui.com/bounce-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("bounce",function(e,t){var i,n,o,f=$(this),
// Defaults:
a=e.mode,c="hide"===a,u="show"===a,s=e.direction||"up",d=e.distance,r=e.times||5,
// Number of internal animations
p=2*r+(u||c?1:0),h=e.duration/p,m=e.easing,
// Utility:
y="up"===s||"down"===s?"top":"left",l="up"===s||"left"===s,g=0,q=f.queue().length;
// Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
for($.effects.createPlaceholder(f),o=f.css(y),
// Default distance for the BIGGEST bounce is the outer Distance / 3
d||(d=f["top"===y?"outerHeight":"outerWidth"]()/3),u&&(n={opacity:1},n[y]=o,
// If we are showing, force opacity 0 and set the initial position
// then do the "first" animation
f.css("opacity",0).css(y,l?2*-d:2*d).animate(n,h,m)),
// Start at the smallest distance if we are hiding
c&&(d/=Math.pow(2,r-1)),n={},n[y]=o;g<r;g++)i={},i[y]=(l?"-=":"+=")+d,f.animate(i,h,m).animate(n,h,m),d=c?2*d:d/2;
// Last Bounce when Hiding
c&&(i={opacity:0},i[y]=(l?"-=":"+=")+d,f.animate(i,h,m)),f.queue(t),$.effects.unshift(f,q,p+1)})});