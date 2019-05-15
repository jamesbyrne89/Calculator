function decimal(display, currentOutput) {
  console.log("decimal clicked");
  display.textContent = currentOutput + "0";
}

function clear(display, currentOutput) {
  display.textContent = "0";
}

function equals() {
  console.log("equals clicked");
}

export default {
  decimal,
  clear,
  equals
};
