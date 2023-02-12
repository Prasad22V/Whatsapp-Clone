// importing
import express from 'express'
import mongoose from 'mongoose';
import Messages from "./dbMessages.js"
import Pusher from 'pusher';
import cors from 'cors'

// app confi
const app = express();
const port = process.env.PORT || 5000

const pusher = new Pusher({
    appId: "1547745",
    key: "d5d4de5faca409773e28",
    secret: "9b98f07028c438f9e43c",
    cluster: "eu",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Header", "*")
//     next();
// })



// DB Confi
const connection_url = "mongodb+srv://whatsappclone:whatsappclone@cluster0.lfabkzo.mongodb.net/users?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)

mongoose.connect(connection_url).then(() => {
    console.log("conection sucess")
})
    .catch((err) => {
        console.log(err)
    })


const db = mongoose.connection

db.once ("open", ()=>{
    console.log("db is connected")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change)=>{
        console.log('a change occoured',change)

        if(change.operationType == "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted",{
                name:messageDetails.name,
                message:messageDetails.message,
                received:messageDetails.received,
                timestamp:messageDetails.timestamp
            })
        } else {
            console.log("ERR in pusher")
        }
    })
})



// api routes


app.get('/', (req, res) => res.status(200).send("Hello world"))


app.get('/messages/sync', (req, res)=>{
    Messages.find((err, data)=>{
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})



app.post('/messages/new', (req, res)=>{
    const dbMessage = req.body
    Messages.create (dbMessage, (err,data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// listen

app.listen(port, () => console.log(`listening on localhost:${port}`))