(function (window, undefined) {
  "use strict";

  var menuItems = [];

  var createApp = function() {
    var that = {};

    that.showMessage = function(msg, title, routeName) {
      // console.log('Route name in show message is ' + routeName);
      var dialog = document.getElementById('dialogContainer');
      var dialogMessage = document.getElementById('dialogMessage');
      var dialogTitle = document.getElementById('dialogTitle');
      dialogMessage.innerHTML = msg;
      dialogMessage.dialogTitle = title;
      dialog.classList.add('dialogContainerVisible');
      if (routeName != undefined) {
        that.route(routeName);
      }
    }

    var el = document.getElementById('hamburgerBtn');
    el.addEventListener('click', function() {
      document.getElementById('mySideNav').style.width = '300px';
    });

    var el = document.getElementById('closeNavBtn');
    el.addEventListener('click', function() {
      document.getElementById('mySideNav').style.width = '0';
    });

    el = document.getElementById('closeDialogBtn');
    el.addEventListener('click', function() {
      var el = document.getElementById('dialogContainer');
      el.classList.remove('dialogContainerVisible');
    });

    return that;
  };

  window.frugalisApp = createApp();
  window.onpopstate = function (event) {
    frugalisApp.route(null, null, window.location.href);
  };

}(window));
