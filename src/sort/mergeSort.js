//归并排序
//时间复杂度 O(nlogn)
//空间复杂度 O(n)

function mergeSort(arr, left = 0, right=arr.length){
  if(arr.length < 2) return arr;

  let mid = left + ((right-left) >> 1)
  let leftPart = arr.slice(0,mid);
  let rightPart = arr.slice(mid);
  return merge(mergeSort(leftPart), mergeSort(rightPart))
}

function merge(left, right){
  let res = [];
  let l=0,r=0;
  while(l < left.length && r < right.length){
    if(left[l] <= right[r]){
      res.push(left[l++]);
    }else{
      res.push(right[r++]);
    }
  }

  while(l < left.length){
    res.push(left[l++]);
  }

  while(r < right.length){
    res.push(right[r++]);
  }

  return res;
}


let arr = [1,23,4,122,1,31,12,3,2,432234,24,2,342,42,423,42,423,23,4234,234,34,234,43,5,5,345,3,-434,-54,4]
let newArr = mergeSort(arr)
console.log(newArr)