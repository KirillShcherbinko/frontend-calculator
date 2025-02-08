import { ExpressionValidator } from "./ExpressionValidator";

export class Expression {

  constructor() {
    this.expression = "";
    this.openedBracketCnt = 0;
  }

  // Получение последнего символа
  getLastSymbol() {
    return this.expression[this.expression.length - 1] || "";
  }

  // Добавление символа
  addSymbol(newSymbol) {
    const lastSymbol = this.getLastSymbol();
    // Выбор скобки, если нажата кнопка "()"
    if (newSymbol === "()") {
      newSymbol = ExpressionValidator.getValidBracket(this.openedBracketCnt, lastSymbol);
      
      // Изменение счётчика открытых скобок
      if (newSymbol === "(") this.openedBracketCnt++;
      else if (newSymbol === ")" && this.openedBracketCnt > 0) this.openedBracketCnt--;
    }

    // Проверки и преобразования выражений
    if (ExpressionValidator.isValidOperator(newSymbol, lastSymbol)) this.deleteExpression();
    if (ExpressionValidator.isValidBracketOperator(newSymbol, lastSymbol)) return;
    if (ExpressionValidator.isValidConstMultiplication(newSymbol, lastSymbol)) this.expression += "*";
    if (ExpressionValidator.isValidFractionalNumber(newSymbol, lastSymbol)) return;

    // Добавление нового символа к выражению
    this.expression += newSymbol;
  }

  // Удаление символа
  deleteLastSymbol() {
    const lastSymbol = this.getLastSymbol();

    // Изменяем число незакрытых скобок
    if (lastSymbol === "(") this.openedBracketCnt--;
    else if (lastSymbol === ")") this.openedBracketCnt++;

    this.expression = this.expression.slice(0, -1);
  }
  
  // Очистка выражения
  deleteExpression() {
    this.expression = "";
    this.openedBracketCnt = 0;
  }

  // Валидация регулярного выражения
  validateExpression() {
    // Регулярное выражение для недопустимых символов
    const invalidCharsRegex = /[^0-9eπ+\-*÷^().]/;
    
    // Проверка на незакрытые скобки
    if (this.openedBracketCnt !== 0) {
      throw new Error("Неверный формат скобок");
    }
  
    // Проверка деления на 0
    if (this.expression.includes("÷0")) {
      throw new Error("Нельзя делить на 0");
    }
  
    // Проверка на недопустимые символы
    if (invalidCharsRegex.test(this.expression)) {
      throw new Error("Недопустимые символы");
    }
  
    // Если никаких ошибок не найдено, возвращаем регулярное выражение
    return this.expression;
  }
}
