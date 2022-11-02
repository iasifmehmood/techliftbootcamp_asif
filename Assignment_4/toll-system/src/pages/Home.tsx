import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const tableData = [
  {
    id: 1,
    first_name: "Dorolisa",
    last_name: "MacGille",
    email: "dmacgille0@ucoz.com",
    gender: "Female",
  },
  {
    id: 2,
    first_name: "Lissie",
    last_name: "Betteridge",
    email: "lbetteridge1@usda.gov",
    gender: "Female",
  },
  {
    id: 3,
    first_name: "Irina",
    last_name: "MacColgan",
    email: "imaccolgan2@merriam-webster.com",
    gender: "Female",
  },
  {
    id: 4,
    first_name: "Kristi",
    last_name: "Wheadon",
    email: "kwheadon3@merriam-webster.com",
    gender: "Polygender",
  },
  {
    id: 5,
    first_name: "Lesley",
    last_name: "Krzyzowski",
    email: "lkrzyzowski4@dion.ne.jp",
    gender: "Female",
    ip_address: "72.111.131.222",
  },
];

const Home = () => {
  return (
    <TableContainer>
      <Table aria-label="Toll Data">
        <TableHead>
          <TableRow>
            <TableCell>Entry Point</TableCell>
            <TableCell>Exit Point</TableCell>
            <TableCell>Day of the week</TableCell>
            <TableCell>Vehicle Number Plate (LLL-NNN)</TableCell>
            <TableCell>Discounts</TableCell>
            <TableCell>
              <Button variant="outlined">Add Record</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button>
                    <EditIcon />
                  </Button>
                  <Button>
                    <DeleteIcon />
                  </Button>
                  <Button>
                    <VisibilityIcon />
                  </Button>
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
