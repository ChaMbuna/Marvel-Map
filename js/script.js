// Declare global map variable
var MAP;

// Combined object with local and response data on current character
var currentCharacter = {};

// Array with character objects
var characters = ko.observableArray([
        { name: 'Iron Man', id: 1009368, birthPlace: 'Long Island, New York'},
        { name: 'Wolverine', id: 1009718, birthPlace: 'Alberta, Canada'},
        { name: 'Spider-Man', id: 1009610, birthPlace: 'Forest Hills, New York'},
        { name: '3-D Man', id: 1011334, birthPlace: 'Los Angeles, California'},
        { name: 'Captain America', id: 1009220, birthPlace: 'New York, New York'},
        { name: 'Hulk', id: 1009220, birthPlace: 'Dayton, Ohio'},
        { name: 'Black Widow', id: 1009189, birthPlace: 'Stalingrad, Russia'},
        { name: 'Red Skull', id: 1009535, birthPlace: 'Germany'}
    ]);

ko.applyBindings(characters);

// Gather character info stored locally
function loadData() {
    
    // get value of character entered
    var character = document.getElementById('character').value;
    
    // fills currentCharacter object with info from the ko.observable characters array; stores null if character is not found
    var currentCharacter = ko.utils.arrayFirst(characters(), function(item) {
    return item.name === character;
    });
    
    // if nothing was entered, thrown an alert and stop the function
    if (character === "") {
        alert('You didn\'t enter a character name');
        return false;

    // if something was entered, check if we know the character
    // if we don't, stop the function execution
    } else if (currentCharacter === null) {
        alert('We don\t have info on that character');
        return false;
    }
        
    // ===== Now we deal with the Marvel API =====
    
}

// Get character info from Marvel
function getMarvelData(loadData) {
    
    // callback to get local data
    loadData()
    
    // first we get the url for the AJAX request
    var MarvelAPIurl = 'http://gateway.marvel.com/v1/public/characters?id=' + currentCharacter.id + '&ts=1&apikey=e0fb310884d9d2f6becaacb508f3b69f&hash=3ad897582261676d9a57067e959bc2d2'
    
    // error handling in case Marvel API does not respond within 8 seconds
    var MarvelRequestTimeout = setTimeout(function () {
        // TODO: ADD ERROR MESSAGE
    }, 8000);

    // perform AJAX request and store results in currentCharacter object
    var request = new XMLHttpRequest();
    request.open("GET", marvelAPIurl, false); // TODO: make run asynchronously
    request.onreadystatechange = function () {

        // error handling
        if (request.readyState != 4 || request.status != 200) return;

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
    };
    
    request.send();
}


// Build the map
function getGoogleMap(getMarvelData) {
    
    // callback to get Marvel data
    getMarvelData();
    
    // ===== GOOGLE MAPS GEOCODER =====
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': currentCharacter.birthPlace
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            MAP.setCenter(results[0].geometry.location);

            var image = {
                url: currentCharacter.pic,
                scaledSize: new google.maps.Size(100, 100),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(50, -20)
            };

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: MAP,
                icon: image,
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


    return false;

}

// loads character lookup function on form submit
$('#form-container').submit(getGoogleMap);
// var clickButton = document.getElementById('form-container');
// clickButton.addEventListener.on('submit', loadData);


// ===== GOOGLE MAPS API=====
// Styles to make the map look Marvel themed
var styles = [
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }, {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }, {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }, {
        "featureType": "water",
        "stylers": [
            {
                "color": "#0F6AB4"
            }
    ]
  }, {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }, {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }, {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }, {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": 1
            },
            {
                "visibility": "off"
            }
    ]
  }, {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
    ]
  }, {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }, {
        "featureType": "landscape.natural",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#F0141E"
            }
    ]
  }, {
        "featureType": "administrative.province",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
    ]
  }
];

// setup & customize Google Maps
function initialize() {
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });
    var mapOptions = {
        zoom: 12,
        // Focus map on New York as initial view
        center: new google.maps.LatLng(40.7033127, -73.979681),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        disableDefaultUI: true
    };

    // Puts the map in the map canvas div
    MAP = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    MAP.mapTypes.set('map_style', styledMap);
    MAP.setMapTypeId('map_style');


}


// load Google map on page load
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDrq2isM2im18Jccxs7-4g2O8l-93fqJZU' +
        '&callback=initialize';
    document.body.appendChild(script);
}

// Loads initial Google Map when page loads
window.onload = loadScript;