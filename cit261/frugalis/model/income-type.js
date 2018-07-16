(function(app) {
  'use strict';

  function verifyRec(params) {
    if (!params.name) {
      return 'Income type name must not be empty.';
    }
    return null;
  }

  function checkDuplicate(name) {
    return function(rec) {
      return name === rec.name;
    };
  }

  app.db.createIncomeType = function(params, callback) {
    var data = app.db.storage.incomeTypes;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkDuplicate(params.name));
      if (id >= 0) {
        err = 'Income type with that name already exists.'
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

  app.db.updateIncomeType = function(params, callback) {
    var data = app.db.storage.incomeTypes;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkDuplicate(params.name));
      if (id >= 0 && id != params.id) {
        err = 'Income type with that name already exists.';
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

  app.db.deleteIncomeType = function(params, callback) {
    var data = app.db.storage.incomeTypes;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getIncomeTypes = function() {
    return app.db.storage.incomeTypes.sort(app.makeSort('name'));
  };

  app.db.getIncomeType = function(id) {
    return app.db.storage.incomeTypes[id];
  }
})(frugalisApp);