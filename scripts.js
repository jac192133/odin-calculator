// create buttons consts
const main_buttons = document.querySelector('.main-buttons');
const side_buttons = document.querySelector('.side-buttons');
const bottom_buttons = document.querySelector('.bottom-buttons');

// generic function to create button
function createButton(text, location, class_type, set_id) {
    let new_button = document.createElement('button');
    new_button.textContent = text;

    // set class
    new_button.classList.add(class_type);

    // add id
    new_button.setAttribute('id', 'btn-' + text);

    // add btn class and append to location
    new_button.classList.add('btn');
    location.appendChild(new_button);
}

// create and append number buttons
for (let i = 9; i > 0; i--) {
    createButton(i, main_buttons, 'num-btn');
}

// add '0' '.' and '=' buttons
createButton('=', main_buttons, 'spec-btn');
createButton('.', main_buttons, 'spec-btn');
createButton('0', main_buttons, 'num-btn');

// create operation buttons and tag '=' button
const operations = ['÷', 'x', '-', '+'];
for (op in operations) {
    createButton(operations[op], side_buttons, 'op-btn');
}

// create delete, clear buttons
createButton('del', bottom_buttons, 'spec-btn');
createButton('clear', bottom_buttons, 'spec-btn');

// create result-screen
const result_screen = document.querySelector('#result-screen');

// function to update result-screen
let updateScreen = (text) => result_screen.textContent = text;

// function to return result-screen
let returnScreen = () => result_screen.textContent;

// function to add character to result-screen
let addScreen = (text) => updateScreen(returnScreen() + text.toString());

// function to assign eventlistener to button
function assignEvent(unassigned_button, button_function) {
    let button = document.querySelector(unassigned_button); // ex. assignEvent('#del-btn', delFunction)
    button.addEventListener('click', button_function);
}

// define clear button
let clearFunction = () => updateScreen('');
assignEvent('#btn-clear', clearFunction);

// define delete button 
let delFunction = () => updateScreen(returnScreen().slice(0, returnScreen().length -1));
assignEvent('#btn-del', delFunction);

// define num buttons function (add textContent to screen)
document.querySelectorAll('.num-btn').forEach(item => {
    let addChar = () => addScreen(item.textContent);
    assignEvent('#' + item.id, addChar);
});

// function to replace last character in result-screen
function repScreen(text) {
    delFunction();
    addScreen(text);
}

/*
Next steps: 
  - get operation buttons to write char IF there are no other operations and the last char isn't a '.'
  - get the '=' button to parse result-screen string and come up with an answer for the equation
*/