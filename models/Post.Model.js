const mongoose=require('mongoose');

const postSchema=mongoose.Schema(
    {
        title :{type:String, required:true},
        body :{type:String, required:true},
        device :{type:String, required:true},
        authorID :{type:String, required:true}

    },{
        versionKey:false
    }
)
const PostModel=mongoose.model('posts',postSchema)
module.exports=PostModel