console.log(arguments);
console.log(require('module').wrapper);

// module.exports
const Calculator = require('./test-module-1');
const calc1 = new Calculator();
console.log(calc1.add(2, 5));

// exports
const calc2 = require('./test-module-2');
console.log(calc2.add(2, 5));
console.log(calc2.multiply(2, 5));
// destructuring
const { add, multiply, divide } = require('./test-module-2');
console.log(add(2, 5));
console.log(divide(2, 5));

// caching - module really only loaded once due to built-in caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
