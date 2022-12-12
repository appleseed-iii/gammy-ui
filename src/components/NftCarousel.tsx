import { Box, Button, Skeleton } from "@mui/material";
import { useState } from "react";
import { calculateAspectRatioFit } from "src/helpers";
import { useGetTotalSupply, useNftImage } from "src/views/MintPage/hooks/useGammy";

const NftPager = ({ tokenId, setGetTokenId }: { tokenId: number; setGetTokenId: any }) => {
  const { data: totalSupply } = useGetTotalSupply();
  const clickPrevious = () => {
    console.log("prev", tokenId);
    if (tokenId === 0) {
      setGetTokenId(Number(totalSupply?.toString()));
    } else {
      setGetTokenId(tokenId - 1);
    }
  };
  const clickNext = () => {
    console.log("next", tokenId);
    if (tokenId === Number(totalSupply?.toString())) {
      setGetTokenId(0);
    } else {
      setGetTokenId(tokenId + 1);
    }
  };

  return (
    <Box display="flex row">
      <Button variant="outlined" onClick={() => clickPrevious()}>
        prev
      </Button>
      <Button variant="outlined" onClick={() => clickNext()}>
        next
      </Button>
    </Box>
  );
};

export const NftCarousel = ({ initialRandomTokenId }: { initialRandomTokenId: number }) => {
  const [getTokenId, setGetTokenId] = useState<number>(initialRandomTokenId);
  const {
    imgURL,
    aspectRatio,
    isLoading: imgLoading,
  } = useNftImage({
    tokenId: getTokenId,
    enabled: !!getTokenId || getTokenId === 0,
  });
  const result = calculateAspectRatioFit({ srcWidth: 1170, srcHeight: 2120, maxWidth: 500, maxHeight: 400 });
  return (
    <Box id="nft-carousel" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {imgLoading ? (
        <Skeleton>
          <Box
            component="img"
            sx={{ height: `${result.height}px`, width: `${result.width}px`, border: "1px solid #fff" }}
            alt="placeholder"
            src={"https://nftstorage.link/ipfs/bafkreiephptwt3fkltqz4yydntnonoxpmj6kozl5ldmydydg5i3tfo5bqi"}
          />
        </Skeleton>
      ) : (
        <>
          <Box
            component="img"
            sx={{ height: `${aspectRatio.height}px`, width: `${aspectRatio.width}px`, border: "1px solid #fff" }}
            alt="tokenImg"
            src={imgURL}
          />
          <NftPager tokenId={getTokenId} setGetTokenId={setGetTokenId} />
        </>
      )}
    </Box>
  );
};
