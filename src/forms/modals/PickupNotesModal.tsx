import React, { memo } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { IonContent, IonHeader, IonModal } from '@ionic/react'

import FooterWithButton from 'components/FooterWithButton'

import FormikTextarea from '../fields/FormikTextarea'
import FormikDatetime from '../fields/FormikDatetime'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ModalTitle = styled.h1`
  text-align: center;
  margin: 1rem 0;
`

const PickupNotesModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
    <IonHeader>
      <ModalTitle>Pickup Notes</ModalTitle>
    </IonHeader>

    <IonContent>
      <Field
        name="pickup_note"
        component={FormikTextarea}
        label="Pickup Note"
        placeholder="For example: Go to tool counter in back. Picking up compressor, replacement hose and 3 boxes of nails."
        rows={4}
      />

      <Field
        name="pickup_datetime"
        component={FormikDatetime}
        label="Ready For Pickup By"
        placeholder="Enter ready for pickup time"
      />
    </IonContent>

    <FooterWithButton onClick={onClose}>Save</FooterWithButton>
  </IonModal>
)

export default memo<Props>(
  PickupNotesModal,
  (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen
)
