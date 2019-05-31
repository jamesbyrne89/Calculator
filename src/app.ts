import { IState, IActions } from './types';
import { actions } from './constants';
import operatorHandlers from './operatorHandlers';

const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.calculator__buttons');
export const display: HTMLElement = document.querySelector(
  '.calculator__output'
);
const clearButton = document.querySelector('[data-action="clear"]');

export const state: IState = {
  previousButtonType: null,
  firstValue: null,
  secondValue: null,
  operator: null
};

function handleNumberWithDecimal(buttonValue) {}

function hasDecimal(str: string): boolean {
  const regex = /\.+/;
  return regex.test(str);
}

function handleNumberInput(currentOutput, buttonValue, previousButtonType) {
  console.log(currentOutput, state);
  if (currentOutput === '0') {
    display.textContent = buttonValue;
    return this;
  }
  if (hasDecimal(currentOutput) && state.operator === null) {
    display.textContent = currentOutput + buttonValue;
    return this;
  }
  if (
    state.firstValue &&
    previousButtonType === 'operator' &&
    state.secondValue === null
  ) {
    display.textContent = buttonValue;
    state.secondValue = display.textContent;
  } else {
    display.textContent += buttonValue;
  }
  return this;
}

function toggleClearMode(action: string): void {
  if (action === actions.CLEAR) {
    clearButton.textContent = 'AC';
    return;
  } else {
    clearButton.textContent = 'CE';
  }
}

function handleOperator(action, currentOutput) {
  return operatorHandlers[action](currentOutput);
}

function isAction(actions: IActions, action: string): boolean {
  return !action || Object.keys(actions).includes(action.toUpperCase());
}

function buttonHandler(e) {
  const button: HTMLElement = e.target;

  if (button.matches('.calculator__button')) {
    const action: string = button.dataset.action;
    const buttonValue: string = button.textContent.trim();
    const currentOutput = display.textContent;

    // Toggle clear button text
    toggleClearMode(action);

    if (!action) {
      // Is number key
      return handleNumberInput(
        currentOutput,
        buttonValue,
        state.previousButtonType
      );
    }
    // is action key
    if (isAction(actions, action)) {
      state.previousButtonType = 'operator';
      if (action === actions.EQUALS) {
        return operatorHandlers.equals(
          state.firstValue,
          state.operator,
          currentOutput
        );
      }
      if (action === actions.PERCENTAGE) {
        display.textContent = operatorHandlers
          .percentage(currentOutput)
          .toString();
        return;
      }
      state.firstValue = currentOutput;

      return handleOperator(action, currentOutput);
    }
  }
}

buttons.addEventListener('click', buttonHandler);
