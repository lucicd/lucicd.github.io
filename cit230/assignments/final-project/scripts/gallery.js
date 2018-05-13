var MyGallery = (function() {
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var slides = $('.mySlides');
    var dots = $('.dot');
    if (n > slides.length) {
      slideIndex = 1;
    } 
    if (n < 1) {
      slideIndex = slides.length;
    }
    slides.css('display', 'none');
    dots.removeClass('active');
    slides.eq(slideIndex-1).css('display', 'block'); 
    dots.eq(slideIndex-1).addClass('active');
  } 
  
  $('.prev').click(function() {
    plusSlides(-1);
  });

  $('.next').click(function() {
    plusSlides(1);
  });

  function armDots(n) {
    $('.dot-container span:nth-child('+n+')').click(function() {
      currentSlide(n);
    });
  }

  var slideIndex = 1;
  
  return function() {
    showSlides(slideIndex);
    armDots(1);
    armDots(2);
    armDots(3);
  };
})();