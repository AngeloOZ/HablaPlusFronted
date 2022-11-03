import { useState } from "react";
import Head from "next/head";

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { SideMenuAdmin, AppBarAdmin } from "./Components";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AdminLayouts = ({ title = "Habla+", titlePage, children }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} color="primary">
      <Head>
        <title>{title}</title>
      </Head>
      <AppBarAdmin
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        title={titlePage}
      />

      <SideMenuAdmin handleDrawerClose={handleDrawerClose} open={open} />
      
      <Box component="main" sx={{ flexGrow: 1, p: 2, minHeight: "100vh" }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
