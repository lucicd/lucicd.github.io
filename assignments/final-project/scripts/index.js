$(function() {
  $('#hamburgerBtn').click(function() {
    $('#primaryNav').toggleClass('hide');
  });

  $('#joinEvent').click(function() {
    window.location = 'events.html';
  });
  $('#shop').click(function() {
    window.location = 'products.html';
  });
  $('#contactUs').click(function() {
    window.location = 'contact.html';
  });

  MyGallery();
  CurrentDate();
});