// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

export interface IButton {
  dataset: {
    action: string;
  };
}

export interface ITest {
  testval: boolean;
}

export interface IActions {
  ADD: 'add';
  SUBTRACT: 'subtract';
  MULTIPLY: 'multiply';
  DIVIDE: 'divide';
  DECIMAL: 'decimal';
  PERCENTAGE: 'percentage';
  EQUALS: 'equals';
  CLEAR: 'clear';
}
export interface ICalculatorState {
  previousButtonType: 'operator' | 'number';
  firstValue: string;
  operator: string;
  secondValue: string;
}

export interface ICalculatorStateUpdate {
  previousButtonType?: 'operator' | 'number';
  firstValue?: string;
  operator?: string;
  secondValue?: string;
}
