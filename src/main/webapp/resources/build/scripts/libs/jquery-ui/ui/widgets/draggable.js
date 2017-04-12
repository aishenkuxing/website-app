/*!
 * jQuery UI Draggable @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Draggable
//>>group: Interactions
//>>description: Enables dragging functionality for any element.
//>>docs: http://api.jqueryui.com/draggable/
//>>demos: http://jqueryui.com/draggable/
//>>css.structure: ../../themes/base/draggable.css
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./mouse","../data","../plugin","../safe-active-element","../safe-blur","../scroll-parent","../version","../widget"],t):
// Browser globals
t(jQuery)}(function($){return $.widget("ui.draggable",$.ui.mouse,{version:"@VERSION",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,
// Callbacks
drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){if((this.helper||this.element).is(".ui-draggable-dragging"))return void(this.destroyOnClear=!0);this._removeHandleClassName(),this._mouseDestroy()},_mouseCapture:function(t){var e=this.options;
// Among others, prevent a drag on a resizable-handle
// Among others, prevent a drag on a resizable-handle
//Quit if we're not on a valid handle
return this._blurActiveElement(t),!(this.helper||e.disabled||$(t.target).closest(".ui-resizable-handle").length>0)&&(this.handle=this._getHandle(t),!!this.handle&&(this._blockFrames(e.iframeFix===!0?"iframe":e.iframeFix),!0))},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=$(this);return $("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var e=$.ui.safeActiveElement(this.document[0]),s=$(t.target);
// Only blur if the event occurred on an element that is:
// 1) within the draggable handle
// 2) but not within the currently focused element
// See #10527, #12472
this._getHandle(t)&&s.closest(e).length||
// Blur any element that currently has focus, see #4261
$.ui.safeBlur(e)},_mouseStart:function(t){var e=this.options;
//Trigger event + callbacks
//Create and append the visible helper
//Cache the helper size
//If ddmanager is used for droppables, set the global draggable
/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */
//Cache the margins of the original element
//Store the helper's css position
//The element's absolute position on the page minus margins
//Generate the original position
//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
//Set a containment if given in the options
//Trigger event + callbacks
//Recache the helper size
//Prepare the droppable offsets
// Execute the drag once - this causes the helper not to be visible before getting its
// correct position
// If the ddmanager is used for droppables, inform the manager that dragging has started
// (see #5003)
return this.helper=this._createHelper(t),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),$.ui.ddmanager&&($.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===$(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),$.ui.ddmanager&&!e.dropBehaviour&&$.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),$.ui.ddmanager&&$.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(t,e){
//Call plugins and callbacks and use the resulting position if something is returned
if(
// reset any necessary cached properties (see #5009)
this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),
//Compute the helpers position
this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!e){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp(new $.Event("mouseup",t)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",$.ui.ddmanager&&$.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){
//If we are using droppables, inform the manager about the drop
var e=this,s=!1;
//if a drop comes from outside (a sortable)
return $.ui.ddmanager&&!this.options.dropBehaviour&&(s=$.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||$.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?$(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){e._trigger("stop",t)!==!1&&e._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){
// If the ddmanager is used for droppables, inform the manager that dragging has stopped
// (see #5003)
// Only need to focus if the event occurred on the draggable itself, see #10527
// The interaction is over; whether or not the click resulted in a drag,
// focus the element
return this._unblockFrames(),$.ui.ddmanager&&$.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.trigger("focus"),$.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new $.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(t){return!this.options.handle||!!$(t.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(t){var e=this.options,s=$.isFunction(e.helper),i=s?$(e.helper.apply(this.element[0],[t])):"clone"===e.helper?this.element.clone().removeAttr("id"):this.element;
// Http://bugs.jqueryui.com/ticket/9446
// a helper function can return the original element
// which wouldn't have been set to relative in _create
return i.parents("body").length||i.appendTo("parent"===e.appendTo?this.element[0].parentNode:e.appendTo),s&&i[0]===this.element[0]&&this._setPositionRelative(),i[0]===this.element[0]||/(fixed|absolute)/.test(i.css("position"))||i.css("position","absolute"),i},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),$.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){
//Get the offsetParent and cache its position
var t=this.offsetParent.offset(),e=this.document[0];
// This is a special case where we need to modify a offset calculated on start, since the
// following happened:
// 1. The position of the helper is absolute, so it's position is calculated based on the
// next positioned parent
// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
// the document, which means that the scroll is included in the initial calculation of the
// offset of the parent, and never recalculated upon drag
return"absolute"===this.cssPosition&&this.scrollParent[0]!==e&&$.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,s,i=this.options,o=this.document[0];return this.relativeContainer=null,i.containment?"window"===i.containment?void(this.containment=[$(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,$(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,$(window).scrollLeft()+$(window).width()-this.helperProportions.width-this.margins.left,$(window).scrollTop()+($(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===i.containment?void(this.containment=[0,0,$(o).width()-this.helperProportions.width-this.margins.left,($(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):i.containment.constructor===Array?void(this.containment=i.containment):("parent"===i.containment&&(i.containment=this.helper[0].parentNode),e=$(i.containment),void((s=e[0])&&(t=/(scroll|auto)/.test(e.css("overflow")),this.containment=[(parseInt(e.css("borderLeftWidth"),10)||0)+(parseInt(e.css("paddingLeft"),10)||0),(parseInt(e.css("borderTopWidth"),10)||0)+(parseInt(e.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(e.css("borderRightWidth"),10)||0)-(parseInt(e.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(e.css("borderBottomWidth"),10)||0)-(parseInt(e.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=e))):void(this.containment=null)},_convertPositionTo:function(t,e){e||(e=this.position);var s="absolute"===t?1:-1,i=this._isRootNode(this.scrollParent[0]);return{top:
// The absolute mouse position
e.top+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top*s+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top*s-("fixed"===this.cssPosition?-this.offset.scroll.top:i?0:this.offset.scroll.top)*s,left:
// The absolute mouse position
e.left+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left*s+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left*s-("fixed"===this.cssPosition?-this.offset.scroll.left:i?0:this.offset.scroll.left)*s}},_generatePosition:function(t,e){var s,i,o,n,r=this.options,l=this._isRootNode(this.scrollParent[0]),a=t.pageX,h=t.pageY;
// Cache the scroll
/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */
// If we are not dragging yet, we won't check for options
//Check for grid elements set to 0 to prevent divide by 0 error causing invalid
// argument errors in IE (see ticket #6950)
return l&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(i=this.relativeContainer.offset(),s=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]):s=this.containment,t.pageX-this.offset.click.left<s[0]&&(a=s[0]+this.offset.click.left),t.pageY-this.offset.click.top<s[1]&&(h=s[1]+this.offset.click.top),t.pageX-this.offset.click.left>s[2]&&(a=s[2]+this.offset.click.left),t.pageY-this.offset.click.top>s[3]&&(h=s[3]+this.offset.click.top)),r.grid&&(o=r.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,h=s?o-this.offset.click.top>=s[1]||o-this.offset.click.top>s[3]?o:o-this.offset.click.top>=s[1]?o-r.grid[1]:o+r.grid[1]:o,n=r.grid[0]?this.originalPageX+Math.round((a-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,a=s?n-this.offset.click.left>=s[0]||n-this.offset.click.left>s[2]?n:n-this.offset.click.left>=s[0]?n-r.grid[0]:n+r.grid[0]:n),"y"===r.axis&&(a=this.originalPageX),"x"===r.axis&&(h=this.originalPageY)),{top:
// The absolute mouse position
h-
// Click offset (relative to the element)
this.offset.click.top-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:l?0:this.offset.scroll.top),left:
// The absolute mouse position
a-
// Click offset (relative to the element)
this.offset.click.left-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:l?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},
// From now on bulk stuff - mainly helpers
_trigger:function(t,e,s){
// Absolute position and offset (see #6884 ) have to be recalculated after plugins
return s=s||this._uiHash(),$.ui.plugin.call(this,t,[e,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),$.Widget.prototype._trigger.call(this,t,e,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),$.ui.plugin.add("draggable","connectToSortable",{start:function(t,e,s){var i=$.extend({},e,{item:s.element});s.sortables=[],$(s.options.connectToSortable).each(function(){var e=$(this).sortable("instance");e&&!e.options.disabled&&(s.sortables.push(e),
// RefreshPositions is called at drag start to refresh the containerCache
// which is used in drag. This ensures it's initialized and synchronized
// with any changes that might have happened on the page since initialization.
e.refreshPositions(),e._trigger("activate",t,i))})},stop:function(t,e,s){var i=$.extend({},e,{item:s.element});s.cancelHelperRemoval=!1,$.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,
// Allow this sortable to handle removing the helper
s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,
// Use _storedCSS To restore properties in the sortable,
// as this also handles revert (#9675) since the draggable
// may have modified them in unexpected ways (#8809)
e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),
// Once drag has ended, the sortable should return to using
// its original helper, not the shared helper from draggable
e.options.helper=e.options._helper):(
// Prevent this Sortable from removing the helper.
// However, don't set the draggable to remove the helper
// either as another connected Sortable may yet handle the removal.
e.cancelHelperRemoval=!0,e._trigger("deactivate",t,i))})},drag:function(t,e,s){$.each(s.sortables,function(){var i=!1,o=this;
// Copy over variables that sortable's _intersectsWith uses
o.positionAbs=s.positionAbs,o.helperProportions=s.helperProportions,o.offset.click=s.offset.click,o._intersectsWith(o.containerCache)&&(i=!0,$.each(s.sortables,function(){
// Copy over variables that sortable's _intersectsWith uses
return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&$.contains(o.element[0],this.element[0])&&(i=!1),i})),i?(
// If it intersects, we use a little isOver variable and set it once,
// so that the move-in stuff gets fired only once.
o.isOver||(o.isOver=1,
// Store draggable's parent in case we need to reappend to it later.
s._parent=e.helper.parent(),o.currentItem=e.helper.appendTo(o.element).data("ui-sortable-item",!0),
// Store helper option to later restore it
o.options._helper=o.options.helper,o.options.helper=function(){return e.helper[0]},
// Fire the start events of the sortable with our passed browser event,
// and our own helper (so it doesn't create a new one)
t.target=o.currentItem[0],o._mouseCapture(t,!0),o._mouseStart(t,!0,!0),
// Because the browser event is way off the new appended portlet,
// modify necessary variables to reflect the changes
o.offset.click.top=s.offset.click.top,o.offset.click.left=s.offset.click.left,o.offset.parent.left-=s.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=s.offset.parent.top-o.offset.parent.top,s._trigger("toSortable",t),
// Inform draggable that the helper is in a valid drop zone,
// used solely in the revert option to handle "valid/invalid".
s.dropped=o.element,
// Need to refreshPositions of all sortables in the case that
// adding to one sortable changes the location of the other sortables (#9675)
$.each(s.sortables,function(){this.refreshPositions()}),
// Hack so receive/update callbacks work (mostly)
s.currentItem=s.element,o.fromOutside=s),o.currentItem&&(o._mouseDrag(t),
// Copy the sortable's position because the draggable's can potentially reflect
// a relative position, while sortable is always absolute, which the dragged
// element has now become. (#8809)
e.position=o.position)):
// If it doesn't intersect with the sortable, and it intersected before,
// we fake the drag stop of the sortable, but make sure it doesn't remove
// the helper by using cancelHelperRemoval.
o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,
// Calling sortable's mouseStop would trigger a revert,
// so revert must be temporarily false until after mouseStop is called.
o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",t,o._uiHash(o)),o._mouseStop(t,!0),
// Restore sortable behaviors that were modfied
// when the draggable entered the sortable area (#9481)
o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),
// Restore and recalculate the draggable's offset considering the sortable
// may have modified them in unexpected ways. (#8809, #10669)
e.helper.appendTo(s._parent),s._refreshOffsets(t),e.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),
// Inform draggable that the helper is no longer in a valid drop zone
s.dropped=!1,
// Need to refreshPositions of all sortables just in case removing
// from one sortable changes the location of other sortables (#9675)
$.each(s.sortables,function(){this.refreshPositions()}))})}}),$.ui.plugin.add("draggable","cursor",{start:function(t,e,s){var i=$("body"),o=s.options;i.css("cursor")&&(o._cursor=i.css("cursor")),i.css("cursor",o.cursor)},stop:function(t,e,s){var i=s.options;i._cursor&&$("body").css("cursor",i._cursor)}}),$.ui.plugin.add("draggable","opacity",{start:function(t,e,s){var i=$(e.helper),o=s.options;i.css("opacity")&&(o._opacity=i.css("opacity")),i.css("opacity",o.opacity)},stop:function(t,e,s){var i=s.options;i._opacity&&$(e.helper).css("opacity",i._opacity)}}),$.ui.plugin.add("draggable","scroll",{start:function(t,e,s){s.scrollParentNotHidden||(s.scrollParentNotHidden=s.helper.scrollParent(!1)),s.scrollParentNotHidden[0]!==s.document[0]&&"HTML"!==s.scrollParentNotHidden[0].tagName&&(s.overflowOffset=s.scrollParentNotHidden.offset())},drag:function(t,e,s){var i=s.options,o=!1,n=s.scrollParentNotHidden[0],r=s.document[0];n!==r&&"HTML"!==n.tagName?(i.axis&&"x"===i.axis||(s.overflowOffset.top+n.offsetHeight-t.pageY<i.scrollSensitivity?n.scrollTop=o=n.scrollTop+i.scrollSpeed:t.pageY-s.overflowOffset.top<i.scrollSensitivity&&(n.scrollTop=o=n.scrollTop-i.scrollSpeed)),i.axis&&"y"===i.axis||(s.overflowOffset.left+n.offsetWidth-t.pageX<i.scrollSensitivity?n.scrollLeft=o=n.scrollLeft+i.scrollSpeed:t.pageX-s.overflowOffset.left<i.scrollSensitivity&&(n.scrollLeft=o=n.scrollLeft-i.scrollSpeed))):(i.axis&&"x"===i.axis||(t.pageY-$(r).scrollTop()<i.scrollSensitivity?o=$(r).scrollTop($(r).scrollTop()-i.scrollSpeed):$(window).height()-(t.pageY-$(r).scrollTop())<i.scrollSensitivity&&(o=$(r).scrollTop($(r).scrollTop()+i.scrollSpeed))),i.axis&&"y"===i.axis||(t.pageX-$(r).scrollLeft()<i.scrollSensitivity?o=$(r).scrollLeft($(r).scrollLeft()-i.scrollSpeed):$(window).width()-(t.pageX-$(r).scrollLeft())<i.scrollSensitivity&&(o=$(r).scrollLeft($(r).scrollLeft()+i.scrollSpeed)))),o!==!1&&$.ui.ddmanager&&!i.dropBehaviour&&$.ui.ddmanager.prepareOffsets(s,t)}}),$.ui.plugin.add("draggable","snap",{start:function(t,e,s){var i=s.options;s.snapElements=[],$(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var t=$(this),e=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:e.top,left:e.left})})},drag:function(t,e,s){var i,o,n,r,l,a,h,p,c,f,d=s.options,g=d.snapTolerance,u=e.offset.left,m=u+s.helperProportions.width,v=e.offset.top,_=v+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)l=s.snapElements[c].left-s.margins.left,a=l+s.snapElements[c].width,h=s.snapElements[c].top-s.margins.top,p=h+s.snapElements[c].height,m<l-g||u>a+g||_<h-g||v>p+g||!$.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,$.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==d.snapMode&&(i=Math.abs(h-_)<=g,o=Math.abs(p-v)<=g,n=Math.abs(l-m)<=g,r=Math.abs(a-u)<=g,i&&(e.position.top=s._convertPositionTo("relative",{top:h-s.helperProportions.height,left:0}).top),o&&(e.position.top=s._convertPositionTo("relative",{top:p,left:0}).top),n&&(e.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left),r&&(e.position.left=s._convertPositionTo("relative",{top:0,left:a}).left)),f=i||o||n||r,"outer"!==d.snapMode&&(i=Math.abs(h-v)<=g,o=Math.abs(p-_)<=g,n=Math.abs(l-u)<=g,r=Math.abs(a-m)<=g,i&&(e.position.top=s._convertPositionTo("relative",{top:h,left:0}).top),o&&(e.position.top=s._convertPositionTo("relative",{top:p-s.helperProportions.height,left:0}).top),n&&(e.position.left=s._convertPositionTo("relative",{top:0,left:l}).left),r&&(e.position.left=s._convertPositionTo("relative",{top:0,left:a-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(i||o||n||r||f)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,$.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=i||o||n||r||f)}}),$.ui.plugin.add("draggable","stack",{start:function(t,e,s){var i,o=s.options,n=$.makeArray($(o.stack)).sort(function(t,e){return(parseInt($(t).css("zIndex"),10)||0)-(parseInt($(e).css("zIndex"),10)||0)});n.length&&(i=parseInt($(n[0]).css("zIndex"),10)||0,$(n).each(function(t){$(this).css("zIndex",i+t)}),this.css("zIndex",i+n.length))}}),$.ui.plugin.add("draggable","zIndex",{start:function(t,e,s){var i=$(e.helper),o=s.options;i.css("zIndex")&&(o._zIndex=i.css("zIndex")),i.css("zIndex",o.zIndex)},stop:function(t,e,s){var i=s.options;i._zIndex&&$(e.helper).css("zIndex",i._zIndex)}}),$.ui.draggable});