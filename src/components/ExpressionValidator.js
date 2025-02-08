export class ExpressionValidator {

  // Проверка на корректность операторов
  static isValidOperator(newSymbol, lastSymbol) {
    const operatorRegex = /[+\*÷^]/;

    // Новый символ и последний символ являются операторами
    const isOperator = operatorRegex.test(lastSymbol) && operatorRegex.test(newSymbol);

    // Два минуса идут подряд
    const isDoubleMinus = newSymbol === "-" && lastSymbol === "-";

    return isOperator || isDoubleMinus;
  }

  static isValidBracketOperator(newSymbol, lastSymbol) {
     const isLeftBracketBeforeOperator = lastSymbol === "(" && /[+\*÷^]/.test(newSymbol);
     const isOperatorBeforeRightBracket = newSymbol === ")" && /[+\-*÷^]/.test(lastSymbol);

     return isLeftBracketBeforeOperator || isOperatorBeforeRightBracket;
  }

  // Проверка на корректное умножение констант на числа при отсутствии операторов
  static isValidConstMultiplication(newSymbol, lastSymbol) {
    const CONSTANTS = "eπ";
    const operandRegex = /[0-9eπ]/;

    // Проверки на положение констант
    const isConstLastSymbol = CONSTANTS.includes(newSymbol) && operandRegex.test(lastSymbol);
    const isConstNewSymbol = CONSTANTS.includes(lastSymbol) && (operandRegex.test(newSymbol) || newSymbol === "(");

    return isConstLastSymbol || isConstNewSymbol;
  }

  // Проверка на корректность дробных чисел
  static isValidFractionalNumber(newSymbol, lastSymbol) {
    const lastSymbol = this.getLastSymbol();
    const digitRegex = /[0-9]/;

    // Новый символ - точка
    if (newSymbol === ".") {
      // Последний символ не цифра
      if (!digitRegex.test(lastSymbol)) return false;

      // Проверка на наличие точек в последнем числе
      const lastNumber = this.expression.split(/[+\-*÷^()]/).pop();
      if (lastNumber.includes(".")) return false;
    } 

    // Последний символ выражения ".", а новый символ не цифра 
    return !(lastSymbol === "." && !digitRegex.test(newSymbol));
  }

  // Плучение правильной скобки
  static getValidBracket(openedBracketCnt, lastSymbol) {
    const isOperand = /[0-9eπ]/.test(lastSymbol);
    return isOperand && openedBracketCnt > 0 ? ")" : "(";
  }
}