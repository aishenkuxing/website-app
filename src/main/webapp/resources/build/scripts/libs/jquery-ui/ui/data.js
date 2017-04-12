/*!
 * jQuery UI :data @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: :data Selector
//>>group: Core
//>>description: Selects elements which have data stored under the specified key.
//>>docs: http://api.jqueryui.com/data-selector/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],e):
// Browser globals
e(jQuery)}(function($){return $.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(e){return function(n){return!!$.data(n,e)}}):
// Support: jQuery <1.8
function(e,n,t){return!!$.data(e,t[3])}})});