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
 test.set('kiwi', 'brown');
 test.set('mouse', 'grey');
 test.set('jean', 'indigo');
 test.set('moon', 'silver');

// test function entries()
console.log(test.entries());
console.log(test.getBucketNum());   // 12
console.log(test.size());           // 16

// test function set() when value is modified
test.set('kite', 'reddish');
console.log(test.entries());

// trigger the hash map’s growth functionality and doubling its capacity
test.set('uphone', 'teal');
console.log(test.entries());
console.log(test.getBucketNum());   // 15
console.log(test.size());           // 32

// test function get()
console.log(test.get("kite"));      // reddish
console.log(test.get("turtle"));    // null
console.log(test.get("kiwi"));      // brown
console.log(test.get("salmon"));    // null
