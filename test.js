class Promise{
    constructor(executor){
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = value => {
            if(this.state == 'pending'){
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = reason => {
            if(this.state == 'pending'){
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected == 'function' ? onRejected : err => {throw err};

        let promise2 = new Promise((resolve, reject) => {
            if(this.state == 'fulfilled'){
                setTimeout(() => {
                    try {
                         let x = onFulfilled(this.value);
                         resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            };
            if(this.state == 'rejected'){
                setTimeout(() => {
                    try {
                         let x = onRejected(this.reason);
                         resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            };
            if(this.state == 'pending'){
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                             let x = onFulfilled(this.value);
                             resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                             let x = onRejected(this.reason);
                             resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            };
        })
        return promise2;
    }
    catch(fn){
        return this.then(null,fn);
    }
}

function resolvePromise(promise2, x, resolve, reject){
    if(promise2 == x){
        return reject(new TypeError('循环调用'));
    }
    let called;
    if(x != null && (typeof x == 'function' || typeof x == 'object')){
        try {
            let then = x.then;
            if(typeof then == 'function'){
                then.call(x, y => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if(called) return;
                    called = true;
                    reject(err);
                })
            }else{
                resolve(x)
            }
        } catch (e) {
            if(called) return;
            called = true;
            reject(e);
        }
    }else{
        resolve(x)
    }
}

Promise.resolve = function(val) {
    return new Promise((resolve,reject) => {
        resolve(val);
    })
};

Promise.reject = function(reason){
    return new Promise((resolve, reject) => {
        reject(reason)
    })
};

Promise.race = function(promises){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++){
            promises[i].then(resolve,reject);
        }
    })
}

Promise.all = function(promises){
    let arr = [];
    let i = 0;
    function processData(index,data){
        arr[index] = data;
        i++;
        if(i = promises.length){
            resolve(arr);
        };
    };
    return new Promise((resolve, reject) =>{
        for(let i = 0; i < promises.length; i++){
            promises[i].then(data => {
                processData(i, data);
            }, reject);
        }
    })
}



Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
  module.exports = Promise;