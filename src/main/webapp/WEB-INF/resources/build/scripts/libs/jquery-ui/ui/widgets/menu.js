/*!
 * jQuery UI Menu @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Menu
//>>group: Widgets
//>>description: Creates nestable menus.
//>>docs: http://api.jqueryui.com/menu/
//>>demos: http://jqueryui.com/menu/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/menu.css
//>>css.theme: ../../themes/base/theme.css
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../keycode","../position","../safe-active-element","../unique-id","../version","../widget"],e):
// Browser globals
e(jQuery)}(function($){return $.widget("ui.menu",{version:"@VERSION",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",
// Callbacks
blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,
// Flag used to prevent firing of the click handler
// as the event bubbles up through nested menus
this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({
// Prevent focus from sticking to links inside menu after clicking
// them (focus should always stay on UL during navigation).
"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(e){var t=$(e.target),i=$($.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&t.not(".ui-state-disabled").length&&(this.select(e),
// Only set the mouseHandled flag if the event will bubble, see #9469.
e.isPropagationStopped()||(this.mouseHandled=!0),
// Open submenu on click
t.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&i.closest(".ui-menu").length&&(
// Redirect focus to the menu
this.element.trigger("focus",[!0]),
// If the active item is on the top level, let it stay active.
// Otherwise, blur the active item since it is no longer visible.
this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){
// Ignore mouse events while typeahead is active, see #10458.
// Prevents focusing the wrong item when typeahead causes a scroll while the mouse
// is over an item in the menu
if(!this.previousFilter){var t=$(e.target).closest(".ui-menu-item"),i=$(e.currentTarget);
// Ignore bubbled events on parent items, see #11641
t[0]===i[0]&&(
// Remove ui-state-active class from siblings of the newly focused menu item
// to avoid a jump caused by adjacent elements both having a class with a border
this._removeClass(i.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(e,i))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){
// If there's already an active item, keep it active
// If not, activate the first item
var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(e){this._delay(function(){!$.contains(this.element[0],$.ui.safeActiveElement(this.document[0]))&&this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),
// Clicks outside of a menu collapse any open menus
this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),
// Reset the mouseHandled flag
this.mouseHandled=!1}})},_destroy:function(){var e=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),t=e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
// Destroy (sub)menus
this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),t.children().each(function(){var e=$(this);e.data("ui-menu-submenu-caret")&&e.remove()})},_keydown:function(e){var t,i,s,n,a=!0;switch(e.keyCode){case $.ui.keyCode.PAGE_UP:this.previousPage(e);break;case $.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case $.ui.keyCode.HOME:this._move("first","first",e);break;case $.ui.keyCode.END:this._move("last","last",e);break;case $.ui.keyCode.UP:this.previous(e);break;case $.ui.keyCode.DOWN:this.next(e);break;case $.ui.keyCode.LEFT:this.collapse(e);break;case $.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:this._activate(e);break;case $.ui.keyCode.ESCAPE:this.collapse(e);break;default:a=!1,i=this.previousFilter||"",n=!1,
// Support number pad values
s=e.keyCode>=96&&e.keyCode<=105?(e.keyCode-96).toString():String.fromCharCode(e.keyCode),clearTimeout(this.filterTimer),s===i?n=!0:s=i+s,t=this._filterMenuItems(s),t=n&&t.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):t,
// If no matches on the current filter, reset to the last character pressed
// to move down the menu to the first item that starts with that character
t.length||(s=String.fromCharCode(e.keyCode),t=this._filterMenuItems(s)),t.length?(this.focus(e,t),this.previousFilter=s,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}a&&e.preventDefault()},_activate:function(e){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var e,t,i,s,n,a=this,u=this.options.icons.submenu,o=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),
// Initialize nested menus
i=o.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=$(this),t=e.prev(),i=$("<span>").data("ui-menu-submenu-caret",!0);a._addClass(i,"ui-menu-icon","ui-icon "+u),t.attr("aria-haspopup","true").prepend(i),e.attr("aria-labelledby",t.attr("id"))}),this._addClass(i,"ui-menu","ui-widget ui-widget-content ui-front"),e=o.add(this.element),t=e.find(this.options.items),
// Initialize menu-items containing spaces and/or dashes only as dividers
t.not(".ui-menu-item").each(function(){var e=$(this);a._isDivider(e)&&a._addClass(e,"ui-menu-divider","ui-widget-content")}),
// Don't refresh list items that are already adapted
s=t.not(".ui-menu-item, .ui-menu-divider"),n=s.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(s,"ui-menu-item")._addClass(n,"ui-menu-item-wrapper"),
// Add aria-disabled attribute to any disabled menu item
t.filter(".ui-state-disabled").attr("aria-disabled","true"),
// If the active item has been removed, blur the menu
this.active&&!$.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){if("icons"===e){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,t.submenu)}this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",String(e)),this._toggleClass(null,"ui-state-disabled",!!e)},focus:function(e,t){var i,s,n;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),
// Only update aria-activedescendant if there's a role
// otherwise we assume focus is managed elsewhere
this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),
// Highlight active parent menu item, if any
n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(e){var t,i,s,n,a,u;this._hasScroll()&&(t=parseFloat($.css(this.activeMenu[0],"borderTopWidth"))||0,i=parseFloat($.css(this.activeMenu[0],"paddingTop"))||0,s=e.offset().top-this.activeMenu.offset().top-t-i,n=this.activeMenu.scrollTop(),a=this.activeMenu.height(),u=e.outerHeight(),s<0?this.activeMenu.scrollTop(n+s):s+u>a&&this.activeMenu.scrollTop(n+s-a+u))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",e,{item:this.active}),this.active=null)},_startOpening:function(e){clearTimeout(this.timer),
// Don't open if already open fixes a Firefox bug that caused a .5 pixel
// shift in the submenu position when mousing over the caret icon
"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(e){var t=$.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(t)},collapseAll:function(e,t){clearTimeout(this.timer),this.timer=this._delay(function(){
// If we were passed an event, look for the submenu that contains the event
var i=t?this.element:$(e&&e.target).closest(this.element.find(".ui-menu"));
// If we found no valid submenu ancestor, use the main menu to close all
// sub menus anyway
i.length||(i=this.element),this._close(i),this.blur(e),
// Work around active item staying active after menu is blurred
this._removeClass(i.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=i},this.delay)},
// With no arguments, closes the currently active menu - if nothing is active
// it closes all menus.  If passed an argument, it will search for menus BELOW
_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(e){return!$(e.target).closest(".ui-menu").length},_isDivider:function(e){
// Match hyphen, em dash, en dash
return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),
// Delay so Firefox will not hide activedescendant change in expanding submenu from AT
this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(e){var t,i,s;if(!this.active)return void this.next(e);this.isLastItem()||(this._hasScroll()?(i=this.active.offset().top,s=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return t=$(this),t.offset().top-i-s<0}),this.focus(e,t)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))},previousPage:function(e){var t,i,s;if(!this.active)return void this.next(e);this.isFirstItem()||(this._hasScroll()?(i=this.active.offset().top,s=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return t=$(this),t.offset().top-i+s>0}),this.focus(e,t)):this.focus(e,this.activeMenu.find(this.options.items).first()))},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){
// TODO: It should never be possible to not have an active item at this
// point, but the tests don't trigger mouseenter before click.
this.active=this.active||$(e.target).closest(".ui-menu-item");var t={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,t)},_filterMenuItems:function(e){var t=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),i=new RegExp("^"+t,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return i.test($.trim($(this).children(".ui-menu-item-wrapper").text()))})}})});