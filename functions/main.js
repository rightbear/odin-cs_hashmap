#!/usr/bin/node

import { HashMap } from "./classes.js";

// example uses class syntax - adjust as necessary
const test = new HashMap()

// test function set()
 test.set('apple', 'red');
 test.set('banana', 'yellow');
 test.set('carrot', 'orange');
 test.set('dog', 'brown');
 test.set('elephant', 'gray');
 test.set('frog', 'green');
 test.set('grape', 'purple');
 test.set('hat', 'black');
 test.set('ice cream', 'white');
 test.set('jacket', 'blue');
 test.set('kite', 'pink');
 test.set('lion', 'golden');

// test function entries()
console.log(test.entries());

// trigger the hash map’s growth functionality and doubling its capacity
test.set('moon', 'silver');
console.log(test.entries());