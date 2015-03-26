// global map variable
var MAP;

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
    
    // Sets the map style
    MAP.mapTypes.set('map_style', styledMap);
    
    // Sets the map type
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

window.onload = loadScript;

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