import React from 'react'
import styled from 'styled-components'
import { IonItemDivider, IonLabel, IonText } from '@ionic/react'

interface Props {
  label: string
  required?: boolean
  error?: string
}

const StyledItemDivider = styled(IonItemDivider)`
  --padding-top: 1rem;
  --padding-bottom: 0.25rem;
`

const FieldLabel = styled(IonLabel)`
  font-size: 1rem;
  line-height: 1.25;
  white-space: normal !important;
`

const ErrorLabel = styled(IonLabel)`
  --color: var(--ion-color-danger) !important;

  margin-left: 0.5rem;
`

const FieldHeader: React.FC<Props> = ({
  label,
  required = false,
  error = '',
}: Props) => {
  return (
    <StyledItemDivider mode="ios">
      <FieldLabel>
        {label}
        {required && <IonText color="danger">*</IonText>}
      </FieldLabel>

      {error && <ErrorLabel>{error}</ErrorLabel>}
    </StyledItemDivider>
  )
}

export default FieldHeader
