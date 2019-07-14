function _curry2(fn){
    return function(a, b){
        return arguments.length == 2 ? fn(a, b) : function(b){ 
            return fn(a, b); } 
    }
}

var add = _curry2(function(a, b){
    return a+b;
});

var add10 = add(10);

console.log(add10(5));
