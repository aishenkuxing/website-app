/*!
 * jQuery UI Effects Scale @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Scale Effect
//>>group: Effects
//>>description: Grows or shrinks an element and its content.
//>>docs: http://api.jqueryui.com/scale-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect","./effect-size"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("scale",function(e,f){
// Create element
var t=$(this),n=e.mode,i=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"effect"!==n?0:100),c=$.extend(!0,{from:$.effects.scaledDimensions(t),to:$.effects.scaledDimensions(t,i,e.direction||"both"),origin:e.origin||["middle","center"]},e);
// Fade option to support puff
e.fade&&(c.from.opacity=1,c.to.opacity=0),$.effects.effect.size.call(this,c,f)})});