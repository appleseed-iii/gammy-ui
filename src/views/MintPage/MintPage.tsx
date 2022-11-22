import "src/views/MintPage/style.scss";
import "98.css";

import { Box, Button, Paper, Skeleton, SvgIcon, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReactComponent as ethImg } from "src/assets/eth.svg";
import { ReactComponent as gOHMImg } from "src/assets/gOHM.svg";
import { ConnectButton } from "src/components/ConnectWallet";
import { Groove } from "src/components/Groove";
import { HeaderBar } from "src/components/HeaderBar";
import { UserBalanceRow } from "src/components/UserBalanceRow";
import { useGetGammyPrice, useGetMaxSupply, useGetRemainingSupply, useMint } from "src/views/MintPage/hooks/useGammy";
import { useAccount } from "wagmi";
type TCurrency = "ETH" | "gOHM";

const MintButton = ({ currency }: { currency: TCurrency }) => {
  const { address, isConnected } = useAccount();
  const { data: remainingSupply, isLoading: isRemainingLoading } = useGetRemainingSupply();
  const { data: price, isLoading: priceIsLoading } = useGetGammyPrice();
  const [quantity, setQuantity] = useState<ethers.BigNumber>(ethers.BigNumber.from("1"));
  const [totalPrice, setTotalPrice] = useState<ethers.BigNumber>(
    priceIsLoading || !price ? ethers.utils.parseEther("0.01") : price.mul(quantity),
  );

  const mint = useMint();
  const zeroSupply = !isRemainingLoading && !!remainingSupply && remainingSupply.lte(0);
  const disableMint = mint.isLoading || zeroSupply;

  const changeQuantity = (inputQuantity: number) => {
    let thisQuantity = ethers.BigNumber.from("0");
    if (inputQuantity > 0) {
      thisQuantity = ethers.utils.parseUnits(String(inputQuantity), 0);

      // max out at remaining supply
      if (!!remainingSupply && !thisQuantity.lte(remainingSupply)) {
        thisQuantity = remainingSupply;
        const id = ethers.utils.formatUnits(remainingSupply, 0);
        const errorMessage = `You can mint a maximum of ${id}`;
        toast.error(errorMessage, { id: id });
      }
    }
    setQuantity(thisQuantity);
    if (!!price && price.gt(0)) {
      setTotalPrice(price.mul(thisQuantity));
    }
  };

  return (
    <>
      <UserBalanceRow currency={currency} address={address as string} />
      <Groove sx={{ margin: "10px" }} />
      <Box id="quantity-row" display="flex" justifyContent="space-between">
        <Typography>Mint Quantity</Typography>
        <input
          id="mintQuantity"
          type="number"
          style={{ width: "69px" }}
          maxLength={5}
          step={1}
          value={Number(ethers.utils.formatUnits(quantity, 0))}
          onChange={e => changeQuantity(Number(e.target.value))}
        />
      </Box>
      <Box id="total-row" display="flex" justifyContent="space-between">
        <Typography>Total Price</Typography>
        <Typography>{priceIsLoading ? <Skeleton /> : ethers.utils.formatEther(totalPrice)}</Typography>
      </Box>
      <Box id="buy-row" display="flex" justifyContent="flex-end">
        {/* <Box display="flex" justifyContent="center" sx={{ width: "75%" }} alignItems="center"> */}
        <Button disabled={disableMint} variant="outlined" onClick={() => mint.mutate(quantity)}>
          {zeroSupply ? `Sold Out!` : mint.isLoading ? `Executing in Wallet...` : `Mint!`}
        </Button>
        {/* </Box> */}
      </Box>
      <Groove sx={{ margin: "12px 10px 2.5px 10px" }} />

      <Groove sx={{ margin: "2.5px 10px 10px 10px" }} />
    </>
  );
};

export const MintPage = () => {
  const { address, isConnected } = useAccount();

  const [currency, setCurrency] = useState<TCurrency>("ETH");
  const { data: price, isLoading: priceIsLoading } = useGetGammyPrice();
  const { data: remainingSupply, isLoading: isRemainingLoading } = useGetRemainingSupply();
  const { data: maxSupply, isLoading: isMaxLoading } = useGetMaxSupply();
  const changeCurrency = (currency: TCurrency) => {
    console.log("changed to", currency);
    setCurrency(currency);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box sx={{ height: "10px" }} />
      <Paper
        id="main-paper"
        variant="outlined"
        square
        sx={{ padding: "2px 2px 10px 2px", minWidth: "370px", alignSelf: "center" }}
      >
        <HeaderBar message={`Buy Now`} />
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
            <Box display={`flex`} flexDirection={`row`}>
              <Typography>{isRemainingLoading ? <Skeleton width={69} /> : `${remainingSupply}`}</Typography>
              <Typography>
                &nbsp;
                {`/`}
                &nbsp;
              </Typography>
              <Typography>{isMaxLoading ? <Skeleton width={69} /> : `${maxSupply}`}</Typography>
            </Box>
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
                <Typography sx={{ marginRight: "3px " }}>
                  {priceIsLoading ? <Skeleton /> : ethers.utils.formatEther(price)}
                </Typography>
                <select onChange={e => changeCurrency(e.target.value as TCurrency)}>
                  <option>ETH</option>
                  <option>gOHM</option>
                </select>
              </Box>
            </Box>
          </Box>
          {isConnected && !!address ? (
            <MintButton currency={currency} />
          ) : (
            <Box id="buy-row" display="flex" justifyContent="center" sx={{ margin: "10px", minHeight: "48px" }}>
              <Box display="flex" justifyContent="center">
                <ConnectButton />
              </Box>
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
          <Box id="faq-row" display="flex" justifyContent="center" sx={{ marginTop: "10px", minHeight: "48px" }}>
            <Box display="flex" justifyContent="center">
              <Button variant="outlined">Question?</Button>
            </Box>
          </Box>
        </Box>
        {/* <div class="status-bar">
          <p class="status-bar-field">Press F1 for help</p>
          <p class="status-bar-field">Slide 1</p>
          <p class="status-bar-field">CPU Usage: 14%</p>
        </div> */}
      </Paper>
      <Box sx={{ height: "60px" }} />
    </Box>
  );
};
