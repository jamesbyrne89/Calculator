import init from './modules/_init.js';

init();

function InputHandler() {

	const input = document.getElementById('input');
	const output = document.getElementById('output');

	this.getInput = function _getInput() {
		return input.innerText;
	};

	this.checkDuplicates = function _checkDuplicates(pressed) {
		const operators = ['X', '%', '/', '-', '.', '+']
		if (operators.indexOf(input.innerText.slice(-1))) {
			return false;
		} else {
			return true;
		}
	};

	this.handlePercent = function _handlePercent(total) {
		let percTotal = total + '/100';
		console.log()
		return percTotal;
	};

	this.updateView = function updateView(x) {
		input.innerText += x;
	};

	this.evaluate = function _evaluate(total) {
		let parsedTotal = total.replace('X', '*');
		let finalTotal = eval(parsedTotal);
		let stringified = finalTotal.toString();
		if (stringified.indexOf('.') >= 0 && finalTotal.toString().length > 9) {
			output.innerText = finalTotal.toFixed(9 - finalTotal.toString().length);
		} else {
			output.innerText = finalTotal;
		}
	};

};