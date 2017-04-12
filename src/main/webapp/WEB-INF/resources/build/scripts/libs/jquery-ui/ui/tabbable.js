/*!
 * jQuery UI Tabbable @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: :tabbable Selector
//>>group: Core
//>>description: Selects elements which can be tabbed to.
//>>docs: http://api.jqueryui.com/tabbable-selector/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version","./focusable"],e):
// Browser globals
e(jQuery)}(function($){return $.extend($.expr[":"],{tabbable:function(e){var n=$.attr(e,"tabindex"),t=null!=n;return(!t||n>=0)&&$.ui.focusable(e,t)}})});