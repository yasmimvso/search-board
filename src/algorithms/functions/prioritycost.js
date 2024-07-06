class MinHeap2 {
    constructor() {
        this.heap = [];
        this.weightGreed = {
            'OBSTACLE': 1, // exemplo de custo para terreno 1
            'FLOOR_GRAY': 2, // exemplo de custo para terreno 2
            'GRASS': 4, // exemplo de custo para terreno 3
            'WATER': 6  // exemplo de custo para terreno 4
        };
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
            if (this.heap[parent].cost > this.heap[index].cost) {
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
            if (this.rightChildIndex(index) < this.heap.length && this.heap[this.rightChildIndex(index)].cost < this.heap[smallerChild].cost) {
                smallerChild = this.rightChildIndex(index);
            }
            if (this.heap[index].cost > this.heap[smallerChild].cost) {
                this.swap(index, smallerChild);
                index = smallerChild;
            } else {
                break;
            }
        }
    }

    insert(element, terrainType) {
        const cost = this.weightGreed[terrainType];
        this.heap.push({ element, cost });
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

class PriorityQueue2 {
    constructor() {
        this.queue = [];
    }

    enqueue(element, cost) {
        this.queue.push({ element, cost });
        this.queue.sort((a, b) => a.cost - b.cost);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift().element;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[0].element;
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    contains(element) {
        return this.queue.some(item => item.element === element);
    }

    clear() {
        this.queue = [];
    }
}