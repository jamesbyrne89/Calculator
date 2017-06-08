const integers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

(function init() {
	const numbers = document.getElementsByClassName('button');
	const equalsBtn = document.getElementById('equals');

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

		const ac = document.getElementById('ac');

		ac.addEventListener('click', function() {
			input.innerText = '';
			output.innerText = '';
		});
		const multiply = document.getElementById('multiply');

		multiply.addEventListener('click', function() {
			handleInput.getInput();
			handleInput.updateView('*');
		});		
	}

	_setInitialState();
	_listen();

})();



function InputHandler() {

	const input = document.getElementById('input');
	const output = document.getElementById('output');

	this.getInput = function() {
		return input.innerText;
	};


	this.updateView = function updateView(x) {
		input.innerText += x;
	};

	this.evaluate = function _evaluate(total) {
		console.log(total)
		output.innerText = eval(total);
		input.innerText = '';
	};

};

let init = new InputHandler();
init.setInitialState();



const view = function view() {



}



const percentage = document.getElementById('percentage');

percentage.addEventListener('click', function() {
	if (input.innerText) {
		input.innerText += '%';
	}
});

function joinIntegers() {
	if (integers.indexOf(input.innerText.slice(-1)) >= 0) {

	}
};

var maths = {
		add: function(x, y) {
			return x + y;
		},
		subtract: function(x, y) {
			return x - y;
		}

	}
	//alert(maths.add(1, 2));
	//console.log(typeof *)