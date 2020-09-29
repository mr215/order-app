import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { IonItemDivider, IonLabel, IonText } from '@ionic/react'

interface Props {
  label: string
  required?: boolean
  error?: string
  extraHeader?: ReactElement
}

const StyledItemDivider = styled(IonItemDivider)`
  --padding-top: 0.75rem;
  --padding-bottom: 0.75rem;
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
  extraHeader,
}: Props) => {
  return (
    <StyledItemDivider mode="ios">
      <FieldLabel>
        {label}
        {required && <IonText color="danger">*</IonText>}
      </FieldLabel>

      {extraHeader}

      {error && <ErrorLabel>{error}</ErrorLabel>}
    </StyledItemDivider>
  )
}

export default FieldHeader
