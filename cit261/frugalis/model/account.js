(function(app) {
  'use strict';

  function verifyRec(params) {
    if (!params.name) {
      return 'Account name must not be empty.';
    }
    return null;
  }

  function checkDuplicate(name) {
    return function(rec) {
      return name === rec.name;
    };
  }

  app.db.createAccount = function(params, callback) {
    var data = app.db.storage.accounts;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkDuplicate(params.name));
      if (id >= 0) {
        err = 'Account with that name already exists.'
        callback(err, null);
      } else {
        var rec = {
          name: params.name,
          status: true,    
        };
        data.push(rec);
        app.db.persist(function() {
          callback(null, data.length - 1);
        });
      }
    }
  };

  app.db.updateAccount = function(params, callback) {
    var data = app.db.storage.accounts;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkDuplicate(params.name));
      if (id >= 0 && id != params.id) {
        err = 'Account with that name already exists.';
        callback(err, null);
      } else {
        var rec = data[params.id];
        rec.name = params.name;
        app.db.persist(function() {
          callback(null, params.id);
        });
      }
    }
  };

  app.db.deleteAccount = function(params, callback) {
    var data = app.db.storage.accounts;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getAccounts = function() {
    return app.db.storage.accounts;
  };

  app.db.getAccount = function(id) {
    return app.db.storage.accounts[id];
  };
})(frugalisApp);