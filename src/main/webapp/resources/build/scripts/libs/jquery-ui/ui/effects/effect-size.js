/*!
 * jQuery UI Effects Size @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Size Effect
//>>group: Effects
//>>description: Resize an element to a specified width and height.
//>>docs: http://api.jqueryui.com/size-effect/
//>>demos: http://jqueryui.com/effect/
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],t):
// Browser globals
t(jQuery)}(function($){return $.effects.define("size",function(t,e){
// Create element
var o,i,f,n=$(this),
// Copy for children
s=["fontSize"],r=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],
// Set options
c=t.mode,a="effect"!==c,d=t.scale||"both",g=t.origin||["middle","center"],m=n.css("position"),u=n.position(),y=$.effects.scaledDimensions(n),p=t.from||y,l=t.to||$.effects.scaledDimensions(n,0);$.effects.createPlaceholder(n),"show"===c&&(f=p,p=l,l=f),
// Set scaling factor
i={from:{y:p.height/y.height,x:p.width/y.width},to:{y:l.height/y.height,x:l.width/y.width}},
// Scale the css box
"box"!==d&&"both"!==d||(
// Vertical props scaling
i.from.y!==i.to.y&&(p=$.effects.setTransition(n,r,i.from.y,p),l=$.effects.setTransition(n,r,i.to.y,l)),
// Horizontal props scaling
i.from.x!==i.to.x&&(p=$.effects.setTransition(n,h,i.from.x,p),l=$.effects.setTransition(n,h,i.to.x,l))),
// Scale the content
"content"!==d&&"both"!==d||
// Vertical props scaling
i.from.y!==i.to.y&&(p=$.effects.setTransition(n,s,i.from.y,p),l=$.effects.setTransition(n,s,i.to.y,l)),
// Adjust the position properties based on the provided origin points
g&&(o=$.effects.getBaseline(g,y),p.top=(y.outerHeight-p.outerHeight)*o.y+u.top,p.left=(y.outerWidth-p.outerWidth)*o.x+u.left,l.top=(y.outerHeight-l.outerHeight)*o.y+u.top,l.left=(y.outerWidth-l.outerWidth)*o.x+u.left),n.css(p),
// Animate the children if desired
"content"!==d&&"both"!==d||(r=r.concat(["marginTop","marginBottom"]).concat(s),h=h.concat(["marginLeft","marginRight"]),
// Only animate children with width attributes specified
// TODO: is this right? should we include anything with css width specified as well
n.find("*[width]").each(function(){var e=$(this),o=$.effects.scaledDimensions(e),f={height:o.height*i.from.y,width:o.width*i.from.x,outerHeight:o.outerHeight*i.from.y,outerWidth:o.outerWidth*i.from.x},n={height:o.height*i.to.y,width:o.width*i.to.x,outerHeight:o.height*i.to.y,outerWidth:o.width*i.to.x};
// Vertical props scaling
i.from.y!==i.to.y&&(f=$.effects.setTransition(e,r,i.from.y,f),n=$.effects.setTransition(e,r,i.to.y,n)),
// Horizontal props scaling
i.from.x!==i.to.x&&(f=$.effects.setTransition(e,h,i.from.x,f),n=$.effects.setTransition(e,h,i.to.x,n)),a&&$.effects.saveStyle(e),
// Animate children
e.css(f),e.animate(n,t.duration,t.easing,function(){
// Restore children
a&&$.effects.restoreStyle(e)})})),
// Animate
n.animate(l,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){var t=n.offset();0===l.opacity&&n.css("opacity",p.opacity),a||(n.css("position","static"===m?"relative":m).offset(t),
// Need to save style here so that automatic style restoration
// doesn't restore to the original styles from before the animation.
$.effects.saveStyle(n)),e()}})})});