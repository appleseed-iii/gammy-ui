import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { EthersError, GAMMY_MINTER } from "src/constants";
import { useSupportedChain } from "src/hooks/useSupportedChain";
import { GammyGrams__factory } from "src/typechain";
import { useAccount, useMutation, useNetwork, useProvider, useSigner } from "wagmi";

const useGammyMinter = () => {
  const { chain = { id: 1 } } = useNetwork();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  return { contract, onSupportedChain };
};

export const useGetGammyBalanceForAccount = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { address } = useAccount();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  return useQuery<ethers.BigNumber, Error>(
    ["gammyBalanceForAccount", chain.id, address],
    async () => {
      return await contract.balanceOf(address as string);
    },
    { enabled: onSupportedChain && !!chain && !!mintAddress && !!address && !!provider },
  );
};

export const useGetGammyPrice = () => {
  const { chain = { id: 1 } } = useNetwork();
  const { address } = useAccount();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  return useQuery<ethers.BigNumber, Error>(
    ["getGammyPrice", chain.id],
    async () => {
      return await contract.gammyPrice();
    },
    { enabled: onSupportedChain && !!chain && !!mintAddress && !!address && !!provider },
  );
};

/** returns maxSupply */
export const useGetMaxSupply = () => {
  const { chain = { id: 1 } } = useNetwork();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  return useQuery<ethers.BigNumber, Error>(
    ["gammyMaxSupply", chain.id],
    async () => {
      return await contract.TOKEN_LIMIT();
    },
    { enabled: onSupportedChain && !!chain && !!mintAddress && !!provider },
  );
};

/** returns Total Supply -- ***total minted to date*** */
export const useGetTotalSupply = () => {
  const { chain = { id: 1 } } = useNetwork();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  return useQuery<ethers.BigNumber, Error>(
    ["gammyTotalSupply", chain.id],
    async () => {
      return await contract.totalSupply();
    },
    { enabled: onSupportedChain && !!chain && !!mintAddress && !!provider },
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

/** returns timestamp as unixTime */
export const useGetStartSaleTimestamp = () => {
  const { chain = { id: 1 } } = useNetwork();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  return useQuery<number, Error>(
    ["gammyStartTimestamp", chain.id],
    async () => {
      const timestamp = await contract.startSaleTimestamp();
      return Number(ethers.utils.formatUnits(timestamp, 0));
    },
    { enabled: onSupportedChain && !!chain && !!mintAddress && !!provider },
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

export const useMint = () => {
  const { chain = { id: 1 } } = useNetwork();
  const onSupportedChain = useSupportedChain();
  const mintAddress = GAMMY_MINTER[chain?.id] || "";
  const provider = useProvider();
  const contract = GammyGrams__factory.connect(mintAddress, provider);
  const { data: signer } = useSigner();
  const { data: price } = useGetGammyPrice();
  // TODO(appleseed): update ANY types below
  return useMutation<ethers.ContractReceipt, EthersError, ethers.BigNumber>(
    async (gammiesToMint: ethers.BigNumber) => {
      if (!signer) throw new Error(`Signer is not set`);
      if (!onSupportedChain) throw new Error(`Please switch to mainnet`);
      if (!price) throw new Error(`Price is not retrieved. Please try again`);
      if (!contract) throw new Error(`Something went wrong. Please try again`);

      if (gammiesToMint.lte(0)) throw new Error(`You must buy more than ${gammiesToMint}`);

      const totalPrice = price.mul(gammiesToMint);
      toast.success(`Finish execution in wallet.`);
      const tx = await contract.connect(signer).mintFromSale(gammiesToMint, { value: totalPrice });
      toast.success(`Submitted & awaiting mining.`);
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
