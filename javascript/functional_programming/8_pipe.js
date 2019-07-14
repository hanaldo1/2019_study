// 파이프라인
// reduce를 적용해서 만들 수 있다

function _each(list, iter){
    for (var i = 0; i < list.length; i++){
        iter(list[i]);
    }
    return list;
}

function _reduce(list, iter, memo){
    _each(list, function(val){
        memo = iter(memo, val);
    });
    return memo;
}

function _pipe() {
    var fns = arguments;
    return function(arg){
        return _reduce(fns, function(arg, fn){  
            return fn(arg);
        },arg);
    }
}

var f1 = _pipe(
    function(a) { return a + 1; },
    function(a) { return a * 2; }
);
 
console.log(f1(1));

// go
// 즉시 실행되는 pipe 함수

