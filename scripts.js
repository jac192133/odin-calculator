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

// create '=' button separately because of css issues
let equals_button = document.createElement('button');
equals_button.classList.add('spec-btn');
equals_button.classList.add('btn');
equals_button.textContent = '=';
equals_button.setAttribute('id', 'btn-equals');
main_buttons.appendChild(equals_button);

// add '0' and '.'
createButton('.', main_buttons, 'spec-btn');
createButton('0', main_buttons, 'num-btn');

// create operation buttons separately because of CSS issues
function createOpButton(sign, id) {
    let new_op_button = document.createElement('button');
    new_op_button.classList.add('op-btn');
    new_op_button.classList.add('btn');
    new_op_button.textContent = sign;
    new_op_button.setAttribute('id', 'btn-' + id);
    side_buttons.appendChild(new_op_button);
}

// ÷ divide, x multiply, - subtract, + add
createOpButton('÷', 'divide');
createOpButton('x', 'multiply');
createOpButton('-', 'subtract');
createOpButton('+', 'add');

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

// function to get last character in result-screen
let lastScreen = () => returnScreen()[returnScreen().length-1];

/*
This next part solves an equation string.
*/

// function returns true if char is operator, false if not
function isOperator(char) {
    const operators = ['+', '-', 'x', '÷'];
    if (operators.includes(char)) {
        return true;
    } else {
        return false;
    }
}

// function to parse equation
function equationParser(eq) {

    // function to operate via operator char
    function operate(num1, op_char, num2) {

        // make sure numbers
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        if (op_char == '+') {
            return num1 + num2;
        } else if (op_char == '-') {
            return num1 - num2;
        } else if (op_char == 'x') {
            return num1 * num2;
        } else {
            return (num1 / num2.toFixed(2));
        }
    }

    // set up equation holder object
    let equation = {
        nums: [],
        ops: [],

        // object method to solve equation
        solve: function() {
            let result = this.nums[0];

            // op[0] -> num[1] x result, op[1] -> 
            let o = 0;
            for (let n = 1; n < this.nums.length; n++) {

                // prevent dividing by 0
                if ((result == 0) && (this.ops[o] == '÷') && (this.nums[n] == 0)) {
                    return "Stop it! No 0÷0!";
                    n = this.nums.length;
                } else {
                    result = operate(result, this.ops[o], this.nums[n]);
                    o += 1;
                }
            }
            // see if result is too big
            if (result.toString().length > 5) {
                return("too big for the screen!");
            } else {
                return result;
            }
        }
    }

    // hold num until op, then push nums
    let num_holder = '';
    for (let i = 0; i < eq.length; i++) {

        // check if num, if so, hold
        if (!(isOperator(eq[i]))) {

            // hold num
            num_holder += eq[i];

            // push if last number
            if (eq.substring(i).length == 1) {
                equation.nums.push(num_holder);
            } else {}
        }

        // if '-' and no num before that, and '-' not in num_holder
        else if ((i.textContent == '-') && (num_holder.length == 0)) {
            num_holder += i;
            console.log(i);
        } // DOESN'T WORK

        // if op, push held num, push op
        else {

            // push held num, reset holder
            equation.nums.push(num_holder);
            num_holder = '';

            // push op
            equation.ops.push(eq[i]);
        }
    }
    // return equation object
    return equation.solve();
}

/*
operation and special buttons
also, an easy way to limit multiplecation spill,
would be to figure out the smallest amount of...
99999*99999*99999 = 999,700,029,999 (15-12 digits...)
*/

// define '=' button
function eqFunction() {

    // check if last character is an op; if so, delete it
    if (isOperator(lastScreen())) {
        delFunction();
    } else {} // else: continue

    // run eqationParser and set result screen equal to it
    updateScreen(equationParser(returnScreen()));
}
assignEvent('#btn-equals', eqFunction);

// define op buttons
document.querySelectorAll('.op-btn').forEach(item => {
    function opFunction() {

        // check if last char is already an operator
        if (isOperator(lastScreen())) {}

        // check if result-screen blank to avoid starting with operator
        else if (returnScreen() == '') {}

        // else, add op to result-screen
        else {
            addScreen(item.textContent);
        }
    }

    // assign function to button
    console.log('#' + item.id);
    assignEvent('#' + item.id, opFunction);
});

/*

Issues remaining: 
  - except for '-': need to support negative numbers as well
  - could also tweak the ÷ result to show amount of characters = total answer like 15 chars instead of 2 decimal places
  - the whole '.' topic...
  - prevent spill-over from just entered equation
*/ 