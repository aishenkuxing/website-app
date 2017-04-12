/*!
 * jQuery UI Widget @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Widget
//>>group: Core
//>>description: Provides a factory for creating stateful widgets with a common API.
//>>docs: http://api.jqueryui.com/jQuery.widget/
//>>demos: http://jqueryui.com/widget/
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],t):
// Browser globals
t(jQuery)}(function($){var t=0,e=Array.prototype.slice;return $.cleanData=function(t){return function(e){var i,s,n;for(n=0;null!=(s=e[n]);n++)try{
// Only trigger remove when necessary to save time
i=$._data(s,"events"),i&&i.remove&&$(s).triggerHandler("remove")}catch(t){}t(e)}}($.cleanData),$.widget=function(t,e,i){var s,n,o,a={},r=t.split(".")[0];t=t.split(".")[1];var l=r+"-"+t;
// Create selector for plugin
// Extend with the existing constructor to carry over any static properties
// We need to make the options hash a property directly on the new instance
// otherwise we'll modify the options hash on the prototype that we're
// inheriting from
// If this widget is being redefined then we need to find all widgets that
// are inheriting from it and redefine all of them so that they inherit from
// the new version of this widget. We're essentially trying to replace one
// level in the prototype chain.
// Remove the list of existing child constructors from the old constructor
// so the old child constructors can be garbage collected
return i||(i=e,e=$.Widget),$.isArray(i)&&(i=$.extend.apply(null,[{}].concat(i))),$.expr[":"][l.toLowerCase()]=function(t){return!!$.data(t,l)},$[r]=$[r]||{},s=$[r][t],n=$[r][t]=function(t,e){
// Allow instantiation without "new" keyword
if(!this._createWidget)return new n(t,e);
// Allow instantiation without initializing for simple inheritance
// must use "new" keyword (the code above always passes args)
arguments.length&&this._createWidget(t,e)},$.extend(n,s,{version:i.version,
// Copy the object used to create the prototype in case we need to
// redefine the widget later
_proto:$.extend({},i),
// Track widgets that inherit from this widget in case this widget is
// redefined after a widget inherits from it
_childConstructors:[]}),o=new e,o.options=$.widget.extend({},o.options),$.each(i,function(t,i){if(!$.isFunction(i))return void(a[t]=i);a[t]=function(){function s(){return e.prototype[t].apply(this,arguments)}function n(i){return e.prototype[t].apply(this,i)}return function(){var t,e=this._super,o=this._superApply;return this._super=s,this._superApply=n,t=i.apply(this,arguments),this._super=e,this._superApply=o,t}}()}),n.prototype=$.widget.extend(o,{
// TODO: remove support for widgetEventPrefix
// always use the name + a colon as the prefix, e.g., draggable:start
// don't prefix for widgets that aren't DOM-based
widgetEventPrefix:s?o.widgetEventPrefix||t:t},a,{constructor:n,namespace:r,widgetName:t,widgetFullName:l}),s?($.each(s._childConstructors,function(t,e){var i=e.prototype;
// Redefine the child widget using the same prototype that was
// originally used, but inherit from the new version of the base
$.widget(i.namespace+"."+i.widgetName,n,e._proto)}),delete s._childConstructors):e._childConstructors.push(n),$.widget.bridge(t,n),n},$.widget.extend=function(t){for(var i,s,n=e.call(arguments,1),o=0,a=n.length;o<a;o++)for(i in n[o])s=n[o][i],n[o].hasOwnProperty(i)&&void 0!==s&&(
// Clone objects
$.isPlainObject(s)?t[i]=$.isPlainObject(t[i])?$.widget.extend({},t[i],s):
// Don't extend strings, arrays, etc. with objects
$.widget.extend({},s):t[i]=s);return t},$.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;$.fn[t]=function(n){var o="string"==typeof n,a=e.call(arguments,1),r=this;
// If this is an empty collection, we need to have the instance method
// return undefined instead of the jQuery instance
// Allow multiple hashes to be passed on init
return o?this.length||"instance"!==n?this.each(function(){var e,i=$.data(this,s);return"instance"===n?(r=i,!1):i?$.isFunction(i[n])&&"_"!==n.charAt(0)?(e=i[n].apply(i,a),e!==i&&void 0!==e?(r=e&&e.jquery?r.pushStack(e.get()):e,!1):void 0):$.error("no such method '"+n+"' for "+t+" widget instance"):$.error("cannot call methods on "+t+" prior to initialization; attempted to call method '"+n+"'")}):r=void 0:(a.length&&(n=$.widget.extend.apply(null,[n].concat(a))),this.each(function(){var t=$.data(this,s);t?(t.option(n||{}),t._init&&t._init()):$.data(this,s,new i(n,this))})),r}},$.Widget=function(){},$.Widget._childConstructors=[],$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,
// Callbacks
create:null},_createWidget:function(e,i){i=$(i||this.defaultElement||this)[0],this.element=$(i),this.uuid=t++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=$(),this.hoverable=$(),this.focusable=$(),this.classesElementLookup={},i!==this&&($.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=$(i.style?
// Element within the document
i.ownerDocument:
// Element is window or document
i.document||i),this.window=$(this.document[0].defaultView||this.document[0].parentWindow)),this.options=$.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){var t=this;this._destroy(),$.each(this.classesElementLookup,function(e,i){t._removeClass(i,e)}),
// We can probably remove the unbind calls in 2.0
// all event bindings should go through this._on()
this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
// Clean up events and states
this.bindings.off(this.eventNamespace)},_destroy:$.noop,widget:function(){return this.element},option:function(t,e){var i,s,n,o=t;if(0===arguments.length)
// Don't return a reference to the internal hash
return $.widget.extend({},this.options);if("string"==typeof t)if(
// Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
o={},i=t.split("."),t=i.shift(),i.length){for(s=o[t]=$.widget.extend({},this.options[t]),n=0;n<i.length-1;n++)s[i[n]]=s[i[n]]||{},s=s[i[n]];if(t=i.pop(),1===arguments.length)return void 0===s[t]?null:s[t];s[t]=e}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=e}return this._setOptions(o),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(t){var e,i,s;for(e in t)s=this.classesElementLookup[e],t[e]!==this.options.classes[e]&&s&&s.length&&(
// We are doing this to create a new jQuery object because the _removeClass() call
// on the next line is going to destroy the reference to the current elements being
// tracked. We need to save a copy of this collection so that we can add the new classes
// below.
i=$(s.get()),this._removeClass(s,e),
// We don't use _addClass() here, because that uses this.options.classes
// for generating the string of classes. We want to use the value passed in from
// _setOption(), this is the new value of the classes option which was passed to
// _setOption(). We pass this value directly to _classes().
i.addClass(this._classes({element:i,keys:e,classes:t,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),
// If the widget is becoming disabled, then nothing is interactive
t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(t){function e(e,n){var o,a;for(a=0;a<e.length;a++)o=s.classesElementLookup[e[a]]||$(),o=$(t.add?$.unique(o.get().concat(t.element.get())):o.not(t.element).get()),s.classesElementLookup[e[a]]=o,i.push(e[a]),n&&t.classes[e[a]]&&i.push(t.classes[e[a]])}var i=[],s=this;return t=$.extend({element:this.element,classes:this.options.classes||{}},t),t.keys&&e(t.keys.match(/\S+/g)||[],!0),t.extra&&e(t.extra.match(/\S+/g)||[]),i.join(" ")},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(t,e,i){var s,n=this;
// No suppressDisabledCheck flag, shuffle arguments
"boolean"!=typeof t&&(i=e,e=t,t=!1),
// No element argument, shuffle and use this.element
i?(e=s=$(e),this.bindings=this.bindings.add(e)):(i=e,e=this.element,s=this.widget()),$.each(i,function(i,o){function a(){
// Allow widgets to customize the disabled handling
// - disabled as an array instead of boolean
// - disabled class as method for disabling individual parts
if(t||n.options.disabled!==!0&&!$(this).hasClass("ui-state-disabled"))return("string"==typeof o?n[o]:o).apply(n,arguments)}
// Copy the guid so direct unbinding works
"string"!=typeof o&&(a.guid=o.guid=o.guid||a.guid||$.guid++);var r=i.match(/^([\w:-]*)\s*(.*)$/),l=r[1]+n.eventNamespace,u=r[2];u?s.on(l,u,a):e.on(l,a)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(e).off(e),
// Clear the stack to avoid memory leaks (#10056)
this.bindings=$(this.bindings.not(t).get()),this.focusable=$(this.focusable.not(t).get()),this.hoverable=$(this.hoverable.not(t).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass($(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass($(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass($(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass($(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,e,i){var s,n,o=this.options[t];if(i=i||{},e=$.Event(e),e.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),
// The original event may come from any element
// so we need to reset the target on the new event
e.target=this.element[0],
// Copy original event properties over to the new event
n=e.originalEvent)for(s in n)s in e||(e[s]=n[s]);return this.element.trigger(e,i),!($.isFunction(o)&&o.apply(this.element[0],[e].concat(i))===!1||e.isDefaultPrevented())}},$.each({show:"fadeIn",hide:"fadeOut"},function(t,e){$.Widget.prototype["_"+t]=function(i,s,n){"string"==typeof s&&(s={effect:s});var o,a=s?s===!0||"number"==typeof s?e:s.effect||e:t;s=s||{},"number"==typeof s&&(s={duration:s}),o=!$.isEmptyObject(s),s.complete=n,s.delay&&i.delay(s.delay),o&&$.effects&&$.effects.effect[a]?i[t](s):a!==t&&i[a]?i[a](s.duration,s.easing,n):i.queue(function(e){$(this)[t](),n&&n.call(i[0]),e()})}}),$.widget});