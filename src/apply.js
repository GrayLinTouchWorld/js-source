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

Function.prototype.myApply = function(context = window, args){
    if(typeof this != 'function'){
        throw new TypeError()
    }

    let fn = Symbol(context)
    context[fn] = this;
    let res;
    if(args){
        res = context[fn](...args)
    }else{
        res = context[fn]()
    }
    delete context[fn]

    return res;
}

let obj = {name:'gary'}

function sayName(name,a){
    console.log(this.name, name,a)
}

sayName.myApply(obj, ['lin', 'a'])


