let firstNumber = null;
let secondNumber = null;

add((firstNumber, secondNumber) => firstNumber + secondNumber);
subtract((firstNumber, secondNumber) => firstNumber - secondNumber);
multiply((firstNumber, secondNumber) => firstNumber * secondNumber);
divide((firstNumber, secondNumber) => {
    let result;
    if (secondNumber === 0) {
        result = "ERROR";
    } else {
        result = firstNumber / secondNumber;
    }
    return result;
})


