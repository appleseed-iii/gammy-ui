import { Box, Paper } from "@mui/material";
import { resolveValue, toast as hotToast } from "react-hot-toast";
import { HeaderBar } from "src/components/HeaderBar";

// A component that displays error messages
const Messages = ({ toast }: { toast: any }) => {
  console.log("messages", toast);
  return (
    <Paper variant="outlined" square sx={{ padding: "2px 2px 20px 2px", minWidth: "370px", alignSelf: "center" }}>
      <HeaderBar
        message={`Error`}
        close={() => {
          hotToast.remove(toast.id);
        }}
      />
      <Box m={2} display="flex" flexDirection="column">
        {resolveValue(toast.message, toast)}
      </Box>
    </Paper>
  );
};

export default Messages;
