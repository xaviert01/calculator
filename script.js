const screen = document.querySelector("#current-number");
const memory = document.querySelector("#memory");
let firstNumber;
let secondNumber;
let functionToExecute;
let error;

let addFunction = (a, b) => a + b;
let subtractFunction = (a, b) => a - b;
let multiplyFunction = (a, b) => a * b;
let divideFunction = (a, b) => {
    if (b === 0) {
        setTimeout(reset, 1000);
        error = "DIVISION BY 0";
    } else {
        return a / b;
    }
}
function reset() {
    firstNumber = "";
    secondNumber = "";
    screen.textContent = "";
    memory.textContent = "";
    error = "";
    functionToExecute = null;
}

function determineFunction() {
    switch (functionToExecute) {
        case "add":
            return addFunction(firstNumber, secondNumber);
        case "subtract":
            return subtractFunction(firstNumber, secondNumber);
        case "multiply":
            return multiplyFunction(firstNumber, secondNumber);
        case "divide":
            return divideFunction(firstNumber, secondNumber);
    }
}

function showSign() {
    switch (functionToExecute) {
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "*";
        case "divide":
            return "/";
    }
}

// Verify if there already is a dot in the number. 
// Return negative (false) value of check if there is, return positive (true) if there isn't. 
function dotCheck(number) {
    let stringArray = Array.from(number);
    if (stringArray.some(element => element === ".")) {
        return false;
    } else {
        return true;
    }
}

// Verify if user wants to append a digit right after "zero" in the beginning of the number (0X, e.g. 02). 
// Return negative (false) value of check if it's the case, return positive (true) if it isn't. 
function zeroCheck(number) {
    let stringArray = Array.from(number);
    if (stringArray.length === 1 && stringArray[0] === "0") {
        return false;
    } else {
        return true;
    }
}

// Round to nearest integer if a number has 8 digits before a comma,
// Confert to exponential notation if integer has more than 8 digits before a comma, 
// Or otherwise round in a way that at most 8 digits are visible (before and after comma, in total).
function roundNumber(number) {
    let numberRounded;
    let roundTo = 8 - Math.floor(number).toString().length;
    if (roundTo === 0) {
        numberRounded = Math.round(number);
    }
    if (roundTo < 0) {
        numberRounded = number.toExponential(2);
    }
    if (roundTo > 0) {
        numberRounded = (Math.round((number + Number.EPSILON) * (10 ** roundTo)) / (10 ** roundTo));
    }
    return numberRounded;
}

// If number has more than 8 digits, confert it to exponential notation.
function shortenNumber(number) {
    if (number.length > 8) {
        let numberShortened;
        numberShortened = Number(number).toExponential(7)
        return numberShortened
    } else {
        return number;
    }
}

function showMemory() {
    memory.textContent = shortenNumber(firstNumber) + " " + showSign();
}

function compute() {
    if (firstNumber && secondNumber && functionToExecute !== null) {
        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);
        firstNumber = determineFunction();
        secondNumber = "";
        functionToExecute = null;
        memory.textContent = "";
        if (error) {
            screen.textContent = error;
        } else {
            screen.textContent = roundNumber(firstNumber)
        }
        firstNumber = firstNumber.toString();
    } else {
        reset();
    }
}

function switchPlusMinus() {
    if (secondNumber && !(isNaN(secondNumber))) {
        secondNumber = (secondNumber * (-1)).toString();
        screen.textContent = shortenNumber(secondNumber);
    } else if (firstNumber && !(isNaN(firstNumber))) {
        firstNumber = (firstNumber * (-1)).toString();
        screen.textContent = shortenNumber(firstNumber);
    }
}

function addDot() {
    if (secondNumber && dotCheck(secondNumber)) {
        secondNumber = secondNumber += ".";
        screen.textContent = secondNumber;

    } else if (dotCheck(firstNumber) && !(secondNumber)) {
        firstNumber = firstNumber += ".";
        screen.textContent = firstNumber;
    }
}

function toPercent() {
    if (secondNumber && !(isNaN(secondNumber))) {
        secondNumber = divideFunction(secondNumber, 100);
        screen.textContent = roundNumber(secondNumber);
        secondNumber = secondNumber.toString();

    } else if (firstNumber && !(isNaN(firstNumber))) {
        firstNumber = divideFunction(firstNumber, 100);
        screen.textContent = roundNumber(firstNumber);
        firstNumber = firstNumber.toString();
    }
}

function removeLastDigit() {
    if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        screen.textContent = shortenNumber(secondNumber);

    } else {
        secondNumber = "";
        functionToExecute = null;
        memory.textContent = "";
        if (firstNumber) {
            firstNumber = firstNumber.slice(0, -1);
            screen.textContent = shortenNumber(firstNumber);
        }
    }
}

function setFunctionToExecute(key) {
    switch (key) {
        case "+":
            functionToExecute = "add";
            break;
        case "-":
            functionToExecute = "subtract";
            break;
        case "*":
            functionToExecute = "multiply";
            break;
        case "/":
            functionToExecute = "divide";
            break;
    }
}

function appendDigitKeyboard(key) {
    if (functionToExecute === null && zeroCheck(firstNumber)) {
        firstNumber += key;
        screen.textContent = shortenNumber(firstNumber);
    }
    if (functionToExecute !== null && zeroCheck(secondNumber)) {
        secondNumber += key;
        screen.textContent = shortenNumber(secondNumber);
        showMemory();
    }
}

function appendDigitTouch(id) {
    if (functionToExecute === null && zeroCheck(firstNumber)) {
        firstNumber += document.getElementById(id).textContent;
        screen.textContent = shortenNumber(firstNumber);
    }
    if (functionToExecute !== null && zeroCheck(secondNumber)) {
        secondNumber += document.getElementById(id).textContent;
        screen.textContent = shortenNumber(secondNumber);
        showMemory();
    }

}

function operateTouch(e) {

    if (!(isNaN(Number(document.getElementById(e.target.id).textContent)))) {
        appendDigitTouch(e.target.id);
        return;
    }
    if (e.target.id === "equals") {
        compute();
        return;
    }
    if (e.target.id === "AC") {
        reset();
        return;
    }
    if (e.target.id === "plus-minus") {
        switchPlusMinus();
        return;
    }
    if (e.target.id === "dot") {
        addDot()
        return;
    }
    if (e.target.id === "percent") {
        toPercent();
        return;
    }
    if (e.target.id === "backspace") {
        removeLastDigit();
        return;
    }
    else {
        if (firstNumber && !(isNaN(firstNumber)) && !(secondNumber)) {
            functionToExecute = e.target.id;
        }
    }
}

function operateKeyboard(e) {

    if (!(isNaN(Number(e.key)))) {
        appendDigitKeyboard(e.key);
        return;
    }
    if (e.key === "=" || e.key === "Enter") {
        compute();
        return;
    }
    if (e.key === ".") {
        addDot();
        return;
    }
    if (e.key === "%") {
        toPercent();
        return;
    }
    if (e.key === "Backspace") {
        removeLastDigit();
        return;
    }
    if (e.key === "Escape") {
        reset();
        return;
    }
    else {
        if (firstNumber && !(isNaN(firstNumber)) && !(secondNumber)) {
            setFunctionToExecute(e.key);
        }
    }
}

function addTouchListeners() {
    document.querySelectorAll("#buttons-left > div > div").forEach(element => {
        element.addEventListener("click", operateTouch)
    });
    document.querySelectorAll("#buttons-right > div").forEach(element => {
        element.addEventListener("click", operateTouch);
    });
}

function addKeyboardListeners() {
    document.addEventListener("keydown", operateKeyboard);
}

reset();
addTouchListeners();
addKeyboardListeners();
