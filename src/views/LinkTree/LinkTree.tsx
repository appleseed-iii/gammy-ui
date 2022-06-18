import "./style.scss";

import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { UseQueryResult } from "react-query";

import { ILink, useGetLinksLT } from "./hooks/useLinkTree";

type boject = {
  ButtonStyle: {
    background: string;
    border: string;
  };
  textStyle: {
    color: string;
  };
  userImg: string;
};

export const LinkTree = (props: boject) => {
  const buttontSyle = props.ButtonStyle;
  const linkStyle = props.textStyle;
  const userImg = props.userImg;
  const linksArray = useGetLinksLT();
  let linksList: JSX.Element[] = [<PlaceHolder />];
  const newLocal = "linear-gradient(270deg, #1085D2 0%, #00007B 100%)";
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box sx={{ height: "10px" }} />
      <Paper
        id="main-paper"
        elevation={3}
        variant="outlined"
        square
        sx={{ padding: "2px 2px 20px 2px", minWidth: "370px", alignSelf: "center" }}
      >
        <Box sx={{ background: newLocal, height: "24px", padding: "0px 5px" }} id="paper-header">
          <Typography sx={{ color: "#fff" }}>Buy Now</Typography>
        </Box>
        <Box m={2} display="flex" flexDirection="column">
          <Box>
            <Box
              component="img"
              sx={{ height: "340px", width: "340px", border: "1px solid #fff" }}
              alt="The house from the offer."
              src="https://bafkreidom2nqno4ra2xlzmtuzsy6fvjplloau6kfl2wm2b3msb2dpvtqpe.ipfs.nftstorage.link/"
            ></Box>
          </Box>
          <Box id="bottom-row">
            <Button variant="outlined">Buy!</Button>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ height: "60px" }} />
    </Box>
  );
  if (linksArray.length > 0) {
    linksList = linksArray.map((link: UseQueryResult<ILink, Error>) => {
      return (
        <>
          {!link.isLoading && link.isSuccess ? (
            <Box style={buttontSyle} m={2}>
              <Button style={linkStyle} variant="contained" href={link.data?.url as string}>
                {link.data?.display as string}
              </Button>
            </Box>
          ) : (
            <PlaceHolder />
          )}
        </>
      );
    });
  }
  return (
    <div>
      <div>
        <img src={userImg} alt="" />
        <p>@marystuart</p>
      </div>
      <Box className="link-button" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {linksList}
      </Box>
    </div>
  );
};

const PlaceHolder = () => {
  return (
    <Box m={2}>
      <Skeleton>
        <Button variant="contained" href={""}>
          placeholder
        </Button>
      </Skeleton>
    </Box>
  );
};
