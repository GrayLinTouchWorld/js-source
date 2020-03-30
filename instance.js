function myInstance(left, right){
    leftValue = left.__proto__;
    rightValue = right.prototype;
    while(true){
        if(leftValue === null) return false;
        if(leftValue === rightValue) return true;
        leftValue = leftValue.__proto__
    }
}