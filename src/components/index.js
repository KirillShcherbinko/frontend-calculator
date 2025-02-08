import '../pages/index.css';
import { evaluate } from "mathjs";
import { Expression } from './Expression';

const expression = new Expression();
const buttons = document.querySelectorAll(".calculator__button");

const inputElement = document.querySelector(".calculator__input");
const errorMessageElement = document.querySelector(".calculator__error-message");

buttons.forEach(button => {
  const symbol = button.textContent;
  // Очистка поля
  if (symbol === "c") {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      expression.deleteExpression();
      inputElement.textContent = "";
    })

  // Удаление последнего символа
  } else if (symbol === "←") {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      inputElement.textContent = expression.deleteLastSymbol();
    })
  // Вычисление значения
  } else if (symbol === "=") {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      try {
        let curExpression = expression.validateExpression();

        curExpression = curExpression.replace(/÷/g, "/");
        curExpression = curExpression.replace(/π/g, "pi");

        console.log(curExpression);

        const result = evaluate(curExpression);
        inputElement.textContent = result;

        expression.expression = result;
        expression.openedBracketCnt = 0;
      } catch(err) {
        errorMessageElement.textContent = err.message || "Неверный формат";
      }
    })

  // Добавление символа
  } else {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      inputElement.textContent = expression.addSymbol(symbol);
      inputElement.scrollLeft = inputElement.scrollWidth;
    })
  }
})

console.log(evaluate("1.e9"))