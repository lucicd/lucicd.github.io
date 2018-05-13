$(function() {
  $('.navigation > li').hover(function() {
    $(this).addClass('openSesame');
  }, function() {
    $(this).removeClass('openSesame');
  });
});