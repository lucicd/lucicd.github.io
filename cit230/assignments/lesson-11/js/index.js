$(function() {
  // var toggleStyle = function() {
  //   var inputFileds = $('input[type="text"]');
  //   if (inputFileds.css('background-color') === 'rgb(255, 0, 0)') {
  //     inputFileds.css('background-color', 'rgb(255, 255, 255)'); 
  //   } else {
  //     inputFileds.css('background-color', 'rgb(255, 0, 0)'); 
  //   }
  // }

  // $('#ReqAQuoteBtn').click(toggleStyle);

  // $('.coreValues').append('<li><strong>This is brand new!<strong></li>');
  // $('<li><strong>This is also great!!<strong></li>').appendTo('.coreValues');

  // $('.coreValues').prepend('<li><strong>This is brand new!<strong></li>');
  // $('<li><strong>This is also great!!<strong></li>').prependTo('.coreValues');

  var nameVal = $('input[name="nameVal"]');
  
  function FillEmpty() {
    if (nameVal.val() === '') {
      nameVal.val('John Doe');
    }
  }

  $('#ReqAQuoteBtn').click(FillEmpty);

})