import React, { ComponentProps, ReactNode } from 'react'
import { FieldProps, getIn } from 'formik'
import { IonCheckbox, IonItem, IonLabel, IonText } from '@ionic/react'

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
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <IonItem mode="ios" lines="full">
      <IonLabel className="ion-text-wrap">
        {label} {error && touched && <IonText color="danger">{error}</IonText>}
      </IonLabel>

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
