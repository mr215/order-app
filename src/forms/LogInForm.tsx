import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent, IonFooter, IonItemDivider } from '@ionic/react'

import * as Yup from 'yup'

import { User, LogInFormValues } from 'types'
import FormikInput from './fields/FormikInput'

interface LogInFormProps {
  user: User
  onSubmit: (values: LogInFormValues) => void
} 

const LogInForm: React.FC<LogInFormProps & FormikProps<LogInFormValues>> = ({ isValid, submitForm }) => {
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

        <IonItemDivider>
          <p>
            New to SupplyHound? Sign up
          </p>
        </IonItemDivider>

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
  displayName: 'SignUpForm',
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
