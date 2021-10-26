//冒泡排序
//时间复杂度 O(n^2)
//空间复杂度 O(1)
//从左往右两两对比，将大数移动到最右侧
function bubbleSort(arr){
    let len = arr.length;
    for(let i = 0; i < len-1; i++){
        for(let j = 0; j < len-i-1; j++){
            if(arr[j] > arr[j+1]){
                let data = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = data
            }
        }
    }
}


let arr = [3,5,32,5,2,1,1,5,2,2]
bubbleSort(arr)
console.log(arr)