$(function() {
  $('#hamburgerBtn').click(function() {
    $('#primaryNav').toggleClass('hide');
  });
  CurrentDate();

  function getPackages(callback) {
    $.getJSON('data/packages.json', callback);
  }

  function getServices(callback) {
    $.getJSON('data/services.json', callback);
  }

  function showPackages(data) {
    var packagesDiv = $('#packages');
    $.each(data, function(index, elem) {
      packagesDiv.append('<h3>' + elem.packageName + '</h3>');
      if ('includedServices' in elem) {
        packagesDiv.append('<ul>');
        $.each(elem.includedServices, function(index, elem) {
          packagesDiv.append('<li>' + elem + '</li>');
        });
        packagesDiv.append('</ul>');
      } else {
        packagesDiv.append('<p>' + elem.description + '</p>');
      }
      packagesDiv.append('<p>Price: <strong>' + elem.price + '</strong></p>');
    });
  }

  function showServicesTable(data) {
    var html = '<table>';
    html += '<thead>';
    html += '<tr>';
    html += '<th>Service Description</th>';
    html += '<th>Price</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(data, function(index, elem) {
      html += '<tr>';
      html += '<td>' + elem.name + '</td>';
      html += '<td>' + elem.price + '</td>';
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  }

  function showServices(data) {
    var html = '';
    $.each(data, function(index, elem) {
      html += '<h3>' + elem.group + '</h3>';
      html += showServicesTable(elem.items);
    });
    $('#services').append(html);
  }

  getPackages(function(packages) {
    getServices(function(services) {
      showPackages(packages);
      showServices(services);
    });
  });
});