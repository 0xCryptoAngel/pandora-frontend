import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";
import TestimonialCard from "../cards/TestimonialCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { features } from "../../constants/content";
import { useTheme } from "@mui/material/styles";
import ReactPlayer from "react-player/youtube";

const item = {
  img: "/images/testimonial/1.png",
  title: "A Real Kickstarter",
  content:
    "AWS Activate's credits have been a HUGE help in these first couple of months since Accomplice’s launch while I'm working to build a solid base of users and MRR. It's one less thing for me to worry about for now, which for a solo founder is an absolute godsend.",
  client: "/images/feedback/clients/1.png",
  clientName: "Daniel",
};
export default function Content({ data }: any) {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box>
      <Stack
        flexDirection={matchUpMd ? "row" : "column"}
        gap={4}
        sx={{ pb: 7 }}
      >
        <Stack
          flexDirection="row"
          gap={2.5}
          sx={{
            background:
              "linear-gradient(156.67deg, rgba(104, 97, 148, 0.248) 0.07%, rgba(35, 23, 97, 0.232) 99.07%)",
            border: "1px solid rgba(230, 230, 230, 0.31)",
            borderRadius: 2,
            py: 2,
            px: matchUpSm ? 4 : 2,
            pr: matchUpSm ? 8 : 2,
          }}
        >
          <TollIcon />
          <Stack>
            <Typography>
              {data.amountSaved ? data.amountSaved : 0} savings
            </Typography>
            <Typography variant="caption" color="text.secondary">
              On your {data.companyName} subscription
            </Typography>
          </Stack>
        </Stack>
        <Stack
          flexDirection="row"
          gap={2.5}
          sx={{
            background:
              "linear-gradient(156.67deg, rgba(104, 97, 148, 0.248) 0.07%, rgba(35, 23, 97, 0.232) 99.07%)",
            border: "1px solid rgba(230, 230, 230, 0.31)",
            borderRadius: 2,
            py: 2,
            px: matchUpSm ? 4 : 2,
            pr: matchUpSm ? 8 : 2,
          }}
        >
          <TollIcon />
          <Stack>
            <Typography>
              Redeemed {data.redeemedAmount ? data.redeemedAmount : 0} times
            </Typography>
            <Typography variant="caption" color="text.secondary">
              in the last 90 days
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* <Box
                sx={{
                    border: '1px solid rgba(230, 230, 230, 0.31)',
                    borderRadius: 2
                }}
            >
                <Stack
                    gap={3}
                    sx={{
                        px: matchUpSm ? 6 : 2,
                        py: 5,
                        pb: 7
                    }}
                >
                    <Typography variant="caption" color="text.secondary">Secret's take about AWS Activate</Typography>
                    <Typography>
                        Cloud computing: a concept many are familiar with but one that provokes many questions: Where is this cloud, does the weather forecast affect it, does it rain if you exceed the limits? 
                        Probably not the most important questions but everyone wants to know... well at least 1 person...
                    </Typography>
                    <Typography>
                        Cloud computing: a concept many are familiar with but one that provokes many questions: Where is this cloud, does the weather forecast affect it, does it rain if you exceed the limits? 
                        Probably not the most important questions but everyone wants to know... well at least 1 person...
                    </Typography>
                </Stack>
                <Stack
                    flexDirection="column"
                    sx={{
                        pl: 14,
                        py: 2,
                        background: 'rgba(255, 255, 255, 0.12)',
                        borderRadius: '0px 0px 8px 8px'
                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Mary O'Brien</Typography>
                    <Typography variant="caption">Customer Success Manager</Typography>
                </Stack>
            </Box> */}
      <Stack
        gap={2.5}
        // sx={{ pt: 14 }}
      >
        <Typography variant="h5" sx={{ color: "#C69BFF" }}>
          {data.companyName} promo code: {data.name}
        </Typography>
        <Typography>{data.promoText}</Typography>
      </Stack>
      <Stack gap={2} sx={{ pt: 6 }}>
        <Typography variant="h5" sx={{ color: "#C69BFF" }}>
          General information about {data.companyName}
        </Typography>
        <Typography>{data.companyDesc}</Typography>
        {/* <Typography>
                    Amazon Web Services (AWS) is Amazon's cloud platform where business of all sizes have access to 100+ services to develop and deploy high-performance web and mobile applications: storage, IT security, databases, analytics, tools for developers, IoT, machine learning, AI and many more.
                </Typography>
                <Typography>
                    AWS offers a robust and scalable infrastructure that meets your needs at every stage of your startup's life. Scalability is no longer a concern and you only pay for the services you use.
                </Typography>
                <Typography>
                Interested in AWS Activate? Get $5,000 in AWS credits for 2 years on AWS Activate with our promo code and save up to $5000.</Typography> */}
      </Stack>
      <Stack>
        <Stack
          sx={{
            py: 8,
            "&>div": {
              m: "auto",
            },
          }}
        >
          <ReactPlayer url={data.videoUrl} />
        </Stack>
      </Stack>
      {/* <Box
                sx={{
                    pt: 10
                }}
            >
                <Typography variant="h5" sx={{ color: '#C69BFF' }}>Testimonials about AWS Activate</Typography>
                <Box sx={{ 
                    pt: 5,
                    display: 'grid',
                    gridTemplateColumns: matchUpMd ? 'repeat(2, 1fr)': 'repeat(1, 1fr)',
                    rowGap: 6,
                    columnGap: 5
                }}>
                {[1,2,3,4].map((ele,key) => 
                    <TestimonialCard key={key} {...item} />
                )}
                </Box>
            </Box> */}
      {/* <Stack
                gap={6}
                sx={{
                    pt: 14,
                    pb: 16
                }}
            >
                <Stack gap={2.5}>
                    <Typography variant="h5" sx={{ color: '#C69BFF' }}>AWS Activate Features</Typography>
                    <Typography>Easily develop and deploy applications with AWS.</Typography>
                </Stack>
                <Stack gap={2}>
                {features.map((item, key) => 
                    <Stack 
                        flexDirection="row"
                        key={key}
                        gap={2}
                    >  
                        <CheckCircleOutlineIcon />
                        <Stack gap={.5}>
                            <Typography>{item.title}</Typography>
                            <Typography color="text.secondary">{item.content}</Typography>
                        </Stack>
                    </Stack>
                )}
                </Stack>
                <Typography>Interested in AWS Activate? Get $5,000 in AWS credits for 2 years on AWS Activate with our promo code and save up to $5000.</Typography>
            </Stack> */}
    </Box>
  );
}
