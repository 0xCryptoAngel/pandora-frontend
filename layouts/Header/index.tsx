import React, { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  OutlinedInput,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GET_ME } from "../../gql/user";
import { GET_CATEGORIES } from "../../gql/categories";

type HeaderProps = {
  title: string;
  href: string;
};

type DataProps = {
  categories: CategoryProps[];
};

type CategoryProps = {
  createdAt: string;
  deleted: any;
  imageUrl: string;
  name: string;
  updatedAt: string;
  __typename: string;
  _id: string;
};

const headers = [
  {
    title: "Explore",
    href: "/deals",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Affiliation",
    href: "/affiliation",
  },
  {
    title: "Blog",
    href: "/blogs",
  },
];

export default function Header() {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const router = useRouter();
  const { c } = router.query;
  const [data, setData] = useState<DataProps>();

  const [categories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (res) => {
      if (res) {
        setData(res);
      }
    },
  });
  const { data: user } = useQuery(GET_ME);

  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [userProfile, setUserProfile] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserProfile(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setUserProfile(null);
  };

  useEffect(() => {
    categories();
  }, [categories]);
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.background.default,
        backgroundImage: "none",
        boxShadow: "none",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          gap: matchUpMd ? 5 : 3,
          justifyContent: "space-between",
          alignItems: "center",
          px: matchUpMd ? 9 : matchUpSm ? 5 : 2,
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={2}
          onClick={() => router.push("/")}
          sx={{
            cursor: "pointer",
          }}
        >
          <Stack>
            <Box component="img" src="/images/logo.png" />
          </Stack>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Roboto",
              fontWeight: 700,
              display: matchUpSm ? "block" : "none",
            }}
          >
            Pandora
          </Typography>
        </Stack>
        <OutlinedInput
          size="small"
          fullWidth
          startAdornment={<SearchIcon />}
          placeholder="Search by deal..."
          sx={{
            gap: 2,
            fontWeight: 300,
            bgcolor: "#222129",
            "& input::placeholder": {
              fontStyle: "italic",
            },
          }}
        />
        {matchUpMd ? (
          <>
            {headers.map((item: HeaderProps, key: number) => (
              <Link key={key} href={item?.href?.toLowerCase()}>
                <Typography
                  color="text.secondary"
                  sx={{
                    // color: '#F1F2F2',
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {item?.title}
                </Typography>
              </Link>
            ))}
            {!session ? (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    px: 4,
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    px: 4,
                    whiteSpace: "nowrap",
                    background:
                      "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                  }}
                  onClick={() => router.push("/register")}
                >
                  Join us
                </Button>
              </>
            ) : (
              <Stack
                flexDirection="row"
                alignItems="center"
                onClick={handleOpenMenu}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Avatar />
                <ExpandMoreIcon />
              </Stack>
            )}
          </>
        ) : (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenUserMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Menu
          sx={{
            "& .MuiPaper-root": {
              background: "rgba(38, 38, 38, 0.84)",
              backdropFilter: "blur(10px)",
              borderRadius: 3.5,
              border: "3px solid #68627c",
              top: "60px !important",
              "& .MuiList-root": {
                py: 0,
              },
            },
          }}
          id="menu-app"
          anchorEl={userProfile}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(userProfile)}
          onClose={handleCloseMenu}
        >
          <Box
            sx={{
              background:
                "linear-gradient(116.41deg, rgba(103, 103, 103, 0.5) -56.52%, rgba(45, 37, 58, 0.5) 130.2%)",
              boxShadow: "0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)",
              backdropFilter: "blur(42.5447px)",
              borderRadius: 3.5,
            }}
          >
            <Stack
              gap={3}
              sx={{
                px: 5,
                py: 4,
              }}
            >
              <Stack>
                <Link href="">
                  <Typography variant="body1" sx={{ color: "#C69BFF", pb: 1 }}>
                    {user?.me?.email}
                  </Typography>
                  <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />
                </Link>
              </Stack>
              <Link href="/profile">
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: router.pathname.includes("profile")
                      ? "italic"
                      : "",
                    textDecoration: router.pathname.includes("profile")
                      ? "underline"
                      : "none",
                    color: router.pathname.includes("profile")
                      ? "#E4CFFF"
                      : "inherit",
                    cursor: "pointer",
                    "&:hover": {
                      fontStyle: "italic",
                      textDecoration: "underline",
                    },
                  }}
                >
                  View Profile
                </Typography>
              </Link>
              <Link href="/referral">
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: router.pathname.includes("referral")
                      ? "italic"
                      : "",
                    textDecoration: router.pathname.includes("referral")
                      ? "underline"
                      : "none",
                    color: router.pathname.includes("referral")
                      ? "#E4CFFF"
                      : "inherit",
                    cursor: "pointer",
                    "&:hover": {
                      fontStyle: "italic",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Referral
                </Typography>
              </Link>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    fontStyle: "italic",
                    textDecoration: "underline",
                    color: "#E4CFFF",
                  },
                }}
                onClick={() => signOut()}
              >
                Logout
              </Typography>
            </Stack>
          </Box>
        </Menu>
        <Menu
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              background: "rgba(38, 38, 38, 0.84)",
              backdropFilter: "blur(10px)",
              minHeight: "100vh",
              maxWidth: "100%",
              maxHeight: "100%",
              top: "0 !important",
              left: "0 !important",
              p: 4,
              px: matchUpSm ? 4 : 2,
            },
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack flexDirection="row">
              <Box component="img" src="/images/logo.png" />
            </Stack>
            <CloseIcon
              onClick={handleCloseUserMenu}
              sx={{
                fontSize: 32,
                cursor: "pointer",
              }}
            />
          </Stack>
          <Stack
            flexDirection="row"
            sx={{
              pt: 16,
            }}
          >
            <Stack flex={1} gap={5}>
              {headers.map((ele: HeaderProps, key: number) => (
                <Typography
                  variant="subtitle1"
                  key={key}
                  onClick={() => {
                    handleCloseUserMenu();
                    router.push("/" + ele?.href?.toLowerCase());
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {ele.title}
                </Typography>
              ))}
            </Stack>
            <Stack flex={1}>
              <Typography variant="subtitle1" sx={{ color: "#8E55FF" }}>
                Categories
              </Typography>
              <Stack flexDirection="row" gap={3}>
                <Divider orientation="vertical" flexItem />
                <Stack gap={4}>
                  {data?.categories?.map((item: any, key: number) => (
                    <Typography
                      key={key}
                      variant="caption"
                      onClick={() => {
                        handleCloseUserMenu();
                        router.push("/deals?c=" + item?._id);
                      }}
                      sx={{
                        cursor: "pointer",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        textDecoration: c === item?._id ? "underline" : "none",
                        color: c === item?._id ? "#b075ff" : "text.secondary",
                      }}
                    >
                      {item?.name}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            flexDirection="row"
            gap={matchUpSm ? 4 : 2}
            sx={{
              pt: 25,
            }}
          >
            {!session ? (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    px: 4,
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handleCloseUserMenu();
                    router.push("/login");
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    px: 4,
                    whiteSpace: "nowrap",
                    background:
                      "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                  }}
                  onClick={() => {
                    handleCloseUserMenu();
                    router.push("/register");
                  }}
                >
                  Join us
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    px: 4,
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handleCloseUserMenu();
                    router.push("/profile");
                  }}
                >
                  Profile
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    px: 4,
                    whiteSpace: "nowrap",
                    background:
                      "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                  }}
                  onClick={() => {
                    handleCloseUserMenu();
                    signOut();
                  }}
                >
                  Log out
                </Button>
              </>
            )}
          </Stack>
        </Menu>
      </Toolbar>
      <Divider />
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: "rgba(0,0,0,0.26)",
          display: {
            md: "flex",
            xs: "none",
          },
          px: 9,
          py: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#FFFFFF",
            fontWeight: 500,
          }}
        >
          Categories:
        </Typography>
        {data?.categories?.map((item: any, key: number) => (
          <Link key={key} href={`/deals?c=${item?._id}`}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontFamily: "Roboto",
                fontWeight: 500,
                textTransform: "uppercase",
                textDecoration: c === item?._id ? "underline" : "none",
                color: c === item?._id ? "#b075ff" : "text.secondary",
                "&:hover": {
                  transform: "scaleX(1.1)",
                },
              }}
            >
              {item?.name}
            </Typography>
          </Link>
        ))}
      </Stack>
    </AppBar>
  );
}
