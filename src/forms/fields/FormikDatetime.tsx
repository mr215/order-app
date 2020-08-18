import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import {
  IonDatetime,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonText,
} from '@ionic/react'

import ErrorLabel from '../components/ErrorLabel'

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
        <StyledDatetime
          {...props}
          value={value}
          onIonBlur={e => form.setFieldTouched(name)}
          onIonChange={e => form.setFieldValue(name, e.detail.value!)}
        />
      </IonItem>
    </IonItemGroup>
  )
}

export default FormikDatetime
