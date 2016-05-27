$(document).ready(function() {

  // Slick JS

  var arrowsContainer = $("#arrows-container");
  $('.slick').slick({
    dots: true,
    //appendArrows: arrowsContainer
    arrows: false
  });

  $('.slick-slide-to-next').on("click", function() {
    $('.slick').slick('slickNext');
  });

  $('.slick-post-hero-image').slick({
    dots: true,
    arrows: true
  });

  // Slide down menu
  $(".site-header-menu-button").on("click", function(e) {
    e.preventDefault();

    //$(".slide-menu").slideToggle();
    
    var slideMenu = $(".slide-menu");
    if ( $(slideMenu).hasClass("slide-menu-show") ) {
      $(slideMenu).removeClass("slide-menu-show");
    }
    else {
      $(slideMenu).addClass("slide-menu-show");  
    }
    
  });

});