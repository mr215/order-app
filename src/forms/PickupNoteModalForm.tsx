import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
} from '@ionic/react'
import { formatISO } from 'date-fns'

import FormikTextarea from './fields/FormikTextarea'
import FormikDatetime from './fields/FormikDatetime'

interface Props {
  onCancel: () => void
}

const ModalTitle = styled.h1`
  text-align: center;
  margin: 1rem 0;
`

const TODAY = formatISO(new Date(), { representation: 'date' })

const PickupNoteModalForm: React.FC<Props> = ({ onCancel }) => (
  <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
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
        name="pickupNote.readyForPickupTime"
        component={FormikDatetime}
        label="Ready For Pickup At"
        placeholder="Enter ready for pickup time"
        min={TODAY}
        displayFormat="DDD MMM D h:mm A"
        minuteValues={[0, 15, 30, 45]}
      />
    </IonContent>

    <IonFooter mode="ios" className="ion-padding">
      <IonButton expand="block" onClick={onCancel}>
        Save
      </IonButton>
    </IonFooter>
  </IonModal>
)

export default PickupNoteModalForm
