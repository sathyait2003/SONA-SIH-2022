import { Badge, ScrollArea, Table } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import findRole from "../utils/findRole";

interface TableAlertProps {
    data: {
        diary_number: string;
        category: string;
        registered_on: string;
        last_listed_on: string;
        petitioner: string[];
        hash: string;
    }[];
}

function AlertTable({data}: TableAlertProps) {

    const navigate = useNavigate()
    
    const rows = data.map((row) => {
        const waitingTime = moment(row.last_listed_on, "DD-MM-YYYY").diff(moment(row.registered_on, "DD-MM-YYYY"))
        return (
          <tr key={row.diary_number}>
            <td>{row.diary_number}</td>
            <td>{row.category}</td>
            <td>{findRole(row.petitioner)}</td>
            <td>{row.registered_on}</td>
            <td>{row.last_listed_on}</td>
            {<td><Badge color={moment.duration(waitingTime).years() > 5 ? 'red' : 'orange'} radius='sm' size="xl">{moment.duration(waitingTime).years()} years {moment.duration(waitingTime).months()} months</Badge></td>}
            <td onClick={() => navigate(`/search/${row.hash}`)}><Badge style={{cursor: 'pointer'}} radius='sm' size="xl">Click here</Badge></td>
          </tr>
        );
    });

    return (
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm" fontSize="md">
            <thead>
              <tr>
                <th>Diary No.</th>
                <th>Category</th>
                <th>Role of UGC</th>
                <th>Registered On</th>
                <th>Last Listed On</th>
                <th>Waiting period</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

function Alert() {

    const [alertData, setAlertData] = useState<any[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/case/alert`)
            .then((response) => setAlertData(response.data))
            .catch((err) => console.log(err))
    }, [])

    return(
        <ScrollArea>
            <div className="alert">
                <h2>Long pending cases which need attention</h2>
                <AlertTable data={alertData} />
            </div>
        </ScrollArea>
    )
}

export default Alert