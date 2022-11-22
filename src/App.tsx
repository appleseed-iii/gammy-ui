// import "./App.css";

import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ConnectWallet from "src/components/ConnectWallet";
import Messages from "src/components/Messages";
import { useSupportedChain } from "src/hooks/useSupportedChain";
import { MintPage } from "src/views/MintPage/MintPage";

function App() {
  useSupportedChain();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {/* Connect Wallet Components */}
      <ConnectWallet />
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      >
        {t => <Messages toast={t} />}
      </Toaster>
      <Routes>
        <Route path="/" element={<MintPage />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
