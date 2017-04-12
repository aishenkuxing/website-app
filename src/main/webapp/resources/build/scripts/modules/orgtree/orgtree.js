define(["jquery"],function($){var e=0,t=!1,d={};
//关闭树操作
d.closeTree=null,modify=1,function(){function n(e,t){
//modify parentId
e.children("dl").attr("data-layer",t),e.children("ul").children("li").each(function(e,d){n($(this),t+1)})}function a(e,t){t<1&&(t=1);var d=t;return e.children("ul").children("li").each(function(e,n){var r=a($(this),t+1);d<r&&(d=r)}),d}
// Method that recursively builds the tree
function r(e,d,n,a,l,s){var c=$("<table cellpadding='0' cellspacing='0' border='0'/>"),h=$("<tbody/>");e.attr("data-layer",n);
//console.log(level);
// Construct the node container(s)
var f,p=$("<tr/>").addClass("node-cells"),v=$("<td/>").addClass("node-cell").attr("colspan",2),u=e.children("ul:first").children("li:not(.deleteNode)");0==u.length?e.children("dl").find(".nd-node-display").hide():e.children("dl").find(".nd-node-display").show(),u.length>1&&v.attr("colspan",2*u.length);
// Draw the node
// Get the contents - any markup except li and ul allowed
var m=e.clone().children("ul,li").remove().end().html();if(
//Increaments the node count which is used to link the source list and the org chart
o++,e.data("tree-node",o),f=$("<div>").addClass("node").data("tree-node",o).append(m),p.hover(function(){i=p},function(){i=null}),
// Expand and contract nodes
u.length>0&&f.find("dt,.btn-tree").click(function(){var t=$(this).closest("div"),d=t.closest("tr");d.hasClass("contracted")?(t.css("cursor","n-resize"),d.removeClass("contracted").addClass("expanded"),d.nextAll("tr").css("visibility",""),
// Update the <li> appropriately so that if the tree redraws collapsed/non-collapsed nodes
// maintain their appearance
e.removeClass("collapsed"),t.find(".btn-tree").removeClass("tree-open"),t.find(".btn-tree").addClass("tree-close")):(t.css("cursor","s-resize"),d.removeClass("expanded").addClass("contracted"),d.nextAll("tr").css("visibility","hidden"),e.addClass("collapsed"),t.find(".btn-tree").addClass("tree-open"),t.find(".btn-tree").removeClass("tree-close"))}),v.append(f),"0"!=n){var g="",C="";if(s&&s%2==1?(g=$('<div  data-position="left" class="node-sort node-sort-left hide"><div class="node-sort-box"></div></div>'),C=$('<div  data-position="right" class="node-sort node-sort-right hide"><div class="node-sort-box" ></div></div>'),f.before(g),f.after(C)):s&&s%2==0&&"last"==l&&(C=$('<div class="node-sort node-sort-right hide" data-position="right"><div class="node-sort-box"  ></div></div>'),f.after(C)),"first"==l||"only"==l){g.addClass("first-node");try{f.width()}catch(e){}}if("last"==l||"only"==l){C.addClass("last-node");try{}catch(e){}}}if(p.append(v),h.append(p),u.length>0){
// recurse until leaves found (-1) or to the level specified
if(
// if it can be expanded then change the cursor
f.css("cursor","n-resize"),a.depth==-1||n+1<a.depth){var b=$("<tr/>"),y=$("<td/>").attr("colspan",2*u.length);b.append(y),
// draw the connecting line from the parent node to the horizontal line 
$downLine=$("<div></div>").addClass("line down"),y.append($downLine),h.append(b);
// Draw the horizontal lines
var x=$("<tr/>");u.each(function(){var e=$("<td>&nbsp;</td>").addClass("line left top"),t=$("<td>&nbsp;</td>").addClass("line right top");x.append(e).append(t)}),
// horizontal line shouldn't extend beyond the first and last child branches
x.find("td:first").removeClass("top").end().find("td:last").removeClass("top"),h.append(x);var j=$("<tr/>");u.each(function(e,t){var d=$("<td class='node-container'/>");d.attr("colspan",2);var i="";0==e&&(i="first"),e==u.length-1&&(i="last"),1==u.length&&(i="only"),
// recurse through children lists and items
r($(this),d,n+1,a,i,e+1),j.append(d)})}h.append(j)}
// any classes on the LI element get copied to the relevant node in the tree
// apart from the special 'collapsed' class, which collapses the sub-tree at this point
if(void 0!=e.attr("class")){var w=e.attr("class").split(/\s+/);$.each(w,function(e,t){"collapsed"==t?(p.find(".btn-tree").addClass("tree-open"),p.find(".btn-tree").removeClass("tree-close"),p.nextAll("tr").css("visibility","hidden"),p.removeClass("expanded"),p.addClass("contracted"),f.css("cursor","s-resize")):f.addClass(t)})}/* Prevent trees collapsing if a link inside a node is clicked */
//add Node
//delete Node
//modify Node
return c.append(h),d.append(c),f.find(".nd-node-plus").click(function(e){if(0==modify)return $(".node-ui-text").focus(),!1;var d=$(this).closest("dl"),n=parseInt(d.attr("data-layer"))+1;if(n>5)
//ND.msgbox.show("部门层级最多限制5层!", 2);
return!1;$("div.node").draggable("disable");var r=d.attr("data-nodeClass"),i=d.attr("data-id"),l=$(nodehtml),o="newnode"+(new Date).getTime();l.addClass(o),l.children("dl").attr("data-nodeClass",o),l.find(".nd-department-font").html("");
//target li
var s=$("#org").find("."+r);s.children("ul").length<=0&&s.append("<ul></ul>");var c=1,h=s.children("ul").find("li:last");try{null!=h.children("dl").attr("data-order")&&(c=parseInt(h.children("dl").attr("data-order"))+1)}catch(e){}nodedomdl=l.children("dl"),
//modify layer
nodedomdl.attr("data-layer",n),
//modify order
nodedomdl.attr("data-order",c),
//modify parentId
nodedomdl.attr("data-parentId",i),s.children("ul").append(l),l.attr("newly",!0),$(a.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(a),$(a.chartElement).children(".jOrgChart").find("."+o).find(".nd-department-font").click(),modifyItem=!0,modify=1,t=!0,e.stopPropagation()}),f.find(".nd-node-minus").click(function(e){if(delNode=$(this),0==modify){var d=$(".node-ui-text").closest("dl").attr("data-nodeclass"),n=$(this).closest("dl").attr("data-nodeclass");if(!t||d!=n)return $(".node-ui-text").focus(),!1;ND.msgbox.hide();var n=delNode.closest("dl").attr("data-nodeClass");
//delete node and it's children node,identification delete as true
$("#org").find("."+n).attr("delete",!0),$("#org").find("."+n).addClass("deleteNode"),$("#org").find("."+n).find("li").attr("delete",!0),$("#org").find("."+n).find("li").addClass("deleteNode"),$(a.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(a),t=!1,modify=1}else{var r=f.find(".nd-department-font").html();confirm("确认要删除"+r+" 部门吗？(同时也会删除该部门下所有子部门)所有被删除部门的成员将会自动移至未分配列表",function(){var e=delNode.closest("dl").attr("data-nodeClass");
//delete node and it's children node,identification delete as true
$("#org").find("."+e).attr("delete",!0),$("#org").find("."+e).addClass("deleteNode"),$("#org").find("."+e).find("li").attr("delete",!0),$("#org").find("."+e).find("li").addClass("deleteNode"),$(a.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(a)},null,null,360,170)}
//$(this).closest("table").closest("tbody").children("tr").first().nextAll().remove();
modifyItem=!0,e.stopPropagation()}),f.hover(function(){$(this).find("dt").addClass("zuzhijiagou-hover"),f.find(".nd-node-handle").show()},function(){$(this).find("dt").removeClass("zuzhijiagou-hover"),f.find(".nd-node-handle").hide()}),f.find(".nd-department-font").click(function(e){var d=$(this);
//is check now,so non trigger event 
if(!($(this).children(".node-ui-text").length>0)){
//remenber old val
var n=d.closest("dl");if(!(n.attr("data-layer")<=0)){
//状态改变
if(0==modify)return $(".node-ui-text").focus(),!1;var a=d.text(),r=$('<input class="node-ui-text" maxlength="50"/>');r.val(a),d.html(r),r.focus(),$("div.node").draggable("disable"),modify=0,r.select(),$(document).keyup(function(e){var t=r.val();if(e&&13==e.keyCode){if(""==$.trim(t))
//reduction old val 
//ND.msgbox.show("部门名称不能为空!", 2);
return r.val(a),void r.focus();r.blur()}}),r.blur(function(i){var l=$(this).val();if(""==$.trim(l))
//reduction old val 
//ND.msgbox.show("部门名称不能为空!", 2);
return r.val(a),modify=0,void r.focus();var o=!1,s=n.attr("data-nodeClass");if(
//is repeat return false
$.each($("#org").find("."+s).closest("ul").children("li:not(."+s+")").not(".deleteNode").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(l))return o=!0,!1}),o)
//reduction old val 
//ND.msgbox.show("同级部门不能重复!", 2);
return $(this).val(a),modify=0,void r.focus();var s=$(this).closest("dl").attr("data-nodeClass");
//set permanent val
$("#org").find("."+s).find(".nd-department-font").text(l),$("#org").find("."+s).attr("modify",!0),d.text(l),$("div.node").draggable("enable"),modifyItem=!0,t=!1,modify=1,e.stopPropagation()})}}}),$this}
//整合拖拽时停止 拖动冲突
var i=null,l=!1;$.fn.jOrgChart=function(t){var i=$.extend({},$.fn.jOrgChart.defaults,t),o=$(i.chartElement);
// build the tree
$this=$(this);var s=$("<div class='"+i.chartClass+"'/>");$this.is("ul")?r($this.find("li:first"),s,0,i):$this.is("li")&&r($this,s,0,i),o.append(s),
//加载完毕
$(".first-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),n=d.children(".node");left=(d.width()-n.width())/2-40,$(this).css({left:left+"px"})}catch(e){}}),$(".last-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),n=d.children(".node");right=(d.width()-n.width())/2-40,$(this).css({right:right+"px"})}catch(e){}}),$("div.node").on("mouseover mousedown",function(){e=0,$(".build-tree-canvas").removeClass("dragscroll")}),$("div.node").on("mouseout",function(){$(".build-tree-canvas").addClass("dragscroll")}),
// add drag and drop if enabled
i.dragAndDrop&&($("div.node").draggable({cursor:"move",distance:40,helper:"clone",opacity:.8,revert:"invalid",revertDuration:100,snap:"div.node.expanded",snapMode:"inner",stack:"div.node",handle:"dt",scrollSpeed:10,appendTo:".container",helper:function(){return'<dl class="nd-department-node nd-department-node-hover" style="position:relative;" ><dt style="margin-left:80px;" ><i class="zuzhijiagou iconfont">'+$(this).find(".zuzhijiagou").html()+'</i></dt><dd class="nd-department-font" style="margin-left:80px;">'+$(this).find(".nd-department-font").html()+"</dd></dl>"}}),$("div.node").droppable({accept:".node",activeClass:"drag-active",hoverClass:"drop-hover"}),$("div.node-sort").droppable({accept:".node-sort,.node",activeClass:"drag-active",hoverClass:"drop-hover",over:function(e,t){},drop:function(e,t){var d=$(this).parent().find(".nd-department-node").attr("data-nodeclass"),r=$("#org").find("li."+d),i=t.draggable.data("tree-node"),l=$this.find("li").filter(function(){return $(this).data("tree-node")===i});if(!l.hasClass(d)){var o=l.parent("ul"),s=r.children("dl").data("layer");if(s+a(l,0)>5)return void ND.msgbox.show("部门层级最多支持5层！",2);var c=r.children("dl").attr("data-parentId"),h=r.children("dl").attr("data-order"),f=l.children("dl").attr("data-nodeClass"),p=l.children("dl").find(".nd-department-font").html();if(repeat=!1,$.each($("#org").find("."+d).closest("ul").children("li:not(."+f+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(p))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);
//modify order
l.children("dl").attr("data-parentId",c),
//修改层数
n(l,s),l.attr("modify",!0),
//Removes any empty lists
"left"==$(this).data("position")?r.before(l):(r.after(l),h++),l.children("dl").attr("data-order",h);var v=l.children("dl").data("nodeclass");$("#org").find("li."+v).nextAll().each(function(e,t){h++,$(this).children("dl").attr("data-order",h),$(this).attr("modify",!0)}),0===o.children().length&&o.remove()}}}),
// Drag start event handler for nodes
$("div.node").bind("dragstart",function(t,n){e=0,$(".build-tree-canvas").removeClass("dragscroll"),$(".node-sort").removeClass("hide");var a=$(this);a.parentsUntil(".node-container").find("*").filter(".node").droppable("disable"),a.parentsUntil(".node-container").find("*").filter(".node").first().addClass("nd-drag-dode"),a.find(".btn-tree").hasClass("tree-close")&&(d.closeTree=a.children("dl").attr("data-nodeclass"),a.find(".btn-tree").click())}),
// Drag stop event handler for nodes
$("div.node").bind("dragstop",function(t,n){e=0,modifyItem=!0,$(".build-tree-canvas").addClass("dragscroll"),$(".node-sort").addClass("hide"),
//drop
// if (itemDrop) {
$(i.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(i),d.closeTree&&($("div."+d.closeTree).find(".btn-tree").click(),d.closeTree=null)}),
// Drop event handler for nodes
$("div.node").bind("drop",function(t,d){e=0;var r=$(this).data("tree-node"),i=$this.find("li").filter(function(){return $(this).data("tree-node")===r}),o=i.children("ul"),s=d.draggable.data("tree-node"),c=$this.find("li").filter(function(){return $(this).data("tree-node")===s}),h=c.parent("ul"),f=i.children("dl").attr("data-nodeClass"),p=parseInt(i.children("dl").attr("data-layer"));if(p+a(c,0)>=5)return void ND.msgbox.show("部门层级最多支持5层！",2);var v=c.children("dl").find(".nd-department-font").html(),u=c.children("dl").attr("data-nodeClass");if(repeat=!1,$.each($("#org").find("."+f).children("ul").children("li:not(."+u+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(v))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);l=!0;var m=1,g=i.children("dl").attr("data-id"),C=$("#org").find("."+f).children("ul").children("li:not(."+u+")").last();
//调换的节点加1
p+=1;try{null!=C.children("dl").attr("data-order")&&(m=parseInt(C.children("dl").attr("data-order"))+1)}catch(e){}
//modify layer
c.children("dl").attr("data-order",m),
//modify order
c.children("dl").attr("data-parentId",g),n(c,p),c.attr("modify",!0),o.length>0?o.append(c):(i.append("<ul></ul>"),i.children("ul").append(c)),
//Removes any empty lists
0===h.children().length&&h.remove()}))},
// Option defaults
$.fn.jOrgChart.defaults={chartElement:"body",depth:-1,chartClass:"jOrgChart",dragAndDrop:!1};var o=0}(jQuery)});