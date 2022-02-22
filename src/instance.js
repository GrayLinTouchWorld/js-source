function myInstance(left, right){
    let type = typeof left
    // 类型检测
    if((type === 'object' && left !== null) || type === 'function' ){
        leftValue = left.__proto__;
        rightValue = right.prototype;
        while(true){
            if(leftValue === null) return false;
            if(leftValue === rightValue) return true;
            leftValue = leftValue.__proto__
        }
    }else{return false};
}
  

function parent() {

}

function person (){

}

console.log(myInstance(person, parent))
console.log(myInstance(null, Object))

