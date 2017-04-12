/*   
 *   A   JavaScript   implementation   of   the   Secure   Hash   Algorithm,   SHA-1,   as   defined   
 *   in   FIPS   PUB   180-1   
 *   Version   2.1-BETA   Copyright   Paul   Johnston   2000   -   2002.   
 *   Other   contributors:   Greg   Holt,   Andrew   Kepert,   Ydnar,   Lostinet   
 *   Distributed   under   the   BSD   License   
 *   See   http://pajhome.org.uk/crypt/md5   for   details.   
 */
/*   
 *   Configurable   variables.   You   may   need   to   tweak   these   to   be   compatible   with   
 *   the   server-side,   but   the   defaults   work   in   most   cases.   
 */
/*   bits   per   input   character.   8   -   ASCII;   16   -   Unicode             */
/*   
 *   These   are   the   functions   you'll   usually   want   to   call   
 *   They   take   string   arguments   and   return   either   hex   or   base-64   encoded   strings   
 */
function hex_sha1(r){return binb2hex(core_sha1(str2binb(r),r.length*chrsz))}function b64_sha1(r){return binb2b64(core_sha1(str2binb(r),r.length*chrsz))}function str_sha1(r){return binb2str(core_sha1(str2binb(r),r.length*chrsz))}function hex_hmac_sha1(r,a){return binb2hex(core_hmac_sha1(r,a))}function b64_hmac_sha1(r,a){return binb2b64(core_hmac_sha1(r,a))}function str_hmac_sha1(r,a){return binb2str(core_hmac_sha1(r,a))}/*   
 *   Perform   a   simple   self-test   to   see   if   the   VM   is   working   
 */
function sha1_vm_test(){return"a9993e364706816aba3e25717850c26c9cd0d89d"==hex_sha1("abc")}/*   
 *   Calculate   the   SHA-1   of   an   array   of   big-endian   words,   and   a   bit   length   
 */
function core_sha1(r,a){/*   append   padding   */
r[a>>5]|=128<<24-a%32,r[15+(a+64>>9<<4)]=a;for(var n=Array(80),t=1732584193,h=-271733879,e=-1732584194,c=271733878,s=-1009589776,o=0;o<r.length;o+=16){for(var b=t,_=h,f=e,u=c,i=s,d=0;d<80;d++){n[d]=d<16?r[o+d]:rol(n[d-3]^n[d-8]^n[d-14]^n[d-16],1);var l=safe_add(safe_add(rol(t,5),sha1_ft(d,h,e,c)),safe_add(safe_add(s,n[d]),sha1_kt(d)));s=c,c=e,e=rol(h,30),h=t,t=l}t=safe_add(t,b),h=safe_add(h,_),e=safe_add(e,f),c=safe_add(c,u),s=safe_add(s,i)}return Array(t,h,e,c,s)}/*   
 *   Perform   the   appropriate   triplet   combination   function   for   the   current   
 *   iteration   
 */
function sha1_ft(r,a,n,t){return r<20?a&n|~a&t:r<40?a^n^t:r<60?a&n|a&t|n&t:a^n^t}/*   
 *   Determine   the   appropriate   additive   constant   for   the   current   iteration   
 */
function sha1_kt(r){return r<20?1518500249:r<40?1859775393:r<60?-1894007588:-899497514}/*   
 *   Calculate   the   HMAC-SHA1   of   a   key   and   some   data   
 */
function core_hmac_sha1(r,a){var n=str2binb(r);n.length>16&&(n=core_sha1(n,r.length*chrsz));for(var t=Array(16),h=Array(16),e=0;e<16;e++)t[e]=909522486^n[e],h[e]=1549556828^n[e];var c=core_sha1(t.concat(str2binb(a)),512+a.length*chrsz);return core_sha1(h.concat(c),672)}/*   
 *   Add   integers,   wrapping   at   2^32.   This   uses   16-bit   operations   internally   
 *   to   work   around   bugs   in   some   JS   interpreters.   
 */
function safe_add(r,a){var n=(65535&r)+(65535&a);return(r>>16)+(a>>16)+(n>>16)<<16|65535&n}/*   
 *   Bitwise   rotate   a   32-bit   number   to   the   left.   
 */
function rol(r,a){return r<<a|r>>>32-a}/*   
 *   Convert   an   8-bit   or   16-bit   string   to   an   array   of   big-endian   words   
 *   In   8-bit   function,   characters   >255   have   their   hi-byte   silently   ignored.   
 */
function str2binb(r){for(var a=Array(),n=(1<<chrsz)-1,t=0;t<r.length*chrsz;t+=chrsz)a[t>>5]|=(r.charCodeAt(t/chrsz)&n)<<24-t%32;return a}/*   
 *   Convert   an   array   of   big-endian   words   to   a   string   
 */
function binb2str(r){for(var a="",n=(1<<chrsz)-1,t=0;t<32*r.length;t+=chrsz)a+=String.fromCharCode(r[t>>5]>>>24-t%32&n);return a}/*   
 *   Convert   an   array   of   big-endian   words   to   a   hex   string.   
 */
function binb2hex(r){for(var a=hexcase?"0123456789ABCDEF":"0123456789abcdef",n="",t=0;t<4*r.length;t++)n+=a.charAt(r[t>>2]>>8*(3-t%4)+4&15)+a.charAt(r[t>>2]>>8*(3-t%4)&15);return n}/*   
 *   Convert   an   array   of   big-endian   words   to   a   base-64   string   
 */
function binb2b64(r){for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n="",t=0;t<4*r.length;t+=3)for(var h=(r[t>>2]>>8*(3-t%4)&255)<<16|(r[t+1>>2]>>8*(3-(t+1)%4)&255)<<8|r[t+2>>2]>>8*(3-(t+2)%4)&255,e=0;e<4;e++)n+=8*t+6*e>32*r.length?b64pad:a.charAt(h>>6*(3-e)&63);return n}var hexcase=0,b64pad="",chrsz=8;