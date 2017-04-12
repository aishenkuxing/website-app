/*!
 * jQuery UI Selectable @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Selectable
//>>group: Interactions
//>>description: Allows groups of elements to be selected with the mouse.
//>>docs: http://api.jqueryui.com/selectable/
//>>demos: http://jqueryui.com/selectable/
//>>css.structure: ../../themes/base/selectable.css
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./mouse","../version","../widget"],e):
// Browser globals
e(jQuery)}(function($){return $.widget("ui.selectable",$.ui.mouse,{version:"@VERSION",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",
// Callbacks
selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e=this;this._addClass("ui-selectable"),this.dragged=!1,
// Cache selectee children based on filter
this.refresh=function(){e.elementPos=$(e.element[0]).offset(),e.selectees=$(e.options.filter,e.element[0]),e._addClass(e.selectees,"ui-selectee"),e.selectees.each(function(){var t=$(this),s=t.offset(),l={left:s.left-e.elementPos.left,top:s.top-e.elementPos.top};$.data(this,"selectable-item",{element:this,$element:t,left:l.left,top:l.top,right:l.left+t.outerWidth(),bottom:l.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=$("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(e){var t=this,s=this.options;this.opos=[e.pageX,e.pageY],this.elementPos=$(this.element[0]).offset(),this.options.disabled||(this.selectees=$(s.filter,this.element[0]),this._trigger("start",e),$(s.appendTo).append(this.helper),
// position helper (lasso)
this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=$.data(this,"selectable-item");s.startselected=!0,e.metaKey||e.ctrlKey||(t._removeClass(s.$element,"ui-selected"),s.selected=!1,t._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,
// selectable UNSELECTING callback
t._trigger("unselecting",e,{unselecting:s.element}))}),$(e.target).parents().addBack().each(function(){var s,l=$.data(this,"selectable-item");if(l)
// selectable (UN)SELECTING callback
return s=!e.metaKey&&!e.ctrlKey||!l.$element.hasClass("ui-selected"),t._removeClass(l.$element,s?"ui-unselecting":"ui-selected")._addClass(l.$element,s?"ui-selecting":"ui-unselecting"),l.unselecting=!s,l.selecting=s,l.selected=s,s?t._trigger("selecting",e,{selecting:l.element}):t._trigger("unselecting",e,{unselecting:l.element}),!1}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var t,s=this,l=this.options,i=this.opos[0],n=this.opos[1],c=e.pageX,a=e.pageY;return i>c&&(t=c,c=i,i=t),n>a&&(t=a,a=n,n=t),this.helper.css({left:i,top:n,width:c-i,height:a-n}),this.selectees.each(function(){var t=$.data(this,"selectable-item"),o=!1,r={};
//prevent helper from being selected if appendTo: selectable
t&&t.element!==s.element[0]&&(r.left=t.left+s.elementPos.left,r.right=t.right+s.elementPos.left,r.top=t.top+s.elementPos.top,r.bottom=t.bottom+s.elementPos.top,"touch"===l.tolerance?o=!(r.left>c||r.right<i||r.top>a||r.bottom<n):"fit"===l.tolerance&&(o=r.left>i&&r.right<c&&r.top>n&&r.bottom<a),o?(
// SELECT
t.selected&&(s._removeClass(t.$element,"ui-selected"),t.selected=!1),t.unselecting&&(s._removeClass(t.$element,"ui-unselecting"),t.unselecting=!1),t.selecting||(s._addClass(t.$element,"ui-selecting"),t.selecting=!0,
// selectable SELECTING callback
s._trigger("selecting",e,{selecting:t.element}))):(
// UNSELECT
t.selecting&&((e.metaKey||e.ctrlKey)&&t.startselected?(s._removeClass(t.$element,"ui-selecting"),t.selecting=!1,s._addClass(t.$element,"ui-selected"),t.selected=!0):(s._removeClass(t.$element,"ui-selecting"),t.selecting=!1,t.startselected&&(s._addClass(t.$element,"ui-unselecting"),t.unselecting=!0),
// selectable UNSELECTING callback
s._trigger("unselecting",e,{unselecting:t.element}))),t.selected&&(e.metaKey||e.ctrlKey||t.startselected||(s._removeClass(t.$element,"ui-selected"),t.selected=!1,s._addClass(t.$element,"ui-unselecting"),t.unselecting=!0,
// selectable UNSELECTING callback
s._trigger("unselecting",e,{unselecting:t.element})))))}),!1}},_mouseStop:function(e){var t=this;return this.dragged=!1,$(".ui-unselecting",this.element[0]).each(function(){var s=$.data(this,"selectable-item");t._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1,s.startselected=!1,t._trigger("unselected",e,{unselected:s.element})}),$(".ui-selecting",this.element[0]).each(function(){var s=$.data(this,"selectable-item");t._removeClass(s.$element,"ui-selecting")._addClass(s.$element,"ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,t._trigger("selected",e,{selected:s.element})}),this._trigger("stop",e),this.helper.remove(),!1}})});