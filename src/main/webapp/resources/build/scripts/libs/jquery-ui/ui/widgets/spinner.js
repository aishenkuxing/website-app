/*!
 * jQuery UI Spinner @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Spinner
//>>group: Widgets
//>>description: Displays buttons to easily input numbers via the keyboard or mouse.
//>>docs: http://api.jqueryui.com/spinner/
//>>demos: http://jqueryui.com/spinner/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/spinner.css
//>>css.theme: ../../themes/base/theme.css
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./button","../version","../keycode","../safe-active-element","../widget"],t):
// Browser globals
t(jQuery)}(function($){function t(t){return function(){var i=this.element.val();t.apply(this,arguments),this._refresh(),i!==this.element.val()&&this._trigger("change")}}
// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
// Backcompat for spinner html extension points
return $.widget("ui.spinner",{version:"@VERSION",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){
// handle string values that need to be parsed
this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),
// Only format if there is a value, prevents the field from being marked
// as invalid in Firefox, see #9573.
""!==this.value()&&
// Format the value, but don't constrain.
this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),
// Turning off autocomplete prevents the browser from remembering the
// value when navigating through history, so we re-enable autocomplete
// if the page is unloaded before the widget is destroyed. #7790
this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t=this._super(),i=this.element;return $.each(["min","max","step"],function(n,e){var s=i.attr(e);null!=s&&s.length&&(t[e]=s)}),t},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){if(this.cancelBlur)return void delete this.cancelBlur;this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t)},mousewheel:function(t,i){if(i){if(!this.spinning&&!this._start(t))return!1;this._spin((i>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){this.element[0]===$.ui.safeActiveElement(this.document[0])||(this.element.trigger("focus"),this.previous=n,
// support: IE
// IE sets focus asynchronously, so we need to check if focus
// moved off of the input because the user clicked on the button.
this._delay(function(){this.previous=n}))}var n;
// We never want the buttons to have focus; whenever the user is
// interacting with the spinner, the focus should be on the input.
// If the input is focused then this.previous is properly set from
// when the input first received focus. If the input is not focused
// then we need to set this.previous based on the value before spinning.
n=this.element[0]===$.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),
// Ensure focus is on (or stays on) the text field
t.preventDefault(),i.call(this),
// Support: IE
// IE doesn't prevent moving focus even with event.preventDefault()
// so we set a flag to know when we should ignore the blur event
// and check (again) if focus moved off of the input.
this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,$(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){
// button will add ui-state-active if mouse was down while mouseleave and kept down
if($(t.currentTarget).hasClass("ui-state-active"))return this._start(t)!==!1&&void this._repeat(null,$(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},
// TODO: do we really want to consider this a stop?
// shouldn't we just stop the repeater and wait until mouseup before
// we trigger the stop event?
"mouseleave .ui-spinner-button":"_stop"},
// Support mobile enhanced option and make backcompat more sane
_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),
// Button bindings
this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),
// TODO: Right now button does not support classes this is already updated in button PR
this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),
// IE 6 doesn't understand height: 50% for the buttons
// unless the wrapper has an explicit height
this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&this.uiSpinner.height()>0&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(t){var i=this.options,n=$.ui.keyCode;switch(t.keyCode){case n.UP:return this._repeat(null,1,t),!0;case n.DOWN:return this._repeat(null,-1,t),!0;case n.PAGE_UP:return this._repeat(null,i.page,t),!0;case n.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_start:function(t){return!(!this.spinning&&this._trigger("start",t)===!1)&&(this.counter||(this.counter=1),this.spinning=!0,!0)},_repeat:function(t,i,n){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,i,n)},t),this._spin(i*this.options.step,n)},_spin:function(t,i){var n=this.value()||0;this.counter||(this.counter=1),n=this._adjustValue(n+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",i,{value:n})===!1||(this._value(n),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?$.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var i=t.toString(),n=i.indexOf(".");return n===-1?0:i.length-n-1},_adjustValue:function(t){var i,n,e=this.options;
// Clamp the value
// Make sure we're at a valid step
// - find out where we are relative to the base (min or 0)
// - round to the nearest step
// - rounding is based on 0, so adjust back to our base
// Fix precision from bad JS floating point math
// Clamp the value
return i=null!==e.min?e.min:0,n=t-i,n=Math.round(n/e.step)*e.step,t=i+n,t=parseFloat(t.toFixed(this._precision())),null!==e.max&&t>e.max?e.max:null!==e.min&&t<e.min?e.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,i){var n,e,s;if("culture"===t||"numberFormat"===t)return n=this._parse(this.element.val()),this.options[t]=i,void this.element.val(this._format(n));"max"!==t&&"min"!==t&&"step"!==t||"string"==typeof i&&(i=this._parse(i)),"icons"===t&&(e=this.buttons.first().find(".ui-icon"),this._removeClass(e,null,this.options.icons.up),this._addClass(e,null,i.up),s=this.buttons.last().find(".ui-icon"),this._removeClass(s,null,this.options.icons.down),this._addClass(s,null,i.down)),this._super(t,i)},_setOptionDisabled:function(t){this._super(t),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable")},_setOptions:t(function(t){this._super(t)}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,
// TODO: what should we do with values that can't be parsed?
"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();
// Null is invalid
// Null is invalid
return null!==t&&t===this._adjustValue(t)},
// Update the value without triggering change
_value:function(t,i){var n;""!==t&&null!==(n=this._parse(t))&&(i||(n=this._adjustValue(n)),t=this._format(n)),this.element.val(t),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:t(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:t(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:t(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:t(function(t){this._stepDown((t||1)*this.options.page)}),value:function(i){if(!arguments.length)return this._parse(this.element.val());t(this._value).call(this,i)},widget:function(){return this.uiSpinner}}),$.uiBackCompat!==!1&&$.widget("ui.spinner",$.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}}),$.ui.spinner});