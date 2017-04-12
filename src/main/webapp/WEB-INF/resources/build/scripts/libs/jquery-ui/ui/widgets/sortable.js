/*!
 * jQuery UI Sortable @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Sortable
//>>group: Interactions
//>>description: Enables items in a list to be sorted using the mouse.
//>>docs: http://api.jqueryui.com/sortable/
//>>demos: http://jqueryui.com/sortable/
//>>css.structure: ../../themes/base/sortable.css
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./mouse","../data","../ie","../scroll-parent","../version","../widget"],t):
// Browser globals
t(jQuery)}(function($){return $.widget("ui.sortable",$.ui.mouse,{version:"@VERSION",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,
// Callbacks
activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&t<e+i},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),
//Get the items
this.refresh(),
//Let's determine the parent's offset
this.offset=this.element.offset(),
//Initialize mouse events for interaction
this._mouseInit(),this._setHandleClassName(),
//We're ready to go
this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var t=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),$.each(this.items,function(){t._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,e){var i=null,s=!1,o=this;
//We have to refresh the items data once first
//Find out if the clicked node (or one of its parents) is a actual item in this.items
return!this.reverting&&(!this.options.disabled&&"static"!==this.options.type&&(this._refreshItems(t),$(t.target).parents().each(function(){if($.data(this,o.widgetName+"-item")===o)return i=$(this),!1}),$.data(t.target,o.widgetName+"-item")===o&&(i=$(t.target)),!!i&&(!(this.options.handle&&!e&&($(this.options.handle,i).find("*").addBack().each(function(){this===t.target&&(s=!0)}),!s))&&(this.currentItem=i,this._removeCurrentsFromItems(),!0))))},_mouseStart:function(t,e,i){var s,o,r=this.options;
//Post "activate" events to possible containers
if(this.currentContainer=this,
//We only need to call refreshPositions, because the refreshItems call has been moved to
// mouseCapture
this.refreshPositions(),
//Create and append the visible helper
this.helper=this._createHelper(t),
//Cache the helper size
this._cacheHelperProportions(),/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */
//Cache the margins of the original element
this._cacheMargins(),
//Get the next scrolling parent
this.scrollParent=this.helper.scrollParent(),
//The element's absolute position on the page minus margins
this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},$.extend(this.offset,{click:{//Where the click happened, relative to the element
left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),
// This is a relative to absolute position minus the actual position calculation -
// only used for relative positioned helper
relative:this._getRelativeOffset()}),
// Only after we got the offset, we can change the helper's position to absolute
// TODO: Still need to figure out a way to make relative sorting possible
this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),
//Generate the original position
this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,
//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),
//Cache the former DOM position
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},
// If the helper is not the original, hide the original so it's not playing any role during
// the drag, won't cause anything bad this way
this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),
//Create the placeholder
this._createPlaceholder(),
//Set a containment if given in the options
r.containment&&this._setContainment(),r.cursor&&"auto"!==r.cursor&&(// cursor option
o=this.document.find("body"),
// Support: IE
this.storedCursor=o.css("cursor"),o.css("cursor",r.cursor),this.storedStylesheet=$("<style>*{ cursor: "+r.cursor+" !important; }</style>").appendTo(o)),r.opacity&&(// opacity option
this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",r.opacity)),r.zIndex&&(// zIndex option
this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",r.zIndex)),
//Prepare scrolling
this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),
//Call callbacks
this._trigger("start",t,this._uiHash()),
//Recache the helper size
this._preserveHelperProportions||this._cacheHelperProportions(),!i)for(s=this.containers.length-1;s>=0;s--)this.containers[s]._trigger("activate",t,this._uiHash(this));
//Prepare possible droppables
// Execute the drag once - this causes the helper not to be visiblebefore getting its
// correct position
return $.ui.ddmanager&&($.ui.ddmanager.current=this),$.ui.ddmanager&&!r.dropBehaviour&&$.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var e,i,s,o,r=this.options,n=!1;
//Rearrange
for(
//Compute the helpers position
this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),
//Do scrolling
this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=n=this.scrollParent[0].scrollTop+r.scrollSpeed:t.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=n=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=n=this.scrollParent[0].scrollLeft+r.scrollSpeed:t.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=n=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(t.pageY-this.document.scrollTop()<r.scrollSensitivity?n=this.document.scrollTop(this.document.scrollTop()-r.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<r.scrollSensitivity&&(n=this.document.scrollTop(this.document.scrollTop()+r.scrollSpeed)),t.pageX-this.document.scrollLeft()<r.scrollSensitivity?n=this.document.scrollLeft(this.document.scrollLeft()-r.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<r.scrollSensitivity&&(n=this.document.scrollLeft(this.document.scrollLeft()+r.scrollSpeed))),n!==!1&&$.ui.ddmanager&&!r.dropBehaviour&&$.ui.ddmanager.prepareOffsets(this,t)),
//Regenerate the absolute position used for position checks
this.positionAbs=this._convertPositionTo("absolute"),
//Set the helper position
this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e=this.items.length-1;e>=0;e--)if(
//Cache variables and intersection, continue if no intersection
i=this.items[e],s=i.item[0],(o=this._intersectsWithPointer(i))&&i.instance===this.currentContainer&&!(s===this.currentItem[0]||this.placeholder[1===o?"next":"prev"]()[0]===s||$.contains(this.placeholder[0],s)||"semi-dynamic"===this.options.type&&$.contains(this.element[0],s))){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(i))break;this._rearrange(t,i),this._trigger("change",t,this._uiHash());break}
//Post events to containers
//Interconnect with droppables
//Call callbacks
return this._contactContainers(t),$.ui.ddmanager&&$.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,e){if(t){if(
//If we are using droppables, inform the manager about the drop
$.ui.ddmanager&&!this.options.dropBehaviour&&$.ui.ddmanager.drop(this,t),this.options.revert){var i=this,s=this.placeholder.offset(),o=this.options.axis,r={};o&&"x"!==o||(r.left=s.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(r.top=s.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,$(this.helper).animate(r,parseInt(this.options.revert,10)||500,function(){i._clear(t)})}else this._clear(t,e);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();
//Post deactivating events to containers
for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}
//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
// it unbinds ALL events from the original node!
return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),$.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?$(this.domPosition.prev).after(this.currentItem):$(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var e=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},$(e).each(function(){var e=($(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);e&&i.push((t.key||e[1]+"[]")+"="+(t.key&&t.expression?e[1]:e[2]))}),!i.length&&t.key&&i.push(t.key+"="),i.join("&")},toArray:function(t){var e=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},e.each(function(){i.push($(t.item||this).attr(t.attribute||"id")||"")}),i},/* Be careful with the following core functions */
_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,o=s+this.helperProportions.height,r=t.left,n=r+t.width,h=t.top,a=h+t.height,l=this.offset.click.top,c=this.offset.click.left,p="x"===this.options.axis||s+l>h&&s+l<a,f="y"===this.options.axis||e+c>r&&e+c<n,u=p&&f;// Right Half
// Left Half
// Bottom Half
return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?u:r<e+this.helperProportions.width/2&&i-this.helperProportions.width/2<n&&h<s+this.helperProportions.height/2&&o-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),o="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width);return!(!s||!o)&&(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1))},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return this.floating&&o?"right"===o&&i||"left"===o&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(t){function e(){n.push(this)}var i,s,o,r,n=[],h=[],a=this._connectWith();if(a&&t)for(i=a.length-1;i>=0;i--)for(o=$(a[i],this.document[0]),s=o.length-1;s>=0;s--)(r=$.data(o[s],this.widgetFullName))&&r!==this&&!r.options.disabled&&h.push([$.isFunction(r.options.items)?r.options.items.call(r.element):$(r.options.items,r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),r]);for(h.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=h.length-1;i>=0;i--)h[i][0].each(e);return $(n)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=$.grep(this.items,function(e){for(var i=0;i<t.length;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var e,i,s,o,r,n,h,a,l=this.items,c=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):$(this.options.items,this.element),this]],p=this._connectWith();
//Shouldn't be run the first time through due to massive slow-down
if(p&&this.ready)for(e=p.length-1;e>=0;e--)for(s=$(p[e],this.document[0]),i=s.length-1;i>=0;i--)(o=$.data(s[i],this.widgetFullName))&&o!==this&&!o.options.disabled&&(c.push([$.isFunction(o.options.items)?o.options.items.call(o.element[0],t,{item:this.currentItem}):$(o.options.items,o.element),o]),this.containers.push(o));for(e=c.length-1;e>=0;e--)for(r=c[e][1],n=c[e][0],i=0,a=n.length;i<a;i++)h=$(n[i]),
// Data for target checking (mouse manager)
h.data(this.widgetName+"-item",r),l.push({item:h,instance:r,width:0,height:0,left:0,top:0})},refreshPositions:function(t){
// Determine whether items are being displayed horizontally
this.floating=!!this.items.length&&("x"===this.options.axis||this._isFloating(this.items[0].item)),
//This has to be redone because due to the item being moved out/into the offsetParent,
// the offsetParent's position will change
this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var e,i,s,o;for(e=this.items.length-1;e>=0;e--)i=this.items[e],
//We ignore calculating positions of all connected containers when we're not over them
i.instance!==this.currentContainer&&this.currentContainer&&i.item[0]!==this.currentItem[0]||(s=this.options.toleranceElement?$(this.options.toleranceElement,i.item):i.item,t||(i.width=s.outerWidth(),i.height=s.outerHeight()),o=s.offset(),i.left=o.left,i.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(e=this.containers.length-1;e>=0;e--)o=this.containers[e].element.offset(),this.containers[e].containerCache.left=o.left,this.containers[e].containerCache.top=o.top,this.containers[e].containerCache.width=this.containers[e].element.outerWidth(),this.containers[e].containerCache.height=this.containers[e].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var e,i=t.options;i.placeholder&&i.placeholder.constructor!==String||(e=i.placeholder,i.placeholder={element:function(){var i=t.currentItem[0].nodeName.toLowerCase(),s=$("<"+i+">",t.document[0]);return t._addClass(s,"ui-sortable-placeholder",e||t.currentItem[0].className)._removeClass(s,"ui-sortable-helper"),"tbody"===i?t._createTrPlaceholder(t.currentItem.find("tr").eq(0),$("<tr>",t.document[0]).appendTo(s)):"tr"===i?t._createTrPlaceholder(t.currentItem,s):"img"===i&&s.attr("src",t.currentItem.attr("src")),e||s.css("visibility","hidden"),s},update:function(s,o){
// 1. If a className is set as 'placeholder option, we don't force sizes -
// the class is responsible for that
// 2. The option 'forcePlaceholderSize can be enabled to force it even if a
// class name is specified
e&&!i.forcePlaceholderSize||(
//If the element doesn't have a actual height by itself (without styles coming
// from a stylesheet), it receives the inline height from the dragged item
o.height()||o.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),o.width()||o.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),
//Create the placeholder
t.placeholder=$(i.placeholder.element.call(t.element,t.currentItem)),
//Append it after the actual current item
t.currentItem.after(t.placeholder),
//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
i.placeholder.update(t,t.placeholder)},_createTrPlaceholder:function(t,e){var i=this;t.children().each(function(){$("<td>&#160;</td>",i.document[0]).attr("colspan",$(this).attr("colspan")||1).appendTo(e)})},_contactContainers:function(t){var e,i,s,o,r,n,h,a,l,c,p=null,f=null;
// Get innermost container that intersects with item
for(e=this.containers.length-1;e>=0;e--)
// Never consider a container that's located within the item itself
if(!$.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){
// If we've already found a container and it's more "inner" than this, then continue
if(p&&$.contains(this.containers[e].element[0],p.element[0]))continue;p=this.containers[e],f=e}else
// container doesn't intersect. trigger "out" event if necessary
this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",t,this._uiHash(this)),this.containers[e].containerCache.over=0);
// If no intersecting containers found, return
if(p)
// Move the item into the container if it's not there already
if(1===this.containers.length)this.containers[f].containerCache.over||(this.containers[f]._trigger("over",t,this._uiHash(this)),this.containers[f].containerCache.over=1);else{for(
// When entering a new container, we will find the item with the least distance and
// append our item near it
s=1e4,o=null,l=p.floating||this._isFloating(this.currentItem),r=l?"left":"top",n=l?"width":"height",c=l?"pageX":"pageY",i=this.items.length-1;i>=0;i--)$.contains(this.containers[f].element[0],this.items[i].item[0])&&this.items[i].item[0]!==this.currentItem[0]&&(h=this.items[i].item.offset()[r],a=!1,t[c]-h>this.items[i][n]/2&&(a=!0),Math.abs(t[c]-h)<s&&(s=Math.abs(t[c]-h),o=this.items[i],this.direction=a?"up":"down"));
//Check if dropOnEmpty is enabled
if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[f])return void(this.currentContainer.containerCache.over||(this.containers[f]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1));o?this._rearrange(t,o,null,!0):this._rearrange(t,null,this.containers[f].element,!0),this._trigger("change",t,this._uiHash()),this.containers[f]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[f],
//Update the placeholder
this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[f]._trigger("over",t,this._uiHash(this)),this.containers[f].containerCache.over=1}},_createHelper:function(t){var e=this.options,i=$.isFunction(e.helper)?$(e.helper.apply(this.element[0],[t,this.currentItem])):"clone"===e.helper?this.currentItem.clone():this.currentItem;
//Add the helper to the DOM if that didn't happen already
return i.parents("body").length||$("parent"!==e.appendTo?e.appendTo:this.currentItem[0].parentNode)[0].appendChild(i[0]),i[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),i[0].style.width&&!e.forceHelperSize||i.width(this.currentItem.width()),i[0].style.height&&!e.forceHelperSize||i.height(this.currentItem.height()),i},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),$.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){
//Get the offsetParent and cache its position
this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();
// This is a special case where we need to modify a offset calculated on start, since the
// following happened:
// 1. The position of the helper is absolute, so it's position is calculated based on the
// next positioned parent
// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
// the document, which means that the scroll is included in the initial calculation of the
// offset of the parent, and never recalculated upon drag
// This needs to be actually done for all browsers, since pageX/pageY includes this
// information with an ugly IE fix
return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&$.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&$.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,i,s=this.options;"parent"===s.containment&&(s.containment=this.helper[0].parentNode),"document"!==s.containment&&"window"!==s.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===s.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===s.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(s.containment)||(t=$(s.containment)[0],e=$(s.containment).offset(),i="hidden"!==$(t).css("overflow"),this.containment=[e.left+(parseInt($(t).css("borderLeftWidth"),10)||0)+(parseInt($(t).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt($(t).css("borderTopWidth"),10)||0)+(parseInt($(t).css("paddingTop"),10)||0)-this.margins.top,e.left+(i?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt($(t).css("borderLeftWidth"),10)||0)-(parseInt($(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(i?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt($(t).css("borderTopWidth"),10)||0)-(parseInt($(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&$.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:
// The absolute mouse position
e.top+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top*i+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:s.scrollTop())*i,left:
// The absolute mouse position
e.left+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left*i+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*i}},_generatePosition:function(t){var e,i,s=this.options,o=t.pageX,r=t.pageY,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&$.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(n[0].tagName);
// This is another very weird special case that only happens for relative elements:
// 1. If the css position is relative
// 2. and the scroll parent is the document or similar to the offset parent
// we have to refresh the relative offset during the scroll so there are no jumps
/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */
//If we are not dragging yet, we won't check for options
return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)),s.grid&&(e=this.originalPageY+Math.round((r-this.originalPageY)/s.grid[1])*s.grid[1],r=this.containment?e-this.offset.click.top>=this.containment[1]&&e-this.offset.click.top<=this.containment[3]?e:e-this.offset.click.top>=this.containment[1]?e-s.grid[1]:e+s.grid[1]:e,i=this.originalPageX+Math.round((o-this.originalPageX)/s.grid[0])*s.grid[0],o=this.containment?i-this.offset.click.left>=this.containment[0]&&i-this.offset.click.left<=this.containment[2]?i:i-this.offset.click.left>=this.containment[0]?i-s.grid[0]:i+s.grid[0]:i)),{top:
// The absolute mouse position
r-
// Click offset (relative to the element)
this.offset.click.top-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:n.scrollTop()),left:
// The absolute mouse position
o-
// Click offset (relative to the element)
this.offset.click.left-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:n.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),
//Various things done here to improve the performance:
// 1. we create a setTimeout, that calls refreshPositions
// 2. on the instance, we have a counter variable, that get's higher after every append
// 3. on the local scope, we copy the counter variable, and check in the timeout,
// if it's still the same
// 4. this lets only the last addition to the timeout stack through
this.counter=this.counter?++this.counter:1;var o=this.counter;this._delay(function(){o===this.counter&&
//Precompute after each DOM insertion, NOT on mousemove
this.refreshPositions(!s)})},_clear:function(t,e){
//Post events to containers
function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;
// We delay all events that have to be triggered to after the point where the placeholder
// has been removed and everything else normalized again
var s,o=[];if(
// We first have to update the dom position of the actual currentItem
// Note: don't do it if the current item is already removed (by a user), or it gets
// reappended (see #4088)
!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)"auto"!==this._storedCSS[s]&&"static"!==this._storedCSS[s]||(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&o.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||
// Trigger update callback if the DOM position has changed
o.push(function(t){this._trigger("update",t,this._uiHash())}),
// Check if the items Container has Changed and trigger appropriate
// events.
this!==this.currentContainer&&(e||(o.push(function(t){this._trigger("remove",t,this._uiHash())}),o.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),o.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||o.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(o.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(
//Do what was originally in plugins
this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),
//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
// it unbinds ALL events from the original node!
this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(s=0;s<o.length;s++)
// Trigger all delayed events
o[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){$.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var e=t||this;return{helper:e.helper,placeholder:e.placeholder||$([]),position:e.position,originalPosition:e.originalPosition,offset:e.positionAbs,item:e.currentItem,sender:t?t.element:null}}})});