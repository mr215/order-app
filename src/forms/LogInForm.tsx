import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonItem,
  IonLabel,
} from '@ionic/react'

import * as Yup from 'yup'

import { User, LogInFormValues } from 'types'
import FormikInput from './fields/FormikInput'

interface LogInFormProps {
  user: User
  onSubmit: (values: LogInFormValues) => void
}

const LogInForm: React.FC<LogInFormProps & FormikProps<LogInFormValues>> = ({
  isValid,
  submitForm,
}) => {
  return (
    <>
      <IonContent>
        <Field
          name="email"
          component={FormikInput}
          type="text"
          label="Email Address"
          required
        />

        <Field
          name="password"
          component={FormikInput}
          type="text"
          label="Password"
          required
        />

        <IonItem>
          New to SupplyHound?
          <IonItem routerLink="/new">
            <IonLabel> Sign Up </IonLabel>
          </IonItem>
        </IonItem>

        <IonFooter className="ion-padding ion-no-border">
          <IonButton expand="block" disabled={!isValid} onClick={submitForm}>
            Log In
          </IonButton>
        </IonFooter>
      </IonContent>
    </>
  )
}

export default withFormik<LogInFormProps, LogInFormValues>({
  displayName: 'LogInForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required'),
  }),

  mapPropsToValues({ user }: LogInFormProps): LogInFormValues {
    return user as LogInFormValues
  },

  handleSubmit(
    values: LogInFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<LogInFormProps, LogInFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(LogInForm)
