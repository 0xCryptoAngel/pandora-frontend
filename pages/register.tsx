import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { gql, useMutation } from "@apollo/client";
import HomeContainer from "../components/containers/HomeContainer";
import { clients, invests } from "../constants/content";
import ClientCard from "../components/cards/ClientCard";
import WarningIcon from "@mui/icons-material/Warning";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import DetailPattern from "../components/patterns/DetailPattern";
import Layout from "../layouts";
import { useSession } from "next-auth/react";
import { CREATE_USER } from "../gql/user";
import { signIn } from "next-auth/react";

const Register = () => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.error(err);
      setEmailErrorShow(true);
      setPasswordErrorShow(true);
    },
  });
  const matchUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [privacy, setPrivacy] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [emailErrorTitle, setEmailErrorTitle] = React.useState(
    "Please enter a valid email address"
  );
  const [passwordErrorTitle, setPasswordErrorTitle] = React.useState(
    "Please enter a valid password"
  );
  const [emailErrorShow, setEmailErrorShow] = React.useState(false);
  const [passwordErrorShow, setPasswordErrorShow] = React.useState(false);

  const accept = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy(event.target.checked);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const register = async (event: any) => {
    event.preventDefault();

    if (!email) {
      setEmailErrorShow(true);
      return;
    }

    if (!password) {
      setPasswordErrorShow(true);
      return;
    }

    const response = await createUser({
      variables: {
        email: email,
        password: password,
      },
    });

    if (!response?.errors) {
      const response = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/profile",
        email: email,
        password: password,
      });
    }
  };

  React.useEffect(() => {
    if (session?.user) {
      router.push("/profile");
    }
  }, [session?.user]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HomeContainer>
        <Box sx={{ pt: 12, pb: 25 }}>
          <Stack
            flexDirection={matchUpMd ? "row" : "column"}
            justifyContent="space-between"
            gap={matchUpMd ? 5 : 8}
          >
            <Stack flex={1} gap={12}>
              <Stack gap={2}>
                <Typography variant="h2">Savings start here.</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: 480 }}
                >
                  Join Secret to access big savings on the best tools to
                  kickstart or grow your business.
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: matchUpMd ? "grid" : "none",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  columnGap: 2.5,
                  rowGap: 3.5,
                }}
              >
                {invests.map((item: any, key: number) => (
                  <Stack
                    key={key}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      height: 120,
                      bgcolor: "#fff",
                      boxShadow: "-2px 3px 10px rgba(0, 0, 0, 0.09)",
                      borderRadius: 3,
                      border: "4px solid #524c56",
                    }}
                  >
                    <Box
                      component="img"
                      src={item}
                      sx={{
                        maxHeight: "100%",
                      }}
                    />
                  </Stack>
                ))}
              </Box>
              <Stack gap={4} sx={{ display: matchUpMd ? "flex" : "none" }}>
                <Typography>Trustpilot</Typography>
                <Stack
                  gap={5}
                  sx={{
                    pl: 2,
                    pr: 4,
                  }}
                >
                  {clients.map((ele: any, key: number) => (
                    <ClientCard key={key} {...ele} />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <Stack flexDirection="row" flex={1} justifyContent="flex-end">
              <Box
                component="form"
                onSubmit={register}
                sx={{
                  maxWidth: matchUpMd ? 576 : "100%",
                  width: "100%",
                  background:
                    "linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%);",
                  boxShadow: "0px 16px 40px rgba(175, 89, 206, 0.33)",
                  border: "4px solid #6a5cc4",
                  borderRadius: 3.5,
                }}
              >
                <Stack
                  sx={{
                    pt: 6,
                    px: matchUpMd ? 6.5 : matchUpSm ? 4 : 2,
                    pb: 10,
                  }}
                >
                  <Stack gap={2.5}>
                    <Typography variant="h4">Join us</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        maxWidth: 324,
                      }}
                    >
                      Connect your account with Google (business account
                      preferred) or Linkedin:
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" sx={{ pt: 4 }}>
                    <Button
                      variant="outlined"
                      startIcon={
                        <Stack
                          flexDirection="row"
                          sx={{
                            bgcolor: "#fff",
                            p: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          <GoogleIcon
                            fontSize="small"
                            sx={{ color: "#442950" }}
                          />
                        </Stack>
                      }
                    >
                      <Typography variant="caption">
                        Sign in with Google
                      </Typography>
                    </Button>
                  </Stack>
                  <Stack gap={3.5} sx={{ pt: 6 }}>
                    <Stack gap={0.5}>
                      <Typography variant="caption">
                        Professional email*
                      </Typography>
                      <OutlinedInput
                        fullWidth
                        placeholder="test@email"
                        size="small"
                        value={email}
                        onChange={handleEmail}
                      />
                      {emailErrorShow && (
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                          sx={{
                            color: "#FF6565",
                            pt: 0.5,
                          }}
                        >
                          <WarningIcon fontSize="small" sx={{ fontSize: 16 }} />
                          <Typography variant="caption" sx={{ lineHeight: 1 }}>
                            {emailErrorTitle}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                    <Stack gap={0.5}>
                      <Typography variant="caption">
                        Password (6 characters minimum)*
                      </Typography>
                      <OutlinedInput
                        fullWidth
                        type={show ? "text" : "password"}
                        size="small"
                        value={password}
                        onChange={handlePassword}
                        endAdornment={
                          <Stack
                            onClick={() => setShow(!show)}
                            sx={{
                              cursor: "pointer",
                              color: "rgba(255, 255, 255, 0.63)",
                            }}
                          >
                            {show ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <RemoveRedEyeIcon />
                            )}
                          </Stack>
                        }
                      />
                      {passwordErrorShow && (
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                          sx={{
                            color: "#FF6565",
                            pt: 0.5,
                          }}
                        >
                          <WarningIcon fontSize="small" sx={{ fontSize: 16 }} />
                          <Typography variant="caption" sx={{ lineHeight: 1 }}>
                            {passwordErrorTitle}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    sx={{ pt: 2 }}
                    gap={1}
                  >
                    <Stack flexDirection="row">
                      <Checkbox size="small" sx={{ p: 0 }} />
                    </Stack>
                    <Typography variant="caption" sx={{ lineHeight: 1 }}>
                      I do not want to receive news and promotional information
                      by email
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    gap={1}
                    sx={{ pt: 2, pb: 4 }}
                  >
                    <Stack flexDirection="row">
                      <Checkbox size="small" onChange={accept} sx={{ p: 0 }} />
                    </Stack>
                    <Typography variant="caption">
                      By clicking on the next button you accept our Terms of Use
                      and confirm that you have read our Privacy Policy
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    disabled={!privacy}
                    size="small"
                    type="submit"
                    sx={{
                      background:
                        "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                      borderRadius: 2,
                      py: 1.5,
                    }}
                  >
                    Sign up
                  </Button>
                  <Box sx={{ pt: 5 }}>
                    <Typography variant="caption">
                      Already a member?
                      <Link href="/login">Log in</Link>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>

            <Box
              sx={{
                display: matchUpMd ? "none" : "grid",
                gridTemplateColumns: matchUpMd
                  ? "repeat(4, 1fr)"
                  : matchUpSm
                  ? "repeat(2, 1fr)"
                  : "repeat(1, 1fr)",
                columnGap: 2.5,
                rowGap: 3.5,
              }}
            >
              {invests.map((item: any, key: number) => (
                <Stack
                  key={key}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    height: 120,
                    bgcolor: "#fff",
                    boxShadow: "-2px 3px 10px rgba(0, 0, 0, 0.09)",
                    borderRadius: 3,
                    border: "4px solid #524c56",
                  }}
                >
                  <Box
                    component="img"
                    src={item}
                    sx={{
                      maxHeight: "100%",
                    }}
                  />
                </Stack>
              ))}
            </Box>
            <Stack gap={4} sx={{ display: matchUpMd ? "none" : "flex" }}>
              <Typography>Trustpilot</Typography>
              <Stack
                gap={5}
                sx={{
                  pl: 2,
                  pr: 4,
                }}
              >
                {clients.map((ele: any, key: number) => (
                  <ClientCard key={key} {...ele} />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </HomeContainer>
      <DetailPattern />
    </Box>
  );
};

Register.layout = Layout;

export default Register;
