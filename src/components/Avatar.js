import React from "react";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useHistory } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../components/MenuPopover";
import avatar from "../images/avatar.jpeg";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "My Apartment",
    icon: homeFill,
    linkTo: "/user/apartments",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function UserAvatar(props) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.callBack({ type: "logout", isLoggedIn: false });
    history.push("/");
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={avatar} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220, borderRadius: "8px" }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "Public Sans,sans-serif", fontWeight: "bolder" }}
            noWrap
          >
            {props.user.firstName + " " + props.user.lastName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontFamily: "Public Sans,sans-serif",
            }}
            noWrap
          >
            {props.user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{
              typography: "body2",
              py: 1,
              px: 2.5,
              fontFamily: "Public Sans,sans-serif",
            }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            style={{
              borderColor: "silver",
              borderRadius: "8px",
              fontFamily: "Public Sans,sans-serif",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
