import React from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import HomeContainer from "../../components/containers/HomeContainer";
import BoxCard from "../../components/cards/BoxCard";
import Box1Card from "../../components/cards/Box1Card";
import Box2Card from "../../components/cards/Box2Card";
import { move1, move2, move3, move4, move5 } from "../../constants/content";

export default function Dashboard() {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const router = useRouter();

  return (
    <HomeContainer>
      <Stack
        gap={12}
        sx={{
          pt: 7,
        }}
      >
        <Stack
          flexDirection={matchUpMd ? "row" : "column"}
          gap={matchUpLg ? 15 : matchUpMd ? 10 : 4}
        >
          <Stack flex={1} justifyContent="center" gap={matchUpMd ? 4 : 8}>
            <Stack>
              <Stack flexDirection="row">
                <Box
                  component="img"
                  src="/images/spark.png"
                  sx={{
                    position: "relative",
                    left: -20,
                  }}
                />
              </Stack>
              <Typography
                variant="h1"
                sx={{
                  "& span": {
                    background:
                      "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                  },
                }}
              >
                Build in <span>web3&nbsp;</span> <br /> with lowest cost.
              </Typography>
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent={matchUpMd ? "flex-end" : "center"}
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                },
                position: "relative",
              }}
            >
              <BoxCard
                top={0}
                right={100}
                move={move3}
                bottom={undefined}
                left={undefined}
                title={"/images/boxes/1.png"}
                content={"offering 10-30% De Discount"}
              />
              <BoxCard
                left={-100}
                bottom={100}
                move={move2}
                top={undefined}
                right={undefined}
                title="/images/boxes/2.png"
                content="offering 10-30% De Discount"
              />
              <BoxCard
                right={0}
                bottom={0}
                move={move4}
                top={undefined}
                left={undefined}
                title={"/images/boxes/3.png"}
                content={"offering 10-30% De Discount"}
              />
              <Box
                component="img"
                src="/images/box1.png"
                sx={{
                  maxWidth: "100%",
                }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </Typography>
            <Box sx={{ pt: 2.5 }}>
              <Button
                sx={{
                  background:
                    "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                  px: 4.5,
                  py: 1.5,
                  borderRadius: 2.5,
                }}
                onClick={() => router.push("/deals")}
              >
                Explore now
              </Button>
            </Box>
          </Stack>
          <Stack
            flex={1}
            flexDirection="row"
            justifyContent="flex-end"
            sx={{
              position: "relative",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <BoxCard
              top={0}
              right={100}
              move={move3}
              bottom={undefined}
              left={undefined}
              title={""}
              content={""}
            />
            <Box1Card
              left={-100}
              bottom={100}
              move={move2}
              top={undefined}
              right={undefined}
              title={""}
              content={""}
            />
            <Box2Card
              right={0}
              bottom={0}
              move={move5}
              top={undefined}
              left={undefined}
              title={""}
              content={""}
            />
            <Stack flexDirection="row">
              <Box
                component="img"
                src="/images/box1.png"
                sx={{
                  maxWidth: "100%",
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={10}
          flexWrap="wrap"
          sx={{
            opacity: "0.45",
          }}
        >
          <Box>
            <Box component="img" src="/images/slack.png" />
          </Box>
          <Box>
            <Box component="img" src="/images/webflow.png" />
          </Box>
          <Box>
            <Box component="img" src="/images/airtable.png" />
          </Box>
          <Box>
            <Box component="img" src="/images/notion.png" />
          </Box>
          <Box>
            <Box component="img" src="/images/tiktok.png" />
          </Box>
        </Stack>
      </Stack>
    </HomeContainer>
  );
}
