import fs from 'fs'
import crypto from 'crypto'

function getScrapedData() {
    const caseArray: any[] = []
    let pwd = __dirname + "/../data"
    const caseTypes = fs.readdirSync(pwd)
    caseTypes.map((caseType) => {
        let pwd1 = pwd + "/" + caseType
        const years = fs.readdirSync(pwd1)
        years.map((year) => {
            let pwd2 = pwd1 + "/" + year
            const cases = fs.readdirSync(pwd2)
            cases.map((caseFolder) => {
                let pwd3 = pwd2 + "/" + caseFolder
                const caseDetails = require(pwd3 + "/Case_details.json")
                caseDetails.id = crypto.createHash('sha256').update(caseDetails.diary_number).digest('hex')
                caseDetails.hash = caseDetails.id
                caseDetails.categoryCode = caseDetails.category.split('-')[0]
                const temp = caseDetails.category.split('-').slice(1).join('-').split(" : ")
                caseDetails.subCategory = temp.length > 1 ? temp[1] : ""
                caseDetails.category = temp[0]
                caseDetails.caseType = caseType
                caseDetails.year = year
                try {
                    var extra = JSON.stringify(require(pwd3 + "/Earlier_courts.json"))
                    caseDetails.earlier_court = extra
                }
                catch(err) {}
                try {
                    var extra = JSON.stringify(require(pwd3 + "/Inter_locutary_applications.json"))
                    caseDetails.inter_locutary_applications = extra
                }
                catch(err) {}
                try {
                    var extra = JSON.stringify(require(pwd3 + "/Judgement.json"))
                    caseDetails.judgement = extra
                }
                catch(err) {}
                try {
                    var extra = JSON.stringify(require(pwd3 + "/Listing_dates.json"))
                    caseDetails.listing_dates = extra
                }
                catch(err) {}
                try {
                    var extra = JSON.stringify(require(pwd3 + "/Notices.json"))
                    caseDetails.notices = extra
                }
                catch(err) {}
                caseArray.push(caseDetails)
            })
        })
    })

    return caseArray
}

export default getScrapedData