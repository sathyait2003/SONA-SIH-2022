import { Badge, Paper, ScrollArea } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../constants"
import findRole from "../utils/findRole"
import CaseTimeline from "./CaseTimeline"
import ListingTable from "./ListingTable"

function CasePage() {

    const [caseDetails, setCaseDetails] = useState<any>()
    const [recommendedLawyers, setRecommendedLawyers] = useState<any[]>([])

    const params = useParams()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/case/${params.hash}`)
            .then((response) => setCaseDetails(response.data.caseDetail))
            .catch((err) => console.log(err))
    }, [params.hash])

    useEffect(() => {
        if(caseDetails !== undefined) {
            axios.get(`${BACKEND_URL}/analytics/recommendation?category=${caseDetails.category}`)
                .then((response) => setRecommendedLawyers(response.data))
                .catch((err) => console.log(err))
        }
    }, [caseDetails])

    if(caseDetails === undefined) return(<div>Loading...</div>)

    return(
        <ScrollArea>
            <div className="case-page">
                <h2>Case Details</h2>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Diary Number</div>
                        <div className="data"><Badge color='red' radius='sm' size="xl">{caseDetails.diary_number}</Badge></div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Category</div>
                        <div className="data"><Badge radius='sm' size="xl">{caseDetails.category}</Badge></div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Role of UGC</div>
                        <div className="data"><Badge color='green' radius='sm' size="xl">{findRole(caseDetails.petitioner)}</Badge></div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Case Status</div>
                        <div className="data"><Badge color='yellow' radius='sm' size="xl">{caseDetails.status.split(' ')[0]}</Badge></div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Case Timeline</div>
                        <CaseTimeline caseDetails={caseDetails} />
                    </div>
                    <div className="sub-section">
                        <div className="label">Advocate Recommendation</div>
                        <div>
                            {recommendedLawyers.slice(0, 3).map((lawyer) => (<Paper className="recommendation" withBorder radius='md' p='md' mt={30}>
                                <h3>{lawyer.name}</h3>
                                <Badge ml={10} radius='sm' size="xl" color='red'>{lawyer.value} disposed</Badge>
                            </Paper>))}
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Status</div>
                        <div className="data">{caseDetails.status}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Next Hearing</div>
                        <div className="data">{caseDetails.tentative_date}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Petitioners</div>
                        <div className="data">{caseDetails.petitioner.join(", ")}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Respondents</div>
                        <div className="data">{caseDetails.respondents.join(", ")}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Petitioner Advocates</div>
                        <div className="data">{caseDetails.pet_advocate.join(", ")}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Respondent Advocates</div>
                        <div className="data">{caseDetails.resp_advocate.join(", ")}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Filing Date</div>
                        <div className="data">{caseDetails.filed_on}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Verification Date</div>
                        <div className="data">{caseDetails.verified_on}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section long">
                        <div className="label">Listing Dates</div>
                        <ListingTable data={JSON.parse(caseDetails.listing_dates)} />
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section long">
                        <div className="label">Judgements and Orders</div>
                        <div className="judgement-grp">
                            {Object.keys(JSON.parse(caseDetails.judgement)).map((key) => {
                                return(
                                    <a className="judgement-link" target='_blank' rel="noreferrer" href={JSON.parse(caseDetails.judgement)[key]}><Badge radius='sm' size="xl">{key}</Badge></a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}

export default CasePage