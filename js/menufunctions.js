// flyout list menu
document.getElementById('menu').onclick = function() {
    
    var flyOut = document.getElementById('flyout-menu');
    var className = ' ' + flyOut.className + ' ';

    if ( ~className.indexOf(' hidden ') ) {
        flyOut.className = className.replace(' hidden ', ' ');
    } else {
        flyOut.className += ' hidden';
    }              
}