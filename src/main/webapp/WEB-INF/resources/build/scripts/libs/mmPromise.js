define(["avalon"],function(n){
//chrome36的原生Promise还多了一个defer()静态方法，允许不通过传参就能生成Promise实例，
//另还多了一个chain(onSuccess, onFail)原型方法，意义不明
//目前，firefox24, opera19也支持原生Promise(chrome32就支持了，但需要打开开关，自36起直接可用)
//本模块提供的Promise完整实现ECMA262v6 的Promise规范
//2015.3.12 支持async属性
function t(n){return n}function e(n){throw n}function i(n){//添加成功回调
return this.then(n,e)}function o(n){//添加出错回调
return this.then(t,n)}function r(){var n={};return n.promise=new this(function(t,e){n.resolve=t,n.reject=e}),n}function f(n,t){if("boolean"==typeof n.async)var e=n.async;else e=n.async=!0;e?window.setTimeout(t,0):t()}function c(n,t){//触发成功回调
if("pending"===n._state)if(t&&"function"==typeof t.then){
//thenable对象使用then，Promise实例使用_then
var e=t instanceof h?"_then":"then";t[e](function(t){a(n,t,!0)},function(t){a(n,t,!1)})}else a(n,t,!0)}function u(n,t){//触发失败回调
"pending"===n._state&&a(n,t,!1)}
//改变Promise的_fired值，并保持用户传参，触发所有回调
function a(n,t,e){n._fired=!0,n._value=t,n._state=e?"fulfilled":"rejected",f(n,function(){n._callbacks.forEach(function(t){n._fire(t.onSuccess,t.onFail)})})}function s(n,t){t=Array.isArray(t)?t:[];var e,i=0,o=[];return new h(function(r,f){
// 空数组直接resolve
t.length||r();for(var c=0,u=t.length;c<u;c++)!function(c,u){c.then(function(f){e||(o[u]=f,//保证回调的顺序
i++,(n||i>=t.length)&&(r(n?f:o),e=!0))},function(n){e=!0,f(n)})}(t[c],c)})}var h=function(n){this._callbacks=[];var t=this;if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");n(function(n){c(t,n)},function(n){u(t,n)})};
//返回一个已经处于`resolved`状态的Promise对象
h.resolve=function(n){return new h(function(t){t(n)})},
//返回一个已经处于`rejected`状态的Promise对象
h.reject=function(n){return new h(function(t,e){e(n)})},h.prototype={
//一个Promise对象一共有3个状态：
//- `pending`：还处在等待状态，并没有明确最终结果
//- `resolved`：任务已经完成，处在成功状态
//- `rejected`：任务已经完成，处在失败状态
constructor:h,_state:"pending",_fired:!1,//判定是否已经被触发
_fire:function(n,t){if("rejected"===this._state){if("function"!=typeof t)throw this._value;t(this._value)}else"function"==typeof n&&n(this._value)},_then:function(n,t){if(this._fired){//在已有Promise上添加回调
var e=this;f(e,function(){e._fire(n,t)})}else this._callbacks.push({onSuccess:n,onFail:t})},then:function(n,i){n="function"==typeof n?n:t,i="function"==typeof i?i:e;var o=this,r=new h(function(t,e){o._then(function(i){try{i=n(i)}catch(n){
// https://promisesaplus.com/#point-55
return void e(n)}t(i)},function(n){try{n=i(n)}catch(n){return void e(n)}t(n)})});for(var f in o)l[f]||(r[f]=o[f]);return r},done:i,catch:o,fail:o};var l={_state:1,_fired:1,_value:1,_callbacks:1};h.all=function(n){return s(!1,n)},h.race=function(n){return s(!0,n)},h.defer=r,n.Promise=h;var _=window.Promise;//chrome实现的私有方法
return/native code/.test(_)&&(_.prototype.done=i,_.prototype.fail=o,_.defer||(_.defer=r)),window.Promise=_||h});