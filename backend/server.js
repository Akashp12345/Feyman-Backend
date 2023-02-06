const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const dotenv = require("dotenv").config()
const listModel = require("./model/listModel")

mongoose.connect(process.env.MONGO_PATH)
    .then(() => {
        app.listen(5080, () => {
            console.log("Listening to 5080")
        })
    })
    .catch(() => {
        console.log(" Error while connection")
    })

app.use(bodyparser.json())

app.post("/", async (req, res) => {

    let topiclist = new listModel({
        id:req.body.id,
        user: req.body.user,
        list: req.body.list
    })
    let Topic = await listModel.findOne({ user: req.body.user})
    if (Topic) {
        const{user,list,id}=Topic
        let obj={
            user,list,id
        }
        res.json({ Topic: obj })
    }
    else {
        topiclist.save()
            .then(result => {
                const{user,list,id}=result
                let obj={
                    user,
                    list,id
                }
                res.json({ obj })
            })
            .catch((err) =>
                res.json({ message: "Error Occured!" })
            )
    }
})

app.post("/topic", async (req, res) => {
    try {
        let user = req.body.user
        let list = req.body.list
        let result = await listModel.updateOne({ user: user }, { list: list })
        if (result) {
            res.json({ message: "Updated" })
        }
        else {
            res.json({ message: "List not update" })

        }
    }
    catch (err) {
        res.json({ message: "An error" })
    }

})
