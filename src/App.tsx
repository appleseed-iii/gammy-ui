// import "./App.css";

import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ConnectWallet from "src/components/ConnectWallet";
import { MintPage } from "src/views/MintPage/MintPage";

function App() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {/* Connect Wallet Components */}
      <ConnectWallet />

      <Routes>
        <Route path="/" element={<MintPage />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
