//数组扁平化

let arr = [1,2,[1,2,[1,2]],[12,3]]

// 1.Array.flat()
// console.log(arr.flat(Infinity))

// 2.Array.reduce
// function myFlat(arr){
//     return arr.reduce((pre, cur) => {
//             return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur)
//     }, [])
// }

// 3.正则表达式
// function myFlat(arr){
//     return JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')
// }

// 4.递归
// function myFlat(arr){
//     if(!arr.length) return []

//     let res = []
//     for(let i of arr){
//         if(Array.isArray(i)){
//             res = res.concat(myFlat(i))
//         }else{
//             res.push(i)
//         }
//     }
//     return res;
// }



// 5.结构运算符
function myFlat(arr){
    while(arr.some((item) => Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr;
}



console.log(myFlat(arr))