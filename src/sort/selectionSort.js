//选择排序
//时间复杂度 O(n^2)
//空间复杂度 O(1)
//将数组分为无序区和有序区，每次在无序区中选择最大（小）的值和无序区的第一个交换位置，无序区个数减一，有序区个数加一。

function selectionSort(arr){
    let len = arr.length;

    for(let i = 0; i < len-1; i++){
        let minIndex = i;
        for(let j = i+1; j < len; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }

        let data = arr[i]
        arr[i] = arr[minIndex];
        arr[minIndex] = data;
    }
}

let arr = [3,5,32,5,2,1,1,5,2,2]
selectionSort(arr)
console.log(arr)