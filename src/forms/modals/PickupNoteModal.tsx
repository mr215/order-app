import React, { memo } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { IonContent, IonHeader, IonModal } from '@ionic/react'
import { formatISO } from 'date-fns'

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

const TODAY = formatISO(new Date(), { representation: 'date' })

const PickupNoteModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
    <IonHeader>
      <ModalTitle>Pickup Note</ModalTitle>
    </IonHeader>

    <IonContent>
      <Field
        name="pickupNote.note"
        component={FormikTextarea}
        label="Pickup Note"
        placeholder="For example: Go to tool counter in back. Picking up compressor, replacement hose and 3 boxes of nails."
        rows={4}
      />

      <Field
        name="pickupNote.readyForPickupBy"
        component={FormikDatetime}
        label="Ready For Pickup By"
        placeholder="Enter ready for pickup time"
        min={TODAY}
        displayFormat="DDD MMM D h:mm A"
        minuteValues={[0, 15, 30, 45]}
      />
    </IonContent>

    <FooterWithButton onClick={onClose}>Save</FooterWithButton>
  </IonModal>
)

export default memo<Props>(
  PickupNoteModal,
  (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen
)
