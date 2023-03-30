/*
  This is a simple single-linked list implementation, including the ability to display the full linked list.
*/

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.next = null;
    }
    add(value) {
        const node = new Node(value);
        node.next = this.head;
        this.head = node;
    }
    get display() {
        let nodes = [`Head: ${this.head.value}`];
        let current = this.head.next;
        while(current) {
            if (current.next) {
                nodes.push(`${current.value}`);
            } else {
                nodes.push(`Tail: ${current.value}`);
            }
            current = current.next;
        }
        return nodes.join(" => ");
    }
    get length() {
        let counter = 0;
        let current = this.head;
        while(current) {
            counter++;
            current = current.next;
        }
        return counter;
    }
    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return "Not Found";
    }
    append(value) {
        const node = new Node(value);
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = node;
        return;
    }
    insert(position, value) {
        if (position > this.length) return "Enter valid position";
        if (position === 0) {
            this.add(value);
            return `Sucessfully added ${value} at position ${position}`
        }
        const node = new Node(value);
        let counter = 0;
        let current = this.head;
        let prev = null;
        while (counter < position) {
            counter++;
            prev = current;
            current = current.next;
        }
        node.next = current;
        prev.next = node;
        return `Sucessfully added ${value} at position ${position}`
    }
    delete(value) {
        if (this.length === 0) return console.log("Unable to perform operation: List is empty");
        if (value === this.head.value) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        let prev = null;
        while (current.value !== value) {
            if (!current.next) return console.log("Value not found");
            prev = current;
            current = current.next;
        }
        prev.next = current.next;
        return;
    }
}
