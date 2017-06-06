
const input = document.getElementById('input');

(function addClickEvents() {
	const numbers = document.getElementsByClassName('button');
	Array.prototype.forEach.call(numbers, (function(item) {
		item.addEventListener('click', function() {
			input.innerText += this.innerText;
		})
	}))
})();



const ac = document.getElementById('ac');

ac.addEventListener('click', function(){
	input.innerText = '';
});

const percentage = document.getElementById('percentage');

percentage.addEventListener('click', function(){
	if (input.innerText) {
	input.innerText += '%';
}
});

document.getElementById('equals').addEventListener('click', function(){
	console.log(input.innerText);
	console.log(typeof input.innerText);
});

function joinIntegers() {
	
};