const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
    if (operator === '+') {
        return add(a, b);
    }
    if (operator === '-') {
        return subtract(a, b);
    }
    if (operator === '*') {
        return multiply(a, b);
    }
    if (operator === '/') {
        return divide(a, b);
    }
}

const calculatorDisplay = document.querySelector('#calculator-display');
// Set initial display value to 0
setDisplayValue(calculatorDisplay, 0)

let storedValue = '';
let currentValue = '';
let storedOperator = '';
let displayValue = '';
let operated = false;

const numberButtons = document.querySelectorAll('.num-buttons');
const operatorButtons = document.querySelectorAll('.op-buttons');
const decimalbutton = document.querySelector('.num-buttons.decimal');
const clearButton = document.querySelector('#clear');
const equalsButton = document.querySelector('#equals');
const backspaceButton = document.querySelector('#backspace');

backspaceButton.addEventListener('click', (e) => {
    if (currentValue === '0') {
        return;
    }
    currentValue = currentValue.length === 1 ? '' : currentValue.slice(0, -1);
    setDisplayValue(calculatorDisplay, currentValue);
});

clearButton.addEventListener('click', (e) => {
    setDisplayValue(calculatorDisplay, 0);
    storedValue = '';
    currentValue = '';
    storedOperator = '';
    displayValue = '';
    operated = false;
});

equalsButton.addEventListener('click', (e) => {
    if (!currentValue || !storedValue || !storedOperator) {
        return;
    }
    evaluateExpression(storedOperator, currentValue, storedValue, e);
    operated = false;
    return;
});

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        decimalbutton.disabled = currentValue.includes('.');
        currentValue += e.target.id;
        setDisplayValue(calculatorDisplay, currentValue);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (!operated) {
            operated = true;
            storedValue = storedValue === '' ? currentValue : storedValue;
            storedOperator = e.target.id;
            currentValue = '';
        }
        if (operated && storedValue && currentValue) {
            evaluateExpression(storedOperator, currentValue, storedValue, e);
        }
    });
});

function evaluateExpression(operator, currentVal, storedVal, e) {
    if (operator === '/' && !+currentVal) {
        alert('Cannot divide by 0');
        return;
    }
    storedValue = '' + Number(Math.round(operate(operator, +storedVal, +currentVal) + 'e' + 10) + 'e-' + 10);
    currentValue = '';
    storedOperator = e.target.id;
    setDisplayValue(calculatorDisplay, storedValue);
}

function setDisplayValue(displayElement, value) {
    value = value === '' ? 0 : value;
    const displayedValue = displayElement.firstChild;
    if (displayedValue) {
        displayedValue.textContent = value;
    }
    if (!displayedValue) {
        const newValue = document.createTextNode(value);
        displayElement.appendChild(newValue);        
    }
}
