//LRU(Least Recently Used)最近最少使用算法
//当数据超出缓存容量时，将最久没有使用的数据删除

class LRUCache {
    constructor(capacity){
        this.capacity = capacity
        this.map = new Map
    }

    get(key){
        if(!this.map.has(key)){
            return -1
        }

        let val = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, val)

        return val;
    }

    put(key, value){
        if(this.map.has(key)){
            this.map.delete(key)
        }

        this.map.set(key, value);
        let keys = this.map.keys();
        while(this.map.size > this.capacity){
            this.map.delete(keys.next().value)
        }
    }
}

const lRUCache = new LRUCache(2);
console.log(lRUCache.put(1, 1)); // 缓存是 {1=1}
console.log(lRUCache.put(2, 2)); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get(1));    // 返回 1
console.log(lRUCache.put(3, 3)); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache.get(2));    // 返回 -1 (未找到)
console.log(lRUCache.put(4, 4)); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache.get(1));    // 返回 -1 (未找到)
console.log(lRUCache.get(3));    // 返回 3
console.log(lRUCache.get(4));    // 返回 4


