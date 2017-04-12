//整合拖拽时停止 拖动冲突
var pushed=0,addItemSign=!1,orgTree={};
//关闭树操作
orgTree.closeTree=null;var agent=navigator.userAgent.toLowerCase(),regStr_ie=/msie [\d.]+;/gi,regStr_ff=/firefox\/[\d.]+/gi,regStr_chrome=/chrome\/[\d.]+/gi,regStr_saf=/safari\/[\d.]+/gi,regStr_Opera=/Opera\/[\d.]+/gi;$.browser={},
//IE
agent.indexOf("msie")>0&&(
//alert(browser); 
$.browser.mise=!0,$.browser.version=(agent.match(regStr_ie)+"").replace(/[^0-9.]/gi,"")),
//firefox
agent.indexOf("firefox")>0&&($.browser.mozilla=!0,$.browser.version=(agent.match(regStr_ff)+"").replace(/[^0-9.]/gi,"")),
//Chrome
agent.indexOf("chrome")>0&&($.browser.chrome=!0,$.browser.version=(agent.match(regStr_chrome)+"").replace(/[^0-9.]/gi,"")),
//Safari
agent.indexOf("safari")>0&&agent.indexOf("chrome")<0&&($.browser.safari=!0,$.browser.version=(agent.match(regStr_saf)+"").replace(/[^0-9.]/gi,"")),function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("undefined"!=typeof exports?exports:e.dragscroll={})}(this,function(exports){var e=0,t=0;$(document).on("mousedown",".dragscroll",function(d){pushed=1,$(".container").css("cursor","url('/Areas/Theme/default/org/img/palm16x16.ico'),auto"),e=d.clientX,t=d.clientY}),$(document).on("mouseup",function(e){pushed=0,$(".container").css("cursor","url('/Areas/Theme/default/org/img/fist16x16.ico'),auto")}),$(document).on("mousemove",function(d){var r=$(".dragscroll");scroller=r[0],pushed&&(scroller.scrollLeft-=-e+(e=d.clientX),scroller.scrollTop-=-t+(t=d.clientY))})}),function($){function e(t,d){
//modify parentId
t.children("dl").attr("data-layer",d),t.children("ul").children("li").each(function(t,r){e($(this),d+1)})}function t(e,d){d<1&&(d=1);var r=d;return e.children("ul").children("li").each(function(e,n){var a=t($(this),d+1);r<a&&(r=a)}),r}
// Method that recursively builds the tree
function d(e,t,n,i,o,l){var s=$("<table cellpadding='0' cellspacing='0' border='0'/>"),c=$("<tbody/>");e.attr("data-layer",n);
//console.log(level);
// Construct the node container(s)
var h,f=$("<tr/>").addClass("node-cells"),p=$("<td/>").addClass("node-cell").attr("colspan",2),u=e.children("ul:first").children("li:not(.deleteNode)");0==u.length?e.children("dl").find(".nd-node-display").hide():e.children("dl").find(".nd-node-display").show(),u.length>1&&p.attr("colspan",2*u.length);
// Draw the node
// Get the contents - any markup except li and ul allowed
var v=e.clone().children("ul,li").remove().end().html();if(
//Increaments the node count which is used to link the source list and the org chart
a++,e.data("tree-node",a),h=$("<div>").addClass("node").data("tree-node",a).append(v),f.hover(function(){r=f},function(){r=null}),
// Expand and contract nodes
u.length>0&&h.find("dt,.btn-tree").click(function(){var t=$(this).closest("div"),d=t.closest("tr");d.hasClass("contracted")?(t.css("cursor","n-resize"),d.removeClass("contracted").addClass("expanded"),d.nextAll("tr").css("visibility",""),
// Update the <li> appropriately so that if the tree redraws collapsed/non-collapsed nodes
// maintain their appearance
e.removeClass("collapsed"),t.find(".btn-tree").removeClass("tree-open"),t.find(".btn-tree").addClass("tree-close")):(t.css("cursor","s-resize"),d.removeClass("expanded").addClass("contracted"),d.nextAll("tr").css("visibility","hidden"),e.addClass("collapsed"),t.find(".btn-tree").addClass("tree-open"),t.find(".btn-tree").removeClass("tree-close"))}),p.append(h),"0"!=n){var g="",m="";if(l&&l%2==1?(g=$('<div  data-position="left" class="node-sort node-sort-left hide"><div class="node-sort-box"></div></div>'),m=$('<div  data-position="right" class="node-sort node-sort-right hide"><div class="node-sort-box" ></div></div>'),h.before(g),h.after(m)):l&&l%2==0&&"last"==o&&(m=$('<div class="node-sort node-sort-right hide" data-position="right"><div class="node-sort-box"  ></div></div>'),h.after(m)),"first"==o||"only"==o){g.addClass("first-node");try{h.width()}catch(e){}}if("last"==o||"only"==o){m.addClass("last-node");try{}catch(e){}}}if(f.append(p),c.append(f),u.length>0){
// recurse until leaves found (-1) or to the level specified
if(
// if it can be expanded then change the cursor
h.css("cursor","n-resize"),i.depth==-1||n+1<i.depth){var C=$("<tr/>"),b=$("<td/>").attr("colspan",2*u.length);C.append(b),
// draw the connecting line from the parent node to the horizontal line 
$downLine=$("<div></div>").addClass("line down"),b.append($downLine),c.append(C);
// Draw the horizontal lines
var x=$("<tr/>");u.each(function(){var e=$("<td>&nbsp;</td>").addClass("line left top"),t=$("<td>&nbsp;</td>").addClass("line right top");x.append(e).append(t)}),
// horizontal line shouldn't extend beyond the first and last child branches
x.find("td:first").removeClass("top").end().find("td:last").removeClass("top"),c.append(x);var y=$("<tr/>");u.each(function(e,t){var r=$("<td class='node-container'/>");r.attr("colspan",2);var a="";0==e&&(a="first"),e==u.length-1&&(a="last"),1==u.length&&(a="only"),
// recurse through children lists and items
d($(this),r,n+1,i,a,e+1),y.append(r)})}c.append(y)}
// any classes on the LI element get copied to the relevant node in the tree
// apart from the special 'collapsed' class, which collapses the sub-tree at this point
if(void 0!=e.attr("class")){var w=e.attr("class").split(/\s+/);$.each(w,function(e,t){"collapsed"==t?(f.find(".btn-tree").addClass("tree-open"),f.find(".btn-tree").removeClass("tree-close"),f.nextAll("tr").css("visibility","hidden"),f.removeClass("expanded"),f.addClass("contracted"),h.css("cursor","s-resize")):h.addClass(t)})}/* Prevent trees collapsing if a link inside a node is clicked */
//add Node
//delete Node
//modify Node
return s.append(c),t.append(s),h.find(".nd-node-plus").click(function(e){if(0==modify)return $(".node-ui-text").focus(),!1;var t=$(this).closest("dl"),d=parseInt(t.attr("data-layer"))+1;if(d>5)return ND.msgbox.show("部门层级最多限制5层!",2),!1;$("div.node").draggable("disable");var r=t.attr("data-nodeClass"),n=t.attr("data-id"),a=$(nodehtml),o="newnode"+(new Date).getTime();a.addClass(o),a.children("dl").attr("data-nodeClass",o),a.find(".nd-department-font").html("");
//target li
var l=$("#org").find("."+r);l.children("ul").length<=0&&l.append("<ul></ul>");var s=1,c=l.children("ul").find("li:last");try{null!=c.children("dl").attr("data-order")&&(s=parseInt(c.children("dl").attr("data-order"))+1)}catch(e){}nodedomdl=a.children("dl"),
//modify layer
nodedomdl.attr("data-layer",d),
//modify order
nodedomdl.attr("data-order",s),
//modify parentId
nodedomdl.attr("data-parentId",n),l.children("ul").append(a),a.attr("newly",!0),$(i.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(i),$(i.chartElement).children(".jOrgChart").find("."+o).find(".nd-department-font").click(),modifyItem=!0,modify=1,addItemSign=!0,e.stopPropagation()}),h.find(".nd-node-minus").click(function(e){if(delNode=$(this),0==modify){var t=$(".node-ui-text").closest("dl").attr("data-nodeclass"),d=$(this).closest("dl").attr("data-nodeclass");if(!addItemSign||t!=d)return $(".node-ui-text").focus(),!1;ND.msgbox.hide(),
//var delcls = delNode.closest("dl").attr("data-nodeClass");
//delete node and it's children node,identification delete as true
$("#org").find("."+d).attr("delete",!0),$("#org").find("."+d).addClass("deleteNode"),$("#org").find("."+d).find("li").attr("delete",!0),$("#org").find("."+d).find("li").addClass("deleteNode"),$(i.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(i),addItemSign=!1,modify=1}else{var r=h.find(".nd-department-font").html();NDDialog.confirm("确认要删除<span style='color:#59BAF5;font-size:12px;max-width:100px; display:inline-block;top: 6px; position: relative;' class='textoverflow'> "+r+" </span>部门吗？<br/><span style='color:#FF0000;font-size:12px;'>(同时也会删除该部门下所有子部门)</span><br/><span style='color:#999999;font-size:13px;'>所有被删除部门的成员将会自动移至未分配列表</span>",function(){var e=delNode.closest("dl").attr("data-nodeClass");
//delete node and it's children node,identification delete as true
$("#org").find("."+e).attr("delete",!0),$("#org").find("."+e).addClass("deleteNode"),$("#org").find("."+e).find("li").attr("delete",!0),$("#org").find("."+e).find("li").addClass("deleteNode"),$(i.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(i)},null,null,360,170)}
//$(this).closest("table").closest("tbody").children("tr").first().nextAll().remove();
modifyItem=!0,e.stopPropagation()}),h.hover(function(){$(this).find("dt").addClass("zuzhijiagou-hover"),h.find(".nd-node-handle").show()},function(){$(this).find("dt").removeClass("zuzhijiagou-hover"),h.find(".nd-node-handle").hide()}),h.find(".nd-department-font").click(function(e){var t=$(this);
//is check now,so non trigger event 
if(!($(this).children(".node-ui-text").length>0)){
//remenber old val
var d=t.closest("dl");if(!(d.attr("data-layer")<=0)){
//状态改变
if(0==modify)return $(".node-ui-text").focus(),!1;var r=t.text(),n=$('<input class="node-ui-text" maxlength="50"/>');n.val(r),t.html(n),n.focus(),$("div.node").draggable("disable"),modify=0,n.select(),$(document).keyup(function(e){var t=n.val();if(e&&13==e.keyCode){if(""==$.trim(t))
//reduction old val 
return ND.msgbox.show("部门名称不能为空!",2),n.val(r),void n.focus();n.blur()}}),n.blur(function(a){var i=$(this).val();if(""==$.trim(i))
//reduction old val 
return ND.msgbox.show("部门名称不能为空!",2),n.val(r),modify=0,void n.focus();var o=!1,l=d.attr("data-nodeClass");if(
//is repeat return false
$.each($("#org").find("."+l).closest("ul").children("li:not(."+l+")").not(".deleteNode").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(i))return o=!0,!1}),o)
//reduction old val 
return ND.msgbox.show("同级部门不能重复!",2),$(this).val(r),modify=0,void n.focus();var l=$(this).closest("dl").attr("data-nodeClass");
//set permanent val
$("#org").find("."+l).find(".nd-department-font").text(i),$("#org").find("."+l).attr("modify",!0),t.text(i),$("div.node").draggable("enable"),modifyItem=!0,addItemSign=!1,modify=1,e.stopPropagation()})}}}),$this}var r=null,n=!1;$.fn.jOrgChart=function(r){var a=$.extend({},$.fn.jOrgChart.defaults,r),i=$(a.chartElement);
// build the tree
$this=$(this);var o=$("<div class='"+a.chartClass+"'/>");$this.is("ul")?d($this.find("li:first"),o,0,a):$this.is("li")&&d($this,o,0,a),i.append(o),
//加载完毕
$(".first-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),r=d.children(".node");left=(d.width()-r.width())/2-40,$(this).css({left:left+"px"})}catch(e){}}),$(".last-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),r=d.children(".node");right=(d.width()-r.width())/2-40,$(this).css({right:right+"px"})}catch(e){}}),$("div.node").on("mouseover mousedown",function(){pushed=0,$(".build-tree-canvas").removeClass("dragscroll")}),$("div.node").on("mouseout",function(){$(".build-tree-canvas").addClass("dragscroll")}),
// add drag and drop if enabled
a.dragAndDrop&&($("div.node").draggable({cursor:"move",distance:40,helper:"clone",opacity:.8,revert:"invalid",revertDuration:100,snap:"div.node.expanded",snapMode:"inner",stack:"div.node",handle:"dt",scrollSpeed:10,appendTo:".container",helper:function(){return'<dl class="nd-department-node nd-department-node-hover" style="position:relative;" ><dt style="margin-left:80px;" ><i class="zuzhijiagou iconfont">'+$(this).find(".zuzhijiagou").html()+'</i></dt><dd class="nd-department-font" style="margin-left:80px;">'+$(this).find(".nd-department-font").html()+"</dd></dl>"}}),$("div.node").droppable({accept:".node",activeClass:"drag-active",hoverClass:"drop-hover"}),$("div.node-sort").droppable({accept:".node-sort,.node",activeClass:"drag-active",hoverClass:"drop-hover",over:function(e,t){},drop:function(d,r){var n=$(this).parent().find(".nd-department-node").attr("data-nodeclass"),a=$this.find("li."+n),i=r.draggable.data("tree-node"),o=$this.find("li").filter(function(){return $(this).data("tree-node")===i});if(!o.hasClass(n)){var l=o.parent("ul"),s=a.children("dl").data("layer");if(s+t(o,0)>5)return void ND.msgbox.show("部门层级最多支持5层！",2);var c=a.children("dl").attr("data-parentId"),h=a.children("dl").attr("data-order"),f=o.children("dl").attr("data-nodeClass"),p=o.children("dl").find(".nd-department-font").html();if(repeat=!1,$.each($this.find("."+n).closest("ul").children("li:not(."+f+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(p))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);
//modify order
o.children("dl").attr("data-parentId",c),
//修改层数
e(o,s),o.attr("modify",!0),
//Removes any empty lists
"left"==$(this).data("position")?a.before(o):(a.after(o),h++),o.children("dl").attr("data-order",h);var u=o.children("dl").data("nodeclass");$("#org").find("li."+u).nextAll().each(function(e,t){h++,$(this).children("dl").attr("data-order",h),$(this).attr("modify",!0)}),0===l.children().length&&l.remove()}}}),
// Drag start event handler for nodes
$("div.node").bind("dragstart",function(e,t){pushed=0,$(".build-tree-canvas").removeClass("dragscroll"),$(".node-sort").removeClass("hide");var d=$(this);d.parentsUntil(".node-container").find("*").filter(".node").droppable("disable"),d.parentsUntil(".node-container").find("*").filter(".node").first().addClass("nd-drag-dode"),d.find(".btn-tree").hasClass("tree-close")&&(orgTree.closeTree=d.children("dl").attr("data-nodeclass"),d.find(".btn-tree").click())}),
// Drag stop event handler for nodes
$("div.node").bind("dragstop",function(e,t){pushed=0,modifyItem=!0,$(".build-tree-canvas").addClass("dragscroll"),$(".node-sort").addClass("hide"),
//drop
// if (itemDrop) {
$(a.chartElement).children(".jOrgChart").remove(),$this.jOrgChart(a),orgTree.closeTree&&($("div."+orgTree.closeTree).find(".btn-tree").click(),orgTree.closeTree=null)}),
// Drop event handler for nodes
$("div.node").bind("drop",function(d,r){pushed=0;var a=$(this).data("tree-node"),i=$this.find("li").filter(function(){return $(this).data("tree-node")===a}),o=i.children("ul"),l=r.draggable.data("tree-node"),s=$this.find("li").filter(function(){return $(this).data("tree-node")===l}),c=s.parent("ul"),h=i.children("dl").attr("data-nodeClass"),f=parseInt(i.children("dl").attr("data-layer"));if(f+t(s,0)>=5)return void ND.msgbox.show("部门层级最多支持5层！",2);var p=s.children("dl").find(".nd-department-font").html(),u=s.children("dl").attr("data-nodeClass");if(repeat=!1,$.each($("#org").find("."+h).children("ul").children("li:not(."+u+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(p))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);n=!0;var v=1,g=i.children("dl").attr("data-id"),m=$("#org").find("."+h).children("ul").children("li:not(."+u+")").last();
//调换的节点加1
f+=1;try{null!=m.children("dl").attr("data-order")&&(v=parseInt(m.children("dl").attr("data-order"))+1)}catch(e){}
//modify layer
s.children("dl").attr("data-order",v),
//modify order
s.children("dl").attr("data-parentId",g),e(s,f),s.attr("modify",!0),o.length>0?o.append(s):(i.append("<ul></ul>"),i.children("ul").append(s)),
//Removes any empty lists
0===c.children().length&&c.remove()}))},
// Option defaults
$.fn.jOrgChart.defaults={chartElement:"body",depth:-1,chartClass:"jOrgChart",dragAndDrop:!1};var a=0}(jQuery);