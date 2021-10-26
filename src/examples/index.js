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
  

function dynamicAdd() {
    return [...arguments].reduce((prev, curr) => {
        return prev + curr
    }, 0)
}

var add = curry(dynamicAdd);
let d = add(1)(2)(3,4)
alert(d)