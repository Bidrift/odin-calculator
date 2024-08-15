let firstOperand = null
let operator = null;
let secondOperand = null;

let blocked = false;

const add = (a, b) => (a + b);
const substract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);

function operate(operator, firstOperand, secondOperand) {
    switch (operator) {
        case '+':
            return add(firstOperand, secondOperand);
        case '-':
            return substract(firstOperand, secondOperand);
        case 'x':
            return multiply(firstOperand, secondOperand);
        case '/':
            return divide(firstOperand, secondOperand);
        default:
            throw Error("An unexpected error occured");
    }
}


const nbBtns = document.querySelectorAll(".number-button");
const opBtns = document.querySelectorAll(".operator-button");
const resBtn = document.querySelector("#res-btn");
const clrBtn = document.querySelector("#clr-btn");

const display = document.querySelector(".number-display");
const warningDiv = document.querySelector(".warning-display");

function clearWarning() {
    warningDiv.textContent = "No errors";
    warningDiv.style.visibility = "hidden";
}

function displayWarning(text) {
    warningDiv.textContent = text;
    warningDiv.style.visibility = "visible";
}

function mergeOperands() {
    [firstOperand, secondOperand] = (firstOperand === null)
    ? [secondOperand, null]
    : [operate(operator, firstOperand, secondOperand), null];
    addToDisplay(firstOperand);
}

function addToDisplay(textToAdd) {
    clearWarning();
    if (display.textContent === "0" || secondOperand === null) {
        display.textContent = textToAdd.toString().slice(0, 9);
        return
    }
    if (display.textContent.length >= 9) {
        displayWarning("Maximum reached");
        return;
    }
    display.textContent += textToAdd;
}

nbBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (!blocked) {
            addToDisplay(btn.textContent);
            secondOperand = +display.textContent;
        }
    });
});

opBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (!blocked) {
            mergeOperands();
            operator = btn.textContent;
        }
    })
});

resBtn.addEventListener("click", (e) => {
    if (!blocked) {
        if (operator == "/" && secondOperand === 0) {
            displayWarning("You doin' meth? Reset")
            blocked = true;
            display.textContent = "INF"
        } 
        if (firstOperand && secondOperand && operator) {
            mergeOperands();
            [firstOperand, secondOperand] = [secondOperand, firstOperand];
        }
    }
});

clrBtn.addEventListener("click", (e) => {
    blocked = false;
    secondOperand = null;
    firstOperand = null;
    operator = null;
    display.textContent = "0";
    clearWarning();
})