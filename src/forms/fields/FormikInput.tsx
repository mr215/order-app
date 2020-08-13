import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import { IonItem, IonLabel, IonInput, IonText } from '@ionic/react'

interface InputProps extends ComponentProps<typeof IonInput> {
  label: string
  labelProps: ComponentProps<typeof IonLabel>
  required?: boolean
}

const ErrorLabel = styled(IonLabel)`
  padding: 0.25rem 1rem;
  font-size: 0.75rem;
  color: var(--ion-color-danger);
`

const FormikInput: React.FC<FieldProps & InputProps> = ({
  field: { name, value },
  form,
  label,
  labelProps,
  required,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <>
      <IonItem className={clsx({ 'ion-invalid': error && touched })}>
        {label && (
          <IonLabel {...labelProps} color={error && touched ? 'danger' : ''}>
            {label} {required && <IonText color="danger">*</IonText>}
          </IonLabel>
        )}

        <IonInput
          {...props}
          value={value}
          onIonBlur={e => form.setFieldTouched(name)}
          onIonChange={e => form.setFieldValue(name, e.detail.value)}
        />
      </IonItem>

      {error && touched && <ErrorLabel>{error}</ErrorLabel>}
    </>
  )
}

export default FormikInput
