import { useNetwork } from "wagmi";

const ChainHandler = () => {
  const { activeChain, chains, error, isLoading, pendingChainId, switchNetwork } = useNetwork();
  console.log("ChainHandler", activeChain);
  return (
    <>
      {activeChain && <div>Connected to {activeChain.name}</div>}

      {chains.map(x => (
        <button
          disabled={!switchNetwork || x.id === activeChain?.id}
          key={x.id}
          onClick={() => {
            return switchNetwork?.(x.id);
          }}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && " (switching)"}
        </button>
      ))}

      <div>{error && error.message}</div>
    </>
  );
};

export default ChainHandler;
