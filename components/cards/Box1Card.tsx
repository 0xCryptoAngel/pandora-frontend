import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type BoxCardProps = {
  top: string | number | undefined;
  bottom: string | number | undefined;
  left: string | number | undefined;
  right: string | number | undefined;
  title: string;
  content: string;
  move: string;
};

export default function BoxCard({
  top = "inherit",
  bottom = "inherit",
  left = "inherit",
  right = "inherit",
  title,
  content,
  move,
}: BoxCardProps) {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        position: "absolute",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        borderRadius: 3.5,
        animation: `${move} 10s linear infinite`,
        zIndex: 1,
      }}
    >
      <Stack
        flexDirection="row"
        sx={{
          p: 3,
          background:
            "linear-gradient(111.21deg, rgba(47, 184, 255, 0.44) 2.43%, rgba(134, 214, 255, 0.33) 55.25%, rgba(255, 255, 255, 0.165) 104.27%)",
          boxShadow: "0px 1.43386px 35.8464px rgba(69, 42, 124, 0.1)",
          backdropFilter: "blur(41.9396px)",
          borderRadius: 3.5,
          border: "4px solid #fff",
        }}
      >
        <Stack
          flexDirection="row"
          sx={{
            background:
              "linear-gradient(153deg, #BCDFFF 1.05%, #42A4FF 48.78%, #2F4B64 100%)",
            // opacity: 0.25,
            boxShadow: "-2px 3px 10px rgba(0, 0, 0, 0.09)",
            borderRadius: 4,
            py: 0.25,
            px: 0.5,
            position: "absolute",
            left: -40,
            top: -64,
          }}
        >
          <Stack
            flexDirection="row"
            sx={{
              py: 0.5,
              px: 1.5,
              bgcolor: "#fff",
              borderRadius: 4,
            }}
          >
            <Box
              component="img"
              src={"/images/boxes/2.png"}
              sx={{ width: "100%", height: "100%" }}
            />
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1">Offering 10-30% De Discount</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
