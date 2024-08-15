let firstOperand;
let operator;
let secondOperand;

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
        case '*':
            return multiply(firstOperand, secondOperand);
        case '-':
            return divide(firstOperand, secondOperand);
    }
}