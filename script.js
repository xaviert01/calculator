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
let reset = () => {
    firstNumber = "";
    secondNumber = "";
    screen.textContent = "";
    memory.textContent = "";
    error = "";
    functionToExecute = null;
}

let determineFunction = () => {
    if (functionToExecute === "add") {
        return addFunction(firstNumber, secondNumber);
    }
    if (functionToExecute === "subtract") {
        return subtractFunction(firstNumber, secondNumber);
    }
    if (functionToExecute === "multiply") {
        return multiplyFunction(firstNumber, secondNumber);
    }
    if (functionToExecute === "divide") {
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
            break;
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

function operateTouch(e) {

    if (!(isNaN(Number(document.getElementById(e.target.id).textContent)))) {
        if (functionToExecute === null && zeroCheck(firstNumber)) {
            firstNumber += document.getElementById(e.target.id).textContent;
            screen.textContent = shortenNumber(firstNumber);
        }
        if (functionToExecute !== null && zeroCheck(secondNumber)) {
            secondNumber += document.getElementById(e.target.id).textContent;
            screen.textContent = shortenNumber(secondNumber);
            showMemory();
        }
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
        if (functionToExecute === null && zeroCheck(firstNumber)) {
            firstNumber += e.key;
            screen.textContent = shortenNumber(firstNumber);
        }
        if (functionToExecute !== null && zeroCheck(secondNumber)) {
            secondNumber += e.key;
            screen.textContent = shortenNumber(secondNumber);
            showMemory();
        }
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

            if (e.key === "+") {
                functionToExecute = "add";
            }

            if (e.key === "-") {
                functionToExecute = "subtract";
            }

            if (e.key === "*") {
                functionToExecute = "multiply";
            }

            if (e.key === "/") {
                functionToExecute = "divide";
            }
        }
    }
}


let addTouchListeners = () => {
    document.querySelectorAll("#buttons-left > div > div").forEach(element => {
        element.addEventListener("click", operateTouch)
    });
    document.querySelectorAll("#buttons-right > div").forEach(element => {
        element.addEventListener("click", operateTouch);
    });
}

let addKeyboardListeners = () => {
    document.addEventListener("keydown", operateKeyboard);
}


reset();
addTouchListeners();
addKeyboardListeners();




