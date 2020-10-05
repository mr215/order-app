import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonContent, IonLoading, IonText } from '@ionic/react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { LandingFormValues } from 'types'
import FooterWithButton from 'components/FooterWithButton'

import FormikInput from './fields/FormikInput'

interface LandingFormProps {
  user: LandingFormValues
  onSubmit: (values: LandingFormValues) => void
}

const TitleContainer = styled(IonText)`
  text-align: center;
`

const LandingForm: React.FC<
  LandingFormProps & FormikProps<LandingFormValues>
> = ({ isValid, isSubmitting, submitForm }) => {
  return (
    <>
      <IonContent>
        <IonLoading isOpen={isSubmitting} />

        <TitleContainer>
          <h2>Welcome to SupplyHound!</h2>
          <p>Please enter your email to log in.</p>
        </TitleContainer>

        <Field
          name="email"
          component={FormikInput}
          type="text"
          label="Email Address"
          placeholder="Email Address"
          required
        />
      </IonContent>

      <FooterWithButton disabled={!isValid} onClick={submitForm}>
        Continue
      </FooterWithButton>
    </>
  )
}

export default withFormik<LandingFormProps, LandingFormValues>({
  displayName: 'LandingForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  }),

  mapPropsToValues({ user }: LandingFormProps): LandingFormValues {
    return user
  },

  async handleSubmit(
    values: LandingFormValues,
    { props: { onSubmit } }: FormikBag<LandingFormProps, LandingFormValues>
  ) {
    await onSubmit(values)
  },
})(LandingForm)
