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
