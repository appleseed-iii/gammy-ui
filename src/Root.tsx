import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
  [chain.mainnet, chain.rinkeby],
  [
    alchemyProvider({ alchemyId: "wnTln1NkDFE-MFzyzWXVJVdVvP_U9XtD" }),
    jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) }),
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
        jsonRpcUrl: "https://eth-mainnet.alchemyapi.io/v2/wnTln1NkDFE-MFzyzWXVJVdVvP_U9XtD",
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
      {process.env.NODE_ENV === "test" && <ReactQueryDevtools />}
      <WagmiConfig client={wagmiClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

export default Root;
