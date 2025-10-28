const { NotImplementedError } = require("../extensions/index.js");

module.exports = class BloomFilter {
  /**
   * @param {number} size
   */
  constructor(size = 100) {
    this.size = size;
    this.store = this.createStore(this.size);
  }

  /**
   * @param {string} item
   */
  insert(item) {
    const hashValues = this.getHashValues(item);
    
    hashValues.forEach(hash => {
      this.store.setValue(hash);
    });
  }

  /**
   * @param {string} item
   * @return {boolean}
   */
  mayContain(item) {
    const hashValues = this.getHashValues(item);
    
    for (let i = 0; i < hashValues.length; i++) {
      if (!this.store.getValue(hashValues[i])) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * @param {number} size
   * @return {Object}
   */
  createStore(size) {
    const storage = new Array(size).fill(false);
    
    return {
      getValue(index) {
        return storage[index];
      },
      
      setValue(index) {
        storage[index] = true;
      }
    };
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash1(item) {
    let hash = 0;
    
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) + hash + item.charCodeAt(i);
      hash = hash & hash;
      hash = Math.abs(hash);
    }
    
    return hash % this.size;
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash2(item) {
    let hash = 5381;
    
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) + hash + item.charCodeAt(i);
    }
    
    return Math.abs(hash) % this.size;
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash3(item) {
    let hash = 0;
    
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) - hash;
      hash += item.charCodeAt(i);
      hash = hash & hash;
    }
    
    return Math.abs(hash) % this.size;
  }

  /**
   *
   * @param {string} item
   * @return {number[]}
   */
  getHashValues(item) {
    return [
      this.hash1(item),
      this.hash2(item),
      this.hash3(item)
    ];
  }
};