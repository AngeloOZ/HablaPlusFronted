import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  YouTube,
  Class,
  ListAlt,
  Spellcheck,
  Logout,
} from "@mui/icons-material";
import { ItemSideMenu } from "./ItemSideMenu";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../Context";

const listSideMenu = [
  {
    text: "Videos motivacionales",
    icon: <YouTube />,
    url: "/admin",
  },
  {
    text: "Categorias de palabras",
    icon: <ListAlt />,
    url: "/admin/categorias",
  },
  {
    text: "Palabras",
    icon: <Class />,
    url: "/admin/palabras",
  },
  {
    text: "Oraciones de repaso",
    icon: <Spellcheck />,
    url: "/admin/repaso-palabras",
  },
];

const openedMixin = (theme) => ({
  width: "240px",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "240px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  zIndex: 1000,
}));

export const SideMenuAdmin = ({ handleDrawerClose, open }) => {
  const { logoutUser } = useContext(AuthContext);
  const router = useRouter();

  const navigateTo = (path) => {
    if (path) router.push(path);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          component={"div"}
          display="flex"
          justifyContent={"space-between"}
          paddingLeft={2}
          alignItems={"center"}
          width="100%"
        >
          <Typography variant="subtitle1">Habla+</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        {listSideMenu.map((item, i) => (
          <ItemSideMenu
            key={i}
            text={item.text}
            icon={item.icon}
            open={open}
            onClick={() => navigateTo(item.url)}
          />
        ))}
        <ItemSideMenu
          text="Cerrar sesión"
          icon={<Logout />}
          open={open}
          onClick={logoutUser}
        />
      </List>
    </Drawer>
  );
};
