import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { EthersError, GAMMY_MINTER, GOHM_ADDRESSES } from "src/constants";
import { useSupportedChain } from "src/hooks/useSupportedChain";
import { GammyGrams__factory } from "src/typechain";
import { IERC20__factory } from "src/typechain/factories/IERC20__factory";
import { useAccount, useMutation, useNetwork, useProvider, useQueryClient, useSigner } from "wagmi";

export type TCurrency = "ETH" | "gOHM";

const useGammyMinter = () => {
  const { chain = { id: 1 } } = useNetwork();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const gohmAddress = GOHM_ADDRESSES[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  const gohmContract = IERC20__factory.connect(gohmAddress, provider);
  return { contract, onSupportedChain, gohmContract };
};

export const useGetGammyBalanceForAccount = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { address } = useAccount();
  const { contract, onSupportedChain } = useGammyMinter();
  const provider = useProvider();
  return useQuery<ethers.BigNumber, Error>(
    ["gammyBalanceForAccount", chain.id, address],
    async () => {
      return await contract.balanceOf(address as string);
    },
    { enabled: onSupportedChain && !!chain && !!address && !!provider },
  );
};

export const useGetGammyPrice = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { contract, onSupportedChain } = useGammyMinter();
  const provider = useProvider();
  return useQuery<{ eth: ethers.BigNumber; gohm: ethers.BigNumber }, Error>(
    ["getGammyPrice", chain.id],
    async () => {
      const eth = await contract.gammyPrice();
      const token = GOHM_ADDRESSES[chain.id];
      const gohm = await contract.tokenPrice(token);
      return {
        eth,
        gohm,
      };
    },
    { enabled: onSupportedChain && !!chain && !!provider },
  );
};

/** returns maxSupply */
export const useGetMaxSupply = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { contract, onSupportedChain } = useGammyMinter();
  const provider = useProvider();
  return useQuery<ethers.BigNumber, Error>(
    ["gammyMaxSupply", chain.id],
    async () => {
      return await contract.TOKEN_LIMIT();
    },
    { enabled: onSupportedChain && !!chain && !!provider },
  );
};

/** returns Total Supply -- ***total minted to date*** */
export const useGetTotalSupply = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { contract, onSupportedChain } = useGammyMinter();
  const provider = useProvider();
  return useQuery<ethers.BigNumber, Error>(
    ["gammyTotalSupply", chain.id],
    async () => {
      return await contract.totalSupply();
    },
    { enabled: onSupportedChain && !!chain && !!provider },
  );
};

/** returns Remaining Supply -- ***MaxSupply - TotalSupply*** */
export const useGetRemainingSupply = () => {
  const { data: totalSupply, isLoading: totalSupplyLoading, isFetched: totalSupplyFetched } = useGetTotalSupply();
  const { data: maxSupply, isLoading: maxSupplyLoading, isFetched: maxSupplyFetched } = useGetMaxSupply();
  let remainingSupply: ethers.BigNumber = ethers.BigNumber.from("0");
  if (totalSupplyFetched && !!totalSupply && maxSupplyFetched && !!maxSupply) {
    remainingSupply = maxSupply.sub(totalSupply);
  }
  return {
    data: remainingSupply,
    isLoading: totalSupplyLoading || maxSupplyLoading,
    isFetched: totalSupplyFetched || maxSupplyFetched,
  };
};

export const useCodeURL = () => {
  const { chain } = useNetwork();
  const { contract, onSupportedChain } = useGammyMinter();
  if (!onSupportedChain) return { data: "" };

  let url: string;
  if (chain?.id === 5) {
    url = `https://goerli.etherscan.deth.net/address/${contract.address}`;
  } else {
    url = `https://etherscan.deth.net/address/${contract.address}`;
  }
  return {
    data: url,
  };
};

/** returns timestamp as unixTime */
export const useGetStartSaleTimestamp = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { contract, onSupportedChain } = useGammyMinter();
  const provider = useProvider();
  return useQuery<number, Error>(
    ["gammyStartTimestamp", chain.id],
    async () => {
      const timestamp = await contract.startSaleTimestamp();
      return Number(ethers.utils.formatUnits(timestamp, 0));
    },
    { enabled: onSupportedChain && !!chain && !!provider },
  );
};

/** returns the current block timestamp at as unixTime */
export const useGetCurrentBlockTimestamp = () => {
  const { chain = { id: 1 } } = useNetwork();
  const provider = useProvider();
  return useQuery<number, Error>(
    ["currentBlockTimestamp", chain.id],
    async () => {
      const block = await provider.getBlock("latest");
      return block.timestamp;
    },
    { enabled: !!chain && !!provider },
  );
};

export const useRemainingSeconds = () => {
  const { data: startSaleTimestamp, isLoading: isStartTimestampLoading } = useGetStartSaleTimestamp();
  const { data: currentTimestamp, isLoading: isCurrentTimestampLoading } = useGetCurrentBlockTimestamp();
  let remainingTime = 0;
  if (!!startSaleTimestamp && !!currentTimestamp) {
    remainingTime = startSaleTimestamp - currentTimestamp;
  }
  return {
    data: remainingTime,
    isLoading: isStartTimestampLoading || isCurrentTimestampLoading,
    // isFetched: totalSupplyFetched || maxSupplyFetched,
  };
};

export const useHasFreeMint = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { contract, onSupportedChain } = useGammyMinter();
  const { address } = useAccount();
  const provider = useProvider();
  return useQuery<boolean, Error>(
    ["hasFreeMint", chain.id, address],
    async () => {
      const count = await contract.walletMint(address as string);
      return Number(ethers.utils.formatUnits(count, 0)) === 0;
    },
    { enabled: onSupportedChain && !!chain && !!provider && !!address },
  );
};

export const useGetAllowanceForToken = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { address } = useAccount();
  const provider = useProvider();
  const { contract, onSupportedChain, gohmContract } = useGammyMinter();
  return useQuery<boolean, Error>(
    ["getAllowanceForToken", chain.id, address, contract.address],
    async () => {
      const approval = await gohmContract.allowance(address as string, contract.address);
      console.log("approval", approval, approval.toString());
      return approval.gte(ethers.utils.parseEther("20"));
    },
    { enabled: onSupportedChain && !!chain && !!provider && !!address },
  );
};

export const useApproveToken = () => {
  const { contract, onSupportedChain, gohmContract } = useGammyMinter();
  const { data: signer } = useSigner();
  const { data: price } = useGetGammyPrice();
  const queryClient = useQueryClient();

  return useMutation<ethers.ContractReceipt, EthersError>(
    async () => {
      if (!signer) throw new Error(`Signer is not set`);
      if (!onSupportedChain) throw new Error(`Please switch to mainnet`);
      if (!price) throw new Error(`Price is not retrieved. Please try again`);
      if (!contract) throw new Error(`Something went wrong. Please try again`);
      if (!gohmContract) throw new Error(`Something went wrong. Please try again`);

      toast.success(`Finish approval in wallet.`, { id: "approval-execution-status" });
      const tx = await gohmContract.connect(signer).approve(contract.address, ethers.utils.parseEther("20"));

      toast.remove("approval-execution-status");
      toast.success(`Submitted approval & awaiting mining.`, { id: "approval-execution-status" });
      return tx.wait();
    },
    {
      onError: error => toast.error("error" in error ? error.error.message : error.message),
      onSuccess: async e => {
        console.log("onSuccess", e);
        await queryClient.invalidateQueries(["getAllowanceForToken"]);
        toast.success(`Successfully approved`);
      },
    },
  );
};

export const useMint = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { contract, onSupportedChain } = useGammyMinter();
  const { data: signer } = useSigner();
  const { data: price } = useGetGammyPrice();
  const { data: hasFreeMint } = useHasFreeMint();
  // TODO(appleseed): update ANY types below
  return useMutation<ethers.ContractReceipt, EthersError, { gammiesToMint: ethers.BigNumber; currency: TCurrency }>(
    async ({ gammiesToMint, currency }: { gammiesToMint: ethers.BigNumber; currency: TCurrency }) => {
      if (!signer) throw new Error(`Signer is not set`);
      if (!onSupportedChain) throw new Error(`Please switch to mainnet`);
      if (!price) throw new Error(`Price is not retrieved. Please try again`);
      if (!contract) throw new Error(`Something went wrong. Please try again`);

      if (gammiesToMint.lte(0)) throw new Error(`You must buy more than ${gammiesToMint}`);

      // handle currency
      let currencyPrice: ethers.BigNumber = ethers.BigNumber.from("0");
      if (currency === "ETH") {
        currencyPrice = price.eth;
      } else {
        currencyPrice = price.gohm;
      }
      if (currencyPrice.eq(0)) throw new Error(`Something went wrong. Please try again`);

      // handle free mint
      let totalPrice = currencyPrice.mul(gammiesToMint);
      if (hasFreeMint) {
        totalPrice = currencyPrice.mul(gammiesToMint.sub(1));
      }

      toast.success(`Finish execution in wallet.`, { id: "mint-execution-status" });
      let tx: ethers.ContractTransaction;
      if (currency === "ETH") {
        tx = await contract.connect(signer).mintFromSale(gammiesToMint, { value: totalPrice });
      } else {
        const gohmAddress = GOHM_ADDRESSES[chain.id];
        tx = await contract.connect(signer).mintWithToken(gammiesToMint, gohmAddress);
      }

      toast.remove("mint-execution-status");
      toast.success(`Submitted & awaiting mining.`, { id: "mint-execution-status" });
      return tx.wait();
    },
    {
      onError: error => toast.error("error" in error ? error.error.message : error.message),
      onSuccess: async e => {
        console.log("onSuccess", e);
        toast.success(`Successfully minted`);
      },
    },
  );
};
