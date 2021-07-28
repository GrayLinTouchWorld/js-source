//节流：n秒内只执行一次函数，点击再多也只执行一次

//定时器方法触发不会立刻执行（等待n秒后执行），停止触发后会再执行一次
//时间戳方法触发会立刻执行，停止后不会再执行一次

//定时器方法
const throttle = (fn, wait = 1000) => {
    let timerId;
    return function(...args){
        if(!timerId){
            timerId = setTimeout(() => {
                // clearTimeout(timerId);
                timerId = null;
                return res = fn.apply(this, args);
            }, wait);
        }
    }
}



//时间戳方法
const throttle = (fn, wait = 1000) => {
    let prev = 0;
    let res;
    return function(...args) {
        let now = +new Date();//+new Date() 会调用Date.prototype 上面的 valueOf方法
        if(now - prev > wait){
            prev = now
            return res = fn.apply(this, args);
        }
    }
}

//双剑合璧方法
//isImmediateLoad表示是否立即执行 true--立即执行 false--禁止立即执行
//isFinalLoad表示停止后是否再次执行 true--停止之后还执行一次 false--停止之后不再执行
//isImmediateLoad和isFinalLoad不能同时设置为false

const throttle = (fn, wait = 1000, {
    //参数结构赋值
    isImmediateLoad = true,
    isFinalLoad = true
} = {}) => {
    let prev = 0,
    timerId;
    const later = (...args) => {
        timerId && clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = null;
            fn.apply(this,args);
        }, wait);
    }
    return function(...args){
        let now = +new Date();
        if(!isImmediateLoad) return later(args);
        
        if(now - prev > wait){
            prev = now;
            return fn.apply(this, args)
        }else if(isFinalLoad){
            return later(args);
        }
    }
}





// const handlescroll = () => {
//     console.log('scroll');
// }

// window.addEventListener('scroll',throttle(handlescroll));