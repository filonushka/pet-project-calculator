const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const decimalBtn = document.getElementById("decimal");
const sqrtBtn = document.getElementById("sqrt");
const negNumBtn = document.getElementById("neg-btn");
const clearBtns = document.querySelectorAll(".clear-btn");
const resultBtn = document.getElementById("result");
const display = document.getElementById("display");

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = "";

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.innerText);
  });
}

for (let i = 0; i < operations.length; i++) {
  let operationBtn = operations[i];
  operationBtn.addEventListener("click", function (e) {
    operation(e.target.innerText);
  });
}

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function (e) {
    clear(e.target.id);
  });
}

decimalBtn.addEventListener("click", decimal);
sqrtBtn.addEventListener("click", sqrtPress);
negNumBtn.addEventListener("click", negNumPress);

// ---------
function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operation(symbol) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === "+") {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "-") {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "*") {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "/") {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "^") {
      MemoryCurrentNumber **= parseFloat(localOperationMemory);
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = symbol;
  }
}

function clear(id) {
  if (id === "ce") {
    display.value = "0";
    MemoryNewNumber = true;
  } else if (id === "c") {
    display.value = "0";
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = "";
  }
}

function decimal(arg) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = "0.";
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf(".") === -1) {
      localDecimalMemory += ".";
    }
  }
  display.value = localDecimalMemory;
}

function sqrtPress() {
  if (display.value.includes("-")) {
    MemoryCurrentNumber = "Error";
  } else {
    display.value = Math.sqrt(+display.value);
    MemoryCurrentNumber = display.value;
    MemoryNewNumber = false;
  }
  display.value = MemoryCurrentNumber;
}

function negNumPress() {
  let localNegNumMemory = display.value;

  if (MemoryNewNumber) {
    localNegNumMemory = "-";
    MemoryNewNumber = false;
  } else {
    if (localNegNumMemory.indexOf("-") === -1) {
      localNegNumMemory += "-";
    }
  }
  display.value = localNegNumMemory;
  console.log("negNum");
}
