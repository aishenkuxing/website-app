/* Slovenian initialisation for the jQuery UI date picker plugin. */
/* Written by Jaka Jancar (jaka@kubje.org). */
/* c = č, s = š z = ž C = Č S = Š Z = Ž */
!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["../widgets/datepicker"],e):
// Browser globals
e(jQuery.datepicker)}(function(e){return e.regional.sl={closeText:"Zapri",prevText:"&#x3C;Prejšnji",nextText:"Naslednji&#x3E;",currentText:"Trenutni",monthNames:["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"],dayNames:["Nedelja","Ponedeljek","Torek","Sreda","Četrtek","Petek","Sobota"],dayNamesShort:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"],dayNamesMin:["Ne","Po","To","Sr","Če","Pe","So"],weekHeader:"Teden",dateFormat:"dd.mm.yy",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},e.setDefaults(e.regional.sl),e.regional.sl});