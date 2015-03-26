// Object to store local and AJAX response data on current character
var currentCharacter = {};

// variable to store lookup data
var character = "";

// Gather character info stored locally
function loadData() {
        
    // fills currentCharacter object with info from the ko.observable characters array; stores null if character is not found
    currentCharacter = ko.utils.arrayFirst(characters(), function(item) {
    return item.name === character;
    });
    
    // variable with url for the AJAX request
    var marvelAPIurl = 'http://gateway.marvel.com/v1/public/characters?id=' + currentCharacter.id + '&ts=1&apikey=e0fb310884d9d2f6becaacb508f3b69f&hash=3ad897582261676d9a57067e959bc2d2';
    
    // error handling in case Marvel API does not respond within 8 seconds
    var MarvelRequestTimeout = setTimeout(function () {
        return alert('The Marvel API is not available right now');
    }, 8000);

    // perform AJAX request and store results in currentCharacter object
    var request = new XMLHttpRequest();
    request.open("GET", marvelAPIurl, true);
    request.onreadystatechange = function () {
        // prevent entering onreadystatechange before its ready
          if (request.readyState !== 4) return;
        // check if state and status are good to go, if not throw alert
          if (request.readyState != 4 && request.status != 200) {
            return alert('Google Maps is not available right now');
        }

        // convert string to JSON object & store data object we need
        var result = JSON.parse(request.response).data.results[0];

        // error handling when API did not provide character description
        if (result.description === "") {
            currentCharacter.description = "Bummer, there is no description available for this character.";
        } else {
            // stores the character description if there is one
            currentCharacter.description = result.description;
        }

        // stores the marvel universe wiki link for this character
        currentCharacter.wiki = result.urls[1].url;

        // stores the url of the picture for this character
        currentCharacter.pic = result.thumbnail.path + '.' + result.thumbnail.extension;

        // resets timeout function
        clearTimeout(MarvelRequestTimeout);

        // calls Google geocoder to update map
        getGoogleMap();

    };

    request.send();
    
    // prevents return
    return false;
}


