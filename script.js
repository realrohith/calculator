let display = document.querySelector('#screen-current');
let displayLast = document.querySelector('#screen-last');
let numbers = document.querySelectorAll('.num');
let operators = document.querySelectorAll('.ope');
let buttons = document.querySelectorAll('button');
let del = document.querySelector('#del');
let clear = document.querySelector('#cle');
let equals = document.querySelector('.equ');
let allNumbers = [];
let allOperators = [];

function add(num1, num2) { return +num1 + +num2; }

function subtract(num1, num2) { return +num1 - +num2; }

function multiply(num1, num2) { return +num1 * +num2; }

function divide(num1, num2) {
    if (+num2 == 0) {
        alert("Cannot divide by zero!");
        return;
    }
    return Math.round((+num1 / +num2) * 100) / 100;
}

numbers.forEach(num => {
    num.addEventListener('click', NumberClick);
});

operators.forEach(ope => {
    ope.addEventListener('click', OperatorClick);
});

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        e.target.classList.add('hover');
    });
    btn.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('hover');
    });
});

window.addEventListener('keydown', (e) => {
    const btn = document.querySelector(`button[data-key="${e.key}"]`);
    btn.click();
});

del.addEventListener('click', () => {
    if (display.value == "0") return;
    if (display.value.length == 1) display.value = "0";
    else display.value = display.value.substring(0, display.value.length - 1);
});

clear.addEventListener('click', () => {
    display.value = "0";
    displayLast.value = "";
    allNumbers = [];
    allOperators = [];
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
    if (e.target.textContent == "." && display.value.includes(".")) return;
    display.value += e.target.textContent;
}

equals.addEventListener('click', (e) => {
    if (displayLast.value == "") return;
    allNumbers[allNumbers.length] = display.value;
    allOperators[allOperators.length] = e.target.textContent;
    let result = operate(allOperators[allOperators.length - 2], allNumbers[allNumbers.length - 2], allNumbers[allNumbers.length - 1]);
    clear.click();
    display.value = result;
});

function OperatorClick(e) {
    allNumbers[allNumbers.length] = display.value;
    allOperators[allOperators.length] = e.target.textContent;
    displayLast.value = display.value + e.target.textContent;
    if (allNumbers[allNumbers.length - 2]) {
        let result = operate(allOperators[allOperators.length - 2], allNumbers[allNumbers.length - 2], allNumbers[allNumbers.length - 1]);
        if (result) {
            displayLast.value = result + allOperators[allOperators.length - 1];
            allNumbers[allNumbers.length - 1] = result;
        }
        else clear.click();
    }
    display.value = "0";
}