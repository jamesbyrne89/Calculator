function decimal(display, currentOutput) {
  display.textContent = currentOutput + ".";
}

function clear(display, currentOutput) {
  display.textContent = "0";
}

function equals() {
  console.log("equals clicked");
}

function add(display, currentOutput) {
  console.log('add clicked')
  display.textContent = currentOutput + "+";
}

export default {
  decimal,
  clear,
  equals,
  add
};
