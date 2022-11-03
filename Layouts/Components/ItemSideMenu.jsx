import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const ItemSideMenu = ({ text, icon, onClick, open }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }} onClick={onClick}>
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
          {icon}
        </ListItemIcon>
        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
          <Typography fontSize={14}>{text}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
