import { useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  List,
  IconButton,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {
  YouTube,
  Class,
  ListAlt,
  Spellcheck,
  Mail,
  Inbox,
} from "@mui/icons-material";

const drawerWidth = 240;
const listSideMenu = [
  {
    text: "Videos motivacionales",
    icon: <YouTube />,
  },
  {
    text: "Categorias de palabras",
    icon: <ListAlt />,
  },
  {
    text: "Palabras",
    icon: <Class />,
  },
  {
    text: "Oraciones",
    icon: <Spellcheck />,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
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
}));

function SideMenuAdmin({ handleDrawerClose, open }) {
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
          <ListItem disablePadding sx={{ display: "block" }} key={i}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Typography fontSize={14}>{item.text}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

function AppBarCustom({ open, handleDrawerOpen }) {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography> */}
      </Toolbar>
    </AppBar>
  );
}

export const AdminLayouts = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarCustom handleDrawerOpen={handleDrawerOpen} open={open} />
      <SideMenuAdmin handleDrawerClose={handleDrawerClose} open={open} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2, bgcolor: "#f3f3f3", minHeight: "100vh" }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
