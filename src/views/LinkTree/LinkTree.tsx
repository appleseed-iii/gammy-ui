import "./style.scss";

import { Box, Button, Skeleton } from "@mui/material";
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
