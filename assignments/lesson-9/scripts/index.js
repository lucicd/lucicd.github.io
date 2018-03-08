(function() {
  var section = document.querySelector('main section');
  var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.onload = function() {
    var towns = request.response;
    showTowns(towns);
  }
  request.send();

  function showTowns(jsonObj) {
    var towns = jsonObj['towns'];
        
    for (var i = 0; i < towns.length; i++) {
      if (towns[i].name === 'Placerton') continue;
      var myArticle = document.createElement('article');
      var myH2 = document.createElement('h2');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myPara4 = document.createElement('p');
      var myList = document.createElement('ul');

      myH2.textContent = towns[i].name;
      myPara1.textContent = 'Moto: ' + towns[i].motto;
      myPara2.textContent = 'Year Founded: ' + towns[i].yearFounded;
      myPara3.textContent = 'Population: ' + towns[i].currentPopulation;
      myPara3.textContent = 'Average Rainfall: ' + towns[i].averageRainfall;
      myPara4.textContent = 'Events:';
          
      var events = towns[i].events;
      for (var j = 0; j < events.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = events[j];
        myList.appendChild(listItem);
      }

      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myPara4);
      myArticle.appendChild(myList);

      section.appendChild(myArticle);
    }
  }
})();