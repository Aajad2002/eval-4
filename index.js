
const express = require('express');
require('dotenv').config()
const app = express();
const cors=require('cors')
const auth=require("./middlewares/auth")
const postRouter=require("./routes/Post.Router")
app.use(express.json())
app.use(cors())
const connection = require("./server/db")
const userRouter = require("./routes/User.Router")
app.get('/', (req, res) => {
    res.send("Running")
})
app.use('/users', userRouter)
app.use(auth)
app.use("/posts",postRouter)
let port = process.env.PORT
app.listen(port, async () => {
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log("unable connect to database")
        res.status(400).send(error.message)
    }
    console.log(`server is running on ${port}`)
})