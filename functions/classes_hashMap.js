export { HashMap };

class HashMap {
    #loadFactor;
    #capacity;
    #buckets;

    // the buckets is initially filled with empty slots
    constructor() {
        this.#loadFactor = 0.75;
        this.#capacity = 16;
        this.#buckets = new Array(this.#capacity).fill(undefined);
    }

    // get number of non-empty buckets in hashmap
    getBucketNum(){
        const nonEmpy = this.#buckets.reduce((accumulator, currentBucket) => {
            if(currentBucket !== undefined) {
                accumulator += 1;
            }
            return accumulator;
        }, 0);
        return nonEmpy;
    }

    // get number of all buckets in hashmap
    size() {
      return this.#capacity;
    }

    // take a key and produces a hash code with it
    // assume the function only handle keys of type string
    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.#capacity;
        }

        return hashCode;
    } 

    // if a key already exists, then the old value is overwritten
    // if collision happens, follow the Linked List in bucket to add new value
    set(key, value) {
        const index = this.hash(key);
        if (index < 0 || index >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        if(this.#buckets[index] === undefined) {
            this.#buckets[index] = new LinkedList();
        }
        this.#buckets[index].append(key, value);

        // grow the hash map when there are more entries than prduct of capacity and loadFactor
        if(this.getBucketNum() > ((this.#capacity) * (this.#loadFactor))) {
            this.resize();
        }
    }

    // the function help move pairs from old buckets to new buckets with bigger capacity
    // inside the set function, you may want to directly expand capacity and call set function again for moving pairs 
    // howevwer, if recusrsively call set function, set function may trigger condition of expanding capacity again when recusrsively calling set
    // seperate resize function outside set function to avoid chance of infinite recursion inside set function
    resize(){
      // recalculate the indexes of all key-value pairs, and allocate pairs to the new bucket
      const allMapPairs = this.entries()

      this.#capacity *= 2;
      this.#buckets = new Array(this.#capacity).fill(undefined);

      // the structure of each pair is [key, value]
      allMapPairs.forEach((pair) => {
        const index = this.hash(pair[0]);
        if (index < 0 || index >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        if(this.#buckets[index] === undefined) {
            this.#buckets[index] = new LinkedList();
        }
        this.#buckets[index].append(pair[0], pair[1]);
      });
    }

    // take a key and returns the value assigned to the key and otherwise returns null
    get(key) {
      const index = this.hash(key);
      if (index < 0 || index >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
      }

      if(this.#buckets[index] === undefined) {
        console.log("The list is not exist!");
        return null;
      }
      else {
        let value = this.#buckets[index].contains(key);
        // don't use '==' here, because `"" == false` is true (empty string is considered a "falsy" value) 
        if(value === false) {
          return null;
        } else {
          return value;
        }
      }
    }

    // take a key and return true or false based on whether the key is in the hash map
    has(key) {
      const index = this.hash(key);
      if (index < 0 || index >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
      }

      if(this.#buckets[index] === undefined) {
        console.log("The list is not exist!");
        return false;
      }
      else {
        let result = this.#buckets[index].contains(key);
        if(result === false) {
          return false;
        } else {
          return true;
        }
      }
    }

    // if the given key is in the hash map, it should remove the entry with that key and return true.
    // if the list of the removed entry has no entry, clear the bucket
    // if the key isn’t in the hash map, it should return false.
    remove(key) {
      const index = this.hash(key);
      if (index < 0 || index >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
      }

      if(this.#buckets[index] === undefined) {
        return false;
      } else {
        let value = this.#buckets[index].erase(key);
        // don't use '==' here, because `0 == false` is true (0 is considered a "falsy" value) 
        if(value === false) {
          return false;
        } else {
          if(value === 0){
            this.#buckets[index] = undefined;
          }
          return true;
        }
      }
    }

    // return the number of stored keys in the hash map
    length() {
      let pairsNum = 0;
        this.#buckets.forEach((element) => {
            if(element !== undefined) {
              pairsNum += element.getSize();
            }
        });

        return pairsNum;
    }
    
    // remove all entries in the hash map
    clear() {
      this.#buckets.forEach((element, index, bucketArray) => {
          if(element !== undefined) {
            bucketArray[index] = undefined;
          }
      });
    }

    // return an array containing all the keys inside the hash map
    keys() {
      let allMapPairs = [];
        this.#buckets.forEach((element) => {
            if(element !== undefined) {
              allMapPairs = allMapPairs.concat(element.getAllKeys());
            }
        });

        return allMapPairs;
    }

    // return an array containing all the values
    values() {
      let allMapPairs = [];
        this.#buckets.forEach((element) => {
            if(element !== undefined) {
              allMapPairs = allMapPairs.concat(element.getAllValues());
            }
        });

        return allMapPairs;
    }

    // returns an array that contains each [key, value] pair
    entries() {
        let allMapPairs = [];
        this.#buckets.forEach((element) => {
            if(element !== undefined) {
              allMapPairs = allMapPairs.concat(element.getAllPairs());
            }
        });

        return allMapPairs;
    }
}

// Reuse class LinkedList and class Node in previous project
class LinkedList {
  constructor() {
    this.headNode = null; // LinkedList "has a" Node
  }

  // add a new node with key-value pair to the end of the list
  // if a node with same key already exists, just update the value
  append(newKey, newValue) {
    // deal with head node seperately
    if (this.headNode === null) {
      this.prepend(newKey, newValue);
    } else {
      let current = this.headNode;
      while (current !== null) {
        // if the key already exist in one node, update the value
        if(current.key === newKey) {
            current.value = newValue;
            return;
        }

        // if the currently last node has been reached, add the new node
        if(current.nextNode === null) {
          current.nextNode = new Node(newKey, newValue);
          return;
        }
        current = current.nextNode;
      }
    }
  }

  // add a new node containing value to the start of the list
  prepend(newKey, newValue) {
    this.headNode = new Node(newKey, newValue, this.headNode);
  }

  // return the array of all keys in the list
  getAllKeys() {
    const keys = [];
    let current = this.headNode;

    while (current !== null) {
      keys.push(current.getKey());
      current = current.nextNode;
    }

    return keys;
  }

  getAllValues() {
    const values = [];
    let current = this.headNode;

    while (current !== null) {
      values.push(current.getValue());
      current = current.nextNode;
    }

    return values;
  }

  // return the array of all pairs in the list
  getAllPairs() {
    const pairs = [];
    let current = this.headNode;

    while (current !== null) {
      pairs.push(current.getPair());
      current = current.nextNode;
    }

    return pairs;
  }

  // find the value at the given key
  // return value if the passed in key is in the list and otherwise returns false
  contains(key) {
    if (this.headNode === null) {
      console.log("The list is already empty!");
      return false;
    } else {
      let current = this.headNode;

      while (current != null) {
        if (current.key === key) {
          return current.value;
        } else {
          current = current.nextNode;
        }
      }
      return false;
    }
  }

  // remove a pair at the given key
  // if the passed in key is in the list then return length of the list without the removed pair
  // if the passed in key is not in the list then returns false
  erase(key) {
    if (this.headNode === null) {
      console.log("The list is empty!");
      return false;
    }  else {
      // deal with head node seperately
      if (this.headNode.getKey() === key) {
        this.headNode = this.headNode.nextNode;
        return this.getSize();
      } else {
        let previous = null,
        current = this.headNode;

        while (current !== null) {
          if (current.getKey() === key) {
            previous.nextNode = current.nextNode;
            return this.getSize();
          }

          previous = current;
          current = current.nextNode;
        }
        return false;
      }
    }
  }

  // return the total number of pairs in the list
  getSize() {
    let size = 0;
    let current = this.headNode;

    while (current !== null) {
      size += 1;
      current = current.nextNode;
    }

    return size;
  }

}

class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }

  getKey() {
    return this.key;
  }

  getValue() {
    return this.value;
  }

  getPair() {
    return [this.key, this.value];
  }
}