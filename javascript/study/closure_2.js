// var arr = [];

// for(var i = 0; i < 5; i++){
//     arr[i]=function(){
//         return i;
//     };
// }

// for(var j = 0; j < arr.length; j++){
//     console.log(arr[j]());
// }


var arr2=[];

for(var i = 0; i < 5; i++){
    arr2[i]=(function(i){
        return function(){
            return i;
        }
    })(i);
}

for(var j = 0; j < arr2.length; j++){
    console.log(arr2[j](j));
}