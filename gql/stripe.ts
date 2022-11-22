import { gql } from '@apollo/client';

export const PROCESS_PAYMENT = gql`
  mutation processPayment($paymentMethodId: String!) {
    processPayment(paymentMethodId: $paymentMethodId)
  }
`
