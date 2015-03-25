// Object to store local and AJAX response data on current character
var currentCharacter = {};
var character = "";
// Array with character objects
var characters = ko.observableArray([
        { name: 'Iron Man', id: 1009368, birthPlace: 'Long Island, New York'},
        { name: 'Wolverine', id: 1009718, birthPlace: 'Alberta, Canada'},
        { name: 'Spider-Man', id: 1009610, birthPlace: 'Forest Hills, New York'},
        { name: '3-D Man', id: 1011334, birthPlace: 'Los Angeles, California'},
        { name: 'Captain America', id: 1009220, birthPlace: 'New York, New York'},
        { name: 'Hulk', id: 1009351, birthPlace: 'Dayton, Ohio'},
        { name: 'Black Widow', id: 1009189, birthPlace: 'Stalingrad, Russia'},
        { name: 'Red Skull', id: 1009535, birthPlace: 'Germany'}
    ]);

ko.applyBindings(characters);

// Gather character info stored locally
function loadData() {
        
    // fills currentCharacter object with info from the ko.observable characters array; stores null if character is not found
    currentCharacter = ko.utils.arrayFirst(characters(), function(item) {
    return item.name === character;
    });
    
    
    
    
    // Marvel API handling
    
    
    // url for the AJAX request
    var marvelAPIurl = 'http://gateway.marvel.com/v1/public/characters?id=' + currentCharacter.id + '&ts=1&apikey=e0fb310884d9d2f6becaacb508f3b69f&hash=3ad897582261676d9a57067e959bc2d2';
    
    // error handling in case Marvel API does not respond within 8 seconds
    var MarvelRequestTimeout = setTimeout(function () {
        return alert('The Marvel API is not available right now');
    }, 8000);

    // perform AJAX request and store results in currentCharacter object
    var request = new XMLHttpRequest();
    request.open("GET", marvelAPIurl, true);
    request.onreadystatechange = function () {

            // error handling
            if (request.readyState != 4 && request.status != 200) {
                return alert('Google Maps is not available right now');
            }

            // convert string to JSON object & store data object we need
            var result = JSON.parse(request.response).data.results[0];

            // error handling when API did not provide character description
            if (result.description === "") {
                currentCharacter.description = "Bummer, there is no description available for this character.";
            } else {
                currentCharacter.description = result.description;
            }

            // stores the marvel universe wiki link for this character
            currentCharacter.wiki = result.urls[1].url;

            // stores the url of the picture for this character
            currentCharacter.pic = result.thumbnail.path + '.' + result.thumbnail.extension;

            // resets timeout function
            clearTimeout(MarvelRequestTimeout);

            // calls Google maps function
            getGoogleMap();
        
        };

        request.send();
    
    return false;
}

// updates the map
// called after ajax request is successful
function getGoogleMap() {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': currentCharacter.birthPlace }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            MAP.setCenter(results[0].geometry.location);

            // stores image that replaces default google maps marker
            var image = {
                url: currentCharacter.pic,
                scaledSize: new google.maps.Size(100, 100),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(50, -20)
            };
            
            var marker = new google.maps.Marker({
                map: MAP,
                position: results[0].geometry.location,
                icon: image
            });

            var contentString = '<div id="content">' +
                '<h1 id="popupName">' + currentCharacter.name + '</h1>' +
                '<div id="popupBody">' +
                '<p id="popupPOB">Born in ' + currentCharacter.birthPlace + '</p>' +
                '<p>' + currentCharacter.description + '</p>' +
                '<p id="popupWiki"><a href="' + currentCharacter.wiki + '">' +
                'Check out this character on the Marvel Universe Wikipedia</a></p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(MAP, marker);
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// View functions for user interaction


// loads character lookup function on form submit
var clickButton = document.getElementById('form-container');

// resets the currentCharacter and starts loadData;
clickButton.addEventListener('submit', lookup);

// look up character on click from list
function clickedList() {
    
    // clears currentCharacter object;
   
    currentCharacter = {};
    // get name for clicked character
    character = this.name;
    
    loadData();
}

// empty current character object & sets character
function lookup() {
    character = document.getElementById('character').value;
        
    // if nothing was entered, thrown an alert and stop the function
    if (character === "") {
        alert('You didn\'t enter a character name');
        return false;

    // if something was entered, check if we know the character
    // if we don't, stop the function execution
    } else if (currentCharacter === null) {
        alert('We don\t have info on that character');
        return false;
    } else {
        // clears currentCharacter object;
        currentCharacter = {};
        // get value of character entered in search
        loadData();
        }
}
