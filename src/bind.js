//手写bind
Function.prototype.myBind = function(context){
    let self = this;
    let arg = [...arguments].slice(1);
    return function(){
        let newArg = [...arguments];
        arg = arg.concat(newArg)
        return self.myApply(context, arg)
    }
}