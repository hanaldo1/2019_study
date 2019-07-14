var users = [
    {id : 1, name : 'ID', age : 36},
    {id : 2, name : 'BJ', age : 32},
    {id : 3, name : 'JM', age : 32},
    {id : 4, name : 'PJ', age : 27},
    {id : 5, name : 'HA', age : 25},
    {id : 6, name : 'JE', age : 26},
    {id : 7, name : 'JI', age : 31},
    {id : 8, name : 'MP', age : 23}
];

// 1. 명령형 코드

// 1.1 30세 이상인 users를 거른다.
// var temp_users = [];
// for( var i = 0; i < users.length; i++){
//     if ( users[i].age >= 30){
//         temp_users.push(users[i]);
//     }
// }
// console.log(temp_users);

// 1.2 30세 이상인 users의 name을 수집한다.
// var names = [];
// for( var i = 0; i < temp_users.length; i++){
//     names.push(temp_users[i].name)
// }
// console.log(names);

// 1.3 30세 미만인 users를 거른다.
// var temp_users = [];
// for( var i = 0; i < users.length; i++){
//     if ( users[i].age < 30){
//         temp_users.push(users[i]);
//     }
// }
// console.log(temp_users);

// 1.4 30세 미만인 users의 age를 수집한다.
// var ages = [];
// for( var i = 0; i < temp_users.length; i++){
//     ages.push(temp_users[i].name)
// }
// console.log(ages);


// 2. _filter, _map으로 리팩토링
// 2.1 _filter
// 1.1과 1.3의 코드가 중복됨 > _filter 함수로

// filter함수는 단순히 users만을 필터링하는 것이 아니라
// 어떠한 조건에 따라 필터링 할 것인지에 대한 보조 함수를 지정함에 따라
// 모든 리스트를 필터링할 수 있다.

function _filter(list, predi) {
    var new_list = [];
    for( var i = 0; i < list.length; i++){
        if (predi(list[i])){
            new_list.push(list[i]);
        }
    }
    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    for( var i = 0; i < list.length; i++){
        new_list.push(mapper(list[i]));
    }
    return new_list;
}

var over_30 = _filter(users, function(user) { return user.age >= 30; });
console.log(over_30);

var over_30_names = _map(over_30, function(user){ return user.name; });
console.log(over_30_names);

var under_30 = _filter(users, function(user){ return user.age < 30; });
console.log(under_30);

var under_30_ages = _map(under_30, function(user){ return user.age; });
console.log(under_30_ages);

// 함수형 프로그래밍에서는 대입문을 거의 사용하지 않는다.