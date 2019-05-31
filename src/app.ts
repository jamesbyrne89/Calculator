import { IState, IActions } from './types';
import { actions } from './constants';
import operatorHandlers from './operatorHandlers';

const buttons = document.querySelector('.calculator__buttons');

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

export function setDisplayOutput(value: string): void {
  display.textContent = value;
}

export function hasDecimal(str: string): boolean {
  const regex = /\./g;
  return regex.test(str);
}

function setFirstValue(value: string): void {
  state.firstValue = value;
}

function setSecondValue(value: string): void {
  state.secondValue = value;
}

function isFirstValue(): boolean {
  return state.firstValue === null;
}

function isStartOfFirstValue(currentOutput: string): boolean {
  return isFirstValue() || currentOutput === '0';
}

function isSecondValue(): boolean {
  return (
    state.firstValue &&
    state.previousButtonType === 'operator' &&
    state.secondValue === null
  );
}

function handleNumberInput(currentOutput, buttonValue) {
  if (hasDecimal(currentOutput) && state.operator === null) {
    setDisplayOutput(currentOutput + buttonValue);
    return this;
  }
  if (isStartOfFirstValue(currentOutput)) {
    setDisplayOutput(buttonValue);
    setFirstValue(buttonValue);
    return this;
  }

  if (isFirstValue()) {
    setDisplayOutput(display.textContent + buttonValue);
    setFirstValue(display.textContent + buttonValue);
    return this;
  }

  // Set second value
  if (isSecondValue()) {
    setSecondValue(currentOutput);
    setDisplayOutput(buttonValue);
  } else {
    setDisplayOutput(display.textContent + buttonValue);
  }
  return this;
}

function toggleClearMode(action: string): void {
  if (action === actions.CLEAR) {
    clearButton.textContent = 'AC';
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
  console.log({ state });
  if (button.matches('.calculator__button')) {
    const { action } = button.dataset;
    const buttonValue: string = button.textContent.trim();
    const currentOutput = display.textContent;

    // Toggle clear button text
    toggleClearMode(action);

    if (!action) {
      // Is number key
      return handleNumberInput(currentOutput, buttonValue);
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
        setDisplayOutput(operatorHandlers.percentage(currentOutput).toString());
        return;
      }
      setFirstValue(currentOutput);

      return handleOperator(action, currentOutput);
    }
  }
}

buttons.addEventListener('click', buttonHandler);
