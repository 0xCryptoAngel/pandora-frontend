import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";

type AffiliateCardProps = {
  img: string;
  title: string;
  content: string;
};

export default function AffiliateCard({
  img,
  title,
  content,
}: AffiliateCardProps) {
  const theme = useTheme();
  const router = useRouter();
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Stack
      justifyContent="space-between"
      gap={3}
      sx={{
        background:
          "linear-gradient(116.41deg, rgba(103, 103, 103, 0.5) -56.52%, rgba(45, 37, 58, 0.5) 130.2%)",
        boxShadow: "0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)",
        backdropFilter: "blur(42.5447px)",
        borderRadius: 3.5,
        px: matchUpSm ? 4 : 2,
        pt: 6,
        pb: 5,
      }}
    >
      {/* <AttachMoneyIcon /> */}
      <Stack>
        <Stack flexDirection="row" alignItems="flex-start" sx={{ height: 40 }}>
          <Box component="img" src={img} />
        </Stack>
        <Box sx={{ pt: 3.5 }}>
          <Typography
            variant="subtitle1"
            sx={{ maxWidth: 260, lineHeight: 1.2 }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ pt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            {content}
          </Typography>
        </Box>
      </Stack>
      <Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            px: 4.5,
            py: 1.5,
            lineHeight: 1,
          }}
          onClick={() => router.push("/referral")}
        >
          Learn more
        </Button>
      </Box>
    </Stack>
  );
}
