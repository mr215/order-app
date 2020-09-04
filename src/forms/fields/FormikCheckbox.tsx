import React, { ComponentProps, ReactElement } from 'react'
import styled from 'styled-components'
import { FieldProps, getIn } from 'formik'
import { IonItem, IonLabel, IonCheckbox } from '@ionic/react'

interface CheckboxItem {
  label: ReactElement
  value: boolean
}

interface Props extends ComponentProps<typeof IonCheckbox> {
  label: string
  labelProps: ComponentProps<typeof IonLabel>
  slot?: string
  item: CheckboxItem
}

const ErrorLabel = styled(IonLabel)`
  --color: var(--ion-color-danger) !important;

  font-size: 0.75rem !important;
  margin-left: 1rem;
`

const FormikCheckbox: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  labelProps,
  slot = 'start',
  item,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <IonItem key={name}>
      {label}
      <IonCheckbox
        slot={slot}
        value={value}
        onIonBlur={e => form.setFieldTouched(name)}
        onIonChange={e => form.setFieldValue(name, e.detail.checked!)}
        {...props}
      />
      {error && touched && <ErrorLabel>{error}</ErrorLabel>}
    </IonItem>
  )
}

export default FormikCheckbox
