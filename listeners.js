//remove focus on nav links when clicked
var buttons = document.getElementsByClassName('pure-menu-link');
Array.from(buttons).forEach(x => x.addEventListener('click', () => x.blur()));
