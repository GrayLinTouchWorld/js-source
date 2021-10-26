function myInstance(left, right){
    // 类型检测
    if(typeof left === 'object' || typeof left === 'function' || left === null){
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
console.log(myInstance(person, Object))

