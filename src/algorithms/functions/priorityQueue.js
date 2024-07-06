class MinHeap {
    constructor() {
        this.heap = [];
    }

    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    leftChildIndex(index) {
        return (2 * index) + 1;
    }

    rightChildIndex(index) {
        return (2 * index) + 2;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = this.parentIndex(index);
            if (this.heap[parent].priority > this.heap[index].priority) {
                this.swap(parent, index);
                index = parent;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.leftChildIndex(index) < this.heap.length) {
            let smallerChild = this.leftChildIndex(index);
            if (this.rightChildIndex(index) < this.heap.length && this.heap[this.rightChildIndex(index)].priority < this.heap[smallerChild].priority) {
                smallerChild = this.rightChildIndex(index);
            }
            if (this.heap[index].priority > this.heap[smallerChild].priority) {
                this.swap(index, smallerChild);
                index = smallerChild;
            } else {
                break;
            }
        }
    }

    insert(element, priority) {
        this.heap.push({ element, priority });
        this.heapifyUp();
    }

    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop().element;
        }
        const root = this.heap[0].element;
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0].element;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    clear() {
        this.heap = [];
    }
  
    contains(element) {
        return this.heap.some(item => item.element === element);
    }
}

class PriorityQueue {
    constructor() {
        this.minHeap = new MinHeap();
    }

    enqueue(element, priority) {
        this.minHeap.insert(element, priority);
    }

    dequeue() {
        return this.minHeap.extractMin();
    }

    peek() {
        return this.minHeap.peek();
    }

    size() {
        return this.minHeap.size();
    }

    isEmpty() {
        return this.minHeap.isEmpty();
    }
  
    contains(element) {
        return this.minHeap.contains(element);
    }

    clear() {
        this.minHeap.clear();
    }
}
