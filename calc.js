function operate(op, a, b) {
    switch(op) {
    case "+":
        return a + b;
    case "-":
        return a - b;
    case "*":
        return a * b;
    case "/":
        return a / b;
    default:
        return "Error";
    }
}

const display = document.querySelector(".calcBox input");
let newNumber = true;
let storedNum = null;
let operator = "";

function numKeyPressed(event) {
    const keyVal = event.target.textContent;

    if (keyVal === "Back") {
        if (display.value.length > 1) {
            display.value = display.value.substr(0, display.value.length - 1);
        }
        else {
            display.value = "0";
        }

        if (display.value.length === 1 && display.value === "0") {
            newNumber = true;
        }

        return;
    }

    

    if (newNumber) {
        display.value = "";
        newNumber = false;
    }
    display.value += keyVal;
}
/*
Num
-Start a new number if it is requested, otherwise add to the existing one
Math
-Store the number in the display
-Set the operator
-Request new number
Equals
-Operate using the stored number and operator (if they exist)
-Request new number
Num, Math
-Store displayed number, request new number
*/
function opKeyPressed(event) {
    const displayedNum = parseInt(display.value);
    const pressed = event.target.textContent;

    if (pressed === "=") {
        equalsPressed();
        return;
    }

    if (storedNum !== null && operator) {
        const displayedNum = parseInt(display.value);
        let result = operate(operator, storedNum, displayedNum);

        displayResult(result);

        storedNum = result;
        operator = pressed;
        newNumber = true;
        return;
    }

    storedNum = displayedNum;
    operator = pressed;
    newNumber = true;  
}

function equalsPressed() {
    if (storedNum !== null && operator) {
        const displayedNum = parseInt(display.value);
        let result = operate(operator, storedNum, displayedNum);

        displayResult(result);

        operator = "";
        newNumber = true;
    }
}

function clearKeyPressed(event) {
    display.value = "0";
    newNumber = true;
    storedNum = null;
    operator = "";
}

function displayResult(num) {
    
    if (!isFinite(num)) {
        display.value = "Over 9000";
        return;
    }
    if (num.toString().length > 16) {
        display.value = num.toExponential(15);
        return;
    }
    display.value = num.toString();
}

function setup() {
    const numKeys = document.querySelectorAll(".numKey");
    const opKeys = document.querySelectorAll(".opKey");
    const clearKey = document.querySelector(".clearKey");

    for (const key of numKeys) {
        key.addEventListener("click", numKeyPressed);
    }
    for (const key of opKeys) {
        key.addEventListener("click", opKeyPressed);
    }
    clearKey.addEventListener("click", clearKeyPressed);

    display.value = "0";
}

setup();
