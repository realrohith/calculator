let display = document.querySelector('#screen-current');
let displayLast = document.querySelector('#screen-last');
let numbers = document.querySelectorAll('.num');
let operators = document.querySelectorAll('.ope');
let allNumbers = [];
let allOperators = [];
let latestNumber = display.value;

function add(num1, num2) { return +num1 + +num2; }

function subtract(num1, num2) { return +num1 - +num2; }

function multiply(num1, num2) { return +num1 * +num2; }

function divide(num1, num2) { return +num1 / +num2; }

numbers.forEach(num => {
    num.addEventListener('click', NumberClick);
});

operators.forEach(ope => {
    ope.addEventListener('click', OperatorClick);
});

function operate(operator, num1, num2) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }
    return result;
}

function NumberClick(e) {
    if (display.value == "0") display.value = "";
    display.value += e.target.textContent;
}

function OperatorClick(e) {
    allNumbers[allNumbers.length] = display.value;
    allOperators[allOperators.length] = e.target.textContent;
    displayLast.value = display.value + e.target.textContent;
    if (allNumbers[allNumbers.length - 2]) {
        let result = operate(e.target.textContent, allNumbers[allNumbers.length - 2], allNumbers[allNumbers.length - 1]);
        display.value = result;
    }
    else display.value = "0";
    console.table(allNumbers);
    console.table(allOperators);
}