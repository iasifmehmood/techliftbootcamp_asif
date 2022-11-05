import React from "react";
import { Stack, Box, Button, Typography } from "@mui/material";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
      alert("data submited");
    } else {
      alert("not submit");
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

          <TextField
            label="Enter Entry Point"
            name="entry_point"
            value={entry_point}
            onChange={(e) => onInputChange(e)}
            required
          />
          <TextField
            label="Enter Exit Point"
            name="exit_point"
            value={exit_point}
            onChange={(e) => onInputChange(e)}
            required
          />
          <TextField
            label="Enter Day "
            name="day"
            value={day}
            onChange={(e) => onInputChange(e)}
            required
          />
          <TextField
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

          <Stack>
            <Button onClick={onSubmit} variant="contained" type="submit">
              Update Data
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditTollData;
