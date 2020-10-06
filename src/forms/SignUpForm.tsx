import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import {
  IonContent,
  IonItem,
  IonLabel,
  IonLoading,
  IonText,
} from '@ionic/react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { User, SignUpFormValues } from 'types'
import { titleCase } from 'utils/formatters'
import FooterWithButton from 'components/FooterWithButton'

import FormikInput from './fields/FormikInput'
import FormikCheckbox from './fields/FormikCheckbox'

interface SignUpFormProps {
  user: User
  onSubmit: (values: User) => Promise<void>
}

const TitleContainer = styled(IonText)`
  text-align: center;
`

const SignUpForm: React.FC<SignUpFormProps & FormikProps<SignUpFormValues>> = ({
  isValid,
  isSubmitting,
  submitForm,
}) => {
  return (
    <>
      <IonContent>
        <IonLoading isOpen={isSubmitting} />

        <TitleContainer>
          <h2>Sign Up</h2>
          <p>Please enter your info below to get started.</p>
        </TitleContainer>

        <Field
          name="first_name"
          component={FormikInput}
          type="text"
          label="First Name"
          placeholder="Enter first name here"
          formatter={titleCase}
          required
        />

        <Field
          name="last_name"
          component={FormikInput}
          type="text"
          label="Last Name"
          placeholder="Enter last name here"
          formatter={titleCase}
          required
        />

        <Field
          name="email"
          component={FormikInput}
          type="text"
          label="Email Address"
          placeholder="Enter email address here"
          required
        />

        <Field
          name="phone"
          component={FormikInput}
          type="tel"
          label="Phone Number"
          placeholder="Enter your mobile number here"
          mask="(999)-999-9999"
          required
        />

        {/* <Field
          name="companyName"
          component={FormikInput}
          type="text"
          label="Company Name"
          placeholder="Enter your company name here"
          formatter={titleCase}
          required
        /> */}

        {/* <Field
          name="accountingEmail"
          component={FormikInput}
          type="text"
          label="Accounting Email"
          placeholder="Enter where receipts should be sent"
          required
        /> */}

        <Field
          name="password"
          component={FormikInput}
          type="password"
          label="Password"
          placeholder="Enter password here"
          required
        />

        <Field
          name="agreeTerms"
          component={FormikCheckbox}
          label={
            <>
              I authorize Supply Hound, Inc. to pickup and deliver the items
              specified by my use of this service. See <a href="#">Privacy</a>{' '}
              and <a href="#">Terms</a>
            </>
          }
          slot="start"
          required
        />

        <IonItem>
          Already have an account?
          <IonItem routerLink="/login">
            <IonLabel> Log In </IonLabel>
          </IonItem>
        </IonItem>
      </IonContent>

      <FooterWithButton disabled={!isValid} onClick={submitForm}>
        Sign Up
      </FooterWithButton>
    </>
  )
}

export default withFormik<SignUpFormProps, SignUpFormValues>({
  displayName: 'SignUpForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    // companyName: Yup.string().required('Required'),
    // accountingEmail: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    agreeTerms: Yup.boolean().required().oneOf([true], 'Required'),
  }),

  mapPropsToValues({ user }: SignUpFormProps): SignUpFormValues {
    return { ...user, agreeTerms: false }
  },

  async handleSubmit(
    { agreeTerms, ...values }: SignUpFormValues,
    { props: { onSubmit } }: FormikBag<SignUpFormProps, SignUpFormValues>
  ) {
    await onSubmit(values)
  },
})(SignUpForm)
