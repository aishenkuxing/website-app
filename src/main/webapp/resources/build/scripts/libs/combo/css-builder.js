define(["require","./normalize"],function(e,r){function s(e){if("none"==c.optimizeCss)return e;if("undefined"!=typeof process&&process.versions&&process.versions.node&&require.nodeRequire){try{var r=require.nodeRequire("csso")}catch(r){return console.log('Compression module not installed. Use "npm install csso -g" to enable.'),e}var s=e.length;try{e=r.justDoIt(e)}catch(r){return console.log("Compression failed due to a CSS syntax error."),e}return console.log("Compressed CSS output to "+Math.round(e.length/s*100)+"%."),e}return console.log("Compression not supported outside of nodejs environments."),e}
//load file code - stolen from text plugin
function t(e){if("undefined"!=typeof process&&process.versions&&process.versions.node&&require.nodeRequire){var r=require.nodeRequire("fs"),s=r.readFileSync(e,"utf8");return 0===s.indexOf("\ufeff")?s.substring(1):s}var t,n,s=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),"utf-8"));try{for(t=new java.lang.StringBuffer,n=a.readLine(),n&&n.length()&&65279===n.charAt(0)&&(n=n.substring(1)),t.append(n);null!==(n=a.readLine());)t.append(i).append(n);return String(t.toString())}finally{a.close()}}function n(e,r){if("undefined"!=typeof process&&process.versions&&process.versions.node&&require.nodeRequire){require.nodeRequire("fs").writeFileSync(e,r,"utf8")}else{var s=new java.lang.String(r),t=new java.io.BufferedWriter(new java.io.OutputStreamWriter(new java.io.FileOutputStream(e),"utf-8"));try{t.write(s,0,s.length()),t.flush()}finally{t.close()}}}
//when adding to the link buffer, paths are normalised to the baseUrl
//when removing from the link buffer, paths are normalised to the output file path
function i(e){return e.replace(/(["'\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")}var a,o={},l=!!process.platform.match(/^win/),u=e.toUrl("base_url").split("/");u[u.length-1]="";var c,d=u.join("/"),f=!0,p=[],g={};return o.load=function(e,s,n,i){
//external URLS don't get added (just like JS requires)
if(
//store config
c=c||i,a||(a=path.resolve(c.dir||path.dirname(c.out),c.siteRoot||".")+"/",l&&(a=a.replace(/\\/g,"/"))),e.match(/^([^\:\/]+:\/)?\//))return n();var o=s.toUrl(e+".css");l&&(o=o.replace(/\\/g,"/"));
// rebase to the output directory if based on the source directory;
// baseUrl points always to the output directory, fileUrl only if
// it is not prefixed by a computed path (relative too)
var u=o;if(u.indexOf(d)<0){var f=s.toUrl(c.appDir);l&&(f=f.replace(/\\/g,"/")),0==u.indexOf(f)&&(u=a+u.substring(f.length))}
//add to the buffer
g[e]=r(t(o),u,a),n()},o.normalize=function(e,r){return".css"==e.substr(e.length-4,4)&&(e=e.substr(0,e.length-4)),r(e)},o.write=function(e,r,t,n){var a;
//external URLS don't get added (just like JS requires)
if(!r.match(/^([^\:\/]+:\/)?\//)&&(p.push(g[r]),global._requirejsCssData?global._requirejsCssData.usedBy.css=!0:global._requirejsCssData={usedBy:{css:!0},css:""},0!=c.buildCSS)){var o=g[r];c.writeCSSModule&&o?(f&&(f=!1,t("define('@writecss', function() {return function writeCss(c) {var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));};});")),a='define(["@writecss"], function(writeCss){\n writeCss("'+i(s(o))+'");\n})'):a="define(function(){})",t.asModule(e+"!"+r,a)}},o.onLayerEnd=function(e,r){if(c.separateCSS&&c.IESelectorLimit)throw"RequireCSS: separateCSS option is not compatible with ensuring the IE selector limit";if(c.separateCSS){var t=r.path.replace(/(\.js)?$/,".css");console.log("Writing CSS! file: "+t+"\n");var a=p.join("");process.nextTick(function(){global._requirejsCssData&&(a=global._requirejsCssData.css=a+global._requirejsCssData.css,delete global._requirejsCssData.usedBy.css,0===Object.keys(global._requirejsCssData.usedBy).length&&delete global._requirejsCssData),n(t,s(a))})}else if(0!=c.buildCSS&&1!=c.writeCSSModule)for(var o=c.IESelectorLimit?p:[p.join("")],l=0;l<o.length;l++){if(""==o[l])return;e("(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})\n('"+i(s(o[l]))+"');\n")}
//clear layer buffer for next layer
p=[],f=!0},o});