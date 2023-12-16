import express, { request, response } from 'express'; //create Express server
import mongoose from "mongoose";//database mongoose connection
import { Registration } from './Schemas/RegistrationModel.js';
import { NewConnectionInfo } from './Schemas/NewConnectionMode.js';
import { BookingInfo } from './Schemas/BookingModel.js';
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

function verifyToken(request,response,next){
   const header=request.get('Authorization');
   if(header){
    const token=header.split(" ")[1];
    jwt.verify(token,"secret1234",(error,payload)=>{
        if(error){
            return response.status(401).send({message:"invalid token"});
        }
        else{
            // request.payload=payload;
            next();
        }
    });

   }
   else{
    response.send({message:"please login first"});
   }
    

}


const app = express();
app.use(cors());   ///use for  given the access of the client requests without any interrupt under cors policy 
app.use(express.json());
const connectdb=async()=>{
    try {
       await mongoose.connect("mongodb://localhost:27017/projectdb");
        console.log("connection established");
    } catch (error) {
       console.log(error);
        
    }

}
//Admin ===============================================================================
// app.post('/admin',async(req, res)=>{
//     try {
//         const reqdata=request.body;
//         reqdata['password']=bcrypt.hashSync(reqdata.password,10);
//         const Registrations=new Registration(reqdata);
//         await Registrations.save();
//         res.send({message:'Loing successfully'});
//     } catch (error) {
//         res.send({message:'Error connecting to'})
        
//     }
// });

app.post('/admin',async(request,response) => {
    try {
        const reqdata=request.body;
        reqdata['password']=bcrypt.hashSync(reqdata.password,10);

        
        const Registrations=new Registration(reqdata);
        await Registrations.save();
        response.send({message:'Registered successfully'});
    } catch (error) {
        response.send({message:'Error connecting to'})
        
    }
});


app.post('/admin/login',async(request,response) => {
    try {
         const admin=await Registration.findOne({email:request.body.email});
        if(admin){
            if(bcrypt.compareSync(request.body.password,admin.password)){
                const token=jwt.sign({adminEmail:admin.email},"secret1234");
                response.send({message:'Login successfully',token:token});
            }
            else{
                response.send({message:'Invalid password'});
            }
        }
        else{
            response.send({message:'Invalid Email'});
        }
    } catch (error) {
        response.send({message:'Error connecting to'})
        
    }
    
})









// Registration api =================================================================
app.post('/subdetail',async(request,response) => {
    try {
        const reqdata=request.body;
        const Registrations=new Registration(reqdata);
        await Registrations.save();
        response.send({message:'Registered successfully'});
    } catch (error) {
        response.send({message:'Error connecting to'})
        
    }
})

app.get('/fetchdetails',async(request,response)=>{
    try {
        const Registrations=await Registration.find();
        response.send({Registrations:Registrations});
    } catch (error) {
        response.send({message:'Data not found'})
        
    }
});


app.get('/regis/:name',async(request,response)=>{
    try {
       const Registrations= await Registration.findOne({name:request.params.name});
       response.send({Registrations:Registrations});
       response.send({message:"succesfully"});
    } catch (error) {
        response.send({message:'Data not found'})
    }
});

app.delete('/register:name',verifyToken,async(request,response)=>{
    try {
       const Registrations= await Registration.deleteOne({name:request.params.name});
       response.send({message:"data deleted successfully"});
    } catch (error) {
        response.send({message:'Data not found'})
    }
});

app.put("/update/:name",async(request,response)=>{
    try {
        await Registration.updateOne({name:request.params.name},request.body);
        response.send({message:"UPDATE_SUCCESS"});
    } catch (error) {
        response.status("INTERNAL_SERVER_ERROR").send({message:"ERROR_MESSAGE"});
    }
});

//New Connection api =================================================================

app.post('/newconnection',async(request,response) => {
    try {
        const reqdata=request.body;
        const NewConnections=new NewConnectionInfo(reqdata);
        await NewConnections.save();
        response.send({message:'Successfully Got Connections'});
    } catch (error) {
        response.send({message:'Error connecting to'})
        
    }
})
app.get('/fetnewconndetail',async(request,response)=>{
    try {
        const NewConnections=await NewConnectionInfo.find();
        response.send({NewConnections:NewConnections});
    } catch (error) {
        response.send({message:'Data not found'})
        
    }
});

app.get('/fetnewcust/:name',async(request,response)=>{
    try {
       const NewConnections= await NewConnectionInfo.findOne({name:request.params.name});
       response.send({NewConnections:NewConnections});
    //    response.send({message:"succesfully"});
    } catch (error) {
        response.send({message:'Data not found'})
    }
});

//delete the particular data in the database base ont 
app.delete('/deletedetail/:name',async(request,response)=>{
    try {
        const Registrations= await NewConnectionInfo.deleteOne({name:request.params.name});
        response.send({message:"data deleted successfully"});
     } catch (error) {
         response.send({message:'Data not found'})
     }
});

app.put("/updatedetail/:name",async(request,response)=>{
    try {
        await NewConnectionInfo.updateOne({name:request.params.name},request.body);
        response.send({message:"UPDATE_SUCCESS"});
    } catch (error) {
        response.status("INTERNAL_SERVER_ERROR").send({message:"ERROR_MESSAGE"});
    }


});


app.get('/getbookingdata',async(request,response)=>{
    try {
        const result=await BookingInfo.find();
        response.send({result:result});
    } catch (error) {
        response.send({message:'Data not found'})
        
    }
});

app.post('/savebookindata',async(request,response) => {
    try {
        const reqdata=request.body;
        const result=new BookingInfo(reqdata);
        await result.save();
        response.send({message:'Successfully Got Connections'});
    } catch (error) {
        response.send({message:'Error connecting to'})
        
    }
})


app.listen(4555,() => {
    console.log("Server is running");
    connectdb();
   


})