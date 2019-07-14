// reduce
// 재귀적으로 (((0+1)+2)+3) 을 수행
// 원래 들어온 자료를 축약해서(ex, array -> number) 리턴할 때 사용

function add(a, b) {
    return a+b;
}

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

var slice = Array.prototype.slice;
function _rest(list, num){
    return slice.call(list, num || 1);
}
function _reduce2(list, iter, memo){
    if( arguments.length == 2 ){
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function(val){
        memo = iter(memo, val);
    });
    return memo;
}

var one = _reduce([1,2,3,4], add, 0);
console.log(one);

var two = _reduce2([1,2,3,4], add);
console.log(two);