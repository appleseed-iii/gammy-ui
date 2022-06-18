import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { providers } from "ethers";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { createWagmiClient } from "wagmi";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import App from "./App";
import { availableChains } from "./constants";
import theme from "./styles/theme";

// const connectors = [
//   new InjectedConnector({ chains: defaultChains }),
//   new WalletConnectConnector({
//     chains: defaultChains,
//     options: {
//       qrcode: true,
//     },
//   }),
// ];

// const defaultChain = chain.rinkeby;

// type ProviderConfig = { chainId?: number; connector?: Connector };
// const isChainSupported = (chainId?: number) => chains.some(x => x.id === chainId);

const wagmiClient = createWagmiClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains: availableChains }),
    new WalletConnectConnector({
      chains: availableChains,
      options: {
        qrcode: true,
      },
    }),
  ],
  // connectors(config) {
  //   return [
  //     new InjectedConnector({ chains: availableChains }),
  //     // new CoinbaseWalletConnector({
  //     //   options: {
  //     //     appName: "wagmi",
  //     //     chainId: config.chainId,
  //     //   },
  //     // }),
  //     new WalletConnectConnector({
  //       chains: availableChains,
  //       options: {
  //         qrcode: true,
  //       },
  //     }),
  //   ];
  // },
  provider(config) {
    console.log("provider config", config);
    return new providers.AlchemyProvider(config.chainId || 4, "wnTln1NkDFE-MFzyzWXVJVdVvP_U9XtD");
  },
});

const queryClient = new QueryClient();

const Root: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "test" && <ReactQueryDevtools />}
      <WagmiProvider client={wagmiClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default Root;
