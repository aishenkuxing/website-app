/*!
 * jQuery UI Support for jQuery core 1.7.x @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 */
//>>label: jQuery 1.7 Support
//>>group: Core
//>>description: Support version 1.7.x of jQuery core
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],t):
// Browser globals
t(jQuery)}(function($){
// Support: jQuery 1.7 only
// Not a great way to check versions, but since we only support 1.7+ and only
// need to detect <1.8, this is a simple check that should suffice. Checking
// for "1.7." would be a bit safer, but the version string is 1.7, not 1.7.0
// and we'll never reach 1.70.0 (if we do, we certainly won't be supporting
// 1.7 anymore). See #11197 for why we're not using feature detection.
"1.7"===$.fn.jquery.substring(0,3)&&(
// Setters for .innerWidth(), .innerHeight(), .outerWidth(), .outerHeight()
// Unlike jQuery Core 1.8+, these only support numeric values to set the
// dimensions in pixels
$.each(["Width","Height"],function(t,n){function i(t,n,i,r){return $.each(e,function(){n-=parseFloat($.css(t,"padding"+this))||0,i&&(n-=parseFloat($.css(t,"border"+this+"Width"))||0),r&&(n-=parseFloat($.css(t,"margin"+this))||0)}),n}var e="Width"===n?["Left","Right"]:["Top","Bottom"],r=n.toLowerCase(),h={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};$.fn["inner"+n]=function(t){return void 0===t?h["inner"+n].call(this):this.each(function(){$(this).css(r,i(this,t)+"px")})},$.fn["outer"+n]=function(t,e){return"number"!=typeof t?h["outer"+n].call(this,t):this.each(function(){$(this).css(r,i(this,t,!0,e)+"px")})}}),$.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))})});