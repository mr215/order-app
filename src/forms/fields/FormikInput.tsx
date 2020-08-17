import React, { ComponentProps } from 'react'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from '@ionic/react'

import ErrorText from '../components/ErrorText'

interface Props extends ComponentProps<typeof IonInput> {
  label: string
  required?: boolean
}

const FormikInput: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  required,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <IonList>
      <IonListHeader>
        <IonLabel color={error && touched ? 'danger' : ''}>
          {label} {required && <IonText color="danger">*</IonText>}
        </IonLabel>
      </IonListHeader>

      <IonItem className={clsx({ 'ion-invalid': error && touched })}>
        <IonInput
          {...props}
          value={value}
          onIonBlur={e => form.setFieldTouched(name)}
          onIonChange={e => form.setFieldValue(name, e.detail.value!)}
        />
      </IonItem>

      {error && touched && <ErrorText>{error}</ErrorText>}
    </IonList>
  )
}

export default FormikInput
