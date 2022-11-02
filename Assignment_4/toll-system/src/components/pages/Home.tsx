import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonGroup,
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import axios from "axios";

// const tableData = [
//   {
//     id: 1,
//     first_name: "Dorolisa",
//     last_name: "MacGille",
//     email: "dmacgille0@ucoz.com",
//     gender: "Female",
//   },
//   {
//     id: 2,
//     first_name: "Lissie",
//     last_name: "Betteridge",
//     email: "lbetteridge1@usda.gov",
//     gender: "Female",
//   },
//   {
//     id: 3,
//     first_name: "Irina",
//     last_name: "MacColgan",
//     email: "imaccolgan2@merriam-webster.com",
//     gender: "Female",
//   },
//   {
//     id: 4,
//     first_name: "Kristi",
//     last_name: "Wheadon",
//     email: "kwheadon3@merriam-webster.com",
//     gender: "Polygender",
//   },
//   {
//     id: 5,
//     first_name: "Lesley",
//     last_name: "Krzyzowski",
//     email: "lkrzyzowski4@dion.ne.jp",
//     gender: "Female",
//     ip_address: "72.111.131.222",
//   },
// ];

const Home = () => {
  const [tollData, setTollData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get("http://localhost:3001/tollData");
    setTollData(result.data);
  };

  return (
    <TableContainer>
      <Table aria-label="Toll Data">
        <TableHead>
          <TableRow sx={{ fontWeight: "fontWeightBold" }}>
            <TableCell>Id</TableCell>
            <TableCell>Entry Point</TableCell>
            <TableCell>Exit Point</TableCell>
            <TableCell>Day of the week</TableCell>
            <TableCell>Vehicle Number Plate (LLL-NNN)</TableCell>
            <TableCell>Toll Paid</TableCell>
            <TableCell>Operations</TableCell>
            <TableCell>
              <Link href="/users/addData" sx={{ textDecoration: "none" }}>
                <Button variant="outlined">Add Record</Button>{" "}
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tollData.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.entry_point}</TableCell>
              <TableCell>{row.exit_point}</TableCell>
              <TableCell>{row.day}</TableCell>
              <TableCell>{row.number_plate}</TableCell>
              <TableCell>{row.toll_paid}</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Link>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Link>
                  <Link>
                    <Button>
                      <DeleteIcon />
                    </Button>
                  </Link>
                  <Link>
                    <Button>
                      <VisibilityIcon />
                    </Button>
                  </Link>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
