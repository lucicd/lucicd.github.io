(function() {
  var section = document.querySelector('#about');
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

    var imgIdx = 1;
        
    for (var i = 0; i < towns.length; i++) {
      if (towns[i].name === 'Placerton') continue;
      var myArticle = document.createElement('article');
      var myDiv1 = document.createElement('div');
      var myDiv2 = document.createElement('div');
      var myH2 = document.createElement('h2');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myPara4 = document.createElement('p');
      var myImg = document.createElement('img')
      myImg.src = 'images/towns/img' + imgIdx + '.jpg';
      imgIdx++;

      myH2.textContent = towns[i].name;
      myPara1.textContent = 'Moto: ' + towns[i].motto;
      myPara2.textContent = 'Year Founded: ' + towns[i].yearFounded;
      myPara3.textContent = 'Population: ' + towns[i].currentPopulation;
      myPara4.textContent = 'Average Rainfall: ' + towns[i].averageRainfall;

      myDiv1.appendChild(myH2);
      myDiv1.appendChild(myPara1);
      myDiv1.appendChild(myPara2);
      myDiv1.appendChild(myPara3);
      myDiv1.appendChild(myPara4);
      myDiv2.appendChild(myImg)
      myArticle.appendChild(myDiv1);
      myArticle.appendChild(myDiv2);

      section.appendChild(myArticle);
    }
  }
})();