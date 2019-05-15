function decimal() {
  console.log("decimal clicked");
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
