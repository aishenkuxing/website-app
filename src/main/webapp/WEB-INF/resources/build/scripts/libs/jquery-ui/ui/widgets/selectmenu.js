/*!
 * jQuery UI Selectmenu @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Selectmenu
//>>group: Widgets
// jscs:disable maximumLineLength
//>>description: Duplicates and extends the functionality of a native HTML select element, allowing it to be customizable in behavior and appearance far beyond the limitations of a native select.
// jscs:enable maximumLineLength
//>>docs: http://api.jqueryui.com/selectmenu/
//>>demos: http://jqueryui.com/selectmenu/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/selectmenu.css, ../../themes/base/button.css
//>>css.theme: ../../themes/base/theme.css
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./menu","../escape-selector","../form-reset-mixin","../keycode","../labels","../position","../unique-id","../version","../widget"],e):
// Browser globals
e(jQuery)}(function($){return $.widget("ui.selectmenu",[$.ui.formResetMixin,{version:"@VERSION",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:!1,
// Callbacks
change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this._bindFormResetHandler(),this._rendered=!1,this.menuItems=$()},_drawButton:function(){var e,t=this,i=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);
// Associate existing label with the new button
this.labels=this.element.labels().attr("for",this.ids.button),this._on(this.labels,{click:function(e){this.button.focus(),e.preventDefault()}}),
// Hide original select element
this.element.hide(),
// Create button
this.button=$("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element),this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget"),e=$("<span>").appendTo(this.button),this._addClass(e,"ui-selectmenu-icon","ui-icon "+this.options.icons.button),this.buttonItem=this._renderButtonItem(i).appendTo(this.button),this.options.width!==!1&&this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){
// Delay rendering the menu items until the button receives focus.
// The menu may have already been rendered via a programmatic open.
t._rendered||t._refreshMenu()})},_drawMenu:function(){var e=this;
// Create menu
this.menu=$("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),
// Wrap menu
this.menuWrap=$("<div>").append(this.menu),this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front"),this.menuWrap.appendTo(this._appendTo()),
// Initialize menu widget
this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(t,i){t.preventDefault(),
// Support: IE8
// If the item was selected via a click, the text selection
// will be destroyed in IE
e._setSelection(),e._select(i.item.data("ui-selectmenu-item"),t)},focus:function(t,i){var n=i.item.data("ui-selectmenu-item");
// Prevent inital focus from firing and check if its a newly focused item
null!=e.focusIndex&&n.index!==e.focusIndex&&(e._trigger("focus",t,{item:n}),e.isOpen||e._select(n,t)),e.focusIndex=n.index,e.button.attr("aria-activedescendant",e.menuItems.eq(n.index).attr("id"))}}).menu("instance"),
// Don't close the menu on mouseleave
this.menuInstance._off(this.menu,"mouseleave"),
// Cancel the menu's collapseAll on document click
this.menuInstance._closeOnDocumentClick=function(){return!1},
// Selects often contain empty items, but never contain dividers
this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(
// Fall back to an empty object in case there are no options
this._getSelectedItem().data("ui-selectmenu-item")||{})),null===this.options.width&&this._resizeButton()},_refreshMenu:function(){var e,t=this.element.find("option");this.menu.empty(),this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),this._rendered=!0,t.length&&(e=this._getSelectedItem(),
// Update the menu to have the correct item focused
this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),
// Set disabled state
this._setOption("disabled",this.element.prop("disabled")))},open:function(e){this.options.disabled||(
// If this is the first time the menu is being opened, render the items
this._rendered?(
// Menu clears focus on close, reset focus to selected item
this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),
// If there are no options, don't open the menu
this.menuItems.length&&(this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e)))},_position:function(){this.menuWrap.position($.extend({of:this.button},this.options.position))},close:function(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderButtonItem:function(e){var t=$("<span>");return this._setText(t,e.label),this._addClass(t,"ui-selectmenu-text"),t},_renderMenu:function(e,t){var i=this,n="";$.each(t,function(t,s){var o;s.optgroup!==n&&(o=$("<li>",{text:s.optgroup}),i._addClass(o,"ui-selectmenu-optgroup","ui-menu-divider"+(s.element.parent("optgroup").prop("disabled")?" ui-state-disabled":"")),o.appendTo(e),n=s.optgroup),i._renderItemData(e,s)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t)},_renderItem:function(e,t){var i=$("<li>"),n=$("<div>",{title:t.element.attr("title")});return t.disabled&&this._addClass(i,null,"ui-state-disabled"),this._setText(n,t.label),i.append(n).appendTo(e)},_setText:function(e,t){t?e.text(t):e.html("&#160;")},_move:function(e,t){var i,n,s=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex).parent("li"):(i=this.menuItems.eq(this.element[0].selectedIndex).parent("li"),s+=":not(.ui-state-disabled)"),n="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](s).eq(-1):i[e+"All"](s).eq(0),n.length&&this.menuInstance.focus(t,n)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")},_toggle:function(e){this[this.isOpen?"close":"open"](e)},_setSelection:function(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),
// Support: IE
// Setting the text selection kills the button focus in IE, but
// restoring the focus doesn't kill the selection.
this.button.focus())},_documentClick:{mousedown:function(e){this.isOpen&&($(e.target).closest(".ui-selectmenu-menu, #"+$.ui.escapeSelector(this.ids.button)).length||this.close(e))}},_buttonEvents:{
// Prevent text selection from being reset when interacting with the selectmenu (#10144)
mousedown:function(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange()},click:function(e){this._setSelection(),this._toggle(e)},keydown:function(e){var t=!0;switch(e.keyCode){case $.ui.keyCode.TAB:case $.ui.keyCode.ESCAPE:this.close(e),t=!1;break;case $.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(e);break;case $.ui.keyCode.UP:e.altKey?this._toggle(e):this._move("prev",e);break;case $.ui.keyCode.DOWN:e.altKey?this._toggle(e):this._move("next",e);break;case $.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(e):this._toggle(e);break;case $.ui.keyCode.LEFT:this._move("prev",e);break;case $.ui.keyCode.RIGHT:this._move("next",e);break;case $.ui.keyCode.HOME:case $.ui.keyCode.PAGE_UP:this._move("first",e);break;case $.ui.keyCode.END:case $.ui.keyCode.PAGE_DOWN:this._move("last",e);break;default:this.menu.trigger(e),t=!1}t&&e.preventDefault()}},_selectFocusedItem:function(e){var t=this.menuItems.eq(this.focusIndex).parent("li");t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e)},_select:function(e,t){var i=this.element[0].selectedIndex;
// Change native select element
this.element[0].selectedIndex=e.index,this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(e)),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t)},_setAria:function(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t)},_setOption:function(e,t){if("icons"===e){var i=this.button.find("span.ui-icon");this._removeClass(i,null,this.options.icons.button)._addClass(i,null,t.button)}this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"width"===e&&this._resizeButton()},_setOptionDisabled:function(e){this._super(e),this.menuInstance.option("disabled",e),this.button.attr("aria-disabled",e),this._toggleClass(this.button,null,"ui-state-disabled",e),this.element.prop("disabled",e),e?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?$(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen),
// We can't use two _toggleClass() calls here, because we need to make sure
// we always remove classes first and add them second, otherwise if both classes have the
// same theme class, it will be removed after we add it.
this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var e=this.options.width;
// For `width: false`, just remove inline style and stop
if(e===!1)return void this.button.css("width","");
// For `width: null`, match the width of the original element
null===e&&(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),
// Support: IE10
// IE10 wraps long text (possibly a rounding bug)
// so we add 1px to avoid the wrapping
this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){var e=this._super();return e.disabled=this.element.prop("disabled"),e},_parseOptions:function(e){var t=this,i=[];e.each(function(e,n){i.push(t._parseOption($(n),e))}),this.items=i},_parseOption:function(e,t){var i=e.parent("optgroup");return{element:e,index:t,value:e.val(),label:e.text(),optgroup:i.attr("label")||"",disabled:i.prop("disabled")||e.prop("disabled")}},_destroy:function(){this._unbindFormResetHandler(),this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.labels.attr("for",this.ids.element)}}])});