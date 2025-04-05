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
  dob: z
    .string()
    .min(1, { message: "This field has to be filled." }) // Required field
    .refine(
      (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

        return age > 18 || (age === 18 && isBirthdayPassed); // Must be 18 or older
      },
      { message: "You must be at least 18 years old." }
    ),
  type: z.string(),
  deposit: z.number().min(100, { message: "Deposit must be at least 100" }), // Ensures minimum 100
  currency: z.string(),
  street: z.string().min(1, { message: "This field has to be filled." }),
  city: z.string().min(1, { message: "This field has to be filled." }),
  zip: z.string().length(5, { message: "Zip code must be exactly 5 digits." }),
  submitForm: z.boolean().refine((value) => value === true, {
    message: "You must agree to the Terms & Conditions",
  }),
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
            {...register("phonenumber")}
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
            {...register("dob")}
            label="Date of Birth"
            id="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          {errors.dob && <Alert severity="error">{errors.dob.message}</Alert>}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <Autocomplete
            disablePortal
            {...register("type")}
            options={accountType}
            renderInput={(params) => (
              <TextField {...params} label="Account Type" />
            )}
          />{" "}
          {errors.type && <Alert severity="error">{errors.type.message}</Alert>}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <TextField
            {...register("deposit", { valueAsNumber: true })}
            label="Initial Deposit Amount"
            id="deposit"
            type="number"
          />
          {errors.deposit && (
            <Alert severity="error">{errors.deposit.message}</Alert>
          )}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <Autocomplete
            {...register("currency")}
            options={currency}
            renderInput={(params) => <TextField {...params} label="Currency" />}
          />
          {errors.currency && (
            <Alert severity="error">{errors.currency.message}</Alert>
          )}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <TextField
            {...register("street")}
            label="Street Address"
            id="street"
          />
          {errors.street && (
            <Alert severity="error">{errors.street.message}</Alert>
          )}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <TextField {...register("city")} label="City" id="city" />
          {errors.city && <Alert severity="error">{errors.city.message}</Alert>}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <TextField
            {...register("zip")}
            label="Zip Code"
            id="zip"
            type="number"
          />
          {errors.zip && <Alert severity="error">{errors.zip.message}</Alert>}{" "}
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register("submitForm")}
                name="submitForm"
                defaultChecked={false}
              />
            }
            label="I agree to the Terms & Conditions"
          />
          {errors.submitForm && (
            <Alert severity="error">{errors.submitForm.message}</Alert>
          )}{" "}
        </FormGrid>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
}
