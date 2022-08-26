import { Table } from "@mantine/core";

interface TableListingProps {
    data: {
        "CL Date": string;
        "Misc./Regular": string;
        "Stage": string;
        "Purpose": string;
        "Proposed/ List in": string;
        "Judges": string;
        "IA": string;
        "Remarks": string;
        "Listed": string;
    }[];
}

function ListingTable({data}: TableListingProps) {
    
    const rows = data.map((row) => {
    
        return (
          <tr key={row["CL Date"]}>
            <td>{row["CL Date"]}</td>
            <td>{row["Misc./Regular"]}</td>
            <td>{row.Stage}</td>
            <td>{row.Purpose}</td>
            <td>{row.Judges}</td>
            <td>{row.IA}</td>
            <td>{row.Remarks}</td>
            <td>{row.Listed}</td>
          </tr>
        );
    });

    return (
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm" fontSize="md">
            <thead>
              <tr>
                <th>CL Date</th>
                <th>Misc./Regular</th>
                <th>Stage</th>
                <th>Purpose</th>
                <th>Judges</th>
                <th>IA</th>
                <th>Remarks</th>
                <th>Listed</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export default ListingTable