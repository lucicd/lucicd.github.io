(function(app) {
  'use strict';
  
  function populateAccountFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      var account = app.db.getAccount(id);
      el = document.getElementById('name');
      el.value = account.name;
    } else {
      el = document.querySelector('.buttonDelete');
      el.classList.add('hidden');
    }
  }

  app.showAccountFormView = function(id) {
    var url = './views/accounts/account-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        populateAccountFormView(id);
      }
    });
  };

  app.processAccountForm = function() {
    var name = document.getElementById('name').value;
    var id = document.getElementById('id').value;
    var params = {
      name: name, 
      id: id,
    };
    if (id >= 0) {
      app.db.updateAccount(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('accountsTable');
        }
      });
    } else {
      app.db.createAccount(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('accountsTable');
        }
      });
    }
  }

  app.deleteAccountForm = function() {
    var id = document.getElementById('id').value;
    var params = {
      id: id,
    };
    if (id >= 0) {
      app.db.deleteAccount(params, function(err) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('accountsTable');
        }
      });
    }
  }
})(frugalisApp);
