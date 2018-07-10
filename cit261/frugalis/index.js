(function (window, undefined) {
  "use strict";

  var menuItems = [];

  var createApp = function() {
    var that = {};

    that.getDailyBudget = function() {
      return 11274.45;
    };

    that.getTargetBudget = function() {
      return 10000.00;
    };

    that.getAlertsList = function() {
      return ['Utilty bill payment due in 3 days.', 'Collection of rent due tomorrow.'];
    }

    that.showMessage = function(msg, title) {
      var dialog = document.getElementById('dialogContainer');
      var dialogMessage = document.getElementById('dialogMessage');
      var dialogTitle = document.getElementById('dialogTitle');
      dialogMessage.innerHTML = msg;
      dialogMessage.dialogTitle = title;
      dialog.classList.add('dialogContainerVisible');
    }

    var el = document.getElementById('hamburgerBtn');
    el.addEventListener('click', function() {
      document.getElementById('primaryNav').classList.toggle('hide');
    });

    el = document.getElementById('closeDialogBtn');
    el.addEventListener('click', function() {
      var el = document.getElementById('dialogContainer');
      el.classList.remove('dialogContainerVisible');
    });

    return that;
  };

  window.frugalisApp = createApp();

}(window));
