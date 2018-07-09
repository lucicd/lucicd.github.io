(function(app) {
  'use strict';

  app.formatDate = function(d) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    try {
      var day = d.getDate();
      var month = months[d.getMonth()];
      var year = d.getFullYear() - 2000;
      return day + '-' + month + '-' + year;
    } catch(e) {
      return '..-..-..';
    }
  }

  app.formatISODate = function(d) {
    try {
      var day = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      return year + '-' + 
        month.toLocaleString('en', {minimumIntegerDigits: 2}) + '-' + 
        day.toLocaleString('en', {minimumIntegerDigits: 2});
    } catch(e) {
      return '..-...-..';
    }
  }

  app.getViewHtml = function(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(null, xhttp.responseText);
      } else {
        callback('Error loading ' + url + '. status=' + this.status);
      }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
  };

  app.performTasks= function(tasks, callback) {
    var topTask = tasks[0];
    if (tasks.length === 1) {
      topTask(callback);
    } else {
      topTask(function() {
        app.performTasks(tasks.slice(1), callback);
      });
    }
  };

  app.populateExpenseTypes = function(target) {
    var expenseTypes = app.db.getExpenseTypes();
    expenseTypes.forEach(function(type) {
      var option = document.createElement('option');
      option.attributes.value = type.name;
      option.innerHTML = type.name;
      target.appendChild(option);
    });
  };

  app.populateIncomeTypes = function(target) {
    var incomeTypes = app.db.getIncomeTypes();
    incomeTypes.forEach(function(type) {
      var option = document.createElement('option');
      option.attributes.value = type.name;
      option.innerHTML = type.name;
      target.appendChild(option);
    });
  };

  app.populateAccounts = function(target) {
    var accounts = app.db.getAccounts();
    accounts.forEach(function(account) {
      var option = document.createElement('option');
      option.attributes.value = account.name;
      option.innerHTML = account.name;
      target.appendChild(option);
    });
  };

})(frugalisApp);
