import React, { ComponentProps } from 'react'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import {
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonText,
} from '@ionic/react'

import ErrorLabel from '../components/ErrorLabel'

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
    <IonItemGroup>
      <IonItemDivider>
        <IonLabel className="ion-text-wrap">
          {label}
          {required && <IonText color="danger">*</IonText>}
        </IonLabel>

        {error && touched && <ErrorLabel>{error}</ErrorLabel>}
      </IonItemDivider>

      <IonItem
        lines="full"
        className={clsx({ 'ion-invalid': error && touched })}
      >
        <IonInput
          {...props}
          value={value}
          onIonBlur={e => form.setFieldTouched(name)}
          onIonChange={e => form.setFieldValue(name, e.detail.value!)}
        />
      </IonItem>
    </IonItemGroup>
  )
}

export default FormikInput
