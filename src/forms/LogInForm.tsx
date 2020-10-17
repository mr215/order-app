import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonContent, IonLoading, IonRouterLink, IonText } from '@ionic/react'
import * as Yup from 'yup'

import { LogInFormValues } from 'types'
import FooterWithButton from 'components/FooterWithButton'

import FormikInput from './fields/FormikInput'
import AuthFormBottomSection from './components/AuthFormBottomSection'

interface LogInFormProps {
  onSubmit: (values: LogInFormValues) => Promise<void>
}

const LogInForm: React.FC<LogInFormProps & FormikProps<LogInFormValues>> = ({
  isValid,
  isSubmitting,
  submitForm,
}) => {
  return (
    <>
      <IonContent>
        <IonLoading isOpen={isSubmitting} />

        <IonText class="ion-text-center">
          <h2>Log In</h2>
          <p>Please enter your password below to log in.</p>
        </IonText>

        <Field
          name="password"
          component={FormikInput}
          type="password"
          label="Password"
          placeholder="Enter password here"
          required
        />

        <AuthFormBottomSection>
          New to SupplyHound?&nbsp;
          <IonRouterLink routerLink="/signup">Sign Up</IonRouterLink>
        </AuthFormBottomSection>
      </IonContent>

      <FooterWithButton disabled={!isValid} onClick={submitForm}>
        Log In
      </FooterWithButton>
    </>
  )
}

export default withFormik<LogInFormProps, LogInFormValues>({
  displayName: 'LogInForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    password: Yup.string().required('Password is required'),
  }),

  mapPropsToValues(): LogInFormValues {
    return { password: '' }
  },

  async handleSubmit(
    values: LogInFormValues,
    { props: { onSubmit } }: FormikBag<LogInFormProps, LogInFormValues>
  ) {
    await onSubmit(values)
  },
})(LogInForm)
