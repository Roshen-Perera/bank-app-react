import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  phonenumber: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits." }),
});

type FormData = z.infer<typeof schema>;

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

const onSubmit = (data: FieldValues) => {
  console.log(data);
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <FormGrid size={{ xs: 12 }}>
          <TextField {...register("name")} label="Full name" id="fullName" />
          {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <TextField {...register("email")} label="Email address" id="email" />
          {errors.email && (
            <Alert severity="error">{errors.email.message}</Alert>
          )}
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <TextField
            {...(register("phonenumber"))}
            label="Phone Number"
            id="phoneNumber"
            type="number"
          />
          {errors.phonenumber && (
            <Alert severity="error">{errors.phonenumber.message}</Alert>
          )}
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
          <TextField
            label="Initial Deposit Amount"
            id="deposit"
            type="number"
          />
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

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
}
