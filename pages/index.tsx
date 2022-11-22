import React from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "../layouts";
import Dashboard from "../components/home/Dashboard";
import HowItWorks from "../components/home/HowItWorks";
import HotDeals from "../components/home/HotDeals";
import Categories from "../components/home/Categories";
import Community from "../components/home/Community";
import Feedback from "../components/home/Feedback";
import Faq from "../components/home/Faq";
import HomePattern from "../components/patterns/HomePattern";

const Home = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{
        pb: 25,
        pt: matchUpMd ? 16 : 4,
        zIndex: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack gap={20}>
        <Dashboard />
        <HowItWorks />
        <HotDeals />
        <Categories />
        <Community />
        {/* <Feedback /> */}
        <Faq />
      </Stack>
      <HomePattern />
    </Box>
  );
};

Home.layout = Layout;

export default Home;
