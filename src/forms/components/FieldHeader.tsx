import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { IonItemDivider, IonLabel, IonText } from '@ionic/react'

interface Props {
  label: ReactNode
  required?: boolean
  error?: string
  extraHeader?: ReactNode
}

const StyledItemDivider = styled(IonItemDivider)`
  --padding-top: 0.75rem;
  --padding-bottom: 0.75rem;
`

const ErrorLabel = styled(IonLabel)`
  --color: var(--ion-color-danger) !important;

  margin-left: 0.5rem;
`

const FieldHeader: React.FC<Props> = ({
  label,
  required = false,
  error = '',
  extraHeader,
}: Props) => {
  return (
    <StyledItemDivider mode="ios">
      <IonLabel>
        {label}
        {required && <IonText color="danger">*</IonText>}
      </IonLabel>

      {extraHeader}

      {error && <ErrorLabel>{error}</ErrorLabel>}
    </StyledItemDivider>
  )
}

export default FieldHeader
