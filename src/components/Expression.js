import { ExpressionValidator } from "./ExpressionValidator";

export class Expression {

  constructor() {
    this.expression = "";
    this.openedBracketCnt = 0;
  }

  setExpression(expression) {
    this.expression = expression;
  }

  getExpression() {
    return this.expression;
  }

  setOpenedBracketCnt(openedBracketCnt) {
    this.openedBracketCnt = openedBracketCnt;
  }

  getOpenedBracketCnt() {
    return this.openedBracketCnt;
  }

  // Получение последнего символа
  getLastSymbol() {
    if (!this.expression) return ""
    return this.expression[this.expression.length - 1];
  }

  // Добавление символа
  addSymbol(newSymbol) {
    const lastSymbol = this.getLastSymbol();
    console.log(newSymbol);
    // Выбор скобки, если нажата кнопка "()"
    if (newSymbol === "()") {
      newSymbol = ExpressionValidator.getValidBracket(this.openedBracketCnt, lastSymbol);
      
      // Изменение счётчика открытых скобок
      if (newSymbol === "(") this.openedBracketCnt++;
      else if (newSymbol === ")" && this.openedBracketCnt > 0) this.openedBracketCnt--;
    }

    // Проверки и преобразования выражений
    if (ExpressionValidator.isValidOperator(newSymbol, lastSymbol)) this.deleteLastSymbol();
    if (ExpressionValidator.isValidBracketOperator(newSymbol, lastSymbol)) newSymbol = "";
    if (ExpressionValidator.isValidConstMultiplication(newSymbol, lastSymbol)) this.expression += "*";
    if (!ExpressionValidator.isValidFractionalNumber(this.expression, newSymbol, lastSymbol)) newSymbol = "";
    if (ExpressionValidator.isValidSqrtGetting(this.openedBracketCnt, newSymbol, lastSymbol)) newSymbol = "^0.5";
    if (!ExpressionValidator.isValidOperatorLocation(newSymbol, lastSymbol)) newSymbol = "";

    // Добавление нового символа к выражению
    this.expression += newSymbol;

    console.log(this.expression);
    return this.expression;
  }

  // Удаление символа
  deleteLastSymbol() {
    const lastSymbol = this.getLastSymbol();

    // Изменяем число незакрытых скобок
    if (lastSymbol === "(") this.openedBracketCnt--;
    else if (lastSymbol === ")") this.openedBracketCnt++;

    this.expression = this.expression.slice(0, -1);
    return this.expression;
  }
  
  // Очистка выражения
  deleteExpression() {
    this.expression = "";
    this.openedBracketCnt = 0;
  }

  // Валидация регулярного выражения
  validateExpression() {
    // Регулярное выражение для символов
    const invalidCharsRegex = /[^0-9eπ+\-*÷^().]/;
    const operandRegex = /[0-9eπ]/;
    
    // Проверка на незакрытые скобки
    if (this.openedBracketCnt !== 0) {
      throw new Error("Неверный формат скобок");
    }
  
    // Проверка деления на 0
    if (this.expression.includes("÷0")) {
      throw new Error("Нельзя делить на 0");
    }

    if (!operandRegex.test(this.expression)) {
      throw new Error("В выражении должны быть числа");
    }
  
    // Проверка на недопустимые символы
    if (invalidCharsRegex.test(this.expression)) {
      throw new Error("Недопустимые символы");
    }
  
    // Если никаких ошибок не найдено, возвращаем регулярное выражение
    return this.expression;
  }
}
