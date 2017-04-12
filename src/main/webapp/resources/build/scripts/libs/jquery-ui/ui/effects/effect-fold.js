/*!
 * jQuery UI Effects Fold @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Fold Effect
//>>group: Effects
//>>description: Folds an element first horizontally and then vertically.
//>>docs: http://api.jqueryui.com/fold-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("fold","hide",function(e,i){
// Create element
var t=$(this),n=e.mode,c="show"===n,f="hide"===n,o=e.size||15,s=/([0-9]+)%/.exec(o),a=!!e.horizFirst,l=a?["right","bottom"]:["bottom","right"],u=e.duration/2,p=$.effects.createPlaceholder(t),r=t.cssClip(),d={clip:$.extend({},r)},h={clip:$.extend({},r)},m=[r[l[0]],r[l[1]]],g=t.queue().length;s&&(o=parseInt(s[1],10)/100*m[f?0:1]),d.clip[l[0]]=o,h.clip[l[0]]=o,h.clip[l[1]]=0,c&&(t.cssClip(h.clip),p&&p.css($.effects.clipToBox(h)),h.clip=r),
// Animate
t.queue(function(i){p&&p.animate($.effects.clipToBox(d),u,e.easing).animate($.effects.clipToBox(h),u,e.easing),i()}).animate(d,u,e.easing).animate(h,u,e.easing).queue(i),$.effects.unshift(t,g,4)})});