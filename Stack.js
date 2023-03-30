/*
  A simple stack implementation, extending the functionality of an already implemented DoublyLinkedList.
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

class Stack extends DoublyLinkedList {
    constructor() {
        super()
    }
    get size() {
        return this.length
    }
    isEmpty() {
        return this.size === 0
    }
    push(element) {
        this.append(element)
    }
    pop() {
        if (this.isEmpty()) return "Stack is empty"
        return this.deleteAtEnd()
    }
    peek() {
        if (this.isEmpty()) return "Stack is empty"
        return this.tail.value;
    }
}
