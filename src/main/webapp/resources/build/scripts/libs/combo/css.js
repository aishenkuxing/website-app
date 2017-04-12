/*
 * Require-CSS RequireJS css! loader plugin
 * 0.1.8
 * Guy Bedford 2014
 * MIT
 */
/*
 *
 * Usage:
 *  require(['css!./mycssFile']);
 *
 * Tested and working in (up to latest versions as of March 2013):
 * Android
 * iOS 6
 * IE 6 - 10
 * Chome 3 - 26
 * Firefox 3.5 - 19
 * Opera 10 - 12
 * 
 * browserling.com used for virtual testing environment
 *
 * Credit to B Cavalier & J Hann for the IE 6 - 9 method,
 * refined with help from Martin Cermak
 * 
 * Sources that helped along the way:
 * - https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
 * - http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 * - https://github.com/cujojs/curl/blob/master/src/curl/plugin/css.js
 *
 */
define(function(){
//>>excludeStart('excludeRequireCss', pragmas.excludeRequireCss)
if("undefined"==typeof window)return{load:function(e,t,n){n()}};var e=document.getElementsByTagName("head")[0],t=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,n=!1,r=!0;
// trident / msie
t[1]||t[7]?n=parseInt(t[1])<6||parseInt(t[7])<=9:t[2]||t[8]?r=!1:t[4]&&(n=parseInt(t[4])<18);
//>>excludeEnd('excludeRequireCss')
//main api object
var o={};
//>>excludeStart('excludeRequireCss', pragmas.excludeRequireCss)
o.pluginBuilder="./css-builder";
// <style> @import load method
var i,a,s,l=function(){i=document.createElement("style"),e.appendChild(i),a=i.styleSheet||i.sheet},u=0,c=[],d=function(e){u++,32==u&&(l(),u=0),a.addImport(e),i.onload=function(){f()}},f=function(){s();var e=c.shift();if(!e)return void(s=null);s=e[1],d(e[0])},h=function(e,t){if(a&&a.addImport||l(),a&&a.addImport)
// old IE
s?c.push([e,t]):(d(e),s=t);else{
// old Firefox
i.textContent='@import "'+e+'";';var n=setInterval(function(){try{i.sheet.cssRules,clearInterval(n),t()}catch(e){}},10)}},p=function(t,n){var o=document.createElement("link");if(o.type="text/css",o.rel="stylesheet",r)o.onload=function(){o.onload=function(){},
// for style dimensions queries, a short delay can still be necessary
setTimeout(n,7)};else var i=setInterval(function(){for(var e=0;e<document.styleSheets.length;e++){if(document.styleSheets[e].href==o.href)return clearInterval(i),n()}},10);o.href=t,e.appendChild(o)};
//>>excludeEnd('excludeRequireCss')
//>>excludeEnd('excludeRequireCss')
//>>excludeStart('excludeRequireCss', pragmas.excludeRequireCss)
return o.normalize=function(e,t){return".css"==e.substr(e.length-4,4)&&(e=e.substr(0,e.length-4)),t(e)},o.load=function(e,t,r,o){(n?h:p)(t.toUrl(e+".css"),r)},o});