// new 通过构造函数 Test 创建出来的实例可以访问到构造函数中的属性
// new 通过构造函数 Test 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 new 操作符，实例与构造函数通过原型链连接了起来

// 构造函数如果返回原始值，那么这个返回值毫无意义
// 构造函数如果返回值为对象，那么这个返回值会被正常使用

function myNew(Con){
    let arg = [...arguments].slice(1);

    //效率比较低
    // let obj = {}
    // Object.setPrototypeOf(obj, Con.prototype); //等同于 obj.__proto__ = Con.prototype

    let obj = Object.create(Con.prototype)
    
    let res = Con.apply(obj, arg);
    return res instanceof Object ? res : obj
}

// function Test(name, age) {
//     this.name = name
//     this.age = age
// }
// Test.prototype.sayName = function () {
//     console.log(this.name)
// }
// const a = myNew(Test, 'yck', 26)
// console.log(a.name) // 'yck'
// console.log(a.age) // 26
// a.sayName() // 'yck'



//create
Object.mycreate = function(proto, properties) {
    function F() {};
    F.prototype = proto;
    let f = new F();
    if(properties) {
        Object.defineProperties(f, properties);
    }
    return f;
}

// var hh = Object.mycreate({a: 11}, {mm: {value: 10}});
// console.log(hh);