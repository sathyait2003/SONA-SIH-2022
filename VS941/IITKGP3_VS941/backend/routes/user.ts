import express from "express";
import User from "../models/user";
const router = express.Router()

router.post('/login', async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body
    if(!email) {
        res.status(400).json({status: "Please provide email"})
        return
    }
    if(!password) {
        res.status(400).json({status: "Please provide password"})
        return
    }
    const user = await User.findOne({email})
    if(user === null) {
        res.status(404).json({status: "User not found. Please contact IT"})
        return
    }
    if(user?.password === password) {
        res.json({status: "Logged", user: user})
    }
    else res.status(401).json({status: "Wrong password. Please try again"})
})

router.post('/signup', async (req: express.Request, res: express.Response) => {
    const {name, email, password, isAdmin, categoryAccess} = req.body
    if(!name) {
        res.status(400).json({status: "Please provide name"})
        return
    }
    if(!email) {
        res.status(400).json({status: "Please provide email"})
        return
    }
    if(!password) {
        res.status(400).json({status: "Please provide password"})
        return
    }
    if(isAdmin === null || isAdmin === undefined) {
        res.status(400).json({status: "Please check whether user is Admin"})
        return
    }
    if(!categoryAccess) {
        res.status(400).json({status: "Please provide category access list"})
        return
    }

    const existingUser = await User.findOne({email})

    if(existingUser) {
        res.status(401).json({status: "Email already exists"})
    } 
    else {
        const newUser = new User({name, email, password, isAdmin, categoryAccess})
        try {
            const data = await newUser.save()
            res.send(data)
        }
        catch(err) {
            res.status(500).json({status: "Internal server error", error: err})
        }
    }
})

export default router