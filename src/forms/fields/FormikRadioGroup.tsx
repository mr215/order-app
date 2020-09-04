import React, { ComponentProps, ReactElement } from 'react'
import styled from 'styled-components'
import { FieldProps, getIn } from 'formik'
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react'

import FieldHeader from '../components/FieldHeader'

interface RadioItem {
  label: ReactElement
  value: string | number
}

interface Props extends ComponentProps<typeof IonRadioGroup> {
  label: string
  radioProps: ComponentProps<typeof IonRadio>
  items: RadioItem[]
  horizontal?: boolean
}

const RadioLabel = styled(IonLabel)`
  font-size: 1.25rem !important;
  white-space: normal !important;
`

const FormikRadioGroup: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  radioProps,
  items,
  horizontal = false,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  const renderRadioItem = (item: RadioItem) => (
    <>
      <IonRadio
        {...radioProps}
        value={item.value}
        onIonBlur={e => form.setFieldTouched(name)}
      />

      <RadioLabel>{item.label}</RadioLabel>
    </>
  )

  return (
    <IonRadioGroup
      value={value}
      onIonChange={e => form.setFieldValue(name, e.detail.value!)}
      {...props}
    >
      <FieldHeader label={label} error={touched && error} />

      {horizontal ? (
        <IonItem lines="full" mode="ios">
          {items.map(item => (
            <IonItem key={item.value} lines="none" className="ion-no-padding">
              {renderRadioItem(item)}
            </IonItem>
          ))}
        </IonItem>
      ) : (
        items.map(item => (
          <IonItem key={item.value} lines="full" mode="ios">
            {renderRadioItem(item)}
          </IonItem>
        ))
      )}
    </IonRadioGroup>
  )
}

export default FormikRadioGroup
