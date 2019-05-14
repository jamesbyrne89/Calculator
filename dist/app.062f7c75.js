// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({2:[function(require,module,exports) {
var calculator = document.querySelector('.calculator');
var buttons = document.querySelector('.calculator__buttons');
function buttonHandler(e) {
    var button = e.target;
    if (button.matches('.calculator__button')) {
        var action = button.dataset.action;
        if (!action) {
            // Is number key
            console.log('number key pressed');
        }
    }
}
buttons.addEventListener('click', buttonHandler);
// (function init() {
//   const numbers = document.getElementsByClassName('btn__number');
//   const equalsBtn = document.getElementById('equals');
//   const ac = document.getElementById('ac');
//   const plusMinus = document.getElementById('plus-minus');
//   const percentage = document.getElementById('percentage');
//   const operators = document.getElementsByClassName('operator');
//   // Add keyboard events
//   const _attachKeyboardEvents = function _attachKeyboardEvents() {
//     document.body.addEventListener('keydown', function(e) {
//       let handleInput = new InputHandler();
//       // 0
//       if (e.keyCode === 48 || e.keyCode === 96) {
//         handleInput.getInput();
//         handleInput.updateView('0');
//       }
//       // 1
//       else if (e.keyCode === 49 || e.keyCode === 97) {
//         handleInput.getInput();
//         handleInput.updateView('1');
//       }
//       // 2
//       else if (e.keyCode === 50 || e.keyCode === 98) {
//         handleInput.getInput();
//         handleInput.updateView('2');
//       }
//       // 3
//       else if (e.keyCode === 51 || e.keyCode === 99) {
//         handleInput.getInput();
//         handleInput.updateView('3');
//       }
//       // 4
//       else if (e.keyCode === 52 || e.keyCode === 100) {
//         handleInput.getInput();
//         handleInput.updateView('4');
//       }
//       // 5
//       else if (e.keyCode === 53 || e.keyCode === 101) {
//         handleInput.getInput();
//         handleInput.updateView('5');
//       }
//       // 6
//       else if (e.keyCode === 54 || e.keyCode === 102) {
//         handleInput.getInput();
//         handleInput.updateView('6');
//       }
//       // 7
//       else if (e.keyCode === 55 || e.keyCode === 103) {
//         handleInput.getInput();
//         handleInput.updateView('7');
//       }
//       // 8
//       else if (e.keyCode === 56 || e.keyCode === 104) {
//         handleInput.getInput();
//         handleInput.updateView('8');
//       }
//       // 9
//       else if (e.keyCode === 57 || e.keyCode === 105) {
//         handleInput.getInput();
//         handleInput.updateView('9');
//       }
//       // ===
//       else if (e.keyCode === 13) {
//         handleInput.getInput();
//         handleInput.evaluate(input.innerText);
//       }
//       // *
//       else if (e.keyCode === 57 || e.keyCode === 106) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('*');
//         if (!handleInput.checkDuplicates('*') && input.innerText.length > 0) {
//           handleInput.updateView('*');
//         } else {
//           return;
//         }
//       }
//       // +
//       else if (e.keyCode === 107) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('+');
//         if (!handleInput.checkDuplicates('+') && input.innerText.length > 0) {
//           handleInput.updateView('+');
//         } else {
//           return;
//         }
//       }
//       // -
//       else if (e.keyCode === 109 || e.keyCode === 189) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('-');
//         if (!handleInput.checkDuplicates('-') && input.innerText.length > 0) {
//           handleInput.updateView('-');
//         } else {
//           return;
//         }
//       }
//       // .
//       else if (e.keyCode === 110 || e.keyCode === 190) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('.');
//         if (!handleInput.checkDuplicates('.') && input.innerText.length > 0) {
//           handleInput.updateView('.');
//         } else {
//           return;
//         }
//       }
//       // /
//       else if (e.keyCode === 111 || e.keyCode === 191) {
//         handleInput.getInput();
//         handleInput.checkDuplicates('/');
//         if (!handleInput.checkDuplicates('/') && input.innerText.length > 0) {
//           handleInput.updateView('/');
//         } else {
//           return;
//         }
//       }
//       // Clear
//       else if (e.keyCode === 8 || e.keyCode === 46) {
//         input.innerText = '';
//         output.innerText = '';
//       } else {
//         return;
//       }
//     });
//   };
//   // Add event listeners
//   const _listen = function _listen() {
//     let handleInput = new InputHandler();
//     Array.prototype.forEach.call(numbers, function(item) {
//       item.addEventListener('click', function() {
//         handleInput.getInput();
//         handleInput.updateView(this.innerText);
//       });
//     });
//     equalsBtn.addEventListener(
//       'click',
//       function() {
//         let getTotal = new InputHandler();
//         getTotal.getInput();
//         getTotal.evaluate(input.innerText);
//       },
//       false
//     );
//     ac.addEventListener('click', function() {
//       input.innerText = '';
//       output.innerText = '';
//     });
//     plusMinus.addEventListener('click', function() {
//       handleInput.getInput();
//       handleInput.updateView('-');
//     });
//     Array.prototype.forEach.call(operators, function(item) {
//       item.addEventListener('click', function() {
//         handleInput.getInput();
//         handleInput.checkDuplicates(this.innerText);
//         if (
//           !handleInput.checkDuplicates(this.innerText) &&
//           input.innerText.length > 0
//         ) {
//           handleInput.updateView(this.innerText);
//         } else {
//           return;
//         }
//       });
//     });
//     percentage.addEventListener('click', function() {
//       let getPercentage = new InputHandler();
//       getPercentage.getInput();
//       getPercentage.evaluate(getPercentage.handlePercent(input.innerText));
//     });
//   };
//   _listen();
//   _attachKeyboardEvents();
// })();
// function InputHandler() {
//   const input = document.getElementById('input');
//   const output = document.getElementById('output');
//   this.getInput = function _getInput() {
//     return input.innerText;
//   };
//   this.checkDuplicates = function _checkDuplicates(pressed) {
//     const operators = ['X', '%', '/', '-', '.', '+'];
//     if (operators.indexOf(input.innerText.slice(-1))) {
//       return false;
//     } else {
//       return true;
//     }
//   };
//   this.handlePercent = function _handlePercent(total) {
//     let percTotal = total + '/100';
//     return percTotal;
//   };
//   this.updateView = function updateView(x) {
//     input.innerText += x;
//   };
//   this.evaluate = function _evaluate(total) {
//     let parsedTotal = total.replace('X', '*');
//     let finalTotal = eval(parsedTotal);
//     let stringified = finalTotal.toString();
//     if (stringified.indexOf('.') >= 0 && finalTotal.toString().length > 9) {
//       output.innerText = finalTotal.toFixed(9 - finalTotal.toString().length);
//     } else {
//       output.innerText = finalTotal;
//     }
//   };
// }
},{}],15:[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62226' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[15,2], null)
//# sourceMappingURL=/app.062f7c75.map