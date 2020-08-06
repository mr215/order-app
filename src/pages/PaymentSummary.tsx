import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

interface PaymentSummaryProps extends RouteComponentProps<any> {}

export default function PaymentSummary(props: PaymentSummaryProps) {
  return (
    <Typography variant="h4" align="center">
      Payment
    </Typography>
  )
}
