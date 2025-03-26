import Typography from "@mui/material/Typography";


function Title() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#1976d2", // Primary blue
          textTransform: "uppercase",
          letterSpacing: 1.5,
          padding: "30px",
        }}
      >
        Open an Account
      </Typography>
    </>
  );
}

export default Title
