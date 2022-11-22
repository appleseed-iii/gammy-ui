import "98.css";

import { Box, Button, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import SvgIcon from "@mui/material/SvgIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useState } from "react";
import { ReactComponent as Windows98 } from "src/assets/windows-98-start.svg";
import { Groove, StartBarDoubleGroove } from "src/components/Groove";
import { UserBalanceText } from "src/components/UserBalanceRow";
import { abbreviatedAddress } from "src/helpers";
import { ConnectorRowTC, WalletWarningTC } from "src/styles/theme";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();

  return (
    <>
      <AppBar
        id="start-bar"
        position="fixed"
        color="primary"
        sx={{ height: "48px", padding: 0, top: "auto", bottom: 0 }}
      >
        <Toolbar id="start-toolbar" sx={{ padding: "0 0 0 2px !important", minHeight: "48px !important" }}>
          <Box display="flex" justifyContent="center">
            <ConnectButton />
          </Box>
          <StartBarDoubleGroove />
          {isConnected && (
            <>
              <Typography
                sx={{
                  paddingLeft: "6px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                }}
              >
                {abbreviatedAddress(address)}
              </Typography>
              <StartBarDoubleGroove />
              <UserBalanceText
                currency={"ETH"}
                address={address as string}
                typographyStyles={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                }}
              />
            </>
          )}
          <StartBarDoubleGroove />
        </Toolbar>
      </AppBar>
    </>
  );
}

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export function ConnectButton() {
  const isMounted = useIsMounted();

  const { connect, connectors, error: connectError, isLoading, pendingConnector } = useConnect();
  const { address, isConnected, connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const [hideWarning, setHideWarning] = useState(false);

  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  // const handleOpenConnectWallet = () => setOpenConnectWallet(true);
  // const handleCloseConnectWallet = () => setOpenConnectWallet(false);
  const toggleDrawer = () => {
    console.log("toggleDrawer", !openConnectWallet);
    setHideWarning(true);
    setOpenConnectWallet(!openConnectWallet);
  };
  const handleConnectBtn = (connector: Connector<any, any, any>) => {
    setHideWarning(false);
    connect({ connector });
  };

  console.log("connectors", connectors);

  return (
    <>
      {isConnected && address ? (
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
        swipeAreaWidth={0}
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
            {isConnected && address && (
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
                  <div>{abbreviatedAddress(address)}</div>
                </Box>
                <Groove sx={{ borderBottom: "2px groove" }} />
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
                  <div>Connected to {activeConnector?.name}</div>
                </Box>
              </>
            )}

            {!isConnected &&
              connectors.map(connector => (
                <Box onClick={() => handleConnectBtn(connector)}>
                  <ConnectorRowTC
                    className=""
                    // disabled={!connector.ready}
                    key={connector.id}
                    sx={{
                      height: "40px",
                      "&:hover": {
                        backgroundColor: "#00007B",
                        color: "#fff",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Typography>
                      {isMounted ? connector.name : connector.id === "injected" ? connector.id : connector.name}
                      {isLoading && pendingConnector?.id === connector.id && " (connecting)"}
                      {isMounted ? !connector.ready && " (use Wallet Connect)" : ""}
                    </Typography>
                  </ConnectorRowTC>
                  <Groove sx={{ borderBottom: "2px groove" }} />
                </Box>
              ))}

            {connectError && !hideWarning && (
              <WalletWarningTC>
                {connectError?.message
                  ? connectError.message === "Connector not found"
                    ? `${connectError.message}; try Wallet Connect`
                    : `${connectError.message}`
                  : "Failed to connect"}
              </WalletWarningTC>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

const WindowsIcon = () => {
  return (
    <SvgIcon>
      <Windows98 style={{ height: 36, width: 36 }} />
    </SvgIcon>
  );
};
