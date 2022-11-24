import {
  Box,
  Button,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeContainer from "../components/containers/HomeContainer";
import PricingPattern from "../components/patterns/PricingPattern";
import { useQuery, gql } from "@apollo/client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Layout from "../layouts";
import { useState } from "react";

const Referral = () => {
  const { data, loading, error } = useQuery(gql`
    query {
      me {
        _id
        createdAt
        deleted {
          adminId
          date
        }
        email
        lastLoginDate
        referralCode
        updatedAt
      }
    }
  `);

  const theme = useTheme();
  const matchUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [text, setText] = useState("Copy");
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <HomeContainer>
        <Box
          sx={{
            pt: 8,
            pb: 8,
          }}
        >
          <Stack gap={2}>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Offer $20, Get $20
            </Typography>
            <Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Balance sharing is caring.
                <br /> Give your friends $20 to spend and get $20 after they
                purchase
              </Typography>
            </Stack>
          </Stack>
          <Stack
            flexDirection={matchUpMd ? "row" : "column"}
            gap={6}
            sx={{
              pt: 6.5,
            }}
          >
            <Box
              flex={1}
              sx={{
                background:
                  "linear-gradient(116.41deg, rgba(103, 103, 103, 0.35) -56.52%, rgba(45, 37, 58, 0.35) 130.2%)",
                boxShadow: "0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)",
                backdropFilter: "blur(42.5447px)",
                borderRadius: 3.5,
                px: matchUpSm ? 4 : 2,
                py: 3.5,
              }}
            >
              <Stack
                flexDirection={matchUpMd ? "row" : "column"}
                justifyContent="space-between"
                alignItems={matchUpMd ? "center" : "flex-start"}
                gap={matchUpMd ? 4 : 1}
                sx={{
                  background: "rgba(198, 155, 255, 0.22)",
                  boxShadow: "0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)",
                  backdropFilter: "blur(42.5447px)",
                  borderRadius: 3.5,
                  px: matchUpSm ? 3.5 : 2,
                  py: 2,
                }}
              >
                <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
                  Your account balance
                </Typography>
                <Typography variant="h3">$0.00</Typography>
              </Stack>
              <Box sx={{ p: matchUpSm ? 3.5 : 2 }}>
                <Typography color="text.secondary">
                  ! Your credits will be directly applied on any purchase.
                </Typography>
              </Box>
            </Box>
            <Stack
              flex={1}
              gap={6}
              sx={{
                background:
                  "linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%)",
                boxShadow: "0px 16px 40px rgba(175, 89, 206, 0.33)",
                borderRadius: 3.5,
                px: matchUpMd ? 6.5 : matchUpSm ? 4 : 2,
                py: matchUpMd ? 7.5 : 4,
              }}
            >
              <Typography variant="h4">Share your referral link</Typography>
              <Stack gap={1}>
                <Typography variant="caption">
                  Your unique sharing link
                </Typography>
                <Stack flexDirection={matchUpMd ? "row" : "column"} gap={2}>
                  <OutlinedInput
                    fullWidth
                    value={`pandora.fr/code=${data?.me?.referralCode}`}
                    disabled
                    // size="small"
                  />
                  <Stack flexDirection="row">
                    <CopyToClipboard
                      text={`pandora.fr/code=${data?.me?.referralCode}`}
                      onCopy={() => setText("Copied")}
                    >
                      <Button
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                          borderRadius: 2,
                          py: 1.5,
                          px: 4,
                        }}
                      >
                        {text}
                      </Button>
                    </CopyToClipboard>
                  </Stack>
                </Stack>
              </Stack>
              {/* <Stack gap={3}>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  Share on Social Networks
                </Typography>
                <Stack flexDirection="row" gap={matchUpSm ? 5 : 2}>
                  <Stack flexDirection="row">
                    <Box component="img" src="/images/linkedin.png" />
                  </Stack>
                  <Stack flexDirection="row">
                    <Box component="img" src="/images/twitter.png" />
                  </Stack>
                  <Stack flexDirection="row">
                    <Box component="img" src="/images/instagram.png" />
                  </Stack>
                </Stack>
              </Stack> */}
            </Stack>
          </Stack>
        </Box>
      </HomeContainer>
      <PricingPattern />
    </Box>
  );
};

Referral.layout = Layout;

export default Referral;
