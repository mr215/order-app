import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent, IonFooter, IonItem, IonLabel, IonItemDivider } from '@ionic/react'

import * as Yup from 'yup'

import { User, SignUpFormValues } from 'types'
import FormikInput from './fields/FormikInput'
import FormikCheckbox from './fields/FormikCheckbox'

interface SignUpFormProps {
  user: User
  onSubmit: (values: SignUpFormValues) => void
} 

const SignUpForm: React.FC<SignUpFormProps & FormikProps<SignUpFormValues>> = ({ isValid, submitForm }) => {
  return (
    <>
      <IonContent>
        <Field
          name="firstName"
          component={FormikInput}
          type="text"
          label="First Name"
          required
        />

        <Field
          name="lastName"
          component={FormikInput}
          type="text"
          label="Last Name"
          required
        />

        <Field
          name="email"
          component={FormikInput}
          type="text"
          label="Email Address"
          required
        />

        <Field
          name="phone"
          component={FormikInput}
          type="text"
          label="Phone Number"
          required
        />

        <Field
          name="companyName"
          component={FormikInput}
          type="text"
          label="Company Name"
          required
        /> 

        <Field
          name="accountingEmail"
          component={FormikInput}
          type="text"
          label="Accounting Email"
          required
        /> 

        <Field
          name="password"
          component={FormikInput}
          type="text"
          label="Password"
          required
        /> 

        <Field
          name="authorize"
          value={false}
          component={FormikCheckbox}
          label="I authorize Supply Hound, Inc. to pickup and deliver the items specified by my use of this service. See Privacy and Terms"
          slot="end"
          required
          item={{
              value: true,
          }}
        />
      </IonContent>
      
      <IonItemDivider>
        <IonItem>
          Already have an account? 
            <IonItem routerLink="/login">
                <IonLabel> Log In </IonLabel>
            </IonItem>
        </IonItem>
      </IonItemDivider>

      <IonFooter className="ion-padding ion-no-border">
        <IonButton expand="block" disabled={!isValid} onClick={submitForm}>
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
    authorize: Yup.mixed()
    .required()
    .oneOf([true])
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
