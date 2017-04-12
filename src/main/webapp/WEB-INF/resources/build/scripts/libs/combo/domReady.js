/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */
define(function(){"use strict";function n(n){var e;for(e=0;e<n.length;e+=1)n[e](r)}function e(){var e=u;l&&e.length&&(u=[],n(e))}/**
     * Sets the page as loaded.
     */
function t(){l||(l=!0,c&&clearInterval(c),e())}/** START OF PUBLIC API **/
/**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
function o(n){return l?n(r):u.push(n),o}var d,i,c,a="undefined"!=typeof window&&window.document,l=!a,r=a?document:null,u=[];if(a){if(document.addEventListener)
//Standards. Hooray! Assumption here that if standards based,
//it knows about DOMContentLoaded.
document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1);else if(window.attachEvent){window.attachEvent("onload",t),i=document.createElement("div");try{d=null===window.frameElement}catch(n){}
//DOMContentLoaded approximation that uses a doScroll, as found by
//Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
//but modified by other contributors, including jdalton
i.doScroll&&d&&window.external&&(c=setInterval(function(){try{i.doScroll(),t()}catch(n){}},30))}
//Check if document already complete, and if so, just trigger page load
//listeners. Latest webkit browsers also use "interactive", and
//will fire the onDOMContentLoaded before "interactive" but not after
//entering "interactive" or "complete". More details:
//http://dev.w3.org/html5/spec/the-end.html#the-end
//http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
//Hmm, this is more complicated on further use, see "firing too early"
//bug: https://github.com/requirejs/domReady/issues/1
//so removing the || document.readyState === "interactive" test.
//There is still a window.onload binding that should get fired if
//DOMContentLoaded is missed.
"complete"===document.readyState&&t()}/** END OF PUBLIC API **/
/**
     * Loader Plugin API method
     */
return o.version="2.0.1",o.load=function(n,e,t,d){d.isBuild?t(null):o(t)},o});