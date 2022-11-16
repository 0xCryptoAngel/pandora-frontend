import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, Stack, Typography, Modal } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { REDEEM_OFFER } from "../../gql/deals";
import Metamask from "./Metamask";
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

type GetDetailProps = {
  open: boolean;
  handleClose: any;
  data: any;
};

export default function GetDeal({ open, handleClose, data }: GetDetailProps) {
  const [metamaskOpen, setMetamaskOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [redeemOffer] = useMutation(REDEEM_OFFER);

  const matamaskHandleOpen = () => setMetamaskOpen(true);
  const metamaskHandleClose = () => setMetamaskOpen(false);

  const confirmHandleOpen = () => setConfirmOpen(true);
  const confirmHandleClose = () => setConfirmOpen(false);

  const handleDeal = async () => {
    if (data?.deals?.[0]?.type?.kind === "IntroEmail") {
      await redeemOffer({
        variables: {
          collectionFound: "",
          dealId: data?.deals?.[0]?._id,
        },
      });
      handleClose();
      confirmHandleOpen();
    } else if (data?.deals?.[0]?.type?.kind === "PromoCode") {
      const { data: promo } = await redeemOffer({
        variables: {
          collectionFound: "",
          dealId: data?.deals?.[0]?._id,
        },
      });
      setPromoCode(promo?.redeemOffer?.promoCode);
      handleClose();
      confirmHandleOpen();
    } else if (data?.deals?.[0]?.type?.kind === "Wallet") {
      handleClose();
      matamaskHandleOpen();
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          background: "rgba(38, 38, 38, 0.31)",
          backdropFilter: "blur(10px)",
          px: 3,
        }}
      >
        <Stack sx={style}>
          <Stack
            alignItems="center"
            gap={8}
            sx={{
              py: 7,
              px: 2,
              background: "rgba(100, 87, 142, 0.31)",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Roboto",
                fontWeight: 600,
                textAlign: "center",
                maxWidth: 360,
              }}
            >
              Do you confirm you wish to get access to this deal ?
            </Typography>
            <Stack flexDirection="row" justifyContent="center" gap={3}>
              <Button
                onClick={() => handleClose()}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1,
                }}
              >
                No
              </Button>
              <Button
                onClick={handleDeal}
                size="small"
                sx={{
                  background:
                    "linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)",
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1,
                }}
              >
                Yes
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
      <Metamask
        data={data}
        open={metamaskOpen}
        handleClose={metamaskHandleClose}
      />
      <Confirmation
        promo={promoCode}
        open={confirmOpen}
        handleClose={confirmHandleClose}
      />
    </>
  );
}
