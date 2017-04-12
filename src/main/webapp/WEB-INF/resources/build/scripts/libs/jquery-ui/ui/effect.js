/*!
 * jQuery UI Effects @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Effects Core
//>>group: Effects
// jscs:disable maximumLineLength
//>>description: Extends the internal jQuery effects. Includes morphing and easing. Required by all other effects.
// jscs:enable maximumLineLength
//>>docs: http://api.jqueryui.com/category/effects-core/
//>>demos: http://jqueryui.com/effect/
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],t):
// Browser globals
t(jQuery)}(function($){var t="ui-effects-animated",
// Create a local jQuery because jQuery Color relies on it and the
// global may not exist with AMD and a custom build (#10199)
e=$;/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
/******************************************************************************/
/****************************** CLASS ANIMATIONS ******************************/
/******************************************************************************/
/******************************************************************************/
/*********************************** EFFECTS **********************************/
/******************************************************************************/
/******************************************************************************/
/*********************************** EASING ***********************************/
/******************************************************************************/
return $.effects={effect:{}},function(t,e){function n(t,e,n){var r=u[e.type]||{};
// ~~ is an short way of doing floor for positive numbers
// IE will pass in empty strings as value for alpha,
// which will hit this case
return null==t?n||!e.def?null:e.def:(t=r.floor?~~t:parseFloat(t),isNaN(t)?e.def:r.mod?(t+r.mod)%r.mod:0>t?0:r.max<t?r.max:t)}function r(e){var n=f(),r=n._rgba=[];
// Found a stringParser that handled it
// Found a stringParser that handled it
// If this came from a parsed string, force "transparent" when alpha is 0
// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
return e=e.toLowerCase(),p(a,function(t,i){var o,s=i.re.exec(e),a=s&&i.parse(s),f=i.space||"rgba";if(a)
// Exit each( stringParsers ) here because we matched
// If this was an rgba parse the assignment might happen twice
// oh well....
return o=n[f](a),n[c[f].cache]=o[c[f].cache],r=n._rgba=o._rgba,!1}),r.length?("0,0,0,0"===r.join()&&t.extend(r,o.transparent),n):o[e]}
// Hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021
function i(t,e,n){return n=(n+1)%1,6*n<1?t+(e-t)*n*6:2*n<1?e:3*n<2?t+(e-t)*(2/3-n)*6:t}var
// Colors = jQuery.Color.names
o,
// Plusequals test for += 100 -= 100
s=/^([\-+])=\s*(\d+\.?\d*)/,
// A set of RE's that can match strings and generate color tuples.
a=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{
// This regex ignores A-F because it's compared against an already lowercased string
re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{
// This regex ignores A-F because it's compared against an already lowercased string
re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],
// JQuery.Color( )
f=t.Color=function(e,n,r,i){return new t.Color.fn.parse(e,n,r,i)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},l=f.support={},
// Element for support tests
d=t("<p>")[0],
// Local aliases of functions called often
p=t.each;
// Determine rgba support immediately
d.style.cssText="background-color:rgba(1,1,1,.5)",l.rgba=d.style.backgroundColor.indexOf("rgba")>-1,
// Define cache name and alpha properties
// for rgba and hsla spaces
p(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),f.fn=t.extend(f.prototype,{parse:function(e,i,s,a){if(void 0===e)return this._rgba=[null,null,null,null],this;(e.jquery||e.nodeType)&&(e=t(e).css(i),i=void 0);var u=this,l=t.type(e),d=this._rgba=[];
// More than 1 argument specified - assume ( red, green, blue, alpha )
return void 0!==i&&(e=[e,i,s,a],l="array"),"string"===l?this.parse(r(e)||o._default):"array"===l?(p(c.rgba.props,function(t,r){d[r.idx]=n(e[r.idx],r)}),this):"object"===l?(e instanceof f?p(c,function(t,n){e[n.cache]&&(u[n.cache]=e[n.cache].slice())}):p(c,function(r,i){var o=i.cache;p(i.props,function(t,r){
// If the cache doesn't exist, and we know how to convert
if(!u[o]&&i.to){
// If the value was null, we don't need to copy it
// if the key was alpha, we don't need to copy it either
if("alpha"===t||null==e[t])return;u[o]=i.to(u._rgba)}
// This is the only case where we allow nulls for ALL properties.
// call clamp with alwaysAllowEmpty
u[o][r.idx]=n(e[t],r,!0)}),
// Everything defined but alpha?
u[o]&&t.inArray(null,u[o].slice(0,3))<0&&(
// Use the default of 1
u[o][3]=1,i.from&&(u._rgba=i.from(u[o])))}),this):void 0},is:function(t){var e=f(t),n=!0,r=this;return p(c,function(t,i){var o,s=e[i.cache];return s&&(o=r[i.cache]||i.to&&i.to(r._rgba)||[],p(i.props,function(t,e){if(null!=s[e.idx])return n=s[e.idx]===o[e.idx]})),n}),n},_space:function(){var t=[],e=this;return p(c,function(n,r){e[r.cache]&&t.push(n)}),t.pop()},transition:function(t,e){var r=f(t),i=r._space(),o=c[i],s=0===this.alpha()?f("transparent"):this,a=s[o.cache]||o.to(s._rgba),l=a.slice();return r=r[o.cache],p(o.props,function(t,i){var o=i.idx,s=a[o],f=r[o],c=u[i.type]||{};
// If null, don't override start value
null!==f&&(
// If null - use end
null===s?l[o]=f:(c.mod&&(f-s>c.mod/2?s+=c.mod:s-f>c.mod/2&&(s-=c.mod)),l[o]=n((f-s)*e+s,i)))}),this[i](l)},blend:function(e){
// If we are already opaque - return ourself
if(1===this._rgba[3])return this;var n=this._rgba.slice(),r=n.pop(),i=f(e)._rgba;return f(t.map(n,function(t,e){return(1-r)*i[e]+r*t}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===n[3]&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(t,e){
// Catch 1 and 2
return null==t&&(t=e>2?1:0),e&&e<3&&(t=Math.round(100*t)+"%"),t});return 1===n[3]&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(255*r)),"#"+t.map(n,function(t){
// Default to 0 when nulls exist
return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),f.fn.parse.prototype=f.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,n,r=t[0]/255,i=t[1]/255,o=t[2]/255,s=t[3],a=Math.max(r,i,o),f=Math.min(r,i,o),c=a-f,u=a+f,l=.5*u;
// Chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
return e=f===a?0:r===a?60*(i-o)/c+360:i===a?60*(o-r)/c+120:60*(r-i)/c+240,n=0===c?0:l<=.5?c/u:c/(2-u),[Math.round(e)%360,n,l,null==s?1:s]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],r=t[2],o=t[3],s=r<=.5?r*(1+n):r+n-r*n,a=2*r-s;return[Math.round(255*i(a,s,e+1/3)),Math.round(255*i(a,s,e)),Math.round(255*i(a,s,e-1/3)),o]},p(c,function(e,r){var i=r.props,o=r.cache,a=r.to,c=r.from;
// Makes rgba() and hsla()
f.fn[e]=function(e){if(
// Generate a cache for this space if it doesn't exist
a&&!this[o]&&(this[o]=a(this._rgba)),void 0===e)return this[o].slice();var r,s=t.type(e),u="array"===s||"object"===s?e:arguments,l=this[o].slice();return p(i,function(t,e){var r=u["object"===s?t:e.idx];null==r&&(r=l[e.idx]),l[e.idx]=n(r,e)}),c?(r=f(c(l)),r[o]=l,r):f(l)},
// Makes red() green() blue() alpha() hue() saturation() lightness()
p(i,function(n,r){
// Alpha is included in more than one space
f.fn[n]||(f.fn[n]=function(i){var o,a=t.type(i),f="alpha"===n?this._hsla?"hsla":"rgba":e,c=this[f](),u=c[r.idx];return"undefined"===a?u:("function"===a&&(i=i.call(this,u),a=t.type(i)),null==i&&r.empty?this:("string"===a&&(o=s.exec(i))&&(i=u+parseFloat(o[2])*("+"===o[1]?1:-1)),c[r.idx]=i,this[f](c)))})})}),
// Add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
f.hook=function(e){p(e.split(" "),function(e,n){t.cssHooks[n]={set:function(e,i){var o,s,a="";if("transparent"!==i&&("string"!==t.type(i)||(o=r(i)))){if(i=f(o||i),!l.rgba&&1!==i._rgba[3]){for(s="backgroundColor"===n?e.parentNode:e;(""===a||"transparent"===a)&&s&&s.style;)try{a=t.css(s,"backgroundColor"),s=s.parentNode}catch(t){}i=i.blend(a&&"transparent"!==a?a:"_default")}i=i.toRgbaString()}try{e.style[n]=i}catch(t){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=f(e.elem,n),e.end=f(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}})},f.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),t.cssHooks.borderColor={expand:function(t){var e={};return p(["Top","Right","Bottom","Left"],function(n,r){e["border"+r+"Color"]=t}),e}},
// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
o=t.Color.names={
// 4.1. Basic color keywords
aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",
// 4.2.3. "transparent" color keyword
transparent:[null,null,null,0],_default:"#ffffff"}}(e),function(){function t(t){var e,n,r=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,i={};if(r&&r.length&&r[0]&&r[r[0]])for(n=r.length;n--;)e=r[n],"string"==typeof r[e]&&(i[$.camelCase(e)]=r[e]);else for(e in r)"string"==typeof r[e]&&(i[e]=r[e]);return i}function n(t,e){var n,r,o={};for(n in e)r=e[n],t[n]!==r&&(i[n]||!$.fx.step[n]&&isNaN(parseFloat(r))||(o[n]=r));return o}var r=["add","remove","toggle"],i={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};$.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,n){$.fx.step[n]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(e.style(t.elem,n,t.end),t.setAttr=!0)}}),
// Support: jQuery <1.8
$.fn.addBack||($.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),$.effects.animateClass=function(e,i,o,s){var a=$.speed(i,o,s);return this.queue(function(){var i,o=$(this),s=o.attr("class")||"",f=a.children?o.find("*").addBack():o;
// Map the animated objects to store the original styles.
f=f.map(function(){return{el:$(this),start:t(this)}}),
// Apply class change
i=function(){$.each(r,function(t,n){e[n]&&o[n+"Class"](e[n])})},i(),
// Map all animated objects again - calculate new styles and diff
f=f.map(function(){return this.end=t(this.el[0]),this.diff=n(this.start,this.end),this}),
// Apply original class
o.attr("class",s),
// Map all animated objects again - this time collecting a promise
f=f.map(function(){var t=this,e=$.Deferred(),n=$.extend({},a,{queue:!1,complete:function(){e.resolve(t)}});return this.el.animate(this.diff,n),e.promise()}),
// Once all animations have completed:
$.when.apply($,f.get()).done(function(){
// Set the final class
i(),
// For each animated element,
// clear all css properties that were animated
$.each(arguments,function(){var t=this.el;$.each(this.diff,function(e){t.css(e,"")})}),
// This is guarnteed to be there if you use jQuery.speed()
// it also handles dequeuing the next anim...
a.complete.call(o[0])})})},$.fn.extend({addClass:function(t){return function(e,n,r,i){return n?$.effects.animateClass.call(this,{add:e},n,r,i):t.apply(this,arguments)}}($.fn.addClass),removeClass:function(t){return function(e,n,r,i){return arguments.length>1?$.effects.animateClass.call(this,{remove:e},n,r,i):t.apply(this,arguments)}}($.fn.removeClass),toggleClass:function(t){return function(e,n,r,i,o){return"boolean"==typeof n||void 0===n?r?$.effects.animateClass.call(this,n?{add:e}:{remove:e},r,i,o):t.apply(this,arguments):$.effects.animateClass.call(this,{toggle:e},n,r,i)}}($.fn.toggleClass),switchClass:function(t,e,n,r,i){return $.effects.animateClass.call(this,{add:e,remove:t},n,r,i)}})}(),function(){
// Return an effect options object for the given parameters:
function e(t,e,n,r){
// Allow passing all options as the first parameter
// Convert to an object
// Catch (effect, null, ...)
// Catch (effect, callback)
// Catch (effect, speed, ?)
// Catch (effect, options, callback)
// Add options to effect
return $.isPlainObject(t)&&(e=t,t=t.effect),t={effect:t},null==e&&(e={}),$.isFunction(e)&&(r=e,n=null,e={}),("number"==typeof e||$.fx.speeds[e])&&(r=n,n=e,e={}),$.isFunction(n)&&(r=n,n=null),e&&$.extend(t,e),n=n||e.duration,t.duration=$.fx.off?0:"number"==typeof n?n:n in $.fx.speeds?$.fx.speeds[n]:$.fx.speeds._default,t.complete=r||e.complete,t}function n(t){
// Valid standard speeds (nothing, number, named speed)
// Valid standard speeds (nothing, number, named speed)
// Invalid strings - treat as "normal" speed
// Complete callback
return!(t&&"number"!=typeof t&&!$.fx.speeds[t])||("string"==typeof t&&!$.effects.effect[t]||(!!$.isFunction(t)||"object"==typeof t&&!t.effect))}function r(t,e){var n=e.outerWidth(),r=e.outerHeight(),i=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,o=i.exec(t)||["",0,n,r,0];return{top:parseFloat(o[1])||0,right:"auto"===o[2]?n:parseFloat(o[2]),bottom:"auto"===o[3]?r:parseFloat(o[3]),left:parseFloat(o[4])||0}}$.expr&&$.expr.filters&&$.expr.filters.animated&&($.expr.filters.animated=function(e){return function(n){return!!$(n).data(t)||e(n)}}($.expr.filters.animated)),$.uiBackCompat!==!1&&$.extend($.effects,{
// Saves a set of properties in a data storage
save:function(t,e){for(var n=0,r=e.length;n<r;n++)null!==e[n]&&t.data("ui-effects-"+e[n],t[0].style[e[n]])},
// Restores a set of previously saved properties from a data storage
restore:function(t,e){for(var n,r=0,i=e.length;r<i;r++)null!==e[r]&&(n=t.data("ui-effects-"+e[r]),t.css(e[r],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},
// Wraps the element around a wrapper that copies position properties
createWrapper:function(t){
// If the element is already wrapped, return it
if(t.parent().is(".ui-effects-wrapper"))return t.parent();
// Wrap the element
var e={width:t.outerWidth(!0),height:t.outerHeight(!0),float:t.css("float")},n=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),
// Store the size in case width/height are defined in % - Fixes #5245
r={width:t.width(),height:t.height()},i=document.activeElement;
// Support: Firefox
// Firefox incorrectly exposes anonymous content
// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
try{i.id}catch(t){i=document.body}
// Fixes #7595 - Elements lose focus when wrapped.
// Hotfix for jQuery 1.4 since some change in wrap() seems to actually
// lose the reference to the wrapped element
// Transfer positioning properties to the wrapper
return t.wrap(n),(t[0]===i||$.contains(t[0],i))&&$(i).trigger("focus"),n=t.parent(),"static"===t.css("position")?(n.css({position:"relative"}),t.css({position:"relative"})):($.extend(e,{position:t.css("position"),zIndex:t.css("z-index")}),$.each(["top","left","bottom","right"],function(n,r){e[r]=t.css(r),isNaN(parseInt(e[r],10))&&(e[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(r),n.css(e).show()},removeWrapper:function(t){var e=document.activeElement;
// Fixes #7595 - Elements lose focus when wrapped.
return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===e||$.contains(t[0],e))&&$(e).trigger("focus")),t}}),$.extend($.effects,{version:"@VERSION",define:function(t,e,n){return n||(n=e,e="effect"),$.effects.effect[t]=n,$.effects.effect[t].mode=e,n},scaledDimensions:function(t,e,n){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var r="horizontal"!==n?(e||100)/100:1,i="vertical"!==n?(e||100)/100:1;return{height:t.height()*i,width:t.width()*r,outerHeight:t.outerHeight()*i,outerWidth:t.outerWidth()*r}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},
// Injects recently queued functions to be first in line (after "inprogress")
unshift:function(t,e,n){var r=t.queue();e>1&&r.splice.apply(r,[1,0].concat(r.splice(e,n))),t.dequeue()},saveStyle:function(t){t.data("ui-effects-style",t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data("ui-effects-style")||"",t.removeData("ui-effects-style")},mode:function(t,e){var n=t.is(":hidden");return"toggle"===e&&(e=n?"show":"hide"),(n?"hide"===e:"show"===e)&&(e="none"),e},
// Translates a [top,left] array into a baseline value
getBaseline:function(t,e){var n,r;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=t[1]/e.width}return{x:r,y:n}},
// Creates a placeholder element so that the original element can be made absolute
createPlaceholder:function(t){var e,n=t.css("position"),r=t.position();
// Lock in margins first to account for form elements, which
// will change margin if you explicitly set height
// see: http://jsfiddle.net/JZSMt/3/ https://bugs.webkit.org/show_bug.cgi?id=107380
// Support: Safari
return t.css({marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),/^(static|relative)/.test(n)&&(n="absolute",e=$("<"+t[0].nodeName+">").insertAfter(t).css({
// Convert inline to inline block to account for inline elements
// that turn to inline block based on content (like img)
display:/^(inline|ruby)/.test(t.css("display"))?"inline-block":"block",visibility:"hidden",
// Margins need to be set to account for margin collapse
marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight"),float:t.css("float")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),t.data("ui-effects-placeholder",e)),t.css({position:n,left:r.left,top:r.top}),e},removePlaceholder:function(t){var e="ui-effects-placeholder",n=t.data(e);n&&(n.remove(),t.removeData(e))},
// Removes a placeholder if it exists and restores
// properties that were modified during placeholder creation
cleanUp:function(t){$.effects.restoreStyle(t),$.effects.removePlaceholder(t)},setTransition:function(t,e,n,r){return r=r||{},$.each(e,function(e,i){var o=t.cssUnit(i);o[0]>0&&(r[i]=o[0]*n+o[1])}),r}}),$.fn.extend({effect:function(){function n(e){function n(){a.removeData(t),$.effects.cleanUp(a),"hide"===r.mode&&a.hide(),s()}function s(){$.isFunction(f)&&f.call(a[0]),$.isFunction(e)&&e()}var a=$(this);
// Override mode option on a per element basis,
// as toggle can be either show or hide depending on element state
r.mode=u.shift(),$.uiBackCompat===!1||o?"none"===r.mode?(
// Call the core method to track "olddisplay" properly
a[c](),s()):i.call(a[0],r,n):(a.is(":hidden")?"hide"===c:"show"===c)?(
// Call the core method to track "olddisplay" properly
a[c](),s()):i.call(a[0],r,s)}var r=e.apply(this,arguments),i=$.effects.effect[r.effect],o=i.mode,s=r.queue,a=s||"fx",f=r.complete,c=r.mode,u=[],l=function(e){var n=$(this),r=$.effects.mode(n,c)||o;
// Sentinel for duck-punching the :animated psuedo-selector
n.data(t,!0),
// Save effect mode for later use,
// we can't just call $.effects.mode again later,
// as the .show() below destroys the initial state
u.push(r),
// See $.uiBackCompat inside of run() for removal of defaultMode in 1.13
o&&("show"===r||r===o&&"hide"===r)&&n.show(),o&&"none"===r||$.effects.saveStyle(n),$.isFunction(e)&&e()};
// Delegate to the original method (e.g., .show()) if possible
return $.fx.off||!i?c?this[c](r.duration,f):this.each(function(){f&&f.call(this)}):s===!1?this.each(l).each(n):this.queue(a,l).queue(a,n)},show:function(t){return function(r){if(n(r))return t.apply(this,arguments);var i=e.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}($.fn.show),hide:function(t){return function(r){if(n(r))return t.apply(this,arguments);var i=e.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}($.fn.hide),toggle:function(t){return function(r){if(n(r)||"boolean"==typeof r)return t.apply(this,arguments);var i=e.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}($.fn.toggle),cssUnit:function(t){var e=this.css(t),n=[];return $.each(["em","px","%","pt"],function(t,r){e.indexOf(r)>0&&(n=[parseFloat(e),r])}),n},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):r(this.css("clip"),this)},transfer:function(t,e){var n=$(this),r=$(t.to),i="fixed"===r.css("position"),o=$("body"),s=i?o.scrollTop():0,a=i?o.scrollLeft():0,f=r.offset(),c={top:f.top-s,left:f.left-a,height:r.innerHeight(),width:r.innerWidth()},u=n.offset(),l=$("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(t.className).css({top:u.top-s,left:u.left-a,height:n.innerHeight(),width:n.innerWidth(),position:i?"fixed":"absolute"}).animate(c,t.duration,t.easing,function(){l.remove(),$.isFunction(e)&&e()})}}),$.fx.step.clip=function(t){t.clipInit||(t.start=$(t.elem).cssClip(),"string"==typeof t.end&&(t.end=r(t.end,t.elem)),t.clipInit=!0),$(t.elem).cssClip({top:t.pos*(t.end.top-t.start.top)+t.start.top,right:t.pos*(t.end.right-t.start.right)+t.start.right,bottom:t.pos*(t.end.bottom-t.start.bottom)+t.start.bottom,left:t.pos*(t.end.left-t.start.left)+t.start.left})}}(),function(){
// Based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
var t={};$.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),$.extend(t,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),$.each(t,function(t,e){$.easing["easeIn"+t]=e,$.easing["easeOut"+t]=function(t){return 1-e(1-t)},$.easing["easeInOut"+t]=function(t){return t<.5?e(2*t)/2:1-e(t*-2+2)/2}})}(),$.effects});