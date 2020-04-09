//1.简易版本
//遍历拷贝
function deepClone(target, cache = new WeakMap()){
    //若target为空或者常量则直接返回
    if(target == null || typeof target !== 'object' ){
        return target
    }
    //为了避免循环引用，若存储空间有target，直接返回target
    if(cache.get(target)){
        return target
    }
    let res = Array.isArray(target) ? [] : {};
    cache.set(target, res)
    Object.keys(target).forEach(key => res[key] = deepClone(target[key], cache))
    return res;
}

let a = {
    name: 'garyLin',
    experience:['huaruan','nuote','eyougame'],
    home:{
        a:1,
        b:2,
        c:3
    }
}

let b = deepClone(a);
console.log(b)


//2.
function checkedType(target){
    //检测数据类型
    return Object.prototype.toString.call(target).slice(8, -1);
}
function dClone(target){
    let result, targetType = checkedType(target);
    if(targetType === 'Object'){
        result = {};
    }else if(targetType === 'Array'){
        result = [];
    }else{
        return target;
    }

    for(let i in target){
        let value = target[i];
        if(checkedType(value) === 'Object' || targetType === 'Array'){
            result[i] = dClone(value);
        }else{
            result[i] = value;
        }
    }
    return result;
}