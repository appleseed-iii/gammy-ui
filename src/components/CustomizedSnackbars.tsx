import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = ({ severity, message }: { severity: AlertColor; message: string }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ width: "97%" }}>
        <Alert onClose={handleClose} severity={severity} sx={{ margin: "auto", width: "80%", wordBreak: "break-word" }}>
          {message.slice(0, 800)}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
