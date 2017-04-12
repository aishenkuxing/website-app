/*!
 * jQuery UI Autocomplete @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Autocomplete
//>>group: Widgets
//>>description: Lists suggested words as the user is typing.
//>>docs: http://api.jqueryui.com/autocomplete/
//>>demos: http://jqueryui.com/autocomplete/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/autocomplete.css
//>>css.theme: ../../themes/base/theme.css
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./menu","../keycode","../position","../safe-active-element","../version","../widget"],e):
// Browser globals
e(jQuery)}(function($){
// Live region extension, adding a `messages` option
// NOTE: This is an experimental API. We are still investigating
// a full solution for string manipulation and internationalization.
return $.widget("ui.autocomplete",{version:"@VERSION",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,
// Callbacks
change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){
// Some browsers only repeat keydown events, not keypress events,
// so we use the suppressKeyPress flag to determine if we've already
// handled the keydown event. #7269
// Unfortunately the code for & in keypress is the same as the up arrow,
// so we use the suppressKeyPressRepeat flag to avoid handling keypress
// events when we know the keydown event was used to modify the
// search term. #7799
var e,t,i,s=this.element[0].nodeName.toLowerCase(),n="textarea"===s,o="input"===s;
// Textareas are always multi-line
// Inputs are always single-line, even if inside a contentEditable element
// IE also treats inputs as contentEditable
// All other element types are determined by whether or not they're contentEditable
this.isMultiLine=n||!o&&this._isContentEditable(this.element),this.valueMethod=this.element[n||o?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(s){if(this.element.prop("readOnly"))return e=!0,i=!0,void(t=!0);e=!1,i=!1,t=!1;var n=$.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:e=!0,this._move("previousPage",s);break;case n.PAGE_DOWN:e=!0,this._move("nextPage",s);break;case n.UP:e=!0,this._keyEvent("previous",s);break;case n.DOWN:e=!0,this._keyEvent("next",s);break;case n.ENTER:
// when menu is open and has focus
this.menu.active&&(
// #6055 - Opera still allows the keypress to occur
// which causes forms to submit
e=!0,s.preventDefault(),this.menu.select(s));break;case n.TAB:this.menu.active&&this.menu.select(s);break;case n.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(s),
// Different browsers have different default behavior for escape
// Single press can mean undo or clear
// Double press in IE means clear the whole form
s.preventDefault());break;default:t=!0,
// search timeout should be triggered before the input value is changed
this._searchTimeout(s)}},keypress:function(i){if(e)return e=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||i.preventDefault());if(!t){
// Replicate some key handlers to allow them to repeat in Firefox and Opera
var s=$.ui.keyCode;switch(i.keyCode){case s.PAGE_UP:this._move("previousPage",i);break;case s.PAGE_DOWN:this._move("nextPage",i);break;case s.UP:this._keyEvent("previous",i);break;case s.DOWN:this._keyEvent("next",i)}}},input:function(e){if(i)return i=!1,void e.preventDefault();this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){if(this.cancelBlur)return void delete this.cancelBlur;clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=$("<ul>").appendTo(this._appendTo()).menu({
// disable ARIA support, the live region takes care of that
role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(e){
// prevent moving focus out of the text field
e.preventDefault(),
// IE doesn't prevent moving focus even with event.preventDefault()
// so we set a flag to know when we should ignore the blur event
this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,
// Support: IE 8 only
// Right clicking a menu item or selecting text from the menu items will
// result in focus moving out of the input. However, we've already received
// and ignored the blur event because of the cancelBlur flag set above. So
// we restore focus to ensure that the menu closes properly based on the user's
// next actions.
this.element[0]!==$.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(e,t){var i,s;
// support: Firefox
// Prevent accidental activation of menu items in Firefox (#7024 #9118)
if(this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type)))return this.menu.blur(),void this.document.one("mousemove",function(){$(e.target).trigger(e.originalEvent)});s=t.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",e,{item:s})&&e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(s.value),(
// Announce the value in the liveRegion
i=t.item.attr("aria-label")||s.value)&&$.trim(i).length&&(this.liveRegion.children().hide(),$("<div>").text(i).appendTo(this.liveRegion))},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;
// Only trigger when focus was lost (click on menu)
this.element[0]!==$.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=s,
// #6109 - IE triggers two focus events and the second
// is asynchronous, so we need to reset the previous
// term synchronously and asynchronously :-(
this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),
// reset the term after the select event
// this allows custom select handling to work properly
this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=$("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),
// Turning off autocomplete prevents the browser from remembering the
// value when navigating through history, so we re-enable autocomplete
// if the page is unloaded before the widget is destroyed. #7790
this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(e){var t=this.menu.element[0];return e.target===this.element[0]||e.target===t||$.contains(t,e.target)},_closeOnClickOutside:function(e){this._isEventTargetInWidget(e)||this.close()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?$(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,t,i=this;$.isArray(this.options.source)?(e=this.options.source,this.source=function(t,i){i($.ui.autocomplete.filter(e,t.term))}):"string"==typeof this.options.source?(t=this.options.source,this.source=function(e,s){i.xhr&&i.xhr.abort(),i.xhr=$.ajax({url:t,data:e,dataType:"json",success:function(e){s(e)},error:function(){s([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){
// Search if the value has changed, or if the user retypes the same value (see #7434)
var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;t&&(!t||i||s)||(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){
// Always save the actual value, not the one passed as an argument
return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=++this.requestIndex;return $.proxy(function(t){e===this.requestIndex&&this.__response(t),--this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):
// use ._close() instead of .close() so we don't cancel future searches
this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){
// Remove the handler that closes the menu on outside clicks
this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(e){
// assume all items have the right format when the first item is complete
// assume all items have the right format when the first item is complete
return e.length&&e[0].label&&e[0].value?e:$.map(e,function(e){return"string"==typeof e?{label:e,value:e}:$.extend({},e,{label:e.label||e.value,value:e.value||e.label})})},_suggest:function(e){var t=this.menu.element.empty();this._renderMenu(t,e),this.isNewMenu=!0,this.menu.refresh(),
// Size and position menu
t.show(),this._resizeMenu(),t.position($.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),
// Listen for interactions outside of the widget (#6642)
this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(
// Firefox wraps long text (possibly a rounding bug)
// so we add 1px to avoid the wrapping (#7513)
e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,t){var i=this;$.each(t,function(t,s){i._renderItemData(e,s)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(e,t){return $("<li>").append($("<div>").text(t.label)).appendTo(e)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[e](t):void this.search(null,t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(e,t),
// Prevents moving cursor to beginning/end of the text field in some browsers
t.preventDefault())},
// Support: Chrome <=50
// We should be able to just use this.element.prop( "isContentEditable" )
// but hidden elements always report false in Chrome.
// https://code.google.com/p/chromium/issues/detail?id=313082
_isContentEditable:function(e){if(!e.length)return!1;var t=e.prop("contentEditable");return"inherit"===t?this._isContentEditable(e.parent()):"true"===t}}),$.extend($.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,t){var i=new RegExp($.ui.autocomplete.escapeRegex(t),"i");return $.grep(e,function(e){return i.test(e.label||e.value||e)})}}),$.widget("ui.autocomplete",$.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments),this.options.disabled||this.cancelSearch||(t=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.children().hide(),$("<div>").text(t).appendTo(this.liveRegion))}}),$.ui.autocomplete});