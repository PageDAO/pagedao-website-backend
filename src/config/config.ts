import { IToken, NetworkEnum } from "./types";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export type Config = {
  networkId: NetworkEnum;
  subgraphUrl: string;
  contracts: { [key: string]: `0x${string}` };
  tokens: { [key: string]: IToken };
};

export const maxDecimals = {
  ETH: 2,
};

export const FEE_RATE_DIVIDER = 10_000;

const mumbai: Config = {
  networkId: NetworkEnum.MUMBAI,
  subgraphUrl: "xxxxx",
  contracts: {
    polygonToSecret: "0x3F87289e6Ec2D05C32d8A74CCfb30773fF549306",
  },
  tokens: {
    [ZERO_ADDRESS]: {
      address: ZERO_ADDRESS,
      symbol: "MATIC",
      name: "Matic",
      decimals: 18,
    },
    "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747": {
      address: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
      symbol: "USDC",
      name: "USDC Stablecoin",
      decimals: 6,
    },
  },
};

const local: Config = {
  networkId: NetworkEnum.LOCAL,
  subgraphUrl: "http://localhost:8020/",
  contracts: {
    polygonToSecret: "0x5C45f0c3A321414232033936B5F877Dea45726D9",
  },
  tokens: {
    [ZERO_ADDRESS]: {
      address: ZERO_ADDRESS,
      symbol: "ETH",
      name: "ETH",
      decimals: 18,
    },
    "0xfF695df29837B571c4DAE01B5711500f6306E93f": {
      address: "0xfF695df29837B571c4DAE01B5711500f6306E93f",
      symbol: "ERC20",
      name: "Simple ERC20",
      decimals: 18,
    },
  },
};

const polygon: Config = {
  networkId: NetworkEnum.POLYGON,
  subgraphUrl: "http://localhost:8020/",
  contracts: {
    polygonToSecret: "0x966FC0AC7f9b9232a9A9906fc31Ff6a2c2ebEBcc",
  },
  tokens: {
    [ZERO_ADDRESS]: {
      address: ZERO_ADDRESS,
      symbol: "ETH",
      name: "ETH",
      decimals: 18,
    },
    "0x9ceE70895726B0ea14E6019C961dAf32222a7C2f": {
      address: "0x9ceE70895726B0ea14E6019C961dAf32222a7C2f",
      symbol: "PAGE",
      name: "PAGE",
      decimals: 8,
    },
  },
};

const chains: { [networkId in NetworkEnum]: Config } = {
  [NetworkEnum.LOCAL]: local,
  [NetworkEnum.MUMBAI]: mumbai,
  [NetworkEnum.POLYGON]: polygon,
};

export const getConfig = (networkId: NetworkEnum) => chains[networkId];
