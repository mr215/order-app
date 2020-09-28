import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import {
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonContent,
  IonFooter,
  IonModal,
} from '@ionic/react'

import * as Yup from 'yup'

import { Location } from 'types'
import { titleCase } from 'utils/formatters'

import FormikInput from './fields/FormikInput'

interface Props {
  location: Location
  onCancel: () => void
  onSubmit: (values: Location) => void
}

const AddLocationModalForm: React.FC<Props & FormikProps<Location>> = ({
  onCancel,
  submitForm,
}) => {
  return (
    <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
      <IonContent>
        <Field
          name="name"
          component={FormikInput}
          type="text"
          label="Name"
          placeholder="Enter name of location"
          formatter={titleCase}
          required
        />

        <Field
          name="address"
          component={FormikInput}
          type="text"
          label="Address"
          placeholder="Enter address of location"
          required
        />
      </IonContent>

      <IonFooter className="ion-padding ion-no-border">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" fill="outline" onClick={onCancel}>
                Cancel
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton expand="block" onClick={submitForm}>
                OK
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonModal>
  )
}

export default withFormik<Props, Location>({
  displayName: 'AddLocationForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
  }),

  mapPropsToValues({ location }: Props): Location {
    return location
  },

  handleSubmit(
    values: Location,
    { props: { onSubmit } }: FormikBag<Props, Location>
  ) {
    onSubmit(values)
  },
})(AddLocationModalForm)
