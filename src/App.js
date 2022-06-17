// import "./App.css";

import { Button } from "@mui/material";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useConnect } from "wagmi";

import userImg from "./assets/imges/userImg.svg";
import ConnectWallet from "./components/ConnectWallet.tsx";
import MikesComp from "./components/MikesComp";
import dynamicStyles from "./dynamicStyles";
import Edit from "./views/LinkTree/Edit";
import { LinkTree } from "./views/LinkTree/LinkTree.tsx";

const appStyle1 = {
  textAlign: "center",
  verticalAlign: "middle",
  height: "100vh",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  backgroundSize: "cover",
};
const param = window.location.search.split("=")[1] || 12;
function App() {
  const { isConnected } = useConnect();
  return (
    <div className="App" style={{ ...appStyle1, ...dynamicStyles[`appStyle${param}`].bacgroundStyle }}>
      {/* Connect Wallet Components */}
      <ConnectWallet />
      {isConnected && (
        <Button variant="outlined">
          <Link to="/edit">Edit</Link>
        </Button>
      )}
      <Button style={{ visibility: "hidden" }} variant="outlined">
        <Link to="/mikes">Mikes View</Link>
      </Button>

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
    </div>
  );
}

export default App;
