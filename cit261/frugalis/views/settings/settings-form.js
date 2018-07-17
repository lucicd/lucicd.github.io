(function(app) {
  'use strict';

  function populateSettingsFormView() {
    var userName = app.getUserName() || '';
    if (userName) {
      var el = document.getElementById('userName');
      el.value = userName;
    }
  };

  app.showSettingsFormView = function() {
    var url = './views/settings/settings-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        populateSettingsFormView();
      }
    });
  };

  app.processSettingsForm = function() {
    var userName = document.getElementById('userName').value;
    var params = {
      userName: userName,
    };
    app.db.storeSettings(params, function(err) {
      if (err) {
        app.showMessage(err, 'Error');
      } else {
        app.route('dashboard');
      }
    });
  };
})(frugalisApp);