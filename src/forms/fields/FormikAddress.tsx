import React, { useState, useEffect, ComponentProps } from 'react'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import {
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonText,
} from '@ionic/react'

import ErrorLabel from '../components/ErrorLabel'

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

interface Props extends ComponentProps<typeof IonInput> {
  label: string
  required?: boolean
}

const FormikAddress: React.FC<FieldProps & Props> = ({
  field: { name, value },
  form,
  label,
  required,
  ...props
}) => {
  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  let autoComplete: any
  const [query, updateQuery] = useState('')

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&libraries=places`,
      () => handleScriptLoad(updateQuery)
    )
  }, [])

  const loadScript = (url: string, callback: () => void) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = () => callback()
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  const handleScriptLoad = (updateQuery: (value: string) => void) => {
    window.addEventListener('load', () => {
      let ionInput = document.getElementById(name)!
      let addressInput = ionInput.children[0]! as HTMLInputElement

      autoComplete = new window.google.maps.places.Autocomplete(addressInput, {
        componentRestrictions: {
          country: 'us',
        },
      })
      autoComplete.setFields(['address_components', 'formatted_address'])
      autoComplete.addListener('place_changed', () =>
        handlePlaceSelect(updateQuery)
      )
    })
  }

  const handlePlaceSelect = async (updateQuery: (value: string) => void) => {
    const addressObject = autoComplete.getPlace()
    const query = addressObject.formatted_address
    updateQuery(query)
    form.setFieldValue(name, query)
  }

  const handleChange = (e: any) => {
    updateQuery(e.detail.value)
    form.setFieldValue(name, e.detail.value!)
  }

  return (
    <div className="search-location-input">
      <IonItemGroup>
        <IonItemDivider mode="ios">
          <IonLabel className="ion-text-wrap">
            {label}
            {required && <IonText color="danger">*</IonText>}
          </IonLabel>

          {error && touched && <ErrorLabel>{error}</ErrorLabel>}
        </IonItemDivider>

        <IonItem
          lines="full"
          mode="ios"
          className={clsx({ 'ion-invalid': error && touched })}
        >
          <IonInput
            {...props}
            mode="ios"
            id={name}
            value={value}
            onIonBlur={e => form.setFieldTouched(name)}
            onIonChange={handleChange}
          />
        </IonItem>
      </IonItemGroup>
    </div>
  )
}

export default FormikAddress
