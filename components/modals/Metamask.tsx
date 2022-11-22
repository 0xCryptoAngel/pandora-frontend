import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, Stack, Typography, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWeb3React } from "@web3-react/core";
import { isBrowser, isMobile } from "react-device-detect";
import { injected, walletconnect } from "../../connectors";
import Fails from "./Fails";
import Confirmation from "./Confirmation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 454,
  background:
    "linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%)",
  boxShadow: "0px 16px 40px rgba(175, 89, 206, 0.33)",
  borderRadius: 3.5,
  p: 0.5,
};

type MetamaskProps = {
  open: boolean;
  handleClose: any;
  data: any;
};

declare const window: any;

export default function Metamask({ open, handleClose, data }: MetamaskProps) {
  const { activate, account } = useWeb3React();

  const [failsOpen, setFailsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const failsHandleOpen = () => setFailsOpen(true);
  const failsHandleClose = () => setFailsOpen(false);

  const confirmHandleOpen = () => setConfirmOpen(true);
  const confirmHandleClose = () => setConfirmOpen(false);

  const connect = async () => {
    if (IsInitialEnabled()) {
      try {
        await activate(injected);
        handleClose();
        failsHandleOpen();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const IsInitialEnabled = () => {
    if (isBrowser) {
      if (typeof window?.ethereum !== "undefined") {
        return true;
      }
    }

    console.error("Please install metamask extension first");
    window.location.href = "https://metamask.io/download/";

    return false;
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          background: "rgba(38, 38, 38, 0.51)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Stack sx={style}>
          <Stack
            sx={{
              position: "absolute",
              right: -10,
              top: -10,
              bgcolor: "#F2F7F6",
              borderRadius: "50%",
              p: 0.5,
            }}
          >
            <CloseIcon
              fontSize="small"
              sx={{
                color: "#555DC2",
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
          </Stack>
          <Stack
            alignItems="center"
            gap={4.5}
            sx={{
              py: 7,
              background: "rgba(100, 87, 142, 0.31)",
              borderRadius: 2,
            }}
          >
            <Stack sx={{ p: 1.2, bgcolor: "#fff", borderRadius: "50%" }}>
              <Box component="img" src="/images/metamask.png" />
            </Stack>
            <Stack alignItems="center" gap={2} sx={{ maxWidth: 350 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                You have to own a Bored Apes to redeem this offer
              </Typography>
              <Typography
                variant="caption"
                sx={{ textAlign: "center", maxWidth: 306, fontWeight: 400 }}
              >
                Please connect your wallet so we verify you own this NFT so you
                can get access the deal.
              </Typography>
            </Stack>
            <Stack flexDirection="row" justifyContent="center" gap={3}>
              <Button
                onClick={connect}
                size="small"
                sx={{
                  background:
                    "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1,
                }}
              >
                Connect with Metamask
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
      <Fails open={failsOpen} handleClose={failsHandleClose} />
      <Confirmation
        promo={""}
        open={confirmOpen}
        handleClose={confirmHandleClose}
      />
    </>
  );
}
