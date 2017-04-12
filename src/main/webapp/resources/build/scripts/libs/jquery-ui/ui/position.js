/*!
 * jQuery UI Position @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
//>>label: Position
//>>group: Core
//>>description: Positions elements relative to other elements.
//>>docs: http://api.jqueryui.com/position/
//>>demos: http://jqueryui.com/position/
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],t):
// Browser globals
t(jQuery)}(function($){return function(){function t(t,i,o){return[parseFloat(t[0])*(p.test(t[0])?i/100:1),parseFloat(t[1])*(p.test(t[1])?o/100:1)]}function i(t,i){return parseInt($.css(t,i),10)||0}function o(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:$.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}var e,n=Math.max,l=Math.abs,f=/left|center|right/,s=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,r=/^\w+/,p=/%$/,c=$.fn.position;$.position={scrollbarWidth:function(){if(void 0!==e)return e;var t,i,o=$("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),n=o.children()[0];return $("body").append(o),t=n.offsetWidth,o.css("overflow","scroll"),i=n.offsetWidth,t===i&&(i=o[0].clientWidth),o.remove(),e=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),o=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),e="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth;return{width:"scroll"===o||"auto"===o&&t.height<t.element[0].scrollHeight?$.position.scrollbarWidth():0,height:e?$.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=$(t||window),o=$.isWindow(i[0]),e=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:o,isDocument:e,offset:o||e?{left:0,top:0}:$(t).offset(),scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},$.fn.position=function(e){if(!e||!e.of)return c.apply(this,arguments);
// Make a copy, we don't want to modify arguments
e=$.extend({},e);var p,a,d,g,u,m,w=$(e.of),W=$.position.getWithinInfo(e.within),v=$.position.getScrollInfo(W),y=(e.collision||"flip").split(" "),H={};
// Force left top to allow flipping
// Clone to reuse original targetOffset later
// Force my and at to have valid horizontal and vertical positions
// if a value is missing or invalid, it will be converted to center
// Normalize collision option
return m=o(w),w[0].preventDefault&&(e.at="left top"),a=m.width,d=m.height,g=m.offset,u=$.extend({},g),$.each(["my","at"],function(){var t,i,o=(e[this]||"").split(" ");1===o.length&&(o=f.test(o[0])?o.concat(["center"]):s.test(o[0])?["center"].concat(o):["center","center"]),o[0]=f.test(o[0])?o[0]:"center",o[1]=s.test(o[1])?o[1]:"center",
// Calculate offsets
t=h.exec(o[0]),i=h.exec(o[1]),H[this]=[t?t[0]:0,i?i[0]:0],
// Reduce to just the positions without the offsets
e[this]=[r.exec(o[0])[0],r.exec(o[1])[0]]}),1===y.length&&(y[1]=y[0]),"right"===e.at[0]?u.left+=a:"center"===e.at[0]&&(u.left+=a/2),"bottom"===e.at[1]?u.top+=d:"center"===e.at[1]&&(u.top+=d/2),p=t(H.at,a,d),u.left+=p[0],u.top+=p[1],this.each(function(){var o,f,s=$(this),h=s.outerWidth(),r=s.outerHeight(),c=i(this,"marginLeft"),m=i(this,"marginTop"),b=h+c+i(this,"marginRight")+v.width,x=r+m+i(this,"marginBottom")+v.height,T=$.extend({},u),L=t(H.my,s.outerWidth(),s.outerHeight());"right"===e.my[0]?T.left-=h:"center"===e.my[0]&&(T.left-=h/2),"bottom"===e.my[1]?T.top-=r:"center"===e.my[1]&&(T.top-=r/2),T.left+=L[0],T.top+=L[1],o={marginLeft:c,marginTop:m},$.each(["left","top"],function(t,i){$.ui.position[y[t]]&&$.ui.position[y[t]][i](T,{targetWidth:a,targetHeight:d,elemWidth:h,elemHeight:r,collisionPosition:o,collisionWidth:b,collisionHeight:x,offset:[p[0]+L[0],p[1]+L[1]],my:e.my,at:e.at,within:W,elem:s})}),e.using&&(
// Adds feedback as second argument to using callback, if present
f=function(t){var i=g.left-T.left,o=i+a-h,f=g.top-T.top,p=f+d-r,c={target:{element:w,left:g.left,top:g.top,width:a,height:d},element:{element:s,left:T.left,top:T.top,width:h,height:r},horizontal:o<0?"left":i>0?"right":"center",vertical:p<0?"top":f>0?"bottom":"middle"};a<h&&l(i+o)<a&&(c.horizontal="center"),d<r&&l(f+p)<d&&(c.vertical="middle"),n(l(i),l(o))>n(l(f),l(p))?c.important="horizontal":c.important="vertical",e.using.call(this,t,c)}),s.offset($.extend(T,{using:f}))})},$.ui.position={fit:{left:function(t,i){var o,e=i.within,l=e.isWindow?e.scrollLeft:e.offset.left,f=e.width,s=t.left-i.collisionPosition.marginLeft,h=l-s,r=s+i.collisionWidth-f-l;
// Element is wider than within
i.collisionWidth>f?
// Element is initially over the left side of within
h>0&&r<=0?(o=t.left+h+i.collisionWidth-f-l,t.left+=h-o):t.left=r>0&&h<=0?l:h>r?l+f-i.collisionWidth:l:h>0?t.left+=h:r>0?t.left-=r:t.left=n(t.left-s,t.left)},top:function(t,i){var o,e=i.within,l=e.isWindow?e.scrollTop:e.offset.top,f=i.within.height,s=t.top-i.collisionPosition.marginTop,h=l-s,r=s+i.collisionHeight-f-l;
// Element is taller than within
i.collisionHeight>f?
// Element is initially over the top of within
h>0&&r<=0?(o=t.top+h+i.collisionHeight-f-l,t.top+=h-o):t.top=r>0&&h<=0?l:h>r?l+f-i.collisionHeight:l:h>0?t.top+=h:r>0?t.top-=r:t.top=n(t.top-s,t.top)}},flip:{left:function(t,i){var o,e,n=i.within,f=n.offset.left+n.scrollLeft,s=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,r=t.left-i.collisionPosition.marginLeft,p=r-h,c=r+i.collisionWidth-s-h,a="left"===i.my[0]?-i.elemWidth:"right"===i.my[0]?i.elemWidth:0,d="left"===i.at[0]?i.targetWidth:"right"===i.at[0]?-i.targetWidth:0,g=-2*i.offset[0];p<0?((o=t.left+a+d+g+i.collisionWidth-s-f)<0||o<l(p))&&(t.left+=a+d+g):c>0&&((e=t.left-i.collisionPosition.marginLeft+a+d+g-h)>0||l(e)<c)&&(t.left+=a+d+g)},top:function(t,i){var o,e,n=i.within,f=n.offset.top+n.scrollTop,s=n.height,h=n.isWindow?n.scrollTop:n.offset.top,r=t.top-i.collisionPosition.marginTop,p=r-h,c=r+i.collisionHeight-s-h,a="top"===i.my[1],d=a?-i.elemHeight:"bottom"===i.my[1]?i.elemHeight:0,g="top"===i.at[1]?i.targetHeight:"bottom"===i.at[1]?-i.targetHeight:0,u=-2*i.offset[1];p<0?((e=t.top+d+g+u+i.collisionHeight-s-f)<0||e<l(p))&&(t.top+=d+g+u):c>0&&((o=t.top-i.collisionPosition.marginTop+d+g+u-h)>0||l(o)<c)&&(t.top+=d+g+u)}},flipfit:{left:function(){$.ui.position.flip.left.apply(this,arguments),$.ui.position.fit.left.apply(this,arguments)},top:function(){$.ui.position.flip.top.apply(this,arguments),$.ui.position.fit.top.apply(this,arguments)}}}}(),$.ui.position});