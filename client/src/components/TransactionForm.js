import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


const TransactionForm = () => {
  
  const handleChange = (event) => {
  };

  const handleDate = (newValue) => {
  };

  const formSubmitHandler =  (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Card sx={{ minWidth: 275, marginTop: 15 }}>
        <CardContent>
          <Typography variant="h6">
            Add new transaction
          </Typography>
          <form method="POST" onSubmit={formSubmitHandler}>
            <TextField
              sx={{ marginRight: 5 }}
              type="number"
              id="outlined-basic"
              label="Amount"
              name="amount"
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              sx={{ marginRight: 5 }}
              onChange={handleChange}
              id="outlined-basic"
              label="Description"
              name="description"
              size="small"
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction Date"
                inputFormat="MM/DD/YYYY"
                name="date"
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField sx={{ marginRight: 5 }} size="small" {...params} />
                )}
              />
            </LocalizationProvider>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              sx={{ marginX: 2 }}
            >
              Submit
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
