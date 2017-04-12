/*!
 * jQuery UI Button @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Button
//>>group: Widgets
//>>description: Enhances a form with themeable buttons.
//>>docs: http://api.jqueryui.com/button/
//>>demos: http://jqueryui.com/button/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.theme: ../../themes/base/theme.css
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery",
// These are only for backcompat
// TODO: Remove after 1.12
"./controlgroup","./checkboxradio","../keycode","../widget"],t):
// Browser globals
t(jQuery)}(function($){
// DEPRECATED
// Text and Icons options
return $.widget("ui.button",{version:"@VERSION",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var t,
// This is to support cases like in jQuery Mobile where the base widget does have
// an implementation of _getCreateOptions
i=this._super()||{};return this.isInput=this.element.is("input"),t=this.element[0].disabled,null!=t&&(i.disabled=t),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(i.label=this.originalLabel),i},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),
// We have to check the option again here even though we did in _getCreateOptions,
// because null may have been passed on init which would override what was set in
// _getCreateOptions
null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),
// Check to see if the label needs to be set or if its already correct
this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(t){t.keyCode===$.ui.keyCode.SPACE&&(t.preventDefault(),
// Support: PhantomJS <= 1.9, IE 8 Only
// If a native click is available use it so we actually cause navigation
// otherwise just trigger a click event
this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(t,i){var o="iconPosition"!==t,s=o?this.options.iconPosition:i,n="top"===s||"bottom"===s;
// Create icon
this.icon?o&&
// If we are updating the icon remove the old icon class
this._removeClass(this.icon,null,this.options.icon):(this.icon=$("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),
// If we are updating the icon add the new icon class
o&&this._addClass(this.icon,null,i),this._attachIcon(s),
// If the icon is on top or bottom we need to add the ui-widget-icon-block class and remove
// the iconSpace if there is one.
n?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(
// Position is beginning or end so remove the ui-widget-icon-block class and add the
// space if it does not exist
this.iconSpace||(this.iconSpace=$("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(s))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(t){this.icon[/^(?:end|bottom)/.test(t)?"before":"after"](this.iconSpace)},_attachIcon:function(t){this.element[/^(?:end|bottom)/.test(t)?"append":"prepend"](this.icon)},_setOptions:function(t){var i=void 0===t.showLabel?this.options.showLabel:t.showLabel,o=void 0===t.icon?this.options.icon:t.icon;i||o||(t.showLabel=!0),this._super(t)},_setOption:function(t,i){"icon"===t&&(i?this._updateIcon(t,i):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===t&&this._updateIcon(t,i),
// Make sure we can't end up with a button that has neither text nor icon
"showLabel"===t&&(this._toggleClass("ui-button-icon-only",null,!i),this._updateTooltip()),"label"===t&&(this.isInput?this.element.val(i):(
// If there is an icon, append it, else nothing then append the value
// this avoids removal of the icon when setting label text
this.element.html(i),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(t,i),"disabled"===t&&(this._toggleClass(null,"ui-state-disabled",i),this.element[0].disabled=i,i&&this.element.blur())},refresh:function(){
// Make sure to only check disabled if its an element that supports this otherwise
// check for the disabled class to determine state
var t=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOptions({disabled:t}),this._updateTooltip()}}),$.uiBackCompat!==!1&&($.widget("ui.button",$.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(t,i){if("text"===t)return void this._super("showLabel",i);"showLabel"===t&&(this.options.text=i),"icon"===t&&(this.options.icons.primary=i),"icons"===t&&(i.primary?(this._super("icon",i.primary),this._super("iconPosition","beginning")):i.secondary&&(this._super("icon",i.secondary),this._super("iconPosition","end"))),this._superApply(arguments)}}),$.fn.button=function(t){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?t.apply(this,arguments):($.ui.checkboxradio||$.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}($.fn.button),$.fn.buttonset=function(){return $.ui.controlgroup||$.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),$.ui.button});