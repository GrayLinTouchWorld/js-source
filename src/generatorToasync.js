//实现async，await
//async本质是封装了generator和一个自动执行器，并返回了一个promise实例

function generatorToasync(gen){
  return new Promise((resolve, reject) => {
    let g = gen();
    function step(nextF){
      let next;
      try {
        next = nextF()
      } catch (error) {
        return reject(error)
      }

      if(next.done){
        //切记要return，不然程序将一直执行下去
        return resolve(next.value)  
      }

      Promise.resolve(next.value).then(value => {
        step(() => g.next(value))
      }, error => {
        step(() => g.throw(error))
      })
    }

    step(() => g.next())
  })
  
}


function fn(nums) {
  return new Promise(resolve => {
      setTimeout(() => {
        resolve(nums * 2)
      }, 1000)
  })
}
//手写调用版本
function* gen() {
  const num1 = yield fn(1)
  console.log(num1) // 2
  const num2 = yield fn(num1)
  console.log(num2) // 4
  const num3 = yield fn(num2)
  console.log(num3) // 8
  return num3
}

const genToAsync = generatorToasync(gen)
console.log(genToAsync) // Promise
genToAsync.then(res => {
  console.log(res)
}) // 8


//async/await版本
// async function asyncFn() {
//   const num1 = await fn(1)
//   console.log(num1) // 2
//   const num2 = await fn(num1)
//   console.log(num2) // 4
//   const num3 = await fn(num2)
//   console.log(num3) // 8
//   return num3
// }
// const asyncRes = asyncFn()
// console.log(asyncRes) // Promise
// asyncRes.then(res => console.log(res)) // 8
