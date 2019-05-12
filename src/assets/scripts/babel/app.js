'use strict';

(function init() {
	var numbers = document.getElementsByClassName('btn__number');
	var equalsBtn = document.getElementById('equals');
	var ac = document.getElementById('ac');
	var percentage = document.getElementById('percentage');
	var operators = document.getElementsByClassName('operator');

	// Add keyboard events
	var _attachKeyboardEvents = function _attachKeyboardEvents() {
		document.body.addEventListener('keydown', function (e) {
			var handleInput = new InputHandler();
			// 0
			if (e.keyCode === 48 || e.keyCode === 96) {
				handleInput.getInput();
				handleInput.updateView('0');
			}
			// 1
			else if (e.keyCode === 49 || e.keyCode === 97) {
					handleInput.getInput();
					handleInput.updateView('1');
				}
				// 2
				else if (e.keyCode === 50 || e.keyCode === 98) {
						handleInput.getInput();
						handleInput.updateView('2');
					}
					// 3
					else if (e.keyCode === 51 || e.keyCode === 99) {
							handleInput.getInput();
							handleInput.updateView('3');
						}
						// 4
						else if (e.keyCode === 52 || e.keyCode === 100) {
								handleInput.getInput();
								handleInput.updateView('4');
							}
							// 5
							else if (e.keyCode === 53 || e.keyCode === 101) {
									handleInput.getInput();
									handleInput.updateView('5');
								}
								// 6
								else if (e.keyCode === 54 || e.keyCode === 102) {
										handleInput.getInput();
										handleInput.updateView('6');
									}
									// 7
									else if (e.keyCode === 55 || e.keyCode === 103) {
											handleInput.getInput();
											handleInput.updateView('7');
										}
										// 8
										else if (e.keyCode === 56 || e.keyCode === 104) {
												handleInput.getInput();
												handleInput.updateView('8');
											}
											// 9
											else if (e.keyCode === 57 || e.keyCode === 105) {
													handleInput.getInput();
													handleInput.updateView('9');
												}
												// ===
												else if (e.keyCode === 13) {
														handleInput.getInput();
														handleInput.evaluate(input.innerText);
													}
													// *
													else if (e.keyCode === 57 || e.keyCode === 106) {
															handleInput.getInput();
															handleInput.checkDuplicates('*');
															if (!handleInput.checkDuplicates('*') && input.innerText.length > 0) {
																handleInput.updateView('*');
															} else {
																return;
															}
														}
														// +
														else if (e.keyCode === 107) {
																handleInput.getInput();
																handleInput.checkDuplicates('+');
																if (!handleInput.checkDuplicates('+') && input.innerText.length > 0) {
																	handleInput.updateView('+');
																} else {
																	return;
																}
															}
															// -
															else if (e.keyCode === 109 || e.keyCode === 189) {
																	handleInput.getInput();
																	handleInput.checkDuplicates('-');
																	if (!handleInput.checkDuplicates('-') && input.innerText.length > 0) {
																		handleInput.updateView('-');
																	} else {
																		return;
																	}
																}
																// .
																else if (e.keyCode === 110 || e.keyCode === 190) {
																		handleInput.getInput();
																		handleInput.checkDuplicates('.');
																		if (!handleInput.checkDuplicates('.') && input.innerText.length > 0) {
																			handleInput.updateView('.');
																		} else {
																			return;
																		}
																	}
																	// /
																	else if (e.keyCode === 111 || e.keyCode === 191) {
																			handleInput.getInput();
																			handleInput.checkDuplicates('/');
																			if (!handleInput.checkDuplicates('/') && input.innerText.length > 0) {
																				handleInput.updateView('/');
																			} else {
																				return;
																			}
																		}
																		// Clear
																		else if (e.keyCode === 8 || e.keyCode === 46) {
																				input.innerText = '';
																				output.innerText = '';
																			} else {
																				return;
																			}
		});
	};

	// Add event listeners
	var _listen = function _listen() {
		var handleInput = new InputHandler();
		Array.prototype.forEach.call(numbers, function (item) {
			item.addEventListener('click', function () {
				handleInput.getInput();
				handleInput.updateView(this.innerText);
			});
		});

		equalsBtn.addEventListener('click', function () {
			var getTotal = new InputHandler();
			getTotal.getInput();
			getTotal.evaluate(input.innerText);
		}, false);

		ac.addEventListener('click', function () {
			input.innerText = '';
			output.innerText = '';
		});

		Array.prototype.forEach.call(operators, function (item) {
			item.addEventListener('click', function () {
				handleInput.getInput();
				handleInput.checkDuplicates(this.innerText);
				if (!handleInput.checkDuplicates(this.innerText) && input.innerText.length > 0) {
					handleInput.updateView(this.innerText);
				} else {
					return;
				}
			});
		});
		percentage.addEventListener('click', function () {
			var getPercentage = new InputHandler();
			getPercentage.getInput();
			getPercentage.evaluate(getPercentage.handlePercent(input.innerText));
		});
	};

	_listen();
	_attachKeyboardEvents();
})();

function InputHandler() {

	var input = document.getElementById('input');
	var output = document.getElementById('output');

	this.getInput = function _getInput() {
		return input.innerText;
	};

	this.checkDuplicates = function _checkDuplicates(pressed) {
		var operators = ['X', '%', '/', '-', '.', '+'];
		if (operators.indexOf(input.innerText.slice(-1))) {
			return false;
		} else {
			return true;
		}
	};

	this.handlePercent = function _handlePercent(total) {
		var percTotal = total + '/100';
		return percTotal;
	};

	this.updateView = function updateView(x) {
		input.innerText += x;
	};

	this.evaluate = function _evaluate(total) {
		var parsedTotal = total.replace('X', '*');
		var finalTotal = eval(parsedTotal);
		var stringified = finalTotal.toString();
		if (stringified.indexOf('.') >= 0 && finalTotal.toString().length > 9) {
			output.innerText = finalTotal.toFixed(9 - finalTotal.toString().length);
		} else {
			output.innerText = finalTotal;
		}
	};
};