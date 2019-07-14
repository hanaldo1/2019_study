// 순수 함수 
function add(a, b) {
    return a+b;
}

console.log(add(10,5));

var c = 10;
function add2a(a, b){
    return a + b + c;
}
// 만약 프로그램이 작동하면서 변수 c가 변화한다면 이 함수는
// 같은 인자에 대해 다른 값을 리턴할 수 있다. 
// 이러한 함수는 순수 함수가 아님.

var c = 20; 
function add3(a, b) {
    c = b;
    return a+b;
}
// 이 함수는 함수 밖의 변수 c에 변화를 주기 때문에 (부수효과)
// 순수 함수라고 할 수 없다. 

var obj1 = {val : 10};
function add4(obj, b) {
    obj.val += b;
}
// 이 함수는 리턴값도 없고 함수 밖의 객체의 값을 직접 바꾸기 때문에
// 순수 함수라고 할 수 없다.


// 다시 순수 함수
var obj1 = { val : 10 };
function add5(obj, b) {
    return { val : obj.val + b}
}
// 이 경우 인자로 넘겨준 obj의 값을 직접 바꾸는 것이 아니라 참조만
// 해서 b와 더한 값을 값으로 새로운 객체를 만들어 리턴해준다.