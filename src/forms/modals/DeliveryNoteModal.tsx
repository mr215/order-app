import React, { memo } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
} from '@ionic/react'
import { titleCase } from 'utils/formatters'

import FormikTextarea from '../fields/FormikTextarea'
import FormikInput from '../fields/FormikInput'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ModalTitle = styled.h1`
  text-align: center;
  margin: 1rem 0;
`

const DeliveryNoteModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
    <IonHeader>
      <ModalTitle>Delivery Note</ModalTitle>
    </IonHeader>

    <IonContent>
      <Field
        name="deliveryNote.contact"
        component={FormikInput}
        type="text"
        label="Contact Name"
        placeholder="Enter contact's name"
        formatter={titleCase}
      />

      <Field
        name="deliveryNote.phone"
        component={FormikInput}
        type="tel"
        label="Contact Phone Number"
        placeholder="Enter contact's phone number"
        mask="(999)-999-9999"
      />

      <Field
        name="deliveryNote.note"
        component={FormikTextarea}
        label="Delivery Note"
        placeholder="For example: Call when 30 minutes out. Go to back of building."
        rows={4}
      />
    </IonContent>

    <IonFooter mode="ios" className="ion-padding">
      <IonButton expand="block" onClick={onClose}>
        Save
      </IonButton>
    </IonFooter>
  </IonModal>
)

export default memo<Props>(
  DeliveryNoteModal,
  (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen
)
