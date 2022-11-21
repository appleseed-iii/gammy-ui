import "src/views/MintPage/style.scss";
import "98.css";

import { Box, Button, Paper, SvgIcon, Typography } from "@mui/material";
import { useState } from "react";
import { ReactComponent as ethImg } from "src/assets/eth.svg";
import { ReactComponent as gOHMImg } from "src/assets/gOHM.svg";
import { ConnectButton } from "src/components/ConnectWallet";
import { Groove } from "src/components/Groove";
import { UserBalanceRow } from "src/components/UserBalanceRow";
import { useAccount, useConnect } from "wagmi";

export const MintPage = () => {
  const { isConnected } = useConnect();
  const { data: accountData } = useAccount();

  const [currency, setCurrency] = useState("ETH");
  const newLocal = "linear-gradient(270deg, #1085D2 0%, #00007B 100%)";

  const changeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("changed to", event.target.value);
    setCurrency(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box sx={{ height: "10px" }} />
      <Paper
        id="main-paper"
        elevation={3}
        variant="outlined"
        square
        sx={{ padding: "2px 2px 20px 2px", minWidth: "370px", alignSelf: "center" }}
      >
        <Box sx={{ background: newLocal, height: "24px", padding: "0px 5px" }} id="paper-header">
          <Typography sx={{ color: "#fff" }}>Buy Now</Typography>
        </Box>
        <Box m={2} display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center">
            <Box
              component="img"
              sx={{ height: "340px", width: "340px", border: "1px solid #fff" }}
              alt="placeholder."
              src="https://bafkreidom2nqno4ra2xlzmtuzsy6fvjplloau6kfl2wm2b3msb2dpvtqpe.ipfs.nftstorage.link/"
            />
          </Box>
          <Box id="nft-mint-supply-row" display="flex" flexDirection="row" justifyContent="space-between">
            <Typography>Remaining / Supply</Typography>
            <Typography>10,000 / 10,000</Typography>
          </Box>
          <Box id="nft-price-row" display="flex" flexDirection="row" justifyContent="space-between">
            <Typography>Price</Typography>
            <Box display="flex" sx={{ alignItems: "center" }}>
              {currency === "ETH" ? (
                <SvgIcon component={ethImg} viewBox="0 0 20 20" style={{ height: "16px", width: "16px" }} />
              ) : (
                <SvgIcon component={gOHMImg} viewBox="0 0 32 32" style={{ height: "16px", width: "24px" }} />
              )}
              <Box display="flex" sx={{ fontSize: "20px" }}>
                <Typography sx={{ marginRight: "3px " }}>0.01</Typography>
                <select onChange={e => changeCurrency(e)}>
                  <option>ETH</option>
                  <option>gOHM</option>
                </select>
              </Box>
            </Box>
          </Box>
          {isConnected && accountData?.address ? (
            <>
              <UserBalanceRow currency={currency} address={accountData.address} />
              <Box id="buy-row" display="flex" justifyContent="center" sx={{ margin: "10px" }}>
                <Button variant="outlined" sx={{ width: "75%" }}>
                  Mint!
                </Button>
              </Box>
            </>
          ) : (
            <Box id="buy-row" display="flex" justifyContent="center" sx={{ margin: "10px" }}>
              <ConnectButton />
            </Box>
          )}
          <Box id="nft-details-row" display="flex" flexDirection="row" justifyContent="space-between">
            <blockquote style={{ maxWidth: "500px", background: "#dfdfdf", padding: "1em", margin: "0.2em" }}>
              Each Gammy Gram is an actual email from Gammy or sometimes your other boomer family members. They just
              want you to make it, anon.
              <br />
              Please forgive their spelling and grammar errors... they're boomers.
            </blockquote>
          </Box>
          <Groove sx={{ margin: "10px" }} />
          <Box id="faq-row" display="flex" justifyContent="center" sx={{ marginTop: "10px" }}>
            <Button variant="outlined" sx={{ width: "50%" }}>
              Question?
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ height: "60px" }} />
    </Box>
  );
};
