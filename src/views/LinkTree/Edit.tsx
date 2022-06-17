import DeleteIcon from "@mui/icons-material/Delete";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Box, Button, Paper, Skeleton, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
// import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ChainHandler from "src/components/ChainHandler";
import CustomizedSnackbars from "src/components/CustomizedSnackbars";
import { addresses } from "src/constants";
import { FormInputThemeComponent, FormRowThemeComponent } from "src/styles/theme";
import { useAccount, useConnect, useNetwork } from "wagmi";

import { blankLink, ILink, useChangeLinksLT, useCheckRoleForLT, useGetLinksForEdit } from "./hooks/useLinkTree";

type FormValues = (ILink | undefined)[];

type UseFormValues = {
  links: FormValues;
};

const Edit = () => {
  const { data: accountData, isLoading } = useAccount();
  const { isConnected } = useConnect();
  const { activeChain } = useNetwork();
  let addressCheck = false;
  if (activeChain?.id && addresses[activeChain?.id]?.LINK_TREE) {
    addressCheck = true;
  }
  // force chainId & Address for types, but don't use in isConnectedReady
  const isConnectedReady = isConnected && accountData?.address && addressCheck;
  const chainId = activeChain?.id || 4;
  const address = accountData?.address || "4";
  console.log("isConnectedReady", isConnected, accountData?.address, activeChain?.id);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {/* ChainHandler only needed on edit view (where we need a signer) */}
      <Paper elevation={2}>
        <Typography>Edit</Typography>
        {isConnectedReady ? (
          <ContractLoader address={address} chainId={chainId} />
        ) : isConnected ? (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            Please switch chains
            <ChainHandler />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            Not Connected
          </Box>
        )}
      </Paper>

      <Button variant="outlined">
        <Link to={"/"}>Back to View</Link>
      </Button>
    </Box>
  );
};

export default Edit;

const ContractLoader = ({ address, chainId }: { address: string; chainId: number }) => {
  const roles = useCheckRoleForLT(address, chainId);
  const hasAccess = roles.isSuccess && roles.data;
  console.log("connectCheck", address, roles);

  return (
    <>
      {hasAccess ? (
        <FormContainer />
      ) : (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          Your wallet {address} does not have edit rights
        </Box>
      )}
    </>
  );
};

const FormContainer = () => {
  const { ready, failure, results: linksArray } = useGetLinksForEdit();
  const { isConnected } = useConnect();
  console.log("data in Form", ready, linksArray, failure);
  useEffect(() => {
    if (failure) window.setTimeout(() => window.location.reload(), 1);
  }, [failure]);

  return (
    <>
      {ready && !failure ? (
        <EditForm links={linksArray} />
      ) : (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          {<PlaceHolder />}
        </Box>
      )}
    </>
  );
};

const EditForm = ({ links }: { links: FormValues }) => {
  console.log("load form", links);
  const { control, handleSubmit } = useForm<UseFormValues>({
    mode: "onChange",
    defaultValues: {
      links: links,
    },
  });
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "links",
  });

  console.log("fields up", fields);
  const changeLinks = useChangeLinksLT();
  console.log("changeLinks", changeLinks.isSuccess, changeLinks.isError);
  const onSubmit = (data: UseFormValues) => {
    console.log(data);
    console.log("before mutate", data.links);
    const addUrls: string[] = [];
    const addDisplays: string[] = [];
    const addOrders: number[] = [];
    const changeIds: number[] = [];
    const changeUrls: string[] = [];
    const changeDisplays: string[] = [];
    const changeOrders: number[] = [];
    const removeIds: number[] = [];
    // for (const link of args) {
    //   console.log("link", link);
    //   ids << link.id;
    // }
    data.links.forEach((link: ILink | undefined) => {
      if (link?.linkId && link?.state === "add") {
        // new link
        console.log("new", link);
        if (link?.url) addUrls.push(link?.url);
        if (link?.display) addDisplays.push(link?.display);
        if (link?.order || link?.order === 0) addOrders.push(link?.order);
      } else if (link?.linkId && link?.state === "delete") {
        // delete link
        removeIds.push(Number(link?.linkId));
      } else if (link?.linkId) {
        // regular link
        changeIds.push(Number(link?.linkId));
        if (link?.url) changeUrls.push(link?.url);
        if (link?.display) changeDisplays.push(link?.display);
        if (link?.order || link?.order === 0) changeOrders.push(link?.order);
      }
    });
    const args = [addUrls, addDisplays, addOrders, changeIds, changeUrls, changeDisplays, changeOrders, removeIds];
    changeLinks.write({ args: args });
  };

  const handleAddLink = () => {
    console.log("addLink", fields.length);
    append(blankLink({ order: fields.length }));
  };
  const handleDeleteLink = (index: number, field: ILink & Record<"id", string>) => {
    console.log("deleteLink", field);
    if (field.state === "add") {
      // this is a new one, so just delete
      remove(index);
    } else {
      field.state = "delete";
      console.log("field", field);
      update(index, field);
    }
  };

  // set the initial form values via a useEffect (in lieu of via defaultValues)
  // useEffect(() => {
  //   console.log("UE", { links: links });
  //   replace(links);
  // }, [links, replace]);

  const linksList: JSX.Element[] = [<PlaceHolder />];
  if (links.length > 0) {
    return (
      <>
        <Button variant="contained" onClick={handleAddLink}>
          Add Link
        </Button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            {changeLinks.isError && (
              <CustomizedSnackbars
                severity={"error"}
                message={changeLinks.error ? changeLinks.error.toString() : "Something went wrong"}
              />
            )}
            {changeLinks.isSuccess && <CustomizedSnackbars severity={"success"} message={"great success"} />}

            {fields.map((field, index) => (
              <FormRowThemeComponent>
                <Box display="flex" alignItems="center">
                  <Box display="flex" sx={{ cursor: "grab" }}>
                    <DragHandleIcon color="action" />
                  </Box>
                  <Box>
                    <Box>
                      <FormInputThemeComponent>
                        <Controller
                          render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
                            <TextField
                              required
                              id="url-required"
                              label="URL"
                              value={value || ""}
                              onChange={onChange}
                              onBlur={onBlur}
                              variant="standard"
                              key={field.id}
                            />
                          )}
                          name={`links.${index}.url`}
                          control={control}
                        />
                      </FormInputThemeComponent>
                      <FormInputThemeComponent>
                        <Controller
                          render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
                            <TextField
                              required
                              id="display-required"
                              label="Display Text"
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              variant="standard"
                            />
                          )}
                          name={`links.${index}.display`}
                          control={control}
                        />
                      </FormInputThemeComponent>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Button onClick={() => handleDeleteLink(index, field)}>
                        <DeleteIcon color="action" />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </FormRowThemeComponent>
            ))}
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </>
        </form>
      </>
    );
    // });
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {linksList}
    </Box>
  );
};

const PlaceHolder = () => {
  return (
    <Box m={2}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <Skeleton>
            <TextField required id="url-required" label="URL" defaultValue="default" variant="standard" />
          </Skeleton>
        </Box>
        <Box>
          <Skeleton>
            <TextField required id="display-required" label="Display" defaultValue="default" variant="standard" />
          </Skeleton>
        </Box>
      </Box>
    </Box>
  );
};
