//手写reduce
//传入两个参数
//第一个参数是回调函数，有4个参数，返回值作为新的累加值
//第二个参数是初始值，可选，若没有填写则默认提取数组第一个值，并从第二个值开始遍历


if(!Array.prototype.reduce){
  Array.prototype.reduce = function(cb, initValue){
    if(!Array.isArray(this)){
      throw new TypeError('not a array')
    }

    //如果数组长度为0并且没有默认值则报错
    if(this.length == 0 && arguments.length < 2){
      throw new TypeError('Reduce of empty array with no initial value')
    }

    var arr = this;
    var res = null;

    //如果有默认值就提取默认值
    if(initValue){
      res = initValue
    }else{
      //没有默认值就取数组第一个值
      res = arr.splice(0,1)[0]
    }

    arr.forEach((item, index) => {
      res = cb(res, item, index, arr)
    })

    return res;
  }
}

let arr = [1,2,3,4]
let result = arr.myReduce((res, cur) => {
  return res + cur
})
console.log(result) // 10