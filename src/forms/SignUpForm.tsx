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

import { User, SignUpFormValues } from 'types'
import { titleCase } from 'utils/formatters'

import FormikInput from './fields/FormikInput'
import FormikCheckbox from './fields/FormikCheckbox'

interface SignUpFormProps {
  user: User
  onSubmit: (values: SignUpFormValues) => void
}

const SignUpForm: React.FC<SignUpFormProps & FormikProps<SignUpFormValues>> = ({
  isValid,
  submitForm,
}) => {
  return (
    <>
      <IonContent>
        <Field
          name="firstName"
          component={FormikInput}
          type="text"
          label="First Name"
          placeholder="Enter first name here"
          formatter={titleCase}
          required
        />

        <Field
          name="lastName"
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
          required
        />

        <Field
          name="companyName"
          component={FormikInput}
          type="text"
          label="Company Name"
          placeholder="Enter your company name here"
          formatter={titleCase}
          required
        />

        <Field
          name="accountingEmail"
          component={FormikInput}
          type="text"
          label="Accounting Email"
          placeholder="Enter where receipts should be sent"
          required
        />

        <Field
          name="password"
          component={FormikInput}
          type="text"
          label="Password"
          placeholder="Enter password here"
          required
        />

        <Field
          name="authorize"
          value={false}
          component={FormikCheckbox}
          label="I authorize Supply Hound, Inc. to pickup and deliver the items specified by my use of this service. See Privacy and Terms"
          slot="start"
          required
          item={{
            value: true,
          }}
        />

        <IonItem>
          Already have an account?
          <IonItem routerLink="/login">
            <IonLabel> Log In </IonLabel>
          </IonItem>
        </IonItem>
      </IonContent>

      <IonFooter className="ion-padding ion-no-border">
        <IonButton
          expand="block"
          size="large"
          disabled={!isValid}
          onClick={submitForm}
        >
          Sign Up
        </IonButton>
      </IonFooter>
    </>
  )
}

export default withFormik<SignUpFormProps, SignUpFormValues>({
  displayName: 'SignUpForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email address is required'),
    phone: Yup.string().required('Phone number is required'),
    companyName: Yup.string().required('Email address is required'),
    accountingEmail: Yup.string().required('Accounting email is required'),
    password: Yup.string().required('Password is required'),
    authorize: Yup.mixed().required().oneOf([true]),
  }),

  mapPropsToValues({ user }: SignUpFormProps): SignUpFormValues {
    return user as SignUpFormValues
  },

  handleSubmit(
    values: SignUpFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<SignUpFormProps, SignUpFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(SignUpForm)
