import React, { ComponentProps, ReactElement } from 'react'
import clsx from 'clsx'
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
    <>
      <IonRadioGroup
        value={value}
        onIonChange={e => form.setFieldValue(name, e.detail.value)}
      >
        <IonListHeader>
          <IonLabel {...labelProps}>{label}</IonLabel>
        </IonListHeader>

        {items.map(item => (
          <IonItem key={item.value}>
            <IonLabel>{item.label}</IonLabel>
            <IonRadio slot={slot} value={item.value} />
          </IonItem>
        ))}
      </IonRadioGroup>

      {error && touched && <ErrorText>{error}</ErrorText>}

      {/* {/* <IonItem className={clsx({ 'ion-invalid': error && touched })}>
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
      </IonItem> */}
    </>
  )
}

export default FormikRadioGroup
