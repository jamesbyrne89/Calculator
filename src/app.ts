import { IState, IActions } from './types';
import { actions } from './constants';
import operatorHandlers from './operatorHandlers';

export const display: HTMLElement = document.querySelector(
  '.calculator__output'
);
const clearButton = document.querySelector('[data-action="clear"]');

class Calculator {
  private state = {
    previousButtonType: null,
    firstValue: null,
    secondValue: null,
    operator: null
  };

  private buttonElements = document.querySelector('.calculator__buttons');

  private displayOutput = '0';

  get buttons() {
    return this.buttonElements;
  }

  get getState() {
    return this.state;
  }
  set setState(newState: IState) {
    this.state = Object.assign(this.state, newState);
  }

  set setFirstValue(value: string) {
    this.setState = { firstValue: value };
  }

  set setSecondValue(value: string) {
    this.setState = { secondValue: value };
  }

  set setDisplayOutput(value: string) {
    this.displayOutput = value;
    display.textContent = this.displayOutput;
  }
}

export function hasDecimal(str: string): boolean {
  const regex = /\./g;
  return regex.test(str);
}

function isFirstValue(): boolean {
  return calculator.getState.firstValue === null;
}

function isStartOfFirstValue(currentOutput: string): boolean {
  return isFirstValue() || currentOutput === '0';
}

function isSecondValue(): boolean {
  return (
    calculator.getState.firstValue &&
    calculator.getState.previousButtonType === 'operator' &&
    calculator.getState.secondValue === null
  );
}

function handleNumberInput(currentOutput, buttonValue) {
  if (hasDecimal(currentOutput) && calculator.getState.operator === null) {
    calculator.setDisplayOutput = currentOutput + buttonValue;
    return this;
  }
  if (isStartOfFirstValue(currentOutput)) {
    calculator.setDisplayOutput = buttonValue;
    setFirstValue(buttonValue);
    return this;
  }

  if (isFirstValue()) {
    calculator.setDisplayOutput = display.textContent + buttonValue;
    setFirstValue(display.textContent + buttonValue);
    return this;
  }

  // Set second value
  if (isSecondValue()) {
    setSecondValue(currentOutput);
    calculator.setDisplayOutput = buttonValue;
  } else {
    calculator.setDisplayOutput = display.textContent + buttonValue;
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
      calculator.setState = { previousButtonType: 'operator' };
      if (action === actions.EQUALS) {
        return operatorHandlers.equals(
          calculator.getState.firstValue,
          calculator.getState.operator,
          currentOutput
        );
      }
      if (action === actions.PERCENTAGE) {
        calculator.setDisplayOutput = operatorHandlers
          .percentage(currentOutput)
          .toString();
        return;
      }
      setFirstValue(currentOutput);

      return handleOperator(action, currentOutput);
    }
  }
}

export const calculator = new Calculator();

calculator.buttons.addEventListener('click', buttonHandler);
