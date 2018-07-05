(function(app) {
  'use strict';

  function checkDuplicate(name) {
    return function(rec) {
      return rec.name === name;
    };
  }

  app.db.createExpenseType = function(params, callback) {
    var data = app.db.storage.expenseTypes;
    var id = data.findIndex(checkDuplicate(params.name));

    if (id >= 0) {
      var err = 'Expense type ' + params.name + ' already exists.'
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