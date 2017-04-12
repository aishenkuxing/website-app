/*!
 * jQuery UI Effects Explode @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Explode Effect
//>>group: Effects
// jscs:disable maximumLineLength
//>>description: Explodes an element in all directions into n pieces. Implodes an element to its original wholeness.
// jscs:enable maximumLineLength
//>>docs: http://api.jqueryui.com/explode-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("explode","hide",function(e,i){
// Children animate complete:
function t(){w.push(this),w.length===l*h&&o()}function o(){p.css({visibility:"visible"}),$(w).remove(),i()}var s,n,f,d,c,a,l=e.pieces?Math.round(Math.sqrt(e.pieces)):3,h=l,p=$(this),r=e.mode,u="show"===r,
// Show and then visibility:hidden the element before calculating offset
v=p.show().css("visibility","hidden").offset(),
// Width and height of a piece
y=Math.ceil(p.outerWidth()/h),b=Math.ceil(p.outerHeight()/l),w=[];
// Clone the element for each row and cell.
for(s=0;s<l;s++)for(// ===>
d=v.top+s*b,a=s-(l-1)/2,n=0;n<h;n++)// |||
f=v.left+n*y,c=n-(h-1)/2,
// Create a clone of the now hidden main element that will be absolute positioned
// within a wrapper div off the -left and -top equal to size of our pieces
p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-n*y,top:-s*b}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:y,height:b,left:f+(u?c*y:0),top:d+(u?a*b:0),opacity:u?0:1}).animate({left:f+(u?0:c*y),top:d+(u?0:a*b),opacity:u?1:0},e.duration||500,e.easing,t)})});