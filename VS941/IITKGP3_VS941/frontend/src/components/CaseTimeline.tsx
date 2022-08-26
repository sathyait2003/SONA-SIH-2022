import { Timeline, Text } from "@mantine/core"
import { IconCheck, IconList, IconQuestionMark, IconRegistered, IconSquareX } from "@tabler/icons"

function CaseTimeline({caseDetails}: {caseDetails: any}) {

    const listingDetails = JSON.parse(caseDetails.listing_dates)

    return(
        <Timeline mt={20} active={caseDetails.status.split(' ')[0].toUpperCase() === 'DISPOSED' ? (2+listingDetails.length) : (1+listingDetails.length)} bulletSize={36} lineWidth={4}>
            <Timeline.Item bullet={<IconRegistered size={20} />} title="Registration">
                <Text color="dimmed" size="xl">Case was registered in Supreme Court</Text>
                <Text size="md" mt={4}>{caseDetails.registered_on}</Text>
            </Timeline.Item>
            <Timeline.Item bullet={<IconCheck size={20} />} title="Verification">
                <Text color="dimmed" size="xl">Case was verified</Text>
                <Text size="md" mt={4}>{caseDetails.verified_on}</Text>
            </Timeline.Item>

            {listingDetails.map((listing: any) => (
                <Timeline.Item bullet={<IconList size={20} />} title="Listing">
                    <Text color="dimmed" size="xl">Case was listed for hearing</Text>
                    <Text size="md" mt={4}>{listing["CL Date"]}</Text>
                </Timeline.Item>
            )).reverse()}

            {caseDetails.status.split(' ')[0].toUpperCase() === 'DISPOSED' ? (
                <Timeline.Item title="Dispose" bullet={<IconSquareX size={20} />}>
                    <Text color="dimmed" size="xl">Case was disposed on this date</Text>
                    <Text size="md" mt={4}>{caseDetails.last_listed_on}</Text>
                </Timeline.Item>
            ) : (
                <Timeline.Item title="Next Hearing" bullet={<IconQuestionMark size={20} />}>
                    <Text color="dimmed" size="xl">{caseDetails.tentative_date === "" ? "Court is yet to release a tentative next date" : "Next hearing will be tentatively on this date"}</Text>
                    <Text size="md" mt={4}>{caseDetails.tentative_date}</Text>
                </Timeline.Item>
            )}
        </Timeline>
    )
}

export default CaseTimeline