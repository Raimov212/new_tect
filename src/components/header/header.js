import { DehazeRounded, ExpandMore, Language } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Dropdown, Menu, Space } from "antd";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { MenuList } from "../data/MenuList";
import { ContainerWrapper, StyleToolbar, Wrapper } from "./style_header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(matches);
  const navigate = useNavigate();
  const { t, ready } = useTranslation();

  const handleMenuList = (e) => {
    if (e.keyPath[1] === "/company") {
      navigate(e.keyPath[1]);
    } else if (e.keyPath[1] === "/services") {
      navigate(e.keyPath[1]);
    } else if (e.keyPath.length > 1) {
      navigate(e.keyPath[0]);
    } else {
      navigate(e.key);
    }
    return e.key;
  };

  const handleLanguage = (e) => {
    if (e.key) {
      i18next.changeLanguage(`${e.key}`);
    }
  };

  const [open, setOpen] = useState(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const menu = (
    <Menu
      onClick={handleLanguage}
      items={[
        {
          key: "uz",
          label: "uz",
        },
        {
          key: "ru",
          label: "ru",
        },
        {
          key: "en",
          label: "en",
        },
      ]}
    />
  );

  console.log("test", open && MenuList());

  return (
    <Wrapper>
      <ContainerWrapper maxWidth="lg">
        <StyleToolbar>
          <Box className="smAppbar">
            <Typography
              color="primary"
              variant="h6"
              component="p"
              className="text"
              onClick={() => navigate("/")}
            >
              {ready ? t("header.LogoTitle") : []}
            </Typography>

            <DehazeRounded
              sx={{
                display: { xs: "block", sm: "none" },
                color: "primary.main",
              }}
              onClick={handleClick}
            />
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              {/* {open ? ( */}
                <Box className="smMenu">
                  <Menu
                    onClick={handleMenuList}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode={matches ? "inline" : "horizontal"}
                    items={MenuList().length > 0 && MenuList()}
                  />
                  {menu}
                </Box>
              {/* ) : (
                <Box></Box>
              )} */}
            </Box>
          </Box>

          <Box className="Menu" sx={{ display: { xs: "none", sm: "block" } }}>
            <Menu
              onClick={handleMenuList}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode={matches ? "inline" : "horizontal"}
              items={MenuList()}
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Dropdown overlay={menu} style={{ flex: "1" }}>
              <a href="true">
                <Space>
                  <Box display={"flex"} alignItems={"center"}>
                    <Language />
                    <Typography>{ready ? t("header.Language") : []}</Typography>
                    <ExpandMore />
                  </Box>
                </Space>
              </a>
            </Dropdown>
          </Box>
        </StyleToolbar>
      </ContainerWrapper>
    </Wrapper>
  );
};

export default Sidebar;
