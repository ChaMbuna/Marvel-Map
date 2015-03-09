// Declare global variables
var MAP
var CHARACTERPIC

// Character info not provided by the API
var characterCollection = {
  "3-D Man": {
    "id": 1011334,
    "birthPlace": "Los Angeles, California"
     }
  }



// ===== MAIN FUNCTION =====
function loadData() {
  // stores HTML elements to be updated on query
  var $body = $('body');
  var $characterInfo = $('#character-info');
  
  // clear out old data before new request
  $characterInfo.text("");
  
  // get value of character lookup
  var character = $('#character').val();
  
  // get character birthplace for use in Google Maps
  var characterPOB = characterCollection[character]['birthPlace']
  
  // get character id for use in Marvel API
  var characterID = characterCollection[character]['id']



  
  // ===== MARVEL API =====
var marvelAPIurl = 'http://gateway.marvel.com/v1/public/characters?id=' + characterID + '&ts=1&apikey=e0fb310884d9d2f6becaacb508f3b69f&hash=3ad897582261676d9a57067e959bc2d2'
var MarvelRequestTimeout = setTimeout(function() {
  
}, 8000);
  
  $.ajax({
    url: marvelAPIurl,
    dataType: 'json',
    success: function(object) {
      console.log(object);
      CHARACTERPIC = object.data.results[0].thumbnail.path
      + '.'
      + object.data.results[0].thumbnail.extension;
      console.log(CHARACTERPIC)
      clearTimeout(MarvelRequestTimeout);
    }
});
  
  
  
  
  // ===== GOOGLE MAPS GEOCODER =====
  geocoder = new google.maps.Geocoder();  
  geocoder.geocode( { 'address': characterPOB }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      MAP.setCenter(results[0].geometry.location);
      
      
  
      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  console.log(CHARACTERPIC);
  var image = {
    url: CHARACTERPIC,
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 50)
  };
  console.log(image)
  
  

    return false;
   
};

// loads main function on character lookup
$('#form-container').submit(loadData);



// ===== GOOGLE MAPS API=====
// Styles to make the map look Marvel themed
  var styles = [
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.neighborhood",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "color": "#0F6AB4" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.province",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "elementType": "labels.text.stroke",
    "stylers": [
      { "weight": 1 },
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ffffff" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.natural",
    "stylers": [
      { "visibility": "on" },
      { "color": "#F0141E" }
    ]
  },{
    "featureType": "administrative.province",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
];

// Initializes Google Maps
function initialize() {
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});
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



// Loads Google Maps API asynchronously
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDrq2isM2im18Jccxs7-4g2O8l-93fqJZU' +
      '&callback=initialize';
  document.body.appendChild(script);
}

// Loads initial Google Map when page loads
window.onload = loadScript;

