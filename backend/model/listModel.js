const mongoose=require("mongoose")
const listSchema=new mongoose.Schema({
    user:{
        type:String,
        required:[true,"Username is required"]
    },
    list:{
        type:Array
    },
    id:{
        type:String
    }
})
const listModel=mongoose.model("List",listSchema)
module.exports=listModel