import { IState } from './types';
import { actions } from './constants';
import operatorHandlers from './operatorHandlers';

const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.calculator__buttons');
export const display: HTMLElement = document.querySelector(
  '.calculator__output'
);

export const state: IState = {
  previousButtonType: null,
  firstValue: null,
  operator: null
};

function handleNumberInput(currentOutput, buttonValue, previousButtonType) {
  console.log({ currentOutput, buttonValue, previousButtonType });
  if (currentOutput === '0') {
    return (display.textContent = buttonValue);
  }
  console.log(state);
  if (state.firstValue && previousButtonType === 'operator') {
    display.textContent = operatorHandlers.calculate(
      state.firstValue,
      state.operator,
      buttonValue
    );
  } else {
    display.textContent = currentOutput + buttonValue;
  }
}

function handleOperator(action, currentOutput) {
  console.log({ action, operatorHandlers });
  return operatorHandlers[action](currentOutput);
}

function buttonHandler(e) {
  const button: HTMLElement = e.target;

  if (button.matches('.calculator__button')) {
    const action: string = button.dataset.action;
    const buttonValue: string = button.textContent;
    const currentOutput = display.textContent;

    if (!action) {
      // Is number key
      return handleNumberInput(
        currentOutput,
        buttonValue,
        state.previousButtonType
      );
    }

    if (Object.keys(actions).includes(action.toUpperCase())) {
      state.previousButtonType = 'operator';
      if (action === actions.EQUALS) {
        return operatorHandlers.equals(
          state.firstValue,
          state.operator,
          currentOutput
        );
      }
      state.firstValue = currentOutput;
      console.log(state);
      return handleOperator(action, currentOutput);
    }
  }
}

buttons.addEventListener('click', buttonHandler);

// (function init() {
//   const numbers = document.getElementsByClassName('btn__number');
//   const equalsBtn = document.getElementById('equals');
//   const ac = document.getElementById('ac');
//   const plusMinus = document.getElementById('plus-minus');
//   const percentage = document.getElementById('percentage');
//   const operators = document.getElementsByClassName('operator');

//   // Add keyboard events
//   const _attachKeyboardEvents = function _attachKeyboardEvents() {
//     document.body.addEventListener('keydown', function(e) {
//       let handleInput = new InputHandler();
//       // 0
//       if (e.keyCode === 48 || e.keyCode === 96) {
//         handleInput.getInput();
//         handleInput.updateView('0');
//       }
//       // 1
//       else if (e.keyCode === 49 || e.keyCode === 97) {
//         handleInput.getInput();
//         handleInput.updateView('1');
//       }
//       // 2
//       else if (e.keyCode === 50 || e.keyCode === 98) {
//         handleInput.getInput();
//         handleInput.updateView('2');
//       }
//       // 3
//       else if (e.keyCode === 51 || e.keyCode === 99) {
//         handleInput.getInput();
//         handleInput.updateView('3');
//       }
//       // 4
//       else if (e.keyCode === 52 || e.keyCode === 100) {
//         handleInput.getInput();
//         handleInput.updateView('4');
//       }
//       // 5
//       else if (e.keyCode === 53 || e.keyCode === 101) {
//         handleInput.getInput();
//         handleInput.updateView('5');
//       }
//       // 6
//       else if (e.keyCode === 54 || e.keyCode === 102) {
//         handleInput.getInput();
//         handleInput.updateView('6');
//       }
//       // 7
//       else if (e.keyCode === 55 || e.keyCode === 103) {
//         handleInput.getInput();
//         handleInput.updateView('7');
//       }
//       // 8
//       else if (e.keyCode === 56 || e.keyCode === 104) {
//         handleInput.getInput();
//         handleInput.updateView('8');
//       }
//       // 9
//       else if (e.keyCode === 57 || e.keyCode === 105) {
//         handleInput.getInput();
//         handleInput.updateView('9');
//       }
//       // ===
//       else if (e.keyCode === 13) {
//         handleInput.getInput();
//         handleInput.evaluate(input.innerText);
//       }
//       // *
//       else if (e.keyCode === 57 || e.keyCode === 106) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('*');
//         if (!handleInput.checkDuplicates('*') && input.innerText.length > 0) {
//           handleInput.updateView('*');
//         } else {
//           return;
//         }
//       }
//       // +
//       else if (e.keyCode === 107) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('+');
//         if (!handleInput.checkDuplicates('+') && input.innerText.length > 0) {
//           handleInput.updateView('+');
//         } else {
//           return;
//         }
//       }
//       // -
//       else if (e.keyCode === 109 || e.keyCode === 189) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('-');
//         if (!handleInput.checkDuplicates('-') && input.innerText.length > 0) {
//           handleInput.updateView('-');
//         } else {
//           return;
//         }
//       }
//       // .
//       else if (e.keyCode === 110 || e.keyCode === 190) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('.');
//         if (!handleInput.checkDuplicates('.') && input.innerText.length > 0) {
//           handleInput.updateView('.');
//         } else {
//           return;
//         }
//       }
//       // /
//       else if (e.keyCode === 111 || e.keyCode === 191) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('/');
//         if (!handleInput.checkDuplicates('/') && input.innerText.length > 0) {
//           handleInput.updateView('/');
//         } else {
//           return;
//         }
//       }
//       // Clear
//       else if (e.keyCode === 8 || e.keyCode === 46) {
//         input.innerText = '';
//         output.innerText = '';
//       } else {
//         return;
//       }
//     });
//   };

//   // Add event listeners
//   const _listen = function _listen() {
//     let handleInput = new InputHandler();
//     Array.prototype.forEach.call(numbers, function(item) {
//       item.addEventListener('click', function() {
//         handleInput.getInput();
//         handleInput.updateView(this.innerText);
//       });
//     });

//     equalsBtn.addEventListener(
//       'click',
//       function() {
//         let getTotal = new InputHandler();
//         getTotal.getInput();
//         getTotal.evaluate(input.innerText);
//       },
//       false
//     );

//     ac.addEventListener('click', function() {
//       input.innerText = '';
//       output.innerText = '';
//     });

//     plusMinus.addEventListener('click', function() {
//       handleInput.getInput();
//       handleInput.updateView('-');
//     });

//     Array.prototype.forEach.call(operators, function(item) {
//       item.addEventListener('click', function() {
//         handleInput.getInput();
//         handleInput.checkDuplicates(this.innerText);
//         if (
//           !handleInput.checkDuplicates(this.innerText) &&
//           input.innerText.length > 0
//         ) {
//           handleInput.updateView(this.innerText);
//         } else {
//           return;
//         }
//       });
//     });
//     percentage.addEventListener('click', function() {
//       let getPercentage = new InputHandler();
//       getPercentage.getInput();
//       getPercentage.evaluate(getPercentage.handlePercent(input.innerText));
//     });
//   };

//   _listen();
//   _attachKeyboardEvents();
// })();

// function InputHandler() {
//   const input = document.getElementById('input');
//   const output = document.getElementById('output');

//   this.getInput = function _getInput() {
//     return input.innerText;
//   };

//   this.checkDuplicates = function _checkDuplicates(pressed) {
//     const operators = ['X', '%', '/', '-', '.', '+'];
//     if (operators.indexOf(input.innerText.slice(-1))) {
//       return false;
//     } else {
//       return true;
//     }
//   };

//   this.handlePercent = function _handlePercent(total) {
//     let percTotal = total + '/100';
//     return percTotal;
//   };

//   this.updateView = function updateView(x) {
//     input.innerText += x;
//   };

//   this.evaluate = function _evaluate(total) {
//     let parsedTotal = total.replace('X', '*');
//     let finalTotal = eval(parsedTotal);
//     let stringified = finalTotal.toString();
//     if (stringified.indexOf('.') >= 0 && finalTotal.toString().length > 9) {
//       output.innerText = finalTotal.toFixed(9 - finalTotal.toString().length);
//     } else {
//       output.innerText = finalTotal;
//     }
//   };
// }
