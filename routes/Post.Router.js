
const express = require('express');
const postRouter = express.Router();
const PostModel = require("../models/Post.Model")
//post 
postRouter.post("/add", async (req, res) => {
    try {
        const post = new PostModel(req.body);
        await post.save()
        res.status(200).send({ "msg": "new post created successfully" })
    } catch (error) {
        res.status(400).send(error)
    }
})
//delete
postRouter.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let post = await PostModel.findOne({ _id: id })
        console.log(post)
        if (req.body.authorID == post.authorID) {
            await PostModel.findByIdAndDelete({ _id: id })
            res.status(200).send({ "msg": "Post Deleted" })
        } else {
            res.status(200).send({ "err": "You ar not authorized to this post" })
        }

    } catch (error) {
        res.status(400).send(error)

    }
})
//update
postRouter.patch("/update/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let post = await PostModel.findOne({ _id: id })
        if (req.body.authorID == post.authorID) {
            await PostModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).send({ "msg": "Post updated" })
        } else {
            res.status(200).send({ "err": "You ar not authorized to this post" })
        }

    } catch (error) {
        res.status(400).send(error)

    }
})
//getData
postRouter.get("/", async (req, res) => {
    let { device, device1, device2 } = req.query
    try {
        if(device){
            let posts=await PostModel.find({$and:[{authorID:req.body.authorID},{device:device}]})
            res.status(200).send(posts)
        }else if(device1 && device2){
            let posts=await PostModel.find({$and:[{authorID:req.body.authorID},{device:device1},{device:device2}]})
            res.status(200).send(posts)
        }else{
            let posts=await PostModel.find({authorID:req.body.authorID})
            res.status(200).send(posts)
        }
    } catch (err) {
        res.status(400).send(err)

    }
})
module.exports = postRouter