let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button));
});

function handleButtonClick(button) {
    const digit = button.dataset.digit;
    const operator = button.dataset.operator;

    if (digit !== undefined) appendDigit(digit);
    else if (operator !== undefined) chooseOperator(operator);
    else if (button.id === "equals") evaluate();
    else if (button.id === "clear") clear();
    else if (button.id === "backspace") backspace();
    else if (button.id === "decimal") addDecimal();
}

function appendDigit(digit) {
    if (shouldResetDisplay) resetDisplay();
    if (display.textContent === "0") {
        display.textContent = digit;
    } else {
        display.textContent += digit;
    }
}

function chooseOperator(operator) {
    if (currentOperator !== null) {
        evaluate();
        display.textContent += ` ${operator} `;
    } else {
        firstNumber = parseFloat(display.textContent);
        display.textContent += ` ${operator} `;
    }
    currentOperator = operator;
    shouldResetDisplay = false;
}

function evaluate() {
    const parts = display.textContent.split(` ${currentOperator} `);
    if (parts.length < 2 || !currentOperator) return;

    firstNumber = parseFloat(parts[0]);
    secondNumber = parseFloat(parts[1]);

    if (currentOperator === "/" && secondNumber === 0) {
        display.textContent = "Error!";
        firstNumber = null;
        currentOperator = null;
        return;
    }

    const result = roundResult(operate(currentOperator, firstNumber, secondNumber));
    display.textContent = result;
    firstNumber = result;
    currentOperator = null;
    shouldResetDisplay = true;
}

function addDecimal() {
    const parts = display.textContent.split(` ${currentOperator} `);
    const currentInput = shouldResetDisplay ? "" : parts[parts.length - 1];
    if (!currentInput.includes(".")) {
        display.textContent += ".";
    }
    shouldResetDisplay = false;
}

function backspace() {
    if (shouldResetDisplay) {
        resetDisplay();
        return;
    }
    display.textContent = display.textContent.slice(0, -1) || "0";
}

function clear() {
    display.textContent = "0";
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    shouldResetDisplay = false;
}

function resetDisplay() {
    display.textContent = "";
    shouldResetDisplay = false;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return null;
    }
}
