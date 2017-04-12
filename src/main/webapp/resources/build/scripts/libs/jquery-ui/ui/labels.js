/*!
 * jQuery UI Labels @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: labels
//>>group: Core
//>>description: Find all the labels associated with a given input
//>>docs: http://api.jqueryui.com/labels/
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery","./version","./escape-selector"],e):
// Browser globals
e(jQuery)}(function($){return $.fn.labels=function(){var e,t,s,i,n;
// Check control.labels first
// Check control.labels first
// Support: IE <= 11, FF <= 37, Android <= 2.3 only
// Above browsers do not support control.labels. Everything below is to support them
// as well as document fragments. control.labels does not work on document fragments
// Look for the label based on the id
// We don't search against the document in case the element
// is disconnected from the DOM
// Get a full set of top level ancestors
// Create a selector for the label based on the id
return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(i=this.eq(0).parents("label"),s=this.attr("id"),s&&(e=this.eq(0).parents().last(),n=e.add(e.length?e.siblings():this.siblings()),t="label[for='"+$.ui.escapeSelector(s)+"']",i=i.add(n.find(t).addBack(t))),this.pushStack(i))}});