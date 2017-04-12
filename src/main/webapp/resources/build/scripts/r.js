/**
 * @license r.js 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*
 * This is a bootstrap script to allow running RequireJS in the command line
 * in either a Java/Rhino or Node environment. It is modified by the top-level
 * dist.js file to inject other files to completely enable this file. It is
 * the shell of the r.js file.
 */
/*jslint evil: true, nomen: true, sloppy: true */
/*global readFile: true, process: false, Packages: false, print: false,
console: false, java: false, module: false, requirejsVars, navigator,
document, importScripts, self, location, Components, FileUtils */
var requirejs,require,define,xpcUtil;!function(console,args,readFileFunc){function showHelp(){console.log("See https://github.com/jrburke/r.js for usage.")}/**
     * Loads the library files that can be used for the optimizer, or for other
     * tasks.
     */
function loadLib(){/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global Packages: false, process: false, window: false, navigator: false,
  document: false, define: false */
/**
 * A plugin that modifies any /env/ path to be the right path based on
 * the host environment. Right now only works for Node, Rhino and browser.
 */
!function(){var e="unknown";"undefined"!=typeof Packages?e="rhino":"undefined"!=typeof process&&process.versions&&process.versions.node?e="node":"undefined"!=typeof navigator&&"undefined"!=typeof document||"undefined"!=typeof importScripts&&"undefined"!=typeof self?e="browser":"undefined"!=typeof Components&&Components.classes&&Components.interfaces&&(e="xpconnect"),define("env",{get:function(){return e},load:function(n,t,r,i){
//Allow override in the config.
i.env&&(e=i.env),n=n.replace(/(\/|^)env\/|\{env\}/,function(n,t){return n.indexOf("{")===-1?t+e+"/":e}),t([n],function(e){r(e)})}})}(),/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint plusplus: true */
/*global define, java */
define("lang",function(){"use strict";function e(e,n){return r.call(e,n)}var n,t,r=Object.prototype.hasOwnProperty;return t=function(){return!1},"undefined"!=typeof java&&java.lang&&java.lang.Object&&(t=function(e){return e instanceof java.lang.Object}),n={backSlashRegExp:/\\/g,ostring:Object.prototype.toString,isArray:Array.isArray||function(e){return"[object Array]"===n.ostring.call(e)},isFunction:function(e){return"[object Function]"===n.ostring.call(e)},isRegExp:function(e){return e&&e instanceof RegExp},hasProp:e,
//returns true if the object does not have an own property prop,
//or if it does, it is a falsy value.
falseProp:function(n,t){return!e(n,t)||!n[t]},
//gets own property value for given prop on object
getOwn:function(n,t){return e(n,t)&&n[t]},_mixin:function(e,n,t){var r;for(r in n)!n.hasOwnProperty(r)||!t&&e.hasOwnProperty(r)||(e[r]=n[r]);return e},/**
         * mixin({}, obj1, obj2) is allowed. If the last argument is a boolean,
         * then the source objects properties are force copied over to dest.
         */
mixin:function(e){var t,r,i,o=Array.prototype.slice.call(arguments);for(e||(e={}),o.length>2&&"boolean"==typeof arguments[o.length-1]&&(t=o.pop()),r=1,i=o.length;r<i;r++)n._mixin(e,o[r],t);return e},/**
         * Does a type of deep copy. Do not give it anything fancy, best
         * for basic object copies of objects that also work well as
         * JSON-serialized things, or has properties pointing to functions.
         * For non-array/object values, just returns the same object.
         * @param  {Object} obj      copy properties from this object
         * @param  {Object} [result] optional result object to use
         * @return {Object}
         */
deeplikeCopy:function(e){var r,i;
//Anything else is an object, hopefully.
return n.isArray(e)?(i=[],e.forEach(function(e){i.push(n.deeplikeCopy(e))}),i):(r=typeof e,null===e||void 0===e||"boolean"===r||"string"===r||"number"===r||n.isFunction(e)||n.isRegExp(e)||t(e)?e:(i={},n.eachProp(e,function(e,t){i[t]=n.deeplikeCopy(e)}),i))},delegate:function(){
// boodman/crockford delegation w/ cornford optimization
function e(){}return function(t,r){e.prototype=t;var i=new e;return e.prototype=null,r&&n.mixin(i,r),i}}(),/**
         * Helper function for iterating over an array. If the func returns
         * a true value, it will break out of the loop.
         */
each:function(e,n){if(e){var t;for(t=0;t<e.length&&!n(e[t],t,e);t+=1);}},/**
         * Cycles over properties in an object and calls a function for each
         * property value. If the function returns a truthy value, then the
         * iteration is stopped.
         */
eachProp:function(n,t){var r;for(r in n)if(e(n,r)&&t(n[r],r))break},
//Similar to Function.prototype.bind, but the "this" object is specified
//first, since it is easier to read/figure out what "this" will be.
bind:function(e,n){return function(){return n.apply(e,arguments)}},
//Escapes a content string to be be a string that has characters escaped
//for inclusion as part of a JS string.
jsEscape:function(e){return e.replace(/(["'\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")}}});/**
 * prim 0.0.1 Copyright (c) 2012-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/prim for details
 */
/*global setImmediate, process, setTimeout, define, module */
//Set prime.hideResolutionConflict = true to allow "resolution-races"
//in promise-tests to pass.
//Since the goal of prim is to be a small impl for trusted code, it is
//more important to normally throw in this case so that we can find
//logic errors quicker.
var prim;if(function(){"use strict";function e(e,n){return o.call(e,n)}/**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
function n(e,n){if(e){var t;for(t=0;t<e.length;t+=1)e[t]&&n(e[t],t,e)}}function t(n){if(e(n,"e")||e(n,"v")){if(!prim.hideResolutionConflict)throw new Error("nope");return!1}return!0}function r(e,t){prim.nextTick(function(){n(e,function(e){e(t)})})}var i=Object.prototype,o=i.hasOwnProperty;prim=function n(){var i,o=[],a=[];return i={callback:function(t,r){r&&i.errback(r),e(i,"v")?n.nextTick(function(){t(i.v)}):o.push(t)},errback:function(t){e(i,"e")?n.nextTick(function(){t(i.e)}):a.push(t)},finished:function(){return e(i,"e")||e(i,"v")},rejected:function(){return e(i,"e")},resolve:function(e){return t(i)&&(i.v=e,r(o,e)),i},reject:function(e){return t(i)&&(i.e=e,r(a,e)),i},start:function(e){return i.resolve(),i.promise.then(e)},promise:{then:function(e,t){var r=n();return i.callback(function(n){try{e&&"function"==typeof e&&(n=e(n)),n&&n.then?n.then(r.resolve,r.reject):r.resolve(n)}catch(e){r.reject(e)}},function(e){var n;try{t&&"function"==typeof t?(n=t(e),n&&n.then?n.then(r.resolve,r.reject):r.resolve(n)):r.reject(e)}catch(e){r.reject(e)}}),r.promise},fail:function(e){return i.promise.then(null,e)},end:function(){i.errback(function(e){throw e})}}}},prim.serial=function(e){var t=prim().resolve().promise;return n(e,function(e){t=t.then(function(){return e()})}),t},prim.nextTick="function"==typeof setImmediate?setImmediate:"undefined"!=typeof process&&process.nextTick?process.nextTick:"undefined"!=typeof setTimeout?function(e){setTimeout(e,0)}:function(e){e()},"function"==typeof define&&define.amd?define("prim",function(){return prim}):"undefined"!=typeof module&&module.exports&&(module.exports=prim)}(),"browser"===env&&/**
 * @license RequireJS Copyright (c) 2012-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, load: false */
//Just a stub for use with uglify's consolidator.js
define("browser/assert",function(){return{}}),"node"===env&&/**
 * @license RequireJS Copyright (c) 2012-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, load: false */
//Needed so that rhino/assert can return a stub for uglify's consolidator.js
define("node/assert",["assert"],function(e){return e}),"rhino"===env&&/**
 * @license RequireJS Copyright (c) 2013-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, load: false */
//Just a stub for use with uglify's consolidator.js
define("rhino/assert",function(){return{}}),"xpconnect"===env&&/**
 * @license RequireJS Copyright (c) 2013-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, load: false */
//Just a stub for use with uglify's consolidator.js
define("xpconnect/assert",function(){return{}}),"browser"===env&&/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, process: false */
define("browser/args",function(){
//Always expect config via an API call
return[]}),"node"===env&&/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, process: false */
define("node/args",function(){
//Do not return the "node" or "r.js" arguments
var e=process.argv.slice(2);
//Ignore any command option used for main x.js branching
return e[0]&&0===e[0].indexOf("-")&&(e=e.slice(1)),e}),"rhino"===env){/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, process: false */
var jsLibRhinoArgs=void 0!==rhinoArgs&&rhinoArgs||[].concat(Array.prototype.slice.call(arguments,0));define("rhino/args",function(){var e=jsLibRhinoArgs;
//Ignore any command option used for main x.js branching
return e[0]&&0===e[0].indexOf("-")&&(e=e.slice(1)),e})}if("xpconnect"===env){/**
 * @license Copyright (c) 2013-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define, xpconnectArgs */
var jsLibXpConnectArgs=void 0!==xpconnectArgs&&xpconnectArgs||[].concat(Array.prototype.slice.call(arguments,0));define("xpconnect/args",function(){var e=jsLibXpConnectArgs;
//Ignore any command option used for main x.js branching
return e[0]&&0===e[0].indexOf("-")&&(e=e.slice(1)),e})}"browser"===env&&/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, console: false */
define("browser/load",["./file"],function(file){function load(fileName){eval(file.readFile(fileName))}return load}),"node"===env&&/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, console: false */
define("node/load",["fs"],function(e){function n(n){var t=e.readFileSync(n,"utf8");process.compile(t,n)}return n}),"rhino"===env&&/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, load: false */
define("rhino/load",function(){return load}),"xpconnect"===env&&/**
 * @license RequireJS Copyright (c) 2013-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, load: false */
define("xpconnect/load",function(){return load}),"browser"===env&&/**
 * @license Copyright (c) 2012-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint sloppy: true, nomen: true */
/*global require, define, console, XMLHttpRequest, requirejs, location */
define("browser/file",["prim"],function(e){function n(e){return e.replace(/\\/g,"/")}function t(e){var n,t=new XMLHttpRequest;
//Oh yeah, that is right SYNC IO. Behold its glory
//and horrible blocking behavior.
return t.open("HEAD",e,!1),t.send(),200===(n=t.status)||304===n}var r,i=/^\.(\/|$)/;return r={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return"/"},exists:function(e){return t(e)},parent:function(e){var n=e.split("/");return n.pop(),n.join("/")},/**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {String} fileName
         */
absPath:function(e){var t;
//Pull off protocol and host, just want
//to allow paths (other build parts, like
//require._isSupportedBuildUrl do not support
//full URLs), but a full path from
//the root.
return i.test(e)&&(t=n(location.href),t.indexOf("/")!==-1&&(t=t.split("/"),t.splice(0,3),t.pop(),t="/"+t.join("/")),e=t+e.substring(1)),e},normalize:function(e){return e},isFile:function(e){return!0},isDirectory:function(e){return!1},getFilteredFileList:function(e,n,t){console.log("file.getFilteredFileList is no-op in browser")},copyDir:function(e,n,t,r){console.log("file.copyDir is no-op in browser")},copyFile:function(e,n,t){console.log("file.copyFile is no-op in browser")},/**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
renameFile:function(e,n){console.log("file.renameFile is no-op in browser")},/**
         * Reads a *text* file.
         */
readFile:function(e,n){var t=new XMLHttpRequest;
//Oh yeah, that is right SYNC IO. Behold its glory
//and horrible blocking behavior.
return t.open("GET",e,!1),t.send(),t.responseText},readFileAsync:function(n,t){var r=new XMLHttpRequest,i=e();return r.open("GET",n,!0),r.send(),r.onreadystatechange=function(){4===r.readyState&&(r.status>400?i.reject(new Error("Status: "+r.status+": "+r.statusText)):i.resolve(r.responseText))},i.promise},saveUtf8File:function(e,n){
//summary: saves a *text* file using UTF-8 encoding.
r.saveFile(e,n,"utf8")},saveFile:function(e,n,t){requirejs.browser.saveFile(e,n,t)},deleteFile:function(e){console.log("file.deleteFile is no-op in browser")},/**
         * Deletes any empty directories under the given directory.
         */
deleteEmptyDirs:function(e){console.log("file.deleteEmptyDirs is no-op in browser")}}}),"node"===env&&/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint plusplus: false, octal:false, strict: false */
/*global define: false, process: false */
define("node/file",["fs","path","prim"],function(e,n,t){function r(e){return e.replace(/\\/g,"/")}function i(n){s&&"/"===n.charAt(n.length-1)&&":"!==n.charAt(n.length-2)&&(n=n.substring(0,n.length-1));try{return e.statSync(n),!0}catch(e){return!1}}function o(n){i(n)||s&&c.test(n)||e.mkdirSync(n,511)}function a(e){var n=e.split("/"),t="",r=!0;n.forEach(function(e){
//First part may be empty string if path starts with a slash.
t+=e+"/",r=!1,e&&o(t)})}var u,s="win32"===process.platform,c=/^[a-zA-Z]\:\/$/;return u={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return"/"},exists:function(e){return i(e)},parent:function(e){var n=e.split("/");return n.pop(),n.join("/")},/**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {String} fileName
         */
absPath:function(t){return r(n.normalize(r(e.realpathSync(t))))},normalize:function(e){return r(n.normalize(e))},isFile:function(n){return e.statSync(n).isFile()},isDirectory:function(n){return e.statSync(n).isDirectory()},getFilteredFileList:function(/*String*/t,/*RegExp*/i,/*boolean?*/o){
//summary: Recurses startDir and finds matches to the files that match regExpFilters.include
//and do not match regExpFilters.exclude. Or just one regexp can be passed in for regExpFilters,
//and it will be treated as the "include" case.
//Ignores files/directories that start with a period (.) unless exclusionRegExp
//is set to another value.
var a,s,c,l,f,p,d,h,g,m,v=[];if(a=t,s=i.include||i,c=i.exclude||null,u.exists(a))for(l=e.readdirSync(a),f=0;f<l.length;f++)m=l[f],d=n.join(a,m),p=e.statSync(d),p.isFile()?(o&&d.indexOf("/")===-1&&(d=r(d)),h=!0,s&&(h=d.match(s)),h&&c&&(h=!d.match(c)),!h||u.exclusionRegExp&&u.exclusionRegExp.test(m)||v.push(d)):!p.isDirectory()||u.exclusionRegExp&&u.exclusionRegExp.test(m)||(g=this.getFilteredFileList(d,i,o),v.push.apply(v,g));return v},copyDir:function(/*String*/e,/*String*/t,/*RegExp?*/i,/*boolean?*/o){
//summary: copies files from srcDir to destDir using the regExpFilter to determine if the
//file should be copied. Returns a list file name strings of the destinations that were copied.
i=i||/\w/,
//Normalize th directory names, but keep front slashes.
//path module on windows now returns backslashed paths.
e=r(n.normalize(e)),t=r(n.normalize(t));var a,s,c,l=u.getFilteredFileList(e,i,!0),f=[];for(a=0;a<l.length;a++)s=l[a],c=s.replace(e,t),u.copyFile(s,c,o)&&f.push(c);return f.length?f:null},copyFile:function(/*String*/t,/*String*/r,/*boolean?*/i){
//summary: copies srcFileName to destFileName. If onlyCopyNew is set, it only copies the file if
//srcFileName is newer than destFileName. Returns a boolean indicating if the copy occurred.
var o;
//logger.trace("Src filename: " + srcFileName);
//logger.trace("Dest filename: " + destFileName);
//If onlyCopyNew is true, then compare dates and only copy if the src is newer
//than dest.
//logger.trace("Src filename: " + srcFileName);
//logger.trace("Dest filename: " + destFileName);
//If onlyCopyNew is true, then compare dates and only copy if the src is newer
//than dest.
//Make sure destination dir exists.
return!(i&&u.exists(r)&&e.statSync(r).mtime.getTime()>=e.statSync(t).mtime.getTime())&&(o=n.dirname(r),u.exists(o)||a(o),e.writeFileSync(r,e.readFileSync(t,"binary"),"binary"),!0)},/**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
renameFile:function(n,t){return e.renameSync(n,t)},/**
         * Reads a *text* file.
         */
readFile:function(/*String*/n,/*String?*/t){"utf-8"===t&&(t="utf8"),t||(t="utf8");var r=e.readFileSync(n,t);
//Hmm, would not expect to get A BOM, but it seems to happen,
//remove it just in case.
return 0===r.indexOf("\ufeff")&&(r=r.substring(1,r.length)),r},readFileAsync:function(e,n){var r=t();try{r.resolve(u.readFile(e,n))}catch(e){r.reject(e)}return r.promise},saveUtf8File:function(/*String*/e,/*String*/n){
//summary: saves a *text* file using UTF-8 encoding.
u.saveFile(e,n,"utf8")},saveFile:function(/*String*/t,/*String*/r,/*String?*/i){
//summary: saves a *text* file.
var o;"utf-8"===i&&(i="utf8"),i||(i="utf8"),
//Make sure destination directories exist.
o=n.dirname(t),u.exists(o)||a(o),e.writeFileSync(t,r,i)},deleteFile:function(/*String*/t){
//summary: deletes a file or directory if it exists.
var r,i,o;if(u.exists(t))if(o=e.lstatSync(t),o.isDirectory()){for(r=e.readdirSync(t),i=0;i<r.length;i++)this.deleteFile(n.join(t,r[i]));e.rmdirSync(t)}else e.unlinkSync(t)},/**
         * Deletes any empty directories under the given directory.
         */
deleteEmptyDirs:function(t){var r,i,o,a,s;if(u.exists(t)){for(r=e.readdirSync(t),i=0;i<r.length;i++)o=r[i],a=n.join(t,o),s=e.lstatSync(a),s.isDirectory()&&u.deleteEmptyDirs(a);
//If directory is now empty, remove it.
0===e.readdirSync(t).length&&u.deleteFile(t)}}}}),"rhino"===env&&/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Helper functions to deal with file I/O.
/*jslint plusplus: false */
/*global java: false, define: false */
define("rhino/file",["prim"],function(e){var n={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return n.lineSeparator},lineSeparator:java.lang.System.getProperty("line.separator"),//Java String
exists:function(e){return new java.io.File(e).exists()},parent:function(e){return n.absPath(new java.io.File(e).getParentFile())},normalize:function(e){return n.absPath(e)},isFile:function(e){return new java.io.File(e).isFile()},isDirectory:function(e){return new java.io.File(e).isDirectory()},/**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {java.io.File||String} file
         */
absPath:function(e){return"string"==typeof e&&(e=new java.io.File(e)),(e.getCanonicalPath()+"").replace(n.backSlashRegExp,"/")},getFilteredFileList:function(/*String*/e,/*RegExp*/t,/*boolean?*/r,/*boolean?*/i){
//summary: Recurses startDir and finds matches to the files that match regExpFilters.include
//and do not match regExpFilters.exclude. Or just one regexp can be passed in for regExpFilters,
//and it will be treated as the "include" case.
//Ignores files/directories that start with a period (.) unless exclusionRegExp
//is set to another value.
var o,a,u,s,c,l,f,p,d,h=[];if(o=e,i||(o=new java.io.File(e)),a=t.include||t,u=t.exclude||null,o.exists())for(s=o.listFiles(),c=0;c<s.length;c++)l=s[c],l.isFile()?(f=l.getPath(),r&&(
//Make sure we have a JS string.
f=String(f),f.indexOf("/")===-1&&(f=f.replace(/\\/g,"/"))),p=!0,a&&(p=f.match(a)),p&&u&&(p=!f.match(u)),!p||n.exclusionRegExp&&n.exclusionRegExp.test(l.getName())||h.push(f)):!l.isDirectory()||n.exclusionRegExp&&n.exclusionRegExp.test(l.getName())||(d=this.getFilteredFileList(l,t,r,!0),h.push.apply(h,d));return h},copyDir:function(/*String*/e,/*String*/t,/*RegExp?*/r,/*boolean?*/i){
//summary: copies files from srcDir to destDir using the regExpFilter to determine if the
//file should be copied. Returns a list file name strings of the destinations that were copied.
r=r||/\w/;var o,a,u,s=n.getFilteredFileList(e,r,!0),c=[];for(o=0;o<s.length;o++)a=s[o],u=a.replace(e,t),n.copyFile(a,u,i)&&c.push(u);return c.length?c:null},copyFile:function(/*String*/e,/*String*/n,/*boolean?*/t){
//summary: copies srcFileName to destFileName. If onlyCopyNew is set, it only copies the file if
//srcFileName is newer than destFileName. Returns a boolean indicating if the copy occurred.
var r,i,o,a,u=new java.io.File(n);
//logger.trace("Src filename: " + srcFileName);
//logger.trace("Dest filename: " + destFileName);
//If onlyCopyNew is true, then compare dates and only copy if the src is newer
//than dest.
if(t&&(r=new java.io.File(e),u.exists()&&u.lastModified()>=r.lastModified()))return!1;if(
//Make sure destination dir exists.
i=u.getParentFile(),!i.exists()&&!i.mkdirs())throw"Could not create directory: "+i.getCanonicalPath();
//Java's version of copy file.
return o=new java.io.FileInputStream(e).getChannel(),a=new java.io.FileOutputStream(n).getChannel(),a.transferFrom(o,0,o.size()),o.close(),a.close(),!0},/**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
renameFile:function(e,n){return new java.io.File(e).renameTo(new java.io.File(n))},readFile:function(/*String*/e,/*String?*/t){
//A file read function that can deal with BOMs
t=t||"utf-8";var r,i,o=new java.io.File(e),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),t));try{for(r=new java.lang.StringBuffer,i=a.readLine(),
// Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
// http://www.unicode.org/faq/utf_bom.html
// Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
// http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
i&&i.length()&&65279===i.charAt(0)&&(
// Eat the BOM, since we've already found the encoding on this file,
// and we plan to concatenating this buffer with others; the BOM should
// only appear at the top of a file.
i=i.substring(1));null!==i;)r.append(i),r.append(n.lineSeparator),i=a.readLine();
//Make sure we return a JavaScript string and not a Java string.
return String(r.toString())}finally{a.close()}},readFileAsync:function(t,r){var i=e();try{i.resolve(n.readFile(t,r))}catch(e){i.reject(e)}return i.promise},saveUtf8File:function(/*String*/e,/*String*/t){
//summary: saves a file using UTF-8 encoding.
n.saveFile(e,t,"utf-8")},saveFile:function(/*String*/e,/*String*/n,/*String?*/t){
//summary: saves a file.
var r,i,o,a=new java.io.File(e);if(i=a.getAbsoluteFile().getParentFile(),!i.exists()&&!i.mkdirs())throw"Could not create directory: "+i.getAbsolutePath();r=t?new java.io.OutputStreamWriter(new java.io.FileOutputStream(a),t):new java.io.OutputStreamWriter(new java.io.FileOutputStream(a)),o=new java.io.BufferedWriter(r);try{o.write(n)}finally{o.close()}},deleteFile:function(/*String*/e){
//summary: deletes a file or directory if it exists.
var n,t,r=new java.io.File(e);if(r.exists()){if(r.isDirectory())for(n=r.listFiles(),t=0;t<n.length;t++)this.deleteFile(n[t]);r.delete()}},/**
         * Deletes any empty directories under the given directory.
         * The startDirIsJavaObject is private to this implementation's
         * recursion needs.
         */
deleteEmptyDirs:function(e,t){var r,i,o,a=e;if(t||(a=new java.io.File(e)),a.exists()){for(r=a.listFiles(),i=0;i<r.length;i++)o=r[i],o.isDirectory()&&n.deleteEmptyDirs(o,!0);
//If the directory is empty now, delete it.
0===a.listFiles().length&&n.deleteFile(String(a.getPath()))}}};return n}),"xpconnect"===env&&/**
 * @license RequireJS Copyright (c) 2013-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Helper functions to deal with file I/O.
/*jslint plusplus: false */
/*global define, Components, xpcUtil */
define("xpconnect/file",["prim"],function(e){function n(e){
//1 is DIRECTORY_TYPE, 511 is 0777 permissions
e.exists()||e.create(1,511)}var t,r=Components.classes,i=Components.interfaces,
//Depends on xpcUtil which is set up in x.js
o=xpcUtil.xpfile;return t={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return t.lineSeparator},lineSeparator:"@mozilla.org/windows-registry-key;1"in r?"\r\n":"\n",exists:function(e){return o(e).exists()},parent:function(e){return o(e).parent},normalize:function(e){return t.absPath(e)},isFile:function(e){return o(e).isFile()},isDirectory:function(e){return o(e).isDirectory()},/**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {java.io.File||String} file
         */
absPath:function(e){return"string"==typeof e&&(e=o(e)),e.path},getFilteredFileList:function(/*String*/e,/*RegExp*/n,/*boolean?*/r,/*boolean?*/a){
//summary: Recurses startDir and finds matches to the files that match regExpFilters.include
//and do not match regExpFilters.exclude. Or just one regexp can be passed in for regExpFilters,
//and it will be treated as the "include" case.
//Ignores files/directories that start with a period (.) unless exclusionRegExp
//is set to another value.
var u,s,c,l,f,p,d,h,g=[];if(u=e,a||(u=o(e)),s=n.include||n,c=n.exclude||null,u.exists())for(l=u.directoryEntries;l.hasMoreElements();)f=l.getNext().QueryInterface(i.nsILocalFile),f.isFile()?(p=f.path,r&&p.indexOf("/")===-1&&(p=p.replace(/\\/g,"/")),d=!0,s&&(d=p.match(s)),d&&c&&(d=!p.match(c)),!d||t.exclusionRegExp&&t.exclusionRegExp.test(f.leafName)||g.push(p)):!f.isDirectory()||t.exclusionRegExp&&t.exclusionRegExp.test(f.leafName)||(h=this.getFilteredFileList(f,n,r,!0),g.push.apply(g,h));return g},copyDir:function(/*String*/e,/*String*/n,/*RegExp?*/r,/*boolean?*/i){
//summary: copies files from srcDir to destDir using the regExpFilter to determine if the
//file should be copied. Returns a list file name strings of the destinations that were copied.
r=r||/\w/;var o,a,u,s=t.getFilteredFileList(e,r,!0),c=[];for(o=0;o<s.length;o+=1)a=s[o],u=a.replace(e,n),t.copyFile(a,u,i)&&c.push(u);return c.length?c:null},copyFile:function(/*String*/e,/*String*/n,/*boolean?*/t){
//summary: copies srcFileName to destFileName. If onlyCopyNew is set, it only copies the file if
//srcFileName is newer than destFileName. Returns a boolean indicating if the copy occurred.
var r=o(n),i=o(e);
//logger.trace("Src filename: " + srcFileName);
//logger.trace("Dest filename: " + destFileName);
//If onlyCopyNew is true, then compare dates and only copy if the src is newer
//than dest.
//logger.trace("Src filename: " + srcFileName);
//logger.trace("Dest filename: " + destFileName);
//If onlyCopyNew is true, then compare dates and only copy if the src is newer
//than dest.
return!(t&&r.exists()&&r.lastModifiedTime>=i.lastModifiedTime)&&(i.copyTo(r.parent,r.leafName),!0)},/**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
renameFile:function(e,n){var t=o(n);return o(e).moveTo(t.parent,t.leafName)},readFile:xpcUtil.readFile,readFileAsync:function(n,r){var i=e();try{i.resolve(t.readFile(n,r))}catch(e){i.reject(e)}return i.promise},saveUtf8File:function(/*String*/e,/*String*/n){
//summary: saves a file using UTF-8 encoding.
t.saveFile(e,n,"utf-8")},saveFile:function(/*String*/e,/*String*/t,/*String?*/a){var u,s,c=o(e);n(c.parent);try{u=r["@mozilla.org/network/file-output-stream;1"].createInstance(i.nsIFileOutputStream),
//438 is decimal for 0777
u.init(c,42,511,0),s=r["@mozilla.org/intl/converter-output-stream;1"].createInstance(i.nsIConverterOutputStream),s.init(u,a,0,0),s.writeString(t)}catch(e){throw new Error((c&&c.path||"")+": "+e)}finally{s&&s.close(),u&&u.close()}},deleteFile:function(/*String*/e){
//summary: deletes a file or directory if it exists.
var n=o(e);n.exists()&&n.remove(!0)},/**
         * Deletes any empty directories under the given directory.
         * The startDirIsJavaObject is private to this implementation's
         * recursion needs.
         */
deleteEmptyDirs:function(e,n){var r,a,u=e;if(n||(u=o(e)),u.exists()){for(r=u.directoryEntries;r.hasMoreElements();)a=r.getNext().QueryInterface(i.nsILocalFile),a.isDirectory()&&t.deleteEmptyDirs(a,!0);
//If the directory is empty now, delete it.
r=u.directoryEntries,r.hasMoreElements()||t.deleteFile(u.path)}}}}),"browser"===env&&/*global process */
define("browser/quit",function(){"use strict";return function(e){}}),"node"===env&&/*global process */
define("node/quit",function(){"use strict";return function(e){var n=0,t=function(){0===n?process.exit(e):n-=1};process.stdout.bufferSize&&(n+=1,process.stdout.once("drain",t)),process.stderr.bufferSize&&(n+=1,process.stderr.once("drain",t)),t()}}),"rhino"===env&&/*global quit */
define("rhino/quit",function(){"use strict";return function(e){return quit(e)}}),"xpconnect"===env&&/*global quit */
define("xpconnect/quit",function(){"use strict";return function(e){return quit(e)}}),"browser"===env&&/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, console: false */
define("browser/print",function(){function e(e){console.log(e)}return e}),"node"===env&&/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, console: false */
define("node/print",function(){function e(e){console.log(e)}return e}),"rhino"===env&&/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, print: false */
define("rhino/print",function(){return print}),"xpconnect"===env&&/**
 * @license RequireJS Copyright (c) 2013-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false, print: false */
define("xpconnect/print",function(){return print}),/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint nomen: false, strict: false */
/*global define: false */
define("logger",["env!env/print"],function(e){return{TRACE:0,INFO:1,WARN:2,ERROR:3,SILENT:4,level:0,logPrefix:"",logLevel:function(e){this.level=e},trace:function(e){this.level<=this.TRACE&&this._print(e)},info:function(e){this.level<=this.INFO&&this._print(e)},warn:function(e){this.level<=this.WARN&&this._print(e)},error:function(e){this.level<=this.ERROR&&this._print(e)},_print:function(e){this._sysPrint((this.logPrefix?this.logPrefix+" ":"")+e)},_sysPrint:function(n){e(n)}}}),
//Just a blank file to use when building the optimizer with the optimizer,
//so that the build does not attempt to inline some env modules,
//like Node's fs and path.
/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*jslint bitwise:true plusplus:true */
/*global esprima:true, define:true, exports:true, window: true,
throwError: true, createLiteral: true, generateStatement: true,
parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseFunctionSourceElements: true, parseVariableIdentifier: true,
parseLeftHandSideExpression: true,
parseStatement: true, parseSourceElement: true */
function(e,n){"use strict";
// Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
// Rhino, and plain browser loading.
"function"==typeof define&&define.amd?define("esprima",["exports"],n):n("undefined"!=typeof exports?exports:e.esprima={})}(this,function(exports){"use strict";
// Ensure the condition is true, otherwise throw an error.
// This is only to have a better contract semantic, i.e. another safety net
// to catch a logic error. The condition shall be fulfilled in normal case.
// Do NOT use this to enforce a certain condition on any user input.
function e(e,n){if(!e)throw new Error("ASSERT: "+n)}function n(e,n){return dn.slice(e,n)}function t(e){return"0123456789".indexOf(e)>=0}function r(e){return"0123456789abcdefABCDEF".indexOf(e)>=0}function i(e){return"01234567".indexOf(e)>=0}
// 7.2 White Space
function o(e){return" "===e||"\t"===e||"\v"===e||"\f"===e||" "===e||e.charCodeAt(0)>=5760&&" ᠎             　\ufeff".indexOf(e)>=0}
// 7.3 Line Terminators
function a(e){return"\n"===e||"\r"===e||"\u2028"===e||"\u2029"===e}
// 7.6 Identifier Names and Identifiers
function u(e){return"$"===e||"_"===e||"\\"===e||e>="a"&&e<="z"||e>="A"&&e<="Z"||e.charCodeAt(0)>=128&&pn.NonAsciiIdentifierStart.test(e)}function s(e){return"$"===e||"_"===e||"\\"===e||e>="a"&&e<="z"||e>="A"&&e<="Z"||e>="0"&&e<="9"||e.charCodeAt(0)>=128&&pn.NonAsciiIdentifierPart.test(e)}
// 7.6.1.2 Future Reserved Words
function c(e){switch(e){
// Future reserved words.
case"class":case"enum":case"export":case"extends":case"import":case"super":return!0}return!1}function l(e){switch(e){
// Strict Mode reserved words.
case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0}return!1}function f(e){return"eval"===e||"arguments"===e}
// 7.6.1.1 Keywords
function p(e){var n=!1;switch(e.length){case 2:n="if"===e||"in"===e||"do"===e;break;case 3:n="var"===e||"for"===e||"new"===e||"try"===e;break;case 4:n="this"===e||"else"===e||"case"===e||"void"===e||"with"===e;break;case 5:n="while"===e||"break"===e||"catch"===e||"throw"===e;break;case 6:n="return"===e||"typeof"===e||"delete"===e||"switch"===e;break;case 7:n="default"===e||"finally"===e;break;case 8:n="function"===e||"continue"===e||"debugger"===e;break;case 10:n="instanceof"===e}if(n)return!0;switch(e){
// Future reserved words.
// 'const' is specialized as Keyword in V8.
case"const":return!0;
// For compatiblity to SpiderMonkey and ES.next
case"yield":case"let":return!0}return!(!hn||!l(e))||c(e)}
// 7.4 Comments
function d(){var e,n,t;for(n=!1,t=!1;gn<yn;)if(e=dn[gn],t)e=dn[gn++],a(e)&&(t=!1,"\r"===e&&"\n"===dn[gn]&&++gn,++mn,vn=gn);else if(n)a(e)?("\r"===e&&"\n"===dn[gn+1]&&++gn,++mn,++gn,vn=gn,gn>=yn&&C({},fn.UnexpectedToken,"ILLEGAL")):(e=dn[gn++],gn>=yn&&C({},fn.UnexpectedToken,"ILLEGAL"),"*"===e&&"/"===(e=dn[gn])&&(++gn,n=!1));else if("/"===e)if("/"===(e=dn[gn+1]))gn+=2,t=!0;else{if("*"!==e)break;gn+=2,n=!0,gn>=yn&&C({},fn.UnexpectedToken,"ILLEGAL")}else if(o(e))++gn;else{if(!a(e))break;++gn,"\r"===e&&"\n"===dn[gn]&&++gn,++mn,vn=gn}}function h(e){var n,t,i,o=0;for(t="u"===e?4:2,n=0;n<t;++n){if(!(gn<yn&&r(dn[gn])))return"";i=dn[gn++],o=16*o+"0123456789abcdef".indexOf(i.toLowerCase())}return String.fromCharCode(o)}function g(){var e,n,t,r;if(e=dn[gn],u(e)){if(n=gn,"\\"===e){if(++gn,"u"!==dn[gn])return;if(++gn,r=gn,e=h("u")){if("\\"===e||!u(e))return;t=e}else gn=r,t="u"}else t=dn[gn++];for(;gn<yn&&(e=dn[gn],s(e));)if("\\"===e){if(++gn,"u"!==dn[gn])return;if(++gn,r=gn,e=h("u")){if("\\"===e||!s(e))return;t+=e}else gn=r,t+="u"}else t+=dn[gn++];
// There is no keyword or literal with only one character.
// Thus, it must be an identifier.
// There is no keyword or literal with only one character.
// Thus, it must be an identifier.
// 7.8.1 Null Literals
// 7.8.2 Boolean Literals
return 1===t.length?{type:un.Identifier,value:t,lineNumber:mn,lineStart:vn,range:[n,gn]}:p(t)?{type:un.Keyword,value:t,lineNumber:mn,lineStart:vn,range:[n,gn]}:"null"===t?{type:un.NullLiteral,value:t,lineNumber:mn,lineStart:vn,range:[n,gn]}:"true"===t||"false"===t?{type:un.BooleanLiteral,value:t,lineNumber:mn,lineStart:vn,range:[n,gn]}:{type:un.Identifier,value:t,lineNumber:mn,lineStart:vn,range:[n,gn]}}}
// 7.7 Punctuators
function m(){var e,n,r,i=gn,o=dn[gn];
// Check for most common single-character punctuators.
// Check for most common single-character punctuators.
// Dot (.) can also start a floating-point number, hence the need
// to check the next character.
// Peek more characters.
// 4-character punctuator: >>>=
// 3-character punctuators: === !== >>> <<= >>=
// 2-character punctuators: <= >= == != ++ -- << >> && ||
// += -= *= %= &= |= ^= /=
// The remaining 1-character punctuators.
return";"===o||"{"===o||"}"===o?(++gn,{type:un.Punctuator,value:o,lineNumber:mn,lineStart:vn,range:[i,gn]}):","===o||"("===o||")"===o?(++gn,{type:un.Punctuator,value:o,lineNumber:mn,lineStart:vn,range:[i,gn]}):(e=dn[gn+1],"."!==o||t(e)?(n=dn[gn+2],r=dn[gn+3],">"===o&&">"===e&&">"===n&&"="===r?(gn+=4,{type:un.Punctuator,value:">>>=",lineNumber:mn,lineStart:vn,range:[i,gn]}):"="===o&&"="===e&&"="===n?(gn+=3,{type:un.Punctuator,value:"===",lineNumber:mn,lineStart:vn,range:[i,gn]}):"!"===o&&"="===e&&"="===n?(gn+=3,{type:un.Punctuator,value:"!==",lineNumber:mn,lineStart:vn,range:[i,gn]}):">"===o&&">"===e&&">"===n?(gn+=3,{type:un.Punctuator,value:">>>",lineNumber:mn,lineStart:vn,range:[i,gn]}):"<"===o&&"<"===e&&"="===n?(gn+=3,{type:un.Punctuator,value:"<<=",lineNumber:mn,lineStart:vn,range:[i,gn]}):">"===o&&">"===e&&"="===n?(gn+=3,{type:un.Punctuator,value:">>=",lineNumber:mn,lineStart:vn,range:[i,gn]}):"="===e&&"<>=!+-*%&|^/".indexOf(o)>=0?(gn+=2,{type:un.Punctuator,value:o+e,lineNumber:mn,lineStart:vn,range:[i,gn]}):o===e&&"+-<>&|".indexOf(o)>=0&&"+-<>&|".indexOf(e)>=0?(gn+=2,{type:un.Punctuator,value:o+e,lineNumber:mn,lineStart:vn,range:[i,gn]}):"[]<>+-*%&|^!~?:=/".indexOf(o)>=0?{type:un.Punctuator,value:dn[gn++],lineNumber:mn,lineStart:vn,range:[i,gn]}:void 0):{type:un.Punctuator,value:dn[gn++],lineNumber:mn,lineStart:vn,range:[i,gn]})}
// 7.8.3 Numeric Literals
function v(){var n,o,a;if(a=dn[gn],e(t(a)||"."===a,"Numeric literal must start with a decimal digit or a decimal point"),o=gn,n="","."!==a){
// Hex number starts with '0x'.
// Octal number starts with '0'.
if(n=dn[gn++],a=dn[gn],"0"===n){if("x"===a||"X"===a){for(n+=dn[gn++];gn<yn&&(a=dn[gn],r(a));)n+=dn[gn++];
// only 0x
return n.length<=2&&C({},fn.UnexpectedToken,"ILLEGAL"),gn<yn&&(a=dn[gn],u(a)&&C({},fn.UnexpectedToken,"ILLEGAL")),{type:un.NumericLiteral,value:parseInt(n,16),lineNumber:mn,lineStart:vn,range:[o,gn]}}if(i(a)){for(n+=dn[gn++];gn<yn&&(a=dn[gn],i(a));)n+=dn[gn++];return gn<yn&&(a=dn[gn],(u(a)||t(a))&&C({},fn.UnexpectedToken,"ILLEGAL")),{type:un.NumericLiteral,value:parseInt(n,8),octal:!0,lineNumber:mn,lineStart:vn,range:[o,gn]}}
// decimal number starts with '0' such as '09' is illegal.
t(a)&&C({},fn.UnexpectedToken,"ILLEGAL")}for(;gn<yn&&(a=dn[gn],t(a));)n+=dn[gn++]}if("."===a)for(n+=dn[gn++];gn<yn&&(a=dn[gn],t(a));)n+=dn[gn++];if("e"===a||"E"===a)if(n+=dn[gn++],a=dn[gn],"+"!==a&&"-"!==a||(n+=dn[gn++]),a=dn[gn],t(a))for(n+=dn[gn++];gn<yn&&(a=dn[gn],t(a));)n+=dn[gn++];else a="character "+a,gn>=yn&&(a="<end>"),C({},fn.UnexpectedToken,"ILLEGAL");return gn<yn&&(a=dn[gn],u(a)&&C({},fn.UnexpectedToken,"ILLEGAL")),{type:un.NumericLiteral,value:parseFloat(n),lineNumber:mn,lineStart:vn,range:[o,gn]}}
// 7.8.4 String Literals
function y(){var n,t,r,o,u,s,c="",l=!1;for(n=dn[gn],e("'"===n||'"'===n,"String literal must starts with a quote"),t=gn,++gn;gn<yn;){if((r=dn[gn++])===n){n="";break}if("\\"===r)if(r=dn[gn++],a(r))++mn,"\r"===r&&"\n"===dn[gn]&&++gn;else switch(r){case"n":c+="\n";break;case"r":c+="\r";break;case"t":c+="\t";break;case"u":case"x":s=gn,u=h(r),u?c+=u:(gn=s,c+=r);break;case"b":c+="\b";break;case"f":c+="\f";break;case"v":c+="\v";break;default:i(r)?(o="01234567".indexOf(r),
// \0 is not octal escape sequence
0!==o&&(l=!0),gn<yn&&i(dn[gn])&&(l=!0,o=8*o+"01234567".indexOf(dn[gn++]),
// 3 digits are only allowed when string starts
// with 0, 1, 2, 3
"0123".indexOf(r)>=0&&gn<yn&&i(dn[gn])&&(o=8*o+"01234567".indexOf(dn[gn++]))),c+=String.fromCharCode(o)):c+=r}else{if(a(r))break;c+=r}}return""!==n&&C({},fn.UnexpectedToken,"ILLEGAL"),{type:un.StringLiteral,value:c,octal:l,lineNumber:mn,lineStart:vn,range:[t,gn]}}function b(){var n,t,r,i,o,u,c,l=!1,f=!1;for(bn=null,d(),r=gn,t=dn[gn],e("/"===t,"Regular expression literal must start with a slash"),n=dn[gn++];gn<yn;)if(t=dn[gn++],n+=t,"\\"===t)t=dn[gn++],
// ECMA-262 7.8.5
a(t)&&C({},fn.UnterminatedRegExp),n+=t;else if(l)"]"===t&&(l=!1);else{if("/"===t){f=!0;break}"["===t?l=!0:a(t)&&C({},fn.UnterminatedRegExp)}for(f||C({},fn.UnterminatedRegExp),
// Exclude leading and trailing slash.
i=n.substr(1,n.length-2),o="";gn<yn&&(t=dn[gn],s(t));)if(++gn,"\\"===t&&gn<yn)if("u"===(t=dn[gn]))if(++gn,c=gn,t=h("u"))for(o+=t,n+="\\u";c<gn;++c)n+=dn[c];else gn=c,o+="u",n+="\\u";else n+="\\";else o+=t,n+=t;try{u=new RegExp(i,o)}catch(e){C({},fn.InvalidRegExp)}return{literal:n,value:u,range:[r,gn]}}function x(e){return e.type===un.Identifier||e.type===un.Keyword||e.type===un.BooleanLiteral||e.type===un.NullLiteral}function _(){var e,n;return d(),gn>=yn?{type:un.EOF,lineNumber:mn,lineStart:vn,range:[gn,gn]}:void 0!==(n=m())?n:"'"===(e=dn[gn])||'"'===e?y():"."===e||t(e)?v():void 0!==(n=g())?n:void C({},fn.UnexpectedToken,"ILLEGAL")}function w(){var e;return bn?(gn=bn.range[1],mn=bn.lineNumber,vn=bn.lineStart,e=bn,bn=null,e):(bn=null,_())}function E(){var e,n,t;return null!==bn?bn:(e=gn,n=mn,t=vn,bn=_(),gn=e,mn=n,vn=t,bn)}
// Return true if there is a line terminator before the next token.
function A(){var e,n,t,r;return e=gn,n=mn,t=vn,d(),r=mn!==n,gn=e,mn=n,vn=t,r}
// Throw an exception
function C(e,n){var t,r=Array.prototype.slice.call(arguments,2),i=n.replace(/%(\d)/g,function(e,n){return r[n]||""});throw"number"==typeof e.lineNumber?(t=new Error("Line "+e.lineNumber+": "+i),t.index=e.range[0],t.lineNumber=e.lineNumber,t.column=e.range[0]-vn+1):(t=new Error("Line "+mn+": "+i),t.index=gn,t.lineNumber=mn,t.column=gn-vn+1),t}function F(){try{C.apply(null,arguments)}catch(e){if(!_n.errors)throw e;_n.errors.push(e)}}
// Throw an exception because of the token.
function S(e){if(e.type===un.EOF&&C(e,fn.UnexpectedEOS),e.type===un.NumericLiteral&&C(e,fn.UnexpectedNumber),e.type===un.StringLiteral&&C(e,fn.UnexpectedString),e.type===un.Identifier&&C(e,fn.UnexpectedIdentifier),e.type===un.Keyword){if(c(e.value))C(e,fn.UnexpectedReserved);else if(hn&&l(e.value))return void F(e,fn.StrictReservedWord);C(e,fn.UnexpectedToken,e.value)}
// BooleanLiteral, NullLiteral, or Punctuator.
C(e,fn.UnexpectedToken,e.value)}
// Expect the next token to match the specified punctuator.
// If not, an exception will be thrown.
function k(e){var n=w();n.type===un.Punctuator&&n.value===e||S(n)}
// Expect the next token to match the specified keyword.
// If not, an exception will be thrown.
function D(e){var n=w();n.type===un.Keyword&&n.value===e||S(n)}
// Return true if the next token matches the specified punctuator.
function B(e){var n=E();return n.type===un.Punctuator&&n.value===e}
// Return true if the next token matches the specified keyword
function O(e){var n=E();return n.type===un.Keyword&&n.value===e}
// Return true if the next token is an assignment operator
function q(){var e=E(),n=e.value;return e.type===un.Punctuator&&("="===n||"*="===n||"/="===n||"%="===n||"+="===n||"-="===n||"<<="===n||">>="===n||">>>="===n||"&="===n||"^="===n||"|="===n)}function R(){var e,n;
// Catch the very common case first.
if(";"===dn[gn])return void w();if(n=mn,d(),mn===n){if(B(";"))return void w();e=E(),e.type===un.EOF||B("}")||S(e)}}
// Return true if provided expression is LeftHandSideExpression
function P(e){return e.type===cn.Identifier||e.type===cn.MemberExpression}
// 11.1.4 Array Initialiser
function j(){var e=[];for(k("[");!B("]");)B(",")?(w(),e.push(null)):(e.push(ce()),B("]")||k(","));return k("]"),{type:cn.ArrayExpression,elements:e}}
// 11.1.5 Object Initialiser
function L(e,n){var t,r;return t=hn,r=Le(),n&&hn&&f(e[0].name)&&F(n,fn.StrictParamName),hn=t,{type:cn.FunctionExpression,id:null,params:e,defaults:[],body:r,rest:null,generator:!1,expression:!1}}function N(){var e=w();
// Note: This function is called only from parseObjectProperty(), where
// EOF and Punctuator tokens are already filtered out.
// Note: This function is called only from parseObjectProperty(), where
// EOF and Punctuator tokens are already filtered out.
return e.type===un.StringLiteral||e.type===un.NumericLiteral?(hn&&e.octal&&F(e,fn.StrictOctalLiteral),Je(e)):{type:cn.Identifier,name:e.value}}function T(){var e,n,t,r;
// Property Assignment: Getter and Setter.
return e=E(),e.type===un.Identifier?(t=N(),"get"!==e.value||B(":")?"set"!==e.value||B(":")?(k(":"),{type:cn.Property,key:t,value:ce(),kind:"init"}):(n=N(),k("("),e=E(),e.type!==un.Identifier?(k(")"),F(e,fn.UnexpectedToken,e.value),{type:cn.Property,key:n,value:L([]),kind:"set"}):(r=[de()],k(")"),{type:cn.Property,key:n,value:L(r,e),kind:"set"})):(n=N(),k("("),k(")"),{type:cn.Property,key:n,value:L([]),kind:"get"})):e.type!==un.EOF&&e.type!==un.Punctuator?(n=N(),k(":"),{type:cn.Property,key:n,value:ce(),kind:"init"}):void S(e)}function M(){var e,n,t,r=[],i={},o=String;for(k("{");!B("}");)e=T(),n=e.key.type===cn.Identifier?e.key.name:o(e.key.value),t="init"===e.kind?ln.Data:"get"===e.kind?ln.Get:ln.Set,Object.prototype.hasOwnProperty.call(i,n)?(i[n]===ln.Data?hn&&t===ln.Data?F({},fn.StrictDuplicateProperty):t!==ln.Data&&F({},fn.AccessorDataProperty):t===ln.Data?F({},fn.AccessorDataProperty):i[n]&t&&F({},fn.AccessorGetSet),i[n]|=t):i[n]=t,r.push(e),B("}")||k(",");return k("}"),{type:cn.ObjectExpression,properties:r}}
// 11.1.6 The Grouping Operator
function I(){var e;return k("("),e=le(),k(")"),e}
// 11.1 Primary Expressions
function U(){var e=E(),n=e.type;if(n===un.Identifier)return{type:cn.Identifier,name:w().value};if(n===un.StringLiteral||n===un.NumericLiteral)return hn&&e.octal&&F(e,fn.StrictOctalLiteral),Je(w());if(n===un.Keyword){if(O("this"))return w(),{type:cn.ThisExpression};if(O("function"))return Te()}return n===un.BooleanLiteral?(w(),e.value="true"===e.value,Je(e)):n===un.NullLiteral?(w(),e.value=null,Je(e)):B("[")?j():B("{")?M():B("(")?I():B("/")||B("/=")?Je(b()):S(w())}
// 11.2 Left-Hand-Side Expressions
function z(){var e=[];if(k("("),!B(")"))for(;gn<yn&&(e.push(ce()),!B(")"));)k(",");return k(")"),e}function V(){var e=w();return x(e)||S(e),{type:cn.Identifier,name:e.value}}function W(){return k("."),V()}function H(){var e;return k("["),e=le(),k("]"),e}function G(){var e;return D("new"),e={type:cn.NewExpression,callee:Y(),arguments:[]},B("(")&&(e.arguments=z()),e}function J(){var e;for(e=O("new")?G():U();B(".")||B("[")||B("(");)e=B("(")?{type:cn.CallExpression,callee:e,arguments:z()}:B("[")?{type:cn.MemberExpression,computed:!0,object:e,property:H()}:{type:cn.MemberExpression,computed:!1,object:e,property:W()};return e}function Y(){var e;for(e=O("new")?G():U();B(".")||B("[");)e=B("[")?{type:cn.MemberExpression,computed:!0,object:e,property:H()}:{type:cn.MemberExpression,computed:!1,object:e,property:W()};return e}
// 11.3 Postfix Expressions
function X(){var e,n=J();
// 11.3.1, 11.3.2
return e=E(),e.type!==un.Punctuator?n:(!B("++")&&!B("--")||A()||(hn&&n.type===cn.Identifier&&f(n.name)&&F({},fn.StrictLHSPostfix),P(n)||F({},fn.InvalidLHSInAssignment),n={type:cn.UpdateExpression,operator:w().value,argument:n,prefix:!1}),n)}
// 11.4 Unary Operators
function K(){var e,n;
// 11.4.4, 11.4.5
return e=E(),e.type!==un.Punctuator&&e.type!==un.Keyword?X():B("++")||B("--")?(e=w(),n=K(),hn&&n.type===cn.Identifier&&f(n.name)&&F({},fn.StrictLHSPrefix),P(n)||F({},fn.InvalidLHSInAssignment),n={type:cn.UpdateExpression,operator:e.value,argument:n,prefix:!0}):B("+")||B("-")||B("~")||B("!")?n={type:cn.UnaryExpression,operator:w().value,argument:K(),prefix:!0}:O("delete")||O("void")||O("typeof")?(n={type:cn.UnaryExpression,operator:w().value,argument:K(),prefix:!0},hn&&"delete"===n.operator&&n.argument.type===cn.Identifier&&F({},fn.StrictDelete),n):X()}
// 11.5 Multiplicative Operators
function Q(){for(var e=K();B("*")||B("/")||B("%");)e={type:cn.BinaryExpression,operator:w().value,left:e,right:K()};return e}
// 11.6 Additive Operators
function Z(){for(var e=Q();B("+")||B("-");)e={type:cn.BinaryExpression,operator:w().value,left:e,right:Q()};return e}
// 11.7 Bitwise Shift Operators
function ee(){for(var e=Z();B("<<")||B(">>")||B(">>>");)e={type:cn.BinaryExpression,operator:w().value,left:e,right:Z()};return e}
// 11.8 Relational Operators
function ne(){var e,n;for(n=xn.allowIn,xn.allowIn=!0,e=ee();B("<")||B(">")||B("<=")||B(">=")||n&&O("in")||O("instanceof");)e={type:cn.BinaryExpression,operator:w().value,left:e,right:ee()};return xn.allowIn=n,e}
// 11.9 Equality Operators
function te(){for(var e=ne();B("==")||B("!=")||B("===")||B("!==");)e={type:cn.BinaryExpression,operator:w().value,left:e,right:ne()};return e}
// 11.10 Binary Bitwise Operators
function re(){for(var e=te();B("&");)w(),e={type:cn.BinaryExpression,operator:"&",left:e,right:te()};return e}function ie(){for(var e=re();B("^");)w(),e={type:cn.BinaryExpression,operator:"^",left:e,right:re()};return e}function oe(){for(var e=ie();B("|");)w(),e={type:cn.BinaryExpression,operator:"|",left:e,right:ie()};return e}
// 11.11 Binary Logical Operators
function ae(){for(var e=oe();B("&&");)w(),e={type:cn.LogicalExpression,operator:"&&",left:e,right:oe()};return e}function ue(){for(var e=ae();B("||");)w(),e={type:cn.LogicalExpression,operator:"||",left:e,right:ae()};return e}
// 11.12 Conditional Operator
function se(){var e,n,t;return e=ue(),B("?")&&(w(),n=xn.allowIn,xn.allowIn=!0,t=ce(),xn.allowIn=n,k(":"),e={type:cn.ConditionalExpression,test:e,consequent:t,alternate:ce()}),e}
// 11.13 Assignment Operators
function ce(){var e,n;
// LeftHandSideExpression
// 11.13.1
return e=E(),n=se(),q()&&(P(n)||F({},fn.InvalidLHSInAssignment),hn&&n.type===cn.Identifier&&f(n.name)&&F(e,fn.StrictLHSAssignment),n={type:cn.AssignmentExpression,operator:w().value,left:n,right:ce()}),n}
// 11.14 Comma Operator
function le(){var e=ce();if(B(","))for(e={type:cn.SequenceExpression,expressions:[e]};gn<yn&&B(",");)w(),e.expressions.push(ce());return e}
// 12.1 Block
function fe(){for(var e,n=[];gn<yn&&!B("}")&&void 0!==(e=Me());)n.push(e);return n}function pe(){var e;return k("{"),e=fe(),k("}"),{type:cn.BlockStatement,body:e}}
// 12.2 Variable Statement
function de(){var e=w();return e.type!==un.Identifier&&S(e),{type:cn.Identifier,name:e.value}}function he(e){var n=de(),t=null;
// 12.2.1
return hn&&f(n.name)&&F({},fn.StrictVarName),"const"===e?(k("="),t=ce()):B("=")&&(w(),t=ce()),{type:cn.VariableDeclarator,id:n,init:t}}function ge(e){var n=[];do{if(n.push(he(e)),!B(","))break;w()}while(gn<yn);return n}function me(){var e;return D("var"),e=ge(),R(),{type:cn.VariableDeclaration,declarations:e,kind:"var"}}
// kind may be `const` or `let`
// Both are experimental and not in the specification yet.
// see http://wiki.ecmascript.org/doku.php?id=harmony:const
// and http://wiki.ecmascript.org/doku.php?id=harmony:let
function ve(e){var n;return D(e),n=ge(e),R(),{type:cn.VariableDeclaration,declarations:n,kind:e}}
// 12.3 Empty Statement
function ye(){return k(";"),{type:cn.EmptyStatement}}
// 12.4 Expression Statement
function be(){var e=le();return R(),{type:cn.ExpressionStatement,expression:e}}
// 12.5 If statement
function xe(){var e,n,t;return D("if"),k("("),e=le(),k(")"),n=je(),O("else")?(w(),t=je()):t=null,{type:cn.IfStatement,test:e,consequent:n,alternate:t}}
// 12.6 Iteration Statements
function _e(){var e,n,t;return D("do"),t=xn.inIteration,xn.inIteration=!0,e=je(),xn.inIteration=t,D("while"),k("("),n=le(),k(")"),B(";")&&w(),{type:cn.DoWhileStatement,body:e,test:n}}function we(){var e,n,t;return D("while"),k("("),e=le(),k(")"),t=xn.inIteration,xn.inIteration=!0,n=je(),xn.inIteration=t,{type:cn.WhileStatement,test:e,body:n}}function Ee(){var e=w();return{type:cn.VariableDeclaration,declarations:ge(),kind:e.value}}function Ae(){var e,n,t,r,i,o,a;
// LeftHandSideExpression
return e=n=t=null,D("for"),k("("),B(";")?w():(O("var")||O("let")?(xn.allowIn=!1,e=Ee(),xn.allowIn=!0,1===e.declarations.length&&O("in")&&(w(),r=e,i=le(),e=null)):(xn.allowIn=!1,e=le(),xn.allowIn=!0,O("in")&&(P(e)||F({},fn.InvalidLHSInForIn),w(),r=e,i=le(),e=null)),void 0===r&&k(";")),void 0===r&&(B(";")||(n=le()),k(";"),B(")")||(t=le())),k(")"),a=xn.inIteration,xn.inIteration=!0,o=je(),xn.inIteration=a,void 0===r?{type:cn.ForStatement,init:e,test:n,update:t,body:o}:{type:cn.ForInStatement,left:r,right:i,body:o,each:!1}}
// 12.7 The continue statement
function Ce(){var e,n=null;
// Optimize the most common form: 'continue;'.
// Optimize the most common form: 'continue;'.
return D("continue"),";"===dn[gn]?(w(),xn.inIteration||C({},fn.IllegalContinue),{type:cn.ContinueStatement,label:null}):A()?(xn.inIteration||C({},fn.IllegalContinue),{type:cn.ContinueStatement,label:null}):(e=E(),e.type===un.Identifier&&(n=de(),Object.prototype.hasOwnProperty.call(xn.labelSet,n.name)||C({},fn.UnknownLabel,n.name)),R(),null!==n||xn.inIteration||C({},fn.IllegalContinue),{type:cn.ContinueStatement,label:n})}
// 12.8 The break statement
function Fe(){var e,n=null;
// Optimize the most common form: 'break;'.
// Optimize the most common form: 'break;'.
return D("break"),";"===dn[gn]?(w(),xn.inIteration||xn.inSwitch||C({},fn.IllegalBreak),{type:cn.BreakStatement,label:null}):A()?(xn.inIteration||xn.inSwitch||C({},fn.IllegalBreak),{type:cn.BreakStatement,label:null}):(e=E(),e.type===un.Identifier&&(n=de(),Object.prototype.hasOwnProperty.call(xn.labelSet,n.name)||C({},fn.UnknownLabel,n.name)),R(),null!==n||xn.inIteration||xn.inSwitch||C({},fn.IllegalBreak),{type:cn.BreakStatement,label:n})}
// 12.9 The return statement
function Se(){var e,n=null;
// 'return' followed by a space and an identifier is very common.
// 'return' followed by a space and an identifier is very common.
return D("return"),xn.inFunctionBody||F({},fn.IllegalReturn)," "===dn[gn]&&u(dn[gn+1])?(n=le(),R(),{type:cn.ReturnStatement,argument:n}):A()?{type:cn.ReturnStatement,argument:null}:(B(";")||(e=E(),B("}")||e.type===un.EOF||(n=le())),R(),{type:cn.ReturnStatement,argument:n})}
// 12.10 The with statement
function ke(){var e,n;return hn&&F({},fn.StrictModeWith),D("with"),k("("),e=le(),k(")"),n=je(),{type:cn.WithStatement,object:e,body:n}}
// 12.10 The swith statement
function De(){var e,n,t=[];for(O("default")?(w(),e=null):(D("case"),e=le()),k(":");gn<yn&&!(B("}")||O("default")||O("case"))&&void 0!==(n=je());)t.push(n);return{type:cn.SwitchCase,test:e,consequent:t}}function Be(){var e,n,t,r,i;if(D("switch"),k("("),e=le(),k(")"),k("{"),n=[],B("}"))return w(),{type:cn.SwitchStatement,discriminant:e,cases:n};for(r=xn.inSwitch,xn.inSwitch=!0,i=!1;gn<yn&&!B("}");)t=De(),null===t.test&&(i&&C({},fn.MultipleDefaultsInSwitch),i=!0),n.push(t);return xn.inSwitch=r,k("}"),{type:cn.SwitchStatement,discriminant:e,cases:n}}
// 12.13 The throw statement
function Oe(){var e;return D("throw"),A()&&C({},fn.NewlineAfterThrow),e=le(),R(),{type:cn.ThrowStatement,argument:e}}
// 12.14 The try statement
function qe(){var e;
// 12.14.1
return D("catch"),k("("),B(")")&&S(E()),e=de(),hn&&f(e.name)&&F({},fn.StrictCatchVariable),k(")"),{type:cn.CatchClause,param:e,body:pe()}}function Re(){var e,n=[],t=null;return D("try"),e=pe(),O("catch")&&n.push(qe()),O("finally")&&(w(),t=pe()),0!==n.length||t||C({},fn.NoCatchOrFinally),{type:cn.TryStatement,block:e,guardedHandlers:[],handlers:n,finalizer:t}}
// 12.15 The debugger statement
function Pe(){return D("debugger"),R(),{type:cn.DebuggerStatement}}
// 12 Statements
function je(){var e,n,t=E();if(t.type===un.EOF&&S(t),t.type===un.Punctuator)switch(t.value){case";":return ye();case"{":return pe();case"(":return be()}if(t.type===un.Keyword)switch(t.value){case"break":return Fe();case"continue":return Ce();case"debugger":return Pe();case"do":return _e();case"for":return Ae();case"function":return Ne();case"if":return xe();case"return":return Se();case"switch":return Be();case"throw":return Oe();case"try":return Re();case"var":return me();case"while":return we();case"with":return ke()}
// 12.12 Labelled Statements
// 12.12 Labelled Statements
return e=le(),e.type===cn.Identifier&&B(":")?(w(),Object.prototype.hasOwnProperty.call(xn.labelSet,e.name)&&C({},fn.Redeclaration,"Label",e.name),xn.labelSet[e.name]=!0,n=je(),delete xn.labelSet[e.name],{type:cn.LabeledStatement,label:e,body:n}):(R(),{type:cn.ExpressionStatement,expression:e})}
// 13 Function Definition
function Le(){var e,t,r,i,o,a,u,s,c=[];for(k("{");gn<yn&&(t=E(),t.type===un.StringLiteral)&&(e=Me(),c.push(e),e.expression.type===cn.Literal);)r=n(t.range[0]+1,t.range[1]-1),"use strict"===r?(hn=!0,i&&F(i,fn.StrictOctalLiteral)):!i&&t.octal&&(i=t);for(o=xn.labelSet,a=xn.inIteration,u=xn.inSwitch,s=xn.inFunctionBody,xn.labelSet={},xn.inIteration=!1,xn.inSwitch=!1,xn.inFunctionBody=!0;gn<yn&&!B("}")&&void 0!==(e=Me());)c.push(e);return k("}"),xn.labelSet=o,xn.inIteration=a,xn.inSwitch=u,xn.inFunctionBody=s,{type:cn.BlockStatement,body:c}}function Ne(){var e,n,t,r,i,o,a,u,s,c=[];if(D("function"),r=E(),e=de(),hn?f(r.value)&&F(r,fn.StrictFunctionName):f(r.value)?(o=r,a=fn.StrictFunctionName):l(r.value)&&(o=r,a=fn.StrictReservedWord),k("("),!B(")"))for(s={};gn<yn&&(r=E(),n=de(),hn?(f(r.value)&&(i=r,a=fn.StrictParamName),Object.prototype.hasOwnProperty.call(s,r.value)&&(i=r,a=fn.StrictParamDupe)):o||(f(r.value)?(o=r,a=fn.StrictParamName):l(r.value)?(o=r,a=fn.StrictReservedWord):Object.prototype.hasOwnProperty.call(s,r.value)&&(o=r,a=fn.StrictParamDupe)),c.push(n),s[n.name]=!0,!B(")"));)k(",");return k(")"),u=hn,t=Le(),hn&&o&&C(o,a),hn&&i&&F(i,a),hn=u,{type:cn.FunctionDeclaration,id:e,params:c,defaults:[],body:t,rest:null,generator:!1,expression:!1}}function Te(){var e,n,t,r,i,o,a,u,s=null,c=[];if(D("function"),B("(")||(e=E(),s=de(),hn?f(e.value)&&F(e,fn.StrictFunctionName):f(e.value)?(t=e,r=fn.StrictFunctionName):l(e.value)&&(t=e,r=fn.StrictReservedWord)),k("("),!B(")"))for(u={};gn<yn&&(e=E(),i=de(),hn?(f(e.value)&&(n=e,r=fn.StrictParamName),Object.prototype.hasOwnProperty.call(u,e.value)&&(n=e,r=fn.StrictParamDupe)):t||(f(e.value)?(t=e,r=fn.StrictParamName):l(e.value)?(t=e,r=fn.StrictReservedWord):Object.prototype.hasOwnProperty.call(u,e.value)&&(t=e,r=fn.StrictParamDupe)),c.push(i),u[i.name]=!0,!B(")"));)k(",");return k(")"),a=hn,o=Le(),hn&&t&&C(t,r),hn&&n&&F(n,r),hn=a,{type:cn.FunctionExpression,id:s,params:c,defaults:[],body:o,rest:null,generator:!1,expression:!1}}
// 14 Program
function Me(){var e=E();if(e.type===un.Keyword)switch(e.value){case"const":case"let":return ve(e.value);case"function":return Ne();default:return je()}if(e.type!==un.EOF)return je()}function Ie(){for(var e,t,r,i,o=[];gn<yn&&(t=E(),t.type===un.StringLiteral)&&(e=Me(),o.push(e),e.expression.type===cn.Literal);)r=n(t.range[0]+1,t.range[1]-1),"use strict"===r?(hn=!0,i&&F(i,fn.StrictOctalLiteral)):!i&&t.octal&&(i=t);for(;gn<yn&&void 0!==(e=Me());)o.push(e);return o}function Ue(){return hn=!1,{type:cn.Program,body:Ie()}}
// The following functions are needed only when the option to preserve
// the comments is active.
function $e(n,t,r,i,o){e("number"==typeof r,"Comment must have valid position"),
// Because the way the actual token is scanned, often the comments
// (if any) are skipped twice during the lexical analysis.
// Thus, we need to skip adding a comment if the comment array already
// handled it.
_n.comments.length>0&&_n.comments[_n.comments.length-1].range[1]>r||_n.comments.push({type:n,value:t,range:[r,i],loc:o})}function ze(){var e,n,t,r,i,u;for(e="",i=!1,u=!1;gn<yn;)if(n=dn[gn],u)n=dn[gn++],a(n)?(t.end={line:mn,column:gn-vn-1},u=!1,$e("Line",e,r,gn-1,t),"\r"===n&&"\n"===dn[gn]&&++gn,++mn,vn=gn,e=""):gn>=yn?(u=!1,e+=n,t.end={line:mn,column:yn-vn},$e("Line",e,r,yn,t)):e+=n;else if(i)a(n)?("\r"===n&&"\n"===dn[gn+1]?(++gn,e+="\r\n"):e+=n,++mn,++gn,vn=gn,gn>=yn&&C({},fn.UnexpectedToken,"ILLEGAL")):(n=dn[gn++],gn>=yn&&C({},fn.UnexpectedToken,"ILLEGAL"),e+=n,"*"===n&&"/"===(n=dn[gn])&&(e=e.substr(0,e.length-1),i=!1,++gn,t.end={line:mn,column:gn-vn},$e("Block",e,r,gn,t),e=""));else if("/"===n)if("/"===(n=dn[gn+1]))t={start:{line:mn,column:gn-vn}},r=gn,gn+=2,u=!0,gn>=yn&&(t.end={line:mn,column:gn-vn},u=!1,$e("Line",e,r,gn,t));else{if("*"!==n)break;r=gn,gn+=2,i=!0,t={start:{line:mn,column:gn-vn-2}},gn>=yn&&C({},fn.UnexpectedToken,"ILLEGAL")}else if(o(n))++gn;else{if(!a(n))break;++gn,"\r"===n&&"\n"===dn[gn]&&++gn,++mn,vn=gn}}function Ve(){var e,n,t,r=[];for(e=0;e<_n.comments.length;++e)n=_n.comments[e],t={type:n.type,value:n.value},_n.range&&(t.range=n.range),_n.loc&&(t.loc=n.loc),r.push(t);_n.comments=r}function We(){var e,t,r,i;return d(),gn,e={start:{line:mn,column:gn-vn}},t=_n.advance(),e.end={line:mn,column:gn-vn},t.type!==un.EOF&&(r=[t.range[0],t.range[1]],i=n(t.range[0],t.range[1]),_n.tokens.push({type:sn[t.type],value:i,range:r,loc:e})),t}function He(){var e,n,t,r;
// Pop the previous token, which is likely '/' or '/='
return d(),e=gn,n={start:{line:mn,column:gn-vn}},t=_n.scanRegExp(),n.end={line:mn,column:gn-vn},_n.tokens.length>0&&(r=_n.tokens[_n.tokens.length-1],r.range[0]===e&&"Punctuator"===r.type&&("/"!==r.value&&"/="!==r.value||_n.tokens.pop())),_n.tokens.push({type:"RegularExpression",value:t.literal,range:[e,gn],loc:n}),t}function Ge(){var e,n,t,r=[];for(e=0;e<_n.tokens.length;++e)n=_n.tokens[e],t={type:n.type,value:n.value},_n.range&&(t.range=n.range),_n.loc&&(t.loc=n.loc),r.push(t);_n.tokens=r}function Je(e){return{type:cn.Literal,value:e.value}}function Ye(e){return{type:cn.Literal,value:e.value,raw:n(e.range[0],e.range[1])}}function Xe(){var e={};return e.range=[gn,gn],e.loc={start:{line:mn,column:gn-vn},end:{line:mn,column:gn-vn}},e.end=function(){this.range[1]=gn,this.loc.end.line=mn,this.loc.end.column=gn-vn},e.applyGroup=function(e){_n.range&&(e.groupRange=[this.range[0],this.range[1]]),_n.loc&&(e.groupLoc={start:{line:this.loc.start.line,column:this.loc.start.column},end:{line:this.loc.end.line,column:this.loc.end.column}})},e.apply=function(e){_n.range&&(e.range=[this.range[0],this.range[1]]),_n.loc&&(e.loc={start:{line:this.loc.start.line,column:this.loc.start.column},end:{line:this.loc.end.line,column:this.loc.end.column}})},e}function Ke(){var e,n;return d(),e=Xe(),k("("),n=le(),k(")"),e.end(),e.applyGroup(n),n}function Qe(){var e,n;for(d(),e=Xe(),n=O("new")?G():U();B(".")||B("[");)B("[")?(n={type:cn.MemberExpression,computed:!0,object:n,property:H()},e.end(),e.apply(n)):(n={type:cn.MemberExpression,computed:!1,object:n,property:W()},e.end(),e.apply(n));return n}function Ze(){var e,n;for(d(),e=Xe(),n=O("new")?G():U();B(".")||B("[")||B("(");)B("(")?(n={type:cn.CallExpression,callee:n,arguments:z()},e.end(),e.apply(n)):B("[")?(n={type:cn.MemberExpression,computed:!0,object:n,property:H()},e.end(),e.apply(n)):(n={type:cn.MemberExpression,computed:!1,object:n,property:W()},e.end(),e.apply(n));return n}function en(e){var n,t,r;n="[object Array]"===Object.prototype.toString.apply(e)?[]:{};for(t in e)e.hasOwnProperty(t)&&"groupRange"!==t&&"groupLoc"!==t&&(r=e[t],null===r||"object"!=typeof r||r instanceof RegExp?n[t]=r:n[t]=en(r));return n}function nn(e,n){return function(t){function r(e){return e.type===cn.LogicalExpression||e.type===cn.BinaryExpression}function i(t){var o,a;r(t.left)&&i(t.left),r(t.right)&&i(t.right),e&&(t.left.groupRange||t.right.groupRange?(o=t.left.groupRange?t.left.groupRange[0]:t.left.range[0],a=t.right.groupRange?t.right.groupRange[1]:t.right.range[1],t.range=[o,a]):void 0===t.range&&(o=t.left.range[0],a=t.right.range[1],t.range=[o,a])),n&&(t.left.groupLoc||t.right.groupLoc?(o=t.left.groupLoc?t.left.groupLoc.start:t.left.loc.start,a=t.right.groupLoc?t.right.groupLoc.end:t.right.loc.end,t.loc={start:o,end:a}):void 0===t.loc&&(t.loc={start:t.left.loc.start,end:t.right.loc.end}))}return function(){var o,a;return d(),o=Xe(),a=t.apply(null,arguments),o.end(),e&&void 0===a.range&&o.apply(a),n&&void 0===a.loc&&o.apply(a),r(a)&&i(a),a}}}function tn(){var e;_n.comments&&(_n.skipComment=d,d=ze),_n.raw&&(_n.createLiteral=Je,Je=Ye),(_n.range||_n.loc)&&(_n.parseGroupExpression=I,_n.parseLeftHandSideExpression=Y,_n.parseLeftHandSideExpressionAllowCall=J,I=Ke,Y=Qe,J=Ze,e=nn(_n.range,_n.loc),_n.parseAdditiveExpression=Z,_n.parseAssignmentExpression=ce,_n.parseBitwiseANDExpression=re,_n.parseBitwiseORExpression=oe,_n.parseBitwiseXORExpression=ie,_n.parseBlock=pe,_n.parseFunctionSourceElements=Le,_n.parseCatchClause=qe,_n.parseComputedMember=H,_n.parseConditionalExpression=se,_n.parseConstLetDeclaration=ve,_n.parseEqualityExpression=te,_n.parseExpression=le,_n.parseForVariableDeclaration=Ee,_n.parseFunctionDeclaration=Ne,_n.parseFunctionExpression=Te,_n.parseLogicalANDExpression=ae,_n.parseLogicalORExpression=ue,_n.parseMultiplicativeExpression=Q,_n.parseNewExpression=G,_n.parseNonComputedProperty=V,_n.parseObjectProperty=T,_n.parseObjectPropertyKey=N,_n.parsePostfixExpression=X,_n.parsePrimaryExpression=U,_n.parseProgram=Ue,_n.parsePropertyFunction=L,_n.parseRelationalExpression=ne,_n.parseStatement=je,_n.parseShiftExpression=ee,_n.parseSwitchCase=De,_n.parseUnaryExpression=K,_n.parseVariableDeclaration=he,_n.parseVariableIdentifier=de,Z=e(_n.parseAdditiveExpression),ce=e(_n.parseAssignmentExpression),re=e(_n.parseBitwiseANDExpression),oe=e(_n.parseBitwiseORExpression),ie=e(_n.parseBitwiseXORExpression),pe=e(_n.parseBlock),Le=e(_n.parseFunctionSourceElements),qe=e(_n.parseCatchClause),H=e(_n.parseComputedMember),se=e(_n.parseConditionalExpression),ve=e(_n.parseConstLetDeclaration),te=e(_n.parseEqualityExpression),le=e(_n.parseExpression),Ee=e(_n.parseForVariableDeclaration),Ne=e(_n.parseFunctionDeclaration),Te=e(_n.parseFunctionExpression),Y=e(Y),ae=e(_n.parseLogicalANDExpression),ue=e(_n.parseLogicalORExpression),Q=e(_n.parseMultiplicativeExpression),G=e(_n.parseNewExpression),V=e(_n.parseNonComputedProperty),T=e(_n.parseObjectProperty),N=e(_n.parseObjectPropertyKey),X=e(_n.parsePostfixExpression),U=e(_n.parsePrimaryExpression),Ue=e(_n.parseProgram),L=e(_n.parsePropertyFunction),ne=e(_n.parseRelationalExpression),je=e(_n.parseStatement),ee=e(_n.parseShiftExpression),De=e(_n.parseSwitchCase),K=e(_n.parseUnaryExpression),he=e(_n.parseVariableDeclaration),de=e(_n.parseVariableIdentifier)),void 0!==_n.tokens&&(_n.advance=_,_n.scanRegExp=b,_=We,b=He)}function rn(){"function"==typeof _n.skipComment&&(d=_n.skipComment),_n.raw&&(Je=_n.createLiteral),(_n.range||_n.loc)&&(Z=_n.parseAdditiveExpression,ce=_n.parseAssignmentExpression,re=_n.parseBitwiseANDExpression,oe=_n.parseBitwiseORExpression,ie=_n.parseBitwiseXORExpression,pe=_n.parseBlock,Le=_n.parseFunctionSourceElements,qe=_n.parseCatchClause,H=_n.parseComputedMember,se=_n.parseConditionalExpression,ve=_n.parseConstLetDeclaration,te=_n.parseEqualityExpression,le=_n.parseExpression,Ee=_n.parseForVariableDeclaration,Ne=_n.parseFunctionDeclaration,Te=_n.parseFunctionExpression,I=_n.parseGroupExpression,Y=_n.parseLeftHandSideExpression,J=_n.parseLeftHandSideExpressionAllowCall,ae=_n.parseLogicalANDExpression,ue=_n.parseLogicalORExpression,Q=_n.parseMultiplicativeExpression,G=_n.parseNewExpression,V=_n.parseNonComputedProperty,T=_n.parseObjectProperty,N=_n.parseObjectPropertyKey,U=_n.parsePrimaryExpression,X=_n.parsePostfixExpression,Ue=_n.parseProgram,L=_n.parsePropertyFunction,ne=_n.parseRelationalExpression,je=_n.parseStatement,ee=_n.parseShiftExpression,De=_n.parseSwitchCase,K=_n.parseUnaryExpression,he=_n.parseVariableDeclaration,de=_n.parseVariableIdentifier),"function"==typeof _n.scanRegExp&&(_=_n.advance,b=_n.scanRegExp)}function on(e){var n,t=e.length,r=[];for(n=0;n<t;++n)r[n]=e.charAt(n);return r}function an(e,n){var t,r;r=String,"string"==typeof e||e instanceof String||(e=r(e)),dn=e,gn=0,mn=dn.length>0?1:0,vn=0,yn=dn.length,bn=null,xn={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1},_n={},void 0!==n&&(_n.range="boolean"==typeof n.range&&n.range,_n.loc="boolean"==typeof n.loc&&n.loc,_n.raw="boolean"==typeof n.raw&&n.raw,"boolean"==typeof n.tokens&&n.tokens&&(_n.tokens=[]),"boolean"==typeof n.comment&&n.comment&&(_n.comments=[]),"boolean"==typeof n.tolerant&&n.tolerant&&(_n.errors=[])),yn>0&&void 0===dn[0]&&(
// Try first to convert to a string. This is good as fast path
// for old IE which understands string indexing for string
// literals only and not for string object.
e instanceof String&&(dn=e.valueOf()),
// Force accessing the characters via an array.
void 0===dn[0]&&(dn=on(e))),tn();try{t=Ue(),void 0!==_n.comments&&(Ve(),t.comments=_n.comments),void 0!==_n.tokens&&(Ge(),t.tokens=_n.tokens),void 0!==_n.errors&&(t.errors=_n.errors),(_n.range||_n.loc)&&(t.body=en(t.body))}catch(e){throw e}finally{rn(),_n={}}return t}var un,sn,cn,ln,fn,pn,dn,hn,gn,mn,vn,yn,bn,xn,_n;un={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8},sn={},sn[un.BooleanLiteral]="Boolean",sn[un.EOF]="<end>",sn[un.Identifier]="Identifier",sn[un.Keyword]="Keyword",sn[un.NullLiteral]="Null",sn[un.NumericLiteral]="Numeric",sn[un.Punctuator]="Punctuator",sn[un.StringLiteral]="String",cn={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement"},ln={Data:1,Get:2,Set:4},
// Error messages should be identical to V8.
fn={UnexpectedToken:"Unexpected token %0",UnexpectedNumber:"Unexpected number",UnexpectedString:"Unexpected string",UnexpectedIdentifier:"Unexpected identifier",UnexpectedReserved:"Unexpected reserved word",UnexpectedEOS:"Unexpected end of input",NewlineAfterThrow:"Illegal newline after throw",InvalidRegExp:"Invalid regular expression",UnterminatedRegExp:"Invalid regular expression: missing /",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NoCatchOrFinally:"Missing catch or finally after try",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared",IllegalContinue:"Illegal continue statement",IllegalBreak:"Illegal break statement",IllegalReturn:"Illegal return statement",StrictModeWith:"Strict mode code may not include a with statement",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictDuplicateProperty:"Duplicate data property in object literal not allowed in strict mode",AccessorDataProperty:"Object literal may not have data and accessor property with the same name",AccessorGetSet:"Object literal may not have multiple get/set accessors with the same name",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictReservedWord:"Use of future reserved word in strict mode"},
// See also tools/generate-unicode-regex.py.
pn={NonAsciiIdentifierStart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),NonAsciiIdentifierPart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")},void 0==="esprima"[0]&&(n=function(e,n){return dn.slice(e,n).join("")}),
// Sync with package.json.
exports.version="1.0.4",exports.parse=an,
// Deep copy.
exports.Syntax=function(){var e,n={};"function"==typeof Object.create&&(n=Object.create(null));for(e in cn)cn.hasOwnProperty(e)&&(n[e]=cn[e]);return"function"==typeof Object.freeze&&Object.freeze(n),n}()}),/* vim: set sw=4 ts=4 et tw=80 : */
/**
 * @license Copyright (c) 2012-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*global define, Reflect */
/*
 * xpcshell has a smaller stack on linux and windows (1MB vs 9MB on mac),
 * and the recursive nature of esprima can cause it to overflow pretty
 * quickly. So favor it built in Reflect parser:
 * https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API
 */
define("esprimaAdapter",["./esprima","env"],function(e,n){return"xpconnect"===n.get()&&"undefined"!=typeof Reflect?Reflect:e}),define("uglifyjs/consolidator",["require","exports","module","./parse-js","./process"],function(require,exports,module){/**
 * @preserve Copyright 2012 Robert Gust-Bardon <http://robert.gust-bardon.org/>.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *     * Redistributions of source code must retain the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
 * THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */
/**
 * @fileoverview Enhances <a href="https://github.com/mishoo/UglifyJS/"
 * >UglifyJS</a> with consolidation of null, Boolean, and String values.
 * <p>Also known as aliasing, this feature has been deprecated in <a href=
 * "http://closure-compiler.googlecode.com/">the Closure Compiler</a> since its
 * initial release, where it is unavailable from the <abbr title=
 * "command line interface">CLI</a>. The Closure Compiler allows one to log and
 * influence this process. In contrast, this implementation does not introduce
 * any variable declarations in global code and derives String values from
 * identifier names used as property accessors.</p>
 * <p>Consolidating literals may worsen the data compression ratio when an <a
 * href="http://tools.ietf.org/html/rfc2616#section-3.5">encoding
 * transformation</a> is applied. For instance, <a href=
 * "http://code.jquery.com/jquery-1.7.1.js">jQuery 1.7.1</a> takes 248235 bytes.
 * Building it with <a href="https://github.com/mishoo/UglifyJS/tarball/v1.2.5">
 * UglifyJS v1.2.5</a> results in 93647 bytes (37.73% of the original) which are
 * then compressed to 33154 bytes (13.36% of the original) using <a href=
 * "http://linux.die.net/man/1/gzip">gzip(1)</a>. Building it with the same
 * version of UglifyJS 1.2.5 patched with the implementation of consolidation
 * results in 80784 bytes (a decrease of 12863 bytes, i.e. 13.74%, in comparison
 * to the aforementioned 93647 bytes) which are then compressed to 34013 bytes
 * (an increase of 859 bytes, i.e. 2.59%, in comparison to the aforementioned
 * 33154 bytes).</p>
 * <p>Written in <a href="http://es5.github.com/#x4.2.2">the strict variant</a>
 * of <a href="http://es5.github.com/">ECMA-262 5.1 Edition</a>. Encoded in <a
 * href="http://tools.ietf.org/html/rfc3629">UTF-8</a>. Follows <a href=
 * "http://google-styleguide.googlecode.com/svn-history/r76/trunk/javascriptguide.xml"
 * >Revision 2.28 of the Google JavaScript Style Guide</a> (except for the
 * discouraged use of the {@code function} tag and the {@code namespace} tag).
 * 100% typed for the <a href=
 * "http://closure-compiler.googlecode.com/files/compiler-20120123.tar.gz"
 * >Closure Compiler Version 1741</a>.</p>
 * <p>Should you find this software useful, please consider <a href=
 * "https://paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JZLW72X8FD4WG"
 * >a donation</a>.</p>
 * @author follow.me@RGustBardon (Robert Gust-Bardon)
 * @supported Tested with:
 *     <ul>
 *     <li><a href="http://nodejs.org/dist/v0.6.10/">Node v0.6.10</a>,</li>
 *     <li><a href="https://github.com/mishoo/UglifyJS/tarball/v1.2.5">UglifyJS
 *       v1.2.5</a>.</li>
 *     </ul>
 */
/*global console:false, exports:true, module:false, require:false */
/*jshint sub:true */
/**
 * Consolidates null, Boolean, and String values found inside an <abbr title=
 * "abstract syntax tree">AST</abbr>.
 * @param {!TSyntacticCodeUnit} oAbstractSyntaxTree An array-like object
 *     representing an <abbr title="abstract syntax tree">AST</abbr>.
 * @return {!TSyntacticCodeUnit} An array-like object representing an <abbr
 *     title="abstract syntax tree">AST</abbr> with its null, Boolean, and
 *     String values consolidated.
 */
// TODO(user) Consolidation of mathematical values found in numeric literals.
// TODO(user) Unconsolidation.
// TODO(user) Consolidation of ECMA-262 6th Edition programs.
// TODO(user) Rewrite in ECMA-262 6th Edition.
exports.ast_consolidate=function(e){"use strict";/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true,
        latedef:true, newcap:true, noarge:true, noempty:true, nonew:true,
        onevar:true, plusplus:true, regexp:true, undef:true, strict:true,
        sub:false, trailing:true */
var/**
       * A record consisting of data about one or more source elements.
       * @constructor
       * @nosideeffects
       */
n=function(){/**
         * The category of the elements.
         * @type {number}
         * @see ESourceElementCategories
         */
this.nCategory=s.N_OTHER,/**
         * The number of occurrences (within the elements) of each primitive
         * value that could be consolidated.
         * @type {!Array.<!Object.<string, number>>}
         */
this.aCount=[],this.aCount[a.N_IDENTIFIER_NAMES]={},this.aCount[a.N_STRING_LITERALS]={},this.aCount[a.N_NULL_AND_BOOLEAN_LITERALS]={},/**
         * Identifier names found within the elements.
         * @type {!Array.<string>}
         */
this.aIdentifiers=[],/**
         * Prefixed representation Strings of each primitive value that could be
         * consolidated within the elements.
         * @type {!Array.<string>}
         */
this.aPrimitiveValues=[]},/**
       * A record consisting of data about a primitive value that could be
       * consolidated.
       * @constructor
       * @nosideeffects
       */
t=function(){/**
         * The difference in the number of terminal symbols between the original
         * source text and the one with the primitive value consolidated. If the
         * difference is positive, the primitive value is considered worthwhile.
         * @type {number}
         */
this.nSaving=0,/**
         * An identifier name of the variable that will be declared and assigned
         * the primitive value if the primitive value is consolidated.
         * @type {string}
         */
this.sName=""},/**
       * A record consisting of data on what to consolidate within the range of
       * source elements that is currently being considered.
       * @constructor
       * @nosideeffects
       */
r=function(){/**
         * An object whose keys are prefixed representation Strings of each
         * primitive value that could be consolidated within the elements and
         * whose values are corresponding data about those primitive values.
         * @type {!Object.<string, {nSaving: number, sName: string}>}
         * @see TPrimitiveValue
         */
this.oPrimitiveValues={},/**
         * The difference in the number of terminal symbols between the original
         * source text and the one with all the worthwhile primitive values
         * consolidated.
         * @type {number}
         * @see TPrimitiveValue#nSaving
         */
this.nSavings=0},/**
       * The processor of <abbr title="abstract syntax tree">AST</abbr>s found
       * in UglifyJS.
       * @namespace
       * @type {!TProcessor}
       */
i=/** @type {!TProcessor} */require("./process"),/**
       * A record consisting of a number of constants that represent the
       * difference in the number of terminal symbols between a source text with
       * a modified syntactic code unit and the original one.
       * @namespace
       * @type {!Object.<string, number>}
       */
o={/**
         * The difference in the number of punctuators required by the bracket
         * notation and the dot notation.
         * <p><code>'[]'.length - '.'.length</code></p>
         * @const
         * @type {number}
         */
N_PROPERTY_ACCESSOR:1,/**
         * The number of punctuators required by a variable declaration with an
         * initialiser.
         * <p><code>':'.length + ';'.length</code></p>
         * @const
         * @type {number}
         */
N_VARIABLE_DECLARATION:2,/**
         * The number of terminal symbols required to introduce a variable
         * statement (excluding its variable declaration list).
         * <p><code>'var '.length</code></p>
         * @const
         * @type {number}
         */
N_VARIABLE_STATEMENT_AFFIXATION:4,/**
         * The number of terminal symbols needed to enclose source elements
         * within a function call with no argument values to a function with an
         * empty parameter list.
         * <p><code>'(function(){}());'.length</code></p>
         * @const
         * @type {number}
         */
N_CLOSURE:17},/**
       * Categories of primary expressions from which primitive values that
       * could be consolidated are derivable.
       * @namespace
       * @enum {number}
       */
a={/**
         * Identifier names used as property accessors.
         * @type {number}
         */
N_IDENTIFIER_NAMES:0,/**
         * String literals.
         * @type {number}
         */
N_STRING_LITERALS:1,/**
         * Null and Boolean literals.
         * @type {number}
         */
N_NULL_AND_BOOLEAN_LITERALS:2},/**
       * Prefixes of primitive values that could be consolidated.
       * The String values of the prefixes must have same number of characters.
       * The prefixes must not be used in any properties defined in any version
       * of <a href=
       * "http://www.ecma-international.org/publications/standards/Ecma-262.htm"
       * >ECMA-262</a>.
       * @namespace
       * @enum {string}
       */
u={/**
         * Identifies String values.
         * @type {string}
         */
S_STRING:"#S",/**
         * Identifies null and Boolean values.
         * @type {string}
         */
S_SYMBOLIC:"#O"},/**
       * Categories of source elements in terms of their appropriateness of
       * having their primitive values consolidated.
       * @namespace
       * @enum {number}
       */
s={/**
         * Identifies a source element that includes the <a href=
         * "http://es5.github.com/#x12.10">{@code with}</a> statement.
         * @type {number}
         */
N_WITH:0,/**
         * Identifies a source element that includes the <a href=
         * "http://es5.github.com/#x15.1.2.1">{@code eval}</a> identifier name.
         * @type {number}
         */
N_EVAL:1,/**
         * Identifies a source element that must be excluded from the process
         * unless its whole scope is examined.
         * @type {number}
         */
N_EXCLUDABLE:2,/**
         * Identifies source elements not posing any problems.
         * @type {number}
         */
N_OTHER:3},/**
       * The list of literals (other than the String ones) whose primitive
       * values can be consolidated.
       * @const
       * @type {!Array.<string>}
       */
c=["null",// The null literal.
"false",// The Boolean literal {@code false}.
"true"];/**
    * Consolidates all worthwhile primitive values in a syntactic code unit.
    * @param {!TSyntacticCodeUnit} oSyntacticCodeUnit An array-like object
    *     representing the branch of the abstract syntax tree representing the
    *     syntactic code unit along with its scope.
    * @see TPrimitiveValue#nSaving
    */
return function e(l){var/**
          * An array-like object representing source elements that constitute a
          * syntactic code unit.
          * @type {!TSyntacticCodeUnit}
          */
f,/**
          * A record consisting of data about the source element that is
          * currently being examined.
          * @type {!TSourceElementsData}
          */
p,/**
          * The scope of the syntactic code unit.
          * @type {!TScope}
          */
d,/**
          * An instance of an object that allows the traversal of an <abbr
          * title="abstract syntax tree">AST</abbr>.
          * @type {!TWalker}
          */
h,/**
          * The index (in the source text order) of the source element that is
          * currently being considered.
          * @type {number}
          */
g,/**
          * The index (in the source text order) of the source element that is
          * the last element of the range of source elements that is currently
          * being considered.
          * @type {(undefined|number)}
          */
m,/**
          * Indicates whether the syntactic code unit represents global code.
          * @type {boolean}
          */
v="toplevel"===l[0],/**
          * Indicates whether the whole scope is being examined.
          * @type {boolean}
          */
y=!v,/**
          * An object encompassing collections of functions used during the
          * traversal of an <abbr title="abstract syntax tree">AST</abbr>.
          * @namespace
          * @type {!Object.<string, !Object.<string, function(...[*])>>}
          */
b={/**
            * A collection of functions used during the surveyance of source
            * elements.
            * @namespace
            * @type {!Object.<string, function(...[*])>}
            */
oSurveySourceElement:{/**#nocode+*/
// JsDoc Toolkit 2.4.0 hides some of the keys.
/**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name. Adds the identifier of the function and its formal
              * parameters to the list of identifier names found.
              * @param {string} sIdentifier The identifier of the function.
              * @param {!Array.<string>} aFormalParameterList Formal parameters.
              * @param {!TSyntacticCodeUnit} oFunctionBody Function code.
              */
defun:function(e,n,t){E(),A(e),n.forEach(A)},/**
              * Increments the count of the number of occurrences of the String
              * value that is equivalent to the sequence of terminal symbols
              * that constitute the encountered identifier name.
              * @param {!TSyntacticCodeUnit} oExpression The nonterminal
              *     MemberExpression.
              * @param {string} sIdentifierName The identifier name used as the
              *     property accessor.
              * @return {!Array} The encountered branch of an <abbr title=
              *     "abstract syntax tree">AST</abbr> with its nonterminal
              *     MemberExpression traversed.
              */
dot:function(e,n){return F(a.N_IDENTIFIER_NAMES,u.S_STRING+n),["dot",h.walk(e),n]},/**
              * Adds the optional identifier of the function and its formal
              * parameters to the list of identifier names found.
              * @param {?string} sIdentifier The optional identifier of the
              *     function.
              * @param {!Array.<string>} aFormalParameterList Formal parameters.
              * @param {!TSyntacticCodeUnit} oFunctionBody Function code.
              */
function:function(e,n,t){"string"==typeof e&&A(e),n.forEach(A)},/**
              * Either increments the count of the number of occurrences of the
              * encountered null or Boolean value or classifies a source element
              * as containing the {@code eval} identifier name.
              * @param {string} sIdentifier The identifier encountered.
              */
name:function(e){-1!==c.indexOf(e)?F(a.N_NULL_AND_BOOLEAN_LITERALS,u.S_SYMBOLIC+e):("eval"===e&&(p.nCategory=s.N_EVAL),A(e))},/**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name.
              * @param {TSyntacticCodeUnit} oExpression The expression whose
              *     value is to be returned.
              */
return:function(e){E()},/**
              * Increments the count of the number of occurrences of the
              * encountered String value.
              * @param {string} sStringValue The String value of the string
              *     literal encountered.
              */
string:function(e){e.length>0&&F(a.N_STRING_LITERALS,u.S_STRING+e)},/**
              * Adds the identifier reserved for an exception to the list of
              * identifier names found.
              * @param {!TSyntacticCodeUnit} oTry A block of code in which an
              *     exception can occur.
              * @param {Array} aCatch The identifier reserved for an exception
              *     and a block of code to handle the exception.
              * @param {TSyntacticCodeUnit} oFinally An optional block of code
              *     to be evaluated regardless of whether an exception occurs.
              */
try:function(e,n,t){Array.isArray(n)&&A(n[0])},/**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name. Adds the identifier of each declared variable to the list
              * of identifier names found.
              * @param {!Array.<!Array>} aVariableDeclarationList Variable
              *     declarations.
              */
var:function(e){E(),e.forEach(C)},/**
              * Classifies a source element as containing the {@code with}
              * statement.
              * @param {!TSyntacticCodeUnit} oExpression An expression whose
              *     value is to be converted to a value of type Object and
              *     become the binding object of a new object environment
              *     record of a new lexical environment in which the statement
              *     is to be executed.
              * @param {!TSyntacticCodeUnit} oStatement The statement to be
              *     executed in the augmented lexical environment.
              * @return {!Array} An empty array to stop the traversal.
              */
with:function(e,n){return p.nCategory=s.N_WITH,[]}},/**
            * A collection of functions used while looking for nested functions.
            * @namespace
            * @type {!Object.<string, function(...[*])>}
            */
oExamineFunctions:{/**#nocode+*/
// JsDoc Toolkit 2.4.0 hides some of the keys.
/**
              * Orders an examination of a nested function declaration.
              * @this {!TSyntacticCodeUnit} An array-like object representing
              *     the branch of an <abbr title="abstract syntax tree"
              *     >AST</abbr> representing the syntactic code unit along with
              *     its scope.
              * @return {!Array} An empty array to stop the traversal.
              */
defun:function(){return e(this),[]},/**
              * Orders an examination of a nested function expression.
              * @this {!TSyntacticCodeUnit} An array-like object representing
              *     the branch of an <abbr title="abstract syntax tree"
              *     >AST</abbr> representing the syntactic code unit along with
              *     its scope.
              * @return {!Array} An empty array to stop the traversal.
              */
function:function(){return e(this),[]}}},/**
          * Records containing data about source elements.
          * @type {Array.<TSourceElementsData>}
          */
x=[],/**
          * The index (in the source text order) of the source element
          * immediately following a <a href="http://es5.github.com/#x14.1"
          * >Directive Prologue</a>.
          * @type {number}
          */
_=0,/**
          * Initiates the traversal of a source element.
          * @param {!TWalker} oWalker An instance of an object that allows the
          *     traversal of an abstract syntax tree.
          * @param {!TSyntacticCodeUnit} oSourceElement A source element from
          *     which the traversal should commence.
          * @return {function(): !TSyntacticCodeUnit} A function that is able to
          *     initiate the traversal from a given source element.
          */
w=function(e,n){return function(){return e.walk(n)}},/**
          * Classifies the source element as excludable if it does not
          * contain a {@code with} statement or the {@code eval} identifier
          * name.
          */
E=function(){p.nCategory===s.N_OTHER&&(p.nCategory=s.N_EXCLUDABLE)},/**
          * Adds an identifier to the list of identifier names found.
          * @param {string} sIdentifier The identifier to be added.
          */
A=function(e){-1===p.aIdentifiers.indexOf(e)&&p.aIdentifiers.push(e)},/**
          * Adds the identifier of a variable to the list of identifier names
          * found.
          * @param {!Array} aVariableDeclaration A variable declaration.
          */
C=function(e){A(/** @type {string} */e[0])},/**
          * Increments the count of the number of occurrences of the prefixed
          * String representation attributed to the primary expression.
          * @param {number} nCategory The category of the primary expression.
          * @param {string} sName The prefixed String representation attributed
          *     to the primary expression.
          */
F=function(e,n){p.aCount[e].hasOwnProperty(n)||(p.aCount[e][n]=0,-1===p.aPrimitiveValues.indexOf(n)&&p.aPrimitiveValues.push(n)),p.aCount[e][n]+=1},/**
          * Consolidates all worthwhile primitive values in a range of source
          *     elements.
          * @param {number} nFrom The index (in the source text order) of the
          *     source element that is the first element of the range.
          * @param {number} nTo The index (in the source text order) of the
          *     source element that is the last element of the range.
          * @param {boolean} bEnclose Indicates whether the range should be
          *     enclosed within a function call with no argument values to a
          *     function with an empty parameter list if any primitive values
          *     are consolidated.
          * @see TPrimitiveValue#nSaving
          */
S=function(s,c,l){var/**
                * The index of the source element that is currently being
                * considered.
                * @type {number}
                */
p,/**
                * The index of the last mangled name.
                * @type {number}
                */
g=d.cname,/**
                * A collection of functions used during the consolidation of
                * primitive values and identifier names used as property
                * accessors.
                * @namespace
                * @type {!Object.<string, function(...[*])>}
                */
m={/**
                  * If the String value that is equivalent to the sequence of
                  * terminal symbols that constitute the encountered identifier
                  * name is worthwhile, a syntactic conversion from the dot
                  * notation to the bracket notation ensues with that sequence
                  * being substituted by an identifier name to which the value
                  * is assigned.
                  * Applies to property accessors that use the dot notation.
                  * @param {!TSyntacticCodeUnit} oExpression The nonterminal
                  *     MemberExpression.
                  * @param {string} sIdentifierName The identifier name used as
                  *     the property accessor.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
dot:function(e,n){/**
                    * The prefixed String value that is equivalent to the
                    * sequence of terminal symbols that constitute the
                    * encountered identifier name.
                    * @type {string}
                    */
var t=u.S_STRING+n;return v.oPrimitiveValues.hasOwnProperty(t)&&v.oPrimitiveValues[t].nSaving>0?["sub",h.walk(e),["name",v.oPrimitiveValues[t].sName]]:["dot",h.walk(e),n]},/**
                  * If the encountered identifier is a null or Boolean literal
                  * and its value is worthwhile, the identifier is substituted
                  * by an identifier name to which that value is assigned.
                  * Applies to identifier names.
                  * @param {string} sIdentifier The identifier encountered.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
name:function(e){/**
                    * The prefixed representation String of the identifier.
                    * @type {string}
                    */
var n=u.S_SYMBOLIC+e;return["name",v.oPrimitiveValues.hasOwnProperty(n)&&v.oPrimitiveValues[n].nSaving>0?v.oPrimitiveValues[n].sName:e]},/**
                  * If the encountered String value is worthwhile, it is
                  * substituted by an identifier name to which that value is
                  * assigned.
                  * Applies to String values.
                  * @param {string} sStringValue The String value of the string
                  *     literal encountered.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
string:function(e){/**
                    * The prefixed representation String of the primitive value
                    * of the literal.
                    * @type {string}
                    */
var n=u.S_STRING+e;return v.oPrimitiveValues.hasOwnProperty(n)&&v.oPrimitiveValues[n].nSaving>0?["name",v.oPrimitiveValues[n].sName]:["string",e]}},/**
                * Such data on what to consolidate within the range of source
                * elements that is currently being considered that lead to the
                * greatest known reduction of the number of the terminal symbols
                * in comparison to the original source text.
                * @type {!TSolution}
                */
v=new r,/**
                * Data representing an ongoing attempt to find a better
                * reduction of the number of the terminal symbols in comparison
                * to the original source text than the best one that is
                * currently known.
                * @type {!TSolution}
                * @see oSolutionBest
                */
y=new r,/**
                * A record consisting of data about the range of source elements
                * that is currently being examined.
                * @type {!TSourceElementsData}
                */
b=new n,/**
                * Variable declarations for each primitive value that is to be
                * consolidated within the elements.
                * @type {!Array.<!Array>}
                */
_=[],/**
                * Augments a list with a prefixed representation String.
                * @param {!Array.<string>} aList A list that is to be augmented.
                * @return {function(string)} A function that augments a list
                *     with a prefixed representation String.
                */
E=function(e){return function(n){-1===e.indexOf(n)&&e.push(n)}},/**
                * Adds the number of occurrences of a primitive value of a given
                * category that could be consolidated in the source element with
                * a given index to the count of occurrences of that primitive
                * value within the range of source elements that is currently
                * being considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                * @param {number} nCategory The category of the primary
                *     expression from which the primitive value is derived.
                * @return {function(string)} A function that performs the
                *     addition.
                * @see cAddOccurrencesInCategory
                */
A=function(e,n){return function(t){b.aCount[n].hasOwnProperty(t)||(b.aCount[n][t]=0),b.aCount[n][t]+=x[e].aCount[n][t]}},/**
                * Adds the number of occurrences of each primitive value of a
                * given category that could be consolidated in the source
                * element with a given index to the count of occurrences of that
                * primitive values within the range of source elements that is
                * currently being considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                * @return {function(number)} A function that performs the
                *     addition.
                * @see fAddOccurrences
                */
C=function(e){return function(n){Object.keys(x[e].aCount[n]).forEach(A(e,n))}},/**
                * Creates a variable declaration for a primitive value if that
                * primitive value is to be consolidated within the elements.
                * @param {string} sPrefixed Prefixed representation String of a
                *     primitive value that could be consolidated within the
                *     elements.
                * @see aVariableDeclarations
                */
F=function(e){v.oPrimitiveValues[e].nSaving>0&&_.push([v.oPrimitiveValues[e].sName,[0===e.indexOf(u.S_SYMBOLIC)?"name":"string",e.substring(u.S_SYMBOLIC.length)]])},/**
                * Sorts primitive values with regard to the difference in the
                * number of terminal symbols between the original source text
                * and the one with those primitive values consolidated.
                * @param {string} sPrefixed0 The prefixed representation String
                *     of the first of the two primitive values that are being
                *     compared.
                * @param {string} sPrefixed1 The prefixed representation String
                *     of the second of the two primitive values that are being
                *     compared.
                * @return {number}
                *     <dl>
                *         <dt>-1</dt>
                *         <dd>if the first primitive value must be placed before
                *              the other one,</dd>
                *         <dt>0</dt>
                *         <dd>if the first primitive value may be placed before
                *              the other one,</dd>
                *         <dt>1</dt>
                *         <dd>if the first primitive value must not be placed
                *              before the other one.</dd>
                *     </dl>
                * @see TSolution.oPrimitiveValues
                */
S=function(e,n){/**
                  * The difference between:
                  * <ol>
                  * <li>the difference in the number of terminal symbols
                  *     between the original source text and the one with the
                  *     first primitive value consolidated, and</li>
                  * <li>the difference in the number of terminal symbols
                  *     between the original source text and the one with the
                  *     second primitive value consolidated.</li>
                  * </ol>
                  * @type {number}
                  */
var t=y.oPrimitiveValues[e].nSaving-y.oPrimitiveValues[n].nSaving;return t>0?-1:t<0?1:0},/**
                * Assigns an identifier name to a primitive value and calculates
                * whether instances of that primitive value are worth
                * consolidating.
                * @param {string} sPrefixed The prefixed representation String
                *     of a primitive value that is being evaluated.
                */
k=function(e){var/**
                      * The index of the last mangled name.
                      * @type {number}
                      */
n,/**
                      * The number of source characters taken up by the
                      * identifier name that could substitute the primitive
                      * value that is being evaluated.
                      * substituted.
                      * @type {number}
                      */
r,/**
                      * The representation String of the primitive value that is
                      * being evaluated.
                      * @type {string}
                      */
s=e.substring(u.S_SYMBOLIC.length),/**
                      * The number of source characters taken up by the
                      * representation String of the primitive value that is
                      * being evaluated.
                      * @type {number}
                      */
c=s.length,/**
                      * The number of source characters taken up by by the
                      * representation String of the primitive value that is
                      * being evaluated when it is represented by a string
                      * literal.
                      * @type {number}
                      */
l=i.make_string(s).length;y.oPrimitiveValues[e]=new t;do{// Find an identifier unused in this or any nested scope.
n=d.cname,y.oPrimitiveValues[e].sName=d.next_mangled()}while(-1!==b.aIdentifiers.indexOf(y.oPrimitiveValues[e].sName));r=y.oPrimitiveValues[e].sName.length,0===e.indexOf(u.S_SYMBOLIC)?(
// foo:null, or foo:null;
y.oPrimitiveValues[e].nSaving-=r+c+o.N_VARIABLE_DECLARATION,
// null vs foo
y.oPrimitiveValues[e].nSaving+=b.aCount[a.N_NULL_AND_BOOLEAN_LITERALS][e]*(c-r)):(
// foo:'fromCharCode';
y.oPrimitiveValues[e].nSaving-=r+l+o.N_VARIABLE_DECLARATION,
// .fromCharCode vs [foo]
b.aCount[a.N_IDENTIFIER_NAMES].hasOwnProperty(e)&&(y.oPrimitiveValues[e].nSaving+=b.aCount[a.N_IDENTIFIER_NAMES][e]*(c-r-o.N_PROPERTY_ACCESSOR)),
// 'fromCharCode' vs foo
b.aCount[a.N_STRING_LITERALS].hasOwnProperty(e)&&(y.oPrimitiveValues[e].nSaving+=b.aCount[a.N_STRING_LITERALS][e]*(l-r))),y.oPrimitiveValues[e].nSaving>0?y.nSavings+=y.oPrimitiveValues[e].nSaving:d.cname=n},/**
                * Adds a variable declaration to an existing variable statement.
                * @param {!Array} aVariableDeclaration A variable declaration
                *     with an initialiser.
                */
D=function(e){/** @type {!Array} */f[s][1].unshift(e)};if(!(s>c)){
// If the range is a closure, reuse the closure.
if(s===c&&"stat"===f[s][0]&&"call"===f[s][1][0]&&"function"===f[s][1][1][0])return void e(f[s][1][1]);
// Create a list of all derived primitive values within the range.
for(p=s;p<=c;p+=1)x[p].aPrimitiveValues.forEach(E(b.aPrimitiveValues));if(0!==b.aPrimitiveValues.length){for(p=s;p<=c;p+=1)
// Add the number of occurrences to the total count.
!function(e){Object.keys(x[e].aCount).forEach(C(e))}(p),
// Add identifiers of this or any nested scope to the list.
x[p].aIdentifiers.forEach(E(b.aIdentifiers));
// Distribute identifier names among derived primitive values.
do{// If there was any progress, find a better distribution.
v=y,Object.keys(y.oPrimitiveValues).length>0&&
// Sort primitive values descending by their worthwhileness.
b.aPrimitiveValues.sort(S),y=new r,b.aPrimitiveValues.forEach(k),d.cname=g}while(y.nSavings>v.nSavings);if(
// Take the necessity of adding a variable statement into account.
"var"!==f[s][0]&&(v.nSavings-=o.N_VARIABLE_STATEMENT_AFFIXATION),l&&(
// Take the necessity of forming a closure into account.
v.nSavings-=o.N_CLOSURE),v.nSavings>0){
// Rewrite expressions that contain worthwhile primitive values.
for(
// Create variable declarations suitable for UglifyJS.
Object.keys(v.oPrimitiveValues).forEach(F),p=s;p<=c;p+=1)h=i.ast_walker(),f[p]=h.with_walkers(m,w(h,f[p]));if("var"===f[s][0]?// Reuse the statement.
/** @type {!Array.<!Array>} */_.reverse().forEach(D):(// Add a variable statement.
Array.prototype.splice.call(f,s,0,["var",_]),c+=1),l){
// Copy source elements into the closure.
for(
// Add a closure.
Array.prototype.splice.call(f,s,0,["stat",["call",["function",null,[],[]],[]]]),p=c+1;p>s;p-=1)Array.prototype.unshift.call(f[s][1][1][3],f[p]);
// Remove source elements outside the closure.
Array.prototype.splice.call(f,s+1,c-s+1)}}l&&(
// Restore the availability of identifier names.
d.cname=g)}}};if(f=/** @type {!TSyntacticCodeUnit} */
l[v?1:3],0!==f.length){
// Skip a Directive Prologue.
for(d=v?l.scope:f.scope;_<f.length&&"directive"===f[_][0];)_+=1,x.push(null);if(f.length!==_){for(g=_;g<f.length;g+=1)p=new n,h=i.ast_walker(),
// Classify a source element.
// Find its derived primitive values and count their occurrences.
// Find all identifiers used (including nested scopes).
h.with_walkers(b.oSurveySourceElement,w(h,f[g])),
// Establish whether the scope is still wholly examinable.
y=y&&s.N_WITH!==p.nCategory&&s.N_EVAL!==p.nCategory,x.push(p);if(y)// Examine the whole scope.
S(_,f.length-1,!1);else// Examine unexcluded ranges of source elements.
for(g=f.length-1;g>=_;g-=1)p=/** @type {!TSourceElementsData} */
x[g],s.N_OTHER===p.nCategory?(void 0===m&&(m=g),
// Examine the range if it immediately follows a Directive Prologue.
g===_&&S(g,m,!0)):(void 0!==m&&(
// Examine the range that immediately follows this source element.
S(g+1,m,!0),m=void 0),
// Examine nested functions.
h=i.ast_walker(),h.with_walkers(b.oExamineFunctions,w(h,f[g])))}}}(e=i.ast_add_scope(e)),e}}),define("uglifyjs/parse-js",["exports"],function(exports){function e(e){return P.letter.test(e)}function n(e){return(e=e.charCodeAt(0))>=48&&e<=57}function t(e){return P.digit.test(e)}function r(t){return n(t)||e(t)}function i(e){return P.combining_mark.test(e)}function o(e){return P.connector_punctuation.test(e)}function a(n){return"$"==n||"_"==n||e(n)}function u(e){return a(e)||i(e)||t(e)||o(e)||"‌"==e||"‍"==e}function s(e){return S.test(e)?parseInt(e.substr(2),16):k.test(e)?parseInt(e.substr(1),8):D.test(e)?parseFloat(e):void 0}function c(e,n,t,r){this.message=e,this.line=n+1,this.col=t+1,this.pos=r+1,this.stack=(new Error).stack}function l(e,n,t,r){throw new c(e,n,t,r)}function f(e,n,t){return e.type==n&&(null==t||e.value==t)}function p(e){function t(){return I.text.charAt(I.pos)}function i(e,n){var t=I.text.charAt(I.pos++);if(e&&!t)throw j;return"\n"==t?(I.newline_before=I.newline_before||!n,++I.line,I.col=0):++I.col,t}function o(e,n){var t=I.text.indexOf(e,I.pos);if(n&&t==-1)throw j;return t}function c(){I.tokline=I.line,I.tokcol=I.col,I.tokpos=I.pos}function f(e,n,t){I.regex_allowed="operator"==e&&!_(N,n)||"keyword"==e&&_(A,n)||"punc"==e&&_(q,n);var r={type:e,value:n,line:I.tokline,col:I.tokcol,pos:I.tokpos,endpos:I.pos,nlb:I.newline_before};if(!t){r.comments_before=I.comments_before,I.comments_before=[];
// make note of any newlines in the comments that came before
for(var i=0,o=r.comments_before.length;i<o;i++)r.nlb=r.nlb||r.comments_before[i].nlb}return I.newline_before=!1,r}function p(){for(;_(O,t());)i()}function d(e){for(var n="",r=t(),o=0;r&&e(r,o++);)n+=i(),r=t();return n}function h(e){l(e,I.tokline,I.tokcol,I.tokpos)}function g(e){var n=!1,t=!1,i=!1,o="."==e,a=d(function(a,u){return"x"==a||"X"==a?!i&&(i=!0):i||"E"!=a&&"e"!=a?"-"==a?!(!t&&(0!=u||e)):"+"==a?t:(t=!1,"."==a?!(o||i||n)&&(o=!0):r(a)):!n&&(n=t=!0)});e&&(a=e+a);var u=s(a);if(!isNaN(u))return f("num",u);h("Invalid syntax: "+a)}function m(e){var n=i(!0,e);switch(n){case"n":return"\n";case"r":return"\r";case"t":return"\t";case"b":return"\b";case"v":return"\v";case"f":return"\f";case"0":return"\0";case"x":return String.fromCharCode(v(2));case"u":return String.fromCharCode(v(4));case"\n":return"";default:return n}}function v(e){for(var n=0;e>0;--e){var t=parseInt(i(!0),16);isNaN(t)&&h("Invalid hex-character pattern in string"),n=n<<4|t}return n}function y(){return T("Unterminated string constant",function(){for(var e=i(),n="";;){var t=i(!0);if("\\"==t){
// read OctalEscapeSequence (XXX: deprecated if "strict mode")
// https://github.com/mishoo/UglifyJS/issues/178
var r=0,o=null;t=d(function(e){if(e>="0"&&e<="7"){if(!o)return o=e,++r;if(o<="3"&&r<=2)return++r;if(o>="4"&&r<=1)return++r}return!1}),t=r>0?String.fromCharCode(parseInt(t,8)):m(!0)}else{if(t==e)break;if("\n"==t)throw j}n+=t}return f("string",n)})}function b(){i();var e,n=o("\n");return n==-1?(e=I.text.substr(I.pos),I.pos=I.text.length):(e=I.text.substring(I.pos,n),I.pos=n),f("comment1",e,!0)}function x(){return i(),T("Unterminated multiline comment",function(){var e=o("*/",!0),n=I.text.substring(I.pos,e);
// https://github.com/mishoo/UglifyJS/issues/#issue/100
return I.pos=e+2,I.line+=n.split("\n").length-1,I.newline_before=I.newline_before||n.indexOf("\n")>=0,/^@cc_on/i.test(n)&&(z("WARNING: at line "+I.line),z('*** Found "conditional comment": '+n),z("*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer.")),f("comment2",n,!0)})}function E(){for(var e,n,r=!1,o="",a=!1;null!=(e=t());)if(r)"u"!=e&&h("Expecting UnicodeEscapeSequence -- uXXXX"),e=m(),u(e)||h("Unicode char: "+e.charCodeAt(0)+" is not valid in identifier"),o+=e,r=!1;else if("\\"==e)a=r=!0,i();else{if(!u(e))break;o+=i()}return _(w,o)&&a&&(n=o.charCodeAt(0).toString(16).toUpperCase(),o="\\u"+"0000".substr(n.length)+n+o.slice(1)),o}function S(e){return T("Unterminated regular expression",function(){for(var n,t=!1,r=!1;n=i(!0);)if(t)e+="\\"+n,t=!1;else if("["==n)r=!0,e+=n;else if("]"==n&&r)r=!1,e+=n;else{if("/"==n&&!r)break;"\\"==n?t=!0:e+=n}return f("regexp",[e,E()])})}function k(e){function n(e){if(!t())return e;var r=e+t();return _(B,r)?(i(),n(r)):e}return f("operator",n(e||i()))}function D(){i();var e=I.regex_allowed;switch(t()){case"/":return I.comments_before.push(b()),I.regex_allowed=e,M();case"*":return I.comments_before.push(x()),I.regex_allowed=e,M()}return I.regex_allowed?S(""):k("/")}function P(){return i(),n(t())?g("."):f("punc",".")}function L(){var e=E();return _(w,e)?_(B,e)?f("operator",e):_(C,e)?f("atom",e):f("keyword",e):f("name",e)}function T(e,n){try{return n()}catch(n){if(n!==j)throw n;h(e)}}function M(e){if(null!=e)return S(e);p(),c();var r=t();return r?n(r)?g():'"'==r||"'"==r?y():_(R,r)?f("punc",i()):"."==r?P():"/"==r?D():_(F,r)?k():"\\"==r||a(r)?L():void h("Unexpected character '"+r+"'"):f("eof")}var I={text:e.replace(/\r\n?|[\n\u2028\u2029]/g,"\n").replace(/^\uFEFF/,""),pos:0,tokpos:0,line:0,tokline:0,col:0,tokcol:0,newline_before:!1,regex_allowed:!1,comments_before:[]};return M.context=function(e){return e&&(I=e),I},M}/* -----[ Parser ]----- */
function d(e,n,t){this.name=e,this.start=n,this.end=t}function h(e,n,t){function r(e,n){return f(ue.token,e,n)}function i(){return ue.peeked||(ue.peeked=ue.input())}function o(){return ue.prev=ue.token,ue.peeked?(ue.token=ue.peeked,ue.peeked=null):ue.token=ue.input(),ue.in_directives=ue.in_directives&&("string"==ue.token.type||r("punc",";")),ue.token}function a(){return ue.prev}function u(e,n,t,r){var i=ue.input.context();l(e,null!=n?n:i.tokline,null!=t?t:i.tokcol,null!=r?r:i.tokpos)}function s(e,n){u(n,e.line,e.col)}function c(e){null==e&&(e=ue.token),s(e,"Unexpected token: "+e.type+" ("+e.value+")")}function h(e,n){if(r(e,n))return o();s(ue.token,"Unexpected token "+ue.token.type+", expected "+e)}function v(e){return h("punc",e)}function b(){return!n&&(ue.token.nlb||r("eof")||r("punc","}"))}function w(){r("punc",";")?o():b()||c()}function E(){return y(arguments)}function A(){v("(");var e=pe();return v(")"),e}function C(e,n,t){return e instanceof d?e:new d(e,n,t)}function F(e){return t?function(){var n=ue.token,t=e.apply(this,arguments);return t[0]=C(t[0],n,a()),t}:e}function S(e){ue.labels.push(e);var t=ue.token,r=se();return n&&!_(I,r[0])&&c(t),ue.labels.pop(),E("label",e,r)}function k(){return E("stat",m(pe,w))}function D(e){var n;return b()||(n=r("name")?ue.token.value:null),null!=n?(o(),x(n,ue.labels)||u("Label "+n+" without matching loop or statement")):0==ue.in_loop&&u(e+" not inside a loop or switch"),w(),E(e,n)}function B(){v("(");var e=null;return!r("punc",";")&&(e=r("keyword","var")?(o(),V(!0)):pe(!0,!0),r("operator","in"))?("var"==e[0]&&e[1].length>1&&u("Only one variable declaration allowed in for..in loop"),q(e)):O(e)}function O(e){v(";");var n=r("punc",";")?null:pe();v(";");var t=r("punc",")")?null:pe();return v(")"),E("for",e,n,t,ae(se))}function q(e){var n="var"==e[0]?E("name",e[1][0]):e;o();var t=pe();return v(")"),E("for-in",e,n,t,ae(se))}function R(){var e,n=A(),t=se();return r("keyword","else")&&(o(),e=se()),E("if",n,t,e)}function P(){v("{");for(var e=[];!r("punc","}");)r("eof")&&c(),e.push(se());return o(),e}function j(){var e,n,t=P();if(r("keyword","catch")){o(),v("("),r("name")||u("Name expected");var i=ue.token.value;o(),v(")"),e=[i,P()]}return r("keyword","finally")&&(o(),n=P()),e||n||u("Missing catch/finally blocks"),E("try",t,e,n)}function z(e){for(var n=[];;){r("name")||c();var t=ue.token.value;if(o(),r("operator","=")?(o(),n.push([t,pe(!1,e)])):n.push([t]),!r("punc",","))break;o()}return n}function V(e){return E("var",z(e))}function W(){return E("const",z())}function H(){var e,n=fe(!1);return r("punc","(")?(o(),e=G(")")):e=[],Q(E("new",n,e),!0)}function G(e,n,t){for(var i=!0,a=[];!r("punc",e)&&(i?i=!1:v(","),!n||!r("punc",e));)r("punc",",")&&t?a.push(["atom","undefined"]):a.push(pe(!1));return o(),a}function J(){return E("array",G("]",!n,!0))}function Y(){for(var e=!0,t=[];!r("punc","}")&&(e?e=!1:v(","),n||!r("punc","}"));){var i=ue.token.type,a=X();"name"!=i||"get"!=a&&"set"!=a||r("punc",":")?(v(":"),t.push([a,pe(!1)])):t.push([K(),ce(!1),a])}return o(),E("object",t)}function X(){switch(ue.token.type){case"num":case"string":return m(ue.token.value,o)}return K()}function K(){switch(ue.token.type){case"name":case"operator":case"keyword":case"atom":return m(ue.token.value,o);default:c()}}function Q(e,n){return r("punc",".")?(o(),Q(E("dot",e,K()),n)):r("punc","[")?(o(),Q(E("sub",e,m(pe,g(v,"]"))),n)):n&&r("punc","(")?(o(),Q(E("call",e,G(")")),!0)):e}function Z(e){if(r("operator")&&_(L,ue.token.value))return ee("unary-prefix",m(ue.token.value,o),Z(e));for(var n=fe(e);r("operator")&&_(N,ue.token.value)&&!ue.token.nlb;)n=ee("unary-postfix",ue.token.value,n),o();return n}function ee(e,n,t){return"++"!=n&&"--"!=n||ie(t)||u("Invalid use of "+n+" operator"),E(e,n,t)}function ne(e,n,t){var i=r("operator")?ue.token.value:null;i&&"in"==i&&t&&(i=null);var a=null!=i?M[i]:null;if(null!=a&&a>n){o();return ne(E("binary",i,e,ne(Z(!0),a,t)),n,t)}return e}function te(e){return ne(Z(!0),0,e)}function re(e){var n=te(e);if(r("operator","?")){o();var t=pe(!1);return v(":"),E("conditional",n,t,pe(!1,e))}return n}function ie(e){if(!n)return!0;switch(e[0]+""){case"dot":case"sub":case"new":case"call":return!0;case"name":return"this"!=e[1]}}function oe(e){var n=re(e),t=ue.token.value;if(r("operator")&&_(T,t)){if(ie(n))return o(),E("assign",T[t],n,oe(e));u("Invalid assignment")}return n}function ae(e){try{return++ue.in_loop,e()}finally{--ue.in_loop}}var ue={input:"string"==typeof e?p(e,!0):e,token:null,prev:null,peeked:null,in_function:0,in_directives:!0,in_loop:0,labels:[]};ue.token=o();var se=F(function(){switch((r("operator","/")||r("operator","/="))&&(ue.peeked=null,ue.token=ue.input(ue.token.value.substr(1))),ue.token.type){case"string":var e=ue.in_directives,n=k();return e&&"string"==n[1][0]&&!r("punc",",")?E("directive",n[1][1]):n;case"num":case"regexp":case"operator":case"atom":return k();case"name":return f(i(),"punc",":")?S(m(ue.token.value,o,o)):k();case"punc":switch(ue.token.value){case"{":return E("block",P());case"[":case"(":return k();case";":return o(),E("block");default:c()}case"keyword":switch(m(ue.token.value,o)){case"break":return D("break");case"continue":return D("continue");case"debugger":return w(),E("debugger");case"do":return function(e){return h("keyword","while"),E("do",m(A,w),e)}(ae(se));case"for":return B();case"function":return ce(!0);case"if":return R();case"return":return 0==ue.in_function&&u("'return' outside of function"),E("return",r("punc",";")?(o(),null):b()?null:m(pe,w));case"switch":return E("switch",A(),le());case"throw":return ue.token.nlb&&u("Illegal newline after 'throw'"),E("throw",m(pe,w));case"try":return j();case"var":return m(V,w);case"const":return m(W,w);case"while":return E("while",A(),ae(se));case"with":return E("with",A(),se());default:c()}}}),ce=function(e){var n=r("name")?m(ue.token.value,o):null;
// arguments
// body
return e&&!n&&c(),v("("),E(e?"defun":"function",n,function(e,n){for(;!r("punc",")");)e?e=!1:v(","),r("name")||c(),n.push(ue.token.value),o();return o(),n}(!0,[]),function(){++ue.in_function;var e=ue.in_loop;ue.in_directives=!0,ue.in_loop=0;var n=P();return--ue.in_function,ue.in_loop=e,n}())},le=g(ae,function(){v("{");for(var e=[],n=null;!r("punc","}");)r("eof")&&c(),r("keyword","case")?(o(),n=[],e.push([pe(),n]),v(":")):r("keyword","default")?(o(),v(":"),n=[],e.push([null,n])):(n||c(),n.push(se()));return o(),e}),fe=F(function(e){if(r("operator","new"))return o(),H();if(r("punc")){switch(ue.token.value){case"(":return o(),Q(m(pe,g(v,")")),e);case"[":return o(),Q(J(),e);case"{":return o(),Q(Y(),e)}c()}if(r("keyword","function"))return o(),Q(ce(!1),e);if(_(U,ue.token.type)){return Q(m("regexp"==ue.token.type?E("regexp",ue.token.value[0],ue.token.value[1]):E(ue.token.type,ue.token.value),o),e)}c()}),pe=F(function(e,n){0==arguments.length&&(e=!0);var t=oe(n);return e&&r("punc",",")?(o(),E("seq",t,pe(!0,n))):t});return E("toplevel",function(e){for(;!r("eof");)e.push(se());return e}([]))}/* -----[ Utilities ]----- */
function g(e){var n=y(arguments,1);return function(){return e.apply(this,n.concat(y(arguments)))}}function m(e){e instanceof Function&&(e=e());for(var n=1,t=arguments.length;--t>0;++n)arguments[n]();return e}function v(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=!0;return n}function y(e,n){return Array.prototype.slice.call(e,n||0)}function b(e){return e.split("")}function x(e,n){for(var t=n.length;--t>=0;)if(n[t]==e)return!0;return!1}function _(e,n){return Object.prototype.hasOwnProperty.call(e,n)}/***********************************************************************

  A JavaScript tokenizer / parser / beautifier / compressor.

  This version is suitable for Node.js.  With minimal changes (the
  exports stuff) it should work on any JS platform.

  This file contains the tokenizer/parser.  It is a port to JavaScript
  of parse-js [1], a JavaScript parser library written in Common Lisp
  by Marijn Haverbeke.  Thank you Marijn!

  [1] http://marijn.haverbeke.nl/parse-js/

  Exported functions:

    - tokenizer(code) -- returns a function.  Call the returned
      function to fetch the next token.

    - parse(code) -- returns an AST of the given JavaScript code.

  -------------------------------- (C) ---------------------------------

                           Author: Mihai Bazon
                         <mihai.bazon@gmail.com>
                       http://mihai.bazon.net/blog

  Distributed under the BSD license:

    Copyright 2010 (c) Mihai Bazon <mihai.bazon@gmail.com>
    Based on parse-js (http://marijn.haverbeke.nl/parse-js/).

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/
/* -----[ Tokenizer (constants) ]----- */
var w=v(["break","case","catch","const","continue","debugger","default","delete","do","else","finally","for","function","if","in","instanceof","new","return","switch","throw","try","typeof","var","void","while","with"]),E=v(["abstract","boolean","byte","char","class","double","enum","export","extends","final","float","goto","implements","import","int","interface","long","native","package","private","protected","public","short","static","super","synchronized","throws","transient","volatile"]),A=v(["return","new","delete","throw","else","case"]),C=v(["false","null","true","undefined"]),F=v(b("+-*&%=<>!?|~^")),S=/^0x[0-9a-f]+$/i,k=/^0[0-7]+$/,D=/^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,B=v(["in","instanceof","typeof","new","void","delete","++","--","+","-","!","~","&","|","^","*","/","%",">>","<<",">>>","<",">","<=",">=","==","===","!=","!==","?","=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&=","&&","||"]),O=v(b("  \n\r\t\f\v​᠎             　\ufeff")),q=v(b("[{(,.;:")),R=v(b("[]{}(),;:")),P=(v(b("gmsiy")),{// Unicode 6.1
letter:new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F0\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),combining_mark:new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08E4-\\u08FE\\u0900-\\u0903\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962\\u0963\\u0981-\\u0983\\u09BC\\u09BE-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CD\\u09D7\\u09E2\\u09E3\\u0A01-\\u0A03\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81-\\u0A83\\u0ABC\\u0ABE-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AE2\\u0AE3\\u0B01-\\u0B03\\u0B3C\\u0B3E-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B62\\u0B63\\u0B82\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD7\\u0C01-\\u0C03\\u0C3E-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0C82\\u0C83\\u0CBC\\u0CBE-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CE2\\u0CE3\\u0D02\\u0D03\\u0D3E-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4D\\u0D57\\u0D62\\u0D63\\u0D82\\u0D83\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F3E\\u0F3F\\u0F71-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102B-\\u103E\\u1056-\\u1059\\u105E-\\u1060\\u1062-\\u1064\\u1067-\\u106D\\u1071-\\u1074\\u1082-\\u108D\\u108F\\u109A-\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B4-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u192B\\u1930-\\u193B\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A17-\\u1A1B\\u1A55-\\u1A5E\\u1A60-\\u1A7C\\u1A7F\\u1B00-\\u1B04\\u1B34-\\u1B44\\u1B6B-\\u1B73\\u1B80-\\u1B82\\u1BA1-\\u1BAD\\u1BE6-\\u1BF3\\u1C24-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE8\\u1CED\\u1CF2-\\u1CF4\\u1DC0-\\u1DE6\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA674-\\uA67D\\uA69F\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA823-\\uA827\\uA880\\uA881\\uA8B4-\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA953\\uA980-\\uA983\\uA9B3-\\uA9C0\\uAA29-\\uAA36\\uAA43\\uAA4C\\uAA4D\\uAA7B\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAEB-\\uAAEF\\uAAF5\\uAAF6\\uABE3-\\uABEA\\uABEC\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),connector_punctuation:new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]"),digit:new RegExp("[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]")});c.prototype.toString=function(){return this.message+" (line: "+this.line+", col: "+this.col+", pos: "+this.pos+")\n\n"+this.stack};var j={},L=v(["typeof","void","delete","--","++","!","~","-","+"]),N=v(["--","++"]),T=function(e,n,t){for(;t<e.length;)n[e[t]]=e[t].substr(0,e[t].length-1),t++;return n}(["+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&="],{"=":!0},0),M=function(e,n){for(var t=0,r=1;t<e.length;++t,++r)for(var i=e[t],o=0;o<i.length;++o)n[i[o]]=r;return n}([["||"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in","instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"]],{}),I=v(["for","do","while","switch"]),U=v(["atom","num","string","regexp","name"]);d.prototype.toString=function(){return this.name};var z=function(){};/* -----[ Exports ]----- */
exports.tokenizer=p,exports.parse=h,exports.slice=y,exports.curry=g,exports.member=x,exports.array_to_hash=v,exports.PRECEDENCE=M,exports.KEYWORDS_ATOM=C,exports.RESERVED_WORDS=E,exports.KEYWORDS=w,exports.ATOMIC_START_TOKEN=U,exports.OPERATORS=B,exports.is_alphanumeric_char=r,exports.is_identifier_start=a,exports.is_identifier_char=u,exports.set_logger=function(e){z=e}}),define("uglifyjs/squeeze-more",["require","exports","module","./parse-js","./squeeze-more"],function(require,exports,module){function e(e){function n(e,n){var t,r=a;return a=e,t=n(),a=r,t}function o(e,t,o){return[this[0],e,t,n(o.scope,r(i,o,s))]}var a,u=t.ast_walker(),s=u.walk;return u.with_walkers({toplevel:function(e){return[this[0],n(this.scope,r(i,e,s))]},function:o,defun:o,new:function(e,n){if("name"==e[0]){if("Array"==e[1]&&!a.has("Array"))return 1!=n.length?["array",n]:s(["call",["name","Array"],n]);if("Object"==e[1]&&!a.has("Object"))return n.length?s(["call",["name","Object"],n]):["object",[]];if(("RegExp"==e[1]||"Function"==e[1]||"Error"==e[1])&&!a.has(e[1]))return s(["call",["name",e[1]],n])}},call:function(e,n){if("dot"==e[0]&&"string"==e[1][0]&&1==n.length&&(n[0][1]>0&&"substring"==e[2]||"substr"==e[2]))return["call",["dot",e[1],"slice"],n];if("dot"==e[0]&&"toString"==e[2]&&0==n.length)
// foo.toString()  ==>  foo+""
// foo.toString()  ==>  foo+""
return"string"==e[1][0]?e[1]:["binary","+",e[1],["string",""]];if("name"==e[0]){if("Array"==e[1]&&1!=n.length&&!a.has("Array"))return["array",n];if("Object"==e[1]&&!n.length&&!a.has("Object"))return["object",[]];if("String"==e[1]&&!a.has("String"))return["binary","+",n[0],["string",""]]}}},function(){return s(t.ast_add_scope(e))})}var n=require("./parse-js"),t=require("./process"),r=(n.slice,n.member,n.curry),i=t.MAP;n.PRECEDENCE,n.OPERATORS;exports.ast_squeeze_more=e}),define("uglifyjs/process",["require","exports","module","./parse-js","./squeeze-more"],function(require,exports,module){/* -----[ helper for AST traversal ]----- */
function e(){function e(e){return[this[0],P(e,function(e){var n=[e[0]];return e.length>1&&(n[1]=t(e[1])),n})]}function n(e){var n=[this[0]];return null!=e&&n.push(P(e,t)),n}function t(e){if(null==e)return null;try{u.push(e);var n=e[0],t=a[n];if(t){var r=t.apply(e,e.slice(1));if(null!=r)return r}return t=o[n],t.apply(e,e.slice(1))}finally{u.pop()}}function r(e){if(null==e)return null;try{return u.push(e),o[e[0]].apply(e,e.slice(1))}finally{u.pop()}}function i(e,n){var t,r={};for(t in e)C(e,t)&&(r[t]=a[t],a[t]=e[t]);var i=n();for(t in r)C(r,t)&&(r[t]?a[t]=r[t]:delete a[t]);return i}var o={string:function(e){return[this[0],e]},num:function(e){return[this[0],e]},name:function(e){return[this[0],e]},toplevel:function(e){return[this[0],P(e,t)]},block:n,splice:n,var:e,const:e,try:function(e,n,r){return[this[0],P(e,t),null!=n?[n[0],P(n[1],t)]:null,null!=r?P(r,t):null]},throw:function(e){return[this[0],t(e)]},new:function(e,n){return[this[0],t(e),P(n,t)]},switch:function(e,n){return[this[0],t(e),P(n,function(e){return[e[0]?t(e[0]):null,P(e[1],t)]})]},break:function(e){return[this[0],e]},continue:function(e){return[this[0],e]},conditional:function(e,n,r){return[this[0],t(e),t(n),t(r)]},assign:function(e,n,r){return[this[0],e,t(n),t(r)]},dot:function(e){return[this[0],t(e)].concat(k(arguments,1))},call:function(e,n){return[this[0],t(e),P(n,t)]},function:function(e,n,r){return[this[0],e,n.slice(),P(r,t)]},debugger:function(){return[this[0]]},defun:function(e,n,r){return[this[0],e,n.slice(),P(r,t)]},if:function(e,n,r){return[this[0],t(e),t(n),t(r)]},for:function(e,n,r,i){return[this[0],t(e),t(n),t(r),t(i)]},"for-in":function(e,n,r,i){return[this[0],t(e),t(n),t(r),t(i)]},while:function(e,n){return[this[0],t(e),t(n)]},do:function(e,n){return[this[0],t(e),t(n)]},return:function(e){return[this[0],t(e)]},binary:function(e,n,r){return[this[0],e,t(n),t(r)]},"unary-prefix":function(e,n){return[this[0],e,t(n)]},"unary-postfix":function(e,n){return[this[0],e,t(n)]},sub:function(e,n){return[this[0],t(e),t(n)]},object:function(e){return[this[0],P(e,function(e){return 2==e.length?[e[0],t(e[1])]:[e[0],t(e[1]),e[2]]})]},regexp:function(e,n){return[this[0],e,n]},array:function(e){return[this[0],P(e,t)]},stat:function(e){return[this[0],t(e)]},seq:function(){return[this[0]].concat(P(k(arguments),t))},label:function(e,n){return[this[0],e,t(n)]},with:function(e,n){return[this[0],t(e),t(n)]},atom:function(e){return[this[0],e]},directive:function(e){return[this[0],e]}},a={},u=[];return{walk:t,dive:r,with_walkers:i,parent:function(){return u[u.length-2]},stack:function(){return u}}}/* -----[ Scope and mangling ]----- */
function n(e){this.names={},// names defined in this scope
this.mangled={},// mangled names (orig.name => mangled)
this.rev_mangled={},// reverse lookup (mangled => orig.name)
this.cname=-1,// current mangled name
this.refs={},// names referenced from this scope
this.uses_with=!1,// will become TRUE if with() is detected in this or any subscopes
this.uses_eval=!1,// will become TRUE if eval() is detected in this or any subscopes
this.directives=[],// directives activated from this scope
this.parent=e,// parent scope
this.children=[],// sub-scopes
e?(this.level=e.level+1,e.children.push(this)):this.level=0}function t(){return"undefined"!=typeof DIGITS_OVERRIDE_FOR_TESTING?DIGITS_OVERRIDE_FOR_TESTING:"etnrisouaflchpdvmgybwESxTNCkLAOM_DPHBjFIqRUzWXV$JKQGYZ0516372984"}function r(t){function r(e){c=new n(c),c.labels=new n;var t=c.body=e();return t.scope=c,c=c.parent,t}function i(e,n){return c.define(e,n)}function o(e){c.refs[e]=!0}function a(e,n,t){var o="defun"==this[0];return[this[0],o?i(e,"defun"):e,n,r(function(){return o||i(e,"lambda"),P(n,function(e){i(e,"arg")}),P(t,f)})]}function u(e){return function(n){P(n,function(n){i(n[0],e),n[1]&&o(n[0])})}}function s(e){e&&(c.labels.refs[e]=!0)}var c=null,l=e(),f=l.walk,p=[];return r(function(){
// for referenced names it might be useful to know
// their origin scope.  current_scope here is the
// toplevel one.
function e(n,t){
// do children first; order shouldn't matter
for(t=n.children.length;--t>=0;)e(n.children[t]);for(t in n.refs)if(C(n.refs,t))
// find origin scope and propagate the reference to origin
for(var r=n.has(t),i=n;i&&(i.refs[t]=r,i!==r);i=i.parent);}
// process AST
var n=l.with_walkers({function:a,defun:a,label:function(e,n){c.labels.define(e)},break:s,continue:s,with:function(e,n){for(var t=c;t;t=t.parent)t.uses_with=!0},var:u("var"),const:u("const"),try:function(e,n,t){if(null!=n)return[this[0],P(e,f),[i(n[0],"catch"),P(n[1],f)],null!=t?P(t,f):null]},name:function(e){"eval"==e&&p.push(c),o(e)}},function(){return f(t)});
// the reason why we need an additional pass here is
// that names can be used prior to their definition.
// scopes where eval was detected and their parents
// are marked with uses_eval, unless they define the
// "eval" name.
return P(p,function(e){if(!e.has("eval"))for(;e;)e.uses_eval=!0,e=e.parent}),e(c),n})}/* -----[ mangle names ]----- */
function i(n,t){function i(e,n){// don't mangle toplevel
return t.mangle&&(t.toplevel||l.parent)?t.except&&D(e,t.except)?e:t.no_functions&&C(l.names,e)&&("defun"==l.names[e]||"lambda"==l.names[e])?e:l.get_mangled(e,n):e}function o(e){if(t.defines)
// we always lookup a defined symbol for the current scope FIRST, so declared
// vars trump a DEFINE symbol, but if no such var is found, then match a DEFINE value
// we always lookup a defined symbol for the current scope FIRST, so declared
// vars trump a DEFINE symbol, but if no such var is found, then match a DEFINE value
return!l.has(e)&&C(t.defines,e)?t.defines[e]:null}function a(e,n,r){if(!t.no_functions&&t.mangle){var o,a="defun"==this[0];e&&(a?e=i(e):r.scope.references(e)?(o={},l.uses_eval||l.uses_with?o[e]=e:e=o[e]=l.next_mangled()):e=null)}return r=u(r.scope,function(){return n=P(n,function(e){return i(e)}),P(r,p)},o),[this[0],e,n,r]}function u(e,n,t){var r=l;if(l=e,t)for(var o in t)C(t,o)&&e.set_mangle(o,t[o]);for(var o in e.names)C(e.names,o)&&i(o,!0);var a=n();return a.scope=e,l=r,a}function s(e){return[this[0],P(e,function(e){return[i(e[0]),p(e[1])]})]}function c(e){if(e)return[this[0],l.labels.get_mangled(e)]}var l,f=e(),p=f.walk;return t=E(t,{mangle:!0,toplevel:!1,defines:null,except:null,no_functions:!1}),f.with_walkers({function:a,defun:function(){
// move function declarations to the top when
// they are not in some block.
var e=a.apply(this,arguments);switch(f.parent()[0]){case"toplevel":case"function":case"defun":return P.at_top(e)}return e},label:function(e,n){return l.labels.refs[e]?[this[0],l.labels.get_mangled(e,!0),p(n)]:p(n)},break:c,continue:c,var:s,const:s,name:function(e){return o(e)||[this[0],i(e)]},try:function(e,n,t){return[this[0],P(e,p),null!=n?[i(n[0]),P(n[1],p)]:null,null!=t?P(t,p):null]},toplevel:function(e){var n=this;return u(n.scope,function(){return[n[0],P(e,p)]})},directive:function(){return P.at_top(this)}},function(){return p(r(n))})}function o(e,n){return x(e).length>x("stat"==n[0]?n[1]:n).length?n:e}function a(e){return"block"==e[0]&&e[1]&&e[1].length>0?e[1][e[1].length-1]:e}function u(e){if(e)switch(a(e)[0]){case"return":case"break":case"continue":case"throw":return!0}}function s(e){return"unary-prefix"==e[0]&&D(e[1],["!","delete"])||"binary"==e[0]&&D(e[1],["in","instanceof","==","!=","===","!==","<","<=",">=",">"])||"binary"==e[0]&&D(e[1],["&&","||"])&&s(e[2])&&s(e[3])||"conditional"==e[0]&&s(e[2])&&s(e[3])||"assign"==e[0]&&e[1]===!0&&s(e[3])||"seq"==e[0]&&s(e[e.length-1])}function c(e){return!e||"block"==e[0]&&(!e[1]||0==e[1].length)}function l(e){return"string"==e[0]||"unary-prefix"==e[0]&&"typeof"==e[1]||"binary"==e[0]&&"+"==e[1]&&(l(e[2])||l(e[3]))}function f(e){c(e)||j("Dropping unreachable code: "+x(e,!0))}function p(n){
// In this first pass, we rewrite ifs which abort with no else with an
// if-else.  For example:
//
// if (x) {
//     blah();
//     return y;
// }
// foobar();
//
// is rewritten into:
//
// if (x) {
//     blah();
//     return y;
// } else {
//     foobar();
// }
function t(e){e=P(e,a);for(var n=0;n<e.length;++n){var r=e[n];if("if"==r[0]&&!r[3]){var i=r[2];if(u(i)){var o=a(r[1]),s=t(e.slice(n+1)),c=1==s.length?s[0]:["block",s];return e.slice(0,n).concat([[r[0],// "if"
o,// conditional
i,// then
c]])}}}return e}function r(e,n,r){return r=t(r),[this[0],e,n,r]}function i(e){return[this[0],null!=e?t(e):null]}var o=e(),a=o.walk;return o.with_walkers({defun:r,function:r,block:i,splice:i,toplevel:function(e){return[this[0],t(e)]},try:function(e,n,r){return[this[0],t(e),null!=n?[n[0],t(n[1])]:null,null!=r?t(r):null]}},function(){return a(n)})}function d(n,t){function r(){throw l}function i(){throw f}function o(){return t.call(this,this,s,r,i)}function a(e){if("++"==e||"--"==e)return o.apply(this,arguments)}function u(e){if("&&"==e||"||"==e)return o.apply(this,arguments)}var s=e(),c=s.walk,l={},f={};return s.with_walkers({try:o,throw:o,return:o,new:o,switch:o,break:o,continue:o,assign:o,call:o,if:o,for:o,"for-in":o,while:o,do:o,return:o,"unary-prefix":a,"unary-postfix":a,conditional:o,binary:u,defun:o},function(){for(;;)try{c(n);break}catch(e){if(e===l)break;if(e===f)continue;throw e}})}function h(n){function t(e,n){var t=a;a=n,e=P(e,s);var r={},i=P(n.names,function(e,t){return"var"!=e?P.skip:n.references(t)?(r[t]=!0,[t]):P.skip});
// looking for assignments to any of these variables.
// we can save considerable space by moving the definitions
// in the var declaration.
return i.length>0&&(d(["block",e],function(e,n,t,o){if("assign"==e[0]&&e[1]===!0&&"name"==e[2][0]&&C(r,e[2][1])){
// insert the definition into the var declaration
for(var a=i.length;--a>=0;)if(i[a][0]==e[2][1]){i[a][1]&&// this name already defined, we must stop
t(),i[a][1]=e[3],// definition
i.push(i.splice(a,1)[0]);break}
// remove this assignment from the AST.
var u=n.parent();if("seq"==u[0]){var s=u[2];s.unshift(0,u.length),u.splice.apply(u,s)}else"stat"==u[0]?u.splice(0,u.length,"block"):t();o()}t()}),e.unshift(["var",i])),a=t,e}function i(e){for(var n=null,t=e.length;--t>=0;){var r=e[t];r[1]&&(r=["assign",!0,["name",r[0]],r[1]],n=null==n?r:["seq",r,n])}return null==n&&"for"!=u.parent()[0]?"for-in"==u.parent()[0]?["name",e[0][0]]:P.skip:["stat",n]}function o(e){return[this[0],t(e,this.scope)]}var a,u=e(),s=u.walk;return u.with_walkers({function:function(e,n,r){for(var i=n.length;--i>=0&&!r.scope.references(n[i]);)n.pop();return r.scope.references(e)||(e=null),[this[0],e,n,t(r,r.scope)]},defun:function(e,n,r){if(!a.references(e))return P.skip;for(var i=n.length;--i>=0&&!r.scope.references(n[i]);)n.pop();return[this[0],e,n,t(r,r.scope)]},var:i,toplevel:o},function(){return s(r(n))})}function g(e,n){return e=m(e,n),e=v(e,n)}function m(n,t){function r(e){var n=["unary-prefix","!",e];switch(e[0]){case"unary-prefix":return"!"==e[1]&&s(e[2])?e[2]:n;case"seq":return e=k(e),e[e.length-1]=r(e[e.length-1]),e;case"conditional":return o(n,["conditional",e[1],r(e[2]),r(e[3])]);case"binary":var i=e[1],a=e[2],u=e[3];if(!t.keep_comps)switch(i){case"<=":return["binary",">",a,u];case"<":return["binary",">=",a,u];case">=":return["binary","<",a,u];case">":return["binary","<=",a,u]}switch(i){case"==":return["binary","!=",a,u];case"!=":return["binary","==",a,u];case"===":return["binary","!==",a,u];case"!==":return["binary","===",a,u];case"&&":return o(n,["binary","||",r(a),r(u)]);case"||":return o(n,["binary","&&",r(a),r(u)])}}return n}function i(e,n,t){var i=function(){return"unary-prefix"==e[0]&&"!"==e[1]?t?["conditional",e[2],t,n]:["binary","||",e[2],n]:t?o(["conditional",e,n,t],["conditional",r(e),t,n]):["binary","&&",e,n]};
// shortcut the conditional if the expression has a constant value
return L(e,function(e,r){return f(r?t:n),r?n:t},i)}function a(e){return null!=e&&"block"==e[0]&&e[1]&&(1==e[1].length?e=e[1][0]:0==e[1].length&&(e=["block"])),e}function l(e,n,t){return[this[0],e,n,d(t,"lambda")]}
// this function does a few things:
// 1. discard useless blocks
// 2. join consecutive var declarations
// 3. remove obviously dead code
// 4. transform consecutive statements using the comma operator
// 5. if block_type == "lambda" and it detects constructs like if(foo) return ... - rewrite like if (!foo) { ... }
function d(e,n){
// this increases jQuery by 1K.  Probably not such a good idea after all..
// part of this is done in prepare_ifs anyway.
// if (block_type == "lambda") statements = (function(i, a, stat){
//         while (i < statements.length) {
//                 stat = statements[i++];
//                 if (stat[0] == "if" && !stat[3]) {
//                         if (stat[2][0] == "return" && stat[2][1] == null) {
//                                 a.push(make_if(negate(stat[1]), [ "block", statements.slice(i) ]));
//                                 break;
//                         }
//                         var last = last_stat(stat[2]);
//                         if (last[0] == "return" && last[1] == null) {
//                                 a.push(make_if(stat[1], [ "block", stat[2][1].slice(0, -1) ], [ "block", statements.slice(i) ]));
//                                 break;
//                         }
//                 }
//                 a.push(stat);
//         }
//         return a;
// })(0, []);
return e=P(e,b),e=e.reduce(function(e,n){return"block"==n[0]?n[1]&&e.push.apply(e,n[1]):e.push(n),e},[]),e=function(n,t){return e.forEach(function(e){t&&("var"==e[0]&&"var"==t[0]||"const"==e[0]&&"const"==t[0])?t[1]=t[1].concat(e[1]):(n.push(e),t=e)}),n}([]),t.dead_code&&(e=function(n,r){return e.forEach(function(e){r?"function"==e[0]||"defun"==e[0]?n.push(e):"var"==e[0]||"const"==e[0]?(t.no_warnings||j("Variables declared in unreachable code"),e[1]=P(e[1],function(e){return e[1]&&!t.no_warnings&&f(["assign",!0,["name",e[0]],e[1]]),[e[0]]}),n.push(e)):t.no_warnings||f(e):(n.push(e),D(e[0],["return","throw","break","continue"])&&(r=!0))}),n}([])),t.make_seqs&&(e=function(n,t){return e.forEach(function(e){t&&"stat"==t[0]&&"stat"==e[0]?t[1]=["seq",t[1],e[1]]:(n.push(e),t=e)}),n.length>=2&&"stat"==n[n.length-2][0]&&("return"==n[n.length-1][0]||"throw"==n[n.length-1][0])&&n[n.length-1][1]&&n.splice(n.length-2,2,[n[n.length-1][0],["seq",n[n.length-2][1],n[n.length-1][1]]]),n}([])),e}function h(e,n,t){return L(e,function(e,r){return r?(n=b(n),f(t),n||["block"]):(t=b(t),f(n),t||["block"])},function(){return m(e,n,t)})}function g(e,n,t){var i=[["if",r(e),t]];return"block"==n[0]?n[1]&&(i=i.concat(n[1])):i.push(n),b(["block",i])}function m(e,n,t){if(e=b(e),n=b(n),t=b(t),c(t)&&c(n))return["stat",e];c(n)?(e=r(e),n=t,t=null):c(t)?t=null:
// if we have both else and then, maybe it makes sense to switch them?
function(){var i=x(e),o=r(e);if(x(o).length<i.length){var a=n;n=t,t=a,e=o}}();var a=["if",e,n,t];return"if"==n[0]&&c(n[3])&&c(t)?a=o(a,b(["if",["binary","&&",e,n[1]],n[2]])):"stat"==n[0]?t?"stat"==t[0]?a=o(a,["stat",i(e,n[1],t[1])]):u(t)&&(a=g(e,n,t)):a=o(a,["stat",i(e,n[1])]):t&&n[0]==t[0]&&("return"==n[0]||"throw"==n[0])&&n[1]&&t[1]?a=o(a,[n[0],i(e,n[1],t[1])]):t&&u(n)?(a=[["if",e,n]],"block"==t[0]?t[1]&&(a=a.concat(t[1])):a.push(t),a=b(["block",a])):n&&u(t)&&(a=g(e,n,t)),a}function v(e,n){return L(e,function(e,t){return t?["for",null,null,null,b(n)]:(f(n),["block"])})}t=E(t,{make_seqs:!0,dead_code:!0,no_warnings:!1,keep_comps:!0,unsafe:!1});var y=e(),b=y.walk;return y.with_walkers({sub:function(e,n){if("string"==n[0]){var t=n[1];if(A(t))return["dot",b(e),t];if(/^[1-9][0-9]*$/.test(t)||"0"===t)return["sub",b(e),["num",parseInt(t,10)]]}},if:h,toplevel:function(e){return["toplevel",d(e)]},switch:function(e,n){var t=n.length-1;return["switch",b(e),P(n,function(e,n){var r=d(e[1]);if(n==t&&r.length>0){var i=r[r.length-1];"break"!=i[0]||i[1]||r.pop()}return[e[0]?b(e[0]):null,r]})]},function:l,defun:l,block:function(e){if(e)return a(["block",d(e)])},binary:function(e,n,t){return L(["binary",e,b(n),b(t)],function(e){return o(b(e),this)},function(){return function(){if("=="==e||"!="==e){var r=b(n),i=b(t);return r&&"unary-prefix"==r[0]&&"!"==r[1]&&"num"==r[2][0]?n=["num",+!r[2][1]]:i&&"unary-prefix"==i[0]&&"!"==i[1]&&"num"==i[2][0]&&(t=["num",+!i[2][1]]),["binary",e,n,t]}}()||this})},conditional:function(e,n,t){return i(b(e),b(n),b(t))},try:function(e,n,t){return["try",d(e),null!=n?[n[0],d(n[1])]:null,null!=t?d(t):null]},"unary-prefix":function(e,n){n=b(n);var t=["unary-prefix",e,n];return"!"==e&&(t=o(t,r(n))),L(t,function(e,n){return b(e)},function(){return t})},name:function(e){switch(e){case"true":return["unary-prefix","!",["num",0]];case"false":return["unary-prefix","!",["num",1]]}},while:v,assign:function(e,n,t){n=b(n),t=b(t);var r=["+","-","/","*","%",">>","<<",">>>","|","^","&"];return e===!0&&"name"===n[0]&&"binary"===t[0]&&~r.indexOf(t[1])&&"name"===t[2][0]&&t[2][1]===n[1]?[this[0],t[1],n,t[3]]:[this[0],e,n,t]},call:function(e,n){return e=b(e),t.unsafe&&"dot"==e[0]&&"string"==e[1][0]&&"toString"==e[2]?e[1]:[this[0],e,P(n,b)]},num:function(e){return isFinite(e)?[this[0],e]:["binary","/",e===1/0?["num",1]:e===-1/0?["unary-prefix","-",["num",1]]:["num",0],["num",0]]}},function(){return b(p(b(p(n))))})}function v(n,t){function i(e,n){var t,r=a;return a=e,t=n(),a=r,t}function o(e,n,t){return[this[0],e,n,i(t.scope,S(P,t,s))]}var a,u=e(),s=u.walk;return u.with_walkers({directive:function(e){if(a.active_directive(e))return["block"];a.directives.push(e)},toplevel:function(e){return[this[0],i(this.scope,S(P,e,s))]},function:o,defun:o},function(){return s(r(n))})}function y(e,n){var t=0,r=0;return e=e.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g,function(e){switch(e){case"\\":return"\\\\";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";case'"':return++t,'"';case"'":return++r,"'";case"\0":return"\\0"}return e}),n&&(e=b(e)),t>r?"'"+e.replace(/\x27/g,"\\'")+"'":'"'+e.replace(/\x22/g,'\\"')+'"'}function b(e){return e.replace(/[\u0080-\uffff]/g,function(e){for(var n=e.charCodeAt(0).toString(16);n.length<4;)n="0"+n;return"\\u"+n})}function x(n,t){function r(e){var n=y(e,t.ascii_only);return t.inline_script&&(n=n.replace(/<\x2fscript([>\/\t\n\f\r ])/gi,"<\\/script$1")),n}function i(e){return e=e.toString(),t.ascii_only&&(e=b(e)),e}function o(e){return null==e&&(e=""),L&&(e=w(" ",t.indent_start+M*t.indent_level)+e),e}function a(e,n){null==n&&(n=1),M+=n;try{return e.apply(null,k(arguments,1))}finally{M-=n}}function u(e){return e=e.toString(),e.charAt(e.length-1)}function s(e){return e.toString().charAt(0)}function l(e){if(L)return e.join(" ");for(var n=[],t=0;t<e.length;++t){var r=e[t+1];n.push(e[t]),r&&(B(u(e[t]))&&(B(s(r))||"\\"==s(r))||/[\+\-]$/.test(e[t].toString())&&/^[\+\-]/.test(r.toString())||"/"==u(e[t])&&"/"==s(r))&&n.push(" ")}return n.join("")}function f(e){return e.join(","+U)}function p(e){for(var n=V(e),t=1;t<arguments.length;++t){var r=arguments[t];if(r instanceof Function&&r(e)||e[0]==r)return"("+n+")"}return n}function d(e){if(1==e.length)return e[0];if(2==e.length){var n=e[1];return e=e[0],e.length<=n.length?e:n}return d([e[0],d(e.slice(1))])}function h(e){if("function"==e[0]||"object"==e[0])for(
// dot/call on a literal function requires the
// function literal itself to be parenthesized
// only if it's the first "thing" in a
// statement.  This means that the parent is
// "stat", but it could also be a "seq" and
// we're the first in this "seq" and the
// parent is "stat", and so on.  Messy stuff,
// but it worths the trouble.
var n=k(z.stack()),t=n.pop(),r=n.pop();r;){if("stat"==r[0])return!0;if(("seq"!=r[0]&&"call"!=r[0]&&"dot"!=r[0]&&"sub"!=r[0]&&"conditional"!=r[0]||r[1]!==t)&&("binary"!=r[0]&&"assign"!=r[0]&&"unary-postfix"!=r[0]||r[2]!==t))return!1;t=r,r=n.pop()}return!C(N,e[0])}function g(e){var n,t=e.toString(10),r=[t.replace(/^0\./,".").replace("e+","e")];// probably pointless
// probably pointless
return Math.floor(e)===e?(e>=0?r.push("0x"+e.toString(16).toLowerCase(),"0"+e.toString(8)):r.push("-0x"+(-e).toString(16).toLowerCase(),"-0"+(-e).toString(8)),(n=/^(.*?)(0+)$/.exec(e))&&r.push(n[1]+"e"+n[2].length)):(n=/^0?\.(0+)(.*)$/.exec(e))&&r.push(n[2]+"e-"+(n[1].length+n[2].length),t.substr(t.indexOf("."))),d(r)}
// The squeezer replaces "block"-s that contain only a single
// statement with the statement itself; technically, the AST
// is correct, but this can create problems when we output an
// IF having an ELSE clause where the THEN clause ends in an
// IF *without* an ELSE block (then the outer ELSE would refer
// to the inner IF).  This function checks for this case and
// adds the block brackets if needed.
function m(e){if(null==e)return";";if("do"==e[0])
// https://github.com/mishoo/UglifyJS/issues/#issue/57
// IE croaks with "syntax error" on code like this:
//     if (foo) do ... while(cond); else ...
// we need block brackets around do/while
return R([e]);for(var n=e;;){var t=n[0];if("if"==t){if(!n[3])
// no else, we must add the block
return V(["block",[e]]);n=n[3]}else if("while"==t||"do"==t)n=n[2];else{if("for"!=t&&"for-in"!=t)break;n=n[4]}}return V(e)}function v(e,n,t,r,o){var a=r||"function";return e&&(a+=" "+i(e)),a+="("+f(P(n,i))+")",a=l([a,R(t)]),!o&&h(this)?"("+a+")":a}function x(e){switch(e[0]){case"with":case"while":return c(e[2])||x(e[2]);case"for":case"for-in":return c(e[4])||x(e[4]);case"if":// `if' with empty `then' and no `else'
return!(!c(e[2])||e[3])||(e[3]?!!c(e[3])||x(e[3]):x(e[2]));// dive into the `then' branch
case"directive":return!0}}function _(e,n){for(var t=[],r=e.length-1,i=0;i<=r;++i){var a=e[i],u=V(a);";"!=u&&(L||i!=r||x(a)||(u=u.replace(/;+\s*$/,"")),t.push(u))}return n?t:P(t,o)}function S(e){var n=e.length;return 0==n?"{}":"{"+I+P(e,function(e,t){var r=e[1].length>0,i=a(function(){return o(e[0]?l(["case",V(e[0])+":"]):"default:")},.5)+(r?I+a(function(){return _(e[1]).join(I)}):"");return!L&&r&&t<n-1&&(i+=";"),i}).join(I)+I+o("}")}function R(e){return e?0==e.length?"{}":"{"+I+a(function(){return _(e).join(I)})+I+o("}"):";"}function j(e){var n=e[0],t=e[1];return null!=t&&(n=l([i(n),"=",p(t,"seq")])),n}t=E(t,{indent_start:0,indent_level:4,quote_keys:!1,space_colon:!1,beautify:!1,ascii_only:!1,inline_script:!1});var L=!!t.beautify,M=0,I=L?"\n":"",U=L?" ":"",z=e(),V=z.walk;return z.with_walkers({string:r,num:g,name:i,debugger:function(){return"debugger;"},toplevel:function(e){return _(e).join(I+I)},splice:function(e){return C(T,z.parent())?R.apply(this,arguments):P(_(e,!0),function(e,n){
// the first line is already indented
return n>0?o(e):e}).join(I)},block:R,var:function(e){return"var "+f(P(e,j))+";"},const:function(e){return"const "+f(P(e,j))+";"},try:function(e,n,t){var r=["try",R(e)];return n&&r.push("catch","("+n[0]+")",R(n[1])),t&&r.push("finally",R(t)),l(r)},throw:function(e){return l(["throw",V(e)])+";"},new:function(n,t){return t=t.length>0?"("+f(P(t,function(e){return p(e,"seq")}))+")":"",l(["new",p(n,"seq","binary","conditional","assign",function(n){var t=e(),r={};try{t.with_walkers({call:function(){throw r},function:function(){return this}},function(){t.walk(n)})}catch(e){if(e===r)return!0;throw e}})+t])},switch:function(e,n){return l(["switch","("+V(e)+")",S(n)])},break:function(e){var n="break";return null!=e&&(n+=" "+i(e)),n+";"},continue:function(e){var n="continue";return null!=e&&(n+=" "+i(e)),n+";"},conditional:function(e,n,t){return l([p(e,"assign","seq","conditional"),"?",p(n,"seq"),":",p(t,"seq")])},assign:function(e,n,t){return e&&e!==!0?e+="=":e="=",l([V(n),e,p(t,"seq")])},dot:function(e){var n=V(e),t=1;for("num"==e[0]?/[a-f.]/i.test(n)||(n+="."):"function"!=e[0]&&h(e)&&(n="("+n+")");t<arguments.length;)n+="."+i(arguments[t++]);return n},call:function(e,n){var t=V(e);return"("!=t.charAt(0)&&h(e)&&(t="("+t+")"),t+"("+f(P(n,function(e){return p(e,"seq")}))+")"},function:v,defun:v,if:function(e,n,t){var r=["if","("+V(e)+")",t?m(n):V(n)];return t&&r.push("else",V(t)),l(r)},for:function(e,n,t,r){var i=["for"];e=(null!=e?V(e):"").replace(/;*\s*$/,";"+U),n=(null!=n?V(n):"").replace(/;*\s*$/,";"+U),t=(null!=t?V(t):"").replace(/;*\s*$/,"");var o=e+n+t;return"; ; "==o&&(o=";;"),i.push("("+o+")",V(r)),l(i)},"for-in":function(e,n,t,r){return l(["for","("+(e?V(e).replace(/;+$/,""):V(n)),"in",V(t)+")",V(r)])},while:function(e,n){return l(["while","("+V(e)+")",V(n)])},do:function(e,n){return l(["do",V(n),"while","("+V(e)+")"])+";"},return:function(e){var n=["return"];return null!=e&&n.push(V(e)),l(n)+";"},binary:function(e,n,r){var i=V(n),o=V(r);
// XXX: I'm pretty sure other cases will bite here.
//      we need to be smarter.
//      adding parens all the time is the safest bet.
return(D(n[0],["assign","conditional","seq"])||"binary"==n[0]&&O[e]>O[n[1]]||"function"==n[0]&&h(this))&&(i="("+i+")"),D(r[0],["assign","conditional","seq"])||"binary"==r[0]&&O[e]>=O[r[1]]&&(r[1]!=e||!D(e,["&&","||","*"]))?o="("+o+")":L||!t.inline_script||"<"!=e&&"<<"!=e||"regexp"!=r[0]||!/^script/i.test(r[1])||(o=" "+o),l([i,e,o])},"unary-prefix":function(e,n){var t=V(n);return"num"!=n[0]&&("unary-prefix"!=n[0]||C(q,e+n[1]))&&h(n)&&(t="("+t+")"),e+(F.is_alphanumeric_char(e.charAt(0))?" ":"")+t},"unary-postfix":function(e,n){var t=V(n);return"num"!=n[0]&&("unary-postfix"!=n[0]||C(q,e+n[1]))&&h(n)&&(t="("+t+")"),t+e},sub:function(e,n){var t=V(e);return h(e)&&(t="("+t+")"),t+"["+V(n)+"]"},object:function(e){var n=h(this);if(0==e.length)return n?"({})":"{}";var i="{"+I+a(function(){return P(e,function(e){if(3==e.length)
// getter/setter.  The name is in p[0], the arg.list in p[1][2], the
// body in p[1][3] and type ("get" / "set") in p[2].
return o(v(e[0],e[1][2],e[1][3],e[2],!0));var n=e[0],i=p(e[1],"seq");return t.quote_keys?n=r(n):("number"==typeof n||!L&&+n+""==n)&&parseFloat(n)>=0?n=g(+n):A(n)||(n=r(n)),o(l(L&&t.space_colon?[n,":",i]:[n+":",i]))}).join(","+I)})+I+o("}");return n?"("+i+")":i},regexp:function(e,n){return t.ascii_only&&(e=b(e)),"/"+e+"/"+n},array:function(e){return 0==e.length?"[]":l(["[",f(P(e,function(n,t){return L||"atom"!=n[0]||"undefined"!=n[1]?p(n,"seq"):t===e.length-1?",":""})),"]"])},stat:function(e){return null!=e?V(e).replace(/;*\s*$/,";"):";"},seq:function(){return f(P(k(arguments),V))},label:function(e,n){return l([i(e),":",V(n)])},with:function(e,n){return l(["with","("+V(e)+")",V(n)])},atom:function(e){return i(e)},directive:function(e){return y(e)+";"}},function(){return V(n)})}function _(e,n){var t=[0];return F.parse(function(){function r(e){return e.pos-s}function i(e){s=e.pos,t.push(s)}function o(){var e=u.apply(this,arguments);e:if((!a||"keyword"!=a.type)&&r(e)>n)switch(e.type){case"keyword":case"atom":case"name":case"punc":i(e);break e}return a=e,e}var a,u=F.tokenizer(e),s=0;return o.context=function(){return u.context.apply(this,arguments)},o}()),t.map(function(n,r){return e.substring(n,t[r+1]||e.length)}).join("\n")}/* -----[ Utilities ]----- */
function w(e,n){if(n<=0)return"";if(1==n)return e;var t=w(e,n>>1);return t+=t,1&n&&(t+=e),t}function E(e,n){var t={};e===!0&&(e={});for(var r in n)C(n,r)&&(t[r]=e&&C(e,r)?e[r]:n[r]);return t}function A(e){return/^[a-z_$][a-z0-9_$]*$/i.test(e)&&"this"!=e&&!C(F.KEYWORDS_ATOM,e)&&!C(F.RESERVED_WORDS,e)&&!C(F.KEYWORDS,e)}function C(e,n){return Object.prototype.hasOwnProperty.call(e,n)}/***********************************************************************

  A JavaScript tokenizer / parser / beautifier / compressor.

  This version is suitable for Node.js.  With minimal changes (the
  exports stuff) it should work on any JS platform.

  This file implements some AST processors.  They work on data built
  by parse-js.

  Exported functions:

    - ast_mangle(ast, options) -- mangles the variable/function names
      in the AST.  Returns an AST.

    - ast_squeeze(ast) -- employs various optimizations to make the
      final generated code even smaller.  Returns an AST.

    - gen_code(ast, options) -- generates JS code from the AST.  Pass
      true (or an object, see the code for some options) as second
      argument to get "pretty" (indented) code.

  -------------------------------- (C) ---------------------------------

                           Author: Mihai Bazon
                         <mihai.bazon@gmail.com>
                       http://mihai.bazon.net/blog

  Distributed under the BSD license:

    Copyright 2010 (c) Mihai Bazon <mihai.bazon@gmail.com>

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/
var F=require("./parse-js"),S=F.curry,k=F.slice,D=F.member,B=F.is_identifier_char,O=F.PRECEDENCE,q=F.OPERATORS,R=function(){var e=t();return function(n){var t="",r=54;do{t+=e.charAt(n%r),n=Math.floor(n/r),r=64}while(n>0);return t}}();n.prototype={has:function(e){for(var n=this;n;n=n.parent)if(C(n.names,e))return n},has_mangled:function(e){for(var n=this;n;n=n.parent)if(C(n.rev_mangled,e))return n},toJSON:function(){return{names:this.names,uses_eval:this.uses_eval,uses_with:this.uses_with}},next_mangled:function(){
// we must be careful that the new mangled name:
//
// 1. doesn't shadow a mangled name from a parent
//    scope, unless we don't reference the original
//    name from this scope OR from any sub-scopes!
//    This will get slow.
//
// 2. doesn't shadow an original name from a parent
//    scope, in the event that the name is not mangled
//    in the parent scope and we reference that name
//    here OR IN ANY SUBSCOPES!
//
// 3. doesn't shadow a name that is referenced but not
//    defined (possibly global defined elsewhere).
for(;;){var e,n=R(++this.cname);if((!(
// case 1.
e=this.has_mangled(n))||this.refs[e.rev_mangled[n]]!==e)&&(!(
// case 2.
e=this.has(n))||e===this||this.refs[n]!==e||e.has_mangled(n))&&(!C(this.refs,n)||null!=this.refs[n])&&A(n))return n}},set_mangle:function(e,n){return this.rev_mangled[n]=e,this.mangled[e]=n},get_mangled:function(e,n){if(this.uses_eval||this.uses_with)return e;// no mangle if eval or with is in use
var t=this.has(e);// not in visible scope, no mangle
// already mangled in this scope
return t?C(t.mangled,e)?t.mangled[e]:n?t.set_mangle(e,t.next_mangled()):e:e},references:function(e){return e&&!this.parent||this.uses_with||this.uses_eval||this.refs[e]},define:function(e,n){if(null!=e)return"var"!=n&&C(this.names,e)||(this.names[e]=n||"var"),e},active_directive:function(e){return D(e,this.directives)||this.parent&&this.parent.active_directive(e)}};/* -----[
   - compress foo["bar"] into foo.bar,
   - remove block brackets {} where possible
   - join consecutive var declarations
   - various optimizations for IFs:
   - if (cond) foo(); else bar();  ==>  cond?foo():bar();
   - if (cond) foo();  ==>  cond&&foo();
   - if (foo) return bar(); else return baz();  ==> return foo?bar():baz(); // also for throw
   - if (foo) return bar(); else something();  ==> {if(foo)return bar();something()}
   ]----- */
var P,j=function(){},L=function(){
// this can only evaluate constant expressions.  If it finds anything
// not constant, it throws $NOT_CONSTANT.
function e(t){switch(t[0]){case"string":case"num":return t[1];case"name":case"atom":switch(t[1]){case"true":return!0;case"false":return!1;case"null":return null}break;case"unary-prefix":switch(t[1]){case"!":return!e(t[2]);case"typeof":return typeof e(t[2]);case"~":return~e(t[2]);case"-":return-e(t[2]);case"+":return+e(t[2])}break;case"binary":var r=t[2],i=t[3];switch(t[1]){case"&&":return e(r)&&e(i);case"||":return e(r)||e(i);case"|":return e(r)|e(i);case"&":return e(r)&e(i);case"^":return e(r)^e(i);case"+":return e(r)+e(i);case"*":return e(r)*e(i);case"/":return e(r)/e(i);case"%":return e(r)%e(i);case"-":return e(r)-e(i);case"<<":return e(r)<<e(i);case">>":return e(r)>>e(i);case">>>":return e(r)>>>e(i);case"==":return e(r)==e(i);case"===":return e(r)===e(i);case"!=":return e(r)!=e(i);case"!==":return e(r)!==e(i);case"<":return e(r)<e(i);case"<=":return e(r)<=e(i);case">":return e(r)>e(i);case">=":return e(r)>=e(i);case"in":return e(r)in e(i);case"instanceof":return e(r)instanceof e(i)}}throw n}var n={};return function(t,r,i){try{var o,a=e(t);switch(typeof a){case"string":o=["string",a];break;case"number":o=["num",a];break;case"boolean":o=["name",String(a)];break;default:if(null===a){o=["atom","null"];break}throw new Error("Can't handle constant of type: "+typeof a)}return r.call(t,o,a)}catch(r){if(r===n){if("binary"!=t[0]||"==="!=t[1]&&"!=="!=t[1]||!(l(t[2])&&l(t[3])||s(t[2])&&s(t[3]))){if(i&&"binary"==t[0]&&("||"==t[1]||"&&"==t[1]))
// the whole expression is not constant but the lval may be...
try{var u=e(t[2]);t="&&"==t[1]&&(u?t[3]:u)||"||"==t[1]&&(u?u:t[3])||t}catch(e){}}else t[1]=t[1].substr(0,2);return i?i.call(t,t):null}throw r}}}(),N=F.array_to_hash(["name","array","object","string","dot","sub","call","regexp","defun"]),T=F.array_to_hash(["if","while","do","for","for-in","with"]);!function(){function e(e){this.v=e}function n(e){this.v=e}P=function(r,i,o){function a(){var a=i.call(o,r[u],u);a instanceof e?(a=a.v,a instanceof n?c.push.apply(c,a.v):c.push(a)):a!=t&&(a instanceof n?s.push.apply(s,a.v):s.push(a))}var u,s=[],c=[];if(r instanceof Array)for(u=0;u<r.length;++u)a();else for(u in r)C(r,u)&&a();return c.concat(s)},P.at_top=function(n){return new e(n)},P.splice=function(e){return new n(e)};var t=P.skip={}}(),/* -----[ Exports ]----- */
exports.ast_walker=e,exports.ast_mangle=i,exports.ast_squeeze=g,exports.ast_lift_variables=h,exports.gen_code=x,exports.ast_add_scope=r,exports.set_logger=function(e){j=e},exports.make_string=y,exports.split_lines=_,exports.MAP=P,
// keep this last!
exports.ast_squeeze_more=require("./squeeze-more").ast_squeeze_more}),define("uglifyjs/index",["require","exports","module","./parse-js","./process","./consolidator"],function(require,exports,module){
//convienence function(src, [options]);
function e(n,t){t||(t={});var r=e.parser,i=e.uglify,o=r.parse(n,t.strict_semicolons);// compressed code here
// parse code and get the initial AST
// get a new AST with mangled names
return o=i.ast_mangle(o,t.mangle_options),o=i.ast_squeeze(o,t.squeeze_options),i.gen_code(o,t.gen_options)}e.parser=require("./parse-js"),e.uglify=require("./process"),e.consolidator=require("./consolidator"),module.exports=e}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define("source-map/array-set",function(require,exports,module){/**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
function e(){this._array=[],this._set={}}var n=require("./util");/**
   * Static method for creating ArraySet instances from an existing array.
   */
e.fromArray=function(n,t){for(var r=new e,i=0,o=n.length;i<o;i++)r.add(n[i],t);return r},/**
   * Add the given string to this set.
   *
   * @param String aStr
   */
e.prototype.add=function(e,t){var r=this.has(e),i=this._array.length;r&&!t||this._array.push(e),r||(this._set[n.toSetString(e)]=i)},/**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
e.prototype.has=function(e){return Object.prototype.hasOwnProperty.call(this._set,n.toSetString(e))},/**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
e.prototype.indexOf=function(e){if(this.has(e))return this._set[n.toSetString(e)];throw new Error('"'+e+'" is not in the set.')},/**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
e.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},/**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
e.prototype.toArray=function(){return this._array.slice()},exports.ArraySet=e}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
define("source-map/base64-vlq",function(require,exports,module){/**
   * Converts from a two-complement value to a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
function e(e){return e<0?1+(-e<<1):0+(e<<1)}/**
   * Converts to a two-complement value from a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
function n(e){var n=1==(1&e),t=e>>1;return n?-t:t}var t=require("./base64");/**
   * Returns the base 64 VLQ encoded value.
   */
exports.encode=function(n){var r,i="",o=e(n);do{r=31&o,o>>>=5,o>0&&(
// There are still more digits in this value, so we must make sure the
// continuation bit is marked.
r|=32),i+=t.encode(r)}while(o>0);return i},/**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string.
   */
exports.decode=function(e){var r,i,o=0,a=e.length,u=0,s=0;do{if(o>=a)throw new Error("Expected more digits in base 64 VLQ value.");i=t.decode(e.charAt(o++)),r=!!(32&i),i&=31,u+=i<<s,s+=5}while(r);return{value:n(u),rest:e.slice(o)}}}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define("source-map/base64",function(require,exports,module){var e={},n={};"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("").forEach(function(t,r){e[t]=r,n[r]=t}),/**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
exports.encode=function(e){if(e in n)return n[e];throw new TypeError("Must be between 0 and 63: "+e)},/**
   * Decode a single base 64 digit to an integer.
   */
exports.decode=function(n){if(n in e)return e[n];throw new TypeError("Not a valid base 64 digit: "+n)}}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define("source-map/binary-search",function(require,exports,module){/**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   */
function e(n,t,r,i,o){
// This function terminates when one of the following is true:
//
//   1. We find the exact element we are looking for.
//
//   2. We did not find the exact element, but we can return the next
//      closest element that is less than that element.
//
//   3. We did not find the exact element, and there is no next-closest
//      element which is less than the one we are searching for, so we
//      return null.
var a=Math.floor((t-n)/2)+n,u=o(r,i[a],!0);
// aHaystack[mid] is greater than our needle.
// aHaystack[mid] is less than our needle.
return 0===u?i[a]:u>0?t-a>1?e(a,t,r,i,o):i[a]:a-n>1?e(n,a,r,i,o):n<0?null:i[n]}/**
   * This is an implementation of binary search which will always try and return
   * the next lowest value checked if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   */
exports.search=function(n,t,r){return t.length>0?e(-1,t.length,n,t,r):null}}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define("source-map/source-map-consumer",function(require,exports,module){/**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
function e(e){var t=e;"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,"")));var i=n.getArg(t,"version"),o=n.getArg(t,"sources"),a=n.getArg(t,"names",[]),u=n.getArg(t,"sourceRoot",null),s=n.getArg(t,"sourcesContent",null),c=n.getArg(t,"mappings"),l=n.getArg(t,"file",null);
// Once again, Sass deviates from the spec and supplies the version as a
// string rather than a number, so we use loose equality checking here.
if(i!=this._version)throw new Error("Unsupported version: "+i);
// Pass `true` below to allow duplicate names and sources. While source maps
// are intended to be compressed and deduplicated, the TypeScript compiler
// sometimes generates source maps with duplicates in them. See Github issue
// #72 and bugzil.la/889492.
this._names=r.fromArray(a,!0),this._sources=r.fromArray(o,!0),this.sourceRoot=u,this.sourcesContent=s,this._mappings=c,this.file=l}var n=require("./util"),t=require("./binary-search"),r=require("./array-set").ArraySet,i=require("./base64-vlq");/**
   * Create a SourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns SourceMapConsumer
   */
e.fromSourceMap=function(t){var i=Object.create(e.prototype);return i._names=r.fromArray(t._names.toArray(),!0),i._sources=r.fromArray(t._sources.toArray(),!0),i.sourceRoot=t._sourceRoot,i.sourcesContent=t._generateSourcesContent(i._sources.toArray(),i.sourceRoot),i.file=t._file,i.__generatedMappings=t._mappings.slice().sort(n.compareByGeneratedPositions),i.__originalMappings=t._mappings.slice().sort(n.compareByOriginalPositions),i},/**
   * The version of the source mapping spec that we are consuming.
   */
e.prototype._version=3,/**
   * The list of original sources.
   */
Object.defineProperty(e.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return this.sourceRoot?n.join(this.sourceRoot,e):e},this)}}),
// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.
e.prototype.__generatedMappings=null,Object.defineProperty(e.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||(this.__generatedMappings=[],this.__originalMappings=[],this._parseMappings(this._mappings,this.sourceRoot)),this.__generatedMappings}}),e.prototype.__originalMappings=null,Object.defineProperty(e.prototype,"_originalMappings",{get:function(){return this.__originalMappings||(this.__generatedMappings=[],this.__originalMappings=[],this._parseMappings(this._mappings,this.sourceRoot)),this.__originalMappings}}),/**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
e.prototype._parseMappings=function(e,t){for(var r,o,a=1,u=0,s=0,c=0,l=0,f=0,p=/^[,;]/,d=e;d.length>0;)if(";"===d.charAt(0))a++,d=d.slice(1),u=0;else if(","===d.charAt(0))d=d.slice(1);else{if(r={},r.generatedLine=a,
// Generated column.
o=i.decode(d),r.generatedColumn=u+o.value,u=r.generatedColumn,d=o.rest,d.length>0&&!p.test(d.charAt(0))){if(
// Original source.
o=i.decode(d),r.source=this._sources.at(l+o.value),l+=o.value,d=o.rest,0===d.length||p.test(d.charAt(0)))throw new Error("Found a source, but no line and column");if(
// Original line.
o=i.decode(d),r.originalLine=s+o.value,s=r.originalLine,
// Lines are stored 0-based
r.originalLine+=1,d=o.rest,0===d.length||p.test(d.charAt(0)))throw new Error("Found a source and line, but no column");
// Original column.
o=i.decode(d),r.originalColumn=c+o.value,c=r.originalColumn,d=o.rest,d.length>0&&!p.test(d.charAt(0))&&(
// Original name.
o=i.decode(d),r.name=this._names.at(f+o.value),f+=o.value,d=o.rest)}this.__generatedMappings.push(r),"number"==typeof r.originalLine&&this.__originalMappings.push(r)}this.__generatedMappings.sort(n.compareByGeneratedPositions),this.__originalMappings.sort(n.compareByOriginalPositions)},/**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
e.prototype._findMapping=function(e,n,r,i,o){
// To return the position we are searching for, we must first find the
// mapping for the given position and then return the opposite position it
// points to. Because the mappings are sorted, we can use binary search to
// find the best mapping.
if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[i]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[i]);return t.search(e,n,o)},/**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
e.prototype.originalPositionFor=function(e){var t={generatedLine:n.getArg(e,"line"),generatedColumn:n.getArg(e,"column")},r=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",n.compareByGeneratedPositions);if(r){var i=n.getArg(r,"source",null);return i&&this.sourceRoot&&(i=n.join(this.sourceRoot,i)),{source:i,line:n.getArg(r,"originalLine",null),column:n.getArg(r,"originalColumn",null),name:n.getArg(r,"name",null)}}return{source:null,line:null,column:null,name:null}},/**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
e.prototype.sourceContentFor=function(e){if(!this.sourcesContent)return null;if(this.sourceRoot&&(e=n.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var t;if(this.sourceRoot&&(t=n.urlParse(this.sourceRoot))){
// XXX: file:// URIs and absolute paths lead to unexpected behavior for
// many users. We can help them out when they expect file:// URIs to
// behave like it would if they were running a local HTTP server. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
var r=e.replace(/^file:\/\//,"");if("file"==t.scheme&&this._sources.has(r))return this.sourcesContent[this._sources.indexOf(r)];if((!t.path||"/"==t.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}throw new Error('"'+e+'" is not in the SourceMap.')},/**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
e.prototype.generatedPositionFor=function(e){var t={source:n.getArg(e,"source"),originalLine:n.getArg(e,"line"),originalColumn:n.getArg(e,"column")};this.sourceRoot&&(t.source=n.relative(this.sourceRoot,t.source));var r=this._findMapping(t,this._originalMappings,"originalLine","originalColumn",n.compareByOriginalPositions);return r?{line:n.getArg(r,"generatedLine",null),column:n.getArg(r,"generatedColumn",null)}:{line:null,column:null}},e.GENERATED_ORDER=1,e.ORIGINAL_ORDER=2,/**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
e.prototype.eachMapping=function(t,r,i){var o,a=r||null,u=i||e.GENERATED_ORDER;switch(u){case e.GENERATED_ORDER:o=this._generatedMappings;break;case e.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var s=this.sourceRoot;o.map(function(e){var t=e.source;return t&&s&&(t=n.join(s,t)),{source:t,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:e.name}}).forEach(t,a)},exports.SourceMapConsumer=e}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define("source-map/source-map-generator",function(require,exports,module){/**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. To create a new one, you must pass an object
   * with the following properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: An optional root for all URLs in this source map.
   */
function e(e){this._file=t.getArg(e,"file"),this._sourceRoot=t.getArg(e,"sourceRoot",null),this._sources=new r,this._names=new r,this._mappings=[],this._sourcesContents=null}var n=require("./base64-vlq"),t=require("./util"),r=require("./array-set").ArraySet;e.prototype._version=3,/**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
e.fromSourceMap=function(n){var r=n.sourceRoot,i=new e({file:n.file,sourceRoot:r});return n.eachMapping(function(e){var n={generated:{line:e.generatedLine,column:e.generatedColumn}};e.source&&(n.source=e.source,r&&(n.source=t.relative(r,n.source)),n.original={line:e.originalLine,column:e.originalColumn},e.name&&(n.name=e.name)),i.addMapping(n)}),n.sources.forEach(function(e){var t=n.sourceContentFor(e);t&&i.setSourceContent(e,t)}),i},/**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
e.prototype.addMapping=function(e){var n=t.getArg(e,"generated"),r=t.getArg(e,"original",null),i=t.getArg(e,"source",null),o=t.getArg(e,"name",null);this._validateMapping(n,r,i,o),i&&!this._sources.has(i)&&this._sources.add(i),o&&!this._names.has(o)&&this._names.add(o),this._mappings.push({generatedLine:n.line,generatedColumn:n.column,originalLine:null!=r&&r.line,originalColumn:null!=r&&r.column,source:i,name:o})},/**
   * Set the source content for a source file.
   */
e.prototype.setSourceContent=function(e,n){var r=e;this._sourceRoot&&(r=t.relative(this._sourceRoot,r)),null!==n?(
// Add the source content to the _sourcesContents map.
// Create a new _sourcesContents map if the property is null.
this._sourcesContents||(this._sourcesContents={}),this._sourcesContents[t.toSetString(r)]=n):(
// Remove the source file from the _sourcesContents map.
// If the _sourcesContents map is empty, set the property to null.
delete this._sourcesContents[t.toSetString(r)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},/**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   */
e.prototype.applySourceMap=function(e,n){
// If aSourceFile is omitted, we will use the file property of the SourceMap
n||(n=e.file);var i=this._sourceRoot;
// Make "aSourceFile" relative if an absolute Url is passed.
i&&(n=t.relative(i,n));
// Applying the SourceMap can add and remove items from the sources and
// the names array.
var o=new r,a=new r;
// Find mappings for the "aSourceFile"
this._mappings.forEach(function(r){if(r.source===n&&r.originalLine){
// Check if it can be mapped by the source map, then update the mapping.
var u=e.originalPositionFor({line:r.originalLine,column:r.originalColumn});null!==u.source&&(
// Copy mapping
r.source=i?t.relative(i,u.source):u.source,r.originalLine=u.line,r.originalColumn=u.column,null!==u.name&&null!==r.name&&(
// Only use the identifier name if it's an identifier
// in both SourceMaps
r.name=u.name))}var s=r.source;s&&!o.has(s)&&o.add(s);var c=r.name;c&&!a.has(c)&&a.add(c)},this),this._sources=o,this._names=a,
// Copy sourcesContents of applied map.
e.sources.forEach(function(n){var r=e.sourceContentFor(n);r&&(i&&(n=t.relative(i,n)),this.setSourceContent(n,r))},this)},/**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
e.prototype._validateMapping=function(e,n,t,r){if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||n||t||r)&&!(e&&"line"in e&&"column"in e&&n&&"line"in n&&"column"in n&&e.line>0&&e.column>=0&&n.line>0&&n.column>=0&&t))throw new Error("Invalid mapping: "+JSON.stringify({generated:e,source:t,original:n,name:r}))},/**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
e.prototype._serializeMappings=function(){var e,r=0,i=1,o=0,a=0,u=0,s=0,c="";
// The mappings must be guaranteed to be in sorted order before we start
// serializing them or else the generated line numbers (which are defined
// via the ';' separators) will be all messed up. Note: it might be more
// performant to maintain the sorting as we insert them, rather than as we
// serialize them, but the big O is the same either way.
this._mappings.sort(t.compareByGeneratedPositions);for(var l=0,f=this._mappings.length;l<f;l++){if(e=this._mappings[l],e.generatedLine!==i)for(r=0;e.generatedLine!==i;)c+=";",i++;else if(l>0){if(!t.compareByGeneratedPositions(e,this._mappings[l-1]))continue;c+=","}c+=n.encode(e.generatedColumn-r),r=e.generatedColumn,e.source&&(c+=n.encode(this._sources.indexOf(e.source)-s),s=this._sources.indexOf(e.source),
// lines are stored 0-based in SourceMap spec version 3
c+=n.encode(e.originalLine-1-a),a=e.originalLine-1,c+=n.encode(e.originalColumn-o),o=e.originalColumn,e.name&&(c+=n.encode(this._names.indexOf(e.name)-u),u=this._names.indexOf(e.name)))}return c},e.prototype._generateSourcesContent=function(e,n){return e.map(function(e){if(!this._sourcesContents)return null;n&&(e=t.relative(n,e));var r=t.toSetString(e);return Object.prototype.hasOwnProperty.call(this._sourcesContents,r)?this._sourcesContents[r]:null},this)},/**
   * Externalize the source map.
   */
e.prototype.toJSON=function(){var e={version:this._version,file:this._file,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},/**
   * Render the source map being generated to a string.
   */
e.prototype.toString=function(){return JSON.stringify(this)},exports.SourceMapGenerator=e}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define("source-map/source-node",function(require,exports,module){/**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
function e(e,n,t,r,i){this.children=[],this.sourceContents={},this.line=void 0===e?null:e,this.column=void 0===n?null:n,this.source=void 0===t?null:t,this.name=void 0===i?null:i,null!=r&&this.add(r)}var n=require("./source-map-generator").SourceMapGenerator,t=require("./util");/**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   */
e.fromStringWithSourceMap=function(n,t){function r(n,t){null===n||void 0===n.source?i.add(t):i.add(new e(n.originalLine,n.originalColumn,n.source,t,n.name))}
// The SourceNode we want to fill with the generated code
// and the SourceMap
var i=new e,o=n.split("\n"),a=1,u=0,s=null;
// We have processed all mappings.
// Associate the remaining code in the current line with "lastMapping"
// and add the remaining lines without any mapping
// Copy sourcesContent into SourceNode
return t.eachMapping(function(e){if(null===s){
// We add the generated code until the first mapping
// to the SourceNode without any mapping.
// Each line is added as separate string.
for(;a<e.generatedLine;)i.add(o.shift()+"\n"),a++;if(u<e.generatedColumn){var n=o[0];i.add(n.substr(0,e.generatedColumn)),o[0]=n.substr(e.generatedColumn),u=e.generatedColumn}}else
// We add the code from "lastMapping" to "mapping":
// First check if there is a new line in between.
if(a<e.generatedLine){var t="";
// Associate full lines with "lastMapping"
do{t+=o.shift()+"\n",a++,u=0}while(a<e.generatedLine);
// When we reached the correct line, we add code until we
// reach the correct column too.
if(u<e.generatedColumn){var n=o[0];t+=n.substr(0,e.generatedColumn),o[0]=n.substr(e.generatedColumn),u=e.generatedColumn}
// Create the SourceNode.
r(s,t)}else{
// There is no new line in between.
// Associate the code between "lastGeneratedColumn" and
// "mapping.generatedColumn" with "lastMapping"
var n=o[0],t=n.substr(0,e.generatedColumn-u);o[0]=n.substr(e.generatedColumn-u),u=e.generatedColumn,r(s,t)}s=e},this),r(s,o.join("\n")),t.sources.forEach(function(e){var n=t.sourceContentFor(e);n&&i.setSourceContent(e,n)}),i},/**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
e.prototype.add=function(n){if(Array.isArray(n))n.forEach(function(e){this.add(e)},this);else{if(!(n instanceof e||"string"==typeof n))throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+n);n&&this.children.push(n)}return this},/**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
e.prototype.prepend=function(n){if(Array.isArray(n))for(var t=n.length-1;t>=0;t--)this.prepend(n[t]);else{if(!(n instanceof e||"string"==typeof n))throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+n);this.children.unshift(n)}return this},/**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
e.prototype.walk=function(n){for(var t,r=0,i=this.children.length;r<i;r++)t=this.children[r],t instanceof e?t.walk(n):""!==t&&n(t,{source:this.source,line:this.line,column:this.column,name:this.name})},/**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
e.prototype.join=function(e){var n,t,r=this.children.length;if(r>0){for(n=[],t=0;t<r-1;t++)n.push(this.children[t]),n.push(e);n.push(this.children[t]),this.children=n}return this},/**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
e.prototype.replaceRight=function(n,t){var r=this.children[this.children.length-1];return r instanceof e?r.replaceRight(n,t):"string"==typeof r?this.children[this.children.length-1]=r.replace(n,t):this.children.push("".replace(n,t)),this},/**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
e.prototype.setSourceContent=function(e,n){this.sourceContents[t.toSetString(e)]=n},/**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
e.prototype.walkSourceContents=function(n){for(var r=0,i=this.children.length;r<i;r++)this.children[r]instanceof e&&this.children[r].walkSourceContents(n);for(var o=Object.keys(this.sourceContents),r=0,i=o.length;r<i;r++)n(t.fromSetString(o[r]),this.sourceContents[o[r]])},/**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
e.prototype.toString=function(){var e="";return this.walk(function(n){e+=n}),e},/**
   * Returns the string representation of this source node along with a source
   * map.
   */
e.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},r=new n(e),i=!1,o=null,a=null,u=null,s=null;return this.walk(function(e,n){t.code+=e,null!==n.source&&null!==n.line&&null!==n.column?(o===n.source&&a===n.line&&u===n.column&&s===n.name||r.addMapping({source:n.source,original:{line:n.line,column:n.column},generated:{line:t.line,column:t.column},name:n.name}),o=n.source,a=n.line,u=n.column,s=n.name,i=!0):i&&(r.addMapping({generated:{line:t.line,column:t.column}}),o=null,i=!1),e.split("").forEach(function(e){"\n"===e?(t.line++,t.column=0):t.column++})}),this.walkSourceContents(function(e,n){r.setSourceContent(e,n)}),{code:t.code,map:r}},exports.SourceNode=e}),/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define("source-map/util",function(require,exports,module){/**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
function e(e,n,t){if(n in e)return e[n];if(3===arguments.length)return t;throw new Error('"'+n+'" is a required argument.')}function n(e){var n=e.match(l);return n?{scheme:n[1],auth:n[3],host:n[4],port:n[6],path:n[7]}:null}function t(e){var n=e.scheme+"://";return e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function r(e,r){var i;return r.match(l)||r.match(f)?r:"/"===r.charAt(0)&&(i=n(e))?(i.path=r,t(i)):e.replace(/\/$/,"")+"/"+r}/**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
function i(e){return"$"+e}function o(e){return e.substr(1)}function a(e,t){e=e.replace(/\/$/,"");var r=n(e);return"/"==t.charAt(0)&&r&&"/"==r.path?t.slice(1):0===t.indexOf(e+"/")?t.substr(e.length+1):t}function u(e,n){var t=e||"",r=n||"";return(t>r)-(t<r)}/**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
function s(e,n,t){var r;return(r=u(e.source,n.source))?r:(r=e.originalLine-n.originalLine)?r:(r=e.originalColumn-n.originalColumn)||t?r:(r=u(e.name,n.name))?r:(r=e.generatedLine-n.generatedLine,r?r:e.generatedColumn-n.generatedColumn)}/**
   * Comparator between two mappings where the generated positions are
   * compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
function c(e,n,t){var r;return(r=e.generatedLine-n.generatedLine)?r:(r=e.generatedColumn-n.generatedColumn)||t?r:(r=u(e.source,n.source))?r:(r=e.originalLine-n.originalLine)?r:(r=e.originalColumn-n.originalColumn,r?r:u(e.name,n.name))}exports.getArg=e;var l=/([\w+\-.]+):\/\/((\w+:\w+)@)?([\w.]+)?(:(\d+))?(\S+)?/,f=/^data:.+\,.+/;exports.urlParse=n,exports.urlGenerate=t,exports.join=r,exports.toSetString=i,exports.fromSetString=o,exports.relative=a,exports.compareByOriginalPositions=s,exports.compareByGeneratedPositions=c}),define("source-map",function(require,exports,module){/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator=require("./source-map/source-map-generator").SourceMapGenerator,exports.SourceMapConsumer=require("./source-map/source-map-consumer").SourceMapConsumer,exports.SourceNode=require("./source-map/source-node").SourceNode}),
//Distributed under the BSD license:
//Copyright 2012 (c) Mihai Bazon <mihai.bazon@gmail.com>
define("uglifyjs2",["exports","source-map","logger","env!env/file"],function(exports,e,n,t){/***********************************************************************

  A JavaScript tokenizer / parser / beautifier / compressor.
  https://github.com/mishoo/UglifyJS2

  -------------------------------- (C) ---------------------------------

                           Author: Mihai Bazon
                         <mihai.bazon@gmail.com>
                       http://mihai.bazon.net/blog

  Distributed under the BSD license:

    Copyright 2012 (c) Mihai Bazon <mihai.bazon@gmail.com>

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/
"use strict";function r(e){for(var n=Object.create(null),t=0;t<e.length;++t)n[e[t]]=!0;return n}function i(e){return e.split("")}function o(e,n){for(var t=n.length;--t>=0;)if(n[t]==e)return!0;return!1}function a(e,n){for(var t=0,r=n.length;t<r;++t)if(e(n[t]))return n[t]}function u(e,n){if(n<=0)return"";if(1==n)return e;var t=u(e,n>>1);return t+=t,1&n&&(t+=e),t}function s(e,n){Error.call(this,e),this.msg=e,this.defs=n}function c(e,n,t){e===!0&&(e={});var r=e||{};if(t)for(var i in r)r.hasOwnProperty(i)&&!n.hasOwnProperty(i)&&s.croak("`"+i+"` is not a supported option",n);for(var i in n)n.hasOwnProperty(i)&&(r[i]=e&&e.hasOwnProperty(i)?e[i]:n[i]);return r}function l(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t]);return e}function f(){}function p(e,n){e.indexOf(n)<0&&e.push(n)}function d(e,n){return e.replace(/\{(.+?)\}/g,function(e,t){return n[t]})}function h(e,n){for(var t=e.length;--t>=0;)e[t]===n&&e.splice(t,1)}function g(e,n){function t(e,t){for(var r=[],i=0,o=0,a=0;i<e.length&&o<t.length;)n(e[i],t[o])<=0?r[a++]=e[i++]:r[a++]=t[o++];return i<e.length&&r.push.apply(r,e.slice(i)),o<t.length&&r.push.apply(r,t.slice(o)),r}function r(e){if(e.length<=1)return e;var n=Math.floor(e.length/2),i=e.slice(0,n),o=e.slice(n);return i=r(i),o=r(o),t(i,o)}return e.length<2?e.slice():r(e)}
// this function is taken from Acorn [1], written by Marijn Haverbeke
// [1] https://github.com/marijnh/acorn
function m(e){function n(e){if(1==e.length)return t+="return str === "+JSON.stringify(e[0])+";";t+="switch(str){";for(var n=0;n<e.length;++n)t+="case "+JSON.stringify(e[n])+":";t+="return true}return false;"}e instanceof Array||(e=e.split(" "));var t="",r=[];e:for(var i=0;i<e.length;++i){for(var o=0;o<r.length;++o)if(r[o][0].length==e[i].length){r[o].push(e[i]);continue e}r.push([e[i]])}
// When there are more than three length categories, an outer
// switch first dispatches on the lengths, to save on comparisons.
if(r.length>3){r.sort(function(e,n){return n.length-e.length}),t+="switch(str.length){";for(var i=0;i<r.length;++i){var a=r[i];t+="case "+a[0].length+":",n(a)}t+="}"}else n(e);return new Function("str",t)}function v(e,n){for(var t=e.length;--t>=0;)if(!n(e[t]))return!1;return!0}function y(){this._values=Object.create(null),this._size=0}function b(e,n,t,r){arguments.length<4&&(r=W),n=n?n.split(/\s+/):[];var i=n;r&&r.PROPS&&(n=n.concat(r.PROPS));for(var o="return function AST_"+e+"(props){ if (props) { ",a=n.length;--a>=0;)o+="this."+n[a]+" = props."+n[a]+";";var u=r&&new r;(u&&u.initialize||t&&t.initialize)&&(o+="this.initialize();"),o+="}}";var s=new Function(o)();if(u&&(s.prototype=u,s.BASE=r),r&&r.SUBCLASSES.push(s),s.prototype.CTOR=s,s.PROPS=n||null,s.SELF_PROPS=i,s.SUBCLASSES=[],e&&(s.prototype.TYPE=s.TYPE=e),t)for(a in t)t.hasOwnProperty(a)&&(/^\$/.test(a)?s[a.substr(1)]=t[a]:s.prototype[a]=t[a]);return s.DEFMETHOD=function(e,n){this.prototype[e]=n},s}function x(e,n){e.body instanceof H?e.body._walk(n):e.body.forEach(function(e){e._walk(n)})}/* -----[ TreeWalker ]----- */
function _(e){this.visit=e,this.stack=[]}function w(e){return e>=97&&e<=122||e>=65&&e<=90||e>=170&&Ln.letter.test(String.fromCharCode(e))}function E(e){return e>=48&&e<=57}function A(e){return E(e)||w(e)}function C(e){return Ln.non_spacing_mark.test(e)||Ln.space_combining_mark.test(e)}function F(e){return Ln.connector_punctuation.test(e)}function S(e){return!Fn(e)&&/^[a-z_$][a-z0-9_$]*$/i.test(e)}function k(e){return 36==e||95==e||w(e)}function D(e){var n=e.charCodeAt(0);return k(n)||E(n)||8204==n||8205==n||C(e)||F(e)}function B(e){var n=e.length;if(0==n)return!1;if(!k(e.charCodeAt(0)))return!1;for(;--n>=0;)if(!D(e.charAt(n)))return!1;return!0}function O(e){return Dn.test(e)?parseInt(e.substr(2),16):Bn.test(e)?parseInt(e.substr(1),8):On.test(e)?parseFloat(e):void 0}function q(e,n,t,r){this.message=e,this.line=n,this.col=t,this.pos=r,this.stack=(new Error).stack}function R(e,n,t,r,i){throw new q(e,t,r,i)}function P(e,n,t){return e.type==n&&(null==t||e.value==t)}function j(e,n,t){function r(){return F.text.charAt(F.pos)}function i(e,n){var t=F.text.charAt(F.pos++);if(e&&!t)throw Nn;return"\n"==t?(F.newline_before=F.newline_before||!n,++F.line,F.col=0):++F.col,t}function o(e){for(;e-- >0;)i()}function a(e){return F.text.substr(F.pos,e.length)==e}function u(e,n){var t=F.text.indexOf(e,F.pos);if(n&&t==-1)throw Nn;return t}function s(){F.tokline=F.line,F.tokcol=F.col,F.tokpos=F.pos}function c(e,t,r){F.regex_allowed="operator"==e&&!Mn(t)||"keyword"==e&&Sn(t)||"punc"==e&&Pn(t),S="punc"==e&&"."==t;var i={type:e,value:t,line:F.tokline,col:F.tokcol,pos:F.tokpos,endpos:F.pos,nlb:F.newline_before,file:n};if(!r){i.comments_before=F.comments_before,F.comments_before=[];
// make note of any newlines in the comments that came before
for(var o=0,a=i.comments_before.length;o<a;o++)i.nlb=i.nlb||i.comments_before[o].nlb}return F.newline_before=!1,new V(i)}function l(){for(;Rn(r());)i()}function f(e){for(var n,t="",o=0;(n=r())&&e(n,o++);)t+=i();return t}function p(e){R(e,n,F.tokline,F.tokcol,F.tokpos)}function d(e){var n=!1,t=!1,r=!1,i="."==e,o=f(function(o,a){var u=o.charCodeAt(0);switch(u){case 120:case 88:// xX
return!r&&(r=!0);case 101:case 69:// eE
return!!r||!n&&(n=t=!0);case 45:// -
return t||0==a&&!e;case 43:// +
return t;case t=!1,46:// .
return!(i||r||n)&&(i=!0)}return A(u)});e&&(o=e+o);var a=O(o);if(!isNaN(a))return c("num",a);p("Invalid syntax: "+o)}function h(e){var n=i(!0,e);switch(n.charCodeAt(0)){case 110:return"\n";case 114:return"\r";case 116:return"\t";case 98:return"\b";case 118:return"\v";// \v
case 102:return"\f";case 48:return"\0";case 120:return String.fromCharCode(g(2));// \x
case 117:return String.fromCharCode(g(4));// \u
case 10:return"";// newline
default:return n}}function g(e){for(var n=0;e>0;--e){var t=parseInt(i(!0),16);isNaN(t)&&p("Invalid hex-character pattern in string"),n=n<<4|t}return n}function m(e){var n,t=F.regex_allowed,r=u("\n");return r==-1?(n=F.text.substr(F.pos),F.pos=F.text.length):(n=F.text.substring(F.pos,r),F.pos=r),F.comments_before.push(c(e,n,!0)),F.regex_allowed=t,C()}function v(){for(var e,n,t=!1,o="",a=!1;null!=(e=r());)if(t)"u"!=e&&p("Expecting UnicodeEscapeSequence -- uXXXX"),e=h(),D(e)||p("Unicode char: "+e.charCodeAt(0)+" is not valid in identifier"),o+=e,t=!1;else if("\\"==e)a=t=!0,i();else{if(!D(e))break;o+=i()}return An(o)&&a&&(n=o.charCodeAt(0).toString(16).toUpperCase(),o="\\u"+"0000".substr(n.length)+n+o.slice(1)),o}function y(e){function n(e){if(!r())return e;var t=e+r();return qn(t)?(i(),n(t)):e}return c("operator",n(e||i()))}function b(){switch(i(),r()){case"/":return i(),m("comment1");case"*":return i(),q()}return F.regex_allowed?P(""):y("/")}function x(){return i(),E(r().charCodeAt(0))?d("."):c("punc",".")}function _(){var e=v();return S?c("name",e):Cn(e)?c("atom",e):An(e)?qn(e)?c("operator",e):c("keyword",e):c("name",e)}function w(e,n){return function(t){try{return n(t)}catch(n){if(n!==Nn)throw n;p(e)}}}function C(e){if(null!=e)return P(e);if(l(),s(),t){if(a("<!--"))return o(4),m("comment3");if(a("-->")&&F.newline_before)return o(3),m("comment4")}var n=r();if(!n)return c("eof");var u=n.charCodeAt(0);switch(u){case 34:case 39:return B();case 46:return x();case 47:return b()}return E(u)?d():jn(n)?c("punc",i()):kn(n)?y():92==u||k(u)?_():void p("Unexpected character '"+n+"'")}var F={text:e.replace(/\r\n?|[\n\u2028\u2029]/g,"\n").replace(/\uFEFF/g,""),filename:n,pos:0,tokpos:0,line:1,tokline:0,col:0,tokcol:0,newline_before:!1,regex_allowed:!1,comments_before:[]},S=!1,B=w("Unterminated string constant",function(){for(var e=i(),n="";;){var t=i(!0);if("\\"==t){
// read OctalEscapeSequence (XXX: deprecated if "strict mode")
// https://github.com/mishoo/UglifyJS/issues/178
var r=0,o=null;t=f(function(e){if(e>="0"&&e<="7"){if(!o)return o=e,++r;if(o<="3"&&r<=2)return++r;if(o>="4"&&r<=1)return++r}return!1}),t=r>0?String.fromCharCode(parseInt(t,8)):h(!0)}else if(t==e)break;n+=t}return c("string",n)}),q=w("Unterminated multiline comment",function(){var e=F.regex_allowed,n=u("*/",!0),t=F.text.substring(F.pos,n),r=t.split("\n"),i=r.length;
// update stream position
F.pos=n+2,F.line+=i-1,i>1?F.col=r[i-1].length:F.col+=r[i-1].length,F.col+=2;var o=F.newline_before=F.newline_before||t.indexOf("\n")>=0;return F.comments_before.push(c("comment2",t,!0)),F.regex_allowed=e,F.newline_before=o,C()}),P=w("Unterminated regular expression",function(e){for(var n,t=!1,r=!1;n=i(!0);)if(t)e+="\\"+n,t=!1;else if("["==n)r=!0,e+=n;else if("]"==n&&r)r=!1,e+=n;else{if("/"==n&&!r)break;"\\"==n?t=!0:e+=n}var o=v();return c("regexp",new RegExp(e,o))});return C.context=function(e){return e&&(F=e),F},C}/* -----[ Parser ]----- */
function L(e,n){function t(e,n){return P(z.token,e,n)}function r(){return z.peeked||(z.peeked=z.input())}function i(){return z.prev=z.token,z.peeked?(z.token=z.peeked,z.peeked=null):z.token=z.input(),z.in_directives=z.in_directives&&("string"==z.token.type||t("punc",";")),z.token}function o(){return z.prev}function u(e,n,t,r){var i=z.input.context();R(e,i.filename,null!=n?n:i.tokline,null!=t?t:i.tokcol,null!=r?r:i.tokpos)}function s(e,n){u(n,e.line,e.col)}function l(e){null==e&&(e=z.token),s(e,"Unexpected token: "+e.type+" ("+e.value+")")}function f(e,n){if(t(e,n))return i();s(z.token,"Unexpected token "+z.token.type+" «"+z.token.value+"», expected "+e+" «"+n+"»")}function p(e){return f("punc",e)}function d(){return!n.strict&&(z.token.nlb||t("eof")||t("punc","}"))}function h(){t("punc",";")?i():d()||l()}function g(){p("(");var e=Me(!0);return p(")"),e}function m(e){return function(){var n=z.token,t=e(),r=o();return t.start=n,t.end=r,t}}function v(){(t("operator","/")||t("operator","/="))&&(z.peeked=null,z.token=z.input(z.token.value.substr(1)))}function y(){var e=N(un);a(function(n){return n.name==e.name},z.labels)&&
// ECMA-262, 12.12: An ECMAScript program is considered
// syntactically incorrect if it contains a
// LabelledStatement that is enclosed by a
// LabelledStatement with the same Identifier as label.
u("Label "+e.name+" defined twice"),p(":"),z.labels.push(e);var n=V();
// check for `continue` that refers to this label.
// those should be reported as syntax errors.
// https://github.com/mishoo/UglifyJS2/issues/287
return z.labels.pop(),n instanceof ne||e.references.forEach(function(n){n instanceof xe&&(n=n.label.start,u("Continue label `"+e.name+"` refers to non-IterationStatement.",n.line,n.col,n.pos))}),new ee({body:n,label:e})}function b(e){return new Y({body:(e=Me(!0),h(),e)})}function x(e){var n,t=null;d()||(t=N(cn,!0)),null!=t?(n=a(function(e){return e.name==t.name},z.labels),n||u("Undefined label "+t.name),t.thedef=n):0==z.in_loop&&u(e.TYPE+" not inside a loop or switch"),h();var r=new e({label:t});return n&&n.references.push(r),r}function _(){p("(");var e=null;return!t("punc",";")&&(e=t("keyword","var")?(i(),H(!0)):Me(!0,!0),t("operator","in"))?(e instanceof Be&&e.definitions.length>1&&u("Only one variable declaration allowed in for..in loop"),i(),E(e)):w(e)}function w(e){p(";");var n=t("punc",";")?null:Me(!0);p(";");var r=t("punc",")")?null:Me(!0);return p(")"),new oe({init:e,condition:n,step:r,body:U(V)})}function E(e){var n=e instanceof Be?e.definitions[0].name:null,t=Me(!0);return p(")"),new ae({init:e,name:n,object:t,body:U(V)})}function A(){var e=g(),n=V(),r=null;return t("keyword","else")&&(i(),r=V()),new _e({condition:e,body:n,alternative:r})}function C(){p("{");for(var e=[];!t("punc","}");)t("eof")&&l(),e.push(V());return i(),e}function F(){p("{");for(var e,n=[],r=null,a=null;!t("punc","}");)t("eof")&&l(),t("keyword","case")?(a&&(a.end=o()),r=[],a=new Ce({start:(e=z.token,i(),e),expression:Me(!0),body:r}),n.push(a),p(":")):t("keyword","default")?(a&&(a.end=o()),r=[],a=new Ae({start:(e=z.token,i(),p(":"),e),body:r}),n.push(a)):(r||l(),r.push(V()));return a&&(a.end=o()),i(),n}function S(){var e=C(),n=null,r=null;if(t("keyword","catch")){var a=z.token;i(),p("(");var s=N(an);p(")"),n=new Se({start:a,argname:s,body:C(),end:o()})}if(t("keyword","finally")){var a=z.token;i(),r=new ke({start:a,body:C(),end:o()})}return n||r||u("Missing catch/finally blocks"),new Fe({body:e,bcatch:n,bfinally:r})}function k(e,n){for(var r=[];r.push(new qe({start:z.token,name:N(n?nn:en),value:t("operator","=")?(i(),Me(!1,e)):null,end:o()})),t("punc",",");)i();return r}function D(){var e,n=z.token;switch(n.type){case"name":case"keyword":e=L(sn);break;case"num":e=new dn({start:n,end:n,value:n.value});break;case"string":e=new pn({start:n,end:n,value:n.value});break;case"regexp":e=new hn({start:n,end:n,value:n.value});break;case"atom":switch(n.value){case"false":e=new wn({start:n,end:n});break;case"true":e=new En({start:n,end:n});break;case"null":e=new mn({start:n,end:n})}}return i(),e}function B(e,n,r){for(var o=!0,a=[];!t("punc",e)&&(o?o=!1:p(","),!n||!t("punc",e));)t("punc",",")&&r?a.push(new bn({start:z.token,end:z.token})):a.push(Me(!1));return i(),a}function O(){var e=z.token;switch(i(),e.type){case"num":case"string":case"name":case"operator":case"keyword":case"atom":return e.value;default:l()}}function q(){var e=z.token;switch(i(),e.type){case"name":case"operator":case"keyword":case"atom":return e.value;default:l()}}function L(e){var n=z.token.value;return new("this"==n?ln:e)({name:String(n),start:z.token,end:z.token})}function N(e,n){if(!t("name"))return n||u("Name expected"),null;var r=L(e);return i(),r}function T(e,n,t){return"++"!=n&&"--"!=n||I(t)||u("Invalid use of "+n+" operator"),new e({operator:n,expression:t})}function M(e){return ye(ge(!0),0,e)}function I(e){return!n.strict||!(e instanceof ln)&&(e instanceof Le||e instanceof Ke)}function U(e){++z.in_loop;var n=e();return--z.in_loop,n}n=c(n,{strict:!1,filename:null,toplevel:null,expression:!1,html5_comments:!0});var z={input:"string"==typeof e?j(e,n.filename,n.html5_comments):e,token:null,prev:null,peeked:null,in_function:0,in_directives:!0,in_loop:0,labels:[]};z.token=i();var V=m(function(){var e;switch(v(),z.token.type){case"string":var n=z.in_directives,a=b();
// XXXv2: decide how to fix directives
// XXXv2: decide how to fix directives
return n&&a.body instanceof pn&&!t("punc",",")?new J({value:a.body.value}):a;case"num":case"regexp":case"operator":case"atom":return b();case"name":return P(r(),"punc",":")?y():b();case"punc":switch(z.token.value){case"{":return new K({start:z.token,body:C(),end:o()});case"[":case"(":return b();case";":return i(),new Q;default:l()}case"keyword":switch(e=z.token.value,i(),e){case"break":return x(be);case"continue":return x(xe);case"debugger":return h(),new G;case"do":return new re({body:U(V),condition:(f("keyword","while"),e=g(),h(),e)});case"while":return new ie({condition:g(),body:U(V)});case"for":return _();case"function":return W(de);case"if":return A();case"return":return 0==z.in_function&&u("'return' outside of function"),new me({value:t("punc",";")?(i(),null):d()?null:(e=Me(!0),h(),e)});case"switch":return new we({expression:g(),body:U(F)});case"throw":return z.token.nlb&&u("Illegal newline after 'throw'"),new ve({value:(e=Me(!0),h(),e)});case"try":return S();case"var":return e=H(),h(),e;case"const":return e=X(),h(),e;case"with":return new ue({expression:g(),body:V()});default:l()}}}),W=function(e){var n=e===de,r=t("name")?N(n?rn:on):null;return n&&!r&&l(),p("("),new e({name:r,argnames:function(e,n){for(;!t("punc",")");)e?e=!1:p(","),n.push(N(tn));return i(),n}(!0,[]),body:function(e,n){++z.in_function,z.in_directives=!0,z.in_loop=0,z.labels=[];var t=C();return--z.in_function,z.in_loop=e,z.labels=n,t}(z.in_loop,z.labels)})},H=function(e){return new Be({start:o(),definitions:k(e,!1),end:o()})},X=function(){return new Oe({start:o(),definitions:k(!1,!0),end:o()})},Z=function(){var e=z.token;f("operator","new");var n,r=te(!1);return t("punc","(")?(i(),n=B(")")):n=[],he(new Pe({start:e,expression:r,args:n,end:o()}),!0)},te=function(e){if(t("operator","new"))return Z();var n=z.token;if(t("punc")){switch(n.value){case"(":i();var r=Me(!0);return r.start=n,r.end=z.token,p(")"),he(r,e);case"[":return he(se(),e);case"{":return he(le(),e)}l()}if(t("keyword","function")){i();var a=W(pe);return a.start=n,a.end=o(),he(a,e)}if($n[z.token.type])return he(D(),e);l()},se=m(function(){return p("["),new We({elements:B("]",!n.strict,!0)})}),le=m(function(){p("{");for(var e=!0,r=[];!t("punc","}")&&(e?e=!1:p(","),n.strict||!t("punc","}"));){var a=z.token,u=a.type,s=O();if("name"==u&&!t("punc",":")){if("get"==s){r.push(new Xe({start:a,key:D(),value:W(fe),end:o()}));continue}if("set"==s){r.push(new Ye({start:a,key:D(),value:W(fe),end:o()}));continue}}p(":"),r.push(new Je({start:a,key:s,value:Me(!1),end:o()}))}return i(),new He({properties:r})}),he=function(e,n){var r=e.start;if(t("punc","."))return i(),he(new Ne({start:r,expression:e,property:q(),end:o()}),n);if(t("punc","[")){i();var a=Me(!0);return p("]"),he(new Te({start:r,expression:e,property:a,end:o()}),n)}return n&&t("punc","(")?(i(),he(new Re({start:r,expression:e,args:B(")"),end:o()}),!0)):e},ge=function(e){var n=z.token;if(t("operator")&&Tn(n.value)){i(),v();var r=T(Ie,n.value,ge(e));return r.start=n,r.end=o(),r}for(var a=te(e);t("operator")&&Mn(z.token.value)&&!z.token.nlb;)a=T(Ue,z.token.value,a),a.start=n,a.end=z.token,i();return a},ye=function(e,n,r){var o=t("operator")?z.token.value:null;"in"==o&&r&&(o=null);var a=null!=o?Un[o]:null;if(null!=a&&a>n){i();var u=ye(ge(!0),a,r);return ye(new $e({start:e.start,left:e,operator:o,right:u,end:u.end}),n,r)}return e},Ee=function(e){var n=z.token,r=M(e);if(t("operator","?")){i();var a=Me(!1);return p(":"),new ze({start:n,condition:r,consequent:a,alternative:Me(!1,e),end:o()})}return r},De=function(e){var n=z.token,r=Ee(e),a=z.token.value;if(t("operator")&&In(a)){if(I(r))return i(),new Ve({start:n,left:r,operator:a,right:De(e),end:o()});u("Invalid assignment")}return r},Me=function(e,n){var o=z.token,a=De(n);return e&&t("punc",",")?(i(),new je({start:o,car:a,cdr:Me(!0,n),end:r()})):a};return n.expression?Me(!0):function(){for(var e=z.token,r=[];!t("eof");)r.push(V());var i=o(),a=n.toplevel;return a?(a.body=a.body.concat(r),a.end=i):a=new ce({start:e,body:r,end:i}),a}()}
// Tree transformer helpers.
function N(e,n){_.call(this),this.before=e,this.after=n}function T(e,n,t){this.name=t.name,this.orig=[t],this.scope=e,this.references=[],this.global=!1,this.mangled_name=null,this.undeclared=!1,this.constant=!1,this.index=n}function M(e){function n(e,n){return e.replace(/[\u0080-\uffff]/g,function(e){var t=e.charCodeAt(0).toString(16);if(t.length<=2&&!n){for(;t.length<2;)t="0"+t;return"\\x"+t}for(;t.length<4;)t="0"+t;return"\\u"+t})}function t(t){var r=0,i=0;return t=t.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g,function(e){switch(e){case"\\":return"\\\\";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";case'"':return++r,'"';case"'":return++i,"'";case"\0":return"\\x00"}return e}),e.ascii_only&&(t=n(t)),r>i?"'"+t.replace(/\x27/g,"\\'")+"'":'"'+t.replace(/\x22/g,'\\"')+'"'}function r(n){var r=t(n);return e.inline_script&&(r=r.replace(/<\x2fscript([>\/\t\n\f\r ])/gi,"<\\/script$1")),r}function i(t){return t=t.toString(),e.ascii_only&&(t=n(t,!0)),t}function o(n){return u(" ",e.indent_start+_-n*e.indent_level)}function a(){return k.charAt(k.length-1)}function s(){e.max_line_len&&w>e.max_line_len&&l("\n")}function l(n){n=String(n);var t=n.charAt(0);if(S&&(t&&!(";}".indexOf(t)<0)||/[;]$/.test(k)||(e.semicolons||B(t)?(C+=";",w++,A++):(C+="\n",A++,E++,w=0),e.beautify||(F=!1)),S=!1,s()),!e.beautify&&e.preserve_line&&N[N.length-1])for(var r=N[N.length-1].start.line;E<r;)C+="\n",A++,E++,w=0,F=!1;if(F){var i=a();(D(i)&&(D(t)||"\\"==t)||/^[\+\-\/]$/.test(t)&&t==i)&&(C+=" ",w++,A++),F=!1}var o=n.split(/\r?\n/),u=o.length-1;E+=u,0==u?w+=o[u].length:w=o[u].length,A+=n.length,k=n,C+=n}function p(){S=!1,l(";")}function d(){return _+e.indent_level}function h(e){var n;return l("{"),P(),R(d(),function(){n=e()}),q(),l("}"),n}function g(e){l("(");
//XXX: still nice to have that for argument lists
//var ret = with_indent(current_col, cont);
var n=e();return l(")"),n}function v(e){l("[");
//var ret = with_indent(current_col, cont);
var n=e();return l("]"),n}function y(){l(","),O()}function b(){l(":"),e.space_colon&&O()}function x(){return C}e=c(e,{indent_start:0,indent_level:4,quote_keys:!1,space_colon:!0,ascii_only:!1,unescape_regexps:!1,inline_script:!1,width:80,max_line_len:32e3,beautify:!1,source_map:null,bracketize:!1,semicolons:!0,comments:!1,preserve_line:!1,screw_ie8:!1,preamble:null},!0);var _=0,w=0,E=1,A=0,C="",F=!1,S=!1,k=null,B=m("( [ + * / - , ."),O=e.beautify?function(){l(" ")}:function(){F=!0},q=e.beautify?function(n){e.beautify&&l(o(n?.5:0))}:f,R=e.beautify?function(e,n){e===!0&&(e=d());var t=_;_=e;var r=n();return _=t,r}:function(e,n){return n()},P=e.beautify?function(){l("\n")}:f,j=e.beautify?function(){l(";")}:function(){S=!0},L=e.source_map?function(n,t){try{n&&e.source_map.add(n.file||"?",E,w,n.line,n.col,t||"name"!=n.type?t:n.value)}catch(e){W.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]",{file:n.file,line:n.line,col:n.col,cline:E,ccol:w,name:t||""})}}:f;e.preamble&&l(e.preamble.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g,"\n"));var N=[];return{get:x,toString:x,indent:q,indentation:function(){return _},current_width:function(){return w-_},should_break:function(){return e.width&&this.current_width()>=e.width},newline:P,print:l,space:O,comma:y,colon:b,last:function(){return k},semicolon:j,force_semicolon:p,to_ascii:n,print_name:function(e){l(i(e))},print_string:function(e){l(r(e))},next_indent:d,with_indent:R,with_block:h,with_parens:g,with_square:v,add_mapping:L,option:function(n){return e[n]},line:function(){return E},col:function(){return w},pos:function(){return A},push_node:function(e){N.push(e)},pop_node:function(){return N.pop()},stack:function(){return N},parent:function(e){return N[N.length-2-(e||0)]}}}function I(e,n){if(!(this instanceof I))return new I(e,n);N.call(this,this.before,this.after),this.options=c(e,{sequences:!n,properties:!n,dead_code:!n,drop_debugger:!n,unsafe:!1,unsafe_comps:!1,conditionals:!n,comparisons:!n,evaluate:!n,booleans:!n,loops:!n,unused:!n,hoist_funs:!n,hoist_vars:!1,if_return:!n,join_vars:!n,cascade:!n,side_effects:!n,pure_getters:!1,pure_funcs:null,negate_iife:!n,screw_ie8:!1,drop_console:!1,angular:!1,warnings:!0,global_defs:{}},!0)}
// a small wrapper around fitzgen's source-map library
function U(n){function t(e,t,o,a,u,s){if(i){var c=i.originalPositionFor({line:a,column:u});e=c.source,a=c.line,u=c.column,s=c.name}r.addMapping({generated:{line:t+n.dest_line_diff,column:o},original:{line:a+n.orig_line_diff,column:u},source:e,name:s})}n=c(n,{file:null,root:null,orig:null,orig_line_diff:0,dest_line_diff:0});var r=new e.SourceMapGenerator({file:n.file,sourceRoot:n.root}),i=n.orig&&new e.SourceMapConsumer(n.orig);return{add:t,get:function(){return r},toString:function(){return r.toString()}}}s.prototype=Object.create(Error.prototype),s.prototype.constructor=s,s.croak=function(e,n){throw new s(e,n)};var z=function(){function e(e,o,a){function u(){var u=o(e[s],s),f=u instanceof r;return f&&(u=u.v),u instanceof n?(u=u.v,u instanceof t?l.push.apply(l,a?u.v.slice().reverse():u.v):l.push(u)):u!==i&&(u instanceof t?c.push.apply(c,a?u.v.slice().reverse():u.v):c.push(u)),f}var s,c=[],l=[];if(e instanceof Array)if(a){for(s=e.length;--s>=0&&!u(););c.reverse(),l.reverse()}else for(s=0;s<e.length&&!u();++s);else for(s in e)if(e.hasOwnProperty(s)&&u())break;return l.concat(c)}function n(e){this.v=e}function t(e){this.v=e}function r(e){this.v=e}e.at_top=function(e){return new n(e)},e.splice=function(e){return new t(e)},e.last=function(e){return new r(e)};var i=e.skip={};return e}();y.prototype={set:function(e,n){return this.has(e)||++this._size,this._values["$"+e]=n,this},add:function(e,n){return this.has(e)?this.get(e).push(n):this.set(e,[n]),this},get:function(e){return this._values["$"+e]},del:function(e){return this.has(e)&&(--this._size,delete this._values["$"+e]),this},has:function(e){return"$"+e in this._values},each:function(e){for(var n in this._values)e(this._values[n],n.substr(1))},size:function(){return this._size},map:function(e){var n=[];for(var t in this._values)n.push(e(this._values[t],t.substr(1)));return n}};var V=b("Token","type value line col pos endpos nlb comments_before file",{},null),W=b("Node","start end",{clone:function(){return new this.CTOR(this)},$documentation:"Base class of all AST nodes",$propdoc:{start:"[AST_Token] The first token of this node",end:"[AST_Token] The last token of this node"},_walk:function(e){return e._visit(this)},walk:function(e){return this._walk(e)}},null);W.warn_function=null,W.warn=function(e,n){W.warn_function&&W.warn_function(d(e,n))};/* -----[ statements ]----- */
var H=b("Statement",null,{$documentation:"Base class of all statements"}),G=b("Debugger",null,{$documentation:"Represents a debugger statement"},H),J=b("Directive","value scope",{$documentation:'Represents a directive, like "use strict";',$propdoc:{value:"[string] The value of this directive as a plain string (it's not an AST_String!)",scope:"[AST_Scope/S] The scope that this directive affects"}},H),Y=b("SimpleStatement","body",{$documentation:"A statement consisting of an expression, i.e. a = 1 + 2",$propdoc:{body:"[AST_Node] an expression node (should not be instanceof AST_Statement)"},_walk:function(e){return e._visit(this,function(){this.body._walk(e)})}},H),X=b("Block","body",{$documentation:"A body of statements (usually bracketed)",$propdoc:{body:"[AST_Statement*] an array of statements"},_walk:function(e){return e._visit(this,function(){x(this,e)})}},H),K=b("BlockStatement",null,{$documentation:"A block statement"},X),Q=b("EmptyStatement",null,{$documentation:"The empty statement (empty block or simply a semicolon)",_walk:function(e){return e._visit(this)}},H),Z=b("StatementWithBody","body",{$documentation:"Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",$propdoc:{body:"[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"},_walk:function(e){return e._visit(this,function(){this.body._walk(e)})}},H),ee=b("LabeledStatement","label",{$documentation:"Statement with a label",$propdoc:{label:"[AST_Label] a label definition"},_walk:function(e){return e._visit(this,function(){this.label._walk(e),this.body._walk(e)})}},Z),ne=b("IterationStatement",null,{$documentation:"Internal class.  All loops inherit from it."},Z),te=b("DWLoop","condition",{$documentation:"Base class for do/while statements",$propdoc:{condition:"[AST_Node] the loop condition.  Should not be instanceof AST_Statement"},_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.body._walk(e)})}},ne),re=b("Do",null,{$documentation:"A `do` statement"},te),ie=b("While",null,{$documentation:"A `while` statement"},te),oe=b("For","init condition step",{$documentation:"A `for` statement",$propdoc:{init:"[AST_Node?] the `for` initialization code, or null if empty",condition:"[AST_Node?] the `for` termination clause, or null if empty",step:"[AST_Node?] the `for` update clause, or null if empty"},_walk:function(e){return e._visit(this,function(){this.init&&this.init._walk(e),this.condition&&this.condition._walk(e),this.step&&this.step._walk(e),this.body._walk(e)})}},ne),ae=b("ForIn","init name object",{$documentation:"A `for ... in` statement",$propdoc:{init:"[AST_Node] the `for/in` initialization code",name:"[AST_SymbolRef?] the loop variable, only if `init` is AST_Var",object:"[AST_Node] the object that we're looping through"},_walk:function(e){return e._visit(this,function(){this.init._walk(e),this.object._walk(e),this.body._walk(e)})}},ne),ue=b("With","expression",{$documentation:"A `with` statement",$propdoc:{expression:"[AST_Node] the `with` expression"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),this.body._walk(e)})}},Z),se=b("Scope","directives variables functions uses_with uses_eval parent_scope enclosed cname",{$documentation:"Base class for all statements introducing a lexical scope",$propdoc:{directives:"[string*/S] an array of directives declared in this scope",variables:"[Object/S] a map of name -> SymbolDef for all variables/functions defined in this scope",functions:"[Object/S] like `variables`, but only lists function declarations",uses_with:"[boolean/S] tells whether this scope uses the `with` statement",uses_eval:"[boolean/S] tells whether this scope contains a direct call to the global `eval`",parent_scope:"[AST_Scope?/S] link to the parent scope",enclosed:"[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",cname:"[integer/S] current index for mangling variables (used internally by the mangler)"}},X),ce=b("Toplevel","globals",{$documentation:"The toplevel scope",$propdoc:{globals:"[Object/S] a map of name -> SymbolDef for all undeclared names"},wrap_enclose:function(e){var n=this,t=[],r=[];e.forEach(function(e){var n=e.split(":");t.push(n[0]),r.push(n[1])});var i="(function("+r.join(",")+"){ '$ORIG'; })("+t.join(",")+")";return i=L(i),i=i.transform(new N(function(e){if(e instanceof J&&"$ORIG"==e.value)return z.splice(n.body)}))},wrap_commonjs:function(e,n){var t=this,r=[];n&&(t.figure_out_scope(),t.walk(new _(function(e){e instanceof Ze&&e.definition().global&&(a(function(n){return n.name==e.name},r)||r.push(e))})));var i="(function(exports, global){ global['"+e+"'] = exports; '$ORIG'; '$EXPORTS'; }({}, (function(){return this}())))";return i=L(i),i=i.transform(new N(function(e){if(e instanceof Y&&(e=e.body)instanceof pn)switch(e.getValue()){case"$ORIG":return z.splice(t.body);case"$EXPORTS":var n=[];return r.forEach(function(e){n.push(new Y({body:new Ve({left:new Te({expression:new sn({name:"exports"}),property:new pn({value:e.name})}),operator:"=",right:new sn(e)})}))}),z.splice(n)}}))}},se),le=b("Lambda","name argnames uses_arguments",{$documentation:"Base class for functions",$propdoc:{name:"[AST_SymbolDeclaration?] the name of this function",argnames:"[AST_SymbolFunarg*] array of function arguments",uses_arguments:"[boolean/S] tells whether this function accesses the arguments array"},_walk:function(e){return e._visit(this,function(){this.name&&this.name._walk(e),this.argnames.forEach(function(n){n._walk(e)}),x(this,e)})}},se),fe=b("Accessor",null,{$documentation:"A setter/getter function.  The `name` property is always null."},le),pe=b("Function",null,{$documentation:"A function expression"},le),de=b("Defun",null,{$documentation:"A function definition"},le),he=b("Jump",null,{$documentation:"Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"},H),ge=b("Exit","value",{$documentation:"Base class for “exits” (`return` and `throw`)",$propdoc:{value:"[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"},_walk:function(e){return e._visit(this,this.value&&function(){this.value._walk(e)})}},he),me=b("Return",null,{$documentation:"A `return` statement"},ge),ve=b("Throw",null,{$documentation:"A `throw` statement"},ge),ye=b("LoopControl","label",{$documentation:"Base class for loop control statements (`break` and `continue`)",$propdoc:{label:"[AST_LabelRef?] the label, or null if none"},_walk:function(e){return e._visit(this,this.label&&function(){this.label._walk(e)})}},he),be=b("Break",null,{$documentation:"A `break` statement"},ye),xe=b("Continue",null,{$documentation:"A `continue` statement"},ye),_e=b("If","condition alternative",{$documentation:"A `if` statement",$propdoc:{condition:"[AST_Node] the `if` condition",alternative:"[AST_Statement?] the `else` part, or null if not present"},_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.body._walk(e),this.alternative&&this.alternative._walk(e)})}},Z),we=b("Switch","expression",{$documentation:"A `switch` statement",$propdoc:{expression:"[AST_Node] the `switch` “discriminant”"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),x(this,e)})}},X),Ee=b("SwitchBranch",null,{$documentation:"Base class for `switch` branches"},X),Ae=b("Default",null,{$documentation:"A `default` switch branch"},Ee),Ce=b("Case","expression",{$documentation:"A `case` switch branch",$propdoc:{expression:"[AST_Node] the `case` expression"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),x(this,e)})}},Ee),Fe=b("Try","bcatch bfinally",{$documentation:"A `try` statement",$propdoc:{bcatch:"[AST_Catch?] the catch block, or null if not present",bfinally:"[AST_Finally?] the finally block, or null if not present"},_walk:function(e){return e._visit(this,function(){x(this,e),this.bcatch&&this.bcatch._walk(e),this.bfinally&&this.bfinally._walk(e)})}},X),Se=b("Catch","argname",{$documentation:"A `catch` node; only makes sense as part of a `try` statement",$propdoc:{argname:"[AST_SymbolCatch] symbol for the exception"},_walk:function(e){return e._visit(this,function(){this.argname._walk(e),x(this,e)})}},X),ke=b("Finally",null,{$documentation:"A `finally` node; only makes sense as part of a `try` statement"},X),De=b("Definitions","definitions",{$documentation:"Base class for `var` or `const` nodes (variable declarations/initializations)",$propdoc:{definitions:"[AST_VarDef*] array of variable definitions"},_walk:function(e){return e._visit(this,function(){this.definitions.forEach(function(n){n._walk(e)})})}},H),Be=b("Var",null,{$documentation:"A `var` statement"},De),Oe=b("Const",null,{$documentation:"A `const` statement"},De),qe=b("VarDef","name value",{$documentation:"A variable declaration; only appears in a AST_Definitions node",$propdoc:{name:"[AST_SymbolVar|AST_SymbolConst] name of the variable",value:"[AST_Node?] initializer, or null of there's no initializer"},_walk:function(e){return e._visit(this,function(){this.name._walk(e),this.value&&this.value._walk(e)})}}),Re=b("Call","expression args",{$documentation:"A function call expression",$propdoc:{expression:"[AST_Node] expression to invoke as function",args:"[AST_Node*] array of arguments"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),this.args.forEach(function(n){n._walk(e)})})}}),Pe=b("New",null,{$documentation:"An object instantiation.  Derives from a function call since it has exactly the same properties"},Re),je=b("Seq","car cdr",{$documentation:"A sequence expression (two comma-separated expressions)",$propdoc:{car:"[AST_Node] first element in sequence",cdr:"[AST_Node] second element in sequence"},$cons:function(e,n){var t=new je(e);return t.car=e,t.cdr=n,t},$from_array:function(e){if(0==e.length)return null;if(1==e.length)return e[0].clone();for(var n=null,t=e.length;--t>=0;)n=je.cons(e[t],n);for(var r=n;r;){if(r.cdr&&!r.cdr.cdr){r.cdr=r.cdr.car;break}r=r.cdr}return n},to_array:function(){for(var e=this,n=[];e;){if(n.push(e.car),e.cdr&&!(e.cdr instanceof je)){n.push(e.cdr);break}e=e.cdr}return n},add:function(e){for(var n=this;n;){if(!(n.cdr instanceof je)){var t=je.cons(n.cdr,e);return n.cdr=t}n=n.cdr}},_walk:function(e){return e._visit(this,function(){this.car._walk(e),this.cdr&&this.cdr._walk(e)})}}),Le=b("PropAccess","expression property",{$documentation:'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`',$propdoc:{expression:"[AST_Node] the “container” expression",property:"[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"}}),Ne=b("Dot",null,{$documentation:"A dotted property access expression",_walk:function(e){return e._visit(this,function(){this.expression._walk(e)})}},Le),Te=b("Sub",null,{$documentation:'Index-style property access, i.e. `a["foo"]`',_walk:function(e){return e._visit(this,function(){this.expression._walk(e),this.property._walk(e)})}},Le),Me=b("Unary","operator expression",{$documentation:"Base class for unary expressions",$propdoc:{operator:"[string] the operator",expression:"[AST_Node] expression that this unary operator applies to"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e)})}}),Ie=b("UnaryPrefix",null,{$documentation:"Unary prefix expression, i.e. `typeof i` or `++i`"},Me),Ue=b("UnaryPostfix",null,{$documentation:"Unary postfix expression, i.e. `i++`"},Me),$e=b("Binary","left operator right",{$documentation:"Binary expression, i.e. `a + b`",$propdoc:{left:"[AST_Node] left-hand side expression",operator:"[string] the operator",right:"[AST_Node] right-hand side expression"},_walk:function(e){return e._visit(this,function(){this.left._walk(e),this.right._walk(e)})}}),ze=b("Conditional","condition consequent alternative",{$documentation:"Conditional expression using the ternary operator, i.e. `a ? b : c`",$propdoc:{condition:"[AST_Node]",consequent:"[AST_Node]",alternative:"[AST_Node]"},_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.consequent._walk(e),this.alternative._walk(e)})}}),Ve=b("Assign",null,{$documentation:"An assignment expression — `a = b + 5`"},$e),We=b("Array","elements",{$documentation:"An array literal",$propdoc:{elements:"[AST_Node*] array of elements"},_walk:function(e){return e._visit(this,function(){this.elements.forEach(function(n){n._walk(e)})})}}),He=b("Object","properties",{$documentation:"An object literal",$propdoc:{properties:"[AST_ObjectProperty*] array of properties"},_walk:function(e){return e._visit(this,function(){this.properties.forEach(function(n){n._walk(e)})})}}),Ge=b("ObjectProperty","key value",{$documentation:"Base class for literal object properties",$propdoc:{key:"[string] the property name converted to a string for ObjectKeyVal.  For setters and getters this is an arbitrary AST_Node.",value:"[AST_Node] property value.  For setters and getters this is an AST_Function."},_walk:function(e){return e._visit(this,function(){this.value._walk(e)})}}),Je=b("ObjectKeyVal",null,{$documentation:"A key: value object property"},Ge),Ye=b("ObjectSetter",null,{$documentation:"An object setter property"},Ge),Xe=b("ObjectGetter",null,{$documentation:"An object getter property"},Ge),Ke=b("Symbol","scope name thedef",{$propdoc:{name:"[string] name of this symbol",scope:"[AST_Scope/S] the current scope (not necessarily the definition scope)",thedef:"[SymbolDef/S] the definition of this symbol"},$documentation:"Base class for all symbols"}),Qe=b("SymbolAccessor",null,{$documentation:"The name of a property accessor (setter/getter function)"},Ke),Ze=b("SymbolDeclaration","init",{$documentation:"A declaration symbol (symbol in var/const, function name or argument, symbol in catch)",$propdoc:{init:"[AST_Node*/S] array of initializers for this declaration."}},Ke),en=b("SymbolVar",null,{$documentation:"Symbol defining a variable"},Ze),nn=b("SymbolConst",null,{$documentation:"A constant declaration"},Ze),tn=b("SymbolFunarg",null,{$documentation:"Symbol naming a function argument"},en),rn=b("SymbolDefun",null,{$documentation:"Symbol defining a function"},Ze),on=b("SymbolLambda",null,{$documentation:"Symbol naming a function expression"},Ze),an=b("SymbolCatch",null,{$documentation:"Symbol naming the exception in catch"},Ze),un=b("Label","references",{$documentation:"Symbol naming a label (declaration)",$propdoc:{references:"[AST_LoopControl*] a list of nodes referring to this label"},initialize:function(){this.references=[],this.thedef=this}},Ke),sn=b("SymbolRef",null,{$documentation:"Reference to some symbol (not definition/declaration)"},Ke),cn=b("LabelRef",null,{$documentation:"Reference to a label symbol"},Ke),ln=b("This",null,{$documentation:"The `this` symbol"},Ke),fn=b("Constant",null,{$documentation:"Base class for all constants",getValue:function(){return this.value}}),pn=b("String","value",{$documentation:"A string literal",$propdoc:{value:"[string] the contents of this string"}},fn),dn=b("Number","value",{$documentation:"A number literal",$propdoc:{value:"[number] the numeric value"}},fn),hn=b("RegExp","value",{$documentation:"A regexp literal",$propdoc:{value:"[RegExp] the actual regexp"}},fn),gn=b("Atom",null,{$documentation:"Base class for atoms"},fn),mn=b("Null",null,{$documentation:"The `null` atom",value:null},gn),vn=b("NaN",null,{$documentation:"The impossible value",value:NaN},gn),yn=b("Undefined",null,{$documentation:"The `undefined` value",value:void 0},gn),bn=b("Hole",null,{$documentation:"A hole in an array",value:void 0},gn),xn=b("Infinity",null,{$documentation:"The `Infinity` value",value:1/0},gn),_n=b("Boolean",null,{$documentation:"Base class for booleans"},gn),wn=b("False",null,{$documentation:"The `false` atom",value:!1},_n),En=b("True",null,{$documentation:"The `true` atom",value:!0},_n);_.prototype={_visit:function(e,n){this.stack.push(e);var t=this.visit(e,n?function(){n.call(e)}:f);return!t&&n&&n.call(e),this.stack.pop(),t},parent:function(e){return this.stack[this.stack.length-2-(e||0)]},push:function(e){this.stack.push(e)},pop:function(){return this.stack.pop()},self:function(){return this.stack[this.stack.length-1]},find_parent:function(e){for(var n=this.stack,t=n.length;--t>=0;){var r=n[t];if(r instanceof e)return r}},has_directive:function(e){return this.find_parent(se).has_directive(e)},in_boolean_context:function(){for(var e=this.stack,n=e.length,t=e[--n];n>0;){var r=e[--n];if(r instanceof _e&&r.condition===t||r instanceof ze&&r.condition===t||r instanceof te&&r.condition===t||r instanceof oe&&r.condition===t||r instanceof Ie&&"!"==r.operator&&r.expression===t)return!0;if(!(r instanceof $e)||"&&"!=r.operator&&"||"!=r.operator)return!1;t=r}},loopcontrol_target:function(e){var n=this.stack;if(e)for(var t=n.length;--t>=0;){var r=n[t];if(r instanceof ee&&r.label.name==e.name)return r.body}else for(var t=n.length;--t>=0;){var r=n[t];if(r instanceof we||r instanceof ne)return r}}};var An="break case catch const continue debugger default delete do else finally for function if in instanceof new return switch throw try typeof var void while with",Cn="false null true",Fn="abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized this throws transient volatile yield "+Cn+" "+An,Sn="return new delete throw else case";An=m(An),Fn=m(Fn),Sn=m(Sn),Cn=m(Cn);var kn=m(i("+-*&%=<>!?|~^")),Dn=/^0x[0-9a-f]+$/i,Bn=/^0[0-7]+$/,On=/^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,qn=m(["in","instanceof","typeof","new","void","delete","++","--","+","-","!","~","&","|","^","*","/","%",">>","<<",">>>","<",">","<=",">=","==","===","!=","!==","?","=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&=","&&","||"]),Rn=m(i("  \n\r\t\f\v​᠎             　")),Pn=m(i("[{(,.;:")),jn=m(i("[]{}(),;:")),Ln=(m(i("gmsiy")),{letter:new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),non_spacing_mark:new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),space_combining_mark:new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),connector_punctuation:new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")});q.prototype.toString=function(){return this.message+" (line: "+this.line+", col: "+this.col+", pos: "+this.pos+")\n\n"+this.stack};var Nn={},Tn=m(["typeof","void","delete","--","++","!","~","-","+"]),Mn=m(["--","++"]),In=m(["=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&="]),Un=function(e,n){for(var t=0;t<e.length;++t)for(var r=e[t],i=0;i<r.length;++i)n[r[i]]=t+1;return n}([["||"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in","instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"]],{}),$n=(r(["for","do","while","switch"]),r(["atom","num","string","regexp","name"]));N.prototype=new _,function(e){function n(n,t){n.DEFMETHOD("transform",function(n,r){var i,o;return n.push(this),n.before&&(i=n.before(this,t,r)),i===e&&(n.after?(n.stack[n.stack.length-1]=i=this.clone(),t(i,n),(o=n.after(i,r))!==e&&(i=o)):(i=this,t(i,n))),n.pop(),i})}function t(e,n){return z(e,function(e){return e.transform(n,!0)})}n(W,f),n(ee,function(e,n){e.label=e.label.transform(n),e.body=e.body.transform(n)}),n(Y,function(e,n){e.body=e.body.transform(n)}),n(X,function(e,n){e.body=t(e.body,n)}),n(te,function(e,n){e.condition=e.condition.transform(n),e.body=e.body.transform(n)}),n(oe,function(e,n){e.init&&(e.init=e.init.transform(n)),e.condition&&(e.condition=e.condition.transform(n)),e.step&&(e.step=e.step.transform(n)),e.body=e.body.transform(n)}),n(ae,function(e,n){e.init=e.init.transform(n),e.object=e.object.transform(n),e.body=e.body.transform(n)}),n(ue,function(e,n){e.expression=e.expression.transform(n),e.body=e.body.transform(n)}),n(ge,function(e,n){e.value&&(e.value=e.value.transform(n))}),n(ye,function(e,n){e.label&&(e.label=e.label.transform(n))}),n(_e,function(e,n){e.condition=e.condition.transform(n),e.body=e.body.transform(n),e.alternative&&(e.alternative=e.alternative.transform(n))}),n(we,function(e,n){e.expression=e.expression.transform(n),e.body=t(e.body,n)}),n(Ce,function(e,n){e.expression=e.expression.transform(n),e.body=t(e.body,n)}),n(Fe,function(e,n){e.body=t(e.body,n),e.bcatch&&(e.bcatch=e.bcatch.transform(n)),e.bfinally&&(e.bfinally=e.bfinally.transform(n))}),n(Se,function(e,n){e.argname=e.argname.transform(n),e.body=t(e.body,n)}),n(De,function(e,n){e.definitions=t(e.definitions,n)}),n(qe,function(e,n){e.name=e.name.transform(n),e.value&&(e.value=e.value.transform(n))}),n(le,function(e,n){e.name&&(e.name=e.name.transform(n)),e.argnames=t(e.argnames,n),e.body=t(e.body,n)}),n(Re,function(e,n){e.expression=e.expression.transform(n),e.args=t(e.args,n)}),n(je,function(e,n){e.car=e.car.transform(n),e.cdr=e.cdr.transform(n)}),n(Ne,function(e,n){e.expression=e.expression.transform(n)}),n(Te,function(e,n){e.expression=e.expression.transform(n),e.property=e.property.transform(n)}),n(Me,function(e,n){e.expression=e.expression.transform(n)}),n($e,function(e,n){e.left=e.left.transform(n),e.right=e.right.transform(n)}),n(ze,function(e,n){e.condition=e.condition.transform(n),e.consequent=e.consequent.transform(n),e.alternative=e.alternative.transform(n)}),n(We,function(e,n){e.elements=t(e.elements,n)}),n(He,function(e,n){e.properties=t(e.properties,n)}),n(Ge,function(e,n){e.value=e.value.transform(n)})}(),T.prototype={unmangleable:function(e){return this.global&&!(e&&e.toplevel)||this.undeclared||!(e&&e.eval)&&(this.scope.uses_eval||this.scope.uses_with)},mangle:function(e){if(!this.mangled_name&&!this.unmangleable(e)){var n=this.scope;!e.screw_ie8&&this.orig[0]instanceof on&&(n=n.parent_scope),this.mangled_name=n.next_mangled(e,this)}}},ce.DEFMETHOD("figure_out_scope",function(e){e=c(e,{screw_ie8:!1});
// pass 1: setup scope chaining and handle definitions
var n=this,t=n.parent_scope=null,r=null,i=0,o=new _(function(n,a){if(e.screw_ie8&&n instanceof Se){var u=t;return t=new se(n),t.init_scope_vars(i),t.parent_scope=u,a(),t=u,!0}if(n instanceof se){n.init_scope_vars(i);var u=n.parent_scope=t,s=r;return r=t=n,++i,a(),--i,t=u,r=s,!0}if(n instanceof J)return n.scope=t,p(t.directives,n.value),!0;if(n instanceof ue)for(var c=t;c;c=c.parent_scope)c.uses_with=!0;else if(n instanceof Ke&&(n.scope=t),n instanceof on)r.def_function(n);else if(n instanceof rn)
// Careful here, the scope where this should be defined is
// the parent scope.  The reason is that we enter a new
// scope when we encounter the AST_Defun node (which is
// instanceof AST_Scope) but we get to the symbol a bit
// later.
(n.scope=r.parent_scope).def_function(n);else if(n instanceof en||n instanceof nn){var l=r.def_variable(n);l.constant=n instanceof nn,l.init=o.parent().value}else n instanceof an&&(e.screw_ie8?t:r).def_variable(n)});n.walk(o);
// pass 2: find back references and eval
var a=null,u=n.globals=new y,o=new _(function(e,t){if(e instanceof le){var r=a;return a=e,t(),a=r,!0}if(e instanceof sn){var i=e.name,s=e.scope.find_variable(i);if(s)e.thedef=s;else{var c;if(u.has(i)?c=u.get(i):(c=new T(n,u.size(),e),c.undeclared=!0,c.global=!0,u.set(i,c)),e.thedef=c,"eval"==i&&o.parent()instanceof Re)for(var l=e.scope;l&&!l.uses_eval;l=l.parent_scope)l.uses_eval=!0;a&&"arguments"==i&&(a.uses_arguments=!0)}return e.reference(),!0}});n.walk(o)}),se.DEFMETHOD("init_scope_vars",function(e){this.directives=[],// contains the directives defined in this scope, i.e. "use strict"
this.variables=new y,// map name to AST_SymbolVar (variables defined in this scope; includes functions)
this.functions=new y,// map name to AST_SymbolDefun (functions defined in this scope)
this.uses_with=!1,// will be set to true if this or some nested scope uses the `with` statement
this.uses_eval=!1,// will be set to true if this or nested scope uses the global `eval`
this.parent_scope=null,// the parent scope
this.enclosed=[],// a list of variables from this or outer scope(s) that are referenced from this or inner scopes
this.cname=-1,// the current index for mangling functions/variables
this.nesting=e}),se.DEFMETHOD("strict",function(){return this.has_directive("use strict")}),le.DEFMETHOD("init_scope_vars",function(){se.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1}),sn.DEFMETHOD("reference",function(){var e=this.definition();e.references.push(this);for(var n=this.scope;n&&(p(n.enclosed,e),n!==e.scope);)n=n.parent_scope;this.frame=this.scope.nesting-e.scope.nesting}),se.DEFMETHOD("find_variable",function(e){return e instanceof Ke&&(e=e.name),this.variables.get(e)||this.parent_scope&&this.parent_scope.find_variable(e)}),se.DEFMETHOD("has_directive",function(e){return this.parent_scope&&this.parent_scope.has_directive(e)||(this.directives.indexOf(e)>=0?this:null)}),se.DEFMETHOD("def_function",function(e){this.functions.set(e.name,this.def_variable(e))}),se.DEFMETHOD("def_variable",function(e){var n;return this.variables.has(e.name)?(n=this.variables.get(e.name),n.orig.push(e)):(n=new T(this,this.variables.size(),e),this.variables.set(e.name,n),n.global=!this.parent_scope),e.thedef=n}),se.DEFMETHOD("next_mangled",function(e){var n=this.enclosed;e:for(;;){var t=zn(++this.cname);if(S(t)&&!(e.except.indexOf(t)>=0))// skip over "do"
// https://github.com/mishoo/UglifyJS2/issues/242 -- do not
// shadow a name excepted from mangling.
{
// we must ensure that the mangled name does not shadow a name
// from some parent scope that is referenced in this or in
// inner scopes.
for(var r=n.length;--r>=0;){var i=n[r],o=i.mangled_name||i.unmangleable(e)&&i.name;if(t==o)continue e}return t}}}),pe.DEFMETHOD("next_mangled",function(e,n){for(
// #179, #326
// in Safari strict mode, something like (function x(x){...}) is a syntax error;
// a function expression's argument cannot shadow the function expression's name
var t=n.orig[0]instanceof tn&&this.name&&this.name.definition();;){var r=le.prototype.next_mangled.call(this,e,n);if(!t||t.mangled_name!=r)return r}}),se.DEFMETHOD("references",function(e){return e instanceof Ke&&(e=e.definition()),this.enclosed.indexOf(e)<0?null:e}),Ke.DEFMETHOD("unmangleable",function(e){return this.definition().unmangleable(e)}),
// property accessors are not mangleable
Qe.DEFMETHOD("unmangleable",function(){return!0}),
// labels are always mangleable
un.DEFMETHOD("unmangleable",function(){return!1}),Ke.DEFMETHOD("unreferenced",function(){return 0==this.definition().references.length&&!(this.scope.uses_eval||this.scope.uses_with)}),Ke.DEFMETHOD("undeclared",function(){return this.definition().undeclared}),cn.DEFMETHOD("undeclared",function(){return!1}),un.DEFMETHOD("undeclared",function(){return!1}),Ke.DEFMETHOD("definition",function(){return this.thedef}),Ke.DEFMETHOD("global",function(){return this.definition().global}),ce.DEFMETHOD("_default_mangler_options",function(e){return c(e,{except:[],eval:!1,sort:!1,toplevel:!1,screw_ie8:!1})}),ce.DEFMETHOD("mangle_names",function(e){e=this._default_mangler_options(e);
// We only need to mangle declaration nodes.  Special logic wired
// into the code generator will display the mangled name if it's
// present (and for AST_SymbolRef-s it'll use the mangled name of
// the AST_SymbolDeclaration that it points to).
var n=-1,t=[],r=new _(function(i,o){if(i instanceof ee){
// lname is incremented when we get to the AST_Label
var a=n;return o(),n=a,!0}if(i instanceof se){var u=(r.parent(),[]);return i.variables.each(function(n){e.except.indexOf(n.name)<0&&u.push(n)}),e.sort&&u.sort(function(e,n){return n.references.length-e.references.length}),void t.push.apply(t,u)}if(i instanceof un){var s;do{s=zn(++n)}while(!S(s));return i.mangled_name=s,!0}});this.walk(r),t.forEach(function(n){n.mangle(e)})}),ce.DEFMETHOD("compute_char_frequency",function(e){e=this._default_mangler_options(e);var n=new _(function(n){n instanceof fn?zn.consider(n.print_to_string()):n instanceof me?zn.consider("return"):n instanceof ve?zn.consider("throw"):n instanceof xe?zn.consider("continue"):n instanceof be?zn.consider("break"):n instanceof G?zn.consider("debugger"):n instanceof J?zn.consider(n.value):n instanceof ie?zn.consider("while"):n instanceof re?zn.consider("do while"):n instanceof _e?(zn.consider("if"),n.alternative&&zn.consider("else")):n instanceof Be?zn.consider("var"):n instanceof Oe?zn.consider("const"):n instanceof le?zn.consider("function"):n instanceof oe?zn.consider("for"):n instanceof ae?zn.consider("for in"):n instanceof we?zn.consider("switch"):n instanceof Ce?zn.consider("case"):n instanceof Ae?zn.consider("default"):n instanceof ue?zn.consider("with"):n instanceof Ye?zn.consider("set"+n.key):n instanceof Xe?zn.consider("get"+n.key):n instanceof Je?zn.consider(n.key):n instanceof Pe?zn.consider("new"):n instanceof ln?zn.consider("this"):n instanceof Fe?zn.consider("try"):n instanceof Se?zn.consider("catch"):n instanceof ke?zn.consider("finally"):n instanceof Ke&&n.unmangleable(e)?zn.consider(n.name):n instanceof Me||n instanceof $e?zn.consider(n.operator):n instanceof Ne&&zn.consider(n.property)});this.walk(n),zn.sort()});var zn=function(){function e(){r=Object.create(null),t=i.split("").map(function(e){return e.charCodeAt(0)}),t.forEach(function(e){r[e]=0})}function n(e){var n="",r=54;do{n+=String.fromCharCode(t[e%r]),e=Math.floor(e/r),r=64}while(e>0);return n}var t,r,i="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";return n.consider=function(e){for(var n=e.length;--n>=0;){var t=e.charCodeAt(n);t in r&&++r[t]}},n.sort=function(){t=g(t,function(e,n){return E(e)&&!E(n)?1:E(n)&&!E(e)?-1:r[n]-r[e]})},n.reset=e,e(),n.get=function(){return t},n.freq=function(){return r},n}();ce.DEFMETHOD("scope_warnings",function(e){e=c(e,{undeclared:!1,// this makes a lot of noise
unreferenced:!0,assign_to_global:!0,func_arguments:!0,nested_defuns:!0,eval:!0});var n=new _(function(t){if(e.undeclared&&t instanceof sn&&t.undeclared()&&
// XXX: this also warns about JS standard names,
// i.e. Object, Array, parseInt etc.  Should add a list of
// exceptions.
W.warn("Undeclared symbol: {name} [{file}:{line},{col}]",{name:t.name,file:t.start.file,line:t.start.line,col:t.start.col}),e.assign_to_global){var r=null;t instanceof Ve&&t.left instanceof sn?r=t.left:t instanceof ae&&t.init instanceof sn&&(r=t.init),r&&(r.undeclared()||r.global()&&r.scope!==r.definition().scope)&&W.warn("{msg}: {name} [{file}:{line},{col}]",{msg:r.undeclared()?"Accidental global?":"Assignment to global",name:r.name,file:r.start.file,line:r.start.line,col:r.start.col})}e.eval&&t instanceof sn&&t.undeclared()&&"eval"==t.name&&W.warn("Eval is used [{file}:{line},{col}]",t.start),e.unreferenced&&(t instanceof Ze||t instanceof un)&&t.unreferenced()&&W.warn("{type} {name} is declared but not referenced [{file}:{line},{col}]",{type:t instanceof un?"Label":"Symbol",name:t.name,file:t.start.file,line:t.start.line,col:t.start.col}),e.func_arguments&&t instanceof le&&t.uses_arguments&&W.warn("arguments used in function {name} [{file}:{line},{col}]",{name:t.name?t.name.name:"anonymous",file:t.start.file,line:t.start.line,col:t.start.col}),e.nested_defuns&&t instanceof de&&!(n.parent()instanceof se)&&W.warn('Function {name} declared in nested statement "{type}" [{file}:{line},{col}]',{name:t.name.name,type:n.parent().TYPE,file:t.start.file,line:t.start.line,col:t.start.col})});this.walk(n)}),/* -----[ code generators ]----- */
function(){/* -----[ utils ]----- */
function e(e,n){e.DEFMETHOD("_codegen",n)}/* -----[ PARENTHESES ]----- */
function n(e,n){e.DEFMETHOD("needs_parens",n)}function t(e){var n=e.parent();
// !(a = false) → true
// !(a = false) → true
// 1 + (a = 2) + 3 → 6, side effect setting a = 2
// (a = func)() —or— new (a = Object)()
// (a = foo) ? bar : baz
// (a = foo)["prop"] —or— (a = foo).prop
return n instanceof Me||(n instanceof $e&&!(n instanceof Ve)||(n instanceof Re&&n.expression===this||(n instanceof ze&&n.condition===this||(n instanceof Le&&n.expression===this||void 0))))}/* -----[ statements ]----- */
function r(e,n,t){var r=e.length-1;e.forEach(function(e,i){e instanceof Q||(t.indent(),e.print(t),i==r&&n||(t.newline(),n&&t.newline()))})}function i(e,n){e.length>0?n.with_block(function(){r(e,!1,n)}):n.print("{}")}/* -----[ if ]----- */
function o(e,n){if(n.option("bracketize"))return void h(e.body,n);
// The squeezer replaces "block"-s that contain only a single
// statement with the statement itself; technically, the AST
// is correct, but this can create problems when we output an
// IF having an ELSE clause where the THEN clause ends in an
// IF *without* an ELSE block (then the outer ELSE would refer
// to the inner IF).  This function checks for this case and
// adds the block brackets if needed.
if(!e.body)return n.force_semicolon();if(e.body instanceof re&&!n.option("screw_ie8"))
// https://github.com/mishoo/UglifyJS/issues/#issue/57 IE
// croaks with "syntax error" on code like this: if (foo)
// do ... while(cond); else ...  we need block brackets
// around do/while
return void h(e.body,n);for(var t=e.body;;)if(t instanceof _e){if(!t.alternative)return void h(e.body,n);t=t.alternative}else{if(!(t instanceof Z))break;t=t.body}s(e.body,n)}function a(e,n,t){if(t)try{
// need to take some precautions here:
//    https://github.com/mishoo/UglifyJS2/issues/60
e.walk(new _(function(e){if(e instanceof $e&&"in"==e.operator)throw n})),e.print(n)}catch(t){if(t!==n)throw t;e.print(n,!0)}else e.print(n)}function u(e){return[92,// \
47,// /
46,// .
43,// +
42,// *
63,// ?
40,// (
41,// )
91,// [
93,// ]
123,// {
125,// }
36,// $
94,// ^
58,// :
124,// |
33,// !
10,// \n
13,// \r
0,// \0
65279,// Unicode BOM
8232,// unicode "line separator"
8233].indexOf(e)<0}function s(e,n){n.option("bracketize")?!e||e instanceof Q?n.print("{}"):e instanceof K?e.print(n):n.with_block(function(){n.indent(),e.print(n),n.newline()}):!e||e instanceof Q?n.force_semicolon():e.print(n)}
// return true if the node at the top of the stack (that means the
// innermost node in the current output) is lexically the first in
// a statement.
function c(e){for(var n=e.stack(),t=n.length,r=n[--t],i=n[--t];t>0;){if(i instanceof H&&i.body===r)return!0;if(!(i instanceof je&&i.car===r||i instanceof Re&&i.expression===r&&!(i instanceof Pe)||i instanceof Ne&&i.expression===r||i instanceof Te&&i.expression===r||i instanceof ze&&i.condition===r||i instanceof $e&&i.left===r||i instanceof Ue&&i.expression===r))return!1;r=i,i=n[--t]}}
// self should be AST_New.  decide if we want to show parens or not.
function l(e,n){return 0==e.args.length&&!n.option("beautify")}function p(e){for(var n=e[0],t=n.length,r=1;r<e.length;++r)e[r].length<t&&(n=e[r],t=n.length);return n}function d(e){var n,t=e.toString(10),r=[t.replace(/^0\./,".").replace("e+","e")];// probably pointless
// probably pointless
return Math.floor(e)===e?(e>=0?r.push("0x"+e.toString(16).toLowerCase(),"0"+e.toString(8)):r.push("-0x"+(-e).toString(16).toLowerCase(),"-0"+(-e).toString(8)),(n=/^(.*?)(0+)$/.exec(e))&&r.push(n[1]+"e"+n[2].length)):(n=/^0?\.(0+)(.*)$/.exec(e))&&r.push(n[2]+"e-"+(n[1].length+n[2].length),t.substr(t.indexOf("."))),p(r)}function h(e,n){if(e instanceof K)return void e.print(n);n.with_block(function(){n.indent(),e.print(n),n.newline()})}/* -----[ source map generators ]----- */
function g(e,n){e.DEFMETHOD("add_source_map",function(e){n(this,e)})}function m(e,n){n.add_mapping(e.start)}W.DEFMETHOD("print",function(e,n){function t(){r.add_comments(e),r.add_source_map(e),i(r,e)}var r=this,i=r._codegen;e.push_node(r),n||r.needs_parens(e)?e.with_parens(t):t(),e.pop_node()}),W.DEFMETHOD("print_to_string",function(e){var n=M(e);return this.print(n),n.get()}),/* -----[ comments ]----- */
W.DEFMETHOD("add_comments",function(e){var n=e.option("comments"),t=this;if(n){var r=t.start;if(r&&!r._comments_dumped){r._comments_dumped=!0;var i=r.comments_before||[];
// XXX: ugly fix for https://github.com/mishoo/UglifyJS2/issues/112
//               and https://github.com/mishoo/UglifyJS2/issues/372
t instanceof ge&&t.value&&t.value.walk(new _(function(e){if(e.start&&e.start.comments_before&&(i=i.concat(e.start.comments_before),e.start.comments_before=[]),e instanceof pe||e instanceof We||e instanceof He)return!0})),n.test?i=i.filter(function(e){return n.test(e.value)}):"function"==typeof n&&(i=i.filter(function(e){return n(t,e)})),i.forEach(function(n){/comment[134]/.test(n.type)?(e.print("//"+n.value+"\n"),e.indent()):"comment2"==n.type&&(e.print("/*"+n.value+"*/"),r.nlb?(e.print("\n"),e.indent()):e.space())})}}}),n(W,function(){return!1}),
// a function expression needs parens around it when it's provably
// the first token to appear in a statement.
n(pe,function(e){return c(e)}),
// same goes for an object literal, because otherwise it would be
// interpreted as a block of code.
n(He,function(e){return c(e)}),n(Me,function(e){var n=e.parent();return n instanceof Le&&n.expression===this}),n(je,function(e){var n=e.parent();return n instanceof Re||n instanceof Me||n instanceof $e||n instanceof qe||n instanceof Le||n instanceof We||n instanceof Ge||n instanceof ze}),n($e,function(e){var n=e.parent();
// (foo && bar)()
if(n instanceof Re&&n.expression===this)return!0;
// typeof (foo && bar)
if(n instanceof Me)return!0;
// (foo && bar)["prop"], (foo && bar).prop
if(n instanceof Le&&n.expression===this)return!0;
// this deals with precedence: 3 * (2 + 1)
if(n instanceof $e){var t=n.operator,r=Un[t],i=this.operator,o=Un[i];if(r>o||r==o&&this===n.right)return!0}}),n(Le,function(e){var n=e.parent();if(n instanceof Pe&&n.expression===this)
// i.e. new (foo.bar().baz)
//
// if there's one call into this subtree, then we need
// parens around it too, otherwise the call will be
// interpreted as passing the arguments to the upper New
// expression.
try{this.walk(new _(function(e){if(e instanceof Re)throw n}))}catch(e){if(e!==n)throw e;return!0}}),n(Re,function(e){var n,t=e.parent();return t instanceof Pe&&t.expression===this||this.expression instanceof pe&&t instanceof Le&&t.expression===this&&(n=e.parent(1))instanceof Ve&&n.left===t}),n(Pe,function(e){var n=e.parent();if(l(this,e)&&(n instanceof Le||n instanceof Re&&n.expression===this))// (new foo)(bar)
return!0}),n(dn,function(e){var n=e.parent();if(this.getValue()<0&&n instanceof Le&&n.expression===this)return!0}),n(vn,function(e){var n=e.parent();if(n instanceof Le&&n.expression===this)return!0}),n(Ve,t),n(ze,t),/* -----[ PRINTERS ]----- */
e(J,function(e,n){n.print_string(e.value),n.semicolon()}),e(G,function(e,n){n.print("debugger"),n.semicolon()}),Z.DEFMETHOD("_do_print_body",function(e){s(this.body,e)}),e(H,function(e,n){e.body.print(n),n.semicolon()}),e(ce,function(e,n){r(e.body,!0,n),n.print("")}),e(ee,function(e,n){e.label.print(n),n.colon(),e.body.print(n)}),e(Y,function(e,n){e.body.print(n),n.semicolon()}),e(K,function(e,n){i(e.body,n)}),e(Q,function(e,n){n.semicolon()}),e(re,function(e,n){n.print("do"),n.space(),e._do_print_body(n),n.space(),n.print("while"),n.space(),n.with_parens(function(){e.condition.print(n)}),n.semicolon()}),e(ie,function(e,n){n.print("while"),n.space(),n.with_parens(function(){e.condition.print(n)}),n.space(),e._do_print_body(n)}),e(oe,function(e,n){n.print("for"),n.space(),n.with_parens(function(){e.init?(e.init instanceof De?e.init.print(n):a(e.init,n,!0),n.print(";"),n.space()):n.print(";"),e.condition?(e.condition.print(n),n.print(";"),n.space()):n.print(";"),e.step&&e.step.print(n)}),n.space(),e._do_print_body(n)}),e(ae,function(e,n){n.print("for"),n.space(),n.with_parens(function(){e.init.print(n),n.space(),n.print("in"),n.space(),e.object.print(n)}),n.space(),e._do_print_body(n)}),e(ue,function(e,n){n.print("with"),n.space(),n.with_parens(function(){e.expression.print(n)}),n.space(),e._do_print_body(n)}),/* -----[ functions ]----- */
le.DEFMETHOD("_do_print",function(e,n){var t=this;n||e.print("function"),t.name&&(e.space(),t.name.print(e)),e.with_parens(function(){t.argnames.forEach(function(n,t){t&&e.comma(),n.print(e)})}),e.space(),i(t.body,e)}),e(le,function(e,n){e._do_print(n)}),/* -----[ exits ]----- */
ge.DEFMETHOD("_do_print",function(e,n){e.print(n),this.value&&(e.space(),this.value.print(e)),e.semicolon()}),e(me,function(e,n){e._do_print(n,"return")}),e(ve,function(e,n){e._do_print(n,"throw")}),/* -----[ loop control ]----- */
ye.DEFMETHOD("_do_print",function(e,n){e.print(n),this.label&&(e.space(),this.label.print(e)),e.semicolon()}),e(be,function(e,n){e._do_print(n,"break")}),e(xe,function(e,n){e._do_print(n,"continue")}),e(_e,function(e,n){n.print("if"),n.space(),n.with_parens(function(){e.condition.print(n)}),n.space(),e.alternative?(o(e,n),n.space(),n.print("else"),n.space(),s(e.alternative,n)):e._do_print_body(n)}),/* -----[ switch ]----- */
e(we,function(e,n){n.print("switch"),n.space(),n.with_parens(function(){e.expression.print(n)}),n.space(),e.body.length>0?n.with_block(function(){e.body.forEach(function(e,t){t&&n.newline(),n.indent(!0),e.print(n)})}):n.print("{}")}),Ee.DEFMETHOD("_do_print_body",function(e){this.body.length>0&&(e.newline(),this.body.forEach(function(n){e.indent(),n.print(e),e.newline()}))}),e(Ae,function(e,n){n.print("default:"),e._do_print_body(n)}),e(Ce,function(e,n){n.print("case"),n.space(),e.expression.print(n),n.print(":"),e._do_print_body(n)}),/* -----[ exceptions ]----- */
e(Fe,function(e,n){n.print("try"),n.space(),i(e.body,n),e.bcatch&&(n.space(),e.bcatch.print(n)),e.bfinally&&(n.space(),e.bfinally.print(n))}),e(Se,function(e,n){n.print("catch"),n.space(),n.with_parens(function(){e.argname.print(n)}),n.space(),i(e.body,n)}),e(ke,function(e,n){n.print("finally"),n.space(),i(e.body,n)}),/* -----[ var/const ]----- */
De.DEFMETHOD("_do_print",function(e,n){e.print(n),e.space(),this.definitions.forEach(function(n,t){t&&e.comma(),n.print(e)});var t=e.parent();(t instanceof oe||t instanceof ae)&&t.init===this||e.semicolon()}),e(Be,function(e,n){e._do_print(n,"var")}),e(Oe,function(e,n){e._do_print(n,"const")}),e(qe,function(e,n){if(e.name.print(n),e.value){n.space(),n.print("="),n.space();var t=n.parent(1),r=t instanceof oe||t instanceof ae;a(e.value,n,r)}}),/* -----[ other expressions ]----- */
e(Re,function(e,n){e.expression.print(n),e instanceof Pe&&l(e,n)||n.with_parens(function(){e.args.forEach(function(e,t){t&&n.comma(),e.print(n)})})}),e(Pe,function(e,n){n.print("new"),n.space(),Re.prototype._codegen(e,n)}),je.DEFMETHOD("_do_print",function(e){this.car.print(e),this.cdr&&(e.comma(),e.should_break()&&(e.newline(),e.indent()),this.cdr.print(e))}),e(je,function(e,n){e._do_print(n)}),e(Ne,function(e,n){var t=e.expression;t.print(n),t instanceof dn&&t.getValue()>=0&&(/[xa-f.]/i.test(n.last())||n.print(".")),n.print("."),
// the name after dot would be mapped about here.
n.add_mapping(e.end),n.print_name(e.property)}),e(Te,function(e,n){e.expression.print(n),n.print("["),e.property.print(n),n.print("]")}),e(Ie,function(e,n){var t=e.operator;n.print(t),/^[a-z]/i.test(t)&&n.space(),e.expression.print(n)}),e(Ue,function(e,n){e.expression.print(n),n.print(e.operator)}),e($e,function(e,n){e.left.print(n),n.space(),n.print(e.operator),"<"==e.operator&&e.right instanceof Ie&&"!"==e.right.operator&&e.right.expression instanceof Ie&&"--"==e.right.expression.operator?
// space is mandatory to avoid outputting <!--
// http://javascript.spec.whatwg.org/#comment-syntax
n.print(" "):
// the space is optional depending on "beautify"
n.space(),e.right.print(n)}),e(ze,function(e,n){e.condition.print(n),n.space(),n.print("?"),n.space(),e.consequent.print(n),n.space(),n.colon(),e.alternative.print(n)}),/* -----[ literals ]----- */
e(We,function(e,n){n.with_square(function(){var t=e.elements,r=t.length;r>0&&n.space(),t.forEach(function(e,t){t&&n.comma(),e.print(n),
// If the final element is a hole, we need to make sure it
// doesn't look like a trailing comma, by inserting an actual
// trailing comma.
t===r-1&&e instanceof bn&&n.comma()}),r>0&&n.space()})}),e(He,function(e,n){e.properties.length>0?n.with_block(function(){e.properties.forEach(function(e,t){t&&(n.print(","),n.newline()),n.indent(),e.print(n)}),n.newline()}):n.print("{}")}),e(Je,function(e,n){var t=e.key;n.option("quote_keys")?n.print_string(t+""):("number"==typeof t||!n.option("beautify")&&+t+""==t)&&parseFloat(t)>=0?n.print(d(t)):(Fn(t)?n.option("screw_ie8"):B(t))?n.print_name(t):n.print_string(t),n.colon(),e.value.print(n)}),e(Ye,function(e,n){n.print("set"),n.space(),e.key.print(n),e.value._do_print(n,!0)}),e(Xe,function(e,n){n.print("get"),n.space(),e.key.print(n),e.value._do_print(n,!0)}),e(Ke,function(e,n){var t=e.definition();n.print_name(t?t.mangled_name||t.name:e.name)}),e(yn,function(e,n){n.print("void 0")}),e(bn,f),e(xn,function(e,n){n.print("1/0")}),e(vn,function(e,n){n.print("0/0")}),e(ln,function(e,n){n.print("this")}),e(fn,function(e,n){n.print(e.getValue())}),e(pn,function(e,n){n.print_string(e.getValue())}),e(dn,function(e,n){n.print(d(e.getValue()))}),e(hn,function(e,n){var t=e.getValue().toString();n.option("ascii_only")?t=n.to_ascii(t):n.option("unescape_regexps")&&(t=t.split("\\\\").map(function(e){return e.replace(/\\u[0-9a-fA-F]{4}|\\x[0-9a-fA-F]{2}/g,function(e){var n=parseInt(e.substr(2),16);return u(n)?String.fromCharCode(n):e})}).join("\\\\")),n.print(t);var r=n.parent();r instanceof $e&&/^in/.test(r.operator)&&r.left===e&&n.print(" ")}),
// We could easily add info for ALL nodes, but it seems to me that
// would be quite wasteful, hence this noop in the base class.
g(W,f),
// XXX: I'm not exactly sure if we need it for all of these nodes,
// or if we should add even more.
g(J,m),g(G,m),g(Ke,m),g(he,m),g(Z,m),g(ee,f),// since the label symbol will mark it
g(le,m),g(we,m),g(Ee,m),g(K,m),g(ce,f),g(Pe,m),g(Fe,m),g(Se,m),g(ke,m),g(De,m),g(fn,m),g(Ge,function(e,n){n.add_mapping(e.start,e.key)})}(),I.prototype=new N,l(I.prototype,{option:function(e){return this.options[e]},warn:function(){this.options.warnings&&W.warn.apply(W,arguments)},before:function(e,n,t){if(e._squeezed)return e;var r=!1;return e instanceof se&&(e=e.hoist_declarations(this),r=!0),n(e,this),e=e.optimize(this),r&&e instanceof se&&(e.drop_unused(this),n(e,this)),e._squeezed=!0,e}}),function(){function e(e,n){e.DEFMETHOD("optimize",function(e){var t=this;if(t._optimized)return t;var r=n(t,e);return r._optimized=!0,r===t?r:r.transform(e)})}function n(e,n,t){return t||(t={}),n&&(t.start||(t.start=n.start),t.end||(t.end=n.end)),new e(t)}function t(e,t,r){
// XXX: WIP.
// if (val instanceof AST_Node) return val.transform(new TreeTransformer(null, function(node){
//     if (node instanceof AST_SymbolRef) {
//         var scope = compressor.find_parent(AST_Scope);
//         var def = scope.find_variable(node);
//         node.thedef = def;
//         return node;
//     }
// })).transform(compressor);
if(t instanceof W)return t.transform(e);switch(typeof t){case"string":return n(pn,r,{value:t}).optimize(e);case"number":return n(isNaN(t)?vn:dn,r,{value:t}).optimize(e);case"boolean":return n(t?En:wn,r).optimize(e);case"undefined":return n(yn,r).optimize(e);default:if(null===t)return n(mn,r).optimize(e);if(t instanceof RegExp)return n(hn,r).optimize(e);throw new Error(d("Can't handle constant of type: {type}",{type:typeof t}))}}function r(e){if(null===e)return[];if(e instanceof K)return e.body;if(e instanceof Q)return[];if(e instanceof H)return[e];throw new Error("Can't convert thing to statement array")}function i(e){return null===e||(e instanceof Q||e instanceof K&&0==e.body.length)}function u(e){return e instanceof we?e:(e instanceof oe||e instanceof ae||e instanceof te)&&e.body instanceof K?e.body:e}function s(e,t){function i(e){var n=[];return e.reduce(function(e,t){return t instanceof K?(a=!0,e.push.apply(e,i(t.body))):t instanceof Q?a=!0:t instanceof J?n.indexOf(t.value)<0?(e.push(t),n.push(t.value)):a=!0:e.push(t),e},[])}function o(e,t){function r(e){i.pop();var n=o.body;return n instanceof je?n.add(e):n=je.cons(n,e),n.transform(t)}var i=[],o=null;return e.forEach(function(e){if(o)if(e instanceof oe){var t={};try{o.body.walk(new _(function(e){if(e instanceof $e&&"in"==e.operator)throw t})),!e.init||e.init instanceof De?e.init||(e.init=o.body,i.pop()):e.init=r(e.init)}catch(e){if(e!==t)throw e}}else e instanceof _e?e.condition=r(e.condition):e instanceof ue?e.expression=r(e.expression):e instanceof ge&&e.value?e.value=r(e.value):e instanceof ge?e.value=r(n(yn,e)):e instanceof we&&(e.expression=r(e.expression));i.push(e),o=e instanceof Y?e:null}),i}var a;do{a=!1,t.option("angular")&&(e=function(e){function r(e,t){return n(Y,e,{body:n(Ve,e,{operator:"=",left:n(Ne,t,{expression:n(sn,t,t),property:"$inject"}),right:n(We,e,{elements:e.argnames.map(function(e){return n(pn,e,{value:e.name})})})})})}return e.reduce(function(e,n){e.push(n);var i=n.start,o=i.comments_before;if(o&&o.length>0){var a=o.pop();/@ngInject/.test(a.value)&&(
// case 1: defun
n instanceof de?e.push(r(n,n.name)):n instanceof De?n.definitions.forEach(function(n){n.value&&n.value instanceof le&&e.push(r(n.value,n.name))}):t.warn("Unknown statement marked with @ngInject [{file}:{line},{col}]",i))}return e},[])}(e)),e=i(e),t.option("dead_code")&&(e=function(e,n){var t=!1,r=e.length,i=n.self();return e=e.reduce(function(e,r){if(t)c(n,r,e);else{if(r instanceof ye){var o=n.loopcontrol_target(r.label);r instanceof be&&o instanceof K&&u(o)===i||r instanceof xe&&u(o)===i?r.label&&h(r.label.thedef.references,r):e.push(r)}else e.push(r);b(r)&&(t=!0)}return e},[]),a=e.length!=r,e}(e,t)),t.option("if_return")&&(e=function(e,t){var i=t.self(),o=i instanceof le,s=[];e:for(var c=e.length;--c>=0;){var l=e[c];switch(!0){case o&&l instanceof me&&!l.value&&0==s.length:a=!0;
// note, ret.length is probably always zero
// because we drop unreachable code before this
// step.  nevertheless, it's good to check.
continue e;case l instanceof _e:if(l.body instanceof me){
//---
// pretty silly case, but:
// if (foo()) return; return; ==> foo(); return;
if((o&&0==s.length||s[0]instanceof me&&!s[0].value)&&!l.body.value&&!l.alternative){a=!0;var f=n(Y,l.condition,{body:l.condition});s.unshift(f);continue e}
//---
// if (foo()) return x; return y; ==> return foo() ? x : y;
if(s[0]instanceof me&&l.body.value&&s[0].value&&!l.alternative){a=!0,l=l.clone(),l.alternative=s[0],s[0]=l.transform(t);continue e}
//---
// if (foo()) return x; [ return ; ] ==> return foo() ? x : undefined;
if((0==s.length||s[0]instanceof me)&&l.body.value&&!l.alternative&&o){a=!0,l=l.clone(),l.alternative=s[0]||n(me,l,{value:n(yn,l)}),s[0]=l.transform(t);continue e}
//---
// if (foo()) return; [ else x... ]; y... ==> if (!foo()) { x...; y... }
if(!l.body.value&&o){a=!0,l=l.clone(),l.condition=l.condition.negate(t),l.body=n(K,l,{body:r(l.alternative).concat(s)}),l.alternative=null,s=[l.transform(t)];continue e}
//---
if(1==s.length&&o&&s[0]instanceof Y&&(!l.alternative||l.alternative instanceof Y)){a=!0,s.push(n(me,s[0],{value:n(yn,s[0])}).transform(t)),s=r(l.alternative).concat(s),s.unshift(l);continue e}}var p=b(l.body),d=p instanceof ye?t.loopcontrol_target(p.label):null;if(p&&(p instanceof me&&!p.value&&o||p instanceof xe&&i===u(d)||p instanceof be&&d instanceof K&&i===d)){p.label&&h(p.label.thedef.references,p),a=!0;var g=r(l.body).slice(0,-1);l=l.clone(),l.condition=l.condition.negate(t),l.body=n(K,l,{body:s}),l.alternative=n(K,l,{body:g}),s=[l.transform(t)];continue e}var p=b(l.alternative),d=p instanceof ye?t.loopcontrol_target(p.label):null;if(p&&(p instanceof me&&!p.value&&o||p instanceof xe&&i===u(d)||p instanceof be&&d instanceof K&&i===d)){p.label&&h(p.label.thedef.references,p),a=!0,l=l.clone(),l.body=n(K,l.body,{body:r(l.body).concat(s)}),l.alternative=n(K,l.alternative,{body:r(l.alternative).slice(0,-1)}),s=[l.transform(t)];continue e}s.unshift(l);break;default:s.unshift(l)}}return s}(e,t)),t.option("sequences")&&(e=function(e,t){function r(){i=je.from_array(i),i&&u.push(n(Y,i,{body:i})),i=[]}if(e.length<2)return e;var i=[],u=[];return e.forEach(function(e){e instanceof Y?i.push(e.body):(r(),u.push(e))}),r(),u=o(u,t),a=u.length!=e.length,u}(e,t)),t.option("join_vars")&&(e=function(e,n){var t=null;return e.reduce(function(e,n){return n instanceof De&&t&&t.TYPE==n.TYPE?(t.definitions=t.definitions.concat(n.definitions),a=!0):n instanceof oe&&t instanceof De&&(!n.init||n.init.TYPE==t.TYPE)?(a=!0,e.pop(),n.init?n.init.definitions=t.definitions.concat(n.init.definitions):n.init=t,e.push(n),t=n):(t=n,e.push(n)),e},[])}(e,t))}while(a);return t.option("negate_iife")&&function(e,t){e.forEach(function(e){e instanceof Y&&(e.body=function e(t){return t.transform(new N(function(t){if(t instanceof Re&&t.expression instanceof pe)return n(Ie,t,{operator:"!",expression:t});if(t instanceof Re)t.expression=e(t.expression);else if(t instanceof je)t.car=e(t.car);else if(t instanceof ze){var r=e(t.condition);if(r!==t.condition){
// it has been negated, reverse
t.condition=r;var i=t.consequent;t.consequent=t.alternative,t.alternative=i}}return t}))}(e.body))})}(e),e}function c(e,n,t){e.warn("Dropping unreachable code [{file}:{line},{col}]",n.start),n.walk(new _(function(n){return n instanceof De?(e.warn("Declarations in unreachable code! [{file}:{line},{col}]",n.start),n.remove_initializers(),t.push(n),!0):n instanceof de?(t.push(n),!0):n instanceof se||void 0}))}function l(e,n){return e.print_to_string().length>n.print_to_string().length?n:e}
// tell me if a statement aborts
function b(e){return e&&e.aborts()}function x(e,t){function i(i){i=r(i),e.body instanceof K?(e.body=e.body.clone(),e.body.body=i.concat(e.body.body.slice(1)),e.body=e.body.transform(t)):e.body=n(K,e.body,{body:i}).transform(t),x(e,t)}var o=e.body instanceof K?e.body.body[0]:e.body;o instanceof _e&&(o.body instanceof be&&t.loopcontrol_target(o.body.label)===e?(e.condition?e.condition=n($e,e.condition,{left:e.condition,operator:"&&",right:o.condition.negate(t)}):e.condition=o.condition.negate(t),i(o.alternative)):o.alternative instanceof be&&t.loopcontrol_target(o.alternative.label)===e&&(e.condition?e.condition=n($e,e.condition,{left:e.condition,operator:"&&",right:o.condition}):e.condition=o.condition,i(o.body)))}function w(e,n){var t=n.option("pure_getters");n.options.pure_getters=!1;var r=e.has_side_effects(n);return n.options.pure_getters=t,r}function E(e,t){return t.option("booleans")&&t.in_boolean_context()?n(En,e):e}e(W,function(e,n){return e}),W.DEFMETHOD("equivalent_to",function(e){
// XXX: this is a rather expensive way to test two node's equivalence:
return this.print_to_string()==e.print_to_string()}),/* -----[ boolean/negation helpers ]----- */
// methods to determine whether an expression has a boolean result type
function(e){var n=["!","delete"],t=["in","instanceof","==","!=","===","!==","<","<=",">=",">"];e(W,function(){return!1}),e(Ie,function(){return o(this.operator,n)}),e($e,function(){return o(this.operator,t)||("&&"==this.operator||"||"==this.operator)&&this.left.is_boolean()&&this.right.is_boolean()}),e(ze,function(){return this.consequent.is_boolean()&&this.alternative.is_boolean()}),e(Ve,function(){return"="==this.operator&&this.right.is_boolean()}),e(je,function(){return this.cdr.is_boolean()}),e(En,function(){return!0}),e(wn,function(){return!0})}(function(e,n){e.DEFMETHOD("is_boolean",n)}),
// methods to determine if an expression has a string result type
function(e){e(W,function(){return!1}),e(pn,function(){return!0}),e(Ie,function(){return"typeof"==this.operator}),e($e,function(e){return"+"==this.operator&&(this.left.is_string(e)||this.right.is_string(e))}),e(Ve,function(e){return("="==this.operator||"+="==this.operator)&&this.right.is_string(e)}),e(je,function(e){return this.cdr.is_string(e)}),e(ze,function(e){return this.consequent.is_string(e)&&this.alternative.is_string(e)}),e(Re,function(e){return e.option("unsafe")&&this.expression instanceof sn&&"String"==this.expression.name&&this.expression.undeclared()})}(function(e,n){e.DEFMETHOD("is_string",n)}),
// methods to evaluate a constant expression
function(e){function n(e,n){if(!n)throw new Error("Compressor must be passed");return e._eval(n)}
// The evaluate method returns an array with one or two
// elements.  If the node has been successfully reduced to a
// constant, then the second element tells us the value;
// otherwise the second element is missing.  The first element
// of the array is always an AST_Node descendant; if
// evaluation was successful it's a node that represents the
// constant; otherwise it's the original or a replacement node.
W.DEFMETHOD("evaluate",function(n){if(!n.option("evaluate"))return[this];try{var r=this._eval(n);return[l(t(n,r,this),this),r]}catch(n){if(n!==e)throw n;return[this]}}),e(H,function(){throw new Error(d("Cannot evaluate a statement [{file}:{line},{col}]",this.start))}),e(pe,function(){
// XXX: AST_Function inherits from AST_Scope, which itself
// inherits from AST_Statement; however, an AST_Function
// isn't really a statement.  This could byte in other
// places too. :-( Wish JS had multiple inheritance.
throw e}),e(W,function(){throw e}),e(fn,function(){return this.getValue()}),e(Ie,function(t){var r=this.expression;switch(this.operator){case"!":return!n(r,t);case"typeof":
// Function would be evaluated to an array and so typeof would
// incorrectly return 'object'. Hence making is a special case.
if(r instanceof pe)return"function";
// typeof <RegExp> returns "object" or "function" on different platforms
// so cannot evaluate reliably
if((r=n(r,t))instanceof RegExp)throw e;return typeof r;case"void":return void n(r,t);case"~":return~n(r,t);case"-":if(0===(r=n(r,t)))throw e;return-r;case"+":return+n(r,t)}throw e}),e($e,function(t){var r=this.left,i=this.right;switch(this.operator){case"&&":return n(r,t)&&n(i,t);case"||":return n(r,t)||n(i,t);case"|":return n(r,t)|n(i,t);case"&":return n(r,t)&n(i,t);case"^":return n(r,t)^n(i,t);case"+":return n(r,t)+n(i,t);case"*":return n(r,t)*n(i,t);case"/":return n(r,t)/n(i,t);case"%":return n(r,t)%n(i,t);case"-":return n(r,t)-n(i,t);case"<<":return n(r,t)<<n(i,t);case">>":return n(r,t)>>n(i,t);case">>>":return n(r,t)>>>n(i,t);case"==":return n(r,t)==n(i,t);case"===":return n(r,t)===n(i,t);case"!=":return n(r,t)!=n(i,t);case"!==":return n(r,t)!==n(i,t);case"<":return n(r,t)<n(i,t);case"<=":return n(r,t)<=n(i,t);case">":return n(r,t)>n(i,t);case">=":return n(r,t)>=n(i,t);case"in":return n(r,t)in n(i,t);case"instanceof":return n(r,t)instanceof n(i,t)}throw e}),e(ze,function(e){return n(this.condition,e)?n(this.consequent,e):n(this.alternative,e)}),e(sn,function(t){var r=this.definition();if(r&&r.constant&&r.init)return n(r.init,t);throw e})}(function(e,n){e.DEFMETHOD("_eval",n)}),
// method to negate an expression
function(e){function t(e){return n(Ie,e,{operator:"!",expression:e})}e(W,function(){return t(this)}),e(H,function(){throw new Error("Cannot negate a statement")}),e(pe,function(){return t(this)}),e(Ie,function(){return"!"==this.operator?this.expression:t(this)}),e(je,function(e){var n=this.clone();return n.cdr=n.cdr.negate(e),n}),e(ze,function(e){var n=this.clone();return n.consequent=n.consequent.negate(e),n.alternative=n.alternative.negate(e),l(t(this),n)}),e($e,function(e){var n=this.clone(),r=this.operator;if(e.option("unsafe_comps"))switch(r){case"<=":return n.operator=">",n;case"<":return n.operator=">=",n;case">=":return n.operator="<",n;case">":return n.operator="<=",n}switch(r){case"==":return n.operator="!=",n;case"!=":return n.operator="==",n;case"===":return n.operator="!==",n;case"!==":return n.operator="===",n;case"&&":return n.operator="||",n.left=n.left.negate(e),n.right=n.right.negate(e),l(t(this),n);case"||":return n.operator="&&",n.left=n.left.negate(e),n.right=n.right.negate(e),l(t(this),n)}return t(this)})}(function(e,n){e.DEFMETHOD("negate",function(e){return n.call(this,e)})}),
// determine if expression has side effects
function(e){e(W,function(e){return!0}),e(Q,function(e){return!1}),e(fn,function(e){return!1}),e(ln,function(e){return!1}),e(Re,function(e){var n=e.option("pure_funcs");return!n||n.indexOf(this.expression.print_to_string())<0}),e(X,function(e){for(var n=this.body.length;--n>=0;)if(this.body[n].has_side_effects(e))return!0;return!1}),e(Y,function(e){return this.body.has_side_effects(e)}),e(de,function(e){return!0}),e(pe,function(e){return!1}),e($e,function(e){return this.left.has_side_effects(e)||this.right.has_side_effects(e)}),e(Ve,function(e){return!0}),e(ze,function(e){return this.condition.has_side_effects(e)||this.consequent.has_side_effects(e)||this.alternative.has_side_effects(e)}),e(Me,function(e){return"delete"==this.operator||"++"==this.operator||"--"==this.operator||this.expression.has_side_effects(e)}),e(sn,function(e){return!1}),e(He,function(e){for(var n=this.properties.length;--n>=0;)if(this.properties[n].has_side_effects(e))return!0;return!1}),e(Ge,function(e){return this.value.has_side_effects(e)}),e(We,function(e){for(var n=this.elements.length;--n>=0;)if(this.elements[n].has_side_effects(e))return!0;return!1}),e(Ne,function(e){return!e.option("pure_getters")||this.expression.has_side_effects(e)}),e(Te,function(e){return!e.option("pure_getters")||(this.expression.has_side_effects(e)||this.property.has_side_effects(e))}),e(Le,function(e){return!e.option("pure_getters")}),e(je,function(e){return this.car.has_side_effects(e)||this.cdr.has_side_effects(e)})}(function(e,n){e.DEFMETHOD("has_side_effects",n)}),function(e){function n(){var e=this.body.length;return e>0&&b(this.body[e-1])}e(H,function(){return null}),e(he,function(){return this}),e(K,n),e(Ee,n),e(_e,function(){return this.alternative&&b(this.body)&&b(this.alternative)})}(function(e,n){e.DEFMETHOD("aborts",n)}),/* -----[ optimizers ]----- */
e(J,function(e,t){return e.scope.has_directive(e.value)!==e.scope?n(Q,e):e}),e(G,function(e,t){return t.option("drop_debugger")?n(Q,e):e}),e(ee,function(e,t){return e.body instanceof be&&t.loopcontrol_target(e.body.label)===e.body?n(Q,e):0==e.label.references.length?e.body:e}),e(X,function(e,n){return e.body=s(e.body,n),e}),e(K,function(e,t){switch(e.body=s(e.body,t),e.body.length){case 1:return e.body[0];case 0:return n(Q,e)}return e}),se.DEFMETHOD("drop_unused",function(e){var t=this;if(e.option("unused")&&!(t instanceof ce)&&!t.uses_eval){var r=[],i=new y,a=this,u=new _(function(n,o){if(n!==t){if(n instanceof de)return i.add(n.name.name,n),!0;if(n instanceof De&&a===t)return n.definitions.forEach(function(n){n.value&&(i.add(n.name.name,n.value),n.value.has_side_effects(e)&&n.value.walk(u))}),!0;if(n instanceof sn)return p(r,n.definition()),!0;if(n instanceof se){var s=a;return a=n,o(),a=s,!0}}});t.walk(u);
// pass 2: for every used symbol we need to walk its
// initialization code to figure out if it uses other
// symbols (that may not be in_use).
for(var s=0;s<r.length;++s)r[s].orig.forEach(function(e){
// undeclared globals will be instanceof AST_SymbolRef
var n=i.get(e.name);n&&n.forEach(function(e){var n=new _(function(e){e instanceof sn&&p(r,e.definition())});e.walk(n)})});
// pass 3: we should drop declarations not in_use
var c=new N(function(i,a,u){if(i instanceof le&&!(i instanceof fe))for(var s=i.argnames,l=s.length;--l>=0;){var f=s[l];if(!f.unreferenced())break;s.pop(),e.warn("Dropping unused function argument {name} [{file}:{line},{col}]",{name:f.name,file:f.start.file,line:f.start.line,col:f.start.col})}if(i instanceof de&&i!==t)return o(i.name.definition(),r)?i:(e.warn("Dropping unused function {name} [{file}:{line},{col}]",{name:i.name.name,file:i.name.start.file,line:i.name.start.line,col:i.name.start.col}),n(Q,i));if(i instanceof De&&!(c.parent()instanceof ae)){var p=i.definitions.filter(function(n){if(o(n.name.definition(),r))return!0;var t={name:n.name.name,file:n.name.start.file,line:n.name.start.line,col:n.name.start.col};return n.value&&n.value.has_side_effects(e)?(n._unused_side_effects=!0,e.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]",t),!0):(e.warn("Dropping unused variable {name} [{file}:{line},{col}]",t),!1)});
// place uninitialized names at the start
p=g(p,function(e,n){return!e.value&&n.value?-1:!n.value&&e.value?1:0});for(var d=[],l=0;l<p.length;){var h=p[l];h._unused_side_effects?(d.push(h.value),p.splice(l,1)):(d.length>0&&(d.push(h.value),h.value=je.from_array(d),d=[]),++l)}return d=d.length>0?n(K,i,{body:[n(Y,i,{body:je.from_array(d)})]}):null,0!=p.length||d?0==p.length?d:(i.definitions=p,d&&(d.body.unshift(i),i=d),i):n(Q,i)}if(i instanceof oe&&(a(i,this),i.init instanceof K)){
// certain combination of unused name + side effect leads to:
//    https://github.com/mishoo/UglifyJS2/issues/44
// that's an invalid AST.
// We fix it at this stage by moving the `var` outside the `for`.
var m=i.init.body.slice(0,-1);return i.init=i.init.body.slice(-1)[0].body,m.push(i),u?z.splice(m):n(K,i,{body:m})}return i instanceof se&&i!==t?i:void 0});t.transform(c)}}),se.DEFMETHOD("hoist_declarations",function(e){var t=e.option("hoist_funs"),r=e.option("hoist_vars"),i=this;if(t||r){var o=[],u=[],s=new y,c=0,l=0;
// let's count var_decl first, we seem to waste a lot of
// space if we hoist `var` when there's only one.
i.walk(new _(function(e){return e instanceof se&&e!==i||(e instanceof Be?(++l,!0):void 0)})),r=r&&l>1;var f=new N(function(e){if(e!==i){if(e instanceof J)return o.push(e),n(Q,e);if(e instanceof de&&t)return u.push(e),n(Q,e);if(e instanceof Be&&r){e.definitions.forEach(function(e){s.set(e.name.name,e),++c});var a=e.to_assignments(),l=f.parent();return l instanceof ae&&l.init===e?null==a?e.definitions[0].name:a:l instanceof oe&&l.init===e?a:a?n(Y,e,{body:a}):n(Q,e)}if(e instanceof se)return e}});if(i=i.transform(f),c>0){
// collect only vars which don't show up in self's arguments list
var p=[];if(s.each(function(e,n){i instanceof le&&a(function(n){return n.name==e.name.name},i.argnames)?s.del(n):(e=e.clone(),e.value=null,p.push(e),s.set(n,e))}),p.length>0){
// try to merge in assignments
for(;0<i.body.length;){if(i.body[0]instanceof Y){var d,g,m=i.body[0].body;if(m instanceof Ve&&"="==m.operator&&(d=m.left)instanceof Ke&&s.has(d.name)){var v=s.get(d.name);if(v.value)break;v.value=m.right,h(p,v),p.push(v),i.body.splice(0,1);continue}if(m instanceof je&&(g=m.car)instanceof Ve&&"="==g.operator&&(d=g.left)instanceof Ke&&s.has(d.name)){var v=s.get(d.name);if(v.value)break;v.value=g.right,h(p,v),p.push(v),i.body[0].body=m.cdr;continue}}if(i.body[0]instanceof Q)i.body.splice(0,1);else{if(!(i.body[0]instanceof K))break;var b=[0,1].concat(i.body[0].body);i.body.splice.apply(i.body,b)}}p=n(Be,i,{definitions:p}),u.push(p)}}i.body=o.concat(u,i.body)}return i}),e(Y,function(e,t){return t.option("side_effects")&&!e.body.has_side_effects(t)?(t.warn("Dropping side-effect-free statement [{file}:{line},{col}]",e.start),n(Q,e)):e}),e(te,function(e,t){var r=e.condition.evaluate(t);if(e.condition=r[0],!t.option("loops"))return e;if(r.length>1){if(r[1])return n(oe,e,{body:e.body});if(e instanceof ie&&t.option("dead_code")){var i=[];return c(t,e.body,i),n(K,e,{body:i})}}return e}),e(ie,function(e,t){return t.option("loops")?(e=te.prototype.optimize.call(e,t),e instanceof ie&&(x(e,t),e=n(oe,e,e).transform(t)),e):e}),e(oe,function(e,t){var r=e.condition;if(r&&(r=r.evaluate(t),e.condition=r[0]),!t.option("loops"))return e;if(r&&r.length>1&&!r[1]&&t.option("dead_code")){var i=[];return e.init instanceof H?i.push(e.init):e.init&&i.push(n(Y,e.init,{body:e.init})),c(t,e.body,i),n(K,e,{body:i})}return x(e,t),e}),e(_e,function(e,t){if(!t.option("conditionals"))return e;
// if condition can be statically determined, warn and drop
// one of the blocks.  note, statically determined implies
// “has no side effects”; also it doesn't work for cases like
// `x && true`, though it probably should.
var r=e.condition.evaluate(t);if(e.condition=r[0],r.length>1)if(r[1]){if(t.warn("Condition always true [{file}:{line},{col}]",e.condition.start),t.option("dead_code")){var o=[];return e.alternative&&c(t,e.alternative,o),o.push(e.body),n(K,e,{body:o}).transform(t)}}else if(t.warn("Condition always false [{file}:{line},{col}]",e.condition.start),t.option("dead_code")){var o=[];return c(t,e.body,o),e.alternative&&o.push(e.alternative),n(K,e,{body:o}).transform(t)}i(e.alternative)&&(e.alternative=null);var a=e.condition.negate(t),u=l(e.condition,a)===a;if(e.alternative&&u){u=!1,// because we already do the switch here.
e.condition=a;var s=e.body;e.body=e.alternative||n(Q),e.alternative=s}if(i(e.body)&&i(e.alternative))return n(Y,e.condition,{body:e.condition}).transform(t);if(e.body instanceof Y&&e.alternative instanceof Y)return n(Y,e,{body:n(ze,e,{condition:e.condition,consequent:e.body.body,alternative:e.alternative.body})}).transform(t);if(i(e.alternative)&&e.body instanceof Y)return u?n(Y,e,{body:n($e,e,{operator:"||",left:a,right:e.body.body})}).transform(t):n(Y,e,{body:n($e,e,{operator:"&&",left:e.condition,right:e.body.body})}).transform(t);if(e.body instanceof Q&&e.alternative&&e.alternative instanceof Y)return n(Y,e,{body:n($e,e,{operator:"||",left:e.condition,right:e.alternative.body})}).transform(t);if(e.body instanceof ge&&e.alternative instanceof ge&&e.body.TYPE==e.alternative.TYPE)return n(e.body.CTOR,e,{value:n(ze,e,{condition:e.condition,consequent:e.body.value||n(yn,e.body).optimize(t),alternative:e.alternative.value||n(yn,e.alternative).optimize(t)})}).transform(t);if(e.body instanceof _e&&!e.body.alternative&&!e.alternative&&(e.condition=n($e,e.condition,{operator:"&&",left:e.condition,right:e.body.condition}).transform(t),e.body=e.body.body),b(e.body)&&e.alternative){var f=e.alternative;return e.alternative=null,n(K,e,{body:[e,f]}).transform(t)}if(b(e.alternative)){var p=e.body;return e.body=e.alternative,e.condition=u?a:e.condition.negate(t),e.alternative=null,n(K,e,{body:[e,p]}).transform(t)}return e}),e(we,function(e,t){if(0==e.body.length&&t.option("conditionals"))return n(Y,e,{body:e.expression}).transform(t);for(;;){var r=e.body[e.body.length-1];if(r){var i=r.body[r.body.length-1];if(// last statement
i instanceof be&&u(t.loopcontrol_target(i.label))===e&&r.body.pop(),r instanceof Ae&&0==r.body.length){e.body.pop();continue}}break}var o=e.expression.evaluate(t);e:if(2==o.length)try{if(
// constant expression
e.expression=o[0],!t.option("dead_code"))break e;var a=o[1],s=!1,c=!1,l=!1,f=!1,p=!1,d=new N(function(r,i,o){if(r instanceof le||r instanceof Y)
// no need to descend these node types
return r;if(r instanceof we&&r===e)return r=r.clone(),i(r,this),p?r:n(K,r,{body:r.body.reduce(function(e,n){return e.concat(n.body)},[])}).transform(t);if(r instanceof _e||r instanceof Fe){var u=s;return s=!c,i(r,this),s=u,r}if(r instanceof Z||r instanceof we){var u=c;return c=!0,i(r,this),c=u,r}if(r instanceof be&&this.loopcontrol_target(r.label)===e)return s?(p=!0,r):c?r:(f=!0,o?z.skip:n(Q,r));if(r instanceof Ee&&this.parent()===e){if(f)return z.skip;if(r instanceof Ce){var d=r.expression.evaluate(t);if(d.length<2)
// got a case with non-constant expression, baling out
throw e;return d[1]===a||l?(l=!0,b(r)&&(f=!0),i(r,this),r):z.skip}return i(r,this),r}});d.stack=t.stack.slice(),// so that's able to see parent nodes
e=e.transform(d)}catch(n){if(n!==e)throw n}return e}),e(Ce,function(e,n){return e.body=s(e.body,n),e}),e(Fe,function(e,n){return e.body=s(e.body,n),e}),De.DEFMETHOD("remove_initializers",function(){this.definitions.forEach(function(e){e.value=null})}),De.DEFMETHOD("to_assignments",function(){var e=this.definitions.reduce(function(e,t){if(t.value){var r=n(sn,t.name,t.name);e.push(n(Ve,t,{operator:"=",left:r,right:t.value}))}return e},[]);return 0==e.length?null:je.from_array(e)}),e(De,function(e,t){return 0==e.definitions.length?n(Q,e):e}),e(pe,function(e,n){return e=le.prototype.optimize.call(e,n),n.option("unused")&&e.name&&e.name.unreferenced()&&(e.name=null),e}),e(Re,function(e,r){if(r.option("unsafe")){var i=e.expression;if(i instanceof sn&&i.undeclared())switch(i.name){case"Array":if(1!=e.args.length)return n(We,e,{elements:e.args}).transform(r);break;case"Object":if(0==e.args.length)return n(He,e,{properties:[]});break;case"String":if(0==e.args.length)return n(pn,e,{value:""});if(e.args.length<=1)return n($e,e,{left:e.args[0],operator:"+",right:n(pn,e,{value:""})}).transform(r);break;case"Number":if(0==e.args.length)return n(dn,e,{value:0});if(1==e.args.length)return n(Ie,e,{expression:e.args[0],operator:"+"}).transform(r);case"Boolean":if(0==e.args.length)return n(wn,e);if(1==e.args.length)return n(Ie,e,{expression:n(Ie,null,{expression:e.args[0],operator:"!"}),operator:"!"}).transform(r);break;case"Function":if(v(e.args,function(e){return e instanceof pn}))
// quite a corner-case, but we can handle it:
//   https://github.com/mishoo/UglifyJS2/issues/203
// if the code argument is a constant, then we can minify it.
try{var o="(function("+e.args.slice(0,-1).map(function(e){return e.value}).join(",")+"){"+e.args[e.args.length-1].value+"})()",a=L(o);a.figure_out_scope({screw_ie8:r.option("screw_ie8")});var u=new I(r.options);a=a.transform(u),a.figure_out_scope({screw_ie8:r.option("screw_ie8")}),a.mangle_names();var s;try{a.walk(new _(function(e){if(e instanceof le)throw s=e,a}))}catch(e){if(e!==a)throw e}var c=s.argnames.map(function(t,r){return n(pn,e.args[r],{value:t.print_to_string()})}),o=M();return K.prototype._codegen.call(s,s,o),o=o.toString().replace(/^\{|\}$/g,""),c.push(n(pn,e.args[e.args.length-1],{value:o})),e.args=c,e}catch(n){if(!(n instanceof q))throw console.log(n),n;r.warn("Error parsing code passed to new Function [{file}:{line},{col}]",e.args[e.args.length-1].start),r.warn(n.toString())}}else{if(i instanceof Ne&&"toString"==i.property&&0==e.args.length)return n($e,e,{left:n(pn,e,{value:""}),operator:"+",right:i.expression}).transform(r);if(i instanceof Ne&&i.expression instanceof We&&"join"==i.property){var f=0==e.args.length?",":e.args[0].evaluate(r)[1];if(null!=f){// not a constant
var p=i.expression.elements.reduce(function(e,n){if(n=n.evaluate(r),0==e.length||1==n.length)e.push(n);else{var i=e[e.length-1];if(2==i.length){
// it's a constant
var o=""+i[1]+f+n[1];e[e.length-1]=[t(r,o,i[0]),o]}else e.push(n)}return e},[]);if(0==p.length)return n(pn,e,{value:""});if(1==p.length)return p[0][0];if(""==f){var d;return d=p[0][0]instanceof pn||p[1][0]instanceof pn?p.shift()[0]:n(pn,e,{value:""}),p.reduce(function(e,t){return n($e,t[0],{operator:"+",left:e,right:t[0]})},d).transform(r)}
// need this awkward cloning to not affect original element
// best_of will decide which one to get through.
var h=e.clone();return h.expression=h.expression.clone(),h.expression.expression=h.expression.expression.clone(),h.expression.expression.elements=p.map(function(e){return e[0]}),l(e,h)}}}}return r.option("side_effects")&&e.expression instanceof pe&&0==e.args.length&&!X.prototype.has_side_effects.call(e.expression,r)?n(yn,e).transform(r):r.option("drop_console")&&e.expression instanceof Le&&e.expression.expression instanceof sn&&"console"==e.expression.expression.name&&e.expression.expression.undeclared()?n(yn,e).transform(r):e.evaluate(r)[0]}),e(Pe,function(e,t){if(t.option("unsafe")){var r=e.expression;if(r instanceof sn&&r.undeclared())switch(r.name){case"Object":case"RegExp":case"Function":case"Error":case"Array":return n(Re,e,e).transform(t)}}return e}),e(je,function(e,t){if(!t.option("side_effects"))return e;if(!e.car.has_side_effects(t)){
// we shouldn't compress (1,eval)(something) to
// eval(something) because that changes the meaning of
// eval (becomes lexical instead of global).
var r;if(!(e.cdr instanceof sn&&"eval"==e.cdr.name&&e.cdr.undeclared()&&(r=t.parent())instanceof Re&&r.expression===e))return e.cdr}if(t.option("cascade")){if(e.car instanceof Ve&&!e.car.left.has_side_effects(t)){if(e.car.left.equivalent_to(e.cdr))return e.car;if(e.cdr instanceof Re&&e.cdr.expression.equivalent_to(e.car.left))return e.cdr.expression=e.car,e.cdr}if(!e.car.has_side_effects(t)&&!e.cdr.has_side_effects(t)&&e.car.equivalent_to(e.cdr))return e.car}return e.cdr instanceof Ie&&"void"==e.cdr.operator&&!e.cdr.expression.has_side_effects(t)?(e.cdr.operator=e.car,e.cdr):e.cdr instanceof yn?n(Ie,e,{operator:"void",expression:e.car}):e}),Me.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")&&this.expression instanceof je){var n=this.expression,t=n.to_array();return this.expression=t.pop(),t.push(this),n=je.from_array(t).transform(e)}return this}),e(Ue,function(e,n){return e.lift_sequences(n)}),e(Ie,function(e,t){e=e.lift_sequences(t);var r=e.expression;if(t.option("booleans")&&t.in_boolean_context()){switch(e.operator){case"!":if(r instanceof Ie&&"!"==r.operator)
// !!foo ==> foo, if we're in boolean context
return r.expression;break;case"typeof":
// typeof always returns a non-empty string, thus it's
// always true in booleans
return t.warn("Boolean expression always true [{file}:{line},{col}]",e.start),n(En,e)}r instanceof $e&&"!"==e.operator&&(e=l(e,r.negate(t)))}return e.evaluate(t)[0]}),$e.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")){if(this.left instanceof je){var n=this.left,t=n.to_array();return this.left=t.pop(),t.push(this),n=je.from_array(t).transform(e)}if(this.right instanceof je&&this instanceof Ve&&!w(this.left,e)){var n=this.right,t=n.to_array();return this.right=t.pop(),t.push(this),n=je.from_array(t).transform(e)}}return this});var A=m("== === != !== * & | ^");e($e,function(e,t){var r=t.has_directive("use asm")?f:function(n,r){if(r||!e.left.has_side_effects(t)&&!e.right.has_side_effects(t)){n&&(e.operator=n);var i=e.left;e.left=e.right,e.right=i}};if(A(e.operator)&&(e.right instanceof fn&&!(e.left instanceof fn)&&(
// if right is a constant, whatever side effects the
// left side might have could not influence the
// result.  hence, force switch.
e.left instanceof $e&&Un[e.left.operator]>=Un[e.operator]||r(null,!0)),/^[!=]==?$/.test(e.operator))){if(e.left instanceof sn&&e.right instanceof ze){if(e.right.consequent instanceof sn&&e.right.consequent.definition()===e.left.definition()){if(/^==/.test(e.operator))return e.right.condition;if(/^!=/.test(e.operator))return e.right.condition.negate(t)}if(e.right.alternative instanceof sn&&e.right.alternative.definition()===e.left.definition()){if(/^==/.test(e.operator))return e.right.condition.negate(t);if(/^!=/.test(e.operator))return e.right.condition}}if(e.right instanceof sn&&e.left instanceof ze){if(e.left.consequent instanceof sn&&e.left.consequent.definition()===e.right.definition()){if(/^==/.test(e.operator))return e.left.condition;if(/^!=/.test(e.operator))return e.left.condition.negate(t)}if(e.left.alternative instanceof sn&&e.left.alternative.definition()===e.right.definition()){if(/^==/.test(e.operator))return e.left.condition.negate(t);if(/^!=/.test(e.operator))return e.left.condition}}}if(e=e.lift_sequences(t),t.option("comparisons"))switch(e.operator){case"===":case"!==":(e.left.is_string(t)&&e.right.is_string(t)||e.left.is_boolean()&&e.right.is_boolean())&&(e.operator=e.operator.substr(0,2));
// XXX: intentionally falling down to the next case
case"==":case"!=":e.left instanceof pn&&"undefined"==e.left.value&&e.right instanceof Ie&&"typeof"==e.right.operator&&t.option("unsafe")&&(e.right.expression instanceof sn&&e.right.expression.undeclared()||(e.right=e.right.expression,e.left=n(yn,e.left).optimize(t),2==e.operator.length&&(e.operator+="=")))}if(t.option("booleans")&&t.in_boolean_context())switch(e.operator){case"&&":var i=e.left.evaluate(t),o=e.right.evaluate(t);if(i.length>1&&!i[1]||o.length>1&&!o[1])return t.warn("Boolean && always false [{file}:{line},{col}]",e.start),n(wn,e);if(i.length>1&&i[1])return o[0];if(o.length>1&&o[1])return i[0];break;case"||":var i=e.left.evaluate(t),o=e.right.evaluate(t);if(i.length>1&&i[1]||o.length>1&&o[1])return t.warn("Boolean || always true [{file}:{line},{col}]",e.start),n(En,e);if(i.length>1&&!i[1])return o[0];if(o.length>1&&!o[1])return i[0];break;case"+":var i=e.left.evaluate(t),o=e.right.evaluate(t);if(i.length>1&&i[0]instanceof pn&&i[1]||o.length>1&&o[0]instanceof pn&&o[1])return t.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),n(En,e)}if(t.option("comparisons")){if(!(t.parent()instanceof $e)||t.parent()instanceof Ve){e=l(e,n(Ie,e,{operator:"!",expression:e.negate(t)}))}switch(e.operator){case"<":r(">");break;case"<=":r(">=")}}
// x * (y * z)  ==>  x * y * z
return"+"==e.operator&&e.right instanceof pn&&""===e.right.getValue()&&e.left instanceof $e&&"+"==e.left.operator&&e.left.is_string(t)?e.left:(t.option("evaluate")&&"+"==e.operator&&(e.left instanceof fn&&e.right instanceof $e&&"+"==e.right.operator&&e.right.left instanceof fn&&e.right.is_string(t)&&(e=n($e,e,{operator:"+",left:n(pn,null,{value:""+e.left.getValue()+e.right.left.getValue(),start:e.left.start,end:e.right.left.end}),right:e.right.right})),e.right instanceof fn&&e.left instanceof $e&&"+"==e.left.operator&&e.left.right instanceof fn&&e.left.is_string(t)&&(e=n($e,e,{operator:"+",left:e.left.left,right:n(pn,null,{value:""+e.left.right.getValue()+e.right.getValue(),start:e.left.right.start,end:e.right.end})})),e.left instanceof $e&&"+"==e.left.operator&&e.left.is_string(t)&&e.left.right instanceof fn&&e.right instanceof $e&&"+"==e.right.operator&&e.right.left instanceof fn&&e.right.is_string(t)&&(e=n($e,e,{operator:"+",left:n($e,e.left,{operator:"+",left:e.left.left,right:n(pn,null,{value:""+e.left.right.getValue()+e.right.left.getValue(),start:e.left.right.start,end:e.right.left.end})}),right:e.right.right}))),e.right instanceof $e&&e.right.operator==e.operator&&("*"==e.operator||"&&"==e.operator||"||"==e.operator)?(e.left=n($e,e.left,{operator:e.operator,left:e.left,right:e.right.left}),e.right=e.right.right,e.transform(t)):e.evaluate(t)[0])}),e(sn,function(e,r){if(e.undeclared()){var i=r.option("global_defs");if(i&&i.hasOwnProperty(e.name))return t(r,i[e.name],e);switch(e.name){case"undefined":return n(yn,e);case"NaN":return n(vn,e);case"Infinity":return n(xn,e)}}return e}),e(yn,function(e,t){if(t.option("unsafe")){var r=t.find_parent(se),i=r.find_variable("undefined");if(i){var o=n(sn,e,{name:"undefined",scope:r,thedef:i});return o.reference(),o}}return e});var C=["+","-","/","*","%",">>","<<",">>>","|","^","&"];e(Ve,function(e,n){return e=e.lift_sequences(n),"="==e.operator&&e.left instanceof sn&&e.right instanceof $e&&e.right.left instanceof sn&&e.right.left.name==e.left.name&&o(e.right.operator,C)&&(e.operator=e.right.operator+"=",e.right=e.right.right),e}),e(ze,function(e,t){if(!t.option("conditionals"))return e;if(e.condition instanceof je){var r=e.condition.car;return e.condition=e.condition.cdr,je.cons(r,e)}var i=e.condition.evaluate(t);if(i.length>1)return i[1]?(t.warn("Condition always true [{file}:{line},{col}]",e.start),e.consequent):(t.warn("Condition always false [{file}:{line},{col}]",e.start),e.alternative);var o=i[0].negate(t);l(i[0],o)===o&&(e=n(ze,e,{condition:o,consequent:e.alternative,alternative:e.consequent}));var a=e.consequent,u=e.alternative;if(a instanceof Ve&&u instanceof Ve&&a.operator==u.operator&&a.left.equivalent_to(u.left))/*
             * Stuff like this:
             * if (foo) exp = something; else exp = something_else;
             * ==>
             * exp = foo ? something : something_else;
             */
return n(Ve,e,{operator:a.operator,left:a.left,right:n(ze,e,{condition:e.condition,consequent:a.right,alternative:u.right})});if(a instanceof Re&&u.TYPE===a.TYPE&&a.args.length==u.args.length&&a.expression.equivalent_to(u.expression)){if(0==a.args.length)return n(je,e,{car:e.condition,cdr:a});if(1==a.args.length)return a.args[0]=n(ze,e,{condition:e.condition,consequent:a.args[0],alternative:u.args[0]}),a}return e}),e(_n,function(e,t){if(t.option("booleans")){var r=t.parent();return r instanceof $e&&("=="==r.operator||"!="==r.operator)?(t.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]",{operator:r.operator,value:e.value,file:r.start.file,line:r.start.line,col:r.start.col}),n(dn,e,{value:+e.value})):n(Ie,e,{operator:"!",expression:n(dn,e,{value:1-e.value})})}return e}),e(Te,function(e,t){var r=e.property;if(r instanceof pn&&t.option("properties")){if(r=r.getValue(),Fn(r)?t.option("screw_ie8"):B(r))return n(Ne,e,{expression:e.expression,property:r});var i=parseFloat(r);isNaN(i)||i.toString()!=r||(e.property=n(dn,e.property,{value:i}))}return e}),e(We,E),e(He,E),e(hn,E)}(),function(){function e(e){return new(("prefix"in e?e.prefix:"UnaryExpression"==e.type)?Ie:Ue)({start:n(e),end:t(e),operator:e.operator,expression:i(e.argument)})}/* -----[ tools ]----- */
function n(e){return new V({file:e.loc&&e.loc.source,line:e.loc&&e.loc.start.line,col:e.loc&&e.loc.start.column,pos:e.start,endpos:e.start})}function t(e){return new V({file:e.loc&&e.loc.source,line:e.loc&&e.loc.end.line,col:e.loc&&e.loc.end.column,pos:e.end,endpos:e.end})}function r(e,r,a){var u="function From_Moz_"+e+"(M){\n";
// moz_to_me = parse(moz_to_me).print_to_string({ beautify: true });
// console.log(moz_to_me);
return u+="return new mytype({\nstart: my_start_token(M),\nend: my_end_token(M)",a&&a.split(/\s*,\s*/).forEach(function(e){var n=/([a-z0-9$_]+)(=|@|>|%)([a-z0-9$_]+)/i.exec(e);if(!n)throw new Error("Can't understand property map: "+e);var t="M."+n[1],r=n[2];if(u+=",\n"+n[3]+": ","@"==r)u+=t+".map(from_moz)";else if(">"==r)u+="from_moz("+t+")";else if("="==r)u+=t;else{if("%"!=r)throw new Error("Can't understand operator in propmap: "+e);u+="from_moz("+t+").body"}}),u+="\n})}",u=new Function("mytype","my_start_token","my_end_token","from_moz","return("+u+")")(r,n,t,i),o[e]=u}function i(e){a.push(e);var n=null!=e?o[e.type](e):null;return a.pop(),n}var o={TryStatement:function(e){return new Fe({start:n(e),end:t(e),body:i(e.block).body,bcatch:i(e.handlers[0]),bfinally:e.finalizer?new ke(i(e.finalizer)):null})},CatchClause:function(e){return new Se({start:n(e),end:t(e),argname:i(e.param),body:i(e.body).body})},ObjectExpression:function(e){return new He({start:n(e),end:t(e),properties:e.properties.map(function(e){var r=e.key,o="Identifier"==r.type?r.name:r.value,a={start:n(r),end:t(e.value),key:o,value:i(e.value)};switch(e.kind){case"init":return new Je(a);case"set":return a.value.name=i(r),new Ye(a);case"get":return a.value.name=i(r),new Xe(a)}})})},SequenceExpression:function(e){return je.from_array(e.expressions.map(i))},MemberExpression:function(e){return new(e.computed?Te:Ne)({start:n(e),end:t(e),property:e.computed?i(e.property):e.property.name,expression:i(e.object)})},SwitchCase:function(e){return new(e.test?Ce:Ae)({start:n(e),end:t(e),expression:i(e.test),body:e.consequent.map(i)})},Literal:function(e){var r=e.value,i={start:n(e),end:t(e)};if(null===r)return new mn(i);switch(typeof r){case"string":return i.value=r,new pn(i);case"number":return i.value=r,new dn(i);case"boolean":return new(r?En:wn)(i);default:return i.value=r,new hn(i)}},UnaryExpression:e,UpdateExpression:e,Identifier:function(e){var r=a[a.length-2];return new("this"==e.name?ln:"LabeledStatement"==r.type?un:"VariableDeclarator"==r.type&&r.id===e?"const"==r.kind?nn:en:"FunctionExpression"==r.type?r.id===e?on:tn:"FunctionDeclaration"==r.type?r.id===e?rn:tn:"CatchClause"==r.type?an:"BreakStatement"==r.type||"ContinueStatement"==r.type?cn:sn)({start:n(e),end:t(e),name:e.name})}};r("Node",W),r("Program",ce,"body@body"),r("Function",pe,"id>name, params@argnames, body%body"),r("EmptyStatement",Q),r("BlockStatement",K,"body@body"),r("ExpressionStatement",Y,"expression>body"),r("IfStatement",_e,"test>condition, consequent>body, alternate>alternative"),r("LabeledStatement",ee,"label>label, body>body"),r("BreakStatement",be,"label>label"),r("ContinueStatement",xe,"label>label"),r("WithStatement",ue,"object>expression, body>body"),r("SwitchStatement",we,"discriminant>expression, cases@body"),r("ReturnStatement",me,"argument>value"),r("ThrowStatement",ve,"argument>value"),r("WhileStatement",ie,"test>condition, body>body"),r("DoWhileStatement",re,"test>condition, body>body"),r("ForStatement",oe,"init>init, test>condition, update>step, body>body"),r("ForInStatement",ae,"left>init, right>object, body>body"),r("DebuggerStatement",G),r("FunctionDeclaration",de,"id>name, params@argnames, body%body"),r("VariableDeclaration",Be,"declarations@definitions"),r("VariableDeclarator",qe,"id>name, init>value"),r("ThisExpression",ln),r("ArrayExpression",We,"elements@elements"),r("FunctionExpression",pe,"id>name, params@argnames, body%body"),r("BinaryExpression",$e,"operator=operator, left>left, right>right"),r("AssignmentExpression",Ve,"operator=operator, left>left, right>right"),r("LogicalExpression",$e,"operator=operator, left>left, right>right"),r("ConditionalExpression",ze,"test>condition, consequent>consequent, alternate>alternative"),r("NewExpression",Pe,"callee>expression, arguments@args"),r("CallExpression",Re,"callee>expression, arguments@args");var a=null;W.from_mozilla_ast=function(e){var n=a;a=[];var t=i(e);return a=n,t}}(),W.warn_function=function(e){n.error("uglifyjs2 WARN: "+e)},exports.minify=function(e,n,r){n=c(n,{spidermonkey:!1,outSourceMap:null,sourceRoot:null,inSourceMap:null,fromString:!1,warnings:!1,mangle:{},output:null,compress:{}}),zn.reset();
// 1. parse
var i=null;
// 2. compress
if(n.spidermonkey?i=W.from_mozilla_ast(e):("string"==typeof e&&(e=[e]),e.forEach(function(e){i=L(n.fromString?e:t.readFile(e,"utf8"),{filename:n.fromString?r:e,toplevel:i})})),n.compress){var o={warnings:n.warnings};l(o,n.compress),i.figure_out_scope();var a=I(o);i=i.transform(a)}
// 3. mangle
n.mangle&&(i.figure_out_scope(),i.compute_char_frequency(),i.mangle_names(n.mangle));
// 4. output
var u=n.inSourceMap,s={};"string"==typeof n.inSourceMap&&(u=t.readFile(n.inSourceMap,"utf8")),n.outSourceMap&&(s.source_map=U({file:n.outSourceMap,orig:u,root:n.sourceRoot})),n.output&&l(s,n.output);var f=M(s);return i.print(f),{code:f+"",map:s.source_map+""}},
// exports.describe_ast = function() {
//     function doitem(ctor) {
//         var sub = {};
//         ctor.SUBCLASSES.forEach(function(ctor){
//             sub[ctor.TYPE] = doitem(ctor);
//         });
//         var ret = {};
//         if (ctor.SELF_PROPS.length > 0) ret.props = ctor.SELF_PROPS;
//         if (ctor.SUBCLASSES.length > 0) ret.sub = sub;
//         return ret;
//     }
//     return doitem(AST_Node).sub;
// }
exports.describe_ast=function(){function e(t){n.print("AST_"+t.TYPE);var r=t.SELF_PROPS.filter(function(e){return!/^\$/.test(e)});r.length>0&&(n.space(),n.with_parens(function(){r.forEach(function(e,t){t&&n.space(),n.print(e)})})),t.documentation&&(n.space(),n.print_string(t.documentation)),t.SUBCLASSES.length>0&&(n.space(),n.with_block(function(){t.SUBCLASSES.forEach(function(t,r){n.indent(),e(t),n.newline()})}))}var n=M({beautify:!0});return e(W),n+""}}),/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint plusplus: true */
/*global define: false */
define("parse",["./esprimaAdapter","lang"],function(esprima,lang){"use strict";function arrayToString(e){var n="[";return e&&e.forEach(function(e,t){n+=(t>0?",":"")+'"'+lang.jsEscape(e)+'"'}),n+="]"}
//From an esprima example for traversing its ast.
function traverse(e,n){var t,r;if(e){if(n.call(null,e)===!1)return!1;for(t in e)if(e.hasOwnProperty(t)&&"object"==typeof(r=e[t])&&null!==r&&traverse(r,n)===!1)return!1}}
//Like traverse, but visitor returning false just
//stops that subtree analysis, not the rest of tree
//visiting.
function traverseBroad(e,n){var t,r;if(e){if(n.call(null,e)===!1)return!1;for(t in e)e.hasOwnProperty(t)&&"object"==typeof(r=e[t])&&null!==r&&traverseBroad(r,n)}}/**
     * Pulls out dependencies from an array literal with just string members.
     * If string literals, will just return those string values in an array,
     * skipping other items in the array.
     *
     * @param {Node} node an AST node.
     *
     * @returns {Array} an array of strings.
     * If null is returned, then it means the input node was not a valid
     * dependency.
     */
function getValidDeps(e){if(e&&"ArrayExpression"===e.type&&e.elements){var n=[];return e.elements.some(function(e){"Literal"===e.type&&n.push(e.value)}),n.length?n:void 0}}/**
     * Main parse function. Returns a string of any valid require or
     * define/require.def calls as part of one JavaScript source string.
     * @param {String} moduleName the module name that represents this file.
     * It is used to create a default define if there is not one already for the
     * file. This allows properly tracing dependencies for builds. Otherwise, if
     * the file just has a require() call, the file dependencies will not be
     * properly reflected: the file will come before its dependencies.
     * @param {String} moduleName
     * @param {String} fileName
     * @param {String} fileContents
     * @param {Object} options optional options. insertNeedsDefine: true will
     * add calls to require.needsDefine() if appropriate.
     * @returns {String} JS source string or null, if no require or
     * define/require.def calls are found.
     */
function parse(e,n,t,r){r=r||{};
//Set up source input
var i,o,a,u=[],s="",c=[],l=!0,f=esprima.parse(t);if(parse.recurse(f,function(n,t,i,o){
//If define was found, no need to dive deeper, unless
//the config explicitly wants to dig deeper.
//If there is no module name, the dependencies are for
//this file/default module name.
return o||(o=[]),"define"!==n||i&&i!==e||(l=!1),i?c.push({name:i,deps:o}):u=u.concat(o),!!r.findNestedDependencies},r),r.insertNeedsDefine&&l&&(s+='require.needsDefine("'+e+'");'),u.length||c.length){for(i=0;i<c.length;i++)o=c[i],s&&(s+="\n"),
//If this is the main module for this file, combine any
//"anonymous" dependencies (could come from a nested require
//call) with this module.
o.name===e&&(o.deps=o.deps.concat(u),u=[]),a=arrayToString(o.deps),s+='define("'+o.name+'",'+a+");";u.length&&(s&&(s+="\n"),a=arrayToString(u),s+='define("'+e+'",'+a+");")}return s||null}
//This string is saved off because JSLint complains
//about obj.arguments use, as 'reserved word'
var argPropName="arguments";/**
     * Handles parsing a file recursively for require calls.
     * @param {Array} parentNode the AST node to start with.
     * @param {Function} onMatch function to call on a parse match.
     * @param {Object} [options] This is normally the build config options if
     * it is passed.
     */
/**
     * Determines if the file defines the require/define module API.
     * Specifically, it looks for the `define.amd = ` expression.
     * @param {String} fileName
     * @param {String} fileContents
     * @returns {Boolean}
     */
/**
     * Finds require("") calls inside a CommonJS anonymous module wrapped in a
     * define(function(require, exports, module){}) wrapper. These dependencies
     * will be added to a modified define() call that lists the dependencies
     * on the outside of the function.
     * @param {String} fileName
     * @param {String|Object} fileContents: a string of contents, or an already
     * parsed AST tree.
     * @returns {Array} an array of module names that are dependencies. Always
     * returns an array, but could be of length zero.
     */
/**
     * Finds require("") calls inside a CommonJS anonymous module wrapped
     * in a define function, given an AST node for the definition function.
     * @param {Node} node the AST node for the definition function.
     * @returns {Array} and array of dependency names. Can be of zero length.
     */
/**
     * Finds the function in define(function (require, exports, module){});
     * @param {Array} node
     * @returns {Boolean}
     */
/**
     * Finds any config that is passed to requirejs. That includes calls to
     * require/requirejs.config(), as well as require({}, ...) and
     * requirejs({}, ...)
     * @param {String} fileContents
     *
     * @returns {Object} a config details object with the following properties:
     * - config: {Object} the config object found. Can be undefined if no
     * config found.
     * - range: {Array} the start index and end index in the contents where
     * the config was found. Can be undefined if no config found.
     * Can throw an error if the config in the file cannot be evaluated in
     * a build context to valid JavaScript.
     */
/** Returns the node for the object literal assigned to require/requirejs,
     * for holding a declarative config.
     */
/**
     * Renames require/requirejs/define calls to be ns + '.' + require/requirejs/define
     * Does *not* do .config calls though. See pragma.namespace for the complete
     * set of namespace transforms. This function is used because require calls
     * inside a define() call should not be renamed, so a simple regexp is not
     * good enough.
     * @param  {String} fileContents the contents to transform.
     * @param  {String} ns the namespace, *not* including trailing dot.
     * @return {String} the fileContents with the namespace applied
     */
/**
     * Finds all dependencies specified in dependency arrays and inside
     * simplified commonjs wrappers.
     * @param {String} fileName
     * @param {String} fileContents
     *
     * @returns {Array} an array of dependency strings. The dependencies
     * have not been normalized, they may be relative IDs.
     */
/**
     * Finds only CJS dependencies, ones that are the form
     * require('stringLiteral')
     */
//function define() {}
//define.amd = ...
//define.amd reference, as in: if (define.amd)
//require(), requirejs(), require.config() and requirejs.config()
//define()
/**
     * If there is a named define in the file, returns the name. Does not
     * scan for mulitple names, just the first one.
     */
/**
     * Determines if define(), require({}|[]) or requirejs was called in the
     * file. Also finds out if define() is declared and if define.amd is called.
     */
/**
     * Determines if require(''), exports.x =, module.exports =,
     * __dirname, __filename are used. So, not strictly traditional CommonJS,
     * also checks for Node variants.
     */
/**
     * Determines if a specific node is a valid require or define/require.def
     * call.
     * @param {Array} node
     * @param {Function} onMatch a function to call when a match is found.
     * It is passed the match name, and the config, name, deps possible args.
     * The config, name and deps args are not normalized.
     *
     * @returns {String} a JS source string with the valid require/define call.
     * Otherwise null.
     */
/**
     * Converts an AST node into a JS source string by extracting
     * the node's location from the given contents string. Assumes
     * esprima.parse() with loc was done.
     * @param {String} contents
     * @param {Object} node
     * @returns {String} a JS source string.
     */
/**
     * Extracts license comments from JS text.
     * @param {String} fileName
     * @param {String} contents
     * @returns {String} a string of license comments.
     */
return parse.traverse=traverse,parse.traverseBroad=traverseBroad,parse.recurse=function(e,n,t){
//Like traverse, but skips if branches that would not be processed
//after has application that results in tests of true or false boolean
//literal values.
var r,i,o=t&&t.has;if(e)
//If has replacement has resulted in if(true){} or if(false){}, take
//the appropriate branch and skip the other one.
if(o&&"IfStatement"===e.type&&e.test.type&&"Literal"===e.test.type)e.test.value?
//Take the if branch
this.recurse(e.consequent,n,t):
//Take the else branch
this.recurse(e.alternate,n,t);else{if(this.parseNode(e,n)===!1)return;for(r in e)e.hasOwnProperty(r)&&"object"==typeof(i=e[r])&&null!==i&&this.recurse(i,n,t)}},parse.definesRequire=function(e,n){var t=!1;return traverse(esprima.parse(n),function(e){if(parse.hasDefineAmd(e))
//Stop traversal
return t=!0,!1}),t},parse.getAnonDeps=function(e,n){var t="string"==typeof n?esprima.parse(n):n,r=this.findAnonDefineFactory(t);return parse.getAnonDepsFromNode(r)},parse.getAnonDepsFromNode=function(e){var n,t=[];
//If no deps, still add the standard CommonJS require, exports,
//module, in that order, to the deps, but only if specified as
//function args. In particular, if exports is used, it is favored
//over the return value of the function, so only add it if asked.
return e&&(this.findRequireDepNames(e,t),(n=e.params&&e.params.length)&&(t=(n>1?["require","exports","module"]:["require"]).concat(t))),t},parse.isDefineNodeWithArgs=function(e){return e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"define"===e.callee.name&&e.arguments},parse.findAnonDefineFactory=function(e){var n;return traverse(e,function(e){var t,r;if(parse.isDefineNodeWithArgs(e)){if((
//Just the factory function passed to define
t=e.arguments[0])&&"FunctionExpression"===t.type)return n=t,!1;if(
//A string literal module ID followed by the factory function.
r=e.arguments[1],"Literal"===t.type&&r&&"FunctionExpression"===r.type)return n=r,!1}}),n},parse.findConfig=function(fileContents){/*jslint evil: true */
var jsConfig,foundConfig,stringData,foundRange,quote,quoteMatch,quoteRegExp=/(:\s|\[\s*)(['"])/,astRoot=esprima.parse(fileContents,{loc:!0});
// Eval the config
return traverse(astRoot,function(e){var n,t=parse.hasRequire(e);if(!t||"require"!==t&&"requirejs"!==t&&"requireConfig"!==t&&"requirejsConfig"!==t){if(n=parse.getRequireObjectLiteral(e))return stringData=parse.nodeToString(fileContents,n),jsConfig=stringData.value,foundRange=stringData.range,!1}else if((n=e.arguments&&e.arguments[0])&&"ObjectExpression"===n.type)return stringData=parse.nodeToString(fileContents,n),jsConfig=stringData.value,foundRange=stringData.range,!1}),jsConfig&&(quoteMatch=quoteRegExp.exec(jsConfig),quote=quoteMatch&&quoteMatch[2]||'"',foundConfig=eval("("+jsConfig+")")),{config:foundConfig,range:foundRange,quote:quote}},parse.getRequireObjectLiteral=function(e){if(e.id&&"Identifier"===e.id.type&&("require"===e.id.name||"requirejs"===e.id.name)&&e.init&&"ObjectExpression"===e.init.type)return e.init},parse.renameNamespace=function(e,n){var t,r=[],i=esprima.parse(e,{loc:!0});
//Go backwards through the found locs, adding in the namespace name
//in front.
return parse.recurse(i,function(e,n,t,i,o){
//Do not recurse into define functions, they should be using
//local defines.
return r.push(o.loc),"define"!==e},{}),r.length&&(t=e.split("\n"),r.reverse(),r.forEach(function(e){var r=e.start.column,
//start.line is 1-based, not 0 based.
i=e.start.line-1,o=t[i];t[i]=o.substring(0,r)+n+"."+o.substring(r,o.length)}),e=t.join("\n")),e},parse.findDependencies=function(e,n,t){var r=[],i=esprima.parse(n);return parse.recurse(i,function(e,n,t,i){i&&(r=r.concat(i))},t),r},parse.findCjsDependencies=function(e,n){var t=[];return traverse(esprima.parse(n),function(e){var n;e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"require"===e.callee.name&&e.arguments&&1===e.arguments.length&&(n=e.arguments[0],"Literal"===n.type&&t.push(n.value))}),t},parse.hasDefDefine=function(e){return"FunctionDeclaration"===e.type&&e.id&&"Identifier"===e.id.type&&"define"===e.id.name},parse.hasDefineAmd=function(e){return e&&"AssignmentExpression"===e.type&&e.left&&"MemberExpression"===e.left.type&&e.left.object&&"define"===e.left.object.name&&e.left.property&&"amd"===e.left.property.name},parse.refsDefineAmd=function(e){return e&&"MemberExpression"===e.type&&e.object&&"define"===e.object.name&&"Identifier"===e.object.type&&e.property&&"amd"===e.property.name&&"Identifier"===e.property.type},parse.hasRequire=function(e){var n,t=e&&e.callee;
// require/requirejs.config({}) call
//A require/requirejs({}, ...) call
return e&&"CallExpression"===e.type&&t&&("Identifier"!==t.type||"require"!==t.name&&"requirejs"!==t.name?"MemberExpression"===t.type&&t.object&&"Identifier"===t.object.type&&("require"===t.object.name||"requirejs"===t.object.name)&&t.property&&"config"===t.property.name&&(n=t.object.name+"Config"):n=t.name),n},parse.hasDefine=function(e){return e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"define"===e.callee.name},parse.getNamedDefine=function(e){var n;return traverse(esprima.parse(e),function(e){if(e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"define"===e.callee.name&&e.arguments&&e.arguments[0]&&"Literal"===e.arguments[0].type)return n=e.arguments[0].value,!1}),n},parse.usesAmdOrRequireJs=function(e,n){var t;return traverse(esprima.parse(n),function(e){var n,r,i;parse.hasDefDefine(e)?
//function define() {}
n="declaresDefine":parse.hasDefineAmd(e)?n="defineAmd":(r=parse.hasRequire(e),r?!(i=e.arguments&&e.arguments[0])||"ObjectExpression"!==i.type&&"ArrayExpression"!==i.type||(n=r):parse.hasDefine(e)&&(n="define")),n&&(t||(t={}),t[n]=!0)}),t},parse.usesCommonJs=function(e,n){var t=null,r=!1;return traverse(esprima.parse(n),function(e){var n,i=e.expression||e.init;"Identifier"!==e.type||"__dirname"!==e.name&&"__filename"!==e.name?"VariableDeclarator"===e.type&&e.id&&"Identifier"===e.id.type&&"exports"===e.id.name?
//Hmm, a variable assignment for exports, so does not use cjs
//exports.
n="varExports":i&&"AssignmentExpression"===i.type&&i.left&&"MemberExpression"===i.left.type&&i.left.object?"module"===i.left.object.name&&i.left.property&&"exports"===i.left.property.name?n="moduleExports":"exports"===i.left.object.name&&i.left.property&&(n="exports"):e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"require"===e.callee.name&&e.arguments&&1===e.arguments.length&&"Literal"===e.arguments[0].type&&(n="require"):n=e.name.substring(2),n&&("varExports"===n?r=!0:"exports"===n&&r||(t||(t={}),t[n]=!0))}),t},parse.findRequireDepNames=function(e,n){traverse(e,function(e){var t;e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"require"===e.callee.name&&e.arguments&&1===e.arguments.length&&(t=e.arguments[0],"Literal"===t.type&&n.push(t.value))})},parse.parseNode=function(e,n){var t,r,i,o,a,u,s,c,l=e&&e.arguments,f=parse.hasRequire(e);if("require"===f||"requirejs"===f){if(
//A plain require/requirejs call
o=e.arguments&&e.arguments[0],"ArrayExpression"!==o.type&&"ObjectExpression"===o.type&&(
//A config call, try the second arg.
o=e.arguments[1]),!(r=getValidDeps(o)))return;return n("require",null,null,r,e)}if(parse.hasDefine(e)&&l&&l.length){if(t=l[0],r=l[1],a=l[2],"ArrayExpression"===t.type?(
//No name, adjust args
a=r,r=t,t=null):"FunctionExpression"===t.type?(
//Just the factory, no name or deps
a=t,t=r=null):"Literal"!==t.type&&(
//An object literal, just null out
t=r=a=null),t&&"Literal"===t.type&&r&&("FunctionExpression"===r.type?(
//deps is the factory
a=r,r=null):"ObjectExpression"===r.type?
//deps is object literal, null out
r=a=null:"Identifier"===r.type&&2===l.length&&(
// define('id', factory)
r=a=null)),r&&"ArrayExpression"===r.type)r=getValidDeps(r);else if(a&&"FunctionExpression"===a.type)
//If no deps and a factory function, could be a commonjs sugar
//wrapper, scan the function for dependencies.
i=parse.getAnonDepsFromNode(a),i.length&&(r=i);else if(r||a)
//Does not match the shape of an AMD call.
return;
//Just save off the name as a string instead of an AST object.
return t&&"Literal"===t.type&&(t=t.value),n("define",null,t,r,e)}if("CallExpression"===e.type&&e.callee&&"FunctionExpression"===e.callee.type&&e.callee.body&&e.callee.body.body&&1===e.callee.body.body.length&&"IfStatement"===e.callee.body.body[0].type&&(c=e.callee.body.body[0],c.consequent&&c.consequent.body&&(u=c.consequent.body[0],"ExpressionStatement"===u.type&&u.expression&&parse.hasDefine(u.expression)&&u.expression.arguments&&1===u.expression.arguments.length&&"Identifier"===u.expression.arguments[0].type&&(
//Calls define(Identifier) as first statement in body.
//Confirm the if test references define.amd
traverse(c.test,function(e){if(parse.refsDefineAmd(e))return s=!0,!1}),s))))return n("define",null,null,null,u.expression)},parse.nodeToString=function(e,n){var t,r=n.loc,i=e.split("\n"),o=r.start.line>1?i.slice(0,r.start.line-1).join("\n")+"\n":"",a=o+i[r.start.line-1].substring(0,r.start.column);return t=r.start.line===r.end.line?i[r.start.line-1].substring(r.start.column,r.end.column):i[r.start.line-1].substring(r.start.column)+"\n"+i.slice(r.start.line,r.end.line-1).join("\n")+"\n"+i[r.end.line-1].substring(0,r.end.column),{value:t,range:[a.length,a.length+t.length]}},parse.getLicenseComments=function(e,n){var t,r,i,o,a,u,
//xpconnect's Reflect does not support comment or range, but
//prefer continued operation vs strict parity of operation,
//as license comments can be expressed in other ways, like
//via wrap args, or linked via sourcemaps.
s=esprima.parse(n,{comment:!0,range:!0}),c="",l={},f=n.indexOf("\r")===-1?"\n":"\r\n";if(s.comments)for(a=0;a<s.comments.length;a++){if(t=s.comments[a],"Line"===t.type)if(o="//"+t.value+f,r=t,a+1>=s.comments.length)o+=f;else{
//Look for immediately adjacent single line comments
//since it could from a multiple line comment made out
//of single line comments. Like this comment.
for(u=a+1;u<s.comments.length&&(i=s.comments[u],"Line"===i.type&&i.range[0]===r.range[1]+1);u++)
//Adjacent single line comment. Collect it.
o+="//"+i.value+f,r=i;o+=f,a=u-1}else o="/*"+t.value+"*/"+f+f;l[o]||o.indexOf("license")===-1&&("Block"!==t.type||0!==o.indexOf("/*!"))&&o.indexOf("opyright")===-1&&o.indexOf("(c)")===-1||(c+=o,l[o]=!0)}return c},parse}),/**
 * @license Copyright (c) 2012-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*global define */
define("transform",["./esprimaAdapter","./parse","logger","lang"],function(e,n,t,r){"use strict";function i(e,n,t){var r=c[t];return e.replace(r,"$&"+n)}var o,a=/^([ \t]+)/,u=/\{[\r\n]+([ \t]+)/,s=/^[_A-Za-z]([A-Za-z\d_]*)$/,c={"\n":/\n/g,"\r\n":/\r\n/g};return o={toTransport:function(i,o,a,u,s,c){c=c||{};var l,f,p,d,h=0,g=!1,m=[],v=function(e){return c.useSourceUrl&&(e='eval("'+r.jsEscape(e)+"\\n//# sourceURL="+(0===a.indexOf("/")?"":"/")+a+'");\n'),e};try{l=e.parse(u,{loc:!0})}catch(e){return t.trace("toTransport skipping "+a+": "+e.toString()),u}
//Find the define calls and their position in the files.
//Reverse the matches, need to start from the bottom of
//the file to modify it, so that the ranges are still true
//further up.
return n.traverse(l,function(e){var r,o,u,s,c,l,f,p,v=!1;
// If a bundle script with a define declaration, do not
// parse any further at this level. Likely a built layer
// by some other tool.
if("VariableDeclarator"===e.type&&e.id&&"define"===e.id.name&&"Identifier"===e.id.type&&!((f=e.init)&&f.callee&&"CallExpression"===f.callee.type&&f.callee.callee&&"Identifier"===f.callee.callee.type&&"require"===f.callee.callee.name&&f.callee.arguments&&1===f.callee.arguments.length&&"Literal"===f.callee.arguments[0].type&&f.callee.arguments[0].value&&f.callee.arguments[0].value.indexOf("amdefine")!==-1))return!1;if((v=i&&"CallExpression"===e.type&&e.callee&&e.callee.object&&"Identifier"===e.callee.object.type&&e.callee.object.name===i&&"Identifier"===e.callee.property.type&&"define"===e.callee.property.name)||n.isDefineNodeWithArgs(e)){if(!(
//The arguments are where its at.
r=e.arguments)||!r.length)return;if(o=r[0],u=o.loc,1===r.length)"Identifier"===o.type?(
//The define(factory) case, but
//only allow it if one Identifier arg,
//to limit impact of false positives.
c=!0,l="empty"):"FunctionExpression"===o.type?(
//define(function(){})
s=o,c=!0,l="scan"):"ObjectExpression"===o.type?(
//define({});
c=!0,l="skip"):"Literal"===o.type&&"number"==typeof o.value?(
//define('12345');
c=!0,l="skip"):"UnaryExpression"===o.type&&"-"===o.operator&&o.argument&&"Literal"===o.argument.type&&"number"==typeof o.argument.value?(
//define('-12345');
c=!0,l="skip"):"MemberExpression"===o.type&&o.object&&o.property&&"Identifier"===o.property.type&&(
//define(this.key);
c=!0,l="empty");else if("ArrayExpression"===o.type)
//define([], ...);
c=!0,l="skip";else{if("Literal"!==o.type||"string"!=typeof o.value)
//Unknown define entity, keep looking, even
//in the subtree for this node.
return;
//define('string', ....)
//Already has an ID.
c=!1,2===r.length&&"FunctionExpression"===r[1].type?(
//Needs dependency scanning.
s=r[1],l="scan"):l="skip"}
//Only transform ones that do not have IDs. If it has an
//ID but no dependency array, assume it is something like
//a phonegap implementation, that has its own internal
//define that cannot handle dependency array constructs,
//and if it is a named module, then it means it has been
//set for transport form.
if(p={foundId:void 0,needsId:c,depAction:l,namespaceExists:v,node:e,defineLoc:e.loc,firstArgLoc:u,factoryNode:s,sourceUrlData:void 0},p.needsId){if(d)return t.trace(a+" has more than one anonymous define. May be a built file from another build system like, Ender. Skipping normalization."),m=[],!1;d=p,m.push(p)}else"scan"===l&&(h+=1,h>1?
//Just go back to an array that just has the
//anon one, since this is an already optimized
//file like the phonegap one.
g||(m=d?[d]:[],g=!0):m.push(p))}}),m.length?(m.reverse(),f=u.split("\n"),p=function(e,n){var t=e.start.column,
//start.line is 1-based, not 0 based.
r=e.start.line-1,i=f[r];f[r]=i.substring(0,t)+n+i.substring(t,i.length)},m.forEach(function(e){var t,r="",a="";
//Do the modifications "backwards", in other words, start with the
//one that is farthest down and work up, so that the ranges in the
//defineInfos still apply. So that means deps, id, then namespace.
e.needsId&&o&&(r+="'"+o+"',"),"scan"===e.depAction&&(t=n.getAnonDepsFromNode(e.factoryNode),a=t.length?"["+t.map(function(e){return"'"+e+"'"})+"]":"[]",a+=",",e.factoryNode?
//Already have a named module, need to insert the
//dependencies after the name.
p(e.factoryNode.loc,a):r+=a),r&&p(e.firstArgLoc,r),
//Do namespace last so that ui does not mess upthe parenRange
//used above.
i&&!e.namespaceExists&&p(e.defineLoc,i+"."),
//Notify any listener for the found info
s&&s(e)}),u=f.join("\n"),v(u)):v(u)},/**
         * Modify the contents of a require.config/requirejs.config call. This
         * call will LOSE any existing comments that are in the config string.
         *
         * @param  {String} fileContents String that may contain a config call
         * @param  {Function} onConfig Function called when the first config
         * call is found. It will be passed an Object which is the current
         * config, and the onConfig function should return an Object to use
         * as the config.
         * @return {String} the fileContents with the config changes applied.
         */
modifyConfig:function(e,t){var r=n.findConfig(e),i=r.config;return i&&(i=t(i))?o.serializeConfig(i,e,r.range[0],r.range[1],{quote:r.quote}):e},serializeConfig:function(e,n,t,r,s){
//Calculate base level of indent
var c,l,f,p,d="",h=n.substring(0,t),g=n.substring(t,r),m=g.indexOf("\r")===-1?"\n":"\r\n",v=h.lastIndexOf("\n");
//Get the basic amount of indent for the require config call.
//Calculate internal indentation for config
//Add in the base indenting level.
return v===-1&&(v=0),l=a.exec(h.substring(v+1,t)),l&&l[1]&&(d=l[1]),l=u.exec(g),l&&l[1]&&(c=l[1]),c=!c||c.length<d?"  ":c.substring(d.length),p=new RegExp("("+m+")"+c,"g"),f=o.objectToString(e,{indent:c,lineReturn:m,outDentRegExp:p,quote:s&&s.quote}),f=i(f,d,m),h+f+n.substring(r)},/**
         * Tries converting a JS object to a string. This will likely suck, and
         * is tailored to the type of config expected in a loader config call.
         * So, hasOwnProperty fields, strings, numbers, arrays and functions,
         * no weird recursively referenced stuff.
         * @param  {Object} obj        the object to convert
         * @param  {Object} options    options object with the following values:
         *         {String} indent     the indentation to use for each level
         *         {String} lineReturn the type of line return to use
         *         {outDentRegExp} outDentRegExp the regexp to use to outdent functions
         *         {String} quote      the quote type to use, ' or ". Optional. Default is "
         * @param  {String} totalIndent the total indent to print for this level
         * @return {String}            a string representation of the object.
         */
objectToString:function(e,n,t){var i,a,u,c=!0,l="",f=n.lineReturn,p=n.indent,d=n.outDentRegExp,h=n.quote||'"';
//Use double quotes in case the config may also work as JSON.
//The outdent regexp just helps pretty up the conversion
//just in node. Rhino strips comments and does a different
//indent scheme for Function toString, so not really helpful
//there.
//An object
return t=t||"",u=t+p,null===e?l="null":void 0===e?l="undefined":"number"==typeof e||"boolean"==typeof e?l=e:"string"==typeof e?l=h+r.jsEscape(e)+h:r.isArray(e)?(r.each(e,function(e,t){l+=(0!==t?","+f:"")+u+o.objectToString(e,n,u)}),i="[",a="]"):r.isFunction(e)||r.isRegExp(e)?l=e.toString().replace(d,"$1"):(r.eachProp(e,function(e,t){l+=(c?"":","+f)+u+(s.test(t)?t:h+r.jsEscape(t)+h)+": "+o.objectToString(e,n,u),c=!1}),i="{",a="}"),i&&(l=i+f+l+f+t+a),l}}}),/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint regexp: true, plusplus: true  */
/*global define: false */
define("pragma",["parse","logger"],function(parse,logger){"use strict";function Temp(){}function create(e,n){Temp.prototype=e;var t,r=new Temp;if(
//Avoid any extra memory hanging around
Temp.prototype=null,n)for(t in n)n.hasOwnProperty(t)&&!r.hasOwnProperty(t)&&(r[t]=n[t]);return r}var pragma={conditionalRegExp:/(exclude|include)Start\s*\(\s*["'](\w+)["']\s*,(.*)\)/,useStrictRegExp:/['"]use strict['"];/g,hasRegExp:/has\s*\(\s*['"]([^'"]+)['"]\s*\)/g,configRegExp:/(^|[^\.])(requirejs|require)(\.config)\s*\(/g,nsWrapRegExp:/\/\*requirejs namespace: true \*\//,apiDefRegExp:/var requirejs,\s*require,\s*define;/,defineCheckRegExp:/typeof\s+define\s*===\s*["']function["']\s*&&\s*define\s*\.\s*amd/g,defineStringCheckRegExp:/typeof\s+define\s*===\s*["']function["']\s*&&\s*define\s*\[\s*["']amd["']\s*\]/g,defineTypeFirstCheckRegExp:/\s*["']function["']\s*==(=?)\s*typeof\s+define\s*&&\s*define\s*\.\s*amd/g,defineJQueryRegExp:/typeof\s+define\s*===\s*["']function["']\s*&&\s*define\s*\.\s*amd\s*&&\s*define\s*\.\s*amd\s*\.\s*jQuery/g,defineHasRegExp:/typeof\s+define\s*==(=)?\s*['"]function['"]\s*&&\s*typeof\s+define\.amd\s*==(=)?\s*['"]object['"]\s*&&\s*define\.amd/g,defineTernaryRegExp:/typeof\s+define\s*===\s*['"]function["']\s*&&\s*define\s*\.\s*amd\s*\?\s*define/,amdefineRegExp:/if\s*\(\s*typeof define\s*\!==\s*'function'\s*\)\s*\{\s*[^\{\}]+amdefine[^\{\}]+\}/g,removeStrict:function(e,n){return n.useStrict?e:e.replace(pragma.useStrictRegExp,"")},namespace:function(e,n,t){
//Namespace require/define calls
//Namespace define ternary use:
//Namespace define jquery use:
//Namespace has.js define use:
//Namespace define checks.
//Do these ones last, since they are a subset of the more specific
//checks above.
//Check for require.js with the require/define definitions
//Wrap the file contents in a typeof check, and a function
//to contain the API globals.
//Finally, if the file wants a special wrapper because it ties
//in to the requirejs internals in a way that would not fit
//the above matches, do that. Look for /*requirejs namespace: true*/
//Remove the pragma.
//Alter the contents.
return n&&(e=e.replace(pragma.configRegExp,"$1"+n+".$2$3("),e=parse.renameNamespace(e,n),e=e.replace(pragma.defineTernaryRegExp,"typeof "+n+".define === 'function' && "+n+".define.amd ? "+n+".define"),e=e.replace(pragma.defineJQueryRegExp,"typeof "+n+".define === 'function' && "+n+".define.amd && "+n+".define.amd.jQuery"),e=e.replace(pragma.defineHasRegExp,"typeof "+n+".define === 'function' && typeof "+n+".define.amd === 'object' && "+n+".define.amd"),e=e.replace(pragma.defineCheckRegExp,"typeof "+n+".define === 'function' && "+n+".define.amd"),e=e.replace(pragma.defineStringCheckRegExp,"typeof "+n+".define === 'function' && "+n+".define['amd']"),e=e.replace(pragma.defineTypeFirstCheckRegExp,"'function' === typeof "+n+".define && "+n+".define.amd"),pragma.apiDefRegExp.test(e)&&e.indexOf("if (!"+n+" || !"+n+".requirejs)")===-1&&(e="var "+n+";(function () { if (!"+n+" || !"+n+".requirejs) {\nif (!"+n+") { "+n+" = {}; } else { require = "+n+"; }\n"+e+"\n"+n+".requirejs = requirejs;"+n+".require = require;"+n+".define = define;\n}\n}());"),pragma.nsWrapRegExp.test(e)&&(e=e.replace(pragma.nsWrapRegExp,""),e="(function () {\nvar require = "+n+".require,requirejs = "+n+".requirejs,define = "+n+".define;\n"+e+"\n}());")),e},/**
         * processes the fileContents for some //>> conditional statements
         */
process:function(fileName,fileContents,config,onLifecycleName,pluginCollector){/*jslint evil: true */
var foundIndex=-1,startIndex=0,lineEndIndex,conditionLine,matches,type,marker,condition,isTrue,endRegExp,endMatches,endMarkerIndex,shouldInclude,startLength,lifecycleHas,deps,i,dep,moduleName,collectorMod,lifecyclePragmas,pragmas=config.pragmas,hasConfig=config.has,
//Legacy arg defined to help in dojo conversion script. Remove later
//when dojo no longer needs conversion:
kwArgs=pragmas;if(
//Mix in a specific lifecycle scoped object, to allow targeting
//some pragmas/has tests to only when files are saved, or at different
//lifecycle events. Do not bother with kwArgs in this section, since
//the old dojo kwArgs were for all points in the build lifecycle.
onLifecycleName&&(lifecyclePragmas=config["pragmas"+onLifecycleName],lifecycleHas=config["has"+onLifecycleName],lifecyclePragmas&&(pragmas=create(pragmas||{},lifecyclePragmas)),lifecycleHas&&(hasConfig=create(hasConfig||{},lifecycleHas))),
//Replace has references if desired
hasConfig&&(fileContents=fileContents.replace(pragma.hasRegExp,function(e,n){return hasConfig.hasOwnProperty(n)?!!hasConfig[n]:e})),!config.skipPragmas)for(;(foundIndex=fileContents.indexOf("//>>",startIndex))!==-1;)if(
//Found a conditional. Get the conditional line.
lineEndIndex=fileContents.indexOf("\n",foundIndex),lineEndIndex===-1&&(lineEndIndex=fileContents.length-1),
//Increment startIndex past the line so the next conditional search can be done.
startIndex=lineEndIndex+1,
//Break apart the conditional.
conditionLine=fileContents.substring(foundIndex,lineEndIndex+1),matches=conditionLine.match(pragma.conditionalRegExp)){type=matches[1],marker=matches[2],condition=matches[3],isTrue=!1;
//See if the condition is true.
try{isTrue=!!eval("("+condition+")")}catch(e){throw"Error in file: "+fileName+". Conditional comment: "+conditionLine+" failed with this error: "+e}if(
//Find the endpoint marker.
endRegExp=new RegExp("\\/\\/\\>\\>\\s*"+type+"End\\(\\s*['\"]"+marker+"['\"]\\s*\\)","g"),!(endMatches=endRegExp.exec(fileContents.substring(startIndex,fileContents.length))))throw"Error in file: "+fileName+". Cannot find end marker for conditional comment: "+conditionLine;endMarkerIndex=startIndex+endRegExp.lastIndex-endMatches[0].length,
//Find the next line return based on the match position.
lineEndIndex=fileContents.indexOf("\n",endMarkerIndex),lineEndIndex===-1&&(lineEndIndex=fileContents.length-1),
//Should we include the segment?
shouldInclude="exclude"===type&&!isTrue||"include"===type&&isTrue,
//Remove the conditional comments, and optionally remove the content inside
//the conditional comments.
startLength=startIndex-foundIndex,fileContents=fileContents.substring(0,foundIndex)+(shouldInclude?fileContents.substring(startIndex,endMarkerIndex):"")+fileContents.substring(lineEndIndex+1,fileContents.length),
//Move startIndex to foundIndex, since that is the new position in the file
//where we need to look for more conditionals in the next while loop pass.
startIndex=foundIndex}
//If need to find all plugin resources to optimize, do that now,
//before namespacing, since the namespacing will change the API
//names.
//If there is a plugin collector, scan the file for plugin resources.
if(config.optimizeAllPluginResources&&pluginCollector)try{if(deps=parse.findDependencies(fileName,fileContents),deps.length)for(i=0;i<deps.length;i++)dep=deps[i],dep.indexOf("!")!==-1&&(moduleName=dep.split("!")[0],collectorMod=pluginCollector[moduleName],collectorMod||(collectorMod=pluginCollector[moduleName]=[]),collectorMod.push(dep))}catch(e){logger.error("Parse error looking for plugin resources in "+fileName+", skipping.")}
//Strip amdefine use for node-shared modules.
//Do namespacing
return config.keepAmdefine||(fileContents=fileContents.replace(pragma.amdefineRegExp,"")),"OnSave"===onLifecycleName&&config.namespace&&(fileContents=pragma.namespace(fileContents,config.namespace,onLifecycleName)),pragma.removeStrict(fileContents,config)}};return pragma}),"browser"===env&&/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false */
define("browser/optimize",{}),"node"===env&&/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint strict: false */
/*global define: false */
define("node/optimize",{}),"rhino"===env&&/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint sloppy: true, plusplus: true */
/*global define, java, Packages, com */
define("rhino/optimize",["logger","env!env/file"],function(e,n){
//Helper for closure compiler, because of weird Java-JavaScript interactions.
function t(e,n){return i.invoke(null,[e,n])}function r(e,n){var t,r,i=new java.io.File(e);if(r=i.getAbsoluteFile().getParentFile(),!r.exists()&&!r.mkdirs())throw"Could not create directory: "+r.getAbsolutePath();return t=n?new java.io.OutputStreamWriter(new java.io.FileOutputStream(i),n):new java.io.OutputStreamWriter(new java.io.FileOutputStream(i)),new java.io.BufferedWriter(t)}
//Add .reduce to Rhino so UglifyJS can run in Rhino,
//inspired by https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
//but rewritten for brevity, and to be good enough for use by UglifyJS.
Array.prototype.reduce||(Array.prototype.reduce=function(e){var n,t=0,r=this.length;if(arguments.length>=2)n=arguments[1];else if(r){for(;!(t in this);)t++;n=this[t++]}for(;t<r;t++)t in this&&(n=e.call(void 0,n,this[t],t,this));return n});var i;
//Bind to Closure compiler, but if it is not available, do not sweat it.
try{i=java.lang.Class.forName("com.google.javascript.jscomp.JSSourceFile").getMethod("fromCode",[java.lang.String,java.lang.String])}catch(e){}return{closure:function(i,o,a,u,s){s=s||{};var c,l,f,p,d,h,g,m,v,y,b,x,_,w=Packages.com.google.javascript.jscomp,
//Set up source input
E=(Packages.com.google.common.flags,t(String(i),String(o))),A=new java.util.ArrayList,C=Packages.com.google.javascript.jscomp.Compiler,F=Packages.com.google.javascript.jscomp.CommandLineRunner;e.trace("Minifying file: "+i),p=new java.io.File(i).getName(),
//Set up options
y=new w.CompilerOptions;for(b in s.CompilerOptions)
// options are false by default and jslint wanted an if statement in this for loop
s.CompilerOptions[b]&&(y[b]=s.CompilerOptions[b]);if(y.prettyPrint=u||y.prettyPrint,x=w.CompilationLevel[s.CompilationLevel||"SIMPLE_OPTIMIZATIONS"],x.setOptionsForCompilationLevel(y),s.generateSourceMaps&&(l=new java.util.ArrayList,l.add(new com.google.javascript.jscomp.SourceMap.LocationMapping(i,p+".src.js")),y.setSourceMapLocationMappings(l),y.setSourceMapOutputPath(i+".map")),
//Trigger the compiler
C.setLoggingLevel(Packages.java.util.logging.Level[s.loggingLevel||"WARNING"]),_=new C,
//fill the sourceArrrayList; we need the ArrayList because the only overload of compile
//accepting the getDefaultExterns return value (a List) also wants the sources as a List
A.add(E),c=_.compile(F.getDefaultExterns(),A,y),c.success)
//If previous .map file exists, move it to the ".src.js"
//location. Need to update the sourceMappingURL part in the
//src.js file too.
//Not sure how better to do this, but right now the .map file
//leaks the full OS path in the "file" property. Manually
//modify it to not do that.
return f=String(_.toSource()),s.generateSourceMaps&&c.sourceMap&&a?(h=new java.io.File(a).getName(),m=a+".src.js",g=a+".map",n.exists(g)?(v=g.replace(/\.map$/,".src.js.map"),n.saveFile(v,n.readFile(g)),n.saveFile(m,o.replace(/\/\# sourceMappingURL=(.+).map/,"/# sourceMappingURL=$1.src.js.map"))):n.saveUtf8File(m,o),d=r(g,"utf-8"),c.sourceMap.appendTo(d,a),d.close(),n.saveFile(g,n.readFile(g).replace(/"file":"[^"]+"/,'"file":"'+p+'"')),o=f+"\n//# sourceMappingURL="+h+".map"):o=f,o;throw new Error("Cannot closure compile file: "+i+". Skipping it.")}}}),"xpconnect"===env&&define("xpconnect/optimize",{}),/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint plusplus: true, nomen: true, regexp: true */
/*global define: false */
define("optimize",["lang","logger","env!env/optimize","env!env/file","parse","pragma","uglifyjs/index","uglifyjs2","source-map"],function(e,n,t,r,i,o,a,u,s){"use strict";/**
     * If an URL from a CSS url value contains start/end quotes, remove them.
     * This is not done in the regexp, since my regexp fu is not that strong,
     * and the CSS spec allows for ' and " in the URL if they are backslash escaped.
     * @param {String} url
     */
function c(e){
//Make sure we are not ending in whitespace.
//Not very confident of the css regexps above that there will not be ending
//whitespace.
return e=e.replace(/\s+$/,""),"'"!==e.charAt(0)&&'"'!==e.charAt(0)||(e=e.substring(1,e.length-1)),e}function l(t,r,i,o){return i.replace(g,function(i,a){var u,s,l,f,p=c(a);for(p=p.replace(e.backSlashRegExp,"/"),
//Only do the work for relative URLs. Skip things that start with / or #, or have
//a protocol.
s=p.charAt(0),u=p.indexOf(":"),"/"!==s&&"#"!==s&&(u===-1||u>p.indexOf("/"))?
//It is a relative URL, tack on the cssPrefix and path prefix
a=o+r+p:n.trace(t+"\n  URL not a relative URL, skipping: "+a),
//Collapse .. and .
l=a.split("/"),f=l.length-1;f>0;f--)"."===l[f]?l.splice(f,1):".."===l[f]&&0!==f&&".."!==l[f-1]&&(l.splice(f-1,2),f-=1);return"url("+l.join("/")+")"})}/**
     * Inlines nested stylesheets that have @import calls in them.
     * @param {String} fileName the file name
     * @param {String} fileContents the file contents
     * @param {String} cssImportIgnore comma delimited string of files to ignore
     * @param {String} cssPrefix string to be prefixed before relative URLs
     * @param {Object} included an object used to track the files already imported
     */
function f(t,i,o,a,u,s){
//Find the last slash in the name.
t=t.replace(e.backSlashRegExp,"/");var p=t.lastIndexOf("/"),
//Make a file path based on the last slash.
//If no slash, so must be just a file name. Use empty string then.
g=p!==-1?t.substring(0,p+1):"",
//store a list of merged files
m=[],v=[];
//First make a pass by removing any commented out @import calls.
//Make sure we have a delimited ignore list to make matching faster
//Modify URL paths to match the path represented by this file.
return i=i.replace(h,""),o&&","!==o.charAt(o.length-1)&&(o+=","),i=i.replace(d,function(i,s,p,d,h){
//Only process media type "all" or empty media type rules.
if(h&&"all"!==h.replace(/^\s\s*/,"").replace(/\s\s*$/,""))return v.push(t),i;
//Ignore the file import if it is part of an ignore list.
if(p=c(p),o&&o.indexOf(p+",")!==-1)return i;
//Make sure we have a unix path for the rest of the operation.
p=p.replace(e.backSlashRegExp,"/");try{
//if a relative path, then tack on the filePath.
//If it is not a relative path, then the readFile below will fail,
//and we will just skip that import.
var y,b,x,_="/"===p.charAt(0)?p:g+p,w=r.readFile(_);
//Skip the file if it has already been included.
//Skip the file if it has already been included.
//Make sure to flatten any nested imports.
//Make the full import path
//Make a file path based on the last slash.
//If no slash, so must be just a file name. Use empty string then.
//fix url() on relative import (#5)
//Modify URL paths to match the path represented by this file.
return u[_]?"":(u[_]=!0,x=f(_,w,o,a,u),w=x.fileContents,x.importList.length&&m.push.apply(m,x.importList),x.skippedList.length&&v.push.apply(v,x.skippedList),y=p.lastIndexOf("/"),b=y!==-1?p.substring(0,y+1):"",b=b.replace(/^\.\//,""),w=l(p,b,w,a),m.push(_),w)}catch(e){return n.warn(t+"\n  Cannot inline css import, skipping: "+p),i}}),a&&s&&(i=l(t,"",i,a)),{importList:m,skippedList:v,fileContents:i}}var p,d=/\@import\s+(url\()?\s*([^);]+)\s*(\))?([\w, ]*)(;)?/gi,h=/\/\*[^\*]*@import[^\*]*\*\//g,g=/\url\(\s*([^\)]+)\s*\)?/g,m=s.SourceMapGenerator,v=s.SourceMapConsumer;return p={/**
         * Optimizes a file that contains JavaScript content. Optionally collects
         * plugin resources mentioned in a file, and then passes the content
         * through an minifier if one is specified via config.optimize.
         *
         * @param {String} fileName the name of the file to optimize
         * @param {String} fileContents the contents to optimize. If this is
         * a null value, then fileName will be used to read the fileContents.
         * @param {String} outFileName the name of the file to use for the
         * saved optimized content.
         * @param {Object} config the build config object.
         * @param {Array} [pluginCollector] storage for any plugin resources
         * found.
         */
jsFile:function(e,n,t,i,o){n||(n=r.readFile(e)),n=p.js(e,n,t,i,o),r.saveUtf8File(t,n)},/**
         * Optimizes a file that contains JavaScript content. Optionally collects
         * plugin resources mentioned in a file, and then passes the content
         * through an minifier if one is specified via config.optimize.
         *
         * @param {String} fileName the name of the file that matches the
         * fileContents.
         * @param {String} fileContents the string of JS to optimize.
         * @param {Object} [config] the build config object.
         * @param {Array} [pluginCollector] storage for any plugin resources
         * found.
         */
js:function(e,r,a,u,s){var c,l,f=String(u.optimize).split("."),d=f[0],h="keepLines"===f[1],g="";
//Optimize the JS files if asked.
if(u=u||{},
//Apply pragmas/namespace renaming
r=o.process(e,r,u,"OnSave",s),d&&"none"!==d){if(!(c=t[d]||p.optimizers[d]))throw new Error('optimizer with name of "'+d+'" not found for this environment');l=u[d]||{},u.generateSourceMaps&&(l.generateSourceMaps=!!u.generateSourceMaps,l._buildSourceMap=u._buildSourceMap);try{if(u.preserveLicenseComments)
//Pull out any license comments for prepending after optimization.
try{g=i.getLicenseComments(e,r)}catch(n){throw new Error("Cannot parse file: "+e+" for comments. Skipping it. Error is:\n"+n.toString())}r=g+c(e,r,a,h,l),l._buildSourceMap&&l._buildSourceMap!==u._buildSourceMap&&(u._buildSourceMap=l._buildSourceMap)}catch(e){if(u.throwWhen&&u.throwWhen.optimize)throw e;n.error(e)}}else u._buildSourceMap&&(u._buildSourceMap=null);return r},/**
         * Optimizes one CSS file, inlining @import calls, stripping comments, and
         * optionally removes line returns.
         * @param {String} fileName the path to the CSS file to optimize
         * @param {String} outFileName the path to save the optimized file.
         * @param {Object} config the config object with the optimizeCss and
         * cssImportIgnore options.
         */
cssFile:function(e,t,i){
//Read in the file. Make sure we have a JS string.
var o,a,u,s,c=r.readFile(e),l=f(e,c,i.cssImportIgnore,i.cssPrefix,{},!0),
//Do not use the flattened CSS if there was one that was skipped.
p=l.skippedList.length?c:l.fileContents;l.skippedList.length&&n.warn("Cannot inline @imports for "+e+",\nthe following files had media queries in them:\n"+l.skippedList.join("\n"));
//Do comment removal.
try{if(i.optimizeCss.indexOf(".keepComments")===-1)
//Get rid of comments.
for(o=0;(o=p.indexOf("/*",o))!==-1;){if((a=p.indexOf("*/",o+2))===-1)throw"Improper comment in CSS file: "+e;s=p.substring(o,a),!i.preserveLicenseComments||s.indexOf("license")===-1&&s.indexOf("opyright")===-1&&s.indexOf("(c)")===-1?(p=p.substring(0,o)+p.substring(a+2,p.length),o=0):
//Keep the comment, just increment the startIndex
o=a}
//Get rid of newlines.
i.optimizeCss.indexOf(".keepLines")===-1?(p=p.replace(/[\r\n]/g," "),p=p.replace(/\s+/g," "),p=p.replace(/\{\s/g,"{"),p=p.replace(/\s\}/g,"}")):(
//Remove multiple empty lines.
p=p.replace(/(\r\n)+/g,"\r\n"),p=p.replace(/(\n)+/g,"\n")),
//Remove unnecessary whitespace
i.optimizeCss.indexOf(".keepWhitespace")===-1&&(
//Remove leading and trailing whitespace from lines
p=p.replace(/^[ \t]+/gm,""),p=p.replace(/[ \t]+$/gm,""),
//Remove whitespace after semicolon, colon, curly brackets and commas
p=p.replace(/(;|:|\{|}|,)[ \t]+/g,"$1"),
//Remove whitespace before opening curly brackets
p=p.replace(/[ \t]+(\{)/g,"$1"),
//Truncate double whitespace
p=p.replace(/([ \t])+/g,"$1"),
//Remove empty lines
p=p.replace(/^[ \t]*[\r\n]/gm,""))}catch(t){p=c,n.error("Could not optimized CSS file: "+e+", error: "+t)}
//text output to stdout and/or written to build.txt file
return r.saveUtf8File(t,p),u="\n"+t.replace(i.dir,"")+"\n----------------\n",l.importList.push(e),u+=l.importList.map(function(e){return e.replace(i.dir,"")}).join("\n"),{importList:l.importList,buildText:u+"\n"}},/**
         * Optimizes CSS files, inlining @import calls, stripping comments, and
         * optionally removes line returns.
         * @param {String} startDir the path to the top level directory
         * @param {Object} config the config object with the optimizeCss and
         * cssImportIgnore options.
         */
css:function(e,t){var i,o,a,u,s="",c=[],l=t.dir&&t.removeCombined;if(t.optimizeCss.indexOf("standard")!==-1){if(u=r.getFilteredFileList(e,/\.css$/,!0))for(i=0;i<u.length;i++)o=u[i],n.trace("Optimizing ("+t.optimizeCss+") CSS file: "+o),a=p.cssFile(o,o,t),s+=a.buildText,l&&(a.importList.pop(),c=c.concat(a.importList));l&&c.forEach(function(e){r.exists(e)&&r.deleteFile(e)})}return s},optimizers:{uglify:function(e,t,r,i,o){var u,s,c,l=a.parser,f=a.uglify;o=o||{},n.trace("Uglifying file: "+e);try{u=l.parse(t,o.strict_semicolons),o.no_mangle!==!0&&(u=f.ast_mangle(u,o)),u=f.ast_squeeze(u,o),t=f.gen_code(u,o),o.max_line_length&&(t=f.split_lines(t,o.max_line_length)),
//Add trailing semicolon to match uglifyjs command line version
t+=";"}catch(n){throw s=n.toString(),c=/\nError(\r)?\n/.exec(s),c&&(s=s.substring(0,c.index)),new Error("Cannot uglify file: "+e+". Skipping it. Error is:\n"+s)}return t},uglify2:function(t,i,o,a,s){var c,l,f,p,d={},h=o+".map",g=t&&t.split("/").pop();s=s||{},e.mixin(d,s,!0),d.fromString=!0,s.generateSourceMaps&&(o||s._buildSourceMap)&&(d.outSourceMap=g,s._buildSourceMap?(l=JSON.parse(s._buildSourceMap),d.inSourceMap=l):r.exists(h)&&(d.inSourceMap=h,l=JSON.parse(r.readFile(h)))),n.trace("Uglify2 file: "+t);try{
//var tempContents = fileContents.replace(/\/\/\# sourceMappingURL=.*$/, '');
c=u.minify(i,d,g+".src.js"),d.outSourceMap&&c.map?(f=c.map,l?(f=JSON.parse(f),p=m.fromSourceMap(new v(f)),p.applySourceMap(new v(l)),f=p.toString()):s._buildSourceMap||r.saveFile(o+".src.js",i),i=c.code,s._buildSourceMap?s._buildSourceMap=f:(r.saveFile(o+".map",f),i+="\n//# sourceMappingURL="+g+".map")):i=c.code}catch(e){throw new Error("Cannot uglify2 file: "+t+". Skipping it. Error is:\n"+e.toString())}return i}}}}),/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*
 * This file patches require.js to communicate with the build system.
 */
//Using sloppy since this uses eval for some code like plugins,
//which may not be strict mode compliant. So if use strict is used
//below they will have strict rules applied and may cause an error.
/*jslint sloppy: true, nomen: true, plusplus: true, regexp: true */
/*global require, define: true */
//NOT asking for require as a dependency since the goal is to modify the
//global require below
define("requirePatch",["env!env/file","pragma","parse","lang","logger","commonJs","prim"],function(file,pragma,parse,lang,logger,commonJs,prim){var allowRun=!0,hasProp=lang.hasProp,falseProp=lang.falseProp,getOwn=lang.getOwn;
//This method should be called when the patches to require should take hold.
return function(){function normalizeUrlWithBase(e,n,t){
//Adjust the URL if it was not transformed to use baseUrl.
return require.jsExtRegExp.test(n)&&(t=(e.config.dir||e.config.dirBaseUrl)+t),t}if(allowRun){allowRun=!1;var layer,pluginBuilderRegExp=/(["']?)pluginBuilder(["']?)\s*[=\:]\s*["']([^'"\s]+)["']/,oldNewContext=require.s.newContext,oldDef,
//create local undefined values for module and exports,
//so that when files are evaled in this function they do not
//see the node values used for r.js
exports,module;/**
         * Reset "global" build caches that are kept around between
         * build layer builds. Useful to do when there are multiple
         * top level requirejs.optimize() calls.
         */
require._cacheReset=function(){
//Stored raw text caches, used by browser use.
require._cachedRawText={},
//Stored cached file contents for reuse in other layers.
require._cachedFileContents={},
//Store which cached files contain a require definition.
require._cachedDefinesRequireUrls={}},require._cacheReset(),/**
         * Makes sure the URL is something that can be supported by the
         * optimization tool.
         * @param {String} url
         * @returns {Boolean}
         */
require._isSupportedBuildUrl=function(e){
//Ignore URLs with protocols, hosts or question marks, means either network
//access is needed to fetch it or it is too dynamic. Note that
//on Windows, full paths are used for some urls, which include
//the drive, like c:/something, so need to test for something other
//than just a colon.
//Ignore URLs with protocols, hosts or question marks, means either network
//access is needed to fetch it or it is too dynamic. Note that
//on Windows, full paths are used for some urls, which include
//the drive, like c:/something, so need to test for something other
//than just a colon.
return e.indexOf("://")===-1&&e.indexOf("?")===-1&&0!==e.indexOf("empty:")&&0!==e.indexOf("//")||(layer.ignoredUrls[e]||(e.indexOf("empty:")===-1&&logger.info("Cannot optimize network URL, skipping: "+e),layer.ignoredUrls[e]=!0),!1)},
//Overrides the new context call to add existing tracking features.
require.s.newContext=function(name){var context=oldNewContext(name),oldEnable=context.enable,moduleProto=context.Module.prototype,oldInit=moduleProto.init,oldCallPlugin=moduleProto.callPlugin;
//Only do this for the context used for building.
//For build contexts, do everything sync
//Override the shim exports function generator to just
//spit out strings that can be used in the stringified
//build output.
//Override load so that the file paths can be collected.
//Marks module has having a name, and optionally executes the
//callback, but only if it meets certain criteria.
return"_"===name&&(context.nextTick=function(e){e()},context.needFullExec={},context.fullExec={},context.plugins={},context.buildShimExports={},context.makeShimExports=function(e){return context.config.wrapShim?function(){var n="return ";
// If specifies an export that is just a global
// name, no dot for a `this.` and such, then also
// attach to the global, for `var a = {}` files
// where the function closure would hide that from
// the global object.
return e.exports&&e.exports.indexOf(".")===-1&&(n+="root."+e.exports+" = "),e.init&&(n+="("+e.init.toString()+".apply(this, arguments))"),e.init&&e.exports&&(n+=" || "),e.exports&&(n+=e.exports),n+=";"}:function(){return"(function (global) {\n    return function () {\n        var ret, fn;\n"+(e.init?"       fn = "+e.init.toString()+";\n        ret = fn.apply(global, arguments);\n":"")+(e.exports?"        return ret || global."+e.exports+";\n":"        return ret;\n")+"    };\n}(this))"}},context.enable=function(e,n){var t=e.id,r=n&&n.map.id,i=context.needFullExec,o=context.fullExec,a=getOwn(context.registry,t);return a&&!a.defined?r&&getOwn(i,r)&&(i[t]=!0):(getOwn(i,t)&&falseProp(o,t)||r&&getOwn(i,r)&&falseProp(o,t))&&context.require.undef(t),oldEnable.apply(context,arguments)},context.load=function(moduleName,url){/*jslint evil: true */
var contents,pluginBuilderMatch,builderName,shim,shimExports;
//Do not mark the url as fetched if it is
//not an empty: URL, used by the optimizer.
//In that case we need to be sure to call
//load() for each module that is mapped to
//empty: so that dependencies are satisfied
//correctly.
0===url.indexOf("empty:")&&delete context.urlFetched[url],
//Only handle urls that can be inlined, so that means avoiding some
//URLs like ones that require network access or may be too dynamic,
//like JSONP
require._isSupportedBuildUrl(url)?(
//Adjust the URL if it was not transformed to use baseUrl.
url=normalizeUrlWithBase(context,moduleName,url),
//Save the module name to path  and path to module name mappings.
layer.buildPathMap[moduleName]=url,layer.buildFileToModule[url]=moduleName,hasProp(context.plugins,moduleName)&&(
//plugins need to have their source evaled as-is.
context.needFullExec[moduleName]=!0),prim().start(function(){if(!hasProp(require._cachedFileContents,url)||!falseProp(context.needFullExec,moduleName)&&!getOwn(context.fullExec,moduleName))
//Load the file contents, process for conditionals, then
//evaluate it.
return require._cacheReadAsync(url).then(function(e){contents=e,!context.config.cjsTranslate||context.config.shim&&lang.hasProp(context.config.shim,moduleName)||(contents=commonJs.convert(url,contents)),
//If there is a read filter, run it now.
context.config.onBuildRead&&(contents=context.config.onBuildRead(moduleName,url,contents)),contents=pragma.process(url,contents,context.config,"OnExecute");
//Find out if the file contains a require() definition. Need to know
//this so we can inject plugins right after it, but before they are needed,
//and to make sure this file is first, so that define calls work.
try{!layer.existingRequireUrl&&parse.definesRequire(url,contents)&&(layer.existingRequireUrl=url,require._cachedDefinesRequireUrls[url]=!0)}catch(e){throw new Error("Parse error using esprima for file: "+url+"\n"+e)}}).then(function(){
//This is a loader plugin, check to see if it has a build extension,
//otherwise the plugin will act as the plugin builder too.
//Load the plugin builder for the plugin contents.
return hasProp(context.plugins,moduleName)&&(pluginBuilderMatch=pluginBuilderRegExp.exec(contents))?(builderName=context.makeModuleMap(pluginBuilderMatch[3],context.makeModuleMap(moduleName),null,!0).id,require._cacheReadAsync(context.nameToUrl(builderName))):contents}).then(function(e){contents=e;
//Parse out the require and define calls.
//Do this even for plugins in case they have their own
//dependencies that may be separate to how the pluginBuilder works.
try{falseProp(context.needFullExec,moduleName)&&(contents=parse(moduleName,url,contents,{insertNeedsDefine:!0,has:context.config.has,findNestedDependencies:context.config.findNestedDependencies}))}catch(e){throw new Error("Parse error using esprima for file: "+url+"\n"+e)}require._cachedFileContents[url]=contents});contents=require._cachedFileContents[url],
//If it defines require, mark it so it can be hoisted.
//Done here and in the else below, before the
//else block removes code from the contents.
//Related to #263
!layer.existingRequireUrl&&require._cachedDefinesRequireUrls[url]&&(layer.existingRequireUrl=url)}).then(function(){contents&&eval(contents);try{
//If have a string shim config, and this is
//a fully executed module, try to see if
//it created a variable in this eval scope
getOwn(context.needFullExec,moduleName)&&(shim=getOwn(context.config.shim,moduleName))&&shim.exports&&void 0!==(shimExports=eval(shim.exports))&&(context.buildShimExports[moduleName]=shimExports),
//Need to close out completion of this module
//so that listeners will get notified that it is available.
context.completeLoad(moduleName)}catch(e){
//Track which module could not complete loading.
throw e.moduleTree||(e.moduleTree=[]),e.moduleTree.push(moduleName),e}}).then(null,function(e){throw e.fileName||(e.fileName=url),e}).end()):
//With unsupported URLs still need to call completeLoad to
//finish loading.
context.completeLoad(moduleName)},context.execCb=function(e,n,t,exports){var r=getOwn(layer.context.buildShimExports,e);return r?r:n.__requireJsBuild||getOwn(layer.context.needFullExec,e)?n.apply(exports,t):void 0},moduleProto.init=function(e){return context.needFullExec[this.map.id]&&lang.each(e,lang.bind(this,function(e){"string"==typeof e&&(e=context.makeModuleMap(e,this.map.isDefine?this.map:this.map.parentMap)),context.fullExec[e.id]||context.require.undef(e.id)})),oldInit.apply(this,arguments)},moduleProto.callPlugin=function(){var e=this.map,n=context.makeModuleMap(e.prefix),t=n.id,r=getOwn(context.registry,t);
//If the module is not waiting to finish being defined,
//undef it and start over, to get full execution.
return context.plugins[t]=!0,context.needFullExec[t]=!0,!falseProp(context.fullExec,t)||r&&!r.defined||context.require.undef(n.id),oldCallPlugin.apply(this,arguments)}),context},
//Clear up the existing context so that the newContext modifications
//above will be active.
delete require.s.contexts._,/** Reset state for each build layer pass. */
require._buildReset=function(){var e=require.s.contexts._;
//Return the previous context in case it is needed, like for
//the basic config object.
//Clear up the existing context.
//Set up new context, so the layer object can hold onto it.
return delete require.s.contexts._,require({}),layer=require._layer={buildPathMap:{},buildFileToModule:{},buildFilePaths:[],pathAdded:{},modulesWithNames:{},needsDefine:{},existingRequireUrl:"",ignoredUrls:{},context:require.s.contexts._},e},require._buildReset(),
//Override define() to catch modules that just define an object, so that
//a dummy define call is not put in the build file for them. They do
//not end up getting defined via context.execCb, so we need to catch them
//at the define call.
oldDef=define,
//This function signature does not have to be exact, just match what we
//are looking for.
define=function(e){return"string"==typeof e&&falseProp(layer.needsDefine,e)&&(layer.modulesWithNames[e]=!0),oldDef.apply(require,arguments)},define.amd=oldDef.amd,
//Add some utilities for plugins
require._readFile=file.readFile,require._fileExists=function(e){return file.exists(e)},
//Called when execManager runs for a dependency. Used to figure out
//what order of execution.
require.onResourceLoad=function(e,n){var t,r=n.id;
//If build needed a full execution, indicate it
//has been done now. But only do it if the context is tracking
//that. Only valid for the context used in a build, not for
//other contexts being run, like for useLib, plain requirejs
//use in node/rhino.
e.needFullExec&&getOwn(e.needFullExec,r)&&(e.fullExec[r]=!0),
//A plugin.
n.prefix?falseProp(layer.pathAdded,r)&&(layer.buildFilePaths.push(r),
//For plugins the real path is not knowable, use the name
//for both module to file and file to module mappings.
layer.buildPathMap[r]=r,layer.buildFileToModule[r]=r,layer.modulesWithNames[r]=!0,layer.pathAdded[r]=!0):n.url&&require._isSupportedBuildUrl(n.url)&&(
//If the url has not been added to the layer yet, and it
//is from an actual file that was loaded, add it now.
t=normalizeUrlWithBase(e,r,n.url),!layer.pathAdded[t]&&getOwn(layer.buildPathMap,r)&&(
//Remember the list of dependencies for this layer.
layer.buildFilePaths.push(t),layer.pathAdded[t]=!0))},
//Called by output of the parse() function, when a file does not
//explicitly call define, probably just require, but the parse()
//function normalizes on define() for dependency mapping and file
//ordering works correctly.
require.needsDefine=function(e){layer.needsDefine[e]=!0}}}}),/**
 * @license RequireJS Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint */
/*global define: false, console: false */
define("commonJs",["env!env/file","parse"],function(e,n){"use strict";var t={
//Set to false if you do not want this file to log. Useful in environments
//like node where you want the work to happen without noise.
useLog:!0,convertDir:function(n,r){var i,o,a,u,s,c=/\.js$/;
//Cycle through all the JS files and convert them.
if(
//Get list of files to convert.
i=e.getFilteredFileList(n,/\w/,!0),
//Normalize on front slashes and make sure the paths do not end in a slash.
n=n.replace(/\\/g,"/"),r=r.replace(/\\/g,"/"),"/"===n.charAt(n.length-1)&&(n=n.substring(0,n.length-1)),"/"===r.charAt(r.length-1)&&(r=r.substring(0,r.length-1)),i&&i.length)for(o=0;o<i.length;o++)a=i[o],u=a.replace(n,r),
//Handle JS files.
c.test(a)?(s=e.readFile(a),s=t.convert(a,s),e.saveUtf8File(u,s)):
//Just copy the file over.
e.copyFile(a,u,!0);else t.useLog&&("convert"===n?
//A request just to convert one file.
console.log("\n\n"+t.convert(r,e.readFile(r))):console.log("No files to convert in directory: "+n))},/**
         * Does the actual file conversion.
         *
         * @param {String} fileName the name of the file.
         *
         * @param {String} fileContents the contents of a file :)
         *
         * @returns {String} the converted contents
         */
convert:function(e,t){
//Strip out comments.
try{var r="",i=n.usesCommonJs(e,t);
//First see if the module is not already RequireJS-formatted.
if(n.usesAmdOrRequireJs(e,t)||!i)return t;(i.dirname||i.filename)&&(r='var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1); '),
//Construct the wrapper boilerplate.
t="define(function (require, exports, module) {"+r+t+"\n});\n"}catch(n){return console.log("commonJs.convert: COULD NOT CONVERT: "+e+", so skipping it. Error was: "+n),t}return t}};return t}),/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint plusplus: true, nomen: true, regexp: true  */
/*global define, requirejs */
define("build",function(require){"use strict";function makeBuildBaseConfig(){return{appDir:"",pragmas:{},paths:{},optimize:"uglify",optimizeCss:"standard.keepLines.keepWhitespace",inlineText:!0,isBuild:!0,optimizeAllPluginResources:!1,findNestedDependencies:!1,preserveLicenseComments:!0,
//By default, all files/directories are copied, unless
//they match this regexp, by default just excludes .folders
dirExclusionRegExp:file.dirExclusionRegExp,_buildPathToModuleIndex:{}}}/**
     * Some JS may not be valid if concatenated with other JS, in particular
     * the style of omitting semicolons and rely on ASI. Add a semicolon in
     * those cases.
     */
function addSemiColon(e,n){return n.skipSemiColonInsertion||endsWithSemiColonRegExp.test(e)?e:e+";"}function endsWithSlash(e){return"/"!==e.charAt(e.length-1)&&(e+="/"),e}
//Method used by plugin writeFile calls, defined up here to avoid
//jslint warning about "making a function in a loop".
function makeWriteFile(e,n){function t(e,n){logger.trace("Saving plugin-optimized file: "+e),file.saveUtf8File(e,n)}return t.asModule=function(r,i,o){t(i,build.toTransport(e,r,i,o,n))},t}/**
     * Converts command line args like "paths.foo=../some/path"
     * result.paths = { foo: '../some/path' } where prop = paths,
     * name = paths.foo and value = ../some/path, so it assumes the
     * name=value splitting has already happened.
     */
function stringDotToObj(e,n,t){var r=n.split(".");r.forEach(function(n,i){i===r.length-1?e[n]=t:(falseProp(e,n)&&(e[n]={}),e=e[n])})}/**
     * Mixes additional source config into target config, and merges some
     * nested config, like paths, correctly.
     */
function mixConfig(e,n,t){var r,i,o,a;for(r in n)hasProp(n,r)&&(
//If the value of the property is a plain object, then
//allow a one-level-deep mixing of it.
i=n[r],o=lang.isArray(i),"object"!=typeof i||!i||o||lang.isFunction(i)||lang.isRegExp(i)?o?t||(
// Some config, like packages, are arrays. For those,
// just merge the results.
a=e[r],lang.isArray(a)?e[r]=a.concat(i):e[r]=i):e[r]=i:e[r]=lang.mixin({},e[r],i,!0));
//Set up log level since it can affect if errors are thrown
//or caught and passed to errbacks while doing config setup.
lang.hasProp(e,"logLevel")&&logger.logLevel(e.logLevel)}/**
     * Converts a wrap.startFile or endFile to be start/end as a string.
     * the startFile/endFile values can be arrays.
     */
function flattenWrapFile(e,n,t){var r=n+"File";if("string"!=typeof e[n]&&e[r])e[n]="","string"==typeof e[r]&&(e[r]=[e[r]]),e[r].forEach(function(r){e[n]+=(e[n]?"\n":"")+file.readFile(build.makeAbsPath(r,t))});else if(null===e[n]||void 0===e[n])
//Allow missing one, just set to empty string.
e[n]="";else if("string"!=typeof e[n])throw new Error("wrap."+n+" or wrap."+r+" malformed")}function normalizeWrapConfig(e,n){
//Get any wrap text.
try{e.wrap&&(e.wrap===!0?
//Use default values.
e.wrap={start:"(function () {",end:"}());"}:(flattenWrapFile(e.wrap,"start",n),flattenWrapFile(e.wrap,"end",n)))}catch(e){throw new Error("Malformed wrap config: "+e.toString())}}var build,lang=require("lang"),prim=require("prim"),logger=require("logger"),file=require("env!env/file"),parse=require("parse"),optimize=require("optimize"),pragma=require("pragma"),transform=require("transform"),requirePatch=require("requirePatch"),env=require("env"),commonJs=require("commonJs"),SourceMapGenerator=require("source-map/source-map-generator"),hasProp=lang.hasProp,getOwn=lang.getOwn,falseProp=lang.falseProp,endsWithSemiColonRegExp=/;\s*$/,endsWithSlashRegExp=/[\/\\]$/,resourceIsModuleIdRegExp=/^[\w\/\\\.]+$/;
//Now map require to the outermost requirejs, now that we have
//local dependencies for this module. The rest of the require use is
//manipulating the requirejs loader.
//Caching function for performance. Attached to
//require so it can be reused in requirePatch.js. _cachedRawText
//set up by requirePatch.js
/**
     * Main API entry point into the build. The args argument can either be
     * an array of arguments (like the onese passed on a command-line),
     * or it can be a JavaScript object that has the format of a build profile
     * file.
     *
     * If it is an object, then in addition to the normal properties allowed in
     * a build profile file, the object should contain one other property:
     *
     * The object could also contain a "buildFile" property, which is a string
     * that is the file path to a build profile that contains the rest
     * of the build profile directives.
     *
     * This function does not return a status, it should throw an error if
     * there is a problem completing the build.
     */
/**
     * Converts an array that has String members of "name=value"
     * into an object, where the properties on the object are the names in the array.
     * Also converts the strings "true" and "false" to booleans for the values.
     * member name/value pairs, and converts some comma-separated lists into
     * arrays.
     * @param {Array} ary
     */
/**
     * For any path in a possible config, make it absolute relative
     * to the absFilePath passed in.
     */
/**
     * Creates a relative path to targetPath from refPath.
     * Only deals with file paths, not folders. If folders,
     * make sure paths end in a trailing '/'.
     */
/**
     * Creates a config object for an optimization build.
     * It will also read the build profile if it is available, to create
     * the configuration.
     *
     * @param {Object} cfg config options that take priority
     * over defaults and ones in the build file. These options could
     * be from a command line, for instance.
     *
     * @param {Object} the created config object.
     */
/**
     * finds the module being built/optimized with the given moduleName,
     * or returns null.
     * @param {String} moduleName
     * @param {Array} modules
     * @returns {Object} the module object from the build profile, or null.
     */
/**
     * Removes a module name and path from a layer, if it is supposed to be
     * excluded from the layer.
     * @param {String} moduleName the name of the module
     * @param {String} path the file path for the module
     * @param {Object} layer the layer to remove the module/path from
     */
/**
     * Uses the module build config object to trace the dependencies for the
     * given module.
     *
     * @param {Object} module the module object from the build config info.
     * @param {Object} config the build config object.
     * @param {Object} [baseLoaderConfig] the base loader config to use for env resets.
     *
     * @returns {Object} layer information about what paths and modules should
     * be in the flattened module.
     */
/**
     * Uses the module build config object to create an flattened version
     * of the module, with deep dependencies included.
     *
     * @param {Object} module the module object from the build config info.
     *
     * @param {Object} layer the layer object returned from build.traceDependencies.
     *
     * @param {Object} the build config object.
     *
     * @returns {Object} with two properties: "text", the text of the flattened
     * module, and "buildText", a string of text representing which files were
     * included in the flattened module text.
     */
//Converts an JS array of strings to a string representation.
//Not using JSON.stringify() for Rhino's sake.
return prim.nextTick=function(e){e()},require=requirejs,require._cacheReadAsync=function(e,n){var t;return lang.hasProp(require._cachedRawText,e)?(t=prim(),t.resolve(require._cachedRawText[e]),t.promise):file.readFileAsync(e,n).then(function(n){return require._cachedRawText[e]=n,n})},build=function(e){var n,t,r,i,o,a,u,s,c,l=/( {4}at[^\n]+)\n/;return prim().start(function(){if(!e||lang.isArray(e)){if(!e||e.length<1)return void logger.error("build.js buildProfile.js\nwhere buildProfile.js is the name of the build file (see example.build.js for hints on how to make a build file).");
//Next args can include a build file path as well as other build args.
//build file path comes first. If it does not contain an = then it is
//a build file path. Otherwise, just all build args.
e[0].indexOf("=")===-1&&(n=e[0],e.splice(0,1)),
//Remaining args are options to the build
t=build.convertArrayToObject(e),t.buildFile=n}else t=e;return build._run(t)}).then(null,function(n){var t;
//If a module tree that shows what module triggered the error,
//print it out.
if(r=n.toString(),a=n.moduleTree,o=l.exec(r),o&&(r+=r.substring(0,o.index+o[0].length+1)),a&&a.length>0){for(r+="\nIn module tree:\n",u=a.length-1;u>-1;u--)if(c=a[u]){for(s=a.length-u;s>-1;s--)r+="  ";r+=c+"\n"}logger.error(r)}
//Just trim out the first "at" in the stack.
throw i=n.stack,"string"==typeof e&&e.indexOf("stacktrace=true")!==-1?r+="\n"+i:!o&&i&&(o=l.exec(i))&&(r+="\n"+o[0]||""),t=new Error(r),t.originalError=n,t})},build._run=function(e){var n,t,r,i,o,a,u,s,c,l,f,p,d,h,g,m,v,y,b={},x="",_={};return prim().start(function(){var t;if(
//Can now run the patches to require.js to allow it to be used for
//build generation. Do it here instead of at the top of the module
//because we want normal require behavior to load the build tool
//then want to switch to build mode.
requirePatch(),u=build.createConfig(e),i=u.paths,
//Remove the previous build dir, in case it contains source transforms,
//like the ones done with onBuildRead and onBuildWrite.
u.dir&&!u.keepBuildDir&&file.exists(u.dir)&&file.deleteFile(u.dir),!u.out&&!u.cssIn)if(
//This is not just a one-off file build but a full build profile, with
//lots of files to process.
//First copy all the baseUrl content
file.copyDir(u.appDir||u.baseUrl,u.dir,/\w/,!0),
//Adjust baseUrl if config.appDir is in play, and set up build output paths.
n={},u.appDir)
//All the paths should be inside the appDir, so just adjust
//the paths to use the dirBaseUrl
for(t in i)hasProp(i,t)&&(n[t]=i[t].replace(u.appDir,u.dir));else
//If no appDir, then make sure to copy the other paths to this directory.
for(t in i)hasProp(i,t)&&(
//Set up build path for each path prefix, but only do so
//if the path falls out of the current baseUrl
0===i[t].indexOf(u.baseUrl)?n[t]=i[t].replace(u.baseUrl,u.dirBaseUrl):(n[t]="empty:"===i[t]?"empty:":t.replace(/\./g,"/"),
//Make sure source path is fully formed with baseUrl,
//if it is a relative URL.
c=i[t],0!==c.indexOf("/")&&c.indexOf(":")===-1&&(c=u.baseUrl+c),f=u.dirBaseUrl+n[t],
//Skip empty: paths
"empty:"!==c&&(
//If the srcPath is a directory, copy the whole directory.
file.exists(c)&&file.isDirectory(c)?
//Copy files to build area. Copy all files (the /\w/ regexp)
file.copyDir(c,f,/\w/,!0):(
//Try a .js extension
c+=".js",f+=".js",file.copyFile(c,f)))));
//Figure out source file location for each module layer. Do this by seeding require
//with source area configuration. This is needed so that later the module layers
//can be manually copied over to the source area, since the build may be
//require multiple times and the above copyDir call only copies newer files.
require({baseUrl:u.baseUrl,paths:i,packagePaths:u.packagePaths,packages:u.packages}),l=require.s.contexts._,s=u.modules,s&&s.forEach(function(module){if(module.name&&(module._sourcePath=l.nameToUrl(module.name),!(file.exists(module._sourcePath)||module.create||module.name.indexOf("!")!==-1||u.rawText&&lang.hasProp(u.rawText,module.name))))throw new Error("ERROR: module path does not exist: "+module._sourcePath+" for module named: "+module.name+". Path is relative to: "+file.absPath("."))}),u.out?(
//Just set up the _buildPath for the module layer.
require(u),u.cssIn||(u.modules[0]._buildPath="function"==typeof u.out?"FUNCTION":u.out)):u.cssIn||(
//Now set up the config for require to use the build area, and calculate the
//build file locations. Pass along any config info too.
a={baseUrl:u.dirBaseUrl,paths:n},lang.mixin(a,u),require(a),s&&s.forEach(function(module){if(module.name){
//If buildPath and sourcePath are the same, throw since this
//would result in modifying source. This condition can happen
//with some more tricky paths: config and appDir/baseUrl
//setting, which is a sign of incorrect config.
if(module._buildPath=l.nameToUrl(module.name,null),module._buildPath===module._sourcePath)throw new Error("Module ID '"+module.name+"' has a source path that is same as output path: "+module._sourcePath+". Stopping, config is malformed.");module.create||file.copyFile(module._sourcePath,module._buildPath)}})),
//Run CSS optimizations before doing JS module tracing, to allow
//things like text loader plugins loading CSS to get the optimized
//CSS.
u.optimizeCss&&"none"!==u.optimizeCss&&u.dir&&(x+=optimize.css(u.dir,u))}).then(function(){a=lang.deeplikeCopy(require.s.contexts._.config)}).then(function(){var e=[];if(s)return e=s.map(function(module,e){return function(){
//Call require to calculate dependencies.
//Save off buildPath to module index in a hash for quicker
//lookup later.
return u._buildPathToModuleIndex[file.normalize(module._buildPath)]=e,build.traceDependencies(module,u,a).then(function(e){module.layer=e})}}),prim.serial(e)}).then(function(){var e;if(s)
//Now build up shadow layers for anything that should be excluded.
//Do this after tracing dependencies for each module, in case one
//of those modules end up being one of the excluded values.
return e=s.map(function(module){return function(){if(module.exclude)return module.excludeLayers=[],prim.serial(module.exclude.map(function(e,n){return function(){
//See if it is already in the list of modules.
//If not trace dependencies for it.
var t=build.findBuildModule(e,s);if(!t)return build.traceDependencies({name:e},u,a).then(function(e){module.excludeLayers[n]={layer:e}});module.excludeLayers[n]=t}}))}}),prim.serial(e)}).then(function(){if(s)return prim.serial(s.map(function(module){return function(){
//Flatten them and collect the build output for each module.
//module.exclude is an array of module names. For each one,
//get the nested dependencies for it via a matching entry
//in the module.excludeLayers array.
//module.excludeShallow is an array of module names.
//shallow exclusions are just that module itself, and not
//its nested dependencies.
return module.exclude&&module.exclude.forEach(function(e,n){var t=module.excludeLayers[n].layer,r=t.buildFileToModule;t.buildFilePaths.forEach(function(e){build.removeModulePath(r[e],e,module.layer)})}),module.excludeShallow&&module.excludeShallow.forEach(function(e){var n=getOwn(module.layer.buildPathMap,e);n&&build.removeModulePath(e,n,module.layer)}),build.flattenModule(module,module.layer,u).then(function(e){var n,t;
//Save it to a temp file for now, in case there are other layers that
//contain optimized content that should not be included in later
//layer optimizations. See issue #56.
"FUNCTION"===module._buildPath?(module._buildText=e.text,module._buildSourceMap=e.sourceMap):(n=e.text,e.sourceMap&&(t=module._buildPath.split("/"),t=t.pop(),n+="\n//# sourceMappingURL="+t+".map",file.saveUtf8File(module._buildPath+".map",e.sourceMap)),file.saveUtf8File(module._buildPath+"-temp",n)),x+=e.buildText})}}))}).then(function(){var e,n;
//Do other optimizations.
if(s&&
//Now move the build layers to their final position.
s.forEach(function(module){var e=module._buildPath;"FUNCTION"!==e&&(file.exists(e)&&file.deleteFile(e),file.renameFile(e+"-temp",e),
//And finally, if removeCombined is specified, remove
//any of the files that were used in this layer.
//Be sure not to remove other build layers.
u.removeCombined&&!u.out&&module.layer.buildFilePaths.forEach(function(e){var n=s.some(function(n){return n._buildPath===e}),t=build.makeRelativeFilePath(u.dir,e);file.exists(e)&&
// not a build layer target
!n&&
// not outside the build directory
0!==t.indexOf("..")&&file.deleteFile(e)})),
//Signal layer is done
u.onModuleBundleComplete&&u.onModuleBundleComplete(module.onCompleteData)}),
//If removeCombined in play, remove any empty directories that
//may now exist because of its use
u.removeCombined&&!u.out&&u.dir&&file.deleteEmptyDirs(u.dir),u.out&&!u.cssIn)
//Just need to worry about one JS file.
t=u.modules[0]._buildPath,"FUNCTION"===t?(n=u.modules[0]._buildSourceMap,u._buildSourceMap=n,u.modules[0]._buildText=optimize.js((u.modules[0].name||u.modules[0].include[0]||t)+".build.js",u.modules[0]._buildText,null,u),u._buildSourceMap&&u._buildSourceMap!==n&&(u.modules[0]._buildSourceMap=u._buildSourceMap,u._buildSourceMap=null)):optimize.jsFile(t,null,t,u);else if(!u.cssIn){
//Normal optimizations across modules.
//JS optimizations.
r=file.getFilteredFileList(u.dir,/\.js$/,!0),r.forEach(function(n){var t,r,i;
//Generate the module name from the config.dir root.
e=n.replace(u.dir,""),
//Get rid of the extension
e=e.substring(0,e.length-3),
//If there is an override for a specific layer build module,
//and this file is that module, mix in the override for use
//by optimize.jsFile.
i=getOwn(u._buildPathToModuleIndex,n),
//Try to avoid extra work if the other files do not need to
//be read. Build layers should be processed at the very
//least for optimization.
((
//Normalize, since getOwn could have returned undefined
i=0===i||i>0?i:-1)>-1||!u.skipDirOptimize||"all"===u.normalizeDirDefines||u.cjsTranslate)&&(
//Convert the file to transport format, but without a name
//inserted (by passing null for moduleName) since the files are
//standalone, one module per file.
y=file.readFile(n),
//For builds, if wanting cjs translation, do it now, so that
//the individual modules can be loaded cross domain via
//plain script tags.
!u.cjsTranslate||u.shim&&lang.hasProp(u.shim,e)||(y=commonJs.convert(n,y)),i===-1&&(u.onBuildRead&&(y=u.onBuildRead(e,n,y)),
//Only do transport normalization if this is not a build
//layer (since it was already normalized) and if
//normalizeDirDefines indicated all should be done.
"all"===u.normalizeDirDefines&&(y=build.toTransport(u.namespace,null,n,y)),u.onBuildWrite&&(y=u.onBuildWrite(e,n,y))),r=i>-1?u.modules[i].override:null,t=r?build.createOverrideConfig(u,r):u,(i>-1||!u.skipDirOptimize)&&optimize.jsFile(n,y,n,t,_))}),
//Normalize all the plugin resources.
h=require.s.contexts._;for(e in _)if(hasProp(_,e))for(d=h.makeModuleMap(e),g=_[e],o=0;o<g.length;o++){if(m=g[o],p=h.makeModuleMap(m,d),falseProp(h.plugins,p.prefix)){
//Do not bother if the plugin is not available.
if(
//Set the value in context.plugins so it
//will be evaluated as a full plugin.
h.plugins[p.prefix]=!0,!file.exists(require.toUrl(p.prefix+".js")))continue;
//Rely on the require in the build environment
//to be synchronous
h.require([p.prefix]),
//Now that the plugin is loaded, redo the moduleMap
//since the plugin will need to normalize part of the path.
p=h.makeModuleMap(m,d)}
//Only bother with plugin resources that can be handled
//processed by the plugin, via support of the writeFile
//method.
falseProp(b,p.id)&&(
//Only do the work if the plugin was really loaded.
//Using an internal access because the file may
//not really be loaded.
v=getOwn(h.defined,p.prefix),v&&v.writeFile&&v.writeFile(p.prefix,p.name,require,makeWriteFile(u.namespace),h.config),b[p.id]=!0)}
//console.log('PLUGIN COLLECTOR: ' + JSON.stringify(pluginCollector, null, "  "));
//All module layers are done, write out the build.txt file.
file.saveUtf8File(u.dir+"build.txt",x)}
//Print out what was built into which layers.
//If just have one CSS file to optimize, do that here.
//Print out what was built into which layers.
return u.cssIn&&(x+=optimize.cssFile(u.cssIn,u.out,u).buildText),"function"==typeof u.out&&u.out(u.modules[0]._buildText,u.modules[0]._buildSourceMap),x?(logger.info(x),x):""})},build.objProps={paths:!0,wrap:!0,pragmas:!0,pragmasOnSave:!0,has:!0,hasOnSave:!0,uglify:!0,uglify2:!0,closure:!0,map:!0,throwWhen:!0},build.hasDotPropMatch=function(e){var n,t=e.indexOf(".");return t!==-1&&(n=e.substring(0,t),hasProp(build.objProps,n))},build.convertArrayToObject=function(e){var n,t,r,i,o={},a={include:!0,exclude:!0,excludeShallow:!0,insertRequire:!0,stubModules:!0,deps:!0};for(n=0;n<e.length;n++){if((t=e[n].indexOf("="))===-1)throw"Malformed name/value pair: ["+e[n]+"]. Format should be name=value";i=e[n].substring(t+1,e[n].length),"true"===i?i=!0:"false"===i&&(i=!1),r=e[n].substring(0,t),
//Convert to array if necessary
getOwn(a,r)&&(i=i.split(",")),build.hasDotPropMatch(r)?stringDotToObj(o,r,i):o[r]=i}return o},build.makeAbsPath=function(e,n){
//Add abspath if necessary. If path starts with a slash or has a colon,
//then already is an abolute path.
return n?(0!==e.indexOf("/")&&e.indexOf(":")===-1&&(e=n+("/"===n.charAt(n.length-1)?"":"/")+e,e=file.normalize(e)),e.replace(lang.backSlashRegExp,"/")):e},build.makeAbsObject=function(e,n,t){var r,i;if(n)for(r=0;r<e.length;r++)i=e[r],hasProp(n,i)&&"string"==typeof n[i]&&(n[i]=build.makeAbsPath(n[i],t))},build.makeAbsConfig=function(e,n){var t,r,i;for(t=["appDir","dir","baseUrl"],i=0;i<t.length;i++)r=t[i],getOwn(e,r)&&(
//Add abspath if necessary, make sure these paths end in
//slashes
"baseUrl"===r?(e.originalBaseUrl=e.baseUrl,e.appDir?
//If baseUrl with an appDir, the baseUrl is relative to
//the appDir, *not* the absFilePath. appDir and dir are
//made absolute before baseUrl, so this will work.
e.baseUrl=build.makeAbsPath(e.originalBaseUrl,e.appDir):
//The dir output baseUrl is same as regular baseUrl, both
//relative to the absFilePath.
e.baseUrl=build.makeAbsPath(e[r],n)):e[r]=build.makeAbsPath(e[r],n),e[r]=endsWithSlash(e[r]));build.makeAbsObject(["out","cssIn"],e,n),build.makeAbsObject(["startFile","endFile"],e.wrap,n)},build.makeRelativeFilePath=function(e,n){var t,r,i,o,a,u,s=e.split("/"),c=endsWithSlashRegExp.test(n),l=[];for(n=file.normalize(n),c&&!endsWithSlashRegExp.test(n)&&(n+="/"),a=n.split("/"),
//Pull off file name
u=a.pop(),
//Also pop off the ref file name to make the matches against
//targetParts equivalent.
s.pop(),o=s.length,t=0;t<o&&s[t]===a[t];t+=1);for(
//Now i is the index in which they diverge.
i=a.slice(t),r=o-t,t=0;t>-1&&t<r;t+=1)l.push("..");return l.join("/")+(l.length?"/":"")+i.join("/")+(i.length?"/":"")+u},build.nestedMix={paths:!0,has:!0,hasOnSave:!0,pragmas:!0,pragmasOnSave:!0},build.createConfig=function(cfg){/*jslint evil: true */
var buildFileContents,buildFileConfig,mainConfig,mainConfigFile,mainConfigPath,buildFile,absFilePath,config={},buildBaseConfig=makeBuildBaseConfig();if(
//Make sure all paths are relative to current directory.
absFilePath=file.absPath("."),build.makeAbsConfig(cfg,absFilePath),build.makeAbsConfig(buildBaseConfig,absFilePath),lang.mixin(config,buildBaseConfig),lang.mixin(config,cfg,!0),
//Set up log level early since it can affect if errors are thrown
//or caught and passed to errbacks, even while constructing config.
lang.hasProp(config,"logLevel")&&logger.logLevel(config.logLevel),config.buildFile){
//Find the build file, and make sure it exists, if this is a build
//that has a build profile, and not just command line args with an in=path
if(
//A build file exists, load it to get more config.
buildFile=file.absPath(config.buildFile),!file.exists(buildFile))throw new Error("ERROR: build file does not exist: "+buildFile);absFilePath=config.baseUrl=file.absPath(file.parent(buildFile)),
//Load build file options.
buildFileContents=file.readFile(buildFile);try{buildFileConfig=eval("("+buildFileContents+")"),build.makeAbsConfig(buildFileConfig,absFilePath),
//Mix in the config now so that items in mainConfigFile can
//be resolved relative to them if necessary, like if appDir
//is set here, but the baseUrl is in mainConfigFile. Will
//re-mix in the same build config later after mainConfigFile
//is processed, since build config should take priority.
mixConfig(config,buildFileConfig)}catch(e){throw new Error("Build file "+buildFile+" is malformed: "+e)}}
//Set final output dir
if(mainConfigFile=config.mainConfigFile||buildFileConfig&&buildFileConfig.mainConfigFile,mainConfigFile&&("string"==typeof mainConfigFile&&(mainConfigFile=[mainConfigFile]),mainConfigFile.forEach(function(e){if(e=build.makeAbsPath(e,absFilePath),!file.exists(e))throw new Error(e+" does not exist.");try{mainConfig=parse.findConfig(file.readFile(e)).config}catch(n){throw new Error("The config in mainConfigFile "+e+" cannot be used because it cannot be evaluated correctly while running in the optimizer. Try only using a config that is also valid JSON, or do not use mainConfigFile and instead copy the config values needed into a build file or command line arguments given to the optimizer.\nSource error from parsing: "+e+": "+n)}mainConfig&&(mainConfigPath=e.substring(0,e.lastIndexOf("/")),
//Add in some existing config, like appDir, since they can be
//used inside the configFile -- paths and baseUrl are
//relative to them.
config.appDir&&!mainConfig.appDir&&(mainConfig.appDir=config.appDir),
//If no baseUrl, then use the directory holding the main config.
mainConfig.baseUrl||(mainConfig.baseUrl=mainConfigPath),build.makeAbsConfig(mainConfig,mainConfigPath),mixConfig(config,mainConfig))})),
//Mix in build file config, but only after mainConfig has been mixed in.
//Since this is a re-application, skip array merging.
buildFileConfig&&mixConfig(config,buildFileConfig,!0),
//Re-apply the override config values. Command line
//args should take precedence over build file values.
//Since this is a re-application, skip array merging.
mixConfig(config,cfg,!0),
//Fix paths to full paths so that they can be adjusted consistently
//lately to be in the output area.
lang.eachProp(config.paths,function(e,n){if(lang.isArray(e))throw new Error("paths fallback not supported in optimizer. Please provide a build config path override for "+n);config.paths[n]=build.makeAbsPath(e,config.baseUrl)}),hasProp(config,"baseUrl")){if(config.appDir){if(!config.originalBaseUrl)throw new Error("Please set a baseUrl in the build config");config.dirBaseUrl=build.makeAbsPath(config.originalBaseUrl,config.dir)}else config.dirBaseUrl=config.dir||config.baseUrl;
//Make sure dirBaseUrl ends in a slash, since it is
//concatenated with other strings.
config.dirBaseUrl=endsWithSlash(config.dirBaseUrl)}
//Check for errors in config
if(config.main)throw new Error('"main" passed as an option, but the supported option is called "name".');if(config.out&&!config.name&&!config.modules&&!config.include&&!config.cssIn)throw new Error('Missing either a "name", "include" or "modules" option');if(config.cssIn){if(config.dir||config.appDir)throw new Error('cssIn is only for the output of single file CSS optimizations and is not compatible with "dir" or "appDir" configuration.');if(!config.out)throw new Error('"out" option missing.')}if(config.cssIn||config.baseUrl||(
//Just use the current directory as the baseUrl
config.baseUrl="./"),!config.out&&!config.dir)throw new Error('Missing either an "out" or "dir" config value. If using "appDir" for a full project optimization, use "dir". If you want to optimize to one file, use "out".');if(config.appDir&&config.out)throw new Error('"appDir" is not compatible with "out". Use "dir" instead. appDir is used to copy whole projects, where "out" with "baseUrl" is used to just optimize to one file.');if(config.out&&config.dir)throw new Error('The "out" and "dir" options are incompatible. Use "out" if you are targeting a single file for for optimization, and "dir" if you want the appDir or baseUrl directories optimized.');if(config.dir&&!config.allowSourceOverwrites&&(config.dir===config.baseUrl||config.dir===config.appDir||config.baseUrl&&0!==build.makeRelativeFilePath(config.dir,config.baseUrl).indexOf("..")||config.appDir&&0!==build.makeRelativeFilePath(config.dir,config.appDir).indexOf("..")))throw new Error('"dir" is set to a parent or same directory as "appDir" or "baseUrl". This can result in the deletion of source code. Stopping. If you want to allow possible overwriting of source code, set "allowSourceOverwrites" to true in the build config, but do so at your own risk. In that case, you may want to also set "keepBuildDir" to true.');if(config.insertRequire&&!lang.isArray(config.insertRequire))throw new Error("insertRequire should be a list of module IDs to insert in to a require([]) call.");if(config.generateSourceMaps){if(config.preserveLicenseComments&&"none"!==config.optimize)throw new Error("Cannot use preserveLicenseComments and generateSourceMaps together. Either explcitly set preserveLicenseComments to false (default is true) or turn off generateSourceMaps. If you want source maps with license comments, see: http://requirejs.org/docs/errors.html#sourcemapcomments");if("none"!==config.optimize&&"closure"!==config.optimize&&"uglify2"!==config.optimize)
//Allow optimize: none to pass, since it is useful when toggling
//minification on and off to debug something, and it implicitly
//works, since it does not need a source map.
throw new Error('optimize: "'+config.optimize+'" does not support generateSourceMaps.')}if(!config.name&&!config.include||config.modules){if(config.modules&&config.out)throw new Error('If the "modules" option is used, then there should be a "dir" option set and "out" should not be used since "out" is only for single file optimization output.');if(config.modules&&config.name)throw new Error('"name" and "modules" options are incompatible. Either use "name" if doing a single file optimization, or "modules" if you want to target more than one file for optimization.')}else
//Just need to build one file, but may be part of a whole appDir/
//baseUrl copy, but specified on the command line, so cannot do
//the modules array setup. So create a modules section in that
//case.
config.modules=[{name:config.name,out:config.out,create:config.create,include:config.include,exclude:config.exclude,excludeShallow:config.excludeShallow,insertRequire:config.insertRequire,stubModules:config.stubModules}],delete config.stubModules;
//Do final input verification
if(config.out&&!config.cssIn&&(
//Just one file to optimize.
//Does not have a build file, so set up some defaults.
//Optimizing CSS should not be allowed, unless explicitly
//asked for on command line. In that case the only task is
//to optimize a CSS file.
cfg.optimizeCss||(config.optimizeCss="none")),
//Normalize cssPrefix
config.cssPrefix?
//Make sure cssPrefix ends in a slash
config.cssPrefix=endsWithSlash(config.cssPrefix):config.cssPrefix="",
//Cycle through modules and combine any local stubModules with
//global values.
config.modules&&config.modules.length&&config.modules.forEach(function(e){config.stubModules&&(e.stubModules=config.stubModules.concat(e.stubModules||[])),
//Create a hash lookup for the stubModules config to make lookup
//cheaper later.
e.stubModules&&(e.stubModules._byName={},e.stubModules.forEach(function(n){e.stubModules._byName[n]=!0})),
//Allow wrap config in overrides, but normalize it.
e.override&&normalizeWrapConfig(e.override,absFilePath)}),normalizeWrapConfig(config,absFilePath),config.context)throw new Error('The build argument "context" is not supported in a build. It should only be used in web pages.');
//Set up normalizeDirDefines. If not explicitly set, if optimize "none",
//set to "skip" otherwise set to "all".
//Set file.fileExclusionRegExp if desired
//Set file.dirExclusionRegExp if desired, this is the old
//name for fileExclusionRegExp before 1.0.2. Support for backwards
//compatibility
//Remove things that may cause problems in the build.
return hasProp(config,"normalizeDirDefines")||("none"===config.optimize||config.skipDirOptimize?config.normalizeDirDefines="skip":config.normalizeDirDefines="all"),hasProp(config,"fileExclusionRegExp")?"string"==typeof config.fileExclusionRegExp?file.exclusionRegExp=new RegExp(config.fileExclusionRegExp):file.exclusionRegExp=config.fileExclusionRegExp:hasProp(config,"dirExclusionRegExp")&&(file.exclusionRegExp=config.dirExclusionRegExp),delete config.jQuery,delete config.enforceDefine,delete config.urlArgs,config},build.findBuildModule=function(e,n){var t,module;for(t=0;t<n.length;t++)if(module=n[t],module.name===e)return module;return null},build.removeModulePath=function(module,e,n){var t=n.buildFilePaths.indexOf(e);t!==-1&&n.buildFilePaths.splice(t,1)},build.traceDependencies=function(module,e,n){
//Use a wrapping function so can check for errors.
function t(e){
//If a sync build environment, check for errors here, instead of
//in the then callback below, since some errors, like two IDs pointed
//to same URL but only one anon ID will leave the loader in an
//unresolved state since a setTimeout cannot be used to check for
//timeout.
var n=!1;if(s[env.get()])try{build.checkForErrors(a)}catch(e){n=!0,c.reject(e)}n||c.resolve(e)}var r,i,o,a,u,s={rhino:!0,node:!0,xpconnect:!0},c=prim();
//Reset some state set up in requirePatch.js, and clean up require's
//current context.
//Grab the reset layer and context after the reset, but keep the
//old config to reuse in the new context.
//Put back basic config, use a fresh object for it.
//If there are overrides to basic config, set that up now.;
//Now, populate the rawText cache with any values explicitly passed in
//via config.
//Configure the callbacks to be called.
//Figure out module layer dependencies by calling require to do the work.
// If a sync env, then with the "two IDs to same anon module path"
// issue, the require never completes, need to check for errors
// here.
return require._buildReset(),o=require._layer,a=o.context,n&&require(lang.deeplikeCopy(n)),logger.trace("\nTracing dependencies for: "+(module.name||("function"==typeof module.out?"FUNCTION":module.out))),r=module.name&&!module.create?[module.name]:[],module.include&&(r=r.concat(module.include)),module.override&&(i=n?build.createOverrideConfig(n,module.override):lang.deeplikeCopy(module.override),require(i)),u=require.s.contexts._.config.rawText,u&&lang.eachProp(u,function(e,n){var t=require.toUrl(n)+".js";require._cachedRawText[t]=e}),c.reject.__requireJsBuild=!0,t.__requireJsBuild=!0,require(r,t,c.reject),s[env.get()]&&build.checkForErrors(a),c.promise.then(function(){
//Reset config
return module.override&&n&&require(lang.deeplikeCopy(n)),build.checkForErrors(a),o})},build.checkForErrors=function(e){function n(e,n,t){
// Loader plugins do not have an errUrl, so skip them.
n&&(t||f.push(e),p[n]?(h=!0,
//This error module has the same URL as another
//error module, could be misconfiguration.
d[n]||(d[n]=[],
//Store the original module that had the same URL.
d[n].push(p[n])),d[n].push(e)):t||(p[n]=e))}
//Check to see if it all loaded. If not, then throw, and give
//a message on what is left.
var t,r,i,o,a,u,s="",c={},l=[],f=[],p={},d={},h=!1,g=!1,m=e.defined,v=e.registry;for(t in v)hasProp(v,t)&&0!==t.indexOf("_@r")&&(g=!0,i=getOwn(v,t),o=t.split("!"),a=o[0],t.indexOf("_unnormalized")===-1&&i&&i.enabled&&n(t,i.map.url),
//Look for plugins that did not call load()
o.length>1&&(falseProp(c,a)&&l.push(a),u=c[a],u||(u=c[a]=[]),u.push(t+(i.error?": "+i.error:""))));
// If have some modules that are not defined/stuck in the registry,
// then check defined modules for URL overlap.
if(g)for(t in m)hasProp(m,t)&&t.indexOf("!")===-1&&n(t,require.toUrl(t)+".js",!0);if(f.length||l.length){if(l.length&&(s+="Loader plugin"+(1===l.length?"":"s")+" did not call the load callback in the build:\n"+l.map(function(e){return e+":\n  "+c[e].join("\n  ")}).join("\n")+"\n"),s+="Module loading did not complete for: "+f.join(", "),h){s+="\nThe following modules share the same URL. This could be a misconfiguration if that URL only has one anonymous module in it:";for(r in d)hasProp(d,r)&&(s+="\n"+r+": "+d[r].join(", "))}throw new Error(s)}},build.createOverrideConfig=function(e,n){var t=lang.deeplikeCopy(e),r=lang.deeplikeCopy(n);return lang.eachProp(r,function(r,i){hasProp(build.objProps,i)?(
//An object property, merge keys. Start a new object
//so that source object in config does not get modified.
t[i]={},lang.mixin(t[i],e[i],!0),lang.mixin(t[i],n[i],!0)):t[i]=n[i]}),t},build.flattenModule=function(module,e,n){var t,r,i,o="";return prim().start(function(){var a,u,s,c,l,f,p,d,h,g,m,v,y,b=e.context,x=[],_={};
//Use override settings, particularly for pragmas
//Do this before the var readings since it reads config values.
//Start build output for the module.
//If there was an existing file with require in it, hoist to the top.
//Write the built module to disk, and build up the build output.
return module.override&&(n=build.createOverrideConfig(n,module.override)),m=n.namespace||"",v=m?m+".":"",y=module.stubModules&&module.stubModules._byName||{},module.onCompleteData={name:module.name,path:n.dir?module._buildPath.replace(n.dir,""):module._buildPath,included:[]},o+="\n"+module.onCompleteData.path+"\n----------------\n",e.existingRequireUrl&&(a=e.buildFilePaths.indexOf(e.existingRequireUrl))!==-1&&(e.buildFilePaths.splice(a,1),e.buildFilePaths.unshift(e.existingRequireUrl)),n.generateSourceMaps&&(i=n.dir||n.baseUrl,s="FUNCTION"===module._buildPath?(module.name||module.include[0]||"FUNCTION")+".build.js":module._buildPath.replace(i,""),r=new SourceMapGenerator.SourceMapGenerator({file:s})),t="",prim.serial(e.buildFilePaths.map(function(i){return function(){var a,s="";
//If the moduleName is for a package main, then update it to the
//real main value.
// Not a match, clear packageMain
return c=e.buildFileToModule[i],p=c.split("/").shift(),f=e.context.config.pkgs&&getOwn(e.context.config.pkgs,p),f!==c&&(f=void 0),prim().start(function(){
//Figure out if the module is a result of a build plugin, and if so,
//then delegate to that plugin.
return d=b.makeModuleMap(c),h=d.prefix&&getOwn(b.defined,d.prefix),h?(h.onLayerEnd&&falseProp(_,d.prefix)&&(x.push(h),_[d.prefix]=!0),void(h.write&&(g=function(e){s+="\n"+addSemiColon(e,n),n.onBuildWrite&&(s=n.onBuildWrite(c,i,s))},g.asModule=function(t,r){s+="\n"+addSemiColon(build.toTransport(m,t,i,r,e,{useSourceUrl:e.context.config.useSourceUrl}),n),n.onBuildWrite&&(s=n.onBuildWrite(t,i,s))},h.write(d.prefix,d.name,g)))):prim().start(function(){
//Just want to insert a simple module definition instead
//of the source module. Useful for plugins that inline
//all their resources.
return hasProp(y,c)?hasProp(e.context.plugins,c)?'define({load: function(id){throw new Error("Dynamic load not allowed: " + id);}});':"define({});":require._cacheReadAsync(i)}).then(function(t){var r;u=t,!n.cjsTranslate||n.shim&&lang.hasProp(n.shim,c)||(u=commonJs.convert(i,u)),n.onBuildRead&&(u=n.onBuildRead(c,i,u)),f&&(r=p===parse.getNamedDefine(u)),m&&(u=pragma.namespace(u,m)),u=build.toTransport(m,c,i,u,e,{useSourceUrl:n.useSourceUrl}),f&&!r&&(u=addSemiColon(u,n)+"\n",u+=v+"define('"+p+"', ['"+c+"'], function (main) { return main; });\n"),n.onBuildWrite&&(u=n.onBuildWrite(c,i,u)),
//Semicolon is for files that are not well formed when
//concatenated with other content.
s+=addSemiColon(u,n)})}).then(function(){var u,h,g,m,y,b=i.replace(n.dir,"");
//Add to the source map
if(module.onCompleteData.included.push(b),o+=b+"\n",
//Some files may not have declared a require module, and if so,
//put in a placeholder call so the require does not try to load them
//after the module is processed.
//If we have a name, but no defined module, then add in the placeholder.
c&&falseProp(e.modulesWithNames,c)&&!n.skipModuleInsertion&&(l=n.shim&&(getOwn(n.shim,c)||f&&getOwn(n.shim,c)||getOwn(n.shim,p)),l?n.wrapShim?s="(function(root) {\n"+v+'define("'+c+'", '+(l.deps&&l.deps.length?build.makeJsArrayString(l.deps)+", ":"[], ")+"function() {\n      return (function() {\n"+s+(l.exportsFn?l.exportsFn():"")+"      }).apply(root, arguments);\n    });\n}(this));\n":s+="\n"+v+'define("'+c+'", '+(l.deps&&l.deps.length?build.makeJsArrayString(l.deps)+", ":"")+(l.exportsFn?l.exportsFn():"function(){}")+");\n":s+="\n"+v+'define("'+c+'", function(){});\n'),
//Add line break at end of file, instead of at beginning,
//so source map line numbers stay correct, but still allow
//for some space separation between files in case ASI issues
//for concatenation would cause an error otherwise.
s+="\n",r){u=n.out?n.baseUrl:module._buildPath,d=i.split("!"),1===d.length?
//Not a plugin resource, fix the path
m=build.makeRelativeFilePath(u,i):(
//Plugin resource. If it looks like just a plugin
//followed by a module ID, pull off the plugin
//and put it at the end of the name, otherwise
//just leave it alone.
h=d.shift(),g=d.join("!"),m=resourceIsModuleIdRegExp.test(g)?build.makeRelativeFilePath(u,require.toUrl(g))+"!"+h:i),y=t.split("\n").length-1,a=s.split("\n").length;for(var x=1;x<=a;x+=1)r.addMapping({generated:{line:y+x,column:0},original:{line:x,column:0},source:m});
//Store the content of the original in the source
//map since other transforms later like minification
//can mess up translating back to the original
//source.
r.setSourceContent(m,s)}
//Add the file to the final contents
t+=s})}})).then(function(){x.length&&x.forEach(function(e){var r;"string"==typeof module.out?r=module.out:"string"==typeof module._buildPath&&(r=module._buildPath),e.onLayerEnd(function(e){t+="\n"+addSemiColon(e,n)},{name:module.name,path:r})}),module.create&&(
//The ID is for a created layer. Write out
//a module definition for it in case the
//built file is used with enforceDefine
//(#432)
t+="\n"+v+'define("'+module.name+'", function(){});\n'),
//Add a require at the end to kick start module execution, if that
//was desired. Usually this is only specified when using small shim
//loaders like almond.
module.insertRequire&&(t+="\n"+v+'require(["'+module.insertRequire.join('", "')+'"]);\n')})}).then(function(){return{text:n.wrap?n.wrap.start+t+n.wrap.end:t,buildText:o,sourceMap:r?JSON.stringify(r.toJSON(),null,"  "):void 0}})},build.makeJsArrayString=function(e){return'["'+e.map(function(e){
//Escape any double quotes, backslashes
return lang.jsEscape(e)}).join('","')+'"]'},build.toTransport=function(e,n,t,r,i,o){function a(e){
//Only mark this module as having a name if not a named module,
//or if a named module and the name matches expectations.
i&&(e.needsId||e.foundId===n)&&(i.modulesWithNames[n]=!0)}var u=i&&i.context.config.baseUrl;
//Convert path to be a local one to the baseUrl, useful for
//useSourceUrl.
return u&&(t=t.replace(u,"")),transform.toTransport(e,n,t,r,a,o)},build})}/**
     * Sets the default baseUrl for requirejs to be directory of top level
     * script.
     */
function setBaseUrl(e){
//Use the file name's directory as the baseUrl if available.
dir=e.replace(/\\/g,"/"),dir.indexOf("/")!==-1&&(dir=dir.split("/"),dir.pop(),dir=dir.join("/"),
//Make sure dir is JS-escaped, since it will be part of a JS string.
exec("require({baseUrl: '"+dir.replace(/[\\"']/g,"\\$&")+"'});"))}function createRjsApi(){
//Create a method that will run the optimzer given an object
//config.
requirejs.optimize=function(e,n,t){loadedOptimizedLib||(loadLib(),loadedOptimizedLib=!0),requirejs({context:"build"},["build","logger","env!env/quit"],function(r,i,o){function a(e){
// Ensure errors get propagated to the errback
if(
//And clean up, in case something else triggers
//a build in another pathway.
requirejs._buildReset&&(requirejs._buildReset(),requirejs._cacheReset()),e instanceof Error)throw e;return e}
//Make sure config has a log level, and if not,
//make it "silent" by default.
e.logLevel=e.hasOwnProperty("logLevel")?e.logLevel:i.SILENT,
//Reset build internals first in case this is part
//of a long-running server process that could have
//exceptioned out in a bad state. It is only defined
//after the first call though.
requirejs._buildReset&&(requirejs._buildReset(),requirejs._cacheReset()),t=t||function(e){
// Using console here since logger may have
// turned off error logging. Since quit is
// called want to be sure a message is printed.
console.log(e),o(1)},r(e).then(a,a).then(n,t)})},requirejs.tools={useLib:function(e,n){n||(n=e,e="uselib"),useLibLoaded[e]||(loadLib(),useLibLoaded[e]=!0);var t=requirejs({context:e});t(["build"],function(){n(t)})}},requirejs.define=define}var fileName,env,fs,vm,path,exec,rhinoContext,dir,nodeRequire,nodeDefine,exists,reqMain,loadedOptimizedLib,existsForNode,Cc,Ci,version="2.1.11",jsSuffixRegExp=/\.js$/,commandOption="",useLibLoaded={},
//Used by jslib/rhino/args.js
rhinoArgs=args,
//Used by jslib/xpconnect/args.js
xpconnectArgs=args,readFile=void 0!==readFileFunc?readFileFunc:null;
//If in Node, and included via a require('requirejs'), just export and
//THROW IT ON THE GROUND!
"undefined"!=typeof navigator&&"undefined"!=typeof document||"undefined"!=typeof importScripts&&"undefined"!=typeof self?(env="browser",readFile=function(e){return fs.readFileSync(e,"utf8")},exec=function(string){return eval(string)},exists=function(){return console.log("x.js exists not applicable in browser env"),!1}):"undefined"!=typeof Packages?(env="rhino",fileName=args[0],fileName&&0===fileName.indexOf("-")&&(commandOption=fileName.substring(1),fileName=args[1]),
//Set up execution context.
rhinoContext=Packages.org.mozilla.javascript.ContextFactory.getGlobal().enterContext(),exec=function(e,n){return rhinoContext.evaluateString(this,e,n,0,null)},exists=function(e){return new java.io.File(e).exists()},
//Define a console.log for easier logging. Don't
//get fancy though.
void 0===console&&(console={log:function(){print.apply(void 0,arguments)}})):"undefined"!=typeof process&&process.versions&&process.versions.node?(env="node",
//Get the fs module via Node's require before it
//gets replaced. Used in require/node.js
fs=require("fs"),vm=require("vm"),path=require("path"),
//In Node 0.7+ existsSync is on fs.
existsForNode=fs.existsSync||path.existsSync,nodeRequire=require,nodeDefine=define,reqMain=require.main,
//Temporarily hide require and define to allow require.js to define
//them.
require=void 0,define=void 0,readFile=function(e){return fs.readFileSync(e,"utf8")},exec=function(e,n){return vm.runInThisContext(this.requirejsVars.require.makeNodeWrapper(e),n?fs.realpathSync(n):"")},exists=function(e){return existsForNode(e)},(fileName=process.argv[2])&&0===fileName.indexOf("-")&&(commandOption=fileName.substring(1),fileName=process.argv[3])):"undefined"!=typeof Components&&Components.classes&&Components.interfaces&&(env="xpconnect",Components.utils.import("resource://gre/modules/FileUtils.jsm"),Cc=Components.classes,Ci=Components.interfaces,fileName=args[0],fileName&&0===fileName.indexOf("-")&&(commandOption=fileName.substring(1),fileName=args[1]),xpcUtil={isWindows:"@mozilla.org/windows-registry-key;1"in Cc,cwd:function(){return FileUtils.getFile("CurWorkD",[]).path},
//Remove . and .. from paths, normalize on front slashes
normalize:function(e){
//There has to be an easier way to do this.
var n,t,r,i=e.charAt(0);for("/"!==i&&"\\"!==i&&e.indexOf(":")===-1&&(
//A relative path. Use the current working directory.
e=xpcUtil.cwd()+"/"+e),r=e.replace(/\\/g,"/").split("/"),n=0;n<r.length;n+=1)t=r[n],"."===t?(r.splice(n,1),n-=1):".."===t&&(r.splice(n-1,2),n-=2);return r.join("/")},xpfile:function(e){var n;try{return n=xpcUtil.normalize(e),xpcUtil.isWindows&&(n=n.replace(/\//g,"\\")),new FileUtils.File(n)}catch(t){throw new Error((n||e)+" failed: "+t)}},readFile:function(/*String*/e,/*String?*/n){
//A file read function that can deal with BOMs
n=n||"utf-8";var t,r,i={},o=xpcUtil.xpfile(e);
//XPCOM, you so crazy
try{return t=Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream),t.init(o,1,0,!1),r=Cc["@mozilla.org/intl/converter-input-stream;1"].createInstance(Ci.nsIConverterInputStream),r.init(t,n,t.available(),Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(t.available(),i),i.value}catch(e){throw new Error((o&&o.path||"")+": "+e)}finally{r&&r.close(),t&&t.close()}}},readFile=xpcUtil.readFile,exec=function(string){return eval(string)},exists=function(e){return xpcUtil.xpfile(e).exists()},
//Define a console.log for easier logging. Don't
//get fancy though.
void 0===console&&(console={log:function(){print.apply(void 0,arguments)}})),/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */
function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}/**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
function each(e,n){if(e){var t;for(t=0;t<e.length&&(!e[t]||!n(e[t],t,e));t+=1);}}/**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
function eachReverse(e,n){if(e){var t;for(t=e.length-1;t>-1&&(!e[t]||!n(e[t],t,e));t-=1);}}function hasProp(e,n){return hasOwn.call(e,n)}function getOwn(e,n){return hasProp(e,n)&&e[n]}/**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
function eachProp(e,n){var t;for(t in e)if(hasProp(e,t)&&n(e[t],t))break}/**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
function mixin(e,n,t,r){return n&&eachProp(n,function(n,i){!t&&hasProp(e,i)||(!r||"object"!=typeof n||!n||isArray(n)||isFunction(n)||n instanceof RegExp?e[i]=n:(e[i]||(e[i]={}),mixin(e[i],n,t,r)))}),e}
//Similar to Function.prototype.bind, but the 'this' object is specified
//first, since it is easier to read/figure out what 'this' will be.
function bind(e,n){return function(){return n.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}
//Allow getting a global that is expressed in
//dot notation, like 'a.b.c'.
function getGlobal(e){if(!e)return e;var n=global;return each(e.split("."),function(e){n=n[e]}),n}/**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
function makeError(e,n,t,r){var i=new Error(n+"\nhttp://requirejs.org/docs/errors.html#"+e);return i.requireType=e,i.requireModules=r,t&&(i.originalError=t),i}function newContext(e){/**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
function n(e){var n,t,r=e.length;for(n=0;n<r;n++)if("."===(t=e[n]))e.splice(n,1),n-=1;else if(".."===t){if(1===n&&(".."===e[2]||".."===e[0]))
//End of the line. Keep at least one non-dot
//path segment at the front so it can be mapped
//correctly to disk. Otherwise, there is likely
//no path mapping for a path starting with '..'.
//This can still fail, but catches the most reasonable
//uses of ..
break;n>0&&(e.splice(n-1,2),n-=2)}}/**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
function t(e,t,r){var i,o,a,u,s,c,l,f,p,d,h,g=t&&t.split("/"),m=g,v=E.map,y=v&&v["*"];
//Apply map config if available.
if(
//Adjust any relative paths.
e&&"."===e.charAt(0)&&(
//If have a base name, try to normalize against it,
//otherwise, assume it is a top-level require that will
//be relative to baseUrl in the end.
t?(
//Convert baseName to array, and lop off the last part,
//so that . matches that 'directory' and not name of the baseName's
//module. For instance, baseName of 'one/two/three', maps to
//'one/two/three.js', but we want the directory, 'one/two' for
//this normalization.
m=g.slice(0,g.length-1),e=e.split("/"),l=e.length-1,
// If wanting node ID compatibility, strip .js from end
// of IDs. Have to do this here, and not in nameToUrl
// because node allows either .js or non .js to map
// to same file.
E.nodeIdCompat&&jsSuffixRegExp.test(e[l])&&(e[l]=e[l].replace(jsSuffixRegExp,"")),e=m.concat(e),n(e),e=e.join("/")):0===e.indexOf("./")&&(
// No baseName, so this is ID is resolved relative
// to baseUrl, pull off the leading dot.
e=e.substring(2))),r&&v&&(g||y)){a=e.split("/");e:for(u=a.length;u>0;u-=1){if(c=a.slice(0,u).join("/"),g)
//Find the longest baseName segment match in the config.
//So, do joins on the biggest to smallest lengths of baseParts.
for(s=g.length;s>0;s-=1)
//baseName segment has config, find if it has one for
//this name.
if((o=getOwn(v,g.slice(0,s).join("/")))&&(o=getOwn(o,c))){
//Match, update name to the new value.
f=o,p=u;break e}
//Check for a star map match, but just hold on to it,
//if there is a shorter segment match later in a matching
//config, then favor over this star map.
!d&&y&&getOwn(y,c)&&(d=getOwn(y,c),h=u)}!f&&d&&(f=d,p=h),f&&(a.splice(0,p,f),e=a.join("/"))}
// If the name points to a package's name, use
// the package main instead.
return i=getOwn(E.pkgs,e),i?i:e}function r(e){isBrowser&&each(scripts(),function(n){if(n.getAttribute("data-requiremodule")===e&&n.getAttribute("data-requirecontext")===x.contextName)return n.parentNode.removeChild(n),!0})}function i(e){var n=getOwn(E.paths,e);if(n&&isArray(n)&&n.length>1)
//Pop off the first array value, since it failed, and
//retry
return n.shift(),x.require.undef(e),x.require([e]),!0}
//Turns a plugin!resource to [plugin, resource]
//with the plugin being undefined if the name
//did not have a plugin prefix.
function o(e){var n,t=e?e.indexOf("!"):-1;return t>-1&&(n=e.substring(0,t),e=e.substring(t+1,e.length)),[n,e]}/**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
function a(e,n,r,i){var a,u,s,c,l=null,f=n?n.name:null,p=e,d=!0,h="";
//If no name, then it means it is a require call, generate an
//internal name.
//Account for relative paths if there is a base name.
//Plugin is loaded, use its normalize method.
//A regular module.
//Normalized name may be a plugin ID due to map config
//application in normalize. The map config values must
//already be normalized, so do not need to redo that part.
//If the id is a plugin id that cannot be determined if it needs
//normalization, stamp it with a unique ID so two matching relative
//ids that may conflict can be separate.
return e||(d=!1,e="_@r"+(O+=1)),c=o(e),l=c[0],e=c[1],l&&(l=t(l,f,i),u=getOwn(k,l)),e&&(l?h=u&&u.normalize?u.normalize(e,function(e){return t(e,f,i)}):t(e,f,i):(h=t(e,f,i),c=o(h),l=c[0],h=c[1],r=!0,a=x.nameToUrl(h))),s=!l||u||r?"":"_unnormalized"+(q+=1),{prefix:l,name:h,parentMap:n,unnormalized:!!s,url:a,originalName:p,isDefine:d,id:(l?l+"!"+h:h)+s}}function u(e){var n=e.id,t=getOwn(A,n);return t||(t=A[n]=new x.Module(e)),t}function s(e,n,t){var r=e.id,i=getOwn(A,r);!hasProp(k,r)||i&&!i.defineEmitComplete?(i=u(e),i.error&&"error"===n?t(i.error):i.on(n,t)):"defined"===n&&t(k[r])}function c(e,n){var t=e.requireModules,r=!1;n?n(e):(each(t,function(n){var t=getOwn(A,n);t&&(
//Set error on module, so it skips timeout checks.
t.error=e,t.events.error&&(r=!0,t.emit("error",e)))}),r||req.onError(e))}/**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
function l(){
//Push all the globalDefQueue items into the context's defQueue
globalDefQueue.length&&(
//Array splice in the values since the context code has a
//local var ref to defQueue, so cannot just reassign the one
//on context.
apsp.apply(S,[S.length,0].concat(globalDefQueue)),globalDefQueue=[])}function f(e){
//Clean up machinery used for waiting modules.
delete A[e],delete C[e]}function p(e,n,t){var r=e.map.id;e.error?e.emit("error",e.error):(n[r]=!0,each(e.depMaps,function(r,i){var o=r.id,a=getOwn(A,o);
//Only force things that have not completed
//being defined, so still in the registry,
//and only if it has not been matched up
//in the module already.
!a||e.depMatched[i]||t[o]||(getOwn(n,o)?(e.defineDep(i,k[o]),e.check()):p(a,n,t))}),t[r]=!0)}function d(){var e,n,t=1e3*E.waitSeconds,
//It is possible to disable the wait interval by using waitSeconds of 0.
o=t&&x.startTime+t<(new Date).getTime(),a=[],u=[],s=!1,l=!0;
//Do not bother if this call was a result of a cycle break.
if(!y){if(y=!0,
//Figure out the state of all the modules.
eachProp(C,function(e){var t=e.map,c=t.id;
//Skip things that are not enabled or in error state.
if(e.enabled&&(t.isDefine||u.push(e),!e.error))
//If the module should be executed, and it has not
//been inited and time is up, remember it.
if(!e.inited&&o)i(c)?(n=!0,s=!0):(a.push(c),r(c));else if(!e.inited&&e.fetched&&t.isDefine&&(s=!0,!t.prefix))
//No reason to keep looking for unfinished
//loading. If the only stillLoading is a
//plugin resource though, keep going,
//because it may be that a plugin resource
//is waiting on a non-plugin cycle.
return l=!1}),o&&a.length)
//If wait time expired, throw error of unloaded modules.
return e=makeError("timeout","Load timeout for modules: "+a,null,a),e.contextName=x.contextName,c(e);
//Not expired, check for a cycle.
l&&each(u,function(e){p(e,{},{})}),
//If still waiting on loads, and the waiting load is something
//other than a plugin resource, or there are still outstanding
//scripts, then just try back later.
o&&!n||!s||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,d()},50)),y=!1}}function h(e){
//Skip modules already defined.
hasProp(k,e[0])||u(a(e[0],null,!0)).init(e[1],e[2])}function g(e,n,t,r){
//Favor detachEvent because of IE9
//issue, see attachEvent/addEventListener comment elsewhere
//in this file.
e.detachEvent&&!isOpera?
//Probably IE. If not it will throw an error, which will be
//useful to know.
r&&e.detachEvent(r,n):e.removeEventListener(t,n,!1)}/**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
function m(e){
//Using currentTarget instead of target for Firefox 2.0's sake. Not
//all old browsers will be supported, but this one was easy enough
//to support and still makes sense.
var n=e.currentTarget||e.srcElement;
//Remove the listeners once here.
return g(n,x.onScriptLoad,"load","onreadystatechange"),g(n,x.onScriptError,"error"),{node:n,id:n&&n.getAttribute("data-requiremodule")}}function v(){var e;
//Make sure any remaining defQueue items get properly processed.
for(
//Any defined modules in the global queue, intake them now.
l();S.length;){if(e=S.shift(),null===e[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));
//args are id, deps, factory. Should be normalized by the
//define() function.
h(e)}}var y,b,x,_,w,E={
//Defaults. Do not set a default for map
//config to speed up normalize(), which
//will run faster if there is no default.
waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},A={},
//registry of just enabled modules, to speed
//cycle breaking code when lots of modules
//are registered, but not activated.
C={},F={},S=[],k={},D={},B={},O=1,q=1;return _={require:function(e){return e.require?e.require:e.require=x.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?k[e.map.id]=e.exports:e.exports=k[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(E.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},b=function(e){this.events=getOwn(F,e.id)||{},this.map=e,this.shim=getOwn(E.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,n,t,r){r=r||{},
//Do not do more inits if already done. Can happen if there
//are multiple define calls for the same module. That is not
//a normal, common case, but it is also not unexpected.
this.inited||(this.factory=n,t?
//Register for errors on this module.
this.on("error",t):this.events.error&&(
//If no errback already, but there are error listeners
//on this module, set up an errback to pass to the deps.
t=bind(this,function(e){this.emit("error",e)})),
//Do a copy of the dependency array, so that
//source inputs are not modified. For example
//"shim" deps are passed in here directly, and
//doing a direct modification of the depMaps array
//would affect that config.
this.depMaps=e&&e.slice(0),this.errback=t,
//Indicate this module has be initialized
this.inited=!0,this.ignore=r.ignore,
//Could have option to init this module in enabled mode,
//or could have been previously marked as enabled. However,
//the dependencies are not known until init is called. So
//if enabled previously, now trigger dependencies as enabled.
r.enabled||this.enabled?
//Enable this module and dependencies.
//Will call this.check()
this.enable():this.check())},defineDep:function(e,n){
//Because of cycles, defined callback for a given
//export can be called more than once.
this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=n)},fetch:function(){if(!this.fetched){this.fetched=!0,x.startTime=(new Date).getTime();var e=this.map;
//If the manager is for a plugin managed resource,
//ask the plugin to load it now.
if(!this.shim)
//Regular dependency.
return e.prefix?this.callPlugin():this.load();x.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;
//Regular dependency.
D[e]||(D[e]=!0,x.load(this.map.id,e))},/**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
check:function(){if(this.enabled&&!this.enabling){var e,n,t=this.map.id,r=this.depExports,exports=this.exports,i=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(
//The factory could trigger another require call
//that would result in checking this module to
//define itself again. If already in the process
//of doing that, skip this work.
this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(i)){
//If there is an error listener, favor passing
//to that instead of throwing an error. However,
//only do it for define()'d  modules. require
//errbacks should not be called for failures in
//their callbacks (#699). However if a global
//onError is set, use that.
if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{exports=x.execCb(t,i,r,exports)}catch(n){e=n}else exports=x.execCb(t,i,r,exports);if(
// Favor return value over exports. If node/cjs in play,
// then will not have a return value anyway. Favor
// module.exports assignment over exports object.
this.map.isDefine&&void 0===exports&&(n=this.module,n?exports=n.exports:this.usingExports&&(
//exports already set the defined value.
exports=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e)}else
//Just a literal value
exports=i;this.exports=exports,this.map.isDefine&&!this.ignore&&(k[t]=exports,req.onResourceLoad&&req.onResourceLoad(x,this.map,this.depMaps)),
//Clean up
f(t),this.defined=!0}
//Finished the define stage. Allow calling check again
//to allow define notifications below in the case of a
//cycle.
this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=this.map,n=e.id,
//Map already normalized the prefix.
r=a(e.prefix);
//Mark this as a dependency for this plugin, so it
//can be traced for cycles.
this.depMaps.push(r),s(r,"defined",bind(this,function(r){var i,o,l,p=getOwn(B,this.map.id),d=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,g=x.makeRequire(e.parentMap,{enableBuildCallback:!0});
//If current map is not normalized, wait for that
//normalized name to load instead of continuing.
//If current map is not normalized, wait for that
//normalized name to load instead of continuing.
//Normalize the ID if the plugin allows it.
//prefix and name should already be normalized, no need
//for applying map config again either.
//Mark this as a dependency for this plugin, so it
//can be traced for cycles.
//If a paths config, then just load that file instead to
//resolve the plugin, as it is built into that paths layer.
//Allow plugins to load other code without having to know the
//context or how to 'complete' the load.
//Use parentName here since the plugin's name is not reliable,
//could be some weird string with no path that actually wants to
//reference the parentName's path.
return this.map.unnormalized?(r.normalize&&(d=r.normalize(d,function(e){return t(e,h,!0)})||""),o=a(e.prefix+"!"+d,this.map.parentMap),s(o,"defined",bind(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),void((l=getOwn(A,o.id))&&(this.depMaps.push(o),this.events.error&&l.on("error",bind(this,function(e){this.emit("error",e)})),l.enable()))):p?(this.map.url=x.nameToUrl(p),void this.load()):(i=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),i.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[n],
//Remove temp unnormalized modules for this module,
//since they will never be resolved otherwise now.
eachProp(A,function(e){0===e.map.id.indexOf(n+"_unnormalized")&&f(e.map.id)}),c(e)}),i.fromText=bind(this,function(t,r){/*jslint evil: true */
var o=e.name,s=a(o),l=useInteractive;
//As of 2.1.0, support just passing the text, to reinforce
//fromText only being called once per resource. Still
//support old style of passing moduleName but discard
//that moduleName in favor of the internal ref.
r&&(t=r),
//Turn off interactive script matching for IE for any define
//calls in the text, then turn it back on at the end.
l&&(useInteractive=!1),
//Prime the system by creating a module instance for
//it.
u(s),
//Transfer any config to this other module.
hasProp(E.config,n)&&(E.config[o]=E.config[n]);try{req.exec(t)}catch(e){return c(makeError("fromtexteval","fromText eval for "+n+" failed: "+e,e,[n]))}l&&(useInteractive=!0),
//Mark this as a dependency for the plugin
//resource
this.depMaps.push(s),
//Support anonymous modules.
x.completeLoad(o),
//Bind the value of that module to the value for this
//resource ID.
g([o],i)}),void r.load(e.name,g,i,E))})),x.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){C[this.map.id]=this,this.enabled=!0,
//Set flag mentioning that the module is enabling,
//so that immediate calls to the defined callbacks
//for dependencies do not trigger inadvertent load
//with the depCount still being zero.
this.enabling=!0,
//Enable each dependency
each(this.depMaps,bind(this,function(e,n){var t,r,i;if("string"==typeof e){if(
//Dependency needs to be converted to a depMap
//and wired up to this module.
e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[n]=e,i=getOwn(_,e.id))return void(this.depExports[n]=i(this));this.depCount+=1,s(e,"defined",bind(this,function(e){this.defineDep(n,e),this.check()})),this.errback&&s(e,"error",bind(this,this.errback))}t=e.id,r=A[t],
//Skip special modules like 'require', 'exports', 'module'
//Also, don't call enable if it is already enabled,
//important in circular dependency cases.
hasProp(_,t)||!r||r.enabled||x.enable(e,this)})),
//Enable each plugin that is used in
//a dependency
eachProp(this.pluginMaps,bind(this,function(e){var n=getOwn(A,e.id);n&&!n.enabled&&x.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,n){var t=this.events[e];t||(t=this.events[e]=[]),t.push(n)},emit:function(e,n){each(this.events[e],function(e){e(n)}),"error"===e&&
//Now that the error handler was triggered, remove
//the listeners, since this broken Module instance
//can stay around for a while in the registry.
delete this.events[e]}},x={config:E,contextName:e,registry:A,defined:k,urlFetched:D,defQueue:S,Module:b,makeModuleMap:a,nextTick:req.nextTick,onError:c,/**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
configure:function(e){
//Make sure the baseUrl ends in a slash.
e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");
//Save off the paths since they require special processing,
//they are additive.
var n=E.shim,t={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,n){t[n]?(E[n]||(E[n]={}),mixin(E[n],e,!0,!0)):E[n]=e}),
//Reverse map the bundles
e.bundles&&eachProp(e.bundles,function(e,n){each(e,function(e){e!==n&&(B[e]=n)})}),
//Merge shim
e.shim&&(eachProp(e.shim,function(e,t){
//Normalize the structure
isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=x.makeShimExports(e)),n[t]=e}),E.shim=n),
//Adjust packages if necessary.
e.packages&&each(e.packages,function(e){var n,t;e="string"==typeof e?{name:e}:e,t=e.name,n=e.location,n&&(E.paths[t]=e.location),
//Save pointer to main module ID for pkg name.
//Remove leading dot in main, so main paths are normalized,
//and remove any trailing .js, since different package
//envs have different conventions: some use a module name,
//some use a file name.
E.pkgs[t]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),
//If there are any "waiting to execute" modules in the registry,
//update the maps for them, since their info, like URLs to load,
//may have changed.
eachProp(A,function(e,n){
//If module already has init called, since it is too
//late to modify them, and ignore unnormalized ones
//since they are transient.
e.inited||e.map.unnormalized||(e.map=a(n))}),
//If a deps array or a config callback is specified, then call
//require with those args. This is useful when require is defined as a
//config object before require.js is loaded.
(e.deps||e.callback)&&x.require(e.deps||[],e.callback)},makeShimExports:function(e){function n(){var n;return e.init&&(n=e.init.apply(global,arguments)),n||e.exports&&getGlobal(e.exports)}return n},makeRequire:function(n,i){function o(t,r,s){var l,f,p;
//If require|exports|module are requested, get the
//value for them from the special handlers. Caveat:
//this only works while module is being defined.
//Synchronous access to one module. If require.get is
//available (as in the Node adapter), prefer that.
//Normalize module name, if it contains . or ..
//Grab defines waiting in the global queue.
//Mark all the dependencies as needing to be loaded.
return i.enableBuildCallback&&r&&isFunction(r)&&(r.__requireJsBuild=!0),"string"==typeof t?isFunction(r)?c(makeError("requireargs","Invalid require call"),s):n&&hasProp(_,t)?_[t](A[n.id]):req.get?req.get(x,t,n,o):(f=a(t,n,!1,!0),l=f.id,hasProp(k,l)?k[l]:c(makeError("notloaded",'Module name "'+l+'" has not been loaded yet for context: '+e+(n?"":". Use require([])")))):(v(),x.nextTick(function(){
//Some defines could have been added since the
//require call, collect them.
v(),p=u(a(null,n)),
//Store if map config should be applied to this require
//call for dependencies.
p.skipMap=i.skipMap,p.init(t,r,s,{enabled:!0}),d()}),o)}
//Only allow undef on top level require calls
return i=i||{},mixin(o,{isBrowser:isBrowser,/**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
toUrl:function(e){var r,i=e.lastIndexOf("."),o=e.split("/")[0],a="."===o||".."===o;
//Have a file extension alias, and it is not the
//dots from a relative path.
return i!==-1&&(!a||i>1)&&(r=e.substring(i,e.length),e=e.substring(0,i)),x.nameToUrl(t(e,n&&n.id,!0),r,!0)},defined:function(e){return hasProp(k,a(e,n,!1,!0).id)},specified:function(e){return e=a(e,n,!1,!0).id,hasProp(k,e)||hasProp(A,e)}}),n||(o.undef=function(e){
//Bind any waiting define() calls to this context,
//fix for #408
l();var t=a(e,n,!0),i=getOwn(A,e);r(e),delete k[e],delete D[t.url],delete F[e],
//Clean queued defines too. Go backwards
//in array so that the splices do not
//mess up the iteration.
eachReverse(S,function(n,t){n[0]===e&&S.splice(t,1)}),i&&(
//Hold on to listeners in case the
//module will be attempted to be reloaded
//using a different config.
i.events.defined&&(F[e]=i.events),f(e))}),o},/**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
enable:function(e){getOwn(A,e.id)&&u(e).enable()},/**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
completeLoad:function(e){var n,t,r,o=getOwn(E.shim,e)||{},a=o.exports;for(l();S.length;){if(t=S.shift(),null===t[0]){
//If already found an anonymous module and bound it
//to this name, then this is some other anon module
//waiting for its completeLoad to fire.
if(t[0]=e,n)break;n=!0}else t[0]===e&&(
//Found matching define call for this script!
n=!0);h(t)}if(
//Do this after the cycle of callGetModule in case the result
//of those calls/init calls changes the registry.
r=getOwn(A,e),!n&&!hasProp(k,e)&&r&&!r.inited){if(!(!E.enforceDefine||a&&getGlobal(a)))return i(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]));
//A script that does not call define(), so just simulate
//the call for it.
h([e,o.deps||[],o.exportsFn])}d()},/**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
nameToUrl:function(e,n,t){var r,i,o,a,u,s,c,l=getOwn(E.pkgs,e);if(l&&(e=l),c=getOwn(B,e))return x.nameToUrl(c,n,t);
//If a colon is in the URL, it indicates a protocol is used and it is just
//an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
//or ends with .js, then assume the user meant to use an url and not a module id.
//The slash is important for protocol-less URLs as well as full paths.
if(req.jsExtRegExp.test(e))
//Just a plain path, not module name lookup, so just return it.
//Add extension if it is included. This is a bit wonky, only non-.js things pass
//an extension, this method probably needs to be reworked.
u=e+(n||"");else{
//For each module name segment, see if there is a path
//registered for it. Start with most specific name
//and work up from it.
for(
//A module that needs to be converted to a path.
r=E.paths,i=e.split("/"),o=i.length;o>0;o-=1)if(a=i.slice(0,o).join("/"),s=getOwn(r,a)){
//If an array, it means there are a few choices,
//Choose the one that is desired
isArray(s)&&(s=s[0]),i.splice(0,o,s);break}
//Join the path parts together, then figure out if baseUrl is needed.
u=i.join("/"),u+=n||(/^data\:|\?/.test(u)||t?"":".js"),u=("/"===u.charAt(0)||u.match(/^[\w\+\.\-]+:/)?"":E.baseUrl)+u}return E.urlArgs?u+(u.indexOf("?")===-1?"?":"&")+E.urlArgs:u},
//Delegates to req.load. Broken out as a separate function to
//allow overriding in the optimizer.
load:function(e,n){req.load(x,e,n)},/**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
execCb:function(e,n,t,exports){return n.apply(exports,t)},/**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
onScriptLoad:function(e){
//Using currentTarget instead of target for Firefox 2.0's sake. Not
//all old browsers will be supported, but this one was easy enough
//to support and still makes sense.
if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){
//Reset interactive script so a script node is not held onto for
//to long.
interactiveScript=null;
//Pull out the name of the module and the context.
var n=m(e);x.completeLoad(n.id)}},/**
             * Callback for script errors.
             */
onScriptError:function(e){var n=m(e);if(!i(n.id))return c(makeError("scripterror","Script error for: "+n.id,e,[n.id]))}},x.require=x.makeRequire(),x}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.11",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,
//PS3 indicates loaded and complete, but need to wait for complete
//specifically. Sequence is 'loading', 'loaded', execution,
// then 'complete'. The UA check is unfortunate, but not sure how
//to feature test w/o causing perf issues.
readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",
//Oh the tragedy, detecting opera. See the usage of isOpera for reason.
isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(void 0!==requirejs){if(isFunction(requirejs))
//Do not overwrite and existing requirejs instance.
return;cfg=requirejs,requirejs=void 0}
//Allow for a require config object
void 0===require||isFunction(require)||(
//assume it is a config object.
cfg=require,require=void 0),/**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
req=requirejs=function(e,n,t,r){
//Find the right context, use default
var i,o,a="_";
// Determine if have config object in the call.
// deps is a config object
// Adjust args if there are dependencies
return isArray(e)||"string"==typeof e||(o=e,isArray(n)?(e=n,n=t,t=r):e=[]),o&&o.context&&(a=o.context),i=getOwn(contexts,a),i||(i=contexts[a]=req.s.newContext(a)),o&&i.configure(o),i.require(e,n,t)},/**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
req.config=function(e){return req(e)},/**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},/**
     * Export require as a global, but only if it does not already exist.
     */
require||(require=req),req.version="2.1.11",
//Used to filter out dependencies that are already paths.
req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},
//Create default context.
req({}),
//Exports some context-sensitive methods on global require.
each(["toUrl","undef","defined","specified"],function(e){
//Reference from contexts instead of early binding to default context,
//so that during builds, the latest instance of the default context
//with its config gets used.
req[e]=function(){var n=contexts._;return n.require[e].apply(n,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],(
//If BASE tag is in play, using appendChild is a problem for IE6.
//When that browser dies, this can be removed. Details in this jQuery bug:
//http://dev.jquery.com/ticket/2709
baseElement=document.getElementsByTagName("base")[0])&&(head=s.head=baseElement.parentNode)),/**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
req.onError=defaultOnError,/**
     * Creates the node for the load command. Only used in browser envs.
     */
req.createNode=function(e,n,t){var r=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return r.type=e.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r},/**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
req.load=function(e,n,t){var r,i=e&&e.config||{};if(isBrowser)
//In the browser so use a script tag
//Set up load listener. Test attachEvent first because IE9 has
//a subtle issue in its addEventListener and script onload firings
//that do not match the behavior of all other browsers with
//addEventListener support, which fire the onload event for a
//script right after the script execution. See:
//https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
//UNFORTUNATELY Opera implements attachEvent but does not follow the script
//script execution mode.
//Probably IE. IE (at least 6-8) do not fire
//script onload right after executing the script, so
//we cannot tie the anonymous define call to a name.
//However, IE reports the script as being in 'interactive'
//readyState at the time of the define call.
//For some cache cases in IE 6-8, the script executes before the end
//of the appendChild execution, so to tie an anonymous define
//call to the module name (which is stored on the node), hold on
//to a reference to this node, but clear after the DOM insertion.
return r=req.createNode(i,n,t),r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",n),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=t,currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{
//In a web worker, use importScripts. This is not a very
//efficient use of importScripts, importScripts will block until
//its script is downloaded and evaluated. However, if web workers
//are in play, the expectation that a build has been done so that
//only one script needs to be loaded anyway. This may need to be
//reevaluated if other use cases become common.
importScripts(t),
//Account for anonymous modules
e.completeLoad(n)}catch(r){e.onError(makeError("importscripts","importScripts failed for "+n+" at "+t,r,[n]))}},
//Look for a data-main script attribute, which could also adjust the baseUrl.
isBrowser&&!cfg.skipDataMain&&
//Figure out baseUrl. Get it from the script tag with require.js in it.
eachReverse(scripts(),function(e){if(
//Set the 'head' where we can append children by
//using the script's parent.
head||(head=e.parentNode),
//Look for a data-main attribute to set main script for the page
//to load. If it is there, the path to data main becomes the
//baseUrl, if it is not already set.
dataMain=e.getAttribute("data-main"))
//Preserve dataMain in case it is a path (i.e. contains '?')
//Set final baseUrl if there is not already an explicit one.
//Pull off the directory of data-main for use as the
//baseUrl.
//Strip off any trailing .js since mainScript is now
//like a module name.
//If mainScript is still a path, fall back to dataMain
//Put the data-main script in the files to load.
return mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),/**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
define=function(e,n,t){var r,i;
//Allow for anonymous modules
"string"!=typeof e&&(
//Adjust args appropriately
t=n,n=e,e=null),
//This module may not have dependencies
isArray(n)||(t=n,n=null),
//If no name, and callback is a function, then figure out if it a
//CommonJS thing with dependencies.
!n&&isFunction(t)&&(n=[],
//Remove comments from the callback string,
//look for require calls, and pull them into the dependencies,
//but only if there are function args.
t.length&&(t.toString().replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,"").replace(/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,function(e,t){n.push(t)}),
//May be a CommonJS thing even without require calls, but still
//could use exports, and module. Avoid doing exports and module
//work though if it just needs require.
//REQUIRES the function to expect the CommonJS variables in the
//order listed below.
n=(1===t.length?["require"]:["require","exports","module"]).concat(n))),
//If in IE 6-8 and hit an anonymous define() call, do the interactive
//work.
useInteractive&&(r=currentlyAddingScript||getInteractiveScript())&&(e||(e=r.getAttribute("data-requiremodule")),i=contexts[r.getAttribute("data-requirecontext")]),
//Always save off evaluating the def call until the script onload handler.
//This allows multiple modules to be in a file without prematurely
//tracing dependencies, and allows for anonymous module support,
//where the module name is not known until the script onload event
//occurs. If no context, use the global queue, and get it processed
//in the onscript load callback.
(i?i.defQueue:globalDefQueue).push([e,n,t])},define.amd={jQuery:!0},/**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
req.exec=function(text){/*jslint evil: true */
return eval(text)},
//Set up with config info.
req(cfg)}}(this),this.requirejsVars={require:require,requirejs:require,define:define},"browser"===env?/**
 * @license RequireJS rhino Copyright (c) 2012-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//sloppy since eval enclosed with use strict causes problems if the source
//text is not strict-compliant.
/*jslint sloppy: true, evil: true */
/*global require, XMLHttpRequest */
function(){require.load=function(context,moduleName,url){var xhr=new XMLHttpRequest;xhr.open("GET",url,!0),xhr.send(),xhr.onreadystatechange=function(){4===xhr.readyState&&(eval(xhr.responseText),
//Support anonymous modules.
context.completeLoad(moduleName))}}}():"rhino"===env?/**
 * @license RequireJS rhino Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint */
/*global require: false, java: false, load: false */
function(){"use strict";require.load=function(e,n,t){load(t),
//Support anonymous modules.
e.completeLoad(n)}}():"node"===env?(this.requirejsVars.nodeRequire=nodeRequire,require.nodeRequire=nodeRequire,/**
 * @license RequireJS node Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint regexp: false */
/*global require: false, define: false, requirejsVars: false, process: false */
/**
 * This adapter assumes that x.js has loaded it and set up
 * some variables. This adapter just allows limited RequireJS
 * usage from within the requirejs directory. The general
 * node adapater is r.js.
 */
function(){"use strict";function hasProp(e,n){return hasOwn.call(e,n)}function syncTick(e){e()}function makeError(e,n){var t=new Error(e);return t.requireModules=[n],t}var nodeReq=requirejsVars.nodeRequire,req=requirejsVars.require,def=requirejsVars.define,fs=nodeReq("fs"),path=nodeReq("path"),vm=nodeReq("vm"),
//In Node 0.7+ existsSync is on fs.
exists=fs.existsSync||path.existsSync,hasOwn=Object.prototype.hasOwnProperty;
//Supply an implementation that allows synchronous get of a module.
req.get=function(e,n,t,r){"require"!==n&&"exports"!==n&&"module"!==n||e.onError(makeError("Explicit require of "+n+" is not allowed.",n));var i,o,a=e.makeModuleMap(n,t,!1,!0);if(
//Normalize module name, if it contains . or ..
n=a.id,hasProp(e.defined,n))i=e.defined[n];else if(void 0===i){
//Make sure nextTick for this type of call is sync-based.
o=e.nextTick,e.nextTick=syncTick;try{a.prefix?(
//A plugin, call requirejs to handle it. Now that
//nextTick is syncTick, the require will complete
//synchronously.
r([a.originalName]),
//Now that plugin is loaded, can regenerate the moduleMap
//to get the final, normalized ID.
a=e.makeModuleMap(a.originalName,t,!1,!0),n=a.id):(
//Try to dynamically fetch it.
req.load(e,n,a.url),
//Enable the module
e.enable(a,t)),
//Break any cycles by requiring it normally, but this will
//finish synchronously
require([n]),
//The above calls are sync, so can do the next thing safely.
i=e.defined[n]}finally{e.nextTick=o}}return i},req.nextTick=function(e){process.nextTick(e)},
//Add wrapper around the code so that it gets the requirejs
//API instead of the Node API, and it is done lexically so
//that it survives later execution.
req.makeNodeWrapper=function(e){return"(function (require, requirejs, define) { "+e+"\n}(requirejsVars.require, requirejsVars.requirejs, requirejsVars.define));"},req.load=function(e,n,t){var r,i,o=e.config;if(!o.shim[n]||o.suppress&&o.suppress.nodeShim||console.warn("Shim config not supported in Node, may or may not work. Detected for module: "+n),exists(t)){r=fs.readFileSync(t,"utf8"),r=req.makeNodeWrapper(r);try{vm.runInThisContext(r,fs.realpathSync(t))}catch(r){return i=new Error("Evaluating "+t+' as module "'+n+'" failed with error: '+r),i.originalError=r,i.moduleName=n,i.requireModules=[n],i.fileName=t,e.onError(i)}}else def(n,function(){
//Get the original name, since relative requires may be
//resolved differently in node (issue #202). Also, if relative,
//make it relative to the URL of the item requesting it
//(issue #393)
var r,o=hasProp(e.registry,n)&&e.registry[n].map,a=o&&o.parentMap,u=o&&o.originalName;"."===u.charAt(0)&&a&&(r=a.url.split("/"),r.pop(),u=r.join("/")+"/"+u);try{return(e.config.nodeRequire||req.nodeRequire)(u)}catch(e){throw i=new Error('Tried loading "'+n+'" at '+t+" then tried node's require(\""+u+'") and it failed with error: '+e),i.originalError=e,i.moduleName=u,i.requireModules=[n],i}});
//Support anonymous modules.
e.completeLoad(n)},
//Override to provide the function wrapper for define/require.
req.exec=function(text){/*jslint evil: true */
return text=req.makeNodeWrapper(text),eval(text)}}()):"xpconnect"===env&&/**
 * @license RequireJS xpconnect Copyright (c) 2013-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint */
/*global require, load */
function(){"use strict";require.load=function(e,n,t){load(t),
//Support anonymous modules.
e.completeLoad(n)}}(),
//Support a default file name to execute. Useful for hosted envs
//like Joyent where it defaults to a server.js as the only executed
//script. But only do it if this is not an optimization run.
"o"===commandOption||fileName&&jsSuffixRegExp.test(fileName)||(fileName="main.js"),"node"===env&&reqMain!==module?(setBaseUrl(path.resolve(reqMain?reqMain.filename:".")),createRjsApi(),void(module.exports=requirejs)):"browser"===env?(
//Only option is to use the API.
setBaseUrl(location.href),void createRjsApi()):"rhino"!==env&&"xpconnect"!==env||
//User sets up requirejsAsLib variable to indicate it is loaded
//via load() to be used as a library.
"undefined"==typeof requirejsAsLib||!requirejsAsLib?void("o"===commandOption?(
//Do the optimizer work.
loadLib(),/**
 * @license Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*
 * Create a build.js file that has the build options you want and pass that
 * build file to this file to do the build. See example.build.js for more information.
 */
/*jslint strict: false, nomen: false */
/*global require: false */
require({baseUrl:require.s.contexts._.config.baseUrl,
//Use a separate context than the default context so that the
//build can use the default context.
context:"build",catchError:{define:!0}},["env!env/args","env!env/quit","logger","build"],function(e,n,t,r){r(e).then(function(){},function(e){t.error(e),n(1)})})):"v"===commandOption?console.log("r.js: 2.1.11, RequireJS: "+this.requirejsVars.require.version+", UglifyJS2: 2.4.12, UglifyJS: 1.3.4"):"convert"===commandOption?(loadLib(),this.requirejsVars.require(["env!env/args","commonJs","env!env/print"],function(e,n,t){var r,i;if(r=e[0],i=e[1],!r||!i)return void t("Usage: path/to/commonjs/modules output/dir");n.convertDir(e[0],e[1])})):(
//Just run an app
//Load the bundled libraries for use in the app.
"lib"===commandOption&&loadLib(),setBaseUrl(fileName),exists(fileName)?exec(readFile(fileName),fileName):showHelp())):(
//This script is loaded via rhino's load() method, expose the
//API and get out.
setBaseUrl(fileName),void createRjsApi())}("undefined"!=typeof console?console:void 0,"undefined"!=typeof Packages||"undefined"==typeof window&&"undefined"!=typeof Components&&Components.interfaces?Array.prototype.slice.call(arguments,0):[],"undefined"!=typeof readFile?readFile:void 0);