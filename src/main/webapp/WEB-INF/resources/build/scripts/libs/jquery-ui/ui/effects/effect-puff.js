/*!
 * jQuery UI Effects Puff @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Puff Effect
//>>group: Effects
//>>description: Creates a puff effect by scaling the element up and hiding it at the same time.
//>>docs: http://api.jqueryui.com/puff-effect/
//>>demos: http://jqueryui.com/effect/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../effect","./effect-scale"],e):
// Browser globals
e(jQuery)}(function($){return $.effects.define("puff","hide",function(e,f){var n=$.extend(!0,{},e,{fade:!0,percent:parseInt(e.percent,10)||150});$.effects.effect.scale.call(this,n,f)})});