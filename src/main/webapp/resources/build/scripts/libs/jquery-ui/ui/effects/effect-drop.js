/*!
 * jQuery UI Effects Drop @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Drop Effect
//>>group: Effects
//>>description: Moves an element in one direction and hides it at the same time.
//>>docs: http://api.jqueryui.com/drop-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("drop","hide",function(e,t){var i,n=$(this),o=e.mode,f="show"===o,c=e.direction||"left",d="up"===c||"down"===c?"top":"left",u="up"===c||"left"===c?"-=":"+=",r="+="===u?"-=":"+=",a={opacity:0};$.effects.createPlaceholder(n),i=e.distance||n["top"===d?"outerHeight":"outerWidth"](!0)/2,a[d]=u+i,f&&(n.css(a),a[d]=r+i,a.opacity=1),
// Animate
n.animate(a,{queue:!1,duration:e.duration,easing:e.easing,complete:t})})});