function trim(str){
  if(typeof str != 'string'){
    throw new TypeError()
  }

  return str.replace(/(^\s*)|(\s*$)/, '')
}

let a = '          a          '
console.log(a)
console.log(trim(a))