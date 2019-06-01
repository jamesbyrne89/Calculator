import { IState, IStateUpdate, IActions } from './types';
import { actions } from './constants';
import operatorHandlers from './operatorHandlers';

class Calculator {
  constructor() {
    this.buttons.addEventListener('click', e => this.buttonHandler(e));
  }

  private state: IState = {
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
  set setState(newState: IStateUpdate) {
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
    const button: HTMLElement = e.target;
    if (button.matches('.calculator__button')) {
      const { action } = button.dataset;
      const buttonValue: string = button.textContent.trim();

      // Toggle clear button text
      this.toggleClearMode(action);

      if (!action) {
        // Is number key
        return this.handleNumber(this.currentOutput, buttonValue);
      }
      // is action key
      if (isAction(actions, action)) {
        this.setState = { previousButtonType: 'operator' };
        if (action === actions.EQUALS) {
          return operatorHandlers.equals(
            this.getState.firstValue,
            this.getState.operator,
            this.currentOutput
          );
        }
        if (action === actions.PERCENTAGE) {
          this.output = operatorHandlers
            .percentage(this.currentOutput)
            .toString();
          return;
        }
        calculator.firstValue = this.currentOutput;

        return this.handleOperator(action);
      }
    }
  };
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

function isAction(actions: IActions, action: string): boolean {
  return !action || Object.keys(actions).includes(action.toUpperCase());
}

export const calculator = new Calculator();
