import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { FieldProps, getIn } from 'formik'
import { IonItem, IonLabel, IonInput } from '@ionic/react'

interface InputProps extends ComponentProps<typeof IonInput> {
  label: string
  labelProps: ComponentProps<typeof IonLabel>
}

const ErrorLabel = styled(IonLabel)`
  transform: scale(0.75) !important;
`

const FormikInput: React.FC<FieldProps & InputProps> = ({
  field: { name, value },
  form,
  label,
  labelProps,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)
  const labelColor = error && touched ? 'danger' : ''

  return (
    <IonItem>
      {label && (
        <IonLabel {...labelProps} color={labelColor}>
          {label}
        </IonLabel>
      )}

      <IonInput
        {...props}
        value={value}
        onIonBlur={e => form.setFieldTouched(name)}
        onIonChange={e => form.setFieldValue(name, e.detail.value)}
      />

      {error && touched && (
        <ErrorLabel position="stacked" color={labelColor}>
          {error}
        </ErrorLabel>
      )}
    </IonItem>
  )
}

export default FormikInput
