class Expression {

  constructor() {
    this.expression = "";
    this.openedBracketCnt = 0;
  }

  // Получение последнего символа
  getLastSymbol() {
    return this.expression[this.expression.length - 1] || "";
  }

  // Проверка операторов
  checkOperator(newSymbol) {
    const lastSymbol = this.getLastSymbol();
    const operatorRegex = /[+\-*÷^]/;

    // Новый символ и последний символ являются операторами
    const isOperator = operatorRegex.test(lastSymbol) && operatorRegex.test(newSymbol);

    // Два минуса идут подряд
    const isDoubleMinus = newSymbol === "-" && lastSymbol === "-";

    // Удаление последнего символа при выполнении одного из условий
    if (isOperator || isDoubleMinus) {
      this.deleteLastSymbol();
    }
  }

  // Проверка корректности выражений с константами
  checkConst(newSymbol) {
    const CONSTANTS = "eπ"
    const lastSymbol = this.getLastSymbol();
    const isLastConst = CONSTANTS.includes(lastSymbol);
    const isNewConst = CONSTANTS.includes(newSymbol);
    const operandRegex = /[0-9eπ]/;

    // Добавляем знак умножения между символами, если среди них есть константа 
    if ((isNewConst && operandRegex.test(lastSymbol)) || 
        (isLastConst && (operandRegex.test(newSymbol) || newSymbol === "("))) {
      this.expression += "*";
    }
  }

  checkFractionalNumber(newSymbol) {
    const lastSymbol = this.getLastSymbol();
    const digitRegex = /[0-9]/;

    // Новый символ - точка
    if (newSymbol === ".") {
      // Последний символ не цифра
      if (!digitRegex.test(lastSymbol)) return false;

      // Последнее число в выражении
      const lastNumber = this.expression.split(/[+\-*÷^()]/).pop();

      // Проверка на наличие точек в последнем числе
      if (lastNumber.includes(".")) return false;
    } 

    // Последний символ выражения ".", а новый символ не цифра 
    if (lastSymbol === "." && !digitRegex.test(newSymbol)) return false;

    return true;
  }

  // Выбор скобки в зависимости от выражения
  checkBrackets() {
    const lastSymbol = this.getLastSymbol();
    const isOperand = /[0-9eπ]/.test(lastSymbol);

    // Последний символ - цифра или константа и скобки не закрыты
    if (isOperand && this.openedBracketCnt > 0) {
      this.openedBracketCnt--;
      return ")";
    }

    this.openedBracketCnt++;
    return "(";
  }

  // Добавление символа
  addSymbol(newSymbol) {
    // Выбор скобки, если нажата кнопка "()"
    if (newSymbol === "()") {
      newSymbol = this.checkBrackets();
    }

    // Преобразование выражений для корректного вычисления
    this.checkOperator(newSymbol);
    this.checkConst(newSymbol);

    // Можно ли поставтить точку
    if (!this.checkFractionalNumber(newSymbol)) return;

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
