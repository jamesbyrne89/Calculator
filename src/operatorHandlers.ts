import { display, state } from "./app";
import { actions } from "./constants";

function decimal(currentOutput) {
  display.textContent = currentOutput + ".";
}

function clear(currentOutput) {
  display.textContent = "0";
}

function add(currentOutput) {
  console.log("add clicked");
  state.operator = actions.ADD;
}

function calculate(firstVal, operator, secondVal): string {
  let result;
  if (operator === "add") {
    result = parseInt(firstVal, 10) + parseInt(secondVal, 10);
  }
  return result.toString();
}

function equals(firstVal, operator, secondVal) {
  console.log("equals clicked", { firstVal, operator, secondVal });

  display.textContent = calculate(firstVal, operator, secondVal);
}

export default {
  decimal,
  clear,
  equals,
  add
};
