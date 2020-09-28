import React, { useRef, useEffect, ComponentProps, ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import { IonInput, IonItem, IonItemGroup } from '@ionic/react'

import FieldHeader from '../components/FieldHeader'

interface Props extends ComponentProps<typeof IonInput> {
  label: string
  mask: string | [string | RegExp]
  required?: boolean
  extraHeader?: ReactElement
  extraContent?: ReactElement
}

const FormikAddress: React.FC<FieldProps & Props> = ({
  field: { name, value, onBlur },
  form,
  label,
  required = false,
  extraHeader,
  extraContent,
  ...props
}) => {
  const ionInputRef = useRef<HTMLIonInputElement>(null)
  const autocompleteListener = useRef<google.maps.MapsEventListener>()
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  useEffect(() => {
    const initAutoComplete = async () => {
      if (!ionInputRef.current) {
        return
      }

      const input = await ionInputRef.current.getInputElement()
      const autocomplete: google.maps.places.Autocomplete = new google.maps.places.Autocomplete(
        input,
        {
          componentRestrictions: {
            country: 'us',
          },
          fields: ['formatted_address'],
        }
      )

      autocompleteListener.current = autocomplete.addListener(
        'place_changed',
        () => {
          const placeResult = autocomplete.getPlace()

          form.setFieldValue(name, placeResult.formatted_address)
        }
      )
    }

    initAutoComplete()

    return () => {
      if (autocompleteListener.current) {
        google.maps.event.removeListener(autocompleteListener.current)
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
          extraHeader={extraHeader}
        />

        <IonItem lines="full">
          <IonInput
            ref={ionInputRef}
            name={name}
            value={value}
            onIonChange={e => form.setFieldValue(name, e.detail.value!)}
            onIonBlur={onBlur}
            {...props}
          />

          {extraContent}
        </IonItem>
      </IonItemGroup>
    </div>
  )
}

export default FormikAddress
