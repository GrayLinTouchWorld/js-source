//参数定长的柯里化
function curry(fn){
    let len = fn.length,
        preArgs = [].slice.call(arguments, 1)
    
    return function(...args){
        let allArgs = [...preArgs, ...args]
        if(allArgs.length >= len){
            return fn.apply(this, allArgs)
        }else{
            return curry.call(null, fn, ...allArgs)
        }
    }
}

function fn(a, b, c) {
    console.log(a + b + c);
}
var curried = curry(fn);
curried(1, 2, 3); // 6
curried(1, 2)(3); // 6
curried(1)(2, 3); // 6
curried(1)(2)(3); // 6
curried(7)(8)(9); // 24

//参数不定长的柯里化

function curry(fn){
    const preArgs = [].slice.call(arguments,1)

    function curried(...args){
        const allArgs = [...preArgs, ...args]
        return curry.call(null, fn, ...allArgs)
    }

    curried.toString = () =>{
        console.log(preArgs)
        return fn.apply(this, preArgs)
    }

    return curried;
}
  
// function dynamicAdd() {
//     return [...arguments].reduce((prev, curr) => {
//         return prev + curr
//     }, 0)
// }

// var add = curry(dynamicAdd);
// let d = add(1)(2)(3,4)
// alert(d)