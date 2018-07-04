frugalisApp.populateAccountsTableView = function() {
}

frugalisApp.showAccountsTableView = function() {
  var url = './views/accounts/accounts-table.html';
  frugalisApp.getViewHtml(url, function(err, response) {
    var target = document.getElementById('appView');
    if (err) {
      target.innerHTML = err;
    } else {
      target.innerHTML = response;
      frugalisApp.populateAccountsTableView();
    }
  });
};