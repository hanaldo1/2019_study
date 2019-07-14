// 일급 함수
// 함수를 값으로 다룰 수 있다
// 인자로 넘겨질 수 있다

var f1 = function(a) { return a * a; };

function f3(f) {
    return f();
}
console.log(f3(function() { return 10; }));


// add maker

function add_maker(a){
    return function(b) {
        return a+b;
    }
}

var am1 = add_maker(10);
console.log(am1(20));

function f4(f1, f2, f3) {
    return f3(f1()+f2());
}

var f = f4(
    function(){return 1;},
    function(){return 2;},
    function(a){return a*a;}
);

console.log(f)