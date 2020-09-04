import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import { IonItem, IonItemGroup, IonTextarea } from '@ionic/react'

import FieldHeader from '../components/FieldHeader'

interface Props extends ComponentProps<typeof IonTextarea> {
  label: string
  required?: boolean
}

const StyledTextarea = styled(IonTextarea)`
  font-size: 1.25rem;
`

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
    <IonItemGroup>
      <FieldHeader label={label} error={touched && error} required={required} />

      <IonItem
        lines="full"
        className={clsx({ 'ion-invalid': error && touched })}
      >
        <StyledTextarea
          {...props}
          value={value}
          onIonBlur={e => form.setFieldTouched(name)}
          onIonChange={e => form.setFieldValue(name, e.detail.value!)}
        />
      </IonItem>
    </IonItemGroup>
  )
}

export default FormikTextarea
