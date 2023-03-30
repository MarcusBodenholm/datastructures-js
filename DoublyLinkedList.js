/*
  An implementation of a doubly linked list in JavaScript. It includes the ability to display the whole linked list, without looping on itself, as well as
  adding nodes to either the start, the end or insert it at a specific position in the linked list. It's also possible to specifically remove a node at the
  start, the end or by specifying a specific value. 
  Note: Should probably change the delete to require a specific position instead. 
*/

class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._length = 0;
    }
    add(value) {
        const node = new Node(value);
        if (this.head === null) {
            this.head = node;
            this.head.prev = node;
            this.head.next = node;
            this.tail = node;
            this.tail.prev = node;
            this.tail.next = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            node.prev = this.tail;
            this.tail.next = node;
            this.head = node;    
        }
        this._length += 1;
    }
    get length() {
        return this._length;
    }
    get display() {
        let nodes = [`Head: ${this.head.value}`];
        let current = this.head.next;
        let counter = 2;
        console.log(counter, this.length)
        while(counter < this._length) {
            nodes.push(`${current.value}`);
            current = current.next;
            counter++;
        }
        nodes.push(`Tail: ${this.tail.value}`)
        return nodes.join(" => ");
    }
    search(value) {
        let current = this.head;
        let counter = 2;
        while (counter < this._length) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
            counter++;
        }
        return "Not Found";
    }
    append(value) {
        if (this.head === null) {
            this.add(value);
            return;
        }
        const node = new Node(value);
        node.prev = this.tail;
        node.next = this.head;
        this.tail.next = node;
        this.head.prev = node;
        this.tail = node;
        this._length += 1;
    }
    insert(position, value) {
        if (position > this.length) return "Enter valid position";
        if (position === 0) {
            this.add(value);
            return;
        }
        const node = new Node(value);
        let counter = 1;
        let current = this.head;
        let prev = null;
        while (counter < position) {
            counter++;
            prev = current;
            current = current.next;
        }
        current.prev = node;
        node.next = current;
        node.prev = prev;
        prev.next = node;
        this._length += 1;
        return `Sucessfully added ${value} at position ${position}`
    }
    delete(value) {
        if (this.head === null) return "Nothing to delete"
        let current = this.head;
        if (current.value === value) {
            this.deleteAtStart()
            return;
        }
        if (this.tail.value === value) {
            this.deleteAtEnd()
            return;
        }
        let prev = null;
        let counter = 2;
        while (current.value !== value) {
            counter++;
            if (counter >= this._length) return console.log("Value not found");
            prev = current;
            current = current.next;
        }
        current.next.prev = prev;
        prev.next = current.next;
        this._length -= 1;
        return `Successfully deleted ${value}`
    }
    deleteAtStart() {
        if (this.head === null) return "Nothing to delete"
        const removed = this.head.value
        if (this.length === 1) {
            this.head = null;
            this.tail = null
        } else {
            this.head = this.head.next;
            this.head.prev = this.tail;
            this.tail.next = this.head;    
        }
        this._length--;
        return removed
    }
    deleteAtEnd() {
        if (this.head === null) return "Nothing to delete"
        const removed = this.tail.value
        if (this.length === 1) {
            this.head = null;
            this.tail = null
        } else {
            this.tail = this.tail.prev;
            this.tail.next = this.head;
            this.head.prev = this.tail;
        }
        this._length--;
        return removed
    }
}
