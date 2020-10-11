import React, { ComponentProps } from 'react'
import { FieldProps, getIn } from 'formik'
import { IonItem, IonItemGroup, IonSelect, IonSelectOption } from '@ionic/react'
import styled from 'styled-components'

import { SelectOption } from 'types'
import FieldHeader from '../components/FieldHeader'

interface Props extends ComponentProps<typeof IonSelect> {
  label: string
  options: SelectOption[]
  required?: boolean
}

const StyledIonSelect = styled(IonSelect)`
  --padding-start: 0;

  max-width: 100%;
`
const FormikSelect: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  options,
  required,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <IonItemGroup>
      <FieldHeader label={label} error={touched && error} required={required} />

      <IonItem lines="full" mode="ios">
        <StyledIonSelect
          {...props}
          value={value}
          onIonBlur={e => form.setFieldTouched(name)}
          onIonChange={e => form.setFieldValue(name, e.detail.value)}
        >
          {options.map(option => (
            <IonSelectOption key={option.value} value={option.value}>
              {option.label}
            </IonSelectOption>
          ))}
        </StyledIonSelect>
      </IonItem>
    </IonItemGroup>
  )
}

export default FormikSelect
