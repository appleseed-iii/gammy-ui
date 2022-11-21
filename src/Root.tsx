import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import theme from "src/styles/theme";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

export const { chains, provider } = configureChains(
  [
    { ...chain.mainnet, rpcUrls: { default: "https://rpc.ankr.com/eth" } },
    { ...chain.goerli, rpcUrls: { default: "https://rpc.ankr.com/eth_goerli" } },
  ],
  [
    jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) }),
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
    publicProvider(),
  ],
);

const needsInjectedWalletFallback =
  typeof window !== "undefined" && window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isCoinbaseWallet;

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Gammy Grams",
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    ...(needsInjectedWalletFallback ? [new InjectedConnector({ chains, options: { shimDisconnect: true } })] : []),
  ],
  provider,
});

const queryClient = new QueryClient();

const Root: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </WagmiConfig>
      <ReactQueryDevtools initialIsOpen={false} position={`top-right`} panelPosition={`right`} />
    </QueryClientProvider>
  );
};

export default Root;
