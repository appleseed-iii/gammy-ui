import { Contract, ContractReceipt, ethers } from "ethers";
import { useMutation, useQueries, useQuery, UseQueryResult } from "react-query";
import LinkTreeABI from "src/abi/LinkTree.json";
import { addresses } from "src/constants";
import { useContract, useContractWrite, useProvider } from "wagmi";

export const useLiveLinksLT = () => {
  // const client = useQueryClient();
  const provider = useProvider();
  const linkTree = useContract({
    addressOrName: addresses[4].LINK_TREE,
    contractInterface: LinkTreeABI.abi,
    signerOrProvider: provider,
  });
  return useQuery(
    ["getLinks"],
    async () => {
      return await linkTree.liveLinks().then((ids: any[]) => ids.map(id => id.toString()));
    },
    { staleTime: 150000 },
  );
};

export interface ILink {
  linkId: string;
  state: string;
  url: string;
  display: string;
  order: number;
}

export const blankLink = ({ order }: { order: number }): ILink => {
  return {
    linkId: "new",
    state: "add",
    url: "",
    display: "",
    order: order,
  };
};

export const useGetLinksLT = () => {
  // const client = useQueryClient();
  const provider = useProvider();
  const linkTree: Contract = useContract({
    addressOrName: addresses[4].LINK_TREE,
    contractInterface: LinkTreeABI.abi,
    signerOrProvider: provider,
  });

  const links = useLiveLinksLT();

  console.log("links res", links);
  const linksArray = links.data || [];
  // const links = [0, 1];
  const results = useQueries(
    linksArray.map((linkId: number) => ({
      queryKey: ["link", linkId],
      queryFn: async (): Promise<ILink> => {
        const linkObj = {
          linkId: linkId,
          state: "update",
          ...(await linkTree.links(linkId)),
        };
        return linkObj;
      },
      enabled: links.isSuccess && !!links.data,
      staleTime: 150000,
    })),
  );
  console.log(results, "<<<<<<<<<< result s>>>>>>>>>>>>>");

  return results as UseQueryResult<ILink, Error>[];
};

export const useCheckRoleForLT = (address: string | undefined, chainId: number) => {
  const provider = useProvider();
  const linkTree: Contract = useContract({
    addressOrName: addresses[chainId].LINK_TREE,
    contractInterface: LinkTreeABI.abi,
    signerOrProvider: provider,
  });

  console.log("contract", linkTree, chainId);

  return useQuery(
    ["getRole", address],
    async () => {
      return await linkTree.hasRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("GOVERNOR_ROLE")), address);
    },
    { staleTime: 150000, enabled: !!address },
  );
};

export const useGetLinksForEdit = () => {
  const linksArray = useGetLinksLT();
  const isLoading = linksArray.some(result => result.isLoading);
  const isSuccess = linksArray.every(result => result.isSuccess);
  console.log("isLoading", isLoading, isSuccess, linksArray);
  const ready = isLoading === false && isSuccess;
  let failure = false;
  const defaultData = linksArray.map((link: UseQueryResult<ILink, Error>) => {
    if (!link.isLoading && link.isSuccess && link.data) {
      let order: number;
      if (link.data.order) {
        order = Number(link.data.order.toString());
      } else {
        // note added failure, because this condition exists sometimes...
        failure = true;
        order = 0;
      }
      console.log("linkData", link.data);
      return {
        linkId: link.data.linkId,
        state: link.data.state,
        url: link.data.url,
        display: link.data.display,
        order: order,
      };
    }
  });
  return {
    ready,
    failure,
    results: defaultData,
  };
};

export const useChangeNameLT = () => {
  const provider = useProvider();
  const linkTree = useContract({
    addressOrName: addresses[4].LINK_TREE,
    contractInterface: LinkTreeABI.abi,
    signerOrProvider: provider,
  });

  return useMutation<ContractReceipt, Error, string>(
    async newName => {
      if (!newName) throw new Error(`Please enter a name`);
      const transaction = await linkTree.changeName(newName);
      return transaction.wait();
    },
    {
      // onError: error => {
      //   dispatch(createErrorToast(error.message));
      // },
      onSuccess: async () => {
        // const keysToRefetch = [
        //   balanceQueryKey(address, WSOHM_ADDRESSES, networkId),
        //   balanceQueryKey(address, GOHM_ADDRESSES, networkId),
        // ];
        // const promises = keysToRefetch.map(key => client.refetchQueries(key, { active: true }));
        // await Promise.all(promises);
        // dispatch(createInfoToast(t`Successfully migrated from wsOHM to gOHM`));
      },
    },
  );
};

export const useChangeLinksLT = () => {
  const changeLinks = useContractWrite(
    {
      addressOrName: addresses[4].LINK_TREE,
      contractInterface: LinkTreeABI.abi,
    },
    "updateLinks",
    {
      onMutate({ args, overrides }) {
        console.log("Mutate", { args, overrides });
        return { args, overrides };
      },
      // onError(error) {
      //   console.log("Error", error);
      //   return error;
      // },
    },
  );

  return changeLinks;
};
