import '../pages/index.css';
import { evaluate } from "mathjs";
import { Expression } from './Expression';
import { loadState, saveState } from './storage';

const expression = new Expression();

const buttons = document.querySelectorAll(".calculator__button");

const inputElement = document.querySelector(".calculator__input");
const errorMessageElement = document.querySelector(".calculator__error-message");

const lastData = loadState();

expression.setExpression(lastData.expression);
expression.setOpenedBracketCnt(lastData.openedBracketCnt);

inputElement.textContent = lastData.expression;
errorMessageElement.textContent = lastData.errorMessage;

buttons.forEach(button => {
  const symbol = button.textContent;
  // Очистка поля
  if (symbol === "c") {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      expression.deleteExpression();
      inputElement.textContent = "";
      saveState({expression: "", openedBracketCnt: 0, errorMessage: ""});
    });

  // Удаление последнего символа
  } else if (symbol === "←") {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      inputElement.textContent = expression.deleteLastSymbol();
      saveState({
        expression: expression.getExpression(), 
        openedBracketCnt: expression.getOpenedBracketCnt(), 
        errorMessage: ""
      });
    });

  // Вычисление значения
  } else if (symbol === "=") {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      try {
        // Получение выражения
        let curExpression = expression.validateExpression();

        // Преобразование выражения к необходимому виду
        curExpression = curExpression.replace(/÷/g, "/");
        curExpression = curExpression.replace(/π/g, "pi");

        // Получение результата
        const result = evaluate(curExpression);
        inputElement.textContent = result;

        // Обновление полей объекта новыми значениями
        expression.setExpression(result);
        expression.setOpenedBracketCnt(0);

        saveState({
          expression: result, 
          openedBracketCnt: 0, 
          errorMessage: ""
        });
      } catch(err) {
        const errorMessage = /[а-яА-ЯёЁ]/.test(err.messge) ? err.message : "Неверный формат";
        errorMessageElement.textContent = errorMessage;
        saveState({
          expression: expression.getExpression(), 
          openedBracketCnt: expression.getOpenedBracketCnt(), 
          errorMessage
        });      
      }
    });

  // Добавление символа
  } else {
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      errorMessageElement.textContent = "";
      inputElement.textContent = expression.addSymbol(symbol);
      inputElement.scrollLeft = inputElement.scrollWidth;
      saveState({
        expression: expression.getExpression(), 
        openedBracketCnt: expression.getOpenedBracketCnt(), 
        errorMessage: ""
      });
    });
  }
})

console.log(evaluate("1.e9"))