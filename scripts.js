// create main-buttons and side-buttons
const main_buttons = document.querySelector('.main-buttons');
const side_buttons = document.querySelector('.side-buttons');

// generic function to create button
function createButton(text, location, class_type) {
    let new_button = document.createElement('button');
    new_button.innerHTML = text;

    // check if op-btn
    if (class_type == 'op') {
        new_button.classList.add('op-btn');
    } else {}
    new_button.classList.add('btn');
    location.appendChild(new_button);
}

// create and append number buttons
for (let i = 9; i > 0; i--) {
    createButton(i, main_buttons);
}

// add '0' '.' and '=' buttons
createButton('=', main_buttons, 'op');
createButton('.', main_buttons);
createButton('0', main_buttons);

// create operation buttons and tag '=' button
const operations = ['÷', 'x', '-', '+'];
for (op in operations) {
    createButton(operations[op], side_buttons, 'op');
}
