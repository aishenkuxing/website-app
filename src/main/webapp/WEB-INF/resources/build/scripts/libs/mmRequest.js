//=========================================
//  数据交互模块 by 司徒正美
//  版本: 1.0.0
//  最近更新: 2015/4/30
//==========================================
define("mmRequest",["avalon","mmPromise"],function(avalon){function IE(){if(window.VBArray){var e=document.documentMode;return e?e:window.XMLHttpRequest?7:6}return 0}function parseJS(e){var t=eval;if(e=e.trim())if(1===e.indexOf("use strict")){var r=document.createElement("script");r.text=e,head.appendChild(r).parentNode.removeChild(r)}else t(e)}function parseXML(e,t,r){try{var a=document.documentMode;window.DOMParser&&(!a||a>8)?(// Standard
r=new DOMParser,t=r.parseFromString(e,"text/xml")):(// IE
t=new ActiveXObject("Microsoft.XMLDOM"),//"Microsoft.XMLDOM"
t.async="false",t.loadXML(e))}catch(e){t=void 0}return t&&t.documentElement&&!t.getElementsByTagName("parsererror").length||avalon.error("Invalid XML: "+e),t}function ajaxExtend(e){e=avalon.mix({},defaults,e),e.type=e.type.toUpperCase();var t="string"==typeof e.data?e.data:avalon.param(e.data);if(e.querystring=t||"",e.url=e.url.replace(rhash,"").replace(rprotocol,location.protocol+"//"),"boolean"!=typeof e.crossDomain){//判定是否跨域
var r=document.createElement("a");
// Support: IE6-11+
// IE throws exception if url is malformed, e.g. http://example.com:80x/
try{r.href=e.url;
// in IE7-, get the absolute path
var a="1"[0]?r.href:r.getAttribute("href",4);r.href=a,e.crossDomain=originAnchor.protocol+"//"+originAnchor.host!=r.protocol+"//"+r.host}catch(t){e.crossDomain=!0}}//是否为post请求
//如果为GET请求,则参数依附于url上
//添加时间截
return e.hasContent=!rnoContent.test(e.type),e.hasContent||(t&&(e.url+=(rquery.test(e.url)?"&":"?")+t),e.cache===!1&&(e.url+=(rquery.test(e.url)?"&":"?")+"_time="+(new Date-0))),e}function ok(e){return e}function ng(e){throw e}function paramInner(e,t,r){var a;if(Array.isArray(t))
// Serialize array item.
avalon.each(t,function(t,a){rbracket.test(e)?
// Treat each array item as a scalar.
r(e,a):
// Item is non-scalar (array or object), encode its numeric index.
paramInner(e+"["+("object"==typeof a?t:"")+"]",a,r)});else if(avalon.isPlainObject(t))
// Serialize object item.
for(a in t)paramInner(e+"["+a+"]",t[a],r);else
// Serialize scalar item.
r(e,t)}
//将一个字符串转换为对象
function tryDecodeURIComponent(e){try{return decodeURIComponent(e)}catch(t){return e}}
//a%5B0%5D%5Bvalue%5D a%5B1%5D%5B%5D
function addSubObject(e,t,r){if(!t.match(r5b5d))return!0;for(var a,n,o,s=[],i=!0;(n=t.lastIndexOf("%5B"))&&n!==-1;)o=t.slice(n).slice(3,-3),t=t.slice(0,n),""===o?s.unshift({action:"pushArrayElement"}):(o>>>0)+""===o?s.unshift({action:"setSubArray",value:o}):i?s.unshift({action:"setObjectProperty",value:tryDecodeURIComponent(o)}):s.unshift({action:"setSubObjet",value:tryDecodeURIComponent(o)}),i=!1;for(i=!0;a=s.shift();){var c=/Object/.test(a.action);switch(i&&(t in e||(e[t]=c?{}:[]),i=!1,e=e[t]),a.action){case"pushArrayElement":e.push(r);break;case"setObjectProperty":e[a.value]=r;break;case"setSubObjet":a.value in e||(e[a.value]={}),e=e[a.value];break;case"setSubArray":a.value in e||(e[a.value]=[]),e=e[a.value]}}}function trimLine(e){return e.replace(rline,"\r\n")}var global=window,DOC=global.document,encode=encodeURIComponent,decode=decodeURIComponent,rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rhash=/#.*$/,rquery=/\?/,rjsonp=/(=)\?(?=&|$)|\?\?/,r20=/%20/g,radd=/\+/g,r5b5d=/%5B(.*?)%5D$/,originAnchor=document.createElement("a");originAnchor.href=location.href;
//告诉WEB服务器自己接受什么介质类型，*/* 表示任何类型，type/* 表示该类型下的所有子类型，type/sub-type。
var accepts={xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",script:"text/javascript, application/javascript","*":["*/"]+["*"]},useOnload=0===IE()||IE()>8;String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.lastIndexOf(e,t)===t});var head=DOC.getElementsByTagName("head")[0],isLocal=!1;try{
//在IE下如果重置了document.domain，直接访问window.location会抛错，但用document.URL就ok了
//http://www.cnblogs.com/WuQiang/archive/2012/09/21/2697474.html
isLocal=rlocalProtocol.test(location.protocol)}catch(e){}new function(){
//http://www.cnblogs.com/rubylouvre/archive/2010/04/20/1716486.html
var s=["XMLHttpRequest","ActiveXObject('MSXML2.XMLHTTP.6.0')","ActiveXObject('MSXML2.XMLHTTP.3.0')","ActiveXObject('MSXML2.XMLHTTP')","ActiveXObject('Microsoft.XMLHTTP')"];s[0]=IE()<8&&0!==IE()&&isLocal?"!":s[0];//IE下只能使用ActiveXObject
for(var i=0,axo;axo=s[i++];)try{if(eval("new "+axo)){avalon.xhr=new Function("return new "+axo);break}}catch(e){}};var supportCors="withCredentials"in avalon.xhr(),defaults={type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:!0,jsonp:"callback"},XHRMethods={setRequestHeader:function(e,t){return this.requestHeaders[e]=t,this},getAllResponseHeaders:function(){return 4===this.readyState?this.responseHeadersString:null},getResponseHeader:function(e,t){if(4===this.readyState){for(;t=rheaders.exec(this.responseHeadersString);)this.responseHeaders[t[1]]=t[2];t=this.responseHeaders[e]}return void 0===t?null:t},overrideMimeType:function(e){return this.mimeType=e,this},
// 中止请求
abort:function(e){return e=e||"abort",this.transport&&this.respond(0,e),this},/**
         * 用于派发success,error,complete等回调
         * http://www.cnblogs.com/rubylouvre/archive/2011/05/18/2049989.html
         * @param {Number} status 状态码
         * @param {String} statusText 对应的扼要描述
         */
dispatch:function(e,t){var r=t;
// 只能执行一次，防止重复执行
if(this.transport){this.readyState=4;var a=e>=200&&e<300||304===e;if(a)if(204===e)r="nocontent";else if(304===e)r="notmodified";else
//如果浏览器能直接返回转换好的数据就最好不过,否则需要手动转换
if(void 0===this.response){var n=this.options.dataType||this.options.mimeType;(!n&&this.responseText||this.responseXML)&&(//如果没有指定dataType，则根据mimeType或Content-Type进行揣测
n=this.getResponseHeader("Content-Type")||"",n=n.match(/json|xml|script|html/i)||["text"],n=n[0].toLowerCase());var o=this.responseText||"",s=this.responseXML||"";try{this.response=avalon.ajaxConverters[n].call(this,o,s)}catch(e){a=!1,this.error=e,r="parsererror"}}this.status=e,this.statusText=r+"",this.timeoutID&&(clearTimeout(this.timeoutID),delete this.timeoutID),this._transport=this.transport;/**
             * global event handler
             */
var i=this;
// 到这要么成功，调用success, 要么失败，调用 error, 最终都会调用 complete
a?(this._resolve([this.response,r,this]),/**
                 * global event handler
                 */
window.setTimeout(function(){avalon.ajaxGlobalEvents.success(i,i.options,i.response)},0)):(this._reject([this,r,this.error]),/**
                 * global event handler
                 */
window.setTimeout(function(){avalon.ajaxGlobalEvents.error(i,i.options,r)},0)),delete this.transport,/**
             * global event handler
             */
ajaxActive--,window.setTimeout(function(){avalon.ajaxGlobalEvents.complete(i,i.options)},0),0===ajaxActive&&
// 最后一个
window.setTimeout(function(){avalon.ajaxGlobalEvents.stop()},0)}}},ajaxActive=0;
//ajax主函数
avalon.ajax=function(e,t){e&&e.url||avalon.error("参数必须为Object并且拥有url属性"),e=ajaxExtend(e);//处理用户参数，比如生成querystring, type大写化
//创建一个伪XMLHttpRequest,能处理complete,success,error等多投事件
var r,a,n={responseHeadersString:"",responseHeaders:{},requestHeaders:{},querystring:e.querystring,readyState:0,uniqueID:(""+Math.random()).replace(/0\./,""),status:0},t=new avalon.Promise(function(e,t){a=e,r=t});t.options=e,t._reject=r,t._resolve=a;var o=[],s=[];Array("done","fail","always").forEach(function(e){t[e]=function(t){return"function"==typeof t&&("fail"!==e&&o.push(t),"done"!==e&&s.push(t)),this}}),e.async===!1&&(avalon.log("warnning:与jquery1.8一样,async:false这配置已经被废弃"),t.async=!1),avalon.mix(t,n,XHRMethods),t.then(function(e){e=Array.isArray(e)?e:void 0===e?[]:[e];for(var r,a=0;r=o[a++];)r.apply(t,e);return e},function(e){e=Array.isArray(e)?e:void 0===e?[]:[e];for(var r,a=0;r=s[a++];)r.apply(t,e);return e}),t.done(e.success).fail(e.error).always(e.complete);var i=e.dataType,c=avalon.ajaxTransports;(e.crossDomain&&!supportCors||rjsonp.test(e.url))&&"json"===i&&"GET"===e.type&&(i=e.dataType="jsonp");var l=e.form?"upload":i,p=c[l]||c.xhr;avalon.mix(t,p),//取得传送器的request, respond, preproccess
t.preproccess&&(//这用于jsonp upload传送器
i=t.preproccess()||i),
//设置首部 1、Content-Type首部
e.contentType&&t.setRequestHeader("Content-Type",e.contentType),
//2.处理Accept首部
t.setRequestHeader("Accept",accepts[i]?accepts[i]+", */*; q=0.01":accepts["*"]);for(var u in e.headers)//3. 处理headers里面的首部
t.setRequestHeader(u,e.headers[u]);
// 4.处理超时
/**
         * global event handler
         */
// 第一个
return e.async&&e.timeout>0&&(t.timeoutID=setTimeout(function(){t.abort("timeout"),t.dispatch(0,"timeout")},e.timeout)),0===ajaxActive&&avalon.ajaxGlobalEvents.start(),avalon.ajaxGlobalEvents.send(t,e),ajaxActive++,t.request(),t},"get,post".replace(avalon.rword,function(e){avalon[e]=function(t,r,a,n){return"function"==typeof r&&(n=n||a,a=r,r=void 0),avalon.ajax({type:e,url:t,data:r,success:a,dataType:n})}}),avalon.getScript=function(e,t){return avalon.get(e,null,t,"script")},avalon.getJSON=function(e,t,r){return avalon.get(e,t,r,"json")},avalon.upload=function(e,t,r,a,n){return"function"==typeof r&&(n=a,a=r,r=void 0),avalon.ajax({url:e,type:"post",dataType:n,form:t,data:r,success:a})},/**
     * global event handler
     */
avalon.ajaxGlobalEvents={},["start","stop","complete","error","success","send"].forEach(function(e){avalon.ajaxGlobalEvents[e]=avalon.noop}),avalon.ajaxConverters={//转换器，返回用户想要做的数据
text:function(e){
// return text || "";
return e},xml:function(e,t){return void 0!==t?t:parseXML(e)},html:function(e){return avalon.parseHTML(e)},json:function(e){return avalon.parseJSON||avalon.log("avalon.parseJSON不存在,请升级到最新版"),avalon.parseJSON(e)},script:function(e){return parseJS(e),e},jsonp:function(){var e,t;return this.jsonpCallback.startsWith("avalon.")?(t=this.jsonpCallback.replace(/avalon\./,""),e=avalon[t],delete avalon[t]):e=window[this.jsonpCallback],e}};var rbracket=/\[\]$/;avalon.param=function(e){var t,r=[],a=function(e,t){
// If value is a function, invoke it and return its value
t="function"==typeof t?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};
// 处理数组与类数组的jquery对象
if(Array.isArray(e))
// Serialize the form elements
avalon.each(e,a);else for(t in e)paramInner(t,e[t],a);
// Return the resulting serialization
return r.join("&").replace(/%20/g,"+")},
//  function add
avalon.unparam=function(e,t,r){t=t||"&",r=r||"=";var a={};if("string"!=typeof e||0===e.length)return a;e.indexOf("?")!==-1&&(e=e.split("?").pop());for(var n,o=e.split(t),s=0;n=o[s++];){var i=n.split("=");if(1===i.length)//处理只有键名没键值的情况
a[i[0]]="";else{var c=i[0].replace(/\+/g,"%20"),l=tryDecodeURIComponent(i.slice(1).join("=").replace(/\+/g," "));if(addSubObject(a,c,l)){//处理存在中括号的情况
var p=tryDecodeURIComponent(c);//处理不存在中括号的简单的情况
Object.prototype.hasOwnProperty.call(a,p)?Array.isArray(a[p])?a[p].push(l):a[p]=[a[p],l]:a[p]=l}}}return a};var rinput=/select|input|button|textarea/i,rcheckbox=/radio|checkbox/,rline=/\r?\n/g;
//表单元素变字符串, form为一个元素节点
avalon.serialize=function(e){var t={};
// 不直接转换form.elements，防止以下情况：   <form > <input name="elements"/><input name="test"/></form>
return Array.prototype.filter.call(e.getElementsByTagName("*"),function(e){if(rinput.test(e.nodeName)&&e.name&&!e.disabled)return!rcheckbox.test(e.type)||e.checked}).forEach(function(e){var r=avalon(e).val();r=Array.isArray(r)?r.map(trimLine):trimLine(r);var a=e.name;a in t?Array.isArray(r)?t[a].push(r):t[a]=[t[a],r]:t[a]=r}),avalon.param(t,!1)};var transports=avalon.ajaxTransports={xhr:{
//发送请求
request:function(){var e=this,t=this.options,r=this.transport=new avalon.xhr;r.open(t.type,t.url,t.async,t.username,t.password),this.mimeType&&r.overrideMimeType&&r.overrideMimeType(this.mimeType),
//IE6下，如果transport中没有withCredentials，直接设置会报错
t.crossDomain&&"withCredentials"in r&&(r.withCredentials=!0),/*
                 * header 中设置 X-Requested-With 用来给后端做标示：
                 * 这是一个 ajax 请求。
                 *
                 * 在 Chrome、Firefox 3.5+ 和 Safari 4+ 下，
                 * 在进行跨域请求时设置自定义 header，会触发 preflighted requests，
                 * 会预先发送 method 为 OPTIONS 的请求。
                 *
                 * 于是，如果跨域，禁用此功能。
                 */
t.crossDomain||(this.requestHeaders["X-Requested-With"]="XMLHttpRequest");for(var a in this.requestHeaders)r.setRequestHeader(a,this.requestHeaders[a]+"");/*
                 * progress
                 */
if(t.progressCallback){document.all&&!window.atob||(r.upload.onprogress=t.progressCallback)}var n=t.dataType;"responseType"in r&&/^(blob|arraybuffer|text)$/.test(n)&&(r.responseType=n,this.useResponseType=!0),
//必须要支持 FormData 和 file.fileList 的浏览器 才能用 xhr 发送
//标准规定的 multipart/form-data 发送必须用 utf-8 格式， 记得 ie 会受到 document.charset 的影响
r.send(t.hasContent&&(this.formdata||this.querystring)||null),
//在同步模式中,IE6,7可能会直接从缓存中读取数据而不会发出请求,因此我们需要手动发出请求
t.async&&4!==r.readyState?useOnload?//如果支持onerror, onload新API
r.onload=r.onerror=function(t){this.readyState=4,//IE9+
this.status="load"===t.type?200:500,e.respond()}:r.onreadystatechange=function(){e.respond()}:this.respond()},
//用于获取原始的responseXMLresponseText 修正status statusText
//第二个参数为1时中止清求
respond:function(e,t){var r=this.transport;if(r){
// by zilong：避免abort后还继续派发onerror等事件
t&&this.timeoutID&&(clearTimeout(this.timeoutID),delete this.timeoutID);try{var a=4===r.readyState;if(t||a)if(r.onreadystatechange=avalon.noop,useOnload&&(//IE6下对XHR对象设置onerror属性可能报错
r.onerror=r.onload=null),t)a||"function"!=typeof r.abort||// 完成以后 abort 不要调用
r.abort();else{var n=r.status,o=r.responseText;this.responseText="string"==typeof o?o:void 0;
//设置responseXML
try{
//当responseXML为[Exception: DOMException]时，
//访问它会抛“An attempt was made to use an object that is not, or is no longer, usable”异常
var s=r.responseXML;this.responseXML=s.documentElement}catch(e){}
//设置response
this.useResponseType&&(this.response=r.response),
//设置responseHeadersString
this.responseHeadersString=r.getAllResponseHeaders();try{//火狐在跨城请求时访问statusText值会抛出异常
var i=r.statusText}catch(e){this.error=e,i="firefoxAccessError"}
//用于处理特殊情况,如果是一个本地请求,只要我们能获取数据就假当它是成功的
n||!isLocal||this.options.crossDomain?1223===n&&(n=204):n=this.responseText?200:404,this.dispatch(n,i)}}catch(e){
// 如果网络问题时访问XHR的属性，在FF会抛异常
// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
t||this.dispatch(500,e)}}}},jsonp:{preproccess:function(){var e=this.options,t=this.jsonpCallback=e.jsonpCallback||"avalon.jsonp"+setTimeout("1");
//将后台返回的json保存在惰性函数中
return rjsonp.test(e.url)?e.url=e.url.replace(rjsonp,"$1"+t):e.url=e.url+(rquery.test(e.url)?"&":"?")+e.jsonp+"="+t,t.startsWith("avalon.")?(t=t.replace(/avalon\./,""),avalon[t]=function(e){avalon[t]=e}):window[t]=function(e){window[t]=e},"script"}},script:{request:function(){var e=this.options,t=this.transport=DOC.createElement("script");e.charset&&(t.charset=e.charset);var r=this;t.onerror=t[useOnload?"onload":"onreadystatechange"]=function(){r.respond()},t.src=e.url,head.insertBefore(t,head.firstChild)},respond:function(e,t){var r=this.transport;if(r){
// by zilong：避免abort后还继续派发onerror等事件
t&&this.timeoutID&&(clearTimeout(this.timeoutID),delete this.timeoutID);var a=/loaded|complete|undefined/i.test(r.readyState);if(t||a){r.onerror=r.onload=r.onreadystatechange=null;var n=r.parentNode;if(n&&n.removeChild(r),!t){var o;if(this.jsonpCallback){o="function"==typeof(this.jsonpCallback.startsWith("avalon.")?avalon[this.jsonpCallback.replace(/avalon\./,"")]:window[this.jsonpCallback])?[500,"error"]:[200,"success"]}else o=[200,"success"];this.dispatch.apply(this,o)}}}}},upload:{preproccess:function(){var e,t=this.options;"function"==typeof t.form.append?(//简单判断opts.form是否为FormData
e=t.form,t.contentType=""):e=new FormData(t.form),avalon.each(t.data,function(t,r){e.append(t,r)}),this.formdata=e}}};if(avalon.mix(transports.jsonp,transports.script),avalon.mix(transports.upload,transports.xhr),!window.FormData){var str='Function BinaryToArray(binary)\r\n                 Dim oDic\r\n                 Set oDic = CreateObject("scripting.dictionary")\r\n                 length = LenB(binary) - 1\r\n                 For i = 1 To length\r\n                     oDic.add i, AscB(MidB(binary, i, 1))\r\n                 Next\r\n                 BinaryToArray = oDic.Items\r\n              End Function';execScript('Function BinaryToArray(binary)\r\n                 Dim oDic\r\n                 Set oDic = CreateObject("scripting.dictionary")\r\n                 length = LenB(binary) - 1\r\n                 For i = 1 To length\r\n                     oDic.add i, AscB(MidB(binary, i, 1))\r\n                 Next\r\n                 BinaryToArray = oDic.Items\r\n              End Function',"VBScript"),avalon.fixAjax=function(){function e(e){var t=avalon.parseHTML("<iframe  id='"+e+"' name='"+e+"' style='position:absolute;left:-9999px;top:-9999px;'/>").firstChild;return(DOC.body||DOC.documentElement).insertBefore(t,null)}function t(e,t){var r,a,n,o,s,i=[];for(r in t)
// 数组和原生一样对待，创建多个同名输入域
for(a=Array.isArray(t[r]),n=a?t[r]:[t[r]],o=0;o<n.length;o++)s=DOC.createElement("input"),s.type="hidden",s.name=r,s.value=n[o],e.appendChild(s),i.push(s);return i}avalon.ajaxConverters.arraybuffer=function(){var e=this.tranport&&this.tranport.responseBody;if(e)return new VBArray(BinaryToArray(e)).toArray()},
//https://github.com/codenothing/Pure-Javascript-Upload/blob/master/src/upload.js
avalon.ajaxTransports.upload={request:function(){var r=this,a=this.options,n="iframe-upload-"+this.uniqueID,o=a.form,s=this.transport=e(n),i={target:o.target||"",action:o.action||"",enctype:o.enctype,method:o.method},c=a.data?t(o,a.data):[];
//必须指定method与enctype，要不在FF报错
//表单包含文件域时，如果缺少 method=POST 以及 enctype=multipart/form-data，
// 设置target到隐藏iframe，避免整页刷新
o.target=n,o.action=a.url,o.method="POST",o.enctype="multipart/form-data",this.uploadcallback=avalon.bind(s,"load",function(e){r.respond(e)}),o.submit();
//还原form的属性
for(var l in i)o[l]=i[l];
//移除之前动态添加的节点
c.forEach(function(e){o.removeChild(e)})},respond:function(e){var t,r=this.transport;
// 防止重复调用,成功后 abort
if(r){if(e&&"load"===e.type){var a=r.contentWindow.document;this.responseXML=a,a.body&&(//如果存在body属性,说明不是返回XML
this.responseText=a.body.innerHTML,
//当MIME为'application/javascript' 'text/javascript",浏览器会把内容放到一个PRE标签中
(t=a.body.firstChild)&&"PRE"===t.nodeName.toUpperCase()&&t.firstChild&&(this.responseText=t.firstChild.nodeValue)),this.dispatch(200,"success")}this.uploadcallback=avalon.unbind(r,"load",this.uploadcallback),delete this.uploadcallback,setTimeout(function(){// Fix busy state in FF3
r.parentNode.removeChild(r)})}}},delete avalon.fixAjax},avalon.fixAjax()}return avalon});