import React, { useRef, useEffect, ComponentProps, ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import { IonInput, IonItem, IonItemGroup } from '@ionic/react'

import FieldHeader from '../components/FieldHeader'

interface Props extends ComponentProps<typeof IonInput> {
  label: string
  mask: string | [string | RegExp]
  required?: boolean
  extraContent?: ReactElement
  selectionContent?: ReactElement
}

const FormikAddress: React.FC<FieldProps & Props> = ({
  field: { name, value, onBlur },
  form,
  label,
  required = false,
  extraContent,
  selectionContent,
  ...props
}) => {
  const ionInputRef = useRef<HTMLIonInputElement>(null)
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  useEffect(() => {
    let autoComplete: google.maps.places.Autocomplete
    let listener: google.maps.MapsEventListener

    const startAutoComplete = async () => {
      if (!ionInputRef.current) {
        return
      }

      const input = await ionInputRef.current.getInputElement()
      autoComplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: {
          country: 'us',
        },
      })
      autoComplete.setFields(['formatted_address'])

      listener = autoComplete.addListener('place_changed', () => {
        const placeResult = autoComplete.getPlace()

        form.setFieldValue(name, placeResult.formatted_address)
      })
    }

    startAutoComplete()

    return () => {
      if (listener) {
        google.maps.event.removeListener(listener)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-location-input">
      <IonItemGroup>
        <FieldHeader
          label={label}
          error={touched && error}
          required={required}
          extraContent={extraContent}
        />

        <IonItem lines="full">
          <IonInput
            ref={ionInputRef}
            name={name}
            value={value}
            onIonChange={e => form.setFieldValue(name, e.detail.value!)}
            onIonBlur={e => onBlur(e)}
            {...props}
          />
          {selectionContent}
        </IonItem>
      </IonItemGroup>
    </div>
  )
}

export default FormikAddress
