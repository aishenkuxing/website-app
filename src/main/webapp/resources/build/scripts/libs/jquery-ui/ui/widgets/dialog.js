/*!
 * jQuery UI Dialog @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Dialog
//>>group: Widgets
//>>description: Displays customizable dialog windows.
//>>docs: http://api.jqueryui.com/dialog/
//>>demos: http://jqueryui.com/dialog/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/dialog.css
//>>css.theme: ../../themes/base/theme.css
!function(i){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./button","./draggable","./mouse","./resizable","../focusable","../keycode","../position","../safe-active-element","../safe-blur","../tabbable","../unique-id","../version","../widget"],i):
// Browser globals
i(jQuery)}(function($){
// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
// Backcompat for dialogClass option
return $.widget("ui.dialog",{version:"@VERSION",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",
// Ensure the titlebar is always visible
using:function(i){var t=$(this).css(i).offset().top;t<0&&$(this).css("top",i.top-t)}},resizable:!0,show:null,title:null,width:300,
// Callbacks
beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),
// Dialogs can't be disabled
this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&$.fn.draggable&&this._makeDraggable(),this.options.resizable&&$.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var i=this.options.appendTo;return i&&(i.jquery||i.nodeType)?$(i):this.document.find(i||"body").eq(0)},_destroy:function(){var i,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),i=t.parent.children().eq(t.index),
// Don't try to place the dialog next to itself (#8613)
i.length&&i[0]!==this.element[0]?i.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:$.noop,enable:$.noop,close:function(i){var t=this;this._isOpen&&this._trigger("beforeClose",i)!==!1&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||
// Hiding a focused element doesn't trigger blur in WebKit
// so in case we have nothing to focus on, explicitly blur the active element
// https://bugs.webkit.org/show_bug.cgi?id=47182
$.ui.safeBlur($.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){t._trigger("close",i)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(i,t){var e=!1,o=this.uiDialog.siblings(".ui-front:visible").map(function(){return+$(this).css("z-index")}).get(),s=Math.max.apply(null,o);return s>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",s+1),e=!0),e&&!t&&this._trigger("focus",i),e},open:function(){var i=this;if(this._isOpen)return void(this._moveToTop()&&this._focusTabbable());this._isOpen=!0,this.opener=$($.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),
// Ensure the overlay is moved to the top with the dialog, but only when
// opening. The overlay shouldn't move after the dialog is open so that
// modeless dialogs opened after the modal dialog stack properly.
this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){i._focusTabbable(),i._trigger("focus")}),
// Track the dialog immediately upon openening in case a focus event
// somehow occurs outside of the dialog before an element inside the
// dialog is focused (#10152)
this._makeFocusTarget(),this._trigger("open")},_focusTabbable:function(){
// Set focus to the first match:
// 1. An element that was focused previously
// 2. First element inside the dialog matching [autofocus]
// 3. Tabbable element inside the content element
// 4. Tabbable element inside the buttonpane
// 5. The close button
// 6. The dialog itself
var i=this._focusedElement;i||(i=this.element.find("[autofocus]")),i.length||(i=this.element.find(":tabbable")),i.length||(i=this.uiDialogButtonPane.find(":tabbable")),i.length||(i=this.uiDialogTitlebarClose.filter(":tabbable")),i.length||(i=this.uiDialog),i.eq(0).trigger("focus")},_keepFocus:function(i){function t(){var i=$.ui.safeActiveElement(this.document[0]);this.uiDialog[0]===i||$.contains(this.uiDialog[0],i)||this._focusTabbable()}i.preventDefault(),t.call(this),
// support: IE
// IE <= 8 doesn't prevent moving focus even with event.preventDefault()
// so we check again later
this._delay(t)},_createWrapper:function(){this.uiDialog=$("<div>").hide().attr({
// Setting tabIndex makes the div focusable
tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(i){if(this.options.closeOnEscape&&!i.isDefaultPrevented()&&i.keyCode&&i.keyCode===$.ui.keyCode.ESCAPE)return i.preventDefault(),void this.close(i);
// Prevent tabbing out of dialogs
if(i.keyCode===$.ui.keyCode.TAB&&!i.isDefaultPrevented()){var t=this.uiDialog.find(":tabbable"),e=t.filter(":first"),o=t.filter(":last");i.target!==o[0]&&i.target!==this.uiDialog[0]||i.shiftKey?i.target!==e[0]&&i.target!==this.uiDialog[0]||!i.shiftKey||(this._delay(function(){o.trigger("focus")}),i.preventDefault()):(this._delay(function(){e.trigger("focus")}),i.preventDefault())}},mousedown:function(i){this._moveToTop(i)&&this._focusTabbable()}}),
// We assume that any existing aria-describedby attribute means
// that the dialog content is marked up properly
// otherwise we brute force the content as the description
this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var i;this.uiDialogTitlebar=$("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(i){
// Don't prevent click on close button (#8838)
// Focusing a dialog that is partially scrolled out of view
// causes the browser to scroll it into view, preventing the click event
$(i.target).closest(".ui-dialog-titlebar-close")||
// Dialog isn't getting focus when dragging (#8063)
this.uiDialog.trigger("focus")}}),
// Support: IE
// Use type="button" to prevent enter keypresses in textboxes from closing the
// dialog in IE (#9312)
this.uiDialogTitlebarClose=$("<button type='button'></button>").button({label:$("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(i){i.preventDefault(),this.close(i)}}),i=$("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(i,"ui-dialog-title"),this._title(i),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":i.attr("id")})},_title:function(i){this.options.title?i.text(this.options.title):i.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=$("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=$("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var i=this,t=this.options.buttons;if(
// If we already have a button pane, remove it
this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),$.isEmptyObject(t)||$.isArray(t)&&!t.length)return void this._removeClass(this.uiDialog,"ui-dialog-buttons");$.each(t,function(t,e){var o,s;e=$.isFunction(e)?{click:e,text:t}:e,
// Default to a non-submitting button
e=$.extend({type:"button"},e),
// Change the context for the click callback to be the main element
o=e.click,s={icon:e.icon,iconPosition:e.iconPosition,showLabel:e.showLabel,
// Deprecated options
icons:e.icons,text:e.text},delete e.click,delete e.icon,delete e.iconPosition,delete e.showLabel,
// Deprecated options
delete e.icons,"boolean"==typeof e.text&&delete e.text,$("<button></button>",e).button(s).appendTo(i.uiButtonSet).on("click",function(){o.apply(i.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog)},_makeDraggable:function(){function i(i){return{position:i.position,offset:i.offset}}var t=this,e=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(e,o){t._addClass($(this),"ui-dialog-dragging"),t._blockFrames(),t._trigger("dragStart",e,i(o))},drag:function(e,o){t._trigger("drag",e,i(o))},stop:function(o,s){var n=s.offset.left-t.document.scrollLeft(),a=s.offset.top-t.document.scrollTop();e.position={my:"left top",at:"left"+(n>=0?"+":"")+n+" top"+(a>=0?"+":"")+a,of:t.window},t._removeClass($(this),"ui-dialog-dragging"),t._unblockFrames(),t._trigger("dragStop",o,i(s))}})},_makeResizable:function(){function i(i){return{originalPosition:i.originalPosition,originalSize:i.originalSize,position:i.position,size:i.size}}var t=this,e=this.options,o=e.resizable,
// .ui-resizable has position: relative defined in the stylesheet
// but dialogs have to use absolute or fixed positioning
s=this.uiDialog.css("position"),n="string"==typeof o?o:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:this._minHeight(),handles:n,start:function(e,o){t._addClass($(this),"ui-dialog-resizing"),t._blockFrames(),t._trigger("resizeStart",e,i(o))},resize:function(e,o){t._trigger("resize",e,i(o))},stop:function(o,s){var n=t.uiDialog.offset(),a=n.left-t.document.scrollLeft(),l=n.top-t.document.scrollTop();e.height=t.uiDialog.height(),e.width=t.uiDialog.width(),e.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" top"+(l>=0?"+":"")+l,of:t.window},t._removeClass($(this),"ui-dialog-resizing"),t._unblockFrames(),t._trigger("resizeStop",o,i(s))}}).css("position",s)},_trackFocus:function(){this._on(this.widget(),{focusin:function(i){this._makeFocusTarget(),this._focusedElement=$(i.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var i=this._trackingInstances(),t=$.inArray(this,i);t!==-1&&i.splice(t,1)},_trackingInstances:function(){var i=this.document.data("ui-dialog-instances");return i||(i=[],this.document.data("ui-dialog-instances",i)),i},_minHeight:function(){var i=this.options;return"auto"===i.height?i.minHeight:Math.min(i.minHeight,i.height)},_position:function(){
// Need to show the dialog to get the actual offset in the position plugin
var i=this.uiDialog.is(":visible");i||this.uiDialog.show(),this.uiDialog.position(this.options.position),i||this.uiDialog.hide()},_setOptions:function(i){var t=this,e=!1,o={};$.each(i,function(i,s){t._setOption(i,s),i in t.sizeRelatedOptions&&(e=!0),i in t.resizableRelatedOptions&&(o[i]=s)}),e&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",o)},_setOption:function(i,t){var e,o,s=this.uiDialog;"disabled"!==i&&(this._super(i,t),"appendTo"===i&&this.uiDialog.appendTo(this._appendTo()),"buttons"===i&&this._createButtons(),"closeText"===i&&this.uiDialogTitlebarClose.button({
// Ensure that we always pass a string
label:$("<a>").text(""+this.options.closeText).html()}),"draggable"===i&&(e=s.is(":data(ui-draggable)"),e&&!t&&s.draggable("destroy"),!e&&t&&this._makeDraggable()),"position"===i&&this._position(),"resizable"===i&&(
// currently resizable, becoming non-resizable
o=s.is(":data(ui-resizable)"),o&&!t&&s.resizable("destroy"),
// Currently resizable, changing handles
o&&"string"==typeof t&&s.resizable("option","handles",t),
// Currently non-resizable, becoming resizable
o||t===!1||this._makeResizable()),"title"===i&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){
// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
// divs will both have width and height set, so we need to reset them
var i,t,e,o=this.options;
// Reset content sizing
this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),o.minWidth>o.width&&(o.width=o.minWidth),
// Reset wrapper sizing
// determine the height of all the non-content elements
i=this.uiDialog.css({height:"auto",width:o.width}).outerHeight(),t=Math.max(0,o.minHeight-i),e="number"==typeof o.maxHeight?Math.max(0,o.maxHeight-i):"none","auto"===o.height?this.element.css({minHeight:t,maxHeight:e,height:"auto"}):this.element.height(Math.max(0,o.height-i)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var i=$(this);return $("<div>").css({position:"absolute",width:i.outerWidth(),height:i.outerHeight()}).appendTo(i.parent()).offset(i.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(i){return!!$(i.target).closest(".ui-dialog").length||!!$(i.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){
// We use a delay in case the overlay is created from an
// event that we're going to be cancelling (#2804)
var i=!0;this._delay(function(){i=!1}),this.document.data("ui-dialog-overlays")||
// Prevent use of anchors and inputs
// Using _on() for an event handler shared across many instances is
// safe because the dialogs stack and must be closed in reverse order
this._on(this.document,{focusin:function(t){i||this._allowInteraction(t)||(t.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=$("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var i=this.document.data("ui-dialog-overlays")-1;i?this.document.data("ui-dialog-overlays",i):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),$.uiBackCompat!==!1&&$.widget("ui.dialog",$.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(i,t){"dialogClass"===i&&this.uiDialog.removeClass(this.options.dialogClass).addClass(t),this._superApply(arguments)}}),$.ui.dialog});