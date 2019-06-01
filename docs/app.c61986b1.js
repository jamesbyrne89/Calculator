// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTIPLY: 'multiply',
  DIVIDE: 'divide',
  DECIMAL: 'decimal',
  PERCENTAGE: 'percentage',
  EQUALS: 'equals',
  CLEAR: 'clear'
};
},{}],"operatorHandlers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var app_1 = require("./app");

var constants_1 = require("./constants");

function decimal(currentOutput) {
  if (currentOutput.includes('.')) {
    return;
  }

  if (app_1.calculator.getState.previousButtonType === 'operator') {
    app_1.calculator.output = currentOutput + '.';
    return;
  }

  app_1.calculator.output = currentOutput + '.';
}

function clear() {
  app_1.calculator.output = '0';
  app_1.calculator.setState = {
    firstValue: null
  };
  app_1.calculator.setState = {
    operator: null
  };
  app_1.calculator.setState = {
    secondValue: null
  };
  app_1.calculator.setState = {
    previousButtonType: null
  };
}

function add() {
  app_1.calculator.setState = {
    operator: constants_1.actions.ADD
  };
}

function subtract() {
  app_1.calculator.setState = {
    operator: constants_1.actions.SUBTRACT
  };
}

function multiply() {
  app_1.calculator.setState = {
    operator: constants_1.actions.MULTIPLY
  };
}

function divide() {
  app_1.calculator.setState = {
    operator: constants_1.actions.DIVIDE
  };
}

function percentage(input) {
  return parseFloat(input) / 100;
}

function calculate(_a) {
  var firstVal = _a.firstVal,
      operator = _a.operator,
      secondVal = _a.secondVal;

  switch (operator) {
    case constants_1.actions.ADD:
      return parseFloat(firstVal) + parseFloat(secondVal);

    case constants_1.actions.SUBTRACT:
      return parseFloat(firstVal) - parseFloat(secondVal);

    case constants_1.actions.MULTIPLY:
      return parseFloat(firstVal) * parseFloat(secondVal);

    case constants_1.actions.DIVIDE:
      return parseFloat(firstVal) / parseFloat(secondVal);

    default:
      return 0;
  }
}

function equals(firstVal, operator, secondVal) {
  var result = calculate({
    firstVal: firstVal,
    operator: operator,
    secondVal: secondVal
  });
  app_1.calculator.output = result.toString();
  app_1.calculator.setState = {
    firstValue: null
  };
  app_1.calculator.setState = {
    operator: null
  };
  app_1.calculator.setState = {
    secondValue: null
  };
  app_1.calculator.setState = {
    previousButtonType: null
  };
}

exports.default = {
  decimal: decimal,
  clear: clear,
  equals: equals,
  add: add,
  subtract: subtract,
  divide: divide,
  multiply: multiply,
  percentage: percentage,
  calculate: calculate
};
},{"./app":"app.ts","./constants":"constants.ts"}],"app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("./constants");

var operatorHandlers_1 = __importDefault(require("./operatorHandlers"));

var Calculator =
/** @class */
function () {
  function Calculator() {
    var _this = this;

    this.state = {
      previousButtonType: null,
      firstValue: null,
      secondValue: null,
      operator: null
    };
    this.buttonElements = document.querySelector('.calculator__buttons');
    this.display = document.querySelector('.calculator__output');
    this.clearButton = document.querySelector('[data-action="clear"]');

    this.handleNumber = function (currentOutput, buttonValue) {
      if (hasDecimal(currentOutput) && exports.calculator.getState.operator === null) {
        exports.calculator.output = currentOutput + buttonValue;
        return _this;
      }

      if (isStartOfFirstValue(currentOutput)) {
        exports.calculator.output = buttonValue;
        exports.calculator.firstValue = buttonValue;
        return _this;
      }

      if (isFirstValue()) {
        exports.calculator.output = exports.calculator.currentOutput + buttonValue;
        exports.calculator.firstValue = exports.calculator.currentOutput + buttonValue;
        return _this;
      } // Set second value


      if (isSecondValue()) {
        exports.calculator.secondValue = currentOutput;
        exports.calculator.output = buttonValue;
      } else {
        exports.calculator.output = exports.calculator.currentOutput + buttonValue;
      }

      return _this;
    };

    this.toggleClearMode = function (action) {
      if (action === constants_1.actions.CLEAR) {
        _this.clearButton.textContent = 'AC';
      } else {
        _this.clearButton.textContent = 'CE';
      }
    };

    this.handleOperator = function (action) {
      return operatorHandlers_1.default[action](_this.currentOutput);
    };

    this.buttonHandler = function (e) {
      var button = e.target;

      if (button.matches('.calculator__button')) {
        var action = button.dataset.action;
        var buttonValue = button.textContent.trim(); // Toggle clear button text

        _this.toggleClearMode(action);

        if (!action) {
          // Is number key
          return _this.handleNumber(_this.currentOutput, buttonValue);
        } // is action key


        if (isAction(constants_1.actions, action)) {
          _this.setState = {
            previousButtonType: 'operator'
          };

          if (action === constants_1.actions.EQUALS) {
            return operatorHandlers_1.default.equals(_this.getState.firstValue, _this.getState.operator, _this.currentOutput);
          }

          if (action === constants_1.actions.PERCENTAGE) {
            _this.output = operatorHandlers_1.default.percentage(_this.currentOutput).toString();
            return;
          }

          exports.calculator.firstValue = _this.currentOutput;
          return _this.handleOperator(action);
        }
      }
    };

    this.buttons.addEventListener('click', function (e) {
      return _this.buttonHandler(e);
    });
  }

  Object.defineProperty(Calculator.prototype, "currentOutput", {
    get: function get() {
      return this.display.textContent;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Calculator.prototype, "output", {
    set: function set(input) {
      this.display.textContent = input;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Calculator.prototype, "buttons", {
    get: function get() {
      return this.buttonElements;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Calculator.prototype, "getState", {
    get: function get() {
      return this.state;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Calculator.prototype, "setState", {
    set: function set(newState) {
      this.state = Object.assign(this.state, newState);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Calculator.prototype, "firstValue", {
    set: function set(value) {
      this.setState = {
        firstValue: value
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Calculator.prototype, "secondValue", {
    set: function set(value) {
      this.setState = {
        secondValue: value
      };
    },
    enumerable: true,
    configurable: true
  });
  return Calculator;
}();

function hasDecimal(str) {
  var regex = /\./g;
  return regex.test(str);
}

exports.hasDecimal = hasDecimal;

function isFirstValue() {
  return exports.calculator.getState.firstValue === null;
}

function isStartOfFirstValue(currentOutput) {
  return isFirstValue() || currentOutput === '0';
}

function isSecondValue() {
  return exports.calculator.getState.firstValue && exports.calculator.getState.previousButtonType === 'operator' && exports.calculator.getState.secondValue === null;
}

function isAction(actions, action) {
  return !action || Object.keys(actions).includes(action.toUpperCase());
}

exports.calculator = new Calculator();
},{"./constants":"constants.ts","./operatorHandlers":"operatorHandlers.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61004" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map