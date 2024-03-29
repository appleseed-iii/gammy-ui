import { Chain } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";

export const availableChains: Chain[] = [mainnet, goerli];

interface IAddresses {
  [key: string]: string;
}

export const GAMMY_MINTER: IAddresses = {
  [goerli.id]: "0x3B15D749869f99069a8dEb2C44507aEb2e0511d9",
  [mainnet.id]: "0x2668E84980d0F121F0C01382Fd3f6A72ef44Cfdb",
};

export const GOHM_ADDRESSES: IAddresses = {
  [goerli.id]: "0xC1863141dc1861122d5410fB5973951c82871d98",
  [mainnet.id]: "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",
};

export interface EthersError extends Error {
  error: Error;
}
