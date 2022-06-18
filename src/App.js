// import "./App.css";

import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useConnect } from "wagmi";

import userImg from "./assets/imges/userImg.svg";
import ConnectWallet from "./components/ConnectWallet.tsx";
import MikesComp from "./components/MikesComp";
import dynamicStyles from "./dynamicStyles";
import Edit from "./views/LinkTree/Edit";
import { LinkTree } from "./views/LinkTree/LinkTree.tsx";

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
        <Route color={"#ECECEE"} path="/mikes" element={<MikesComp />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
