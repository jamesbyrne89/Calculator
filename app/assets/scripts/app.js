
// const init = require('../modules/_init');

(function init() {
	const numbers = document.getElementsByClassName('btn__number');
	const equalsBtn = document.getElementById('equals');
	const ac = document.getElementById('ac');
	const percentage = document.getElementById('percentage');
	const operators = document.getElementsByClassName('operator');

	const _setInitialState = function _setInitialState() {
		input.innerText = '';
	};

	const _attachKeyboardEvents = function _attachKeyboardEvents(){
		document.body.addEventListener('keydown', function(e){
			let handleInput = new InputHandler();
			
			// 4
			if (e.keyCode === 100 || e.keyCode === 52){
				console.log(e.keyCode)
				handleInput.getInput();
				handleInput.updateView('4');
			}
			else {
				return;
			}
		})
			// Add event listeners
	
	} 

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
				if (!handleInput.checkDuplicates(this.innerText) && input.innerText.length > 0){
				handleInput.updateView(this.innerText);
			}
			else {
				return;
			}
			})
		}))
		percentage.addEventListener('click', function(){
			let getPercentage = new InputHandler();
			getPercentage.getInput();
			getPercentage.evaluate(getPercentage.handlePercent(input.innerText));
		});

	};

	_setInitialState();
	_listen();
	_attachKeyboardEvents();

})();

function InputHandler() {

	const input = document.getElementById('input');
	const output = document.getElementById('output');

	this.getInput = function _getInput() {
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