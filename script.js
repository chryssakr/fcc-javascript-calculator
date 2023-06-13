const btn = document.querySelectorAll(".btn");

function operators(op, a, b) {
  switch (op) {
    case "+":
      console.log(a, parseFloat(a));
      return parseFloat(a) + parseFloat(b);
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}

var curNumber = 0.0;
var curSum = 0.0;
var curOperator = "";
var heldNumber = 0.0;
var isFloat = false;
var isNegative = false;
var equalPressed = false;

btn.forEach((button) => {
  button.addEventListener("click", function (event) {
    const val = button.value;

    // zeros
    if (document.querySelector("#display").innerHTML === "0") {
      document.querySelector("#display").innerHTML = "";
    }
    if (document.querySelector("#formula").innerHTML === "0") {
      document.querySelector("#formula").innerHTML = "";
    }

    // decimal
    if (val === ".") {
      if (!isFloat) {
        isFloat = true;
        if (curNumber === "0" && curOperator === "") {
          document.querySelector("#formula").innerHTML += "0.";
          document.querySelector("#display").innerHTML = "0.";
        } else if (curNumber === "0" && curOperator != "") {
          document.querySelector("#formula").innerHTML += ".";
          document.querySelector("#display").innerHTML = "0.";
        } else {
          document.querySelector("#formula").innerHTML += ".";
          document.querySelector("#display").innerHTML += ".";
        }
        curNumber = parseFloat(curNumber) + 0.0;
      }
    }

    // operator
    if (
      val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "="
    ) {
      if (val != "=") {
        if (document.querySelector("#formula").innerHTML.match(/[+\-*/]$/)) {
          if (val === "-") {
            isNegative = true;
          } else {
            isNegative = false;
            curOperator = val;
          }
          document.querySelector("#display").innerHTML = val;
        } else if (lastKeyPressed === "=" && val.match(/[+\-*/]/)) {
          heldNumber = curSum;
          console.log(curSum);
        } else if (curOperator != "" && heldNumber != "") {
          curSum = operators(curOperator, heldNumber, curNumber);
          heldNumber = curSum;
          curOperator = val;
        } else if (curOperator === "") {
          // first operator that'll be typed
          heldNumber = curNumber;
          curOperator = val;
          curNumber = 0.0;
        } else if (heldNumber === "") {
          // there was no held number, so no operation for now
          heldNumber = 0.0;
          curOperator = val;
          curNumber = 0.0;
        }
      }
      if (val === "=") {
        curSum = operators(curOperator, heldNumber, curNumber);
        var newCurSum = curSum.toFixed(5).replace(/\.?0+$/, "");
        document.querySelector("#formula").innerHTML += "=" + newCurSum;
        document.querySelector("#display").innerHTML = newCurSum;
        isNegative = false;
      } else {
        document.querySelector("#display").innerHTML = val;
        document.querySelector("#formula").innerHTML += val;
      }
      isFloat = false;
    }

    // numbers
    if (!isNaN(val)) {
      // displaying the number
      if (isNaN(document.querySelector("#display").innerHTML)) {
        document.querySelector("#display").innerHTML = val;
      } else {
        document.querySelector("#display").innerHTML += val;
      }
      curNumber = document.querySelector("#display").innerHTML;
      if (isNegative) {
        curNumber = "-" + curNumber;
      }
      document.querySelector("#formula").innerHTML += val;
    }

    // all clear
    if (val === "AC") {
      curSum = 0.0;
      curNumber = 0.0;
      curOperator = "";
      heldNumber = 0.0;
      isFloat = false;
      isNegative = false;
      document.querySelector("#formula").innerHTML = "";
      document.querySelector("#display").innerHTML = 0;
    }

    var lastKeyPressed = val;
  });
});
