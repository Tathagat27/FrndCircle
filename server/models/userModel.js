const { default: mongoose } = require("mongoose");

const userModel = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
},
{
    timeStamp : true,
}
)

export const User = mongoose.model("User", userModel)