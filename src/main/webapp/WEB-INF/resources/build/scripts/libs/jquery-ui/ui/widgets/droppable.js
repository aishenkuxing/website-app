!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./draggable","./mouse","../version","../widget"],e):
// Browser globals
e(jQuery)}(function($){$.widget("ui.droppable",{version:"@VERSION",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",
// Callbacks
activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,t=this.options,i=t.accept;this.isover=!1,this.isout=!0,this.accept=$.isFunction(i)?i:function(e){return e.is(i)},this.proportions=function(){if(!arguments.length)
// Retrieve or derive the droppable's proportions
return e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
// Store the droppable's proportions
e=arguments[0]},this._addToManager(t.scope),t.addClasses&&this._addClass("ui-droppable")},_addToManager:function(e){
// Add the reference and positions to the manager
$.ui.ddmanager.droppables[e]=$.ui.ddmanager.droppables[e]||[],$.ui.ddmanager.droppables[e].push(this)},_splice:function(e){for(var t=0;t<e.length;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var e=$.ui.ddmanager.droppables[this.options.scope];this._splice(e)},_setOption:function(e,t){if("accept"===e)this.accept=$.isFunction(t)?t:function(e){return e.is(t)};else if("scope"===e){var i=$.ui.ddmanager.droppables[this.options.scope];this._splice(i),this._addToManager(t)}this._super(e,t)},_activate:function(e){var t=$.ui.ddmanager.current;this._addActiveClass(),t&&this._trigger("activate",e,this.ui(t))},_deactivate:function(e){var t=$.ui.ddmanager.current;this._removeActiveClass(),t&&this._trigger("deactivate",e,this.ui(t))},_over:function(e){var t=$.ui.ddmanager.current;
// Bail if draggable and droppable are same element
t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this._addHoverClass(),this._trigger("over",e,this.ui(t)))},_out:function(e){var t=$.ui.ddmanager.current;
// Bail if draggable and droppable are same element
t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this._removeHoverClass(),this._trigger("out",e,this.ui(t)))},_drop:function(t,i){var s=i||$.ui.ddmanager.current,o=!1;
// Bail if draggable and droppable are same element
// Bail if draggable and droppable are same element
return!(!s||(s.currentItem||s.element)[0]===this.element[0])&&(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=$(this).droppable("instance");if(i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&e(s,$.extend(i,{offset:i.element.offset()}),i.options.tolerance,t))return o=!0,!1}),!o&&(!!this.accept.call(this.element[0],s.currentItem||s.element)&&(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",t,this.ui(s)),this.element)))},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}},
// Extension points just to make backcompat sane and avoid duplicating logic
// TODO: Remove in 1.13 along with call to it below
_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var e=$.ui.intersect=function(){function e(e,t,i){return e>=t&&e<t+i}return function(t,i,s,o){if(!i.offset)return!1;var n=(t.positionAbs||t.position.absolute).left+t.margins.left,r=(t.positionAbs||t.position.absolute).top+t.margins.top,a=n+t.helperProportions.width,l=r+t.helperProportions.height,p=i.offset.left,d=i.offset.top,c=p+i.proportions().width,h=d+i.proportions().height;switch(s){case"fit":return p<=n&&a<=c&&d<=r&&l<=h;case"intersect":// Right Half
// Left Half
// Bottom Half
return p<n+t.helperProportions.width/2&&a-t.helperProportions.width/2<c&&d<r+t.helperProportions.height/2&&l-t.helperProportions.height/2<h;// Top Half
case"pointer":return e(o.pageY,d,i.proportions().height)&&e(o.pageX,p,i.proportions().width);case"touch":// Top edge touching
// Bottom edge touching
// Left edge touching
// Right edge touching
return(r>=d&&r<=h||l>=d&&l<=h||r<d&&l>h)&&(n>=p&&n<=c||a>=p&&a<=c||n<p&&a>c);default:return!1}}}();/*
	This manager tracks offsets of draggables and droppables
*/
// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
// Backcompat for activeClass and hoverClass options
return $.ui.ddmanager={current:null,droppables:{default:[]},prepareOffsets:function(e,t){var i,s,o=$.ui.ddmanager.droppables[e.options.scope]||[],n=t?t.type:null,// workaround for #2317
r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();e:for(i=0;i<o.length;i++)
// No disabled and non-accepted
if(!(o[i].options.disabled||e&&!o[i].accept.call(o[i].element[0],e.currentItem||e.element))){
// Filter out elements in the current dragged item
for(s=0;s<r.length;s++)if(r[s]===o[i].element[0]){o[i].proportions().height=0;continue e}o[i].visible="none"!==o[i].element.css("display"),o[i].visible&&(
// Activate the droppable if used directly from draggables
"mousedown"===n&&o[i]._activate.call(o[i],t),o[i].offset=o[i].element.offset(),o[i].proportions({width:o[i].element[0].offsetWidth,height:o[i].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;
// Create a copy of the droppables in case the list changes during the drop (#9116)
return $.each(($.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,t){
// Listen for scrolling so that if the dragging causes scrolling the position of the
// droppables can be recalculated (see #5003)
e.element.parentsUntil("body").on("scroll.droppable",function(){e.options.refreshPositions||$.ui.ddmanager.prepareOffsets(e,t)})},drag:function(t,i){
// If you have a highly dynamic page, you might try this option. It renders positions
// every time you move the mouse.
t.options.refreshPositions&&$.ui.ddmanager.prepareOffsets(t,i),
// Run through all droppables and check their positions based on specific tolerance options
$.each($.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,o,n,r=e(t,this,this.options.tolerance,i),a=!r&&this.isover?"isout":r&&!this.isover?"isover":null;a&&(this.options.greedy&&(
// find droppable parents with same scope
o=this.options.scope,n=this.element.parents(":data(ui-droppable)").filter(function(){return $(this).droppable("instance").options.scope===o}),n.length&&(s=$(n[0]).droppable("instance"),s.greedyChild="isover"===a)),
// We just moved into a greedy child
s&&"isover"===a&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[a]=!0,this["isout"===a?"isover":"isout"]=!1,this["isover"===a?"_over":"_out"].call(this,i),
// We just moved out of a greedy child
s&&"isout"===a&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,t){e.element.parentsUntil("body").off("scroll.droppable"),
// Call prepareOffsets one final time since IE does not fire return scroll events when
// overflow was caused by drag (see #5003)
e.options.refreshPositions||$.ui.ddmanager.prepareOffsets(e,t)}},$.uiBackCompat!==!1&&$.widget("ui.droppable",$.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}}),$.ui.droppable});