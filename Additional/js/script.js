$(document).ready(function ($) {
    $('#tabs').tabulous({
    	effect: 'scale'
    });

    $('#tabs2').tabulous({
    	effect: 'slideLeft'
    });

    $('#tabs3').tabulous({
    	effect: 'scaleUp'
    });

    $('#tabs4').tabulous({
    	effect: 'flip'
    });
    
    $( '#my-slider' ).sliderPro();

    $("#my-calendar").zabuto_calendar({language: "en"});
});