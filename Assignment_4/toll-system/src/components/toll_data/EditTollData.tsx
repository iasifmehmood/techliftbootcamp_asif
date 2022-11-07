import React from "react";
import { Stack, Box, Button, Typography } from "@mui/material";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import swal from 'sweetalert';

const EditTollData: any = () => {
  const [tollData, setTollData] = useState({
    entry_point: "",
    exit_point: "",
    day: "",
    number_plate: "",
    toll_paid: "",
  });

  const { entry_point, exit_point, day, number_plate, toll_paid } = tollData;

  const onInputChange: any = (e: any) => {
    setTollData({ ...tollData, [e.target.name]: e.target.value });
  };

  let navigate: any = useNavigate();

  const onSubmit: any = async (e: any) => {
    e.preventDefault();
    let response: any = await axios.put(
      //to update data
      `http://localhost:3001/tollData/${id}`,
      tollData
    );
    if (response) {
      swal("Data Updated!", "You are redirected to the Homepage!", "success");
    } else {
      swal("Data not submit! Please try Again");
    }
    navigate("/"); // to navigatoe to home page
  };

  const { id } = useParams(); // use to access id

  //load data see console
  useEffect(() => {
    loadTollData();
  }, []);

  const loadTollData: any = async () => {
    const result = await axios.get(`http://localhost:3001/tollData/${id}`);
    setTollData(result.data);
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                                       
                                                // Toll Tax Calculation Starts From Here                    
  
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

  const WEEKDAYS: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDay: any = WEEKDAYS[new Date(tollData.day).getDay()];

  const getMonthFromDate:any=()=>{
    return new Date(tollData.day).toLocaleString("default", { month: "long" });
  }
  
  const getDate:any=()=>{
    return new Date(tollData.day).getUTCDate();
  }

  const specialDay: any = getDate() +  " " + getMonthFromDate();

  let entryValue:number=0;
  let exitValue:number=0;
  let entryPrice:number=20;
  let exitPrice:number=0;

     for(let x in interchange){
       if(JSON.stringify(tollData.entry_point)===JSON.stringify(x) ){
         entryValue= interchange[x];
         tollData.toll_paid = entryPrice.toString()
       }
     }
 
     for(let x in interchange){
       if(JSON.stringify(tollData.exit_point)===JSON.stringify(x) ){
         exitValue=interchange[x];
         exitPrice= parseFloat((entryPrice+((perKmCharges)*Math.abs(exitValue-entryValue))).toFixed(2));  //maths.abs to get positive value everytime
         tollData.toll_paid = exitPrice.toString()
       }
       if(JSON.stringify(tollData.exit_point)===JSON.stringify(x) && ["Saturday", "Sunday"].includes(currentDay)){
         exitValue=interchange[x];
         exitPrice= parseFloat((entryPrice+((perKmCharges)*Math.abs(exitValue-entryValue))).toFixed(2));  //maths.abs to get positive value everytime
         tollData.toll_paid = (exitPrice*1.5).toString()  //1.5x on weekend
       }
        if (JSON.stringify(tollData.exit_point)===JSON.stringify(x) && ["23 March", "14 August", "25 December"].includes(specialDay)) {
        exitValue=interchange[x];
        exitPrice= parseFloat((entryPrice+((perKmCharges)*Math.abs(exitValue-entryValue))).toFixed(2));  //maths.abs to get positive value everytime
        tollData.toll_paid = (exitPrice*0.5).toString()   //0.5 discount on special days
      }

     }

                                                        // Toll Tax Calculation Starts From Here

                                                      
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

          <form onSubmit={onSubmit}>
          <TextField
              label="Select Entry Point"
              fullWidth
              name="entry_point"
              value={entry_point}
              onChange={e => onInputChange(e)}
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
            label="Enter Car Number Plate"
            name="number_plate"
            onChange={(e) => onInputChange(e)}
            value={number_plate}
            fullWidth
            required
            inputProps={{ pattern: "[A-Z]{1,3}[-][1-9]{1,3}" }}
            helperText="Please Enter in this format LLL-NNN"
          />

            <TextField
            label=""
            name="day"
            value={day}
            onChange={(e: any) => onInputChange(e)}
            type="date"
            fullWidth
          />

            <TextField
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


          <Stack>
            <Button variant="contained" type="submit">
              Update Data
            </Button>
          </Stack>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditTollData;
