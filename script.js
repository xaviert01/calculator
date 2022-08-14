const AC = document.getElementById("AC");
const plusMinus = document.getElementById("plus-minus");
const percent = document.getElementById("percent");
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const subtract = document.getElementById("subtract");
const add = document.getElementById("add");
const equals = document.getElementById("equals");
const screen = document.querySelector("#screen > span");
let firstNumber;
let secondNumber;
let functionToExecute;
let error = "";

let calculatorNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let addFunction = (a, b) => a + b;
let subtractFunction = (a, b) => a - b;
let multiplyFunction = (a, b) => a * b;
let divideFunction = (a, b) => {
    if (b === 0) {
        setTimeout(reset, 1000);
        error = "DO NOT DIVIDE BY 0";
    } else {
        return a / b;
    }
}
let reset = () => {
    firstNumber = "";
    secondNumber = "";
    screen.textContent = "";
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

function dotCheck(number, id) {
    let stringArray = Array.from(number);
    if (id === "dot" && stringArray.some(element => element === ".")) {
        return false;
    } else {
        return true;
    }
}

function zeroCheck(number, id) {
    let stringArray = Array.from(number);
    if (id === "zero" && stringArray.length === 1 && stringArray[0] === "0") {
        return false;
    } else {
        return true;
    }
}

function numberAfterZeroCheck(number, id) {
    let stringArray = Array.from(number);
    if (stringArray.length === 1 && stringArray[0] === "0" && id !== "dot") {
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
    if (number.toString().length > 8) {
        let numberShortened;
        numberShortened = number.toExponential(7)
        return numberShortened
    } else {
        return number;
    }
}

function operate(e) {

    if (!(isNaN(Number(document.getElementById(e.target.id).textContent)))) {
        if (functionToExecute === null) {
            if (zeroCheck(firstNumber, e.target.id) && numberAfterZeroCheck(firstNumber, e.target.id)) {
                firstNumber += document.getElementById(e.target.id).textContent;
                screen.textContent = shortenNumber(Number(firstNumber));
            }
        }
        if (functionToExecute !== null) {
            if (zeroCheck(secondNumber, e.target.id) && numberAfterZeroCheck(secondNumber, e.target.id)) {
                secondNumber += document.getElementById(e.target.id).textContent;
                screen.textContent = shortenNumber(Number(secondNumber));
            }
        }
        return;
    }
    if (e.target.id === "equals") {
        if (firstNumber && secondNumber && functionToExecute !== null) {
            firstNumber = Number(firstNumber);
            secondNumber = Number(secondNumber);
            firstNumber = determineFunction();
            secondNumber = "";
            functionToExecute = null;
            if (error) {
                screen.textContent = error;
            } else {
                screen.textContent = roundNumber(firstNumber)
            }
            firstNumber = firstNumber.toString();
        } else {
            reset();
        }
        return;
    }
    if (e.target.id === "AC") {
        reset();
        return;
    }
    if (e.target.id === "plus-minus") {
        if (secondNumber) {
            secondNumber = (secondNumber * (-1));
            screen.textContent = shortenNumber(secondNumber);
            secondNumber = secondNumber.toString();
        } else {
            firstNumber = (firstNumber * (-1));
            screen.textContent = shortenNumber(firstNumber);
            firstNumber = firstNumber.toString();
        }
        return;
    }
    if (e.target.id === "dot") {
        if (secondNumber && dotCheck(secondNumber, e.target.id)) {
            secondNumber = secondNumber += ".";
            screen.textContent = secondNumber;

        } else if (dotCheck(firstNumber, e.target.id)) {
            firstNumber = firstNumber += ".";
            screen.textContent = firstNumber;
        }

        return;
    }
    if (e.target.id === "percent") {
        if (secondNumber) {
            secondNumber = divideFunction(secondNumber, 100);
            screen.textContent = roundNumber(secondNumber);
            secondNumber = secondNumber.toString();

        } else {
            firstNumber = divideFunction(firstNumber, 100);
            screen.textContent = roundNumber(firstNumber);
            firstNumber = firstNumber.toString();
        }
        return;
    }
    else {
        if (firstNumber && !(secondNumber)) {
            functionToExecute = e.target.id;
        }
    }
}


let addListeners = () => {
    document.querySelectorAll("#buttons-left > div > div").forEach(element => {
        element.addEventListener("click", operate)
    });
    document.querySelectorAll("#buttons-right > div").forEach(element => {
        element.addEventListener("click", operate);
    });
}

reset();
addListeners();




