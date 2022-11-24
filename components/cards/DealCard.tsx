import { Box, Chip, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

export default function DealCard(props: any) {
  const router = useRouter();
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        background:
          "linear-gradient(116.41deg, rgba(103, 103, 103, 0.5) -56.52%, rgba(45, 37, 58, 0.5) 130.2%)",
        boxShadow: "0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)",
        backdropFilter: "blur(42.5447px)",
        borderRadius: 3.5,
        border: `4px solid #594F6D`,
        pt: matchUpSm ? 3.5 : 2,
        pb: matchUpSm ? 3 : 2,
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          background:
            "linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%)",
          boxShadow: "0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)",
          backdropFilter: "blur(42.5447px)",
        },
      }}
      onClick={() => router.push("/deal/" + props?._id)}
    >
      <Stack gap={5} justifyContent="space-between" sx={{ height: "100%" }}>
        <Stack gap={5}>
          <Stack
            flexDirection="row"
            alignItems="flex-start"
            gap={matchUpSm ? 2.5 : 1.5}
            sx={{
              px: matchUpSm ? 3.5 : 2,
            }}
          >
            <Stack
              flexDirection="row"
              sx={{
                background: "#594F6D",
                // opacity: 0.25,
                boxShadow: "-2px 3px 10px rgba(0, 0, 0, 0.09)",
                borderRadius: 3,
                p: 0.375,
              }}
            >
              <Stack
                sx={{
                  width: 70,
                  height: 67,
                  borderRadius: 3,
                  position: "relative",
                  pt: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    background: `url(${props?.companyLogoURL ?? ""})`,
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
              <Typography variant="h5">{props?.companyName}</Typography>
              <Typography variant="caption" color="text.secondary">
                {props?.companyDesc?.length > 70
                  ? props?.companyDesc?.slice(0, 65) + "..."
                  : props?.companyDesc}
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              px: matchUpSm ? 3.5 : 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                "& span": {
                  color: "#C69BFF",
                },
                lineHeight: "30px",
              }}
            >
              {/* <span>6 Months Free </span> plus <br /> 1,000 credits for startups */}
              {props?.name}
            </Typography>
          </Box>
        </Stack>
        <Box>
          <Box
            sx={{
              background: "#594F6D",
              transform: "rotate(-5deg) scale(1.05, 1)",
              py: 2,
            }}
          >
            <Typography
              sx={{
                color: "rgba(219, 201, 255, 0.87)",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1,
                letterSpacing: 1.44,
                fontWeight: 800,
                fontSize: "20px !important",
              }}
            >
              Save Up To $5000
            </Typography>
          </Box>
          <Stack
            flexDirection="row"
            justifyContent="flex-end"
            sx={{
              px: matchUpSm ? 3 : 2,
              pt: 2,
            }}
          >
            <Chip
              label="Agency"
              variant="outlined"
              sx={{
                bgcolor: "#fff",
                color: "#000",
                fontWeight: 700,
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
