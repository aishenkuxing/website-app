!function(e){"function"==typeof define&&define.amd?define(["jquery","text!scripts/ui/orgtree/html/copy_node.html","libs/jquery/jquery-ui/ui/widgets/draggable","libs/jquery/jquery-ui/ui/widgets/droppable","libs/jquery/jquery.json.min"],e):e(jQuery,copy_node)}(function($,e){var t=0,d=0,n=0;$(document).on("mousedown",".dragscroll",function(e){t=1,$(".container").css("cursor","url("+window.cdnUrl+"theme/default/org/img/palm16x16.ico),auto"),d=e.clientX,n=e.clientY}),$(document).on("mouseup",function(e){t=0,$(".container").css("cursor","url("+window.cdnUrl+"theme/default/org/img/fist16x16.ico),auto")}),$(document).on("mousemove",function(e){var r=$(".dragscroll");scroller=r[0],t&&(scroller.scrollLeft-=-d+(d=e.clientX),scroller.scrollTop-=-n+(n=e.clientY))}),
//jquery插件
function($){function d(e,t){
//modify parentId
e.children("dl").attr("data-layer",t),e.children("ul").children("li").each(function(e,n){d($(this),t+1)})}function n(t,d,a,i,o,s,c){null==a&&(a=0);var h=$("<table cellpadding='0' cellspacing='0' border='0'/>"),f=$("<tbody/>");t.attr("data-layer",a);
//console.log(level);
// Construct the node container(s)
var p,u=$("<tr/>").addClass("node-cells"),v=$("<td/>").addClass("node-cell").attr("colspan",2),m=t.children("ul:first").children("li:not(.deleteNode)");0==m.length?t.children("dl").find(".nd-node-display").hide():t.children("dl").find(".nd-node-display").show(),m.length>1&&v.attr("colspan",2*m.length);
// Draw the node
// Get the contents - any markup except li and ul allowed
var g=t.clone().children("ul,li").remove().end().html();if(
//Increaments the node count which is used to link the source list and the org chart
l++,t.data("tree-node",l),p=$("<div>").addClass("node").data("tree-node",l).append(g),u.hover(function(){r=u},function(){r=null}),
// Expand and contract nodes
m.length>0&&p.find("dt,.btn-tree").click(function(){var e=$(this).closest("div"),d=e.closest("tr");d.hasClass("contracted")?(e.css("cursor","n-resize"),d.removeClass("contracted").addClass("expanded"),d.nextAll("tr").css("visibility",""),
// Update the <li> appropriately so that if the tree redraws collapsed/non-collapsed nodes
// maintain their appearance
t.removeClass("collapsed"),e.find(".btn-tree").removeClass("tree-open"),e.find(".btn-tree").addClass("tree-close")):(e.css("cursor","s-resize"),d.removeClass("expanded").addClass("contracted"),d.nextAll("tr").css("visibility","hidden"),t.addClass("collapsed"),e.find(".btn-tree").addClass("tree-open"),e.find(".btn-tree").removeClass("tree-close"))}),v.append(p),"0"!=a){var C="",y="";if(s&&s%2==1?(C=$('<div  data-position="left" class="node-sort node-sort-left hide"><div class="node-sort-box"></div></div>'),y=$('<div  data-position="right" class="node-sort node-sort-right hide"><div class="node-sort-box" ></div></div>'),p.before(C),p.after(y)):s&&s%2==0&&"last"==o&&(y=$('<div class="node-sort node-sort-right hide" data-position="right"><div class="node-sort-box"  ></div></div>'),p.after(y)),"first"==o||"only"==o){C.addClass("first-node");try{p.width()}catch(e){}}if("last"==o||"only"==o){y.addClass("last-node");try{}catch(e){}}}if(u.append(v),f.append(u),m.length>0){
// recurse until leaves found (-1) or to the level specified
if(
// if it can be expanded then change the cursor
p.css("cursor","n-resize"),i.depth==-1||a+1<i.depth){var b=$("<tr/>"),x=$("<td/>").attr("colspan",2*m.length);b.append(x),
// draw the connecting line from the parent node to the horizontal line 
$downLine=$("<div></div>").addClass("line down"),x.append($downLine),f.append(b);
// Draw the horizontal lines
var w=$("<tr/>");m.each(function(){var e=$("<td>&nbsp;</td>").addClass("line left top"),t=$("<td>&nbsp;</td>").addClass("line right top");w.append(e).append(t)}),
// horizontal line shouldn't extend beyond the first and last child branches
w.find("td:first").removeClass("top").end().find("td:last").removeClass("top"),f.append(w);var I=$("<tr/>");m.each(function(e,t){var d=$("<td class='node-container'/>");d.attr("colspan",2);var r="";0==e&&(r="first"),e==m.length-1&&(r="last"),1==m.length&&(r="only"),
// recurse through children lists and items
n($(this),d,a+1,i,r,e+1,c),I.append(d)})}f.append(I)}
// any classes on the LI element get copied to the relevant node in the tree
// apart from the special 'collapsed' class, which collapses the sub-tree at this point
if(void 0!=t.attr("class")){var j=t.attr("class").split(/\s+/);$.each(j,function(e,t){"collapsed"==t?(u.find(".btn-tree").addClass("tree-open"),u.find(".btn-tree").removeClass("tree-close"),u.nextAll("tr").css("visibility","hidden"),u.removeClass("expanded"),u.addClass("contracted"),p.css("cursor","s-resize")):p.addClass(t)})}
//处理结点操作
return h.append(f),d.append(h),p.hover(function(){$(this).find("dt").hasClass("not-hover")||($(this).find("dt").addClass("zuzhijiagou-hover"),p.find(".nd-node-handle").show())},function(){$(this).find("dt").hasClass("not-hover")||($(this).find("dt").removeClass("zuzhijiagou-hover"),p.find(".nd-node-handle").hide())}),"function"==typeof i.eventSet&&i.eventSet(p,i,c,e),t}var r=null,a=!1,l=0,i={},o=0;
//关闭树操作
i.closeTree=null,
//创建组织树
createChartTree=function(t,d,n,r,a){var l=d+1;l>o&&(o=l),t&&t.length>0&&(r.append("<ul></ul>"),$.each(t,function(t,d){var i=$("<li>"+e+"</li>"),o=a.createChartTree(d,i,n,t);o.order||(o.order=t+1);var s=o.LDepId||o.DepId,c="node"+(new Date).getTime()+"id"+s;i.addClass(c),i.find(".nd-department-font").html(o.SDepName),i.children("dl").attr("data-nodeClass",c),i.children("dl").attr("data-id",s),i.children("dl").attr("data-order",o.order),i.children("dl").attr("data-layer",l),i.children("dl").attr("data-parentId",n),r.children("ul").append(i);createChartTree(o.ChildItems,l,s,i,a)}))},
//创建root节点
createRootItem=function(t,d,n){var r=$('<ul style="display:none"></ul>');n.append(r);var a=$("<li>"+e+"</li>"),l=d.createChartTree(t,a,null,0);d.hasRoot&&(a.find(".zuzhijiagou").html("&#xe61d;"),
//首节点去除多余的标签
a.find(".nd-node-handle").children("i").filter(function(){return!$(this).hasClass("nd-node-plus")&&!$(this).hasClass("nd-node-paste")}).remove());var i=l.LDepId||l.DepId,s="node"+(new Date).getTime()+"id"+i;
//$chartElement.append("<li><li>");
return o=0,a.addClass(s),a.children("dl").attr("data-nodeClass",s),a.children("dl").attr("data-id",i),a.children("dl").attr("data-order",1),a.children("dl").attr("data-layer",0),a.find(".nd-department-font").text(l.SDepName),createChartTree(l.ChildItems,0,i,a,d),r.append(a),r},$.fn.jOrgChart=function(e){var r,l=$.extend({},$.fn.jOrgChart.defaults,e),o=$(this);
//第一次构建树
if(""==l.chartElement&&l.repeatTree){r=createRootItem(l.data,l,o);var s="org"+(new Date).getTime();r.attr("id",s),l.chartElement="#"+s,l.repeatTree=!1}r=$(l.chartElement);var c=o,h=$("<div class='"+l.chartClass+"'/>");
//加载完毕
// add drag and drop if enabled
// Drag start event handler for nodes
// Drag stop event handler for nodes
// Drop event handler for nodes
// Drag and drop
return r.is("ul")?n(r.find("li:first"),h,r.find("li:first").data("layer"),l,null,null,c):r.is("li")&&n(r,h,r.find("li:first").data("layer"),l,null,null,c),o.append(h),$(".first-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),n=d.children(".node");left=(d.width()-n.width())/2-40,$(this).css({left:left+"px"})}catch(e){}}),$(".last-node").each(function(e,t){try{var d=$(this).closest(".node-cell"),n=d.children(".node");right=(d.width()-n.width())/2-40,$(this).css({right:right+"px"})}catch(e){}}),$("div.node").on("mouseover mousedown",function(){t=0,$(".build-tree-canvas").removeClass("dragscroll")}),$("div.node").on("mouseout",function(){$(".build-tree-canvas").addClass("dragscroll")}),l.dragAndDrop&&($("div.node").draggable({cursor:"move",distance:40,helper:"clone",opacity:.8,revert:"invalid",revertDuration:100,snap:"div.node.expanded",snapMode:"inner",stack:"div.node",handle:"dt",scrollSpeed:10,appendTo:".container",helper:function(){return'<dl class="nd-department-node nd-department-node-hover" style="position:relative;" ><dt style="margin-left:80px;" ><i class="zuzhijiagou iconfont">'+$(this).find(".zuzhijiagou").html()+'</i></dt><dd class="nd-department-font" style="margin-left:80px;">'+$(this).find(".nd-department-font").html()+"</dd></dl>"}}),$("div.node").droppable({accept:".node",activeClass:"drag-active",hoverClass:"drop-hover"}),$("div.node-sort").droppable({accept:".node-sort,.node",activeClass:"drag-active",hoverClass:"drop-hover",over:function(e,t){},drop:function(e,t){var n=$(this).parent().find(".nd-department-node").attr("data-nodeclass"),a=$(l.chartElement).find("li."+n),i=t.draggable.data("tree-node"),o=r.find("li").filter(function(){return $(this).data("tree-node")===i});if(!o.hasClass(n)){var s=o.parent("ul"),c=a.children("dl").data("layer"),h=a.children("dl").attr("data-parentId"),f=a.children("dl").attr("data-order"),p=o.children("dl").attr("data-nodeClass"),u=o.children("dl").find(".nd-department-font").html();if(repeat=!1,$.each($(l.chartElement).find("."+n).closest("ul").children("li:not(."+p+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(u))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);var v=o.children("dl").data("nodeclass"),m=$(l.chartElement).find("li."+v);if("left"!=$(this).data("position")&&f++,"function"==typeof l.dropBrotherEvent&&!l.dropBrotherEvent(m,a,f,l))return!1;"left"==$(this).data("position")?a.before(o):a.after(o),
//modify order
o.children("dl").attr("data-parentId",h),
//修改层数
d(o,c),o.attr("modify",!0),
//Removes any empty lists
o.children("dl").attr("data-order",f),
//对之后的节点 排序进行加1的操作
m.nextAll().each(function(e,t){f++,$(this).children("dl").attr("data-order",f),$(this).attr("modify",!0)}),0===s.children().length&&s.remove()}}}),$("div.node").bind("dragstart",function(e,d){t=0,$(".build-tree-canvas").removeClass("dragscroll"),$(".node-sort").removeClass("hide");var n=$(this);n.parentsUntil(".node-container").find("*").filter(".node").droppable("disable"),n.parentsUntil(".node-container").find("*").filter(".node").first().addClass("nd-drag-dode"),n.find(".btn-tree").hasClass("tree-close")&&(i.closeTree=n.children("dl").attr("data-nodeclass"),n.find(".btn-tree").click())}),$("div.node").bind("dragstop",function(e,d){t=0,modifyItem=!0,$(".build-tree-canvas").addClass("dragscroll"),$(".node-sort").addClass("hide"),
//drop
// if (itemDrop) {
o.children(".jOrgChart").remove(),o.jOrgChart(l),i.closeTree&&($("div."+i.closeTree).find(".btn-tree").click(),i.closeTree=null)}),$("div.node").bind("drop",function(e,n){t=0;var i=$(this).data("tree-node"),o=r.find("li").filter(function(){return $(this).data("tree-node")===i}),s=o.children("ul"),h=n.draggable.data("tree-node"),f=r.find("li").filter(function(){return $(this).data("tree-node")===h}),p=f.parent("ul"),u=o.children("dl").attr("data-nodeClass"),v=parseInt(o.children("dl").attr("data-layer")),m=f.children("dl").find(".nd-department-font").html(),g=f.children("dl").attr("data-nodeClass");if(repeat=!1,$.each($("#org").find("."+u).children("ul").children("li:not(."+g+")").children("dl").find(".nd-department-font"),function(e,t){if($.trim($(this).html())==$.trim(m))return repeat=!0,!1}),repeat)
//reduction old val 
return void ND.msgbox.show("该部门下有同名部门！",2);a=!0;var C=1,y=o.children("dl").attr("data-id"),b=$("#org").find("."+u).children("ul").children("li:not(."+g+")").last();
//调换的节点加1
v+=1;try{null!=b.children("dl").attr("data-order")&&(C=parseInt(b.children("dl").attr("data-order"))+1)}catch(e){}if(
//modify layer
f.children("dl").attr("data-order",C),
//modify order
f.children("dl").attr("data-parentId",y),d(f,v),f.attr("modify",!0),s.length<=0&&(o.append("<ul></ul>"),s=o.children("ul")),"function"==typeof l.dropNodeEvent){if(!l.dropNodeEvent(s,f,l,c))return!1}else s.append(f);
//Removes any empty lists
0===p.children().length&&p.remove()})),"function"==typeof l.finishEvent&&l.finishEvent(l),l.chartElement},
// Option defaults
$.fn.jOrgChart.defaults={
//依赖到父节点
chartElement:"",depth:-1,chart:"",chartClass:"jOrgChart",
//是否开启拖拽功能
dragAndDrop:!1,
//事件集合
eventSet:null,
//最高层级
maxLayer:null,
//弹框信息
alert:null,hasRoot:!0,
//重新构造树
repeatTree:!0,
//当加载完毕后执行方法
finishEvent:null,
//当节点拖拽到某个节点下，放下时触发事件
dropNodeEvent:null,
//当置于左右节点，时触发事件,//事件触发 必须返回true才执行之后的操作 function( sourceLi , targetLi ,dataOrder) dataOrder 调整完的 位置
dropBrotherEvent:null,
//每次遍历的时候 会把子结点数据带入到数据中
//用于自定义更改数据 dom为当前li节点 格式必须正确 否则加载会错误
createChartTree:function(e,t,d,n){return{ChildItems:[],IndId:1,LDepId:1,LParentId:0,SDepName:"",SPath:"1|",SamId:1,ScaId:1}},data:{}}}(jQuery)});