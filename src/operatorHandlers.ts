import { display, state } from './app';
import { actions } from './constants';

function decimal(currentOutput) {
  display.textContent = currentOutput + '.';
}

function clear() {
  display.textContent = '0';
}

function add() {
  state.operator = actions.ADD;
}

function subtract() {
  state.operator = actions.SUBTRACT;
}

function calculate(firstVal, operator, secondVal): string {
  let result;

  switch (operator) {
    case actions.ADD:
      result = parseFloat(firstVal) + parseFloat(secondVal);
      break;
    case actions.SUBTRACT:
      result = parseFloat(firstVal) - parseFloat(secondVal);
      break;
    case actions.MULTIPLY:
      result = parseFloat(firstVal) * parseFloat(secondVal);
      break;
    case actions.DIVIDE:
      result = parseFloat(firstVal) / parseFloat(secondVal);
      break;
    default:
      return '';
  }

  return result.toString();
}

function equals(firstVal, operator, secondVal) {
  console.log('equals clicked', { firstVal, operator, secondVal });
  console.log(calculate(firstVal, operator, secondVal));
  display.textContent = calculate(firstVal, operator, secondVal);
}

export default {
  decimal,
  clear,
  equals,
  add,
  subtract
};
