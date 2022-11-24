import { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery, gql } from "@apollo/client";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import Information from "../../components/information";
import GetDeal from "../../components/modals/GetDeal";
import HomeContainer from "../../components/containers/HomeContainer";
import DetailPattern from "../../components/patterns/DetailPattern";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "../../layouts";
import { GET_DEALS } from "../../gql/deals";

const Deal = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const matchUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeal = () => {
    if (session) {
      handleOpen();
    } else {
      router.push("/login");
    }
  };

  const { data, loading, refetch } = useQuery(GET_DEALS, {
    variables: {
      filter: {
        ids: [id],
      },
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HomeContainer>
        {loading ? (
          <Box
            sx={{
              py: 10,
              pb: 20,
            }}
          >
            <Stack flexDirection={matchUpMd ? "row" : "column"} gap={6}>
              <Stack flex={1} gap={matchUpMd ? 10 : 6}>
                <Breadcrumbs separator=">" aria-label="breadcrumb">
                  <Link href="/">Home</Link>
                  <Link href="/deals">All Deals</Link>
                </Breadcrumbs>
                <Typography>Loading...</Typography>
              </Stack>
              <Stack flex={1}></Stack>
            </Stack>
          </Box>
        ) : (
          <Box
            sx={{
              py: 10,
              pb: 10,
            }}
          >
            <Stack flexDirection={matchUpMd ? "row" : "column"} gap={6}>
              <Stack flex={1} gap={matchUpMd ? 10 : 6}>
                <Breadcrumbs separator=">" aria-label="breadcrumb">
                  <Link href="/">Home</Link>
                  <Link href="/deals">All Deals</Link>
                  <Typography color="text.primary">
                    {data?.deals?.[0]?.companyName ?? ""}
                  </Typography>
                </Breadcrumbs>
                <Stack
                  flexDirection={matchUpSm ? "row" : "column"}
                  alignItems="center"
                  gap={5}
                >
                  <Stack
                    flexDirection="row"
                    sx={{
                      background:
                        "linear-gradient(153deg, rgba(255, 255, 255, 0.25) 1.05%, rgba(255, 162, 229, 0.25) 48.78%, rgba(225, 140, 255, 0.25) 100%)",
                      //   opacity: 0.25,
                      boxShadow: "-2px 3px 10px rgba(0, 0, 0, 0.09)",
                      borderRadius: 3,
                      p: 0.5,
                    }}
                  >
                    <Stack
                      sx={{
                        width: 120,
                        height: 115,
                        borderRadius: 3,
                        position: "relative",
                        pt: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          background: `url(${
                            data?.deals?.[0]?.companyLogoURL ?? ""
                          })`,
                          bgcolor: "#fff",
                          top: 0,
                          backgroundSize: "100% 100%",
                          borderRadius: 3,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Stack>
                  </Stack>
                  <Stack>
                    <Typography
                      variant="h2"
                      sx={{
                        textAlign: matchUpSm ? "left" : "center",
                      }}
                    >
                      {data?.deals?.[0]?.companyName ?? ""}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 400,
                        color: "#C7C7C7",
                        textAlign: matchUpSm ? "left" : "center",
                      }}
                    >
                      {data?.deals?.[0]?.descriptionInHTML ?? ""}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Roboto",
                  }}
                >
                  {data?.deals?.[0]?.smallDesc ?? ""}
                </Typography>
              </Stack>
              <Box
                flex={1}
                sx={{
                  width: "100%",
                  maxWidth: matchUpMd ? 462 : "100%",
                  background:
                    "linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%)",
                  boxShadow: "0px 16px 40px rgba(175, 89, 206, 0.33)",
                  borderRadius: 3.5,
                }}
              >
                <Stack
                  gap={4}
                  sx={{
                    pt: matchUpSm ? 5 : 2,
                    pl: matchUpSm ? 5 : 2,
                    pr: matchUpSm ? 4 : 2,
                    pb: matchUpSm ? 4 : 2,
                  }}
                >
                  <Typography variant="h4">{data?.deals?.[0]?.name}</Typography>
                  <Button
                    sx={{
                      background:
                        "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                      borderRadius: 2,
                      py: 1.5,
                    }}
                    onClick={handleDeal}
                  >
                    <Typography variant="body2">Get deal for $149</Typography>
                  </Button>
                  <Stack gap={1.5}>
                    <Typography variant="caption">
                      Eligibility criteria:
                    </Typography>
                    <Stack flexDirection="row" gap={1.5}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer nec odio. Praesent libero.
                      </Typography>
                    </Stack>
                    <Stack flexDirection="row" gap={1.5}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer nec odio. Praesent libero.
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<ShareIcon />}
                                >
                                    Share deal
                                </Button> */}
                </Stack>
                <Stack
                  gap={1}
                  sx={{
                    bgcolor: "#64578E",
                    pl: matchUpSm ? 4.5 : 2,
                    pr: matchUpSm ? 3.5 : 2,
                    pt: 2.5,
                    pb: 3,
                    borderRadius: "0px 0px 10px 10px",
                  }}
                >
                  <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Satisfaction Guaranteed
                    </Typography>
                    <CheckIcon sx={{ fontSize: 14 }} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#D9CDF0" }}>
                    All our deals are 100% verified as they are all negotiated
                    directly with the vendors by our team.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Box sx={{ pt: 10 }}>
              <Information
                data={
                  data && data.deals && data.deals.length ? data.deals[0] : {}
                }
              />
            </Box>
            <GetDeal data={data} open={open} handleClose={handleClose} />
          </Box>
        )}
      </HomeContainer>
      <DetailPattern />
    </Box>
  );
};

Deal.layout = Layout;

export default Deal;
