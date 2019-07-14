/*
var x = 10;

function foo() {
    var x = 100;
    console.log(x);

    function bar() {
        x = 1000;
        console.log(x);
    }

    bar();
}
foo();
console.log(x);
*/

/*
var foo = function () {
    var a = 3, b = 5;

    var bar = function () {
        var b = 7, c = 11;
        a += b + c;
    };
    bar();
};
*/

/*
var x = 1;

function foo() {
    var x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo();
bar();

// scope는 함수가 어디에 선언되었는지에 따라 만들어진다.
bar 함수는 전역에서 선언되었으므로 전역 스코프를 가진다.
따라서, 전역 x(= 1)의 값이 출력된다. 
*/

/*
(function () {
    var MYAPP = {};

    MYAPP.student = {
        name : 'Lee',
        gender : 'male'
    };

    console.log(MYAPP.student.name);
}());

// console.log(MYAPP.student.name);
*/


// 5.17 this
/*
var foo = function () {
    console.log(this);        
};

foo();

var obj = {foo : foo};
obj.foo();

var insance = new foo();

var bar = {name : 'bar'};
foo.call(bar);
foo.apply(bar);
foo.bind(bar)();
*/


// 5.17.2 메소드 호출
var obj1 = {
    name : 'Lee',
    sayName : function(){
        console.log(this.name);
    }
}

var obj2 = {
    name : 'Kim'
}
obj2.sayName = obj1.sayName;

obj1.sayName();
obj2.sayName();

// 5.17.3.1 생성자 함수 동작 순서
function Person(name) {
    // 1. 빈 객체 생성 및 this 바인딩
    this.name = name; // 2. this를 통한 프로퍼티 생성
    // 3. 생성된 객체 반환
}

// 5.17.3.3 생성자 함수에 new 연산자를 붙이지 않고 호출할 경우
// scope-safe constructor pattern

function A(arg){

    // this가 호출된 함수의 인스턴스가 아니면 new 연산자를 사용하지 않은 것이므로
    // 이 경우 new와 함께 생성자 함수를 호출하여 인스턴스를 반환한다.
    // new를 사용하지 않은 경우 this는 전역 객체(window or global)
    if (!(this instanceof arguments.callee)){
        return new arguments.callee(arg);
    }
    this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);