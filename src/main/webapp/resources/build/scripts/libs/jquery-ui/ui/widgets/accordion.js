/*!
 * jQuery UI Accordion @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Accordion
//>>group: Widgets
// jscs:disable maximumLineLength
//>>description: Displays collapsible content panels for presenting information in a limited amount of space.
// jscs:enable maximumLineLength
//>>docs: http://api.jqueryui.com/accordion/
//>>demos: http://jqueryui.com/accordion/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/accordion.css
//>>css.theme: ../../themes/base/theme.css
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","../version","../keycode","../unique-id","../widget"],e):
// Browser globals
e(jQuery)}(function($){return $.widget("ui.accordion",{version:"@VERSION",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},
// Callbacks
activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var e=this.options;this.prevShow=this.prevHide=$(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),
// Don't allow collapsible: false and active: false / null
e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),
// handle negative values
e.active<0&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():$()}},_createIcons:function(){var e,t,i=this.options.icons;i&&(e=$("<span>"),this._addClass(e,"ui-accordion-header-icon","ui-icon "+i.header),e.prependTo(this.headers),t=this.active.children(".ui-accordion-header-icon"),this._removeClass(t,i.header)._addClass(t,null,i.activeHeader)._addClass(this.headers,"ui-accordion-icons"))},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;
// Clean up main element
this.element.removeAttr("role"),
// Clean up headers
this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),
// Clean up content panels
e=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){if("active"===e)
// _activate() will handle invalid values and update this.options
return void this._activate(t);"event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),
// Setting collapsible: false while collapsed; open first panel
"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons())},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",e),
// Support: IE8 Only
// #5332 / #6059 - opacity doesn't cascade to positioned elements in IE
// so we need to add the disabled class to the headers and panels
this._toggleClass(null,"ui-state-disabled",!!e),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!e)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var t=$.ui.keyCode,i=this.headers.length,a=this.headers.index(e.target),s=!1;switch(e.keyCode){case t.RIGHT:case t.DOWN:s=this.headers[(a+1)%i];break;case t.LEFT:case t.UP:s=this.headers[(a-1+i)%i];break;case t.SPACE:case t.ENTER:this._eventHandler(e);break;case t.HOME:s=this.headers[0];break;case t.END:s=this.headers[i-1]}s&&($(e.target).attr("tabIndex",-1),$(s).attr("tabIndex",0),$(s).trigger("focus"),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===$.ui.keyCode.UP&&e.ctrlKey&&$(e.currentTarget).prev().trigger("focus")},refresh:function(){var e=this.options;this._processPanels(),
// Was collapsed or no panel
e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=$()):e.active===!1?this._activate(0):this.active.length&&!$.contains(this.element[0],this.active[0])?
// all remaining panel are disabled
this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=$()):this._activate(Math.max(0,e.active-1)):
// make sure active index is correct
e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),
// Avoid memory leaks (#10056)
t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))},_refresh:function(){var e,t=this.options,i=t.heightStyle,a=this.element.parent();this.active=this._findActive(t.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var e=$(this),t=e.uniqueId().attr("id"),i=e.next(),a=i.uniqueId().attr("id");e.attr("aria-controls",a),i.attr("aria-labelledby",t)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),
// Make sure at least one header is in the tab order
this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(t.event),"fill"===i?(e=a.height(),this.element.siblings(":visible").each(function(){var t=$(this),i=t.css("position");"absolute"!==i&&"fixed"!==i&&(e-=t.outerHeight(!0))}),this.headers.each(function(){e-=$(this).outerHeight(!0)}),this.headers.next().each(function(){$(this).height(Math.max(0,e-$(this).innerHeight()+$(this).height()))}).css("overflow","auto")):"auto"===i&&(e=0,this.headers.next().each(function(){var t=$(this).is(":visible");t||$(this).show(),e=Math.max(e,$(this).css("height","").height()),t||$(this).hide()}).height(e))},_activate:function(e){var t=this._findActive(e)[0];
// Trying to activate the already active panel
t!==this.active[0]&&(
// Trying to collapse, simulate a click on the currently active header
t=t||this.active[0],this._eventHandler({target:t,currentTarget:t,preventDefault:$.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):$()},_setupEvents:function(e){var t={keydown:"_keydown"};e&&$.each(e.split(" "),function(e,i){t[i]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,t),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var t,i,a=this.options,s=this.active,n=$(e.currentTarget),h=n[0]===s[0],r=h&&a.collapsible,o=r?$():n.next(),d=s.next(),c={oldHeader:s,oldPanel:d,newHeader:r?$():n,newPanel:o};e.preventDefault(),
// click on active header, but not collapsible
h&&!a.collapsible||
// allow canceling activation
this._trigger("beforeActivate",e,c)===!1||(a.active=!r&&this.headers.index(n),
// When the call to ._toggle() comes after the class changes
// it causes a very odd bug in IE 8 (see #6720)
this.active=h?$():n,this._toggle(c),
// Switch classes
// corner classes on the previously active header stay after the animation
this._removeClass(s,"ui-accordion-header-active","ui-state-active"),a.icons&&(t=s.children(".ui-accordion-header-icon"),this._removeClass(t,null,a.icons.activeHeader)._addClass(t,null,a.icons.header)),h||(this._removeClass(n,"ui-accordion-header-collapsed")._addClass(n,"ui-accordion-header-active","ui-state-active"),a.icons&&(i=n.children(".ui-accordion-header-icon"),this._removeClass(i,null,a.icons.header)._addClass(i,null,a.icons.activeHeader)),this._addClass(n.next(),"ui-accordion-content-active")))},_toggle:function(e){var t=e.newPanel,i=this.prevShow.length?this.prevShow:e.oldPanel;
// Handle activating a panel during the animation for another activation
this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=t,this.prevHide=i,this.options.animate?this._animate(t,i,e):(i.hide(),t.show(),this._toggleComplete(e)),i.attr({"aria-hidden":"true"}),i.prev().attr({"aria-selected":"false","aria-expanded":"false"}),
// if we're switching panels, remove the old header from the tab order
// if we're opening from collapsed state, remove the previous header from the tab order
// if we're collapsing, then keep the collapsing header in the tab order
t.length&&i.length?i.prev().attr({tabIndex:-1,"aria-expanded":"false"}):t.length&&this.headers.filter(function(){return 0===parseInt($(this).attr("tabIndex"),10)}).attr("tabIndex",-1),t.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(e,t,i){var a,s,n,h=this,r=0,o=e.css("box-sizing"),d=e.length&&(!t.length||e.index()<t.index()),c=this.options.animate||{},l=d&&c.down||c,u=function(){h._toggleComplete(i)};
// fall back from options to animation in case of partial down settings
return"number"==typeof l&&(n=l),"string"==typeof l&&(s=l),s=s||l.easing||c.easing,n=n||l.duration||c.duration,t.length?e.length?(a=e.show().outerHeight(),t.animate(this.hideProps,{duration:n,easing:s,step:function(e,t){t.now=Math.round(e)}}),void e.hide().animate(this.showProps,{duration:n,easing:s,complete:u,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?"content-box"===o&&(r+=i.now):"content"!==h.options.heightStyle&&(i.now=Math.round(a-t.outerHeight()-r),r=0)}})):t.animate(this.hideProps,n,s,u):e.animate(this.showProps,n,s,u)},_toggleComplete:function(e){var t=e.oldPanel,i=t.prev();this._removeClass(t,"ui-accordion-content-active"),this._removeClass(i,"ui-accordion-header-active")._addClass(i,"ui-accordion-header-collapsed"),
// Work around for rendering bug in IE (#5421)
t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}})});