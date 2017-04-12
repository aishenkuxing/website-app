define(function(){function t(t,i,e){if(t.match(a)||t.match(n))return t;t=u(t);
// if toBase specifies a protocol path, ensure this is the same protocol as fromBase, if not
// use absolute path at fromBase
var o=e.match(n),c=i.match(n);return!c||o&&o[1]==c[1]&&o[2]==c[2]?s(r(t,i),e):r(t,i)}
// given a relative URI, calculate the absolute URI
function r(t,r){
// absolute urls are left in tact
if("./"==t.substr(0,2)&&(t=t.substr(2)),t.match(a)||t.match(n))return t;var s=r.split("/"),u=t.split("/");for(s.pop();curPart=u.shift();)".."==curPart?s.pop():s.push(curPart);return s.join("/")}
// given an absolute URI, calculate the relative URI
function s(t,r){
// reduce base and uri strings to just their difference string
var s=r.split("/");for(s.pop(),r=s.join("/")+"/",i=0;r.substr(i,1)==t.substr(i,1);)i++;for(;"/"!=r.substr(i,1);)i--;r=r.substr(i+1),t=t.substr(i+1),
// each base folder difference is thus a backtrack
s=r.split("/");var u=t.split("/");for(out="";s.shift();)out+="../";
// finally add uri parts
for(;curPart=u.shift();)out+=curPart+"/";return out.substr(0,out.length-1)}
// regular expression for removing double slashes
// eg http://www.example.com//my///url/here -> http://www.example.com/my/url/here
var u=function(t){return t.replace(/([^:])\/+/g,"$1/")},n=/[^\:\/]*:\/\/([^\/])*/,a=/^(\/|data:)/,e=function(r,s,n){s=u(s),n=u(n);for(var i,a,r,e=/@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi;i=e.exec(r);){a=i[3]||i[2]||i[5]||i[6]||i[4];var o;o=t(a,s,n);var c=i[5]||i[6]?1:0;r=r.substr(0,e.lastIndex-a.length-c-1)+o+r.substr(e.lastIndex-c-1),e.lastIndex=e.lastIndex+(o.length-a.length)}return r};return e.convertURIBase=t,e.absoluteURI=r,e.relativeURI=s,e});