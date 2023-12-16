import mongoose ,{ Schema } from "mongoose";

const RegistrationSchema=new Schema({

    // name:{
    //     type:String,
    //     // required:true
    // },
    // mobile:{
    //     type:Number,
    //     // required:true
    // },
    // email:{
    //     type:String,
    //     // required:true
    // },
    // password:{
    //     type:String,
    //     // required:true
    // }
    name:String,
    mobile:Number,
    email:String,
    password:String
})

export const Registration=mongoose.model("RegistrationInfo",RegistrationSchema);

 