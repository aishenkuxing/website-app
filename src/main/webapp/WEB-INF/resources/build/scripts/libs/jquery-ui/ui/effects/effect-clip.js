/*!
 * jQuery UI Effects Clip @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Clip Effect
//>>group: Effects
//>>description: Clips the element on and off like an old TV.
//>>docs: http://api.jqueryui.com/clip-effect/
//>>demos: http://jqueryui.com/effect/
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],t):
// Browser globals
t(jQuery)}(function($){return $.effects.define("clip","hide",function(t,e){var i,o={},n=$(this),c=t.direction||"vertical",f="both"===c,r=f||"horizontal"===c,l=f||"vertical"===c;i=n.cssClip(),o.clip={top:l?(i.bottom-i.top)/2:i.top,right:r?(i.right-i.left)/2:i.right,bottom:l?(i.bottom-i.top)/2:i.bottom,left:r?(i.right-i.left)/2:i.left},$.effects.createPlaceholder(n),"show"===t.mode&&(n.cssClip(o.clip),o.clip=i),n.animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:e})})});