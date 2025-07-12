#!/usr/bin/node

import { HashMap } from "./classes_hashMap.js";

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

//test function keys(), values(), entries()
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

//test function getBucketNum(), size(), length()
console.log(test.getBucketNum());   // 12 (number of non-empty buckets)
console.log(test.size());           // 16 (number of all buckets)
console.log(test.length());         // 16 (number of stored key-value pairs)

// test function set() when value is modified
test.set('kite', 'reddish');
console.log(test.keys());           // uncahged
console.log(test.values());         // 'pink' is substitued with 'reddish'
console.log(test.entries());
console.log(test.length());         // 16

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

// test function has()
console.log(test.has("shark"));     // false
console.log(test.has("mouse"));     // true
console.log(test.has("tiger"));     // false
console.log(test.length());         // 17

// test function remove()
console.log(test.remove("grape"));     // true
console.log(test.getBucketNum());      // 14
console.log(test.remove("star"));      // false
console.log(test.remove("jean"));      // true
console.log(test.getBucketNum());      // 13
console.log(test.remove("dolphine"));  // false
console.log(test.entries());
console.log(test.length());            // 15

// test function clear()
test.clear();
console.log(test.getBucketNum());      // 0
console.log(test.length());            // 0
console.log(test.entries());