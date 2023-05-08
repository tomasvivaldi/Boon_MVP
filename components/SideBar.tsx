import React from "react";
import Image from "next/image";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Toolbar,
} from "@mui/material";

const ThinSidebar = () => {
  return (
    <AppBar
      sx={{
        height: "100vh",
        width: "72px",
        left: 0,
        backgroundColor: "#F6F9FC",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Toolbar
          sx={{
            justifyContent: "center",
            minHeight: "72px",
            pl: 0,
            pr: 0,
          }}
        >
          <img src="/Logo.svg" alt="Website Logo" width="40" height="40" />
        </Toolbar>
        <List
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/_NavItemButton-1.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/_NavItemButton-2.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/_NavItemButton-3.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/check-square.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/_NavItemButton-5.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/_NavItemButton-6.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Box>
      <Box sx={{ pb: 2 }}>
        <List>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/_NavItemButton-7.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <Image
                src="/_NavItemButton-8.png"
                alt="Your Image Description"
                width={24}
                height={24}
              />
            </ListItemIcon>
          </ListItemButton>
        </List>
        <Divider sx={{ mx: 2, borderColor: "#475467" }} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Avatar src="/your-profile-pic.jpg" alt="Profile Picture" />
        </Box>
      </Box>
    </AppBar>
  );
};

export default ThinSidebar;
