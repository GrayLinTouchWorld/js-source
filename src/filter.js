//手写Array.prototype.filter

//Array.prototype.map & Array.prototype.forEach 类似
//map返回一个新的数组，forEach直接修改数组

Array.prototype.filter = function(callback, thisArg){
    if(typeof callback != 'function' || !this){
        throw new TypeError()
    }
    const O = Object(this),
        len = this.length >>> 0, //>>>0 保证len为number，且为正整数
        res = []
        for(let i = 0; i < len; i++){
            if(i in O){
                if(callback.call(thisArg, O[i], i, O)){
                    res.push(O[i])
                }
            }
        }
    return res;
}

function isBigEnough(element) {
    return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered)