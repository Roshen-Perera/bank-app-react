import { Alert, Autocomplete, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));



// Define the currency options
const currency = [
  { label: "USD - United States Dollar" },
  { label: "EUR - Euro" },
  { label: "LKR - Sri Lankan Rupee" },
];

const accountType = [
    { label: "Savings" },
    { label: "Current" },
    { label: "Fixed Deposit" },
];

export default function Form() {
  const [name, setName] = useState("");
  return (
    <Grid container spacing={2}>
      <FormGrid size={{ xs: 12 }}>
        <TextField label="Full name" id="fullName" />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <TextField label="Email address" id="email" />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <TextField label="Phone Number" id="phoneNumber" type="number" />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <TextField
          fullWidth
          label="Date of Birth"
          id="dob"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <Autocomplete
          disablePortal
          options={accountType}
          renderInput={(params) => (
            <TextField {...params} label="Account Type" />
          )}
        />{" "}
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <TextField label="Initial Deposit Amount" id="deposit" type="number" />
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <Autocomplete
          disablePortal
          options={currency}
          renderInput={(params) => <TextField {...params} label="Currency" />}
        />{" "}
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <TextField fullWidth label="Street Address" id="street" />
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <TextField fullWidth label="City" id="city" />
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <TextField fullWidth label="Zip Code" id="zip" type="number" />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="submitForm" value="yes" />}
          label="I agree to the Terms & Conditions"
        />
      </FormGrid>

      <Button variant="contained" onClick={() => setName("Button Clicked")}>Submit</Button>
    </Grid>
  );
}
