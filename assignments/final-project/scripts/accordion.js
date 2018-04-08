$(function() {
  $('#hamburgerBtn').click(function() {
    $('#primaryNav').toggleClass('hide');
  });
  CurrentDate();

  var acc = $('.accordion');

  acc.each(function() {
    $(this).click(function() {
      $(this).toggleClass('activePanel');
      var panel = $(this).next();
      panel.slideToggle(400);
    });
  });

  acc[2].click();
});