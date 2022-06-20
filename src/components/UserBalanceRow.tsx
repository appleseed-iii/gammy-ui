import { Box, Skeleton, SvgIcon, Typography } from "@mui/material";
import { GOHM_ADDRESSES } from "src/constants";
import { trimNumberString } from "src/helpers";
import { useBalance, useNetwork } from "wagmi";

import { ReactComponent as ethImg } from "../assets/eth.svg";
import { ReactComponent as gOHMImg } from "../assets/gOHM.svg";

export const UserBalanceRow = ({ address, currency }: { address: string; currency: string }) => {
  const { activeChain = { id: 1, unsupported: true } } = useNetwork();
  const currencyIsEth = currency === "ETH";
  const ethBalance = useBalance({
    addressOrName: address,
    cacheTime: 200_000,
    enabled: currencyIsEth,
  });
  const gOHMBalance = useBalance({
    addressOrName: address,
    token: GOHM_ADDRESSES[activeChain.id as keyof typeof GOHM_ADDRESSES],
    cacheTime: 200_000,
    enabled: !currencyIsEth && !activeChain.unsupported,
    chainId: activeChain.id,
  });

  const isLoading = ethBalance.isLoading || gOHMBalance.isLoading;

  return (
    <Box id="user-balance-row" display="flex" flexDirection="row" justifyContent="space-between">
      <Typography>Your Balance</Typography>
      <Box display="flex" sx={{ alignItems: "center" }}>
        {currencyIsEth ? (
          <SvgIcon component={ethImg} viewBox="0 0 20 20" style={{ height: "16px", width: "16px" }} />
        ) : (
          <SvgIcon component={gOHMImg} viewBox="0 0 32 32" style={{ height: "16px", width: "24px" }} />
        )}
        <Box display="flex" sx={{ fontSize: "20px" }}>
          <Typography sx={{ marginRight: "3px " }}>
            {isLoading ? (
              <Skeleton />
            ) : currencyIsEth ? (
              trimNumberString(ethBalance.data?.formatted, 2)
            ) : (
              trimNumberString(gOHMBalance.data?.formatted, 2)
            )}
          </Typography>
          <Typography sx={{ marginRight: "3px " }}>{currency}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
