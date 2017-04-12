/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
/* bits per input character. 8 - ASCII; 16 - Unicode      */
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(d){return binl2hex(core_md5(str2binl(d),d.length*chrsz))}function b64_md5(d){return binl2b64(core_md5(str2binl(d),d.length*chrsz))}function str_md5(d){return binl2str(core_md5(str2binl(d),d.length*chrsz))}function hex_hmac_md5(d,r){return binl2hex(core_hmac_md5(d,r))}function b64_hmac_md5(d,r){return binl2b64(core_hmac_md5(d,r))}function str_hmac_md5(d,r){return binl2str(core_hmac_md5(d,r))}/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc")}/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(d,r){/* append padding */
d[r>>5]|=128<<r%32,d[14+(r+64>>>9<<4)]=r;for(var _=1732584193,m=-271733879,n=-1732584194,h=271733878,f=0;f<d.length;f+=16){var t=_,i=m,c=n,e=h;_=md5_ff(_,m,n,h,d[f+0],7,-680876936),h=md5_ff(h,_,m,n,d[f+1],12,-389564586),n=md5_ff(n,h,_,m,d[f+2],17,606105819),m=md5_ff(m,n,h,_,d[f+3],22,-1044525330),_=md5_ff(_,m,n,h,d[f+4],7,-176418897),h=md5_ff(h,_,m,n,d[f+5],12,1200080426),n=md5_ff(n,h,_,m,d[f+6],17,-1473231341),m=md5_ff(m,n,h,_,d[f+7],22,-45705983),_=md5_ff(_,m,n,h,d[f+8],7,1770035416),h=md5_ff(h,_,m,n,d[f+9],12,-1958414417),n=md5_ff(n,h,_,m,d[f+10],17,-42063),m=md5_ff(m,n,h,_,d[f+11],22,-1990404162),_=md5_ff(_,m,n,h,d[f+12],7,1804603682),h=md5_ff(h,_,m,n,d[f+13],12,-40341101),n=md5_ff(n,h,_,m,d[f+14],17,-1502002290),m=md5_ff(m,n,h,_,d[f+15],22,1236535329),_=md5_gg(_,m,n,h,d[f+1],5,-165796510),h=md5_gg(h,_,m,n,d[f+6],9,-1069501632),n=md5_gg(n,h,_,m,d[f+11],14,643717713),m=md5_gg(m,n,h,_,d[f+0],20,-373897302),_=md5_gg(_,m,n,h,d[f+5],5,-701558691),h=md5_gg(h,_,m,n,d[f+10],9,38016083),n=md5_gg(n,h,_,m,d[f+15],14,-660478335),m=md5_gg(m,n,h,_,d[f+4],20,-405537848),_=md5_gg(_,m,n,h,d[f+9],5,568446438),h=md5_gg(h,_,m,n,d[f+14],9,-1019803690),n=md5_gg(n,h,_,m,d[f+3],14,-187363961),m=md5_gg(m,n,h,_,d[f+8],20,1163531501),_=md5_gg(_,m,n,h,d[f+13],5,-1444681467),h=md5_gg(h,_,m,n,d[f+2],9,-51403784),n=md5_gg(n,h,_,m,d[f+7],14,1735328473),m=md5_gg(m,n,h,_,d[f+12],20,-1926607734),_=md5_hh(_,m,n,h,d[f+5],4,-378558),h=md5_hh(h,_,m,n,d[f+8],11,-2022574463),n=md5_hh(n,h,_,m,d[f+11],16,1839030562),m=md5_hh(m,n,h,_,d[f+14],23,-35309556),_=md5_hh(_,m,n,h,d[f+1],4,-1530992060),h=md5_hh(h,_,m,n,d[f+4],11,1272893353),n=md5_hh(n,h,_,m,d[f+7],16,-155497632),m=md5_hh(m,n,h,_,d[f+10],23,-1094730640),_=md5_hh(_,m,n,h,d[f+13],4,681279174),h=md5_hh(h,_,m,n,d[f+0],11,-358537222),n=md5_hh(n,h,_,m,d[f+3],16,-722521979),m=md5_hh(m,n,h,_,d[f+6],23,76029189),_=md5_hh(_,m,n,h,d[f+9],4,-640364487),h=md5_hh(h,_,m,n,d[f+12],11,-421815835),n=md5_hh(n,h,_,m,d[f+15],16,530742520),m=md5_hh(m,n,h,_,d[f+2],23,-995338651),_=md5_ii(_,m,n,h,d[f+0],6,-198630844),h=md5_ii(h,_,m,n,d[f+7],10,1126891415),n=md5_ii(n,h,_,m,d[f+14],15,-1416354905),m=md5_ii(m,n,h,_,d[f+5],21,-57434055),_=md5_ii(_,m,n,h,d[f+12],6,1700485571),h=md5_ii(h,_,m,n,d[f+3],10,-1894986606),n=md5_ii(n,h,_,m,d[f+10],15,-1051523),m=md5_ii(m,n,h,_,d[f+1],21,-2054922799),_=md5_ii(_,m,n,h,d[f+8],6,1873313359),h=md5_ii(h,_,m,n,d[f+15],10,-30611744),n=md5_ii(n,h,_,m,d[f+6],15,-1560198380),m=md5_ii(m,n,h,_,d[f+13],21,1309151649),_=md5_ii(_,m,n,h,d[f+4],6,-145523070),h=md5_ii(h,_,m,n,d[f+11],10,-1120210379),n=md5_ii(n,h,_,m,d[f+2],15,718787259),m=md5_ii(m,n,h,_,d[f+9],21,-343485551),_=safe_add(_,t),m=safe_add(m,i),n=safe_add(n,c),h=safe_add(h,e)}return Array(_,m,n,h)}/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(d,r,_,m,n,h){return safe_add(bit_rol(safe_add(safe_add(r,d),safe_add(m,h)),n),_)}function md5_ff(d,r,_,m,n,h,f){return md5_cmn(r&_|~r&m,d,r,n,h,f)}function md5_gg(d,r,_,m,n,h,f){return md5_cmn(r&m|_&~m,d,r,n,h,f)}function md5_hh(d,r,_,m,n,h,f){return md5_cmn(r^_^m,d,r,n,h,f)}function md5_ii(d,r,_,m,n,h,f){return md5_cmn(_^(r|~m),d,r,n,h,f)}/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(d,r){var _=str2binl(d);_.length>16&&(_=core_md5(_,d.length*chrsz));for(var m=Array(16),n=Array(16),h=0;h<16;h++)m[h]=909522486^_[h],n[h]=1549556828^_[h];var f=core_md5(m.concat(str2binl(r)),512+r.length*chrsz);return core_md5(n.concat(f),640)}/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(d,r){var _=(65535&d)+(65535&r);return(d>>16)+(r>>16)+(_>>16)<<16|65535&_}/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(d,r){return d<<r|d>>>32-r}/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(d){for(var r=Array(),_=(1<<chrsz)-1,m=0;m<d.length*chrsz;m+=chrsz)r[m>>5]|=(d.charCodeAt(m/chrsz)&_)<<m%32;return r}/*
 * Convert an array of little-endian words to a string
 */
function binl2str(d){for(var r="",_=(1<<chrsz)-1,m=0;m<32*d.length;m+=chrsz)r+=String.fromCharCode(d[m>>5]>>>m%32&_);return r}/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(d){for(var r=hexcase?"0123456789ABCDEF":"0123456789abcdef",_="",m=0;m<4*d.length;m++)_+=r.charAt(d[m>>2]>>m%4*8+4&15)+r.charAt(d[m>>2]>>m%4*8&15);return _}/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(d){for(var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_="",m=0;m<4*d.length;m+=3)for(var n=(d[m>>2]>>m%4*8&255)<<16|(d[m+1>>2]>>(m+1)%4*8&255)<<8|d[m+2>>2]>>(m+2)%4*8&255,h=0;h<4;h++)_+=8*m+6*h>32*d.length?b64pad:r.charAt(n>>6*(3-h)&63);return _}var hexcase=0,b64pad="",chrsz=8;