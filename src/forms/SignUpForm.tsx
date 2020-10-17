import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonContent, IonLoading, IonRouterLink, IonText } from '@ionic/react'
import * as Yup from 'yup'

import { LANDING_ROUTE } from 'utils/config'
import { User, SelectOption, SignUpFormValues } from 'types'
import { titleCase } from 'utils/formatters'
import FooterWithButton from 'components/FooterWithButton'

import FormikInput from './fields/FormikInput'
import FormikCheckbox from './fields/FormikCheckbox'
import FormikSelect from './fields/FormikSelect'
import AuthFormBottomSection from './components/AuthFormBottomSection'

interface SignUpFormProps {
  user: User
  marketOptions: SelectOption[]
  onSubmit: (values: User) => Promise<void>
}

const SignUpForm: React.FC<SignUpFormProps & FormikProps<SignUpFormValues>> = ({
  marketOptions,
  isValid,
  isSubmitting,
  submitForm,
}) => {
  return (
    <>
      <IonContent>
        <IonLoading isOpen={isSubmitting} />

        <IonText className="ion-text-center">
          <h2>Sign Up</h2>
          <p>Please enter your info below to get started.</p>
        </IonText>

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

        <Field
          name="company_name"
          component={FormikInput}
          type="text"
          label="Company Name"
          placeholder="Enter your company name here"
          formatter={titleCase}
          required
        />

        <Field
          name="accounting_email"
          component={FormikInput}
          type="email"
          label="Accounting Email"
          placeholder="Enter where receipts should be sent"
          required
        />

        <Field
          name="market_id"
          component={FormikSelect}
          label="Market"
          placeholder="Select market"
          interfaceOptions={{ header: 'Market' }}
          options={marketOptions}
          required
        />

        <Field
          name="password"
          component={FormikInput}
          type="password"
          label="Password"
          placeholder="Enter password here"
          required
        />

        <Field
          name="agree_terms"
          component={FormikCheckbox}
          label={
            <>
              I authorize Supply Hound, Inc. to pickup and deliver the items
              specified by my use of this service. See{' '}
              <IonRouterLink href="#">Privacy</IonRouterLink> and{' '}
              <IonRouterLink href="#">Terms</IonRouterLink>
            </>
          }
          slot="start"
          required
        />

        <AuthFormBottomSection>
          Already have an account?&nbsp;
          <IonRouterLink routerLink={LANDING_ROUTE}>Log In</IonRouterLink>
        </AuthFormBottomSection>
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
    company_name: Yup.string().required('Required'),
    accounting_email: Yup.string().email('Invalid email').required('Required'),
    market_id: Yup.number().required('Required'),
    password: Yup.string().required('Required'),
    agree_terms: Yup.boolean().required().oneOf([true], 'Required'),
  }),

  mapPropsToValues({ user }: SignUpFormProps): SignUpFormValues {
    return { ...user, agree_terms: false }
  },

  async handleSubmit(
    { agree_terms, ...values }: SignUpFormValues,
    { props: { onSubmit } }: FormikBag<SignUpFormProps, SignUpFormValues>
  ) {
    await onSubmit(values)
  },
})(SignUpForm)
