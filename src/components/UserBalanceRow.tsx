import { Box, Skeleton, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as ethImg } from "src/assets/eth.svg";
import { ReactComponent as gOHMImg } from "src/assets/gOHM.svg";
import { GOHM_ADDRESSES } from "src/constants";
import { trimNumberString } from "src/helpers";
import { useBalance, useNetwork } from "wagmi";

export const UserBalanceRow = ({
  address,
  currency,
  typographyStyles,
}: {
  address: string;
  currency: string;
  typographyStyles?: any;
}) => {
  const currencyIsEth = currency === "ETH";

  return (
    <Box className="user-balance-row" display="flex" flexDirection="row" justifyContent="space-between">
      <Typography sx={typographyStyles}>Your Balance</Typography>
      <Box display="flex" sx={{ alignItems: "center" }}>
        {currencyIsEth ? (
          <SvgIcon component={ethImg} viewBox="0 0 20 20" style={{ height: "16px", width: "16px" }} />
        ) : (
          <SvgIcon component={gOHMImg} viewBox="0 0 32 32" style={{ height: "16px", width: "24px" }} />
        )}
        <Box display="flex" sx={{ fontSize: "20px" }}>
          <UserBalanceText address={address} currency={currency} />
        </Box>
      </Box>
    </Box>
  );
};

export const UserBalanceText = ({
  address,
  currency,
  typographyStyles,
}: {
  address: string;
  currency: string;
  typographyStyles?: any;
}) => {
  const currencyIsEth = currency === "ETH";

  const { chain } = useNetwork();
  const ethBalance = useBalance({
    address: address as `0x${string}` | undefined,
    cacheTime: 200_000,
    enabled: currencyIsEth,
  });
  const gOHMBalance = useBalance({
    address: address as `0x${string}` | undefined,
    token: GOHM_ADDRESSES[chain?.id as keyof typeof GOHM_ADDRESSES] as `0x${string}` | undefined,
    cacheTime: 200_000,
    enabled: !currencyIsEth && !chain?.unsupported && !!GOHM_ADDRESSES[chain?.id as keyof typeof GOHM_ADDRESSES],
    chainId: chain?.id,
  });

  const isLoading = ethBalance.isLoading || gOHMBalance.isLoading;
  return (
    <>
      <Typography sx={{ ...typographyStyles, marginRight: "3px " }}>
        {isLoading ? (
          <Skeleton />
        ) : currencyIsEth ? (
          trimNumberString(ethBalance.data?.formatted, 2)
        ) : (
          trimNumberString(gOHMBalance.data?.formatted, 2)
        )}
      </Typography>
      <Typography sx={{ ...typographyStyles, marginRight: "3px " }}>{currency}</Typography>
    </>
  );
};
