import mongoose ,{ Schema } from "mongoose";

const BookingSchema=new Schema({

   
    name:String,
    city:String,
    
})

export const BookingInfo=mongoose.model("BookingModel",BookingSchema);