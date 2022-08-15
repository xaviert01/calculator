const screen = document.querySelector("#screen");
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
    if (number.length > 8) {
        let numberShortened;
        numberShortened = Number(number).toExponential(7)
        return numberShortened
    } else {
        return number;
    }
}

function operateTouch(e) {

    if (!(isNaN(Number(document.getElementById(e.target.id).textContent)))) {
        if (functionToExecute === null) {
            if (zeroCheck(firstNumber, e.target.id) && numberAfterZeroCheck(firstNumber, e.target.id)) {
                firstNumber += document.getElementById(e.target.id).textContent;
                screen.textContent = shortenNumber(firstNumber);
            }
        }
        if (functionToExecute !== null) {
            if (zeroCheck(secondNumber, e.target.id) && numberAfterZeroCheck(secondNumber, e.target.id)) {
                secondNumber += document.getElementById(e.target.id).textContent;
                screen.textContent = shortenNumber(secondNumber);
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
            secondNumber = (secondNumber * (-1)).toString();
            screen.textContent = shortenNumber(secondNumber);
        } else {
            firstNumber = (firstNumber * (-1)).toString();
            screen.textContent = shortenNumber(firstNumber);
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
    if (e.target.id === "backspace") {
        if (secondNumber) {
            secondNumber = secondNumber.slice(0, -1);
            screen.textContent = shortenNumber(secondNumber);

        } else {
            if (firstNumber) {
                firstNumber = firstNumber.slice(0, -1);
                screen.textContent = shortenNumber(firstNumber);
            }
        }
        return;
    }
    else {
        if (firstNumber && !(secondNumber)) {
            functionToExecute = e.target.id;
        }
    }
}

function operateKey(e) {

    if (!(isNaN(Number(e.key)))) {
        if (functionToExecute === null) {
            if (zeroCheck(firstNumber, e.key) && numberAfterZeroCheck(firstNumber, e.key)) {
                firstNumber += e.key;
                screen.textContent = shortenNumber(firstNumber);
            }
        }
        if (functionToExecute !== null) {
            if (zeroCheck(secondNumber, e.key) && numberAfterZeroCheck(secondNumber, e.key)) {
                secondNumber += e.key;
                screen.textContent = shortenNumber(secondNumber);
            }
        }
        return;
    }
    if (e.key === "=") {
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
    if (e.key === ".") {
        if (secondNumber && dotCheck(secondNumber, e.key)) {
            secondNumber = secondNumber += ".";
            screen.textContent = secondNumber;

        } else if (dotCheck(firstNumber, e.key)) {
            firstNumber = firstNumber += ".";
            screen.textContent = firstNumber;
        }

        return;
    }
    if (e.key === "%") {
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
    if (e.key === "Backspace") {
        if (secondNumber) {
            secondNumber = secondNumber.slice(0, -1);
            screen.textContent = shortenNumber(secondNumber);

        } else {
            if (firstNumber) {
                firstNumber = firstNumber.slice(0, -1);
                screen.textContent = shortenNumber(firstNumber);
            }
        }
        return;
    }
    else {
        if (firstNumber && !(secondNumber)) {

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
    document.addEventListener("keydown", operateKey);
}


reset();
addTouchListeners();
addKeyboardListeners();




