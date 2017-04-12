/*!
 * jQuery UI Controlgroup @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Controlgroup
//>>group: Widgets
//>>description: Visually groups form control widgets
//>>docs: http://api.jqueryui.com/controlgroup/
//>>demos: http://jqueryui.com/controlgroup/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/controlgroup.css
//>>css.theme: ../../themes/base/theme.css
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../widget"],t):
// Browser globals
t(jQuery)}(function($){return $.widget("ui.controlgroup",{version:"@VERSION",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},
// To support the enhanced option in jQuery Mobile, we isolate DOM manipulation
_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var t=this,e=[];
// First we iterate over each of the items options
$.each(this.options.items,function(i,n){var o,s={};
// Make sure the widget has a selector set
if(n)
// Make sure the widget actually exists
// We assume everything is in the middle to start because we can't determine
// first / last elements until all enhancments are done.
// Find instances of this widget inside controlgroup and init them
return"controlgroupLabel"===i?(o=t.element.find(n),o.each(function(){var t=$(this);t.children(".ui-controlgroup-label-contents").length||t.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),t._addClass(o,null,"ui-widget ui-widget-content ui-state-default"),void(e=e.concat(o.get()))):void($.fn[i]&&(s=t["_"+i+"Options"]?t["_"+i+"Options"]("middle"):{classes:{}},t.element.find(n).each(function(){var n=$(this),o=n[i]("instance"),l=$.widget.extend({},s);
// If the button is the child of a spinner ignore it
// TODO: Find a more generic solution
if("button"!==i||!n.parent(".ui-spinner").length){
// Create the widget if it doesn't exist
o||(o=n[i]()[i]("instance")),o&&(l.classes=t._resolveClassesValues(l.classes,o)),n[i](l);
// Store an instance of the controlgroup to be able to reference
// from the outermost element for changing options and refresh
var r=n[i]("widget");$.data(r[0],"ui-controlgroup-data",o?o:n[i]("instance")),e.push(r[0])}})))}),this.childWidgets=$($.unique(e)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(t){this.childWidgets.each(function(){var e=$(this),i=e.data("ui-controlgroup-data");i&&i[t]&&i[t]()})},_updateCornerClass:function(t,e){var i=this._buildSimpleOptions(e,"label").classes.label;this._removeClass(t,null,"ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"),this._addClass(t,null,i)},_buildSimpleOptions:function(t,e){var i="vertical"===this.options.direction,n={classes:{}};return n.classes[e]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[t],n},_spinnerOptions:function(t){var e=this._buildSimpleOptions(t,"ui-spinner");return e.classes["ui-spinner-up"]="",e.classes["ui-spinner-down"]="",e},_buttonOptions:function(t){return this._buildSimpleOptions(t,"ui-button")},_checkboxradioOptions:function(t){return this._buildSimpleOptions(t,"ui-checkboxradio-label")},_selectmenuOptions:function(t){var e="vertical"===this.options.direction;return{width:!!e&&"auto",classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(e?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(e?"top":"left")},last:{"ui-selectmenu-button-open":e?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(e?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[t]}},_resolveClassesValues:function(t,e){var i={};return $.each(t,function(n){var o=e.options.classes[n]||"";o=$.trim(o.replace(/ui-corner-([a-z]){2,6}/g,"")),i[n]=(o+" "+t[n]).replace(/\s+/g," ")}),i},_setOption:function(t,e){if("direction"===t&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(t,e),"disabled"===t)return void this._callChildMethod(e?"disable":"enable");this.refresh()},refresh:function(){var t,e=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),t=this.childWidgets,
// We filter here because we need to track all childWidgets not just the visible ones
this.options.onlyVisible&&(t=t.filter(":visible")),t.length&&(
// We do this last because we need to make sure all enhancment is done
// before determining first and last
$.each(["first","last"],function(i,n){var o=t[n]().data("ui-controlgroup-data");if(o&&e["_"+o.widgetName+"Options"]){var s=e["_"+o.widgetName+"Options"](1===t.length?"only":n);s.classes=e._resolveClassesValues(s.classes,o),o.element[o.widgetName](s)}else e._updateCornerClass(t[n](),n)}),
// Finally call the refresh method on each of the child widgets.
this._callChildMethod("refresh"))}})});