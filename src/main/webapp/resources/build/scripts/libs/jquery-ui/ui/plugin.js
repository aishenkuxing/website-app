!function(n){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version"],n):
// Browser globals
n(jQuery)}(function($){
// $.ui.plugin is deprecated. Use $.widget() extensions instead.
return $.ui.plugin={add:function(module,n,e){var i,o=$.ui[module].prototype;for(i in e)o.plugins[i]=o.plugins[i]||[],o.plugins[i].push([n,e[i]])},call:function(n,e,i,o){var t,u=n.plugins[e];if(u&&(o||n.element[0].parentNode&&11!==n.element[0].parentNode.nodeType))for(t=0;t<u.length;t++)n.options[u[t][0]]&&u[t][1].apply(n.element,i)}}});