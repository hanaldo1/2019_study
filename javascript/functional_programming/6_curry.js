// 커링
// 함수와 인자를 다루는 기법
// 함수의 인자를 하나씩 적용해나가다가 필요한 인자가 모두 
// 채워지면 함수 본체를 실행하는 기법

function _curry(fn) {
    return function(a) {
        return function(b){
            return fn(a,b);
        }
    }
}

// curry2의 경우 인자가 2개가 들어왔을 경우
// 바로 fn을 실행하고
// 그렇지 않은 경우 한번 더 들어가게 된다.

function _curry2(fn){
    return function(a, b){
        return arguments.length == 2 ? fn(a, b) : function(b){ return fn(a, b); } 
    }
}

function _curryr(fn){
    return function(a, b){
        return arguments.length == 2 ? fn(a, b) : function(b){ return fn(b, a); }
    }
}

var add = _curry(function(a, b){ return a+b; });
var add2 = _curry2(function(a, b){ return a+b; });

var add10 = add(10);

console.log(add10(5));
console.log(add(5)(3));
console.log(add2(5)(2));
console.log(add2(1, 4));

var sub = _curry(function(a, b){ return a - b });
var sub2 = _curryr(function(a, b){ return a - b; });

console.log(sub(5)(2));
console.log(sub(4)(6));
console.log(sub2(10, 5)); // 5 
var sub10 = sub2(10);
console.log(sub10(5)); // -5 ( 5에서 10을 뺌 )


// _get
// 객체에 있는 값 안전하게 가져오는 함수

var users = {id : 1, name : 'ID', age : 36}; 

function _get(obj, key) {
    return obj == null ? undefined : obj[key]; 
}

console.log(_get(users, 'name'));
console.log(_get(users, 'name'));

// curry으로 

var _get = _curryr(function(obj, key){
    return obj == null ? undefined : obj[key];
});

console.log(users.name);
console.log(_get(users,'name'));
console.log(_get('name')(users));

var get_name = _get('name');

console.log(get_name(users));