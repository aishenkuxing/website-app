/* Estonian initialisation for the jQuery UI date picker plugin. */
/* Written by Mart Sõmermaa (mrts.pydev at gmail com). */
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["../widgets/datepicker"],e):
// Browser globals
e(jQuery.datepicker)}(function(e){return e.regional.et={closeText:"Sulge",prevText:"Eelnev",nextText:"Järgnev",currentText:"Täna",monthNames:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],monthNamesShort:["Jaan","Veebr","Märts","Apr","Mai","Juuni","Juuli","Aug","Sept","Okt","Nov","Dets"],dayNames:["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"],dayNamesShort:["Pühap","Esmasp","Teisip","Kolmap","Neljap","Reede","Laup"],dayNamesMin:["P","E","T","K","N","R","L"],weekHeader:"näd",dateFormat:"dd.mm.yy",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},e.setDefaults(e.regional.et),e.regional.et});