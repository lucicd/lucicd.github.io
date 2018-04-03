$(function() {
  $('#hamburgerBtn').click(function() {
    $('#primaryNav').toggleClass('hide');
  });

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

  function currentDate() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    
    var months = new Array(12);
    months[0] = 'January';
    months[1] = 'February';
    months[2] = 'March';
    months[3] = 'April';
    months[4] = 'May';
    months[5] = 'June';
    months[6] = 'July';
    months[7] = 'August';
    months[8] = 'September';
    months[9] = 'October';
    months[10] = 'November';
    months[11] = 'December';
    
    var n = weekday[d.getDay()] + ',&nbsp;' +
      d.getDate() + '&nbsp;' +
      months[d.getMonth()] + '&nbsp;' + 
      d.getFullYear();
    $('#currentdate').html(n);
  }

  var slideIndex = 1;
  showSlides(slideIndex);
  armDots(1);
  armDots(2);
  armDots(3);
  currentDate();
});