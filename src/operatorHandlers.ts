import { calculator } from './app';
import { actions } from './constants';

function decimal(currentOutput) {
  if (currentOutput.includes('.')) {
    return;
  }
  if (calculator.getState.previousButtonType === 'operator') {
    calculator.output = currentOutput + '.';
    return;
  }
  calculator.output = currentOutput + '.';
}

function clear() {
  calculator.output = '0';
  calculator.setState = { firstValue: null };
  calculator.setState = { operator: null };
  calculator.setState = { secondValue: null };
  calculator.setState = { previousButtonType: null };
}

function add() {
  calculator.setState = { operator: actions.ADD };
}

function subtract() {
  calculator.setState = { operator: actions.SUBTRACT };
}

function multiply() {
  calculator.setState = { operator: actions.MULTIPLY };
}

function divide() {
  calculator.setState = { operator: actions.DIVIDE };
}

function percentage(input: string): number {
  return parseFloat(input) / 100;
}

function calculate({ firstVal, operator, secondVal }): number {
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
      return 0;
  }
}

function equals(firstVal, operator, secondVal) {
  const result = calculate({ firstVal, operator, secondVal });
  calculator.output = result.toString();
  calculator.setState = { firstValue: null };
  calculator.setState = { operator: null };
  calculator.setState = { secondValue: null };
  calculator.setState = { previousButtonType: null };
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
