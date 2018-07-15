(function(app) {
  'use strict';

  app.db.storeSettings = function(params, callback) {
    var data = app.db.storage;
    data.userName = params.userName;
    app.db.persist(function() {
      callback(null);
    });
  };
})(frugalisApp);