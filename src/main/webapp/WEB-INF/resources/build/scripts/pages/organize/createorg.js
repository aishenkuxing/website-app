/**  
 * Simple Map  
 * var m = new Map();  
 * m.put('key','value');  
 * ...  
 * var s = "";  
 * m.each(function(key,value,index){  
 *      s += index+":"+ key+"="+value+"/n";  
 * });  
 * alert(s);  
 *   
 * @author dewitt  
 * @date 2008-05-24  
 */
function Map(){/** 存放键的数组(遍历用到) */
this.keys=new Array,/** 存放数据 */
this.data=new Object,/**  
     * 放入一个键值对  
     * @param {String} key  
     * @param {Object} value  
     */
this.put=function(e,t){null==this.data[e]&&this.keys.push(e),this.data[e]=t},/**  
     * 获取某键对应的值  
     * @param {String} key  
     * @return {Object} value  
     */
this.get=function(e){return this.data[e]},/**  
     * 删除一个键值对  
     * @param {String} key  
     */
this.remove=function(e){this.keys.remove(e),this.data[e]=null},/**  
     * 遍历Map,执行处理函数  
     *   
     * @param {Function} 回调函数 function(key,value,index){..}  
     */
this.each=function(e){if("function"==typeof e)for(var t=this.keys.length,d=0;d<t;d++){var n=this.keys[d];e(n,this.data[n],d)}},/**  
     * 获取键值数组(类似Java的entrySet())  
     * @return 键值对象{key,value}的数组  
     */
this.entrys=function(){for(var e=this.keys.length,t=new Array(e),d=0;d<e;d++)t[d]={key:this.keys[d],value:this.data[d]};return t},/**  
     * 判断Map是否为空  
     */
this.isEmpty=function(){return 0==this.keys.length},/**  
     * 获取键值对数量  yyyyyy
     */
this.size=function(){return this.keys.length},/**  
     * 重写toString   
     */
this.toString=function(){for(var e="{",t=0;t<this.keys.length;t++,e+=","){var d=this.keys[t];e+=d+"="+this.data[d]}return e+="}"}}
//取消事件冒泡 
function stopBubble(e){e&&e.stopPropagation?e.stopPropagation():window.event.cancelBubble=!0}var pushed=0,orgTree={};
//关闭树操作
orgTree.closeTree=null;var addItemSign=!1;!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("undefined"!=typeof exports?exports:e.dragscroll={});var d=navigator.userAgent.toLowerCase();$.browser={},
//IE
d.indexOf("msie")>0&&(
//alert(browser); 
$.browser.mise=!0,$.browser.version=(d.match(/msie [\d.]+;/gi)+"").replace(/[^0-9.]/gi,"")),
//firefox
d.indexOf("firefox")>0&&($.browser.mozilla=!0,$.browser.version=(d.match(/firefox\/[\d.]+/gi)+"").replace(/[^0-9.]/gi,"")),
//Chrome
d.indexOf("chrome")>0&&($.browser.chrome=!0,$.browser.version=(d.match(/chrome\/[\d.]+/gi)+"").replace(/[^0-9.]/gi,"")),
//Safari
d.indexOf("safari")>0&&d.indexOf("chrome")<0&&($.browser.safari=!0,$.browser.version=(d.match(/safari\/[\d.]+/gi)+"").replace(/[^0-9.]/gi,""))}(this,function(exports){var e=0,t=0;$(document).on("mousedown",".dragscroll",function(d){pushed=1,$(".container").css("cursor","url('/Areas/Theme/default/org/img/palm16x16.ico'),auto"),e=d.clientX,t=d.clientY}),$(document).on("mouseup",function(e){pushed=0,$(".container").css("cursor","url('/Areas/Theme/default/org/img/fist16x16.ico'),auto")}),$(document).on("mousemove",function(d){var n=$(".dragscroll");scroller=n[0],pushed&&(scroller.scrollLeft-=-e+(e=d.clientX),scroller.scrollTop-=-t+(t=d.clientY))})}),function($){function e(t,d){
//modify parentId
t.children("dl").attr("data-layer",d),t.children("ul").children("li").each(function(t,n){e($(this),d+1)})}function t(e,d){d<1&&(d=1);var n=d;return e.children("ul").children("li").each(function(e,r){var a=t($(this),d+1);n<a&&(n=a)}),n}
// Method that recursively builds the tree
function d(e,t,r,i,o,s){var l,c=$("<table cellpadding='0' cellspacing='0' border='0'/>"),h=$("<tbody/>"),f=$("<tr/>").addClass("node-cells"),u=$("<td/>").addClass("node-cell").attr("colspan",2),p=e.children("ul:first").children("li:not(.deleteNode)");0==p.length?e.children("dl").find(".nd-node-display").hide():e.children("dl").find(".nd-node-display").show(),p.length>1&&u.attr("colspan",2*p.length);
// Draw the node
// Get the contents - any markup except li and ul allowed
var v=e.clone().children("ul,li").remove().end().html();if(
//Increaments the node count which is used to link the source list and the org chart
a++,e.data("tree-node",a),l=$("<div>").addClass("node").data("tree-node",a).append(v),f.hover(function(){n=f},function(){n=null}),
// Expand and contract nodes
p.length>0&&l.find("dt,.btn-tree").click(function(){var t=$(this).closest("div"),d=t.closest("tr");d.hasClass("contracted")?(t.css("cursor","n-resize"),d.removeClass("contracted").addClass("expanded"),d.nextAll("tr").css("visibility",""),
// Update the <li> appropriately so that if the tree redraws collapsed/non-collapsed nodes
// maintain their appearance
e.removeClass("collapsed"),t.find(".btn-tree").removeClass("tree-open"),t.find(".btn-tree").addClass("tree-close")):(t.css("cursor","s-resize"),d.removeClass("expanded").addClass("contracted"),d.nextAll("tr").css("visibility","hidden"),e.addClass("collapsed"),t.find(".btn-tree").addClass("tree-open"),t.find(".btn-tree").removeClass("tree-close"))}),u.append(l),"0"!=r){var g="",m="";if(s&&s%2==1?(g=$('<div  data-position="left" class="node-sort node-sort-left hide"><div class="node-sort-box"></div></div>'),m=$('<div  data-position="right" class="node-sort node-sort-right hide"><div class="node-sort-box" ></div></div>'),l.before(g),l.after(m)):s&&s%2==0&&"last"==o&&(m=$('<div class="node-sort node-sort-right hide" data-position="right"><div class="node-sort-box"  ></div></div>'),l.after(m)),"first"==o||"only"==o){g.addClass("first-node");try{l.width()}catch(e){}}if("last"==o||"only"==o){m.addClass("last-node");try{}catch(e){}}}if(f.append(u),h.append(f),p.length>0){
// recurse until leaves found (-1) or to the level specified
if(
// if it can be expanded then change the cursor
l.css("cursor","n-resize"),i.depth==-1||r+1<i.depth){var C=$("<tr/>"),b=$("<td/>").attr("colspan",2*p.length);C.append(b),
// draw the connecting line from the parent node to the horizontal line 
$downLine=$("<div></div>").addClass("line down"),b.append($downLine),h.append(C);
// Draw the horizontal lines
var y=$("<tr/>");p.each(function(){var e=$("<td>&nbsp;</td>").addClass("line left top"),t=$("<td>&nbsp;</td>").addClass("line right top");y.append(e).append(t)}),
// horizontal line shouldn't extend beyond the first and last child branches
y.find("td:first").removeClass("top").end().find("td:last").removeClass("top"),h.append(y);var x=$("<tr/>");p.each(function(e,t){var n="";0==e&&(n="first"),e==p.length-1&&(n="last"),1==p.length&&(n="only");var a=$("<td class='node-container'/>");a.attr("colspan",2),
// recurse through children lists and items
d($(this),a,r+1,i,n,e+1),x.append(a)})}h.append(x)}
// any classes on the LI element get copied to the relevant node in the tree
// apart from the special 'collapsed' class, which collapses the sub-tree at this point
if(void 0!=e.attr("class")){var w=e.attr("class").split(/\s+/);$.each(w,function(e,t){"collapsed"==t?(f.find(".btn-tree").addClass("tree-open"),f.find(".btn-tree").removeClass("tree-close"),f.nextAll("tr").css("visibility","hidden"),f.removeClass("expanded"),f.addClass("contracted"),l.css("cursor","s-resize")):l.addClass(t)})}/* Prevent trees collapsing if a link inside a node is clicked */
//add Node
//delete Node
//modify Node
return c.append(h),t.append(c),l.find(".nd-node-plus").click(function(e){if(0==modify)return $(".node-ui-text").focus(),!1;var t=$(this).closest("dl"),d=parseInt(t.attr("data-layer"))+1;if(d>5)return ND.msgbox.show("部门层级最多限制5层!",2),!1;$("div.node").draggable("disable");var n=t.attr("data-nodeClass"),r=t.attr("data-id"),a=$(nodehtml),o="newnode"+(new Date).getTime();a.addClass(o),a.children("dl").attr("data-nodeClass",o),a.find(".nd-department-font").html("");
//target li
var s=$("#org").find("."+n);s.children("ul").length<=0&&s.append("<ul></ul>");var l=1,c=s.children("ul").find("li:last");try{null!=c.children("dl").attr("data-order")&&(l=parseInt(c.children("dl").attr("data-order"))+1)}catch(e){}nodedomdl=a.children("dl"),
//modify layer
nodedomdl.attr("data-layer",d),
//modify order
nodedomdl.attr("data-order",l),
//modify parentId
nodedomdl.attr("data-parentId",r),s.children("ul").append(a),a.attr("newly",!0),$(i.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(i),$(i.chartElement).children(".jOrgChart").find("."+o).find(".nd-department-font").click(),modifyItem=!0,modify=1,addItemSign=!0,e.stopPropagation()}),l.find(".nd-node-minus").click(function(e){if(delNode=$(this),0==modify){var t=$(".node-ui-text").closest("dl").attr("data-nodeclass"),d=$(this).closest("dl").attr("data-nodeclass");if(!addItemSign||t!=d)return $(".node-ui-text").focus(),!1;ND.msgbox.hide();var d=delNode.closest("dl").attr("data-nodeClass");
//delete node and it's children node,identification delete as true
$("#org").find("."+d).attr("delete",!0),$("#org").find("."+d).addClass("deleteNode"),$("#org").find("."+d).find("li").attr("delete",!0),$("#org").find("."+d).find("li").addClass("deleteNode"),$(i.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(i),addItemSign=!1,modify=1}else{var d=delNode.closest("dl").attr("data-nodeClass");
//delete node and it's children node,identification delete as true
$("#org").find("."+d).attr("delete",!0),$("#org").find("."+d).addClass("deleteNode"),$("#org").find("."+d).find("li").attr("delete",!0),$("#org").find("."+d).find("li").addClass("deleteNode"),$(i.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(i)}
//$(this).closest("table").closest("tbody").children("tr").first().nextAll().remove();
e.stopPropagation()}),l.hover(function(){$(this).find("dt").addClass("zuzhijiagou-hover"),l.find(".nd-node-handle").show()},function(){$(this).find("dt").removeClass("zuzhijiagou-hover"),l.find(".nd-node-handle").hide()}),l.find(".nd-department-font").click(function(e){var t=$(this);
//is check now,so non trigger event 
if(!($(this).children(".node-ui-text").length>0)){var d=t.closest("dl");if(!(d.attr("data-layer")<=0)){if(0==modify)return $(".node-ui-text").focus(),!1;
//remenber old val
var n=t.text(),r=$('<input class="node-ui-text" maxlength="50"/>');r.val(n),t.html(r),$("div.node").draggable("disable"),r.focus(),modify=0,r.select(),$(document).keyup(function(e){var t=r.val();if(e&&13==e.keyCode){if(""==$.trim(t))
//reduction old val 
return ND.msgbox.show("部门名称不能为空!",2),void r.val(n);r.blur()}}),r.blur(function(a){var i=$(this).val();if(""==$.trim(i))
//reduction old val 
return ND.msgbox.show("部门名称不能为空!",2),r.val(n),modify=0,void r.focus();var o=!1,s=d.attr("data-nodeClass");if(
//is repeat return false
$.each($("#org").find("."+s).closest("ul").children("li:not(."+s+")").not(".deleteNode").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(i))return o=!0,!1}),o)
//reduction old val 
return ND.msgbox.show("同级部门不能重复!",2),$(this).val(n),modify=0,void r.focus();var s=$(this).closest("dl").attr("data-nodeClass");
//set permanent val
$("#org").find("."+s).find(".nd-department-font").text(i),t.text(i),addItemSign=!1,modify=1,$("div.node").draggable("enable"),e.stopPropagation()})}}}),$this}var n=null,r=!1;$.fn.jOrgChart=function(n){var a=$.extend({},$.fn.jOrgChart.defaults,n),i=$(a.chartElement);
// build the tree
$this=$(this);var o=$("<div class='"+a.chartClass+"'/>");$this.is("ul")?d($this.find("li:first"),o,0,a):$this.is("li")&&d($this,o,0,a),i.append(o),
//加载完毕
$(".first-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),n=d.children(".node");left=(d.width()-n.width())/2-40,$(this).css({left:left+"px"})}catch(e){}}),$(".last-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),n=d.children(".node");right=(d.width()-n.width())/2-40,$(this).css({right:right+"px"})}catch(e){}}),
// add drag and drop if enabled
a.dragAndDrop&&($("div.node").draggable({cursor:"move",helper:"clone",opacity:.8,revert:"invalid",revertDuration:100,snap:"div.node.expanded",scrollSpeed:10,snapMode:"inner",stack:"div.node",handle:"dt",appendTo:".container",helper:function(){return'<dl class="nd-department-node nd-department-node-hover" style="position:relative;" ><dt style="margin-left:80px;" ><i class="zuzhijiagou iconfont">'+$(this).find(".zuzhijiagou").html()+'</i></dt><dd class="nd-department-font" style="margin-left:80px;">'+$(this).find(".nd-department-font").html()+"</dd></dl>"}}),$("div.node").droppable({accept:".node",activeClass:"drag-active",hoverClass:"drop-hover",greedy:!0}),
// Drag start event handler for nodes
$("div.node").on("mouseover mousedown",function(){pushed=0,$(".build-tree-canvas").removeClass("dragscroll")}),$("div.node").on("mouseout",function(){$(".build-tree-canvas").addClass("dragscroll")}),$("div.node").bind("dragstart",function(e,t){$(".build-tree-canvas").removeClass("dragscroll"),$(".node-sort").removeClass("hide");var d=$(this);d.parentsUntil(".node-container").find("*").filter(".node").droppable("disable"),d.parentsUntil(".node-container").find("*").filter(".node").first().addClass("nd-drag-dode"),d.find(".btn-tree").hasClass("tree-close")&&(orgTree.closeTree=d.children("dl").attr("data-nodeclass"),d.find(".btn-tree").click())}),
// Drag stop event handler for nodes
$("div.node").bind("dragstop",function(e,t){pushed=0,$(".node-sort").addClass("hide"),$(".build-tree-canvas").addClass("dragscroll"),
//drop
//if (itemDrop) {
$(a.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(a),r=!1,orgTree.closeTree&&($("div."+orgTree.closeTree).find(".btn-tree").click(),orgTree.closeTree=null)}),$("div.node-sort").droppable({accept:".node-sort,.node",activeClass:"drag-active",hoverClass:"drop-hover",over:function(e,t){},drop:function(d,n){var r=$(this).parent().find(".nd-department-node").attr("data-nodeclass"),a=$("#org").find("li."+r),i=n.draggable.data("tree-node"),o=$this.find("li").filter(function(){return $(this).data("tree-node")===i});if(!o.hasClass(r)){var s=o.parent("ul"),l=a.children("dl").data("layer");if(l+t(o,0)>5)return void ND.msgbox.show("部门层级最多支持5层！",2);var c=a.children("dl").attr("data-parentId"),h=a.children("dl").attr("data-parentId"),f=o.children("dl").attr("data-nodeClass"),u=o.children("dl").find(".nd-department-font").html();if(repeat=!1,$.each($("#org").find("."+r).closest("ul").children("li:not(."+f+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(u))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);
//modify order
o.children("dl").attr("data-parentId",c),
//修改层数
e(o,l),o.attr("modify",!0),
//Removes any empty lists
"left"==$(this).data("position")?a.before(o):(a.after(o),h++),o.children("dl").attr("data-order",h);$("#org").find("li."+o.attr("class")).nextAll().each(function(e,t){h++,$(this).children("dl").attr("data-order",h),$(this).attr("modify",!0)}),0===s.children().length&&s.remove()}}}),
// Drop event handler for nodes
$("div.node").bind("drop",function(d,n){pushed=0;var a=$(this).data("tree-node"),i=$this.find("li").filter(function(){return $(this).data("tree-node")===a}),o=i.children("ul"),s=n.draggable.data("tree-node"),l=$this.find("li").filter(function(){return $(this).data("tree-node")===s}),c=l.parent("ul"),h=i.children("dl").attr("data-nodeClass"),f=parseInt(i.children("dl").attr("data-layer"));if(f+t(l,0)>=5)return void ND.msgbox.show("部门层级最多支持5层！",2);var u=l.children("dl").find(".nd-department-font").html(),p=l.children("dl").attr("data-nodeClass");if(repeat=!1,$.each($("#org").find("."+h).children("ul").children("li:not(."+p+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(u))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);r=!0;var v=1,g=i.children("dl").attr("data-id"),m=$("#org").find("."+h).children("ul").children("li:not(."+p+")").last();
//调换的节点加1
f+=1;try{null!=m.children("dl").attr("data-order")&&(v=parseInt(m.children("dl").attr("data-order"))+1)}catch(e){}
//modify layer
l.children("dl").attr("data-order",v),
//modify order
l.children("dl").attr("data-parentId",g),e(l,f),l.attr("modify",!0),o.length>0?o.append(l):(i.append("<ul></ul>"),i.children("ul").append(l)),
//Removes any empty lists
0===c.children().length&&c.remove()}))},
// Option defaults
$.fn.jOrgChart.defaults={chartElement:"body",depth:-1,chartClass:"jOrgChart",dragAndDrop:!1};var a=0}(jQuery),Array.prototype.remove=function(e){for(var t=0;t<this.length;t++)e==this[t]&&this.splice(t,1)};