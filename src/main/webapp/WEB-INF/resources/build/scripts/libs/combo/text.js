/**
 * @license RequireJS text 2.0.13+ Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */
define(["module"],function(module){"use strict";var e,n,r,t,o,i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a="undefined"!=typeof location&&location.href,s=a&&location.protocol&&location.protocol.replace(/\:/,""),u=a&&location.hostname,l=a&&(location.port||void 0),c={},f=module.config&&module.config()||{};
//Using special require.nodeRequire, something added by r.js.
//Why Java, why is this so awkward?
//Avert your gaze!
return e={version:"2.0.13+",strip:function(e){
//Strips <?xml ...?> declarations so that external SVG and XML
//documents can be added to a document without worry. Also, if the string
//is an HTML document, only the part inside the body tag is returned.
if(e){e=e.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");var n=e.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:f.createXhr||function(){
//Would love to dump the ActiveX crap in here. Need IE 6 to die first.
var e,n,r;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;n<3;n+=1){r=i[n];try{e=new ActiveXObject(r)}catch(e){}if(e){i=[r];// so faster next time
break}}return e},/**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
parseName:function(e){var n,r,t,o=!1,i=e.lastIndexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");
//Pull off the strip arg.
return i!==-1&&(!a||i>1)?(n=e.substring(0,i),r=e.substring(i+1)):n=e,t=r||n,i=t.indexOf("!"),i!==-1&&(o="strip"===t.substring(i+1),t=t.substring(0,i),r?r=t:n=t),{moduleName:n,ext:r,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,/**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
useXhr:function(n,r,t,o){var i,a,s,u=e.xdRegExp.exec(n);return!u||(i=u[2],a=u[3],a=a.split(":"),s=a[1],a=a[0],!(i&&i!==r||a&&a.toLowerCase()!==t.toLowerCase()||(s||a)&&s!==o))},finishLoad:function(n,r,t,o){t=r?e.strip(t):t,f.isBuild&&(c[n]=t),o(t)},load:function(n,r,t,o){
//Name has format: some.module.filext!strip
//The strip part is optional.
//if strip is present, then that means only get the string contents
//inside a body tag in an HTML string. For XML/SVG content it means
//removing the <?xml ...?> declarations so the content can be inserted
//into the current doc without problems.
// Do not bother with the work if a build and text will
// not be inlined.
if(o&&o.isBuild&&!o.inlineText)return void t();f.isBuild=o&&o.isBuild;var i=e.parseName(n),c=i.moduleName+(i.ext?"."+i.ext:""),p=r.toUrl(c),d=f.useXhr||e.useXhr;
// Do not load if it is an empty: url
if(0===p.indexOf("empty:"))return void t();
//Load the text. Use XHR if possible and in a browser.
!a||d(p,s,u,l)?e.get(p,function(r){e.finishLoad(n,i.strip,r,t)},function(e){t.error&&t.error(e)}):
//Need to fetch the resource across domains. Assume
//the resource has been optimized into a JS module. Fetch
//by the module name + extension, but do not include the
//!strip part to avoid file system issues.
r([c],function(n){e.finishLoad(i.moduleName+"."+i.ext,i.strip,n,t)})},write:function(n,r,t,o){if(c.hasOwnProperty(r)){var i=e.jsEscape(c[r]);t.asModule(n+"!"+r,"define(function () { return '"+i+"';});\n")}},writeFile:function(n,r,t,o,i){var a=e.parseName(r),s=a.ext?"."+a.ext:"",u=a.moduleName+s,
//Use a '.js' file name so that it indicates it is a
//script that can be loaded across domains.
l=t.toUrl(a.moduleName+s)+".js";
//Leverage own load() method to load plugin value, but only
//write out values that do not have the strip argument,
//to avoid any potential issues with ! in file names.
e.load(u,t,function(r){
//Use own write() method to construct full module value.
//But need to create shell that translates writeFile's
//write() to the right interface.
var t=function(e){return o(l,e)};t.asModule=function(e,n){return o.asModule(e,l,n)},e.write(n,u,t,i)},i)}},"node"===f.env||!f.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(n=require.nodeRequire("fs"),e.get=function(e,r,t){try{var o=n.readFileSync(e,"utf8");
//Remove BOM (Byte Mark Order) from utf8 files if it is there.
"\ufeff"===o[0]&&(o=o.substring(1)),r(o)}catch(e){t&&t(e)}}):"xhr"===f.env||!f.env&&e.createXhr()?e.get=function(n,r,t,o){var i,a=e.createXhr();
//Allow plugins direct access to xhr headers
if(a.open("GET",n,!0),o)for(i in o)o.hasOwnProperty(i)&&a.setRequestHeader(i.toLowerCase(),o[i]);
//Allow overrides specified in config
f.onXhr&&f.onXhr(a,n),a.onreadystatechange=function(e){var o,i;
//Do not explicitly handle errors, those should be
//visible via console output in the browser.
4===a.readyState&&(o=a.status||0,o>399&&o<600?(
//An http 4xx or 5xx error. Signal an error.
i=new Error(n+" HTTP status: "+o),i.xhr=a,t&&t(i)):r(a.responseText),f.onXhrComplete&&f.onXhrComplete(a,n))},a.send(null)}:"rhino"===f.env||!f.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?e.get=function(e,n){var r,t,o=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),"utf-8")),s="";try{for(r=new java.lang.StringBuffer,t=a.readLine(),
// Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
// http://www.unicode.org/faq/utf_bom.html
// Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
// http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
t&&t.length()&&65279===t.charAt(0)&&(
// Eat the BOM, since we've already found the encoding on this file,
// and we plan to concatenating this buffer with others; the BOM should
// only appear at the top of a file.
t=t.substring(1)),null!==t&&r.append(t);null!==(t=a.readLine());)r.append(i),r.append(t);
//Make sure we return a JavaScript string and not a Java string.
s=String(r.toString())}finally{a.close()}n(s)}:("xpconnect"===f.env||!f.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(r=Components.classes,t=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in r,e.get=function(e,n){var i,a,s,u={};o&&(e=e.replace(/\//g,"\\")),s=new FileUtils.File(e);
//XPCOM, you so crazy
try{i=r["@mozilla.org/network/file-input-stream;1"].createInstance(t.nsIFileInputStream),i.init(s,1,0,!1),a=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(t.nsIConverterInputStream),a.init(i,"utf-8",i.available(),t.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(i.available(),u),a.close(),i.close(),n(u.value)}catch(e){throw new Error((s&&s.path||"")+": "+e)}}),e});