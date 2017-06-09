(function init() {
	const numbers = document.getElementsByClassName('btn__number');
	const equalsBtn = document.getElementById('equals');
	const ac = document.getElementById('ac');
	const operators = document.getElementsByClassName('operator');

	const _setInitialState = function _setInitialState() {
		input.innerText = '';
	};

	const _listen = function _listen() {
		let handleInput = new InputHandler();
		Array.prototype.forEach.call(numbers, (function(item) {
			item.addEventListener('click', function() {
				handleInput.getInput();
				handleInput.updateView(this.innerText);
			})
		}))

		equalsBtn.addEventListener('click', function() {
			let getTotal = new InputHandler();
			getTotal.getInput();
			getTotal.evaluate(input.innerText);
		}, false)

		ac.addEventListener('click', function() {
			input.innerText = '';
			output.innerText = '';
		});

		Array.prototype.forEach.call(operators, (function(item) {
			item.addEventListener('click', function() {
				handleInput.getInput();
				handleInput.checkDuplicates(this.innerText);

				if (!handleInput.checkDuplicates(this.innerText)){
				handleInput.updateView(this.innerText);
			}
			else {
				return;
			}
			})
		}))
	};

	_setInitialState();
	_listen();

})();



function InputHandler() {

	const input = document.getElementById('input');
	const output = document.getElementById('output');

	this.getInput = function() {
		return input.innerText;
	};

	this.checkDuplicates = function _checkDuplicates(pressed){
		const operators = ['X', '%', '/', '-', '.', '+']
		if (operators.indexOf(input.innerText.slice(-1))) {
			return false;
		}
		else {
			return true;
		}
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