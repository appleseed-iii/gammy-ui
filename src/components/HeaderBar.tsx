import "98.css";

import { Box, Typography } from "@mui/material";

export const HeaderBar = ({
  message,
  minimize,
  maximize,
  close,
}: {
  message?: string;
  minimize?: boolean;
  maximize?: boolean;
  close?: () => void;
}) => {
  const backgroundGradient = "linear-gradient(270deg, #1085D2 0%, #00007B 100%)";
  return (
    <>
      <Box sx={{ background: backgroundGradient, height: "24px", padding: "0px 5px" }}>
        <Box display={`flex`} flexDirection={`row`} justifyContent={`space-between`}>
          <Typography sx={{ color: "#fff" }}>{message}</Typography>
          <Box display={`flex`} flexDirection={`column`} justifyContent={`center`}>
            <div className="title-bar-controls">
              {minimize ? <button aria-label="Minimize"></button> : <></>}
              {maximize ? <button aria-label="Maximize"></button> : <></>}
              {!!close ? <button aria-label="Close" onClick={close}></button> : <></>}
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};
