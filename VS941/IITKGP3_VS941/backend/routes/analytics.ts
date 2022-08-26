import express from "express";
import categories from "../utils/categories";
import Case from "../models/case";
const router = express.Router()

router.get('/advocate', (req: express.Request, res: express.Response) => {
    const advocateDetails = require(__dirname + "/../analytics_data/Advocate_details.json")
    res.json(advocateDetails)
})

router.get('/yearwise', async (req: express.Request, res: express.Response) => {
    const data: {
        disposed: {
            id: string,
            label: string,
            value: number
        }[], 
        pending: {
            id: string,
            label: string,
            value: number
        }[]
    } = {
        disposed: [],
        pending: []
    }
    for(var i = 2022; i >= 2018; i--) {
        data.disposed.push({id: i.toString(), label: i.toString(), value: await Case.count({year: i, caseType: 'Disposed'})})
        data.pending.push({id: i.toString(), label: i.toString(), value: await Case.count({year: i, caseType: 'Pending'})})
    }
    res.json(data)
})

router.get('/categorywise', async (req: express.Request, res: express.Response) => {
    const data: {
        disposed: {
            id: string,
            label: string,
            value: number
        }[], 
        pending: {
            id: string,
            label: string,
            value: number
        }[]
    } = {
        disposed: [],
        pending: []
    }
    for(var i = 0; i < categories.length; i++) {
        data.disposed.push({id: categories[i], label: categories[i], value: await Case.count({category: categories[i], caseType: 'Disposed'})})
        data.pending.push({id: categories[i], label: categories[i], value: await Case.count({category: categories[i], caseType: 'Pending'})})
    }

    data.disposed.sort((a, b) => b.value - a.value)
    let temp = data.disposed.slice(5)
    data.disposed = data.disposed.slice(0, 5)
    var count = 0
    temp.forEach((value) => count += value.value)
    data.disposed.push({id: 'Others', label: 'Others', value: count})

    data.pending.sort((a, b) => b.value - a.value)
    temp = data.pending.slice(5)
    data.pending = data.pending.slice(0, 5)
    count = 0
    temp.forEach((value) => count += value.value)
    data.pending.push({id: 'Others', label: 'Others', value: count})

    res.json(data)
})

router.get('/', (req: express.Request, res: express.Response) => {
    const totalStats = require(__dirname + "/../analytics_data/total_number_of_cases.json")
    res.json(totalStats)
})

router.get('/recommendation', (req: express.Request, res: express.Response) => {
    const {category} = req.query
    if(typeof category === 'string') {
        const advList = new Set()
        const advObj: any = {}
        const advStats: {name: string, disposed_cases: number, pending_cases: number, disposed: any, pending: any}[] = require(__dirname + "/../analytics_data/Advocate_details_with_case_category.json")
        for(var i = 0; i < advStats.length; i++) {
            if(advList.has(advStats[i].name)) {
                advObj[advStats[i].name] += advStats[i].disposed[category] ?? 0
            }
            else advObj[advStats[i].name] = advStats[i].disposed[category] ?? 0
        }
        const advArr: {name: string, value: any}[] = []
        Object.keys(advObj).forEach((key) => {
            advArr.push({name: key, value: advObj[key]})
        })
        advArr.sort((a, b) => b.value - a.value)
        res.json(advArr)
    }
    else res.status(400).json({status: "category missing"})
})

router.get('/judgement', (req: express.Request, res: express.Response) => {
    const judgement = require('../analytics_data/disposed_judgement.json')
    res.json(judgement)
})

export default router