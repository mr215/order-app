import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent, IonFooter } from '@ionic/react'

import * as Yup from 'yup'

import { User, LandingFormValues } from 'types'
import FormikInput from './fields/FormikInput'

interface LandingFormProps {
  user: User
  onSubmit: (values: LandingFormValues) => void
}

const LandingForm: React.FC<
  LandingFormProps & FormikProps<LandingFormValues>
> = ({ isValid, submitForm }) => {
  return (
    <>
      <IonContent>
        <Field
          name="email"
          component={FormikInput}
          type="text"
          label="Email Address"
          placeholder="Enter email here"
          required
        />

        <IonFooter className="ion-padding ion-no-border">
          <IonButton expand="block" disabled={!isValid} onClick={submitForm}>
            Continue
          </IonButton>
        </IonFooter>
      </IonContent>
    </>
  )
}

export default withFormik<LandingFormProps, LandingFormValues>({
  displayName: 'LandingForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email address is required'),
  }),

  mapPropsToValues({ user }: LandingFormProps): LandingFormValues {
    return user as LandingFormValues
  },

  handleSubmit(
    values: LandingFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<LandingFormProps, LandingFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(LandingForm)
