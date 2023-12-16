import mongoose ,{ Schema } from "mongoose";

const NewConnectionSchema=new Schema({

   
    name:String,
    phone:Number,
    email:String,
    
    date:String,
    address:String,
    status:String,
    nation:String,
    city:String,
    zip:String,
})

export const NewConnectionInfo=mongoose.model("NewConnectionInfo",NewConnectionSchema);