import React, { ComponentProps, ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import {
  IonItem,
  IonItemDivider,
  IonLabel,
  IonRadio,
  IonRadioGroup,
} from '@ionic/react'

import ErrorLabel from '../components/ErrorLabel'

interface RadioItem {
  label: ReactElement
  value: string | number
}

interface Props extends ComponentProps<typeof IonRadioGroup> {
  label: string
  radioProps: ComponentProps<typeof IonRadio>
  items: RadioItem[]
}

const FormikRadioGroup: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  radioProps,
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
      <IonItemDivider mode="ios">
        <IonLabel className="ion-text-wrap">{label}</IonLabel>

        {error && touched && <ErrorLabel>{error}</ErrorLabel>}
      </IonItemDivider>

      {items.map(item => (
        <IonItem key={item.value} lines="full" mode="ios">
          <IonLabel>{item.label}</IonLabel>
          <IonRadio
            {...radioProps}
            value={item.value}
            onIonBlur={e => form.setFieldTouched(name)}
          />
        </IonItem>
      ))}
    </IonRadioGroup>
  )
}

export default FormikRadioGroup
