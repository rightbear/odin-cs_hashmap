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
        const nonEmpy = this.#buckets.reduce((accumulator, currentValue) => {
            if(currentValue !== undefined) {
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
    // if collision happens, follow the Linked List in bucket to add/update new value
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
            this.#capacity *= 2;

            // recalculate the indexes of all key-value pairs, and allocate pairs to the new bucket
            const allMapPairs = this.entries()
            this.#buckets = new Array(this.#capacity).fill(undefined);

            allMapPairs.forEach((pair) => {
              this.set(pair[0], pair[1]);
            });
        }
    }

    // take a key and returns the value assigned to the key and otherwise returns null
    get(key) {
      const index = this.hash(key);
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

  // return the array of all nodes in the list
  getAllPairs() {
    const pairs = [];
    let current = this.headNode;

    while (current !== null) {
      pairs.push(current.getPair());
      current = current.nextNode;
    }

    return pairs;
  }

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
}

class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }

  getPair() {
    return [this.key, this.value];
  }
}