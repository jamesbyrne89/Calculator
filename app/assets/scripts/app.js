const input = document.getElementById('input');
const integers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

(function addClickEvents() {
	const numbers = document.getElementsByClassName('button');
	let handleInput = new InputHandler();
	Array.prototype.forEach.call(numbers, (function(item) {
		item.addEventListener('click', function() {
			handleInput.getInput();
			handleInput.updateInput(this.innerText);
			handleInput.joinIntegers()
			handleInput.updateView();
		})
	}))
})();



function InputHandler() {

	var inputArr = [];

	this.getInput = function() {
		return inputArr;
	};

	this.setInitialState = function() {
		input.innerText = inputArr;
	};

	this.updateInput = function(add) {
		inputArr.push(add);
	};

	this.updateView = function() {
		input.innerText = inputArr.join('');
	};
	this.joinIntegers = function(){
		if (integers.indexOf(inputArr[inputArr.length-1]) >= 0) {
			console.log('number')
		}
	}
};

let init = new InputHandler();
init.setInitialState();




const ac = document.getElementById('ac');

ac.addEventListener('click', function() {
	input.innerText = '';
});

const percentage = document.getElementById('percentage');

percentage.addEventListener('click', function() {
	if (input.innerText) {
		input.innerText += '%';
	}
});

document.getElementById('equals').addEventListener('click', function() {
	console.log(input.innerText);
	console.log(typeof input.innerText);
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