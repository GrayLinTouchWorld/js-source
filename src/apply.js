//手写apply
Function.prototype.myApply = function(context){
    context = context || window;
    let fn =  Symbol(context);
    context[fn] = this;
    let arg = [...arguments].slice(1)[0];
    context[fn](...arg);
    delete context[fn];
}


