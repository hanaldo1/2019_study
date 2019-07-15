// models/Post.js

var mongoose = require("mongoose");

// schema
var postSchema = mongoose.Schema({
    title:{type:String, required: true},
    body:{type:String},
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals: true}
});

// virtuals 
postSchema.virtual("createdDate")
.get(function(){
    return getDate(this.createdAt);
});

postSchema.virtual("createdTime")
.get(function(){
    return getTime(this.createdAt);
});

postSchema.virtual("updateDate")
.get(function(){
    return getDate(this.updatedAt);
});

postSchema.virtual("updateTime")
.get(function(){
    return getTime(this.updatedAt);
});

// model 
var Post = mongoose.model('post', postSchema);
module.exports = Post;

// function
function getDate(dateObj){
    if(dateObj instanceof Date)
        return dateObj.getFullYear() + "-" + get2digits(dateObj.getMonth()+1) + "-" + get2digits(dateObj.getDate());
}

function getTime(timeObj){
    if(timeObj instanceof Date)
        return get2digits(timeObj.getHours()) + ":" + get2digits(timeObj.getMinutes()) + ":" + get2digits(timeObj.getSeconds());
}

function get2digits(num){
    return ("0" + num).slice(-2);
}