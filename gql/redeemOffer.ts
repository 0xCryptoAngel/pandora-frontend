import { gql } from '@apollo/client';

export const redeem_offer = gql`
 mutation redeemOffer ($collectionFound: String, $dealId: String!) {
  redeemOffer(collectionFound: $collectionFound, dealId: $dealId) {
    promoCode
  }
 }
`