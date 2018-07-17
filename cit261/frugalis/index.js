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
      dialogTitle.innerHTML = title;
      dialog.classList.add('dialogContainerVisible');
      if (routeName != undefined) {
        that.route(routeName);
      }
    }

    that.hideMenu = function() {
      document.getElementById('mySideNav').style.transform = 'scaleX(0)';
    };

    that.toggleMenu = function() {
      var nav = document.getElementById('mySideNav');
      if (nav.style.transform.indexOf('scaleX(1)') >= 0) {
        nav.style.transform = 'scaleX(0)';
      } else {
        nav.style.transform = 'scaleX(1)';
      }
    };

    var el = document.getElementById('hamburgerBtn');
    el.addEventListener('click', function() {
      that.toggleMenu();
    });

    var el = document.getElementById('closeNavBtn');
    el.addEventListener('click', function() {
      document.getElementById('mySideNav').style.transform = 'scaleX(0)';
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

  var nav = document.getElementById('mySideNav');
  nav.style.transform = 'scaleX(0)';
  nav.style.transitionProperty = 'transform';
  nav.style.transitionDuration = '0.5s';
}(window));
