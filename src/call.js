
//手写call
Function.prototype.myCall = function(context){
    context = context || window;
    let fn =  Symbol(context);
    context[fn] = this;
    let arg = [...arguments].slice(1);
    context[fn](...arg);
    delete context[fn];
}

// function Person(name, sex){
//     this.name = name;
//     this.sex = sex;
//     this.say = function(){
//         console.log(this.sex)
//     }
// }

// function talk(){
//     console.log('你好')
// }

// function Man(name, sex, work){
//     let a = [name, sex]
//     Person.myApply(this, a);
//     this.work = work;
// }

// // new Man('gary', 'man', 'IT').say();


// let person = new Person();
// let man = new Man('gary', 'man', 'IT')
// person.say.myBind(man)();
// console.log(person.say)