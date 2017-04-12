/*!
 * jQuery UI Effects Pulsate @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Pulsate Effect
//>>group: Effects
//>>description: Pulsates an element n times by changing the opacity to zero and back.
//>>docs: http://api.jqueryui.com/pulsate-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("pulsate","show",function(e,i){var n=$(this),t=e.mode,f="show"===t,s="hide"===t,o=f||s,
// Showing or hiding leaves off the "last" animation
u=2*(e.times||5)+(o?1:0),a=e.duration/u,c=0,d=1,r=n.queue().length;
// Anims - 1 opacity "toggles"
for(!f&&n.is(":visible")||(n.css("opacity",0).show(),c=1);d<u;d++)n.animate({opacity:c},a,e.easing),c=1-c;n.animate({opacity:c},a,e.easing),n.queue(i),$.effects.unshift(n,r,u+1)})});