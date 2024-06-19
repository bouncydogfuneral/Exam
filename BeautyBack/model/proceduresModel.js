const mongoose = require("mongoose");

const procedureSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    partipants:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            status:{
                type: String
            },
            regTime:{
                type: String
            }
        }
    ]
})


const Procedure = mongoose.model("Procedure", procedureSchema);

module.exports = Procedure