#!/usr/bin/node

import { HashSet } from "./classes_hashSet.js";

// example uses class syntax - adjust as necessary
const test = new HashSet()

// test function set()
 test.set('apple');
 test.set('banana');
 test.set('carrot');
 test.set('dog');
 test.set('elephant');
 test.set('frog');
 test.set('grape');
 test.set('hat');
 test.set('ice cream');
 test.set('jacket');
 test.set('kite');
 test.set('lion');
 test.set('kiwi');
 test.set('mouse');
 test.set('jean');
 test.set('moon');

//test function keys()
console.log(test.keys());

//test function getBucketNum(), size(), length()
console.log(test.getBucketNum());   // 12 (number of non-empty buckets)
console.log(test.size());           // 16 (number of all buckets)
console.log(test.length());         // 16 (number of stored key-value pairs)

// test function set() when value is modified
test.set('kite');
console.log(test.keys());           // uncahged
console.log(test.length());         // 16

// trigger the hash map’s growth functionality and doubling its capacity
test.set('uphone');
console.log(test.keys());
console.log(test.getBucketNum());   // 15
console.log(test.size());           // 32

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
console.log(test.length());            // 15

// test function clear()
test.clear();
console.log(test.getBucketNum());      // 0
console.log(test.length());            // 0
console.log(test.keys())