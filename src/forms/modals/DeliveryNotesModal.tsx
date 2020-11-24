import React, { memo } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { IonContent, IonHeader, IonModal } from '@ionic/react'
import { titleCase } from 'utils/formatters'

import FooterWithButton from 'components/FooterWithButton'

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

const DeliveryNotesModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
    <IonHeader>
      <ModalTitle>Delivery Notes</ModalTitle>
    </IonHeader>

    <IonContent>
      <Field
        name="delivery_username"
        component={FormikInput}
        type="text"
        label="Contact Name"
        placeholder="Enter contact's name"
        formatter={titleCase}
      />

      <Field
        name="delivery_phone"
        component={FormikInput}
        type="tel"
        label="Contact Phone Number"
        placeholder="Enter contact's phone number"
        mask="(999)-999-9999"
      />

      <Field
        name="delivery_note"
        component={FormikTextarea}
        label="Delivery Note"
        placeholder="For example: Call when 30 minutes out. Go to back of building."
        rows={4}
      />
    </IonContent>

    <FooterWithButton onClick={onClose}>Save</FooterWithButton>
  </IonModal>
)

export default memo<Props>(
  DeliveryNotesModal,
  (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen
)
