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
  subtract,
  calculate
};
