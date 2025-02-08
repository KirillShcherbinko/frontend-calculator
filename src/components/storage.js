const STORAGE_KEY = "calculatorState";

// Функция для сохранения данных в localStorage
export const saveState = (expressionObj) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expressionObj));
}

// Функция для загрузки данных из localStorage
export const loadState = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : { expression: "", openedBracketCnt: 0, errorMessage: "" };
}