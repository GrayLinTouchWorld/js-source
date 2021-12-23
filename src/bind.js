//手写bind
//bind不支持是ie9之前的浏览器，因为我们可以为其做Ployfill
if(!Function.prototype.bind){
    Function.prototype.bind = function(oThis){
        // 检测this,如果不是function则报错
        if(typeof this !== 'function'){
            throw TypeError('type error')
        }

        // 获取参数
        let args = Array.prototype.slice.call(arguments, 1),
            // 记录this
            fn = this,
            // 新建一个function，使用new调用返回的方法，需要放弃转移this指向，改回原来的指向
            noop = function(){},
            // 即将返回的function
            bindFn = function(){
                //如果调用返回的function时有新增的参数，则需要与原来的参数串起来。
                newArgs = args.concat(Array.prototype.slice.call(arguments))
                //如果使用了new调用返回的方法，则会返回一个新的对象，而该对象的__proto__指向的是我们的fn
                //因此我们可以构造一个空对象noop，将他的prototype替换成fn.prototype,然后我们就可以通过instance检测判断是不是new操作
                //this instanceof fn  理论上也是可行的判断
                return fn.apply(this instanceof noop ? this : oThis, newArgs)
            };

        //构建noop
        noop.prototype = fn.prototype;
        bindFn.prototype = new noop(); 
        
        return bindFn;

    }
}

function Foo(){
    this.a = 100;
    return this.b;
}

let bar = Foo.bind({b:1});
console.log(bar()) // 1
console.log(new bar()) // Foo {a:100}