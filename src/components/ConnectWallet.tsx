import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectWallet() {
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const handleOpenConnectWallet = () => setOpenConnectWallet(true);
  const handleCloseConnectWallet = () => setOpenConnectWallet(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenConnectWallet}>
        {isConnected ? "Disconnect" : "Wallet"}
      </Button>
      <Modal
        open={openConnectWallet}
        onClose={handleCloseConnectWallet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isConnected && accountData && (
            <div>
              <div>{accountData.address}</div>
              <div>Connected to {accountData?.connector?.name}</div>
              <button onClick={() => disconnect()}>Disconnect</button>
            </div>
          )}
          {!isConnected &&
            connectors.map(connector => (
              <button disabled={!connector.ready} key={connector.id} onClick={() => connect(connector)}>
                {connector.name}
                {!connector.ready && " (unsupported)"}
              </button>
            ))}

          {connectError && <div>{connectError?.message ?? "Failed to connect"}</div>}
        </Box>
      </Modal>
    </div>
  );
}
