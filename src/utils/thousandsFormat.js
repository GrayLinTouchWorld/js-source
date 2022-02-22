function thousandsFormat1(d){
  d = d.toString().split('.')
  let arr = d[0].split('').reverse();
  let res = []
  for(let i = 0; i < arr.length;i++){
      if(i % 3 == 0 && i != 0){
          res.push(',')
      }
      res.push(arr[i])
  }
  res.reverse();
  if(d[1]){
      res = res.join("").concat('.'+d[1])
  }else{
      res =  res.join("")
  }
  return res;
}

function thousandsFormat2(num){
  if(num>1000){
    num = num.toString().split('.')
    let d1 = num[0],
        d2 = num[1],
        res = ''
    
    while(d1.length > 3){
      res = ',' + d1.slice(-3) + res;
      d1 = d1.slice(0, d1.length-3);
    }

    if(d1) res = d1+res;
    return res+( d2 ? '.'+d2 : '')
  }
  return num
}

function thousandsFormat3(num){
  return num.toString().replace(/\d+/, function(n){
    return n.replace(/(\d)(?=(\d{3})+$)/g,function(m){
      return m+','  
    })
  })
}

function thousandsFormat4(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


let a = 1000.000
console.log(thousandsFormat4(a))