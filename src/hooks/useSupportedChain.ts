import toast from "react-hot-toast";
import { useNetwork } from "wagmi";

export const useSupportedChain = () => {
  const { chain } = useNetwork();
  if (chain?.unsupported) {
    toast.error("Please switch to mainnet", { id: "switch-chains" });
    return false;
  }
  return true;
};
