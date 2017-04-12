/*!
 * jQuery UI Unique ID @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: uniqueId
//>>group: Core
//>>description: Functions to generate and remove uniqueId's
//>>docs: http://api.jqueryui.com/uniqueId/
!function(i){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],i):
// Browser globals
i(jQuery)}(function($){return $.fn.extend({uniqueId:function(){var i=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++i)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&$(this).removeAttr("id")})}})});