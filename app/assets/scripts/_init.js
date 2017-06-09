function init() {
	const numbers = document.getElementsByClassName('btn__number');
	const equalsBtn = document.getElementById('equals');
	const ac = document.getElementById('ac');
	const percentage = document.getElementById('percentage');
	const operators = document.getElementsByClassName('operator');

	const _setInitialState = function _setInitialState() {
		input.innerText = '';
	};

	const attachKeyboardEvents = function _attachKeyboardEvents(){
		document.body.addEventListener('keydown', function(e){

			// 4
			if (e.keycode = 100 || 52){
				handleInput.getInput();
				handleInput.updateView('4');
			}
		})
			// Add event listeners
		}
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

};

module.exports = init;