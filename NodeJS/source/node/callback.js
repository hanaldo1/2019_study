function a() {
    console.log('A');
}
a();

// 함수가 값이 될 수 있다.
var b = function(){
    console.log('B');
}
b();

function slowfunc(callback){
    callback(); // callback
}
slowfunc(b);
slowfunc(a);