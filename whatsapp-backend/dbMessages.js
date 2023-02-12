import mongoose from "mongoose";

const whatsappShema = new mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received: Boolean
})

export default mongoose.model("messagecontents", whatsappShema )