import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import { IonDatetime, IonItem, IonItemGroup } from '@ionic/react'

import FieldHeader from '../components/FieldHeader'

interface Props extends ComponentProps<typeof IonDatetime> {
  label: string
  required?: boolean
}

const StyledDatetime = styled(IonDatetime)`
  --padding-start: 0;
  font-size: 1.25rem;
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
      <FieldHeader label={label} error={touched && error} required={required} />

      <IonItem
        mode="ios"
        lines="full"
        className={clsx({ 'ion-invalid': error && touched })}
      >
        <StyledDatetime
          {...props}
          mode="ios"
          value={value}
          onIonBlur={e => form.setFieldTouched(name)}
          onIonChange={e => form.setFieldValue(name, e.detail.value!)}
        />
      </IonItem>
    </IonItemGroup>
  )
}

export default FormikDatetime
