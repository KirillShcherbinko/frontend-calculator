class Expression {
  constructor() {
    this.expression = "";
    this.closedBracketCnt = 0;
  }

  // Получение последнего символа
  getLastSymbol() {
    return this.expression[this.expression.length - 1];
  }

  // Проверка операторов
  checkOperator(newSymbol) {
    const lastSymbol = this.getLastSymbol();
    const regex = /[+\x÷^]/;

    // Новый символ и последний символ являются операторами
    const isOperator = regex.test(lastSymbol) && regex.test(newSymbol);

    // Два минуса идут подряд
    const isDoubleMinus = newSymbol === "-" && lastSymbol === "-";

    // Удаление последнего символа при выполнении одного из условий
    if (isOperator || isDoubleMinus) {
      this.deleteLastSymbol();
    }
  }

  checkBrackets() {
    const lastSymbol = this.getLastSymbol();
    const regex = /[0-9eπ]/;

    // Последний символ - цифра или константа и скобки не закрыты
    if (regex.test(lastSymbol) && this.closedBracketCnt > 0) {
      this.closedBracketCnt--;
      return ")";
    } else {
      this.closedBracketCnt++;
      return "(";
    }
  }

  // Добавление символа
  addSymbol(newSymbol) {
    this.checkOperator(newSymbol);

    // Выбор скобки, если нажата кнопка "()"
    if (newSymbol === "()") {
      newSymbol = this.checkBrackets;
    }

    // Добавление нового символа к выражению
    this.expression += newSymbol;
  }

  // Удаление символа
  deleteLastSymbol() {
    this.expression = this.expression.slice(-1);
  }
  
  // Очистка выражения
  deleteExpression() {
    this.expression = "";
    this.closedBracketCnt = 0;
  }
}