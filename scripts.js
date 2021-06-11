class Calculator {
  constructor(previousSumTextElement, currentSumTextElement) {
    this.previousSumTextElement = previousSumTextElement;
    this.currentSumTextElement = currentSumTextElement;
    this.clear();
  }

  clear() {
    this.currentSum = "";
    this.previousSum = "";
    this.operation = undefined;
  }

  delete() {
    this.currentSum = this.currentSum.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentSum.includes(".")) return;
    this.currentSum = this.currentSum.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentSum === "") return;
    if (this.previousSum !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousSum = this.currentSum;
    this.currentSum = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousSum);
    const current = parseFloat(this.currentSum);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentSum = computation;
    this.operation = undefined;
    this.previousSum = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentSumTextElement.innerText = this.getDisplayNumber(
      this.currentSum
    );
    if (this.operation != null) {
      this.previousSumTextElement.innerText = `${this.getDisplayNumber(
        this.previousSum
      )} ${this.operation}`;
    } else {
      this.previousSumTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const ClearButton = document.querySelector("[data-clear]");
const previousSumTextElement = document.querySelector(
  "[data-previous-sum]"
);
const currentSumTextElement = document.querySelector("[data-current-sum]");

const calculator = new Calculator(
  previousSumTextElement,
  currentSumTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

ClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
