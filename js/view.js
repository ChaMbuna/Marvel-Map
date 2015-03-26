// flyout menu toggler function
document.getElementById('menu').onclick = function() {
    
    var flyOut = document.getElementById('flyout-menu');
    var className = ' ' + flyOut.className + ' ';

    if ( ~className.indexOf(' hidden ') ) {
        flyOut.className = className.replace(' hidden ', ' ');
    } else {
        flyOut.className += ' hidden';
    }              
}

// variable that stores form to monitor
var clickButton = document.getElementById('form-container');

// event listener for submit button
clickButton.addEventListener('submit', lookup);

// gets character by search
function lookup(event) {
    // prevent default submit action
    event.preventDefault()
    
    // get the value the user typed in the search field
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
        // call function that talks to Marvel & Google
        loadData();
        }
}

// look up character on click from list
function clickedList() {
    // clears currentCharacter object;
    currentCharacter = {};
    // get name for clicked character
    character = this.name;
    // call function that talks to Marvel & Google
    loadData();
}