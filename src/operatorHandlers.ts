import { display, state } from './app';
import { actions } from './constants';

function decimal(currentOutput) {
  if (currentOutput.includes('.')) {
    return;
  }
  if (state.previousButtonType === 'operator') {
    display.textContent = currentOutput + '.';
  }
  display.textContent = currentOutput + '.';
}

function clear() {
  display.textContent = '0';
  state.firstValue = null;
  state.operator = null;
  state.secondValue = null;
  state.previousButtonType = null;
}

function add() {
  state.operator = actions.ADD;
}

function subtract() {
  state.operator = actions.SUBTRACT;
}

function multiply() {
  state.operator = actions.MULTIPLY;
}

function divide() {
  state.operator = actions.DIVIDE;
}

function percentage(num: number): number {
  return parseFloat(num) / 100;
}

function calculate(firstVal, operator, secondVal): number {
  switch (operator) {
    case actions.ADD:
      return parseFloat(firstVal) + parseFloat(secondVal);
    case actions.SUBTRACT:
      return parseFloat(firstVal) - parseFloat(secondVal);
    case actions.MULTIPLY:
      return parseFloat(firstVal) * parseFloat(secondVal);
    case actions.DIVIDE:
      return parseFloat(firstVal) / parseFloat(secondVal);
    default:
      return null;
  }
}

function equals(firstVal, operator, secondVal) {
  console.log('equals clicked', { firstVal, operator, secondVal });
  console.log(calculate(firstVal, operator, secondVal));
  const result = calculate(firstVal, operator, secondVal);
  display.textContent = result.toString();
}

export default {
  decimal,
  clear,
  equals,
  add,
  subtract,
  divide,
  multiply,
  percentage,
  calculate
};
