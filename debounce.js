//防抖：n秒内执行一次函数，若n秒内触发事件则重新计算时间

//leading判断是否可以立即执行回调函数，不必要等到事件停止触发后才开始执行

const debounce = (fn, wait = 1000, leading = true) => {
    let timeId, res;
    return function(...args){
        timeId && clearTimeout(timeId);
        if(leading){
            if(!timeId) res = fn.apply(this, args)
            timeId = setTimeout(()=> timeId = null, wait)
        }else{
            timeId = setTimeout(() => res = fn.apply(this, args), wait);
        }
        return res;
    }
}

// const handlescroll = () => {
//     console.log('scroll')
// }

// window.addEventListener('scroll',debounce(handlescroll))

