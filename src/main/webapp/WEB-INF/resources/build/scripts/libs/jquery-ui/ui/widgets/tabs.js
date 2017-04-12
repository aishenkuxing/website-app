/*!
 * jQuery UI Tabs @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Tabs
//>>group: Widgets
//>>description: Transforms a set of container elements into a tab structure.
//>>docs: http://api.jqueryui.com/tabs/
//>>demos: http://jqueryui.com/tabs/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/tabs.css
//>>css.theme: ../../themes/base/theme.css
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../escape-selector","../keycode","../safe-active-element","../unique-id","../version","../widget"],t):
// Browser globals
t(jQuery)}(function($){
// DEPRECATED
// TODO: Switch return back to widget declaration at top of file when this is removed
// Backcompat for ui-tab class (now ui-tabs-tab)
return $.widget("ui.tabs",{version:"@VERSION",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,
// Callbacks
activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){return function(t){var e,i;e=t.href.replace(/#.*$/,""),i=location.href.replace(/#.*$/,"");
// Decoding may throw an error if the URL isn't UTF-8 (#9518)
try{e=decodeURIComponent(e)}catch(t){}try{i=decodeURIComponent(i)}catch(t){}return t.hash.length>1&&e===i}}(),_create:function(){var t=this,e=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,e.collapsible),this._processTabs(),e.active=this._initialActive(),
// Take disabling tabs via class attribute from HTML
// into account and update option properly.
$.isArray(e.disabled)&&(e.disabled=$.unique(e.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),
// Check for length avoids error when initializing empty list
this.options.active!==!1&&this.anchors.length?this.active=this._findActive(e.active):this.active=$(),this._refresh(),this.active.length&&this.load(e.active)},_initialActive:function(){var t=this.options.active,e=this.options.collapsible,i=location.hash.substring(1);
// check the fragment identifier in the URL
// Check for a tab marked active via a class
// No active tab, set to false
// Handle numbers: negative, out of range
// Don't allow collapsible: false and active: false
return null===t&&(i&&this.tabs.each(function(e,a){if($(a).attr("aria-controls")===i)return t=e,!1}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),null!==t&&t!==-1||(t=!!this.tabs.length&&0)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)))===-1&&(t=!e&&0),!e&&t===!1&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):$()}},_tabKeydown:function(t){var e=$($.ui.safeActiveElement(this.document[0])).closest("li"),i=this.tabs.index(e),a=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:i++;break;case $.ui.keyCode.UP:case $.ui.keyCode.LEFT:a=!1,i--;break;case $.ui.keyCode.END:i=this.anchors.length-1;break;case $.ui.keyCode.HOME:i=0;break;case $.ui.keyCode.SPACE:
// Activate only, no collapsing
return t.preventDefault(),clearTimeout(this.activating),void this._activate(i);case $.ui.keyCode.ENTER:
// Toggle (cancel delayed activation, allow collapsing)
// Determine if we should collapse or activate
return t.preventDefault(),clearTimeout(this.activating),void this._activate(i!==this.options.active&&i);default:return}
// Focus the appropriate tab, based on which key was pressed
t.preventDefault(),clearTimeout(this.activating),i=this._focusNextTab(i,a),
// Navigating with control/command key will prevent automatic activation
t.ctrlKey||t.metaKey||(
// Update aria-selected immediately so that AT think the tab is already selected.
// Otherwise AT may confuse the user by stating that they need to activate the tab,
// but the tab will already be activated by the time the announcement finishes.
e.attr("aria-selected","false"),this.tabs.eq(i).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",i)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||
// Ctrl+up moves focus to the current tab
t.ctrlKey&&t.keyCode===$.ui.keyCode.UP&&(t.preventDefault(),this.active.trigger("focus"))},
// Alt+page up/down moves focus to the previous/next tab (and activates)
_handlePageNav:function(t){return t.altKey&&t.keyCode===$.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===$.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,e){for(var i=this.tabs.length-1;$.inArray(function(){return t>i&&(t=0),t<0&&(t=i),t}(),this.options.disabled)!==-1;)t=e?t+1:t-1;return t},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).trigger("focus"),t},_setOption:function(t,e){if("active"===t)
// _activate() will handle invalid values and update this.options
return void this._activate(e);this._super(t,e),"collapsible"===t&&(this._toggleClass("ui-tabs-collapsible",null,e),
// Setting collapsible: false while collapsed; open first panel
e||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(e),"heightStyle"===t&&this._setupHeightStyle(e)},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,e=this.tablist.children(":has(a[href])");
// Get disabled tabs from class attribute from HTML
// this will get converted to a boolean if needed in _refresh()
t.disabled=$.map(e.filter(".ui-state-disabled"),function(t){return e.index(t)}),this._processTabs(),
// Was collapsed or no tabs
t.active!==!1&&this.anchors.length?this.active.length&&!$.contains(this.tablist[0],this.active[0])?
// all remaining tabs are disabled
this.tabs.length===t.disabled.length?(t.active=!1,this.active=$()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):
// make sure active index is correct
t.active=this.tabs.index(this.active):(t.active=!1,this.active=$()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),
// Make sure one tab is in the tab order
this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,e=this.tabs,i=this.anchors,a=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),
// Prevent users from focusing disabled tabs via click
this.tablist.on("mousedown"+this.eventNamespace,"> li",function(t){$(this).is(".ui-state-disabled")&&t.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){$(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return $("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=$(),this.anchors.each(function(e,i){var a,s,n,h=$(i).uniqueId().attr("id"),r=$(i).closest("li"),o=r.attr("aria-controls");
// Inline tab
t._isLocal(i)?(a=i.hash,n=a.substring(1),s=t.element.find(t._sanitizeSelector(a))):(
// If the tab doesn't already have aria-controls,
// generate an id by using a throw-away element
n=r.attr("aria-controls")||$({}).uniqueId()[0].id,a="#"+n,s=t.element.find(a),s.length||(s=t._createPanel(n),s.insertAfter(t.panels[e-1]||t.tablist)),s.attr("aria-live","polite")),s.length&&(t.panels=t.panels.add(s)),o&&r.data("ui-tabs-aria-controls",o),r.attr({"aria-controls":n,"aria-labelledby":h}),s.attr("aria-labelledby",h)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),
// Avoid memory leaks (#10056)
e&&(this._off(e.not(this.tabs)),this._off(i.not(this.anchors)),this._off(a.not(this.panels)))},
// Allow overriding how to find the list for rare usage scenarios (#7715)
_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(t){return $("<div>").attr("id",t).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(t){var e,i,a;
// Disable tabs
for($.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1),a=0;i=this.tabs[a];a++)e=$(i),t===!0||$.inArray(a,t)!==-1?(e.attr("aria-disabled","true"),this._addClass(e,null,"ui-state-disabled")):(e.removeAttr("aria-disabled"),this._removeClass(e,null,"ui-state-disabled"));this.options.disabled=t,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,t===!0)},_setupEvents:function(t){var e={};t&&$.each(t.split(" "),function(t,i){e[i]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),
// Always prevent the default action, even when disabled
this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,e),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var e,i=this.element.parent();"fill"===t?(e=i.height(),e-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=$(this),i=t.css("position");"absolute"!==i&&"fixed"!==i&&(e-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){e-=$(this).outerHeight(!0)}),this.panels.each(function(){$(this).height(Math.max(0,e-$(this).innerHeight()+$(this).height()))}).css("overflow","auto")):"auto"===t&&(e=0,this.panels.each(function(){e=Math.max(e,$(this).height("").height())}).height(e))},_eventHandler:function(t){var e=this.options,i=this.active,a=$(t.currentTarget),s=a.closest("li"),n=s[0]===i[0],h=n&&e.collapsible,r=h?$():this._getPanelForTab(s),o=i.length?this._getPanelForTab(i):$(),l={oldTab:i,oldPanel:o,newTab:h?$():s,newPanel:r};t.preventDefault(),s.hasClass("ui-state-disabled")||
// tab is already loading
s.hasClass("ui-tabs-loading")||
// can't switch durning an animation
this.running||
// click on active header, but not collapsible
n&&!e.collapsible||
// allow canceling activation
this._trigger("beforeActivate",t,l)===!1||(e.active=!h&&this.tabs.index(s),this.active=n?$():s,this.xhr&&this.xhr.abort(),o.length||r.length||$.error("jQuery UI Tabs: Mismatching fragment identifier."),r.length&&this.load(this.tabs.index(s),t),this._toggle(t,l))},
// Handles show/hide for selecting tabs
_toggle:function(t,e){function i(){s.running=!1,s._trigger("activate",t,e)}function a(){s._addClass(e.newTab.closest("li"),"ui-tabs-active","ui-state-active"),n.length&&s.options.show?s._show(n,s.options.show,i):(n.show(),i())}var s=this,n=e.newPanel,h=e.oldPanel;this.running=!0,
// Start out by hiding, then showing, then completing
h.length&&this.options.hide?this._hide(h,this.options.hide,function(){s._removeClass(e.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),a()}):(this._removeClass(e.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),h.hide(),a()),h.attr("aria-hidden","true"),e.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),
// If we're switching tabs, remove the old tab from the tab order.
// If we're opening from collapsed state, remove the previous tab from the tab order.
// If we're collapsing, then keep the collapsing tab in the tab order.
n.length&&h.length?e.oldTab.attr("tabIndex",-1):n.length&&this.tabs.filter(function(){return 0===$(this).attr("tabIndex")}).attr("tabIndex",-1),n.attr("aria-hidden","false"),e.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var e,i=this._findActive(t);
// Trying to activate the already active panel
i[0]!==this.active[0]&&(
// Trying to collapse, simulate a click on the current active header
i.length||(i=this.active),e=i.find(".ui-tabs-anchor")[0],this._eventHandler({target:e,currentTarget:e,preventDefault:$.noop}))},_findActive:function(t){return t===!1?$():this.tabs.eq(t)},_getIndex:function(t){
// meta-function to give users option to provide a href string instead of a numerical index.
return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+$.ui.escapeSelector(t)+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){$.data(this,"ui-tabs-destroy")?$(this).remove():$(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var t=$(this),e=t.data("ui-tabs-aria-controls");e?t.attr("aria-controls",e).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(t){var e=this.options.disabled;e!==!1&&(void 0===t?e=!1:(t=this._getIndex(t),e=$.isArray(e)?$.map(e,function(e){return e!==t?e:null}):$.map(this.tabs,function(e,i){return i!==t?i:null})),this._setOptionDisabled(e))},disable:function(t){var e=this.options.disabled;if(e!==!0){if(void 0===t)e=!0;else{if(t=this._getIndex(t),$.inArray(t,e)!==-1)return;e=$.isArray(e)?$.merge([t],e).sort():[t]}this._setOptionDisabled(e)}},load:function(t,e){t=this._getIndex(t);var i=this,a=this.tabs.eq(t),s=a.find(".ui-tabs-anchor"),n=this._getPanelForTab(a),h={tab:a,panel:n},r=function(t,e){"abort"===e&&i.panels.stop(!1,!0),i._removeClass(a,"ui-tabs-loading"),n.removeAttr("aria-busy"),t===i.xhr&&delete i.xhr};
// Not remote
this._isLocal(s[0])||(this.xhr=$.ajax(this._ajaxSettings(s,e,h)),
// Support: jQuery <1.8
// jQuery <1.8 returns false if the request is canceled in beforeSend,
// but as of 1.8, $.ajax() always returns a jqXHR object.
this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(a,"ui-tabs-loading"),n.attr("aria-busy","true"),this.xhr.done(function(t,a,s){
// support: jQuery <1.8
// http://bugs.jquery.com/ticket/11778
setTimeout(function(){n.html(t),i._trigger("load",e,h),r(s,a)},1)}).fail(function(t,e){
// support: jQuery <1.8
// http://bugs.jquery.com/ticket/11778
setTimeout(function(){r(t,e)},1)})))},_ajaxSettings:function(t,e,i){var a=this;return{
// Support: IE <11 only
// Strip any hash that exists to prevent errors with the Ajax request
url:t.attr("href").replace(/#.*$/,""),beforeSend:function(t,s){return a._trigger("beforeLoad",e,$.extend({jqXHR:t,ajaxSettings:s},i))}}},_getPanelForTab:function(t){var e=$(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+e))}}),$.uiBackCompat!==!1&&$.widget("ui.tabs",$.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),$.ui.tabs});