import { Box, Button, Divider, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import SvgIcon from "@mui/material/SvgIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { ReactComponent as Windows98 } from "../assets/windows-98-start.svg";

export default function ConnectWallet() {
  return (
    <>
      <AppBar
        id="start-bar"
        position="fixed"
        color="primary"
        sx={{ height: "48px", padding: 0, top: "auto", bottom: 0 }}
      >
        <Toolbar id="start-toolbar" sx={{ padding: "0 0 0 2px !important", minHeight: "48px !important" }}>
          <Box>
            <ConnectButton />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

function ConnectButton() {
  // const [{ data: connectData, error: connectError }, connect] = useConnect();
  const {
    activeConnector,
    connect,
    connectors,
    error: connectError,
    isConnecting,
    isConnected,
    pendingConnector,
  } = useConnect();
  const { data: accountData } = useAccount();
  const { disconnect } = useDisconnect();

  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  // const handleOpenConnectWallet = () => setOpenConnectWallet(true);
  // const handleCloseConnectWallet = () => setOpenConnectWallet(false);
  const toggleDrawer = () => {
    console.log("toggleDrawer", !openConnectWallet);
    setOpenConnectWallet(!openConnectWallet);
  };

  return (
    <div>
      {isConnected && accountData ? (
        <Button variant="outlined" onClick={() => disconnect()}>
          <Windows98 style={{ height: 20, width: 20 }} />
          Disconnect
        </Button>
      ) : (
        <Button variant="outlined" onClick={toggleDrawer}>
          <Windows98 style={{ height: 20, width: 20 }} />
          &nbsp;
          {"Connect"}
        </Button>
      )}
      <SwipeableDrawer
        PaperProps={{
          sx: { height: "300px", width: "300px" },
        }}
        anchor={"bottom"}
        open={openConnectWallet}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Box>
          {isConnected && accountData && (
            <Button>
              <div>{accountData.address}</div>
              <div>Connected to {accountData?.connector?.name}</div>
            </Button>
          )}

          {!isConnected &&
            connectors.map(connector => (
              <>
                <Box key={connector.id} onClick={() => connect(connector)} sx={{ height: "40px" }}>
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                </Box>
                <Divider sx={{ color: "#fff" }} />
              </>
            ))}

          {connectError && <div>{connectError?.message ?? "Failed to connect"}</div>}
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

const WindowsIcon = () => {
  return (
    <SvgIcon>
      <Windows98 style={{ height: 36, width: 36 }} />
    </SvgIcon>
  );
};
