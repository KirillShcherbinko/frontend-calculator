import '../pages/index.css';
import { evaluate } from "mathjs";
import { Expression } from './Expression';

const expression = new Expression();
const buttons = document.querySelectorAll(".calculator__button");

buttons.forEach(button => {
  const symbol = button.textContent;
  if (symbol === "c") {
    button.addEventListener("click", evt => {
      expression.deleteExpression()
    })
  } else if (symbol === "←") {
    express
  } else if (symbol === "=") {

  } else {

  }
})

console.log(evaluate("(9)e"))