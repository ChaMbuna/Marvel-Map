// Array with character objects
var characters = ko.observableArray([
        { name: 'Iron Man', id: 1009368, birthPlace: 'Long Island, New York', lat: 40.8413003, lng: -72.9490769 },
        { name: 'Wolverine', id: 1009718, birthPlace: 'Alberta, Canada', lat: 54.4983693, lng: -115.0001885 },
        { name: 'Spider-Man', id: 1009610, birthPlace: 'Forest Hills, New York', lat: 40.722259, lng: -73.844046 },
        { name: '3-D Man', id: 1011334, birthPlace: 'Los Angeles, California', lat: 34.0204989, lng: -118.4117325 },
        { name: 'Captain America', id: 1009220, birthPlace: 'New York, New York', lat: 40.7033127, lng: -73.979681 },
        { name: 'Hulk', id: 1009351, birthPlace: 'Dayton, Ohio', lat: 39.7794904, lng: -84.2021574 },
        { name: 'Black Widow', id: 1009189, birthPlace: 'Stalingrad, Russia', lat: 48.6704194, lng: 44.5067075 },
        { name: 'Red Skull', id: 1009535, birthPlace: 'Germany', lat: 51.1642292, lng: 10.4541193 }
    ]);

ko.applyBindings(characters);