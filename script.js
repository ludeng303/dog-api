'use strict';

let html2 = "<p>Start here: </p>";
let html3 = "<p> Right Here</p>";

function fetchAndLog() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function fetchRandom() {

    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(responseJson => displayResults2(responseJson))
      .catch(error => alert('Something went wrong. Try again later.' + error));

  }

function fetchRandomBreed(breed) {
    let request = 'https://dog.ceo/api/breed/'+breed+'/images/random';
    fetch(request)
      .then(response => response.json())
      .then(responseJson => displayResults3(responseJson, breed))
      .catch(error => alert('Something went wrong. Try again later.' + error));

  }

function displayResults2(responseJson) {
    console.log(responseJson.message);
    html2 = html2 +
        `	
            <img src="${responseJson.message}" class="results-img">
        `
        document.getElementById("result").innerHTML = html2;
    ;
}

function displayResults3(responseJson, breed){
    let resp = responseJson.message;
    let badBreaad = "Breed not found (master breed does not exist)";

    if(resp === badBreaad){
        html3 = `<img src="nodogs.png" class="results-img">`;
        document.getElementById('result').innerHTML=html3;
        alert('404  [ ' + breed +  ' ]  NOT FOUND    Please try another input.');
    }else{
        html3 = html3 +
        `	
            <img src="${responseJson.message}" class="results-img">
        `    
        document.getElementById('result').innerHTML=html3;
    }
}

$(function() {
    watchForms();
});

function watchForms() {
    $('#js-form-1').submit(event => {
        let numOfDogs = document.getElementById("js-input-1").value;
        event.preventDefault();
    
        for(let i=0; i<numOfDogs; i++){
            fetchAndLog();
        }
    });
    $('#js-form-2').submit(event => {
        removeHiddenSec();
        let numOfDogs = document.getElementById("js-input-2").value;
        event.preventDefault();
        for(let i=0; i<numOfDogs; i++){
            fetchRandom();
        }
        html2 = "<p> Dogs: </p>";
    });
    $('#js-form-3').submit(event => {
        removeHiddenSec();
        let breed = document.getElementById("js-input-3").value;
        event.preventDefault();
        fetchRandomBreed(breed); 
        html3 = "<p> Dogs: </p>";
    });
}

function removeHiddenSec(){

    document.getElementById('js-sec-result').removeAttribute('class');
}