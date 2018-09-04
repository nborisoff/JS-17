$(document).ready(function(){
  $('.bxslider').bxSlider();
  $('h4').next().hide();
	$('h4').click(function(){
	$(this).next().slideToggle();
	$('h4').not(this).next().stop(true,true).slideUp();
});
});