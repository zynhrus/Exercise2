const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  //   const displayValue = calculator.displayValue

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    if (displayValue === "0") {
      calculator.displayValue = digit;
    } else {
      calculator.displayValue = displayValue + digit;
      //   calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) return;

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function plusMinus() {
  if (calculator.displayValue != "0") {
    calculator.displayValue *= -1;
  }
}

function inputPercent() {
  if (calculator.displayValue != "0") {
    calculator.displayValue /= 100;
  }
}

function backSpace() {
  if (calculator.displayValue != "0") {
    calculator.displayValue = calculator.displayValue.slice(0, -1);
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector(".hasil");
  display.value = calculator.displayValue;
}

const keys = document.querySelector(".tombol");
keys.addEventListener("click", event => {
  const { target } = event;
  //   const target = event.target;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("perhitungan")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("plus-minus")) {
    plusMinus(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("percent")) {
    inputPercent(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("delete")) {
    backSpace(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  //   console.log("digit", target.value);
  inputDigit(target.value);
  updateDisplay();
});

updateDisplay();
