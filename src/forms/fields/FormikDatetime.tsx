import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import { IonDatetime, IonItem, IonItemGroup } from '@ionic/react'
import { startOfDay, formatISO } from 'date-fns'

import FieldHeader from '../components/FieldHeader'

interface Props extends ComponentProps<typeof IonDatetime> {
  label: string
  required?: boolean
}

const DEFAULT_DATETIME_PROPS = {
  min: formatISO(startOfDay(new Date())),
  displayFormat: 'DDD MMM D h:mm A',
  minuteValues: [0, 15, 30, 45],
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
      <FieldHeader label={label} error={touched && error} required={required} />

      <IonItem
        mode="ios"
        lines="full"
        className={clsx({ 'ion-invalid': error && touched })}
      >
        <StyledDatetime
          {...DEFAULT_DATETIME_PROPS}
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
