//数组去重

const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

//1.set
// function deduplicate(arr){
//     return Array.from(new Set(arr));
// }

// 2.双层for循环
// function deduplicate(arr){
//     for(let i = 0; i < arr.length; i++){
//         for(let j = i+1; j < arr.length; j++){
//             if(arr[i] === arr[j]){
//                 arr.splice(j, 1)
//                 j--;
//             }
//         }
//     }
//     return arr;
// }

// 3.indexOf | includes 
// function deduplicate(arr){
//     let res = []
//     for(let i = 0; i < arr.length; i++){
//         //indexOf
//         // if(res.indexOf(arr[i]) == -1){
//         //     res.push(arr[i])
//         // }

//         //includes
//         // if(!res.includes(arr[i])){
//         //     res.push(arr[i])
//         // }
//     }
//     return res;
// } 

// 4.filter
// function deduplicate(arr){
//     return arr.filter((item, index) => {
//         return arr.indexOf(item) === index
//     })
// }

// 5.map
function deduplicate(arr){
    let map = new Map(),
        res = []
    for(let i = 0; i < arr.length; i++){
        if(!map.has(arr[i])){
            map.set(arr[i], true)
            res.push(arr[i])
        }
    }
    return res;
}

console.log(deduplicate(arr))