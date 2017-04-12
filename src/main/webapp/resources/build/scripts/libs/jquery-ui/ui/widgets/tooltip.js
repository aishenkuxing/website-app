/*!
 * jQuery UI Tooltip @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Tooltip
//>>group: Widgets
//>>description: Shows additional information for any element on hover or focus.
//>>docs: http://api.jqueryui.com/tooltip/
//>>demos: http://jqueryui.com/tooltip/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/tooltip.css
//>>css.theme: ../../themes/base/theme.css
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../keycode","../position","../unique-id","../version","../widget"],t):
// Browser globals
t(jQuery)}(function($){
// DEPRECATED
// TODO: Switch return back to widget declaration at top of file when this is removed
// Backcompat for tooltipClass option
return $.widget("ui.tooltip",{version:"@VERSION",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){
// support: IE<9, Opera in jQuery <1.7
// .text() can't accept undefined, so coerce to a string
var t=$(this).attr("title")||"";
// Escape title, since we're going from an attribute to raw HTML
return $("<a>").text(t).html()},hide:!0,
// Disabled elements have inconsistent behavior across browsers (#8661)
items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,
// Callbacks
close:null,open:null},_addDescribedBy:function(t,i){var e=(t.attr("aria-describedby")||"").split(/\s+/);e.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",$.trim(e.join(" ")))},_removeDescribedBy:function(t){var i=t.data("ui-tooltip-id"),e=(t.attr("aria-describedby")||"").split(/\s+/),o=$.inArray(i,e);o!==-1&&e.splice(o,1),t.removeData("ui-tooltip-id"),e=$.trim(e.join(" ")),e?t.attr("aria-describedby",e):t.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),
// IDs of generated tooltips, needed for destroy
this.tooltips={},
// IDs of parent tooltips where we removed the title attribute
this.parents={},
// Append the aria-live region so tooltips announce correctly
this.liveRegion=$("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=$([])},_setOption:function(t,i){var e=this;this._super(t,i),"content"===t&&$.each(this.tooltips,function(t,i){e._updateContent(i.element)})},_setOptionDisabled:function(t){this[t?"_disable":"_enable"]()},_disable:function(){var t=this;
// Close open tooltips
$.each(this.tooltips,function(i,e){var o=$.Event("blur");o.target=o.currentTarget=e.element[0],t.close(o,!0)}),
// Remove title attributes to prevent native tooltips
this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var t=$(this);if(t.is("[title]"))return t.data("ui-tooltip-title",t.attr("title")).removeAttr("title")}))},_enable:function(){
// restore title attributes
this.disabledTitles.each(function(){var t=$(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))}),this.disabledTitles=$([])},open:function(t){var i=this,e=$(t?t.target:this.element).closest(this.options.items);
// No element to show a tooltip for or the tooltip is already open
e.length&&!e.data("ui-tooltip-id")&&(e.attr("title")&&e.data("ui-tooltip-title",e.attr("title")),e.data("ui-tooltip-open",!0),
// Kill parent tooltips, custom or native, for hover
t&&"mouseover"===t.type&&e.parents().each(function(){var t,e=$(this);e.data("ui-tooltip-open")&&(t=$.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),e.attr("title")&&(e.uniqueId(),i.parents[this.id]={element:this,title:e.attr("title")},e.attr("title",""))}),this._registerCloseHandlers(t,e),this._updateContent(e,t))},_updateContent:function(t,i){var e,o=this.options.content,n=this,s=i?i.type:null;if("string"==typeof o||o.nodeType||o.jquery)return this._open(i,t,o);(e=o.call(t[0],function(e){
// IE may instantly serve a cached response for ajax requests
// delay this call to _open so the other call to _open runs first
n._delay(function(){
// Ignore async response if tooltip was closed already
t.data("ui-tooltip-open")&&(
// JQuery creates a special event for focusin when it doesn't
// exist natively. To improve performance, the native event
// object is reused and the type is changed. Therefore, we can't
// rely on the type being correct after the event finished
// bubbling, so we set it back to the previous value. (#8740)
i&&(i.type=s),this._open(i,t,e))})}))&&this._open(i,t,e)},_open:function(t,i,e){function o(t){r.of=t,s.is(":hidden")||s.position(r)}var n,s,l,a,r=$.extend({},this.options.position);if(e){if(
// Content can be updated multiple times. If the tooltip already
// exists, then just update the content and bail.
n=this._find(i))return void n.tooltip.find(".ui-tooltip-content").html(e);
// If we have a title, clear it to prevent the native tooltip
// we have to check first to avoid defining a title if none exists
// (we don't want to cause an element to start matching [title])
//
// We use removeAttr only for key events, to allow IE to export the correct
// accessible attributes. For mouse events, set to empty string to avoid
// native tooltip showing up (happens only when removing inside mouseover).
i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),n=this._tooltip(i),s=n.tooltip,this._addDescribedBy(i,s.attr("id")),s.find(".ui-tooltip-content").html(e),
// Support: Voiceover on OS X, JAWS on IE <= 9
// JAWS announces deletions even when aria-relevant="additions"
// Voiceover will sometimes re-read the entire log region's contents from the beginning
this.liveRegion.children().hide(),a=$("<div>").html(s.find(".ui-tooltip-content").html()),a.removeAttr("name").find("[name]").removeAttr("name"),a.removeAttr("id").find("[id]").removeAttr("id"),a.appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:o}),
// trigger once to override element-relative positioning
o(t)):s.position($.extend({of:i},this.options.position)),s.hide(),this._show(s,this.options.show),
// Handle tracking tooltips that are shown with a delay (#8644). As soon
// as the tooltip is visible, position the tooltip using the most recent
// event.
// Adds the check to add the timers only when both delay and track options are set (#14682)
this.options.track&&this.options.show&&this.options.show.delay&&(l=this.delayedShow=setInterval(function(){s.is(":visible")&&(o(r.of),clearInterval(l))},$.fx.interval)),this._trigger("open",t,{tooltip:s})}},_registerCloseHandlers:function(t,i){var e={keyup:function(t){if(t.keyCode===$.ui.keyCode.ESCAPE){var e=$.Event(t);e.currentTarget=i[0],this.close(e,!0)}}};
// Only bind remove handler for delegated targets. Non-delegated
// tooltips will handle this in destroy.
i[0]!==this.element[0]&&(e.remove=function(){this._removeTooltip(this._find(i).tooltip)}),t&&"mouseover"!==t.type||(e.mouseleave="close"),t&&"focusin"!==t.type||(e.focusout="close"),this._on(!0,i,e)},close:function(t){var i,e=this,o=$(t?t.currentTarget:this.element),n=this._find(o);
// The tooltip may already be closed
if(!n)
// We set ui-tooltip-open immediately upon open (in open()), but only set the
// additional data once there's actually content to show (in _open()). So even if the
// tooltip doesn't have full data, we always remove ui-tooltip-open in case we're in
// the period between open() and _open().
return void o.removeData("ui-tooltip-open");i=n.tooltip,
// Disabling closes the tooltip, so we need to track when we're closing
// to avoid an infinite loop in case the tooltip becomes disabled on close
n.closing||(
// Clear the interval for delayed tracking tooltips
clearInterval(this.delayedShow),
// Only set title if we had one before (see comment in _open())
// If the title attribute has changed since open(), don't restore
o.data("ui-tooltip-title")&&!o.attr("title")&&o.attr("title",o.data("ui-tooltip-title")),this._removeDescribedBy(o),n.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){e._removeTooltip($(this))}),o.removeData("ui-tooltip-open"),this._off(o,"mouseleave focusout keyup"),
// Remove 'remove' binding only on delegated targets
o[0]!==this.element[0]&&this._off(o,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&$.each(this.parents,function(t,i){$(i.element).attr("title",i.title),delete e.parents[t]}),n.closing=!0,this._trigger("close",t,{tooltip:i}),n.hiding||(n.closing=!1))},_tooltip:function(t){var i=$("<div>").attr("role","tooltip"),e=$("<div>").appendTo(i),o=i.uniqueId().attr("id");return this._addClass(e,"ui-tooltip-content"),this._addClass(i,"ui-tooltip","ui-widget ui-widget-content"),i.appendTo(this._appendTo(t)),this.tooltips[o]={element:t,tooltip:i}},_find:function(t){var i=t.data("ui-tooltip-id");return i?this.tooltips[i]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_appendTo:function(t){var i=t.closest(".ui-front, dialog");return i.length||(i=this.document[0].body),i},_destroy:function(){var t=this;
// Close open tooltips
$.each(this.tooltips,function(i,e){
// Delegate to close method to handle common cleanup
var o=$.Event("blur"),n=e.element;o.target=o.currentTarget=n[0],t.close(o,!0),
// Remove immediately; destroying an open tooltip doesn't use the
// hide animation
$("#"+i).remove(),
// Restore the title
n.data("ui-tooltip-title")&&(
// If the title attribute has changed since open(), don't restore
n.attr("title")||n.attr("title",n.data("ui-tooltip-title")),n.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),$.uiBackCompat!==!1&&$.widget("ui.tooltip",$.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var t=this._superApply(arguments);return this.options.tooltipClass&&t.tooltip.addClass(this.options.tooltipClass),t}}),$.ui.tooltip});