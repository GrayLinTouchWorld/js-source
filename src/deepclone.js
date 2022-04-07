//1.JSON转义 
// JSON.parse(JSON.stringify(obj));

/*
* 优点: 快速便捷;

* 缺点：
* 1. 无法拷贝函数； 
* 2. 无法遍历稀疏数组（例如：new Array(3)）； 
* 3. 无法复制正则表达式； 
* 4. 当出现循环引用时会报错； 
* 5. 当出现构造函数时会出现指向错误；
*/


//2. 手写实现

//数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const funcTag = '[object Function]';

// 可循环数据
const deepTag = [mapTag, setTag, arrayTag, objectTag];


//将循环改为while循环，因为while循环的速度较快
function forEach(arr, callback){
    let i = -1,
        len = arr.length;
    
    while( ++i < len){
        callback(arr[i], i)
    }

    return arr;
}

//判断是否是引用类型
function isObj(obj){
    let type = typeof obj;
    return obj !== null && (type === 'object' || type === 'function')
}

//判断类型
function getType(obj){
    return Object.prototype.toString.call(obj)
}

//初始化方法
function getInit(obj){
    let Con = obj.constructor;
    return new Con();
}

//克隆Symbol
function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
    //return Symbol(target.description)
}

//克隆正则
function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

//克隆函数
function cloneFunction(target){
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const targetString = target.toString();

    
    if(target.prototype){
        //普通函数
        let bodyContent = bodyReg.exec(targetString);
        let paramsContent = paramReg.exec(targetString);
        if(bodyContent){
            if(paramsContent){
                return new Function(...paramsContent, bodyContent[0])
            }else{
                return new Function(bodyContent[0])
            }
        }else{
            return null;
        }

    }else{
        //箭头函数
        return eval(targetString);
    }
}

//不可循环的对象
function cloneOtherType(obj, type) {
    const Ctor = obj.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(obj);
        case regexpTag:
            return cloneReg(obj);
        case symbolTag:
            return cloneSymbol(obj);
        case funcTag:
            return cloneFunction(obj);
        default:
            return null;
    }
}


function deepClone(obj, map = new WeakMap()){

    //基本类型数据，直接return
    if(!isObj(obj)){
        return obj;
    }

    let type = getType(obj);
    let newObj;
    if(deepTag.indexOf(type) !== -1){
        newObj = getInit(obj);
    }else{
        return cloneOtherType(obj,type);
    }

    //考虑循环引用
    //使用WeakMap是因为其与自身的键是弱引用关系，有利于垃圾回收
    if(map.get(obj)){
        return map.get(obj)
    }
    map.set(obj, newObj)

    //考虑map
    if(type === mapTag){
        obj.forEach((val, key) => {
            newObj.set(key, deepClone(val, map))
        })
        return newObj;
    }

    //考虑set
    if(type === setTag){
        obj.forEach((val) => {
            newObj.add(deepClone(val, map))
        })
        return newObj;
    }

    //考虑对象和数组
    //使用了性能较好的while循环
    //也可以使用forin循环，但是速率不佳
    // for(let key in obj){
    //     newObj[key] = deepClone(obj[key], map)
    // }
    let keys = Array.isArray(obj) ? undefined : Object.keys(obj);
    forEach(keys || obj, (val, key) => {
        if(keys){
            key = val; 
        }
        newObj[key] = deepClone(obj[key], map)
    })

    return newObj;
}

module.exports.deepClone = deepClone;


// example
// const {deepClone} = require('./src/deepclone')

// const map = new Map();
// map.set('key', 'value');
// map.set('ConardLi', 'code秘密花园');

// const set = new Set();
// set.add('ConardLi');
// set.add('code秘密花园');

// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8],
//     empty: null,
//     map,
//     set,
//     bool: new Boolean(true),
//     num: new Number(2),
//     str: new String(2),
//     symbol: Object(Symbol(1)),
//     date: new Date(),
//     reg: /\d+/,
//     error: new Error(),
//     func1: () => {
//         console.log('code秘密花园');
//     },
//     func2: function (a, b) {
//         return a + b;
//     }
// };

// target.target = target;
// const result = deepClone(target);
// console.log(result)
