import React, { ComponentProps, ReactNode } from 'react'
import { FieldProps } from 'formik'
import { IonCheckbox, IonItem, IonLabel } from '@ionic/react'

interface Props extends ComponentProps<typeof IonCheckbox> {
  label: ReactNode
  slot?: string
}

const FormikCheckbox: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  slot = 'start',
  ...props
}) => {
  return (
    <IonItem mode="ios" lines="full">
      <IonLabel className="ion-text-wrap">{label}</IonLabel>

      <IonCheckbox
        checked={value}
        slot={slot}
        onIonBlur={e => form.setFieldTouched(name)}
        onIonChange={e => form.setFieldValue(name, e.detail.checked!)}
        {...props}
      />
    </IonItem>
  )
}

export default FormikCheckbox
