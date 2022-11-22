import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface GrooveProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Groove = ({ sx = [], children }: GrooveProps) => {
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

export const StartBarDoubleGroove = () => {
  return (
    <>
      <Groove
        sx={{ marginLeft: "4px", borderLeft: "2px groove", borderBottom: "none", height: "40px", width: "3px" }}
      />
      <Groove
        sx={{
          marginLeft: "2px",
          marginRight: "4px",
          borderLeft: "4px ridge",
          borderBottom: "none",
          height: "32px",
          width: "4px",
        }}
      />
    </>
  );
};
