import { ICalculatorState, ICalculatorStateUpdate } from './types';
import { actions } from './constants';
import operatorHandlers from './operatorHandlers';

class ButtonPress {
  constructor(target: HTMLButtonElement) {
    const { action }: DOMStringMap = target.dataset;
    this.target = target;
    this.action = action;
    this.value = target.textContent.trim();
  }

  isAction = (): boolean => {
    return (
      !this.action || Object.keys(actions).includes(this.action.toUpperCase())
    );
  };
}

class Calculator {
  constructor() {
    this.buttons.addEventListener('click', e => this.buttonHandler(e));
  }

  private state: ICalculatorState = {
    previousButtonType: null,
    firstValue: null,
    secondValue: null,
    operator: null
  };

  private buttonElements = document.querySelector('.calculator__buttons');

  private display: HTMLElement = document.querySelector('.calculator__output');

  private clearButton = document.querySelector('[data-action="clear"]');

  get currentOutput() {
    return this.display.textContent;
  }

  set output(input: string) {
    this.display.textContent = input;
  }

  get buttons() {
    return this.buttonElements;
  }

  get getState() {
    return this.state;
  }
  set setState(newState: ICalculatorStateUpdate) {
    this.state = Object.assign(this.state, newState);
  }

  set firstValue(value: string) {
    this.setState = { firstValue: value };
  }

  set secondValue(value: string) {
    this.setState = { secondValue: value };
  }

  handleNumber = (currentOutput, buttonValue) => {
    if (hasDecimal(currentOutput) && calculator.getState.operator === null) {
      calculator.output = currentOutput + buttonValue;
      return this;
    }

    if (isStartOfFirstValue(currentOutput)) {
      calculator.output = buttonValue;
      calculator.firstValue = buttonValue;
      return this;
    }

    if (isFirstValue()) {
      calculator.output = calculator.currentOutput + buttonValue;
      calculator.firstValue = calculator.currentOutput + buttonValue;
      return this;
    }

    // Set second value
    if (isSecondValue()) {
      calculator.secondValue = currentOutput;
      calculator.output = buttonValue;
    } else {
      calculator.output = calculator.currentOutput + buttonValue;
    }
    return this;
  };

  toggleClearMode = (action: string): void => {
    if (action === actions.CLEAR) {
      this.clearButton.textContent = 'AC';
    } else {
      this.clearButton.textContent = 'CE';
    }
  };

  handleOperator = (action: string) => {
    return operatorHandlers[action](this.currentOutput);
  };

  buttonHandler = e => {
    if (e.target.matches('.calculator__button')) {
      const button = new ButtonPress(e.target);

      // Toggle clear button text
      this.toggleClearMode(button.action);

      if (!button.action) {
        // Is number key
        return this.handleNumber(this.currentOutput, button.value);
      }
      // is action key
      if (button.isAction()) {
        this.setState = { previousButtonType: 'operator' };
        if (button.action === actions.EQUALS) {
          return operatorHandlers.equals(
            this.getState.firstValue,
            this.getState.operator,
            this.currentOutput
          );
        }
        if (button.action === actions.PERCENTAGE) {
          this.output = operatorHandlers
            .percentage(this.currentOutput)
            .toString();
          return;
        }
        this.firstValue = this.currentOutput;

        return this.handleOperator(button.action);
      }
    }
  };
}

export function hasDecimal(str: string): boolean {
  const regex = /\./g;
  return regex.test(str);
}

export function isFirstValue(): boolean {
  return calculator.getState.firstValue === null;
}

export function isStartOfFirstValue(currentOutput: string): boolean {
  return isFirstValue() || currentOutput === '0';
}

export function isSecondValue(): boolean {
  return (
    calculator.getState.firstValue &&
    calculator.getState.previousButtonType === 'operator' &&
    calculator.getState.secondValue === null
  );
}

export const calculator = new Calculator();
