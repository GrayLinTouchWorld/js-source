//堆排序
//时间复杂度 O(nlogn)
//空间复杂度 O(1)

function heapSort(arr){
  if(arr.length < 2 || arr == null) return arr;

  //生成大根堆
  // for(let i = 0; i < arr.length; i++){ //O(N)
  //   heapInsert(arr, i); // O(logN)
  // }
  //第二种生成大根堆的方法，速度更快
  for(let i = arr.length-1; i >= 0; i--){
    heapify(arr, i , arr.length);
  }

  //将最大值与最后一个值交换，并归入排序完毕区
  let heapSize = arr.length;
  swap(arr, 0, --heapSize);

  //继续生成大根堆
  while(heapSize > 0){  //O(N)
    heapify(arr, 0, heapSize); //O(logN)
    swap(arr, 0, --heapSize); //O(1)
  }

}

function heapInsert(arr, index){
  while(arr[index] > arr[(index-1)>>1]){
    swap(arr, index, (index-1)>>1);
    index = (index-1)>>1
  }
}

function heapify(arr, index, heapSize){
  let left = 2*index+1;
  while(left < heapSize){
    let largest = left+1 < heapSize && arr[left+1] > arr[left] ? left+1 : left;
    largest = arr[index] > arr[largest] ? index : largest;

    if(largest == index) break;

    swap(arr, index, largest);
    index = largest;
    left = 2*index+1;
  }
}

function swap(arr, i, j){
  let data = arr[i];
  arr[i] = arr[j];
  arr[j] = data;
}

let arr = [1,23,4,122,1,31,12,3,2,432234,0,24,2,342,42,423,42,423,23,4234,234,34,234,43,5,5,345,3,-434,-54,4]
heapSort(arr)
console.log(arr)

// console.log(arr.sort((a,b)=> a-b))