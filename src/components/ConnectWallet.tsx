import "98.css";

import { Box, Button, Toolbar, Typography } from "@mui/material";
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
        <Button variant="outlined" onClick={() => disconnect()} sx={{ zIndex: "1200" }}>
          <Windows98 style={{ height: 20, width: 20 }} />
          Disconnect
        </Button>
      ) : (
        <Button variant="outlined" onClick={toggleDrawer} sx={{ zIndex: "1200" }}>
          <Windows98 style={{ height: 20, width: 20 }} />
          &nbsp;
          {"Connect"}
        </Button>
      )}
      <SwipeableDrawer
        PaperProps={{
          sx: { height: "200px", width: "300px", padding: "0", marginBottom: "48px" },
        }}
        BackdropProps={{ sx: { backgroundColor: "transparent" } }}
        anchor={"bottom"}
        open={openConnectWallet}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Box display="flex" sx={{ height: "100%" }}>
          <Box
            id="start-title"
            sx={{
              flexBasis: "34px",
              background: "linear-gradient(0deg, #1085D2 0%, #00007B 100%)",
              width: "34px",
              height: "99%",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: "50px",
                left: "-44px",
                transform: "rotate(-90deg)",
                color: "#fff",
                fontSize: "22px",
              }}
            >
              Windows 98
            </Typography>
          </Box>
          <Box id="connector-container" display="flex" flexDirection="column" flexGrow="1">
            {isConnected && accountData && (
              <>
                <Box
                  className=""
                  sx={{
                    height: "40px",
                    padding: "10px 0 10px 2px",
                    "&:hover": {
                      backgroundColor: "#00007B",
                      color: "#fff",
                    },
                  }}
                >
                  <div>
                    {accountData.address?.substring(0, 6) +
                      "..." +
                      accountData.address?.substring(accountData.address?.length, accountData.address?.length - 6)}
                  </div>
                </Box>
                <Box
                  sx={{
                    height: "2px",
                    borderBottom: "2px groove",
                    width: "98%",
                  }}
                />
                <Box
                  className=""
                  sx={{
                    height: "40px",
                    padding: "10px 0 10px 2px",
                    "&:hover": {
                      backgroundColor: "#00007B",
                      color: "#fff",
                    },
                  }}
                >
                  <div>Connected to {accountData?.connector?.name}</div>
                </Box>
              </>
            )}

            {!isConnected &&
              connectors.map(connector => (
                <Box>
                  <Box
                    className=""
                    key={connector.id}
                    onClick={() => connect(connector)}
                    sx={{
                      height: "40px",
                      padding: "10px 0 10px 2px",
                      "&:hover": {
                        backgroundColor: "#00007B",
                        color: "#fff",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Typography>
                      {connector.name}
                      {!connector.ready && " (unsupported)"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "2px",
                      borderBottom: "2px groove",
                      width: "98%",
                    }}
                  />
                </Box>
              ))}

            {connectError && <div>{connectError?.message ?? "Failed to connect"}</div>}
          </Box>
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
