import express from "express";
import moment from 'moment'
import { defaultEmails } from "../config/constants";
import Case from "../models/case";
import { saveToMeilisearch } from "../utils/meiliScript";
import getScrapedData from "../utils/scrap";
import { sendMail } from "../utils/sendMail";
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    const caseArray = getScrapedData()
    saveToMeilisearch('cases', caseArray)
    caseArray.map(async (caseDetails) => {
        if(caseDetails.diary_number) {
            const exist = await Case.findOne({hash: caseDetails.hash})
            if(!exist) {
                Case.create(caseDetails)
                    .then((value) => {
                        console.log("Added to db: " + value.diary_number)
                        sendMail("New case found", `A new legal case related to UGC has been filed with diary number: ${caseDetails.diary_number}. Kindly have a look`, defaultEmails)
                    })
                    .catch((err) => console.log("Error creating: ", caseDetails.diary_number, err))
            }
            else {
                Case.findOneAndReplace({hash: caseDetails.hash}, caseDetails)
                    .then((value) => console.log("updated in db: " + value?.diary_number))
                    .catch((err) => console.log("Error updating: ", caseDetails.diary_number, err))
            }
        }
    })
    res.json({status: "Scheduled scrap to be saved in db"})
})

router.get("/hearings", async (req: express.Request, res: express.Response) => {
    const requiredMoment = moment().add(parseInt(process.env.REMINDER_TIME || "7"), 'days').format("DD-MM-YYYY")
    const cases = await Case.find({tentative_date: requiredMoment})
    if(cases.length !== 0) {
        sendMail("Upcoming hearings", `${cases.length} case(s) have hearings on ${requiredMoment} having diary numbers: ${cases.map((value) => value.diary_number).join(", ")}. Kindly have a look.`, defaultEmails)
    }
    res.json({status: "Scheduled hearings for upcoming cases if any"})
})

export default router