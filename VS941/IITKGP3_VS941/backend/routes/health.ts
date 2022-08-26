import express from "express";
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        'PBL': 'Up and Running!'
    })
})

export default router