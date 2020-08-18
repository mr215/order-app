import styled from 'styled-components'
import { IonLabel } from '@ionic/react'

const ErrorLabel = styled(IonLabel)`
  --color: var(--ion-color-danger) !important;

  font-size: 0.75rem !important;
  margin-left: 1rem;
`

export default ErrorLabel
