(function(app) {
  'use strict';

  app.db = {};
  app.db.persist = function(callback) {
    var frugalisDB = JSON.stringify(app.db.storage);
    localStorage.setItem('frugalisDB', frugalisDB);
    callback();
  }
})(frugalisApp);