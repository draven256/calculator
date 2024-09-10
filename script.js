function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function round(num) {
  return Math.round(num * 1000) / 1000;
}

function eNotation(num) {
  if (num <= 999999999) {
    return num;
  } else {
    return num.toExponential(3);
  }
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      display.textContent = eNotation(round(add(num1, num2)));
      break;

    case "-":
      display.textContent = eNotation(round(subtract(num1, num2)));
      break;

    case "×":
      display.textContent = eNotation(round(multiply(num1, num2)));
      break;

    case "÷":
      let division = divide(num1, num2);
      if (division === Infinity) display.textContent = "Undefined";
      else display.textContent = eNotation(round(division));
      break;
    default:
      display.textContent = eNotation(round(num2));
      break;
  }
}

const display = document.querySelector("#display");

const numButtonArray = document.querySelectorAll("#nums button, .num");
numButtonArray.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent.length < 9 || operatorRightBefore) {
      if (operatorRightBefore || start) {
        display.textContent = button.textContent;
        operatorRightBefore = false;
        start = false;
      } else {
        if (display.textContent === "-0")
          display.textContent = `-${button.textContent}`;
        else {
          display.textContent += button.textContent;
        }
        test1 = display.textContent;
      }
      updateExpressionArr();
    }
  });
});

const operatorButtonArray = document.querySelectorAll("#right > button");
operatorButtonArray.forEach((button) => {
  button.addEventListener("click", () => {
    if (!operatorRightBefore) {
      // For multi-operator expressions
      operate(+num1, +display.textContent, operator);
    }
    num1 = display.textContent;
    operator = button.textContent;
    operatorRightBefore = true;

    arr = [num1, operator, "", ""];
  });
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
  operate(+num1, +display.textContent, operator);
  num1 = display.textContent;
  operator = null;
  operatorRightBefore = true;

  arr[3] = "=";
});

const decimalPointButton = document.querySelector("#decimal-point");
decimalPointButton.addEventListener("click", () => {
  if (!display.textContent.includes(".") && display.textContent.length < 9) {
    if (operatorRightBefore == false) {
      display.textContent += ".";
    } else {
      display.textContent = "0.";
    }
    operatorRightBefore = false;
    start = false;
    updateExpressionArr();
  }
});

const negationButton = document.querySelector("#negation");
negationButton.addEventListener("click", () => {
  if (operatorRightBefore || start) {
    display.textContent = "-0";
    operatorRightBefore = false;
    start = false;
  } else if (display.textContent.includes("-")) {
    display.textContent = display.textContent.slice(1);
  } else {
    let arr = display.textContent.split("");
    arr.unshift("-");
    display.textContent = arr.join("");
  }
  // EXPRESSION DISPLAY
  updateExpressionArr();
});

const clearEntryButton = document.querySelector("#clear-entry");
clearEntryButton.addEventListener("click", () => {
  if (display.textContent.length === 1) display.textContent = "0";
  else display.textContent = display.textContent.slice(0, -1);
  // EXPRESSION DISPLAY
  updateExpressionArr();
});

const allClearButton = document.querySelector("#all-clear");
allClearButton.addEventListener("click", allClear);

function allClear() {
  display.textContent = "0";

  num1 = 0;
  operator = null;

  start = true;
  operatorRightBefore = false;

  arr = [];
}

const percentButton = document.querySelector("#percent");
percentButton.addEventListener("click", () => {
  display.textContent = display.textContent / 100;
  updateExpressionArr();
});

let memory = 0;
let memoryClear = false;

const memoryAdd = document.querySelector("#memory-add");
memoryAdd.addEventListener("click", () => (memory += +display.textContent));

const memorySub = document.querySelector("#memory-sub");
memorySub.addEventListener("click", () => (memory -= +display.textContent));

const mrc = document.querySelector("#memory-read-clear");
mrc.addEventListener("click", () => (display.textContent = memory));
mrc.addEventListener("dblclick", () => (memory = 0));

let num1;
let operator;
let start;
let operatorRightBefore;

// EXPRESSION DISPLAY //
let exp = document.querySelector("#expression");

let arr;

allClear();

function updateExpression(array) {
  exp.textContent = array.join(" ");
}

function updateExpressionArr() {
  if (operator === null) {
    arr[0] = display.textContent;
    arr[1] = "";
    arr[2] = "";
  } else {
    arr[2] = display.textContent;
  }
  arr[3] = "";
}

calculatorBody = document.querySelector("#calculator-body");
calculatorBody.addEventListener("click", () => {
  updateExpression(arr);
});
