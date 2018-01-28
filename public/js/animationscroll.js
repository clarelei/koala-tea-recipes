// var $animation_elements = $('.animation-element');
// var $window = $(window);

// function check_if_in_view() {
//   var window_height = $window.height();
//   var window_top_position = $window.scrollTop();
//   var window_bottom_position = (window_top_position + window_height);

//   $.each($animation_elements, function() {
//     var $element = $(this);
//     var element_height = $element.outerHeight();
//     var element_top_position = $element.offset().top;
//     var element_bottom_position = (element_top_position + element_height);

//     //check to see if this current container is within viewport
//     if ((element_bottom_position >= window_top_position) &&
//       (element_top_position <= window_bottom_position)) {
//       $element.addClass('in-view');
//     } else {
//       $element.removeClass('in-view');
//     }
//   });
// }

// $window.on('scroll resize', check_if_in_view);
// $window.trigger('scroll');

function showImages(el) {
  var windowHeight = jQuery( window ).height();
  $(el).each(function(){
    var thisPos = $(this).offset().top;
    var topOfWindow = $(window).scrollTop();
    if (topOfWindow + windowHeight - 200 > thisPos ) {
      $(this).addClass("slideUp");
    }
  });
}

// if the image in the window of browser when the page is loaded, show that image
$(document).ready(function(){
  showImages('.canary');
});

// if the image in the window of browser when scrolling the page, show that image
$(window).scroll(function() {
  showImages('.canary');
});