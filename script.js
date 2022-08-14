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
let firstNumber = null;
let secondNumber = null;
let functionToExecute;

let calculatorNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let addFunction = (a, b) => a + b;
let subtractFunction = (a, b) => a - b;
let multiplyFunction = (a, b) => a * b;
let divideFunction = (a, b) => {
    let result;
    if (b === 0) {
        result = "ERROR";
    } else {
        result = a / b;
    }
    return result;
}
let reset = () => {
    firstNumber = null;
    secondNumber = null;
    screen.textContent = "";
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

function operate(e) {

    if (!(isNaN(Number(document.getElementById(e.target.id).textContent)))) {
        if (firstNumber === null) {
            firstNumber = Number(document.getElementById(e.target.id).textContent);
            screen.textContent = firstNumber;

        }
        if (firstNumber !== null) {
            secondNumber = Number(document.getElementById(e.target.id).textContent);
            screen.textContent = secondNumber;
        }
        return;
    }
    if (e.target.id === "equals") {
        firstNumber = determineFunction();
        screen.textContent = firstNumber;
        functionToExecute = null;
        return;
    }
    else {
        functionToExecute = e.target.id;
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




