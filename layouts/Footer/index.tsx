import { Box, Stack, Typography, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeContainer from "../../components/containers/HomeContainer";
import Link from "next/link";

export default function Footer() {
  const theme = useTheme();
  const matchUpXl = useMediaQuery(theme.breakpoints.up("xl"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          // background:
          background:
            "linear-gradient(116.41deg, rgba(103, 103, 103, 0.22) -56.52%, rgba(45, 37, 58, 0.22) 130.2%)",
          // boxShadow: '0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)',
          // backdropFilter: 'blur(42.5447px)',
        }}
      >
        <HomeContainer>
          <Stack
            flexDirection={matchUpMd ? "row" : "column"}
            alignItems="flex-start"
            gap={matchUpMd ? 0 : 7.5}
            sx={{
              py: 7,
            }}
          >
            <Stack flex={matchUpMd ? 1 : "auto"} gap={3} sx={{ width: "100%" }}>
              <Stack
                flexDirection={matchUpSm ? "row" : "column"}
                justifyContent="space-between"
                gap={4}
              >
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Box
                    component="img"
                    src="/images/logo.png"
                    sx={{
                      width: 54,
                    }}
                  />
                  <Typography variant="h5" fontFamily="Roboto" fontWeight="700">
                    Pandora
                  </Typography>
                </Stack>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap={3}
                  sx={{
                    display: matchUpMd ? "none" : "flex",
                  }}
                >
                  <Box component="img" src="/images/linkedin.png" />
                  <Box component="img" src="/images/twitter.png" />
                  <Box component="img" src="/images/instagram.png" />
                </Stack>
              </Stack>
              <Typography
                variant="caption"
                sx={{
                  textTransform: "capitalize",
                  maxWidth: 440,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus
              </Typography>
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={3}
                sx={{
                  display: matchUpMd ? "flex" : "none",
                }}
              >
                <Box component="img" src="/images/linkedin.png" />
                <Box component="img" src="/images/twitter.png" />
                <Box component="img" src="/images/instagram.png" />
              </Stack>
            </Stack>
            <Stack
              flexDirection={matchUpSm ? "row" : "column"}
              flex={1}
              gap={matchUpXl ? 12 : 8}
            >
              <Stack>
                <Typography sx={{ color: "#8E55FF", fontWeight: 800 }}>
                  Marketplace
                </Typography>
                <Stack flexDirection="row" gap={3}>
                  <Divider orientation="vertical" flexItem />
                  <Stack
                    gap={2}
                    sx={{
                      pt: 3,
                      "& a": {
                        color: "inherit",
                      },
                    }}
                  >
                    <Link href="/">
                      <Typography>All Deals</Typography>
                    </Link>
                    <Link href="/">
                      <Typography>Pricing</Typography>
                    </Link>
                    <Link href="/">
                      <Typography>Affiliation</Typography>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Typography sx={{ color: "#8E55FF", fontWeight: 800 }}>
                  Company
                </Typography>
                <Stack
                  flexDirection={matchUpLg ? "row" : "column"}
                  gap={matchUpXl ? 6 : 3}
                >
                  <Stack flexDirection="row" gap={3}>
                    <Divider orientation="vertical" flexItem />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: matchUpLg
                          ? "repeat(2, 1fr)"
                          : "repeat(1, 1fr)",
                        rowGap: 2,
                        columnGap: 3,
                        pt: 3,
                        "& a": {
                          color: "inherit",
                        },
                      }}
                    >
                      <Link href="/">
                        <Typography>Contact us</Typography>
                      </Link>
                      <Link href="/">
                        <Typography>Terms & Conditions</Typography>
                      </Link>
                      <Link href="/">
                        <Typography>About us</Typography>
                      </Link>
                      <Link href="/">
                        <Typography>Privacy Policy</Typography>
                      </Link>
                      <Link href="/">
                        <Typography>Blogs</Typography>
                      </Link>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </HomeContainer>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "-1.8%",
          right: "67.59%",
          top: "0%",
          bottom: "-12.81%",
          background: "url(/images/patterns/home/bubble/1.png)",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "screen",
          mixBlendMode: "screen",
          opacity: 0.65,
          filter: "blur(12.5px)",
        }}
      ></Box>
    </Box>
  );
}
