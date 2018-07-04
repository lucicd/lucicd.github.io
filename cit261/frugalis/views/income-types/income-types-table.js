frugalisApp.populateIncomeTypesTableView = function() {
}

frugalisApp.showIncomeTypesTableView = function() {
  var url = './views/income-types/income-types-table.html';
  frugalisApp.getViewHtml(url, function(err, response) {
    var target = document.getElementById('appView');
    if (err) {
      target.innerHTML = err;
    } else {
      target.innerHTML = response;
      frugalisApp.populateIncomeTypesTableView();
    }
  });
};