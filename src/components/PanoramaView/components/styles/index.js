import { makeStyles } from "@mui/styles";

export const helperTextStyles = makeStyles((theme) => ({
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      position: "absolute",
      marginTop: "55px",
    },
  },
}));
