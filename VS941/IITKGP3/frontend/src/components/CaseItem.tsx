import { Badge, Card, createStyles } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import findRole from "../utils/findRole";

const useStyles = createStyles((theme) => ({
    id: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 600
    }
}))

function CaseItem({caseDetails}: {caseDetails: any}) {

    const {classes, cx} = useStyles();
    const navigate = useNavigate()

    const handleClick = () => {
        const userData = localStorage.getItem('userData')
        if(userData  && (JSON.parse(userData).categoryAccess.includes(caseDetails.category) || JSON.parse(userData).categoryAccess.includes("All categories"))) {
            navigate(`/search/${caseDetails.hash}`)
        }
        else toast.error("Sorry. You don't have access to this case.")
    }

    return(
        <Card p={30} style={{boxShadow: '4px 6px 8px #00000010'}} withBorder radius="md" className="case-item" onClick={handleClick}>
            <Badge radius='sm' size="xl" color='red'>#{caseDetails.diary_number}</Badge>
            <div className={cx(classes.title)}>{caseDetails.petitioner[0]}</div>
            <div className="badges">
                <Badge radius='sm' size="xl">{caseDetails.category}</Badge>
                <Badge radius='sm' color='green' size="xl">{findRole(caseDetails.petitioner)}</Badge>
            </div>
        </Card>
    )
}

export default CaseItem