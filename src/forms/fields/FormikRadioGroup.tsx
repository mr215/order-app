import React, { ComponentProps, ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import {
  IonItem,
  IonLabel,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
} from '@ionic/react'

import ErrorText from '../components/ErrorText'

interface RadioItem {
  label: ReactElement
  value: string | number
}

interface Props extends ComponentProps<typeof IonRadioGroup> {
  label: string
  labelProps: ComponentProps<typeof IonLabel>
  slot?: string
  items: RadioItem[]
}

const FormikRadioGroup: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  labelProps,
  slot = 'start',
  items,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <IonRadioGroup
      value={value}
      onIonChange={e => form.setFieldValue(name, e.detail.value!)}
      {...props}
    >
      <IonListHeader>
        <IonLabel {...labelProps}>
          <h3>{label}</h3>
        </IonLabel>
      </IonListHeader>

      {items.map(item => (
        <IonItem key={item.value} lines="full">
          <IonLabel>{item.label}</IonLabel>
          <IonRadio
            slot={slot}
            value={item.value}
            onIonBlur={e => form.setFieldTouched(name)}
          />
        </IonItem>
      ))}

      {error && touched && <ErrorText>{error}</ErrorText>}
    </IonRadioGroup>
  )
}

export default FormikRadioGroup
