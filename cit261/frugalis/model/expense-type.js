(function(app) {
  'use strict';

  function verifyRec(params) {
    if (!params.name) {
      return 'Expense type name must not be empty.';
    }
    return null;
  }

  function checkDuplicate(name) {
    return function(rec) {
      return name === rec.name;
    };
  }

  app.db.createExpenseType = function(params, callback) {
    var data = app.db.storage.expenseTypes;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkDuplicate(params.name));
      if (id >= 0) {
        err = 'Expense type with that name already exists.'
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

  app.db.updateExpenseType = function(params, callback) {
    var data = app.db.storage.expenseTypes;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkDuplicate(params.name));
      if (id >= 0 && id != params.id) {
        err = 'Expense type with that name already exists.';
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

  app.db.deleteExpenseType = function(params, callback) {
    var data = app.db.storage.expenseTypes;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getExpenseTypes = function() {
    return app.db.storage.expenseTypes;
  };

  app.db.getExpenseType = function(id) {
    return app.db.storage.expenseTypes[id];
  }
})(frugalisApp);