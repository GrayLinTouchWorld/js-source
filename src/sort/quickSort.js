//快速排序
//最好时间复杂度 O(nlogn) 
//最坏时间复杂度 O(n^2)
//空间复杂度 O(logn)

function quickSort(arr, left = 0, right = arr.length-1){

    if(left < right){
        let partIndex = partition(arr, left, right)
        quickSort(arr, left, partIndex-1)
        quickSort(arr, partIndex+1, right)
    }
}

function partition(arr, left ,right) {     // 分区操作
    let mark = left,
        index = mark+1;
    
    for(let i = index; i <= right; i++){
        if(arr[i] < arr[mark]){
            swap(arr, i, index)
            index++
        }
    }

    swap(arr, mark, index-1)
    return index-1

}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

let arr = [1,23,4,122,1,31,12,3,2]
quickSort(arr)
console.log(arr)