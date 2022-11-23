import { Chain, chain } from "wagmi";

export const availableChains: Chain[] = [chain.mainnet, chain.goerli];

interface IAddresses {
  [key: string]: string;
}

export const GAMMY_MINTER: IAddresses = {
  [chain.goerli.id]: "0x1583cFce29a1581e53A358Caf1B370743337CD69",
  [chain.mainnet.id]: "",
};

export const GOHM_ADDRESSES: IAddresses = {
  [chain.goerli.id]: "0xC1863141dc1861122d5410fB5973951c82871d98",
  [chain.mainnet.id]: "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",
};

export interface EthersError extends Error {
  error: Error;
}
