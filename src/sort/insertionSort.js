//插入排序
//时间复杂度 O(n^2)
//空间复杂度 O(1)
//初始第一个数为有序区，从左往右将数据依次插入到有序区当中。

function insertionSort(arr){
    let len = arr.length,
        preIndex, current;
    
    for(let i = 1; i < len; i++){
        preIndex = i-1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current){
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
}


let arr = [3,5,32,5,2,1,1,5,2,2]
insertionSort(arr)
console.log(arr)