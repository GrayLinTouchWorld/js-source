//手写apply
// Function.prototype.myApply = function(context){
//     context = context || window;
//     let fn =  Symbol(context);
//     context[fn] = this;
//     let arg = [...arguments].slice(1)[0];
//     let res = context[fn](...arg);
//     delete context[fn];
//     return res;
// }

Function.prototype.myApply = function(context = window, args = []){
    if(typeof this != 'function'){
        throw new TypeError()
    }

    let fn = Symbol(context)
    context[fn] = this;
    let res;
    res = context[fn](...args)
    delete context[fn]

    return res;
}

let obj = {name:'gary'}

function sayName(){
    console.log(this.name)
}

sayName.myApply(obj)


