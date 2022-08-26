import express from "express";
import Test from "../models/test";
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    const testRun = new Test({
        name: 'Chirag Ghosh'
    })
    testRun.save()
        .then(() => console.log('Created entry'))
        .catch(() => console.log('You fucked up again!'))
    res.send('Check terminal')
})

export default router