Object.mycreate = function(proto, properties) {
    function F() {};
    F.prototype = proto;
    let f = new F();
    if(properties) {
        Object.defineProperties(f, properties);
    }
    return f;
}
var hh = Object.mycreate({a: 11}, {mm: {value: 10}});
console.dir(hh);
