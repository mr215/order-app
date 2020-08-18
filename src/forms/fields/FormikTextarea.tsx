import React, { ComponentProps } from 'react'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonTextarea,
} from '@ionic/react'

import ErrorText from '../components/ErrorText'

interface Props extends ComponentProps<typeof IonTextarea> {
  label: string
  required?: boolean
}

const FormikTextarea: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  required,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <IonList lines="full">
      <IonListHeader>
        <IonLabel color={error && touched ? 'danger' : ''}>
          <h3>
            {label} {required && <IonText color="danger">*</IonText>}
          </h3>
        </IonLabel>
      </IonListHeader>

      <IonItem className={clsx({ 'ion-invalid': error && touched })}>
        <IonTextarea
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

export default FormikTextarea
