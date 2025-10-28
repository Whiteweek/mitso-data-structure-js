const { NotImplementedError } = require('../extensions/index.js');

module.exports = function removeKFromList(l, k) {
  let dummy = { value: 0, next: l };
  let current = dummy;
  
  while (current.next !== null) {
    if (current.next.value === k) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  
  return dummy.next;
}