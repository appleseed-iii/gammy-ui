import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface GrooveProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Groove = ({ sx = [], children }: GrooveProps) => {
  console.log("sx", sx);
  console.log(Array.isArray(sx));
  return (
    <Box
      sx={[
        {
          height: "2px",
          borderBottom: "2px groove",
          width: "98%",
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};
