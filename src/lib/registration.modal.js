import mongoose from "mongoose";


const registration = new mongoose.Schema({

    whatsAppNumbr:{
        type:String,
        trim:true,
        required:true
    },
    teamName:{
        type:String,
        trim:true,
        required:true

    },
    player1:{
        type:String,
        trim:true,
        required:true
    },
    player2:{
        type:String,
        trim:true,
        required:true
    },
     player3:{
        type:String,
        trim:true,
    },
     player4:{
        type:String,
        trim:true,
        required:true
    },
     backupPlayer1:{
        type:String,
        trim:true,
    },
      backupPlayer2:{
        type:String,
        trim:true,
    },
    slot:{
        type:Number,
        default:0,
        required:true
    },
    order_id:{
        type:String,
        required:true,
        trim:true, 
    },
    payment_status:{
        type:String,
        enum:["pending","paid","failed"]
    },

    isSlotGiven:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["confirmed","failed","cancelled","refund","pending"],
        default:"pending"
        
    },

    code:{
        type:String,
        required:true
    }



  

},{timestamps:true});

export default mongoose.models.Registration || mongoose.model("Registration", registration);
