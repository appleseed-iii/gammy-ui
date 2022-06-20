import { Chain, chain } from "wagmi";

// availableChains should match NetworkId
export const availableChains: Chain[] = [chain.mainnet, chain.rinkeby];

export enum NetworkId {
  MAINNET = 1,
  TESTNET_RINKEBY = 4,

  // ARBITRUM = 42161,
  // ARBITRUM_TESTNET = 421611,

  // AVALANCHE = 43114,
  // AVALANCHE_TESTNET = 43113,

  // POLYGON = 137,
  // POLYGON_TESTNET = 80001,

  // FANTOM = 250,
  // FANTOM_TESTNET = 4002,

  // OPTIMISM = 10,
  // OPTIMISM_TESTNET = 69,
}

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  [NetworkId.TESTNET_RINKEBY]: {
    LINK_TREE: "0xEC282535106f703203bC792f93E944aa63BC8c02",
    TREE_DEPLOYER: "0x1b4512E82241EAC5ad833A77B3981ad2869d2B02",
  },
  // [NetworkId.MAINNET]: {
  //   LINK_TREE: "",
  // },
};

export const GOHM_ADDRESSES = {
  [NetworkId.TESTNET_RINKEBY]: "0xcF2D6893A1CB459fD6B48dC9C41c6110B968611E",
  // [NetworkId.TESTNET_RINKEBY]: "0x0d980FF90cc86668B16e52BdD6522eBe408001D2",
  [NetworkId.MAINNET]: "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",
};
