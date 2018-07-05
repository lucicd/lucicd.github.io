(function(app) {
  'use strict';

  function checkDuplicate(name) {
    return function(rec) {
      return rec.name === name;
    };
  }

  app.db.createIncomeType = function(params, callback) {
    var data = app.db.storage.incomeTypes;
    var id = data.findIndex(checkDuplicate(params.name));

    if (id >= 0) {
      var err = 'Income type ' + params.name + ' already exists.'
      callback(err, id);
    } else {
      var rec = {
        name: params.name,
        status: true,    
      };
      data.push(rec);
      callback(null, data.length - 1);
    }
  }
})(frugalisApp);