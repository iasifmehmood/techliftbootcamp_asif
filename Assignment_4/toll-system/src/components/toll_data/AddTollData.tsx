import React from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { resourceLimits } from "worker_threads";

const AddTollData: any = () => {
  const [tollData, setTollData] = useState({
    entry_point: "",
    exit_point: "",
    day: "",
    number_plate: "",
    toll_paid: "0",
  });

  const { entry_point, exit_point, day, number_plate, toll_paid } = tollData;

  const onInputChange: any = (e: any) => {
    setTollData({ ...tollData, [e.target.name]: e.target.value });
  };

  let navigate: any = useNavigate();

  const handleFormSubmit: any = async (e: any) => {
    e.preventDefault();
    let response: any = await axios.post(
      "http://localhost:3001/tollData",
      tollData
    );
    if (response) {
      alert("data submited");
    } else {
      alert("not submit");
    }
    navigate("/"); // to navigatoe to home page
  };

  const defaultDateValue = {
    someDate: new Date().toISOString().substring(0, 10),
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Calculation of toll tax starts from here
  
  const perKmCharges: number = 0.2; //20% charges

  const interchange:any={
    "Segregation Toll Plaza": 0,
    "Jharikas interchange": 25,
    "Kot Najeeb Ullah interchange": 75,
    "Khanpur Road Interchange": 140,
    "Shah Maqsood Interchange": 210,
    "Havelian Interchange": 260,
    "Abbottabad Interchange": 300,
  }

  let entryValue=0;
  let exitValue=0;
  let entryPrice=20;
  let exitPrice=0;
     for(let x in interchange){
       if(JSON.stringify(tollData.entry_point)===JSON.stringify(x)){
         entryValue= interchange[x];
         tollData.toll_paid = entryPrice.toString()
       }
     }
 
     for(let x in interchange){
       if(JSON.stringify(tollData.exit_point)===JSON.stringify(x)){
         exitValue=interchange[x];
         exitPrice= parseFloat((entryPrice+((perKmCharges)*Math.abs(exitValue-entryValue))).toFixed(2));  //maths.abs to get positive value everytime
         tollData.toll_paid = exitPrice.toString()
       }
     }


   // const WEEKDAYS: s[] = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  // if (tollData.exit_point === "Segregation Toll Plaza") {

  //     const entryTollPaid = 20;
  //     tollData.toll_paid = entryTollPaid.toString();
    
  // }

  // if (tollData.exit_point === "Jharikas interchange") {
  //   const currentDay: any = WEEKDAYS[new Date().getDay()];
  //   tollData.day=currentDay;
  //   if (["Saturday", "Sunday"].includes(currentDay)) {
  //     const entryTollPaid = 20 + (1.5 * 5);
  //     tollData.toll_paid = entryTollPaid.toString();
  //   } else {
  //     const entryTollPaid = 20 + (0.2 * 5);
  //     tollData.toll_paid = entryTollPaid.toString();
  //   }
  // }

  // if (tollData.exit_point === "Kot Najeeb Ullah interchange") {
  //   const currentDay: any = WEEKDAYS[new Date().getDay()];
  //   tollData.day=currentDay;
  //   if (["Saturday", "Sunday"].includes(currentDay)) {
  //     const entryTollPaid = 20 + (1.5 * 10);
  //     tollData.toll_paid = entryTollPaid.toString();
  //   } else {
  //     const entryTollPaid = 20 + (0.2 * 10);
  //     tollData.toll_paid = entryTollPaid.toString();
  //   }
  // }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const handleChange: any = (e: any) => {
  //   setINTERCHANGESGAP(e.target.value as string);
  // };

  // const Common: any = {
  //   getDistanceCharges: (entry: any) => {
  //     const distanceCharges = parseFloat(
  //       (
  //         PERKMCHARGES *
  //         (INTERCHANGESGAP[entry.exit_interchange] -
  //           INTERCHANGESGAP[entry.interchange])
  //       ).toFixed(2)
  //     );

  //     const currentDay: any = WEEKDAYS[new Date(entry.exit_date_time).getDay()];
  //     if (["Saturday", "Sunday"].includes(currentDay)) {
  //       return 1.5 * distanceCharges;
  //     }
  //     return distanceCharges;
  //   },

  //   getDiscount: (entry: any) => {
  //     const specialDay: any =
  //       Common.getDate(entry.date_time) +
  //       " " +
  //       Common.getMonthFromDate(entry.date_time);
  //     const currentDay: any = WEEKDAYS[new Date(entry.date_time).getDay()];
  //     const vehicleDigitNum: n = entry.number_plate.split("-")[1];

  //     if (["23 March", "14 August", "25 December"].includes(specialDay)) {
  //       return 0.5; //50% discount
  //     }

  //     if (
  //       (["Monday", "Wednesday"].includes(currentDay) &&
  //         vehicleDigitNum % 2 === 0) ||
  //       (["Tuesday", "Thursday"].includes(currentDay) &&
  //         vehicleDigitNum % 2 !== 0)
  //     ) {
  //       return 0.1; //10% discount
  //     }

  //     return 0; //no discount
  //   },

  //   getMonthFromDate: (dateString: s) => {
  //     return new Date(dateString).toLocaleString("default", { month: "long" });
  //   },

  //   getDate: (dateString: s) => {
  //     return new Date(dateString).getUTCDate();
  //   },
  // };

  // Calculation of toll tax ends from here

  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <Stack spacing={4}>
        <Stack direction="column" spacing={2} alignItems="center">
          <Typography variant="h5" textAlign="center">
            Enter Information
          </Typography>

          {/* <TextField
            label="Enter Entry Point"
            name="entry_point"
            value={entry_point}
            onChange={(e) => onInputChange(e)}
            required
          /> */}

          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Select Entry Point"
              fullWidth
              name="entry_point"
              value={entry_point}
              onChange={e => onInputChange(e)}
              // onClick={e => handleChange(e)}
              required
              select
            >
              <MenuItem value="Segregation Toll Plaza">
                Segregation Toll Plaza
              </MenuItem>
              <MenuItem value="Jharikas interchange">
                Jharikas interchange
              </MenuItem>
              <MenuItem value="Kot Najeeb Ullah interchange">
                Kot Najeeb Ullah interchange
              </MenuItem>
              <MenuItem value="Khanpur Road Interchange">
                Khanpur Road Interchange
              </MenuItem>
              <MenuItem value="Shah Maqsood Interchange">
                Shah Maqsood Interchange
              </MenuItem>
              <MenuItem value="Havelian Interchange">
                Havelian Interchange
              </MenuItem>
              <MenuItem value="Abbottabad Interchange">
                Abbottabad Interchange
              </MenuItem>
            </TextField>

            <TextField
              label="Select Exit Point"
              fullWidth
              name="exit_point"
              value={exit_point}
              onChange={e => onInputChange(e)}
              // onClick={e => handleChange(e)}
              required
              select
            >
              <MenuItem value="Segregation Toll Plaza">
                Segregation Toll Plaza
              </MenuItem>
              <MenuItem value="Jharikas interchange">
                Jharikas interchange
              </MenuItem>
              <MenuItem value="Kot Najeeb Ullah interchange">
                Kot Najeeb Ullah interchange
              </MenuItem>
              <MenuItem value="Khanpur Road Interchange">
                Khanpur Road Interchange
              </MenuItem>
              <MenuItem value="Shah Maqsood Interchange">
                Shah Maqsood Interchange
              </MenuItem>
              <MenuItem value="Havelian Interchange">
                Havelian Interchange
              </MenuItem>
              <MenuItem value="Abbottabad Interchange">
                Abbottabad Interchange
              </MenuItem>
            </TextField>
{/* 
            <TextField
            label=""
            name="day"
            value={day}
            onChange={(e: any) => onInputChange(e)}
            defaultValue={defaultDateValue}
            type="date"
            fullWidth
          /> */}

            <TextField
              // label="Enter Toll Paid"
              name="toll_paid"
              value={toll_paid}
              onChange={e => onInputChange(e)}
              required
              inputProps={
                { readOnly: true, }
              }
              fullWidth
              helperText="Toll Tax Price"
            />

            <Stack sx={{ marginTop: "20px" }}>
              <Button
                onChange={e => onInputChange(e)}
                type="submit"
                variant="contained"
              >
                Add Data
              </Button>
            </Stack>
          </form>

          {/* <TextField
            label="Enter Exit Point"
            name="exit_point"
            value={exit_point}
            onChange={(e) => onInputChange(e)}
            fullWidth
            required
          /> */}

          {/* <TextField
            label="Enter Car Number Plate"
            name="number_plate"
            onChange={(e) => onInputChange(e)}
            value={number_plate}
            required
          />
          <TextField
            label="Enter Toll Paid"
            name="toll_paid"
            value={toll_paid}
            onChange={(e) => onInputChange(e)}
            required
          />

          <TextField
            label=""
            name="day"
            value={day}
            onChange={(e: any) => onInputChange(e)}
            defaultValue={defaultDateValue}
            type="date"
          /> */}

          {/* <Stack>
            <Button onClick={handleFormSubmit} variant="contained" type="submit">
              Add Data
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    </Box>
  );
};
export default AddTollData;
