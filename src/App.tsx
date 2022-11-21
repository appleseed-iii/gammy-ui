// import "./App.css";

import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import userImg from "src/assets/imges/userImg.svg";
import ConnectWallet from "src/components/ConnectWallet";
import dynamicStyles from "src/dynamicStyles";
import Edit from "src/views/LinkTree/Edit";
import { LinkTree } from "src/views/LinkTree/LinkTree";
import { useConnect } from "wagmi";

const appStyle = {
  textAlign: "center",
  verticalAlign: "middle",
  height: "100vh",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
};
const param = window.location.search.split("=")[1] || 12;

function App() {
  const { isConnected } = useConnect();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {/* Connect Wallet Components */}
      <ConnectWallet />

      <Routes>
        <Route
          path="/"
          element={
            <LinkTree
              textStyle={dynamicStyles[`appStyle${param}`].textStyle}
              ButtonStyle={dynamicStyles[`appStyle${param}`].ButtonStyle}
              userImg={userImg}
            />
          }
        ></Route>
        <Route path="/edit" element={<Edit />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
