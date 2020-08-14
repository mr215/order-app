import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import {
  IonDatetime,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from '@ionic/react'

import ErrorText from '../components/ErrorText'

interface Props extends ComponentProps<typeof IonDatetime> {
  label: string
  required?: boolean
}

const StyledDatetime = styled(IonDatetime)`
  --padding-start: 0;
`

const FormikDatetime: React.FC<FieldProps & Props> = ({
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
        <StyledDatetime
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

export default FormikDatetime
