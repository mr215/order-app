import React, { useState, InputHTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { FieldProps, getIn } from 'formik'
import { IonItem, IonItemGroup } from '@ionic/react'
import InputMask from 'react-input-mask'
import identity from 'lodash/identity'

import FieldHeader from '../components/FieldHeader'

interface Props extends InputHTMLAttributes<Element> {
  label: string
  mask: string | [string | RegExp]
  required?: boolean
  formatter?: (str: string) => string
  extraContent?: ReactElement
}

const StyledInputMask = styled(InputMask)`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`

const FormikInput: React.FC<FieldProps & Props> = ({
  field: { name, value, onBlur },
  form,
  label,
  mask = '',
  formatter = identity,
  required = false,
  extraContent = null,
  ...props
}) => {
  const [focused, setFocused] = useState(false)

  const error = getIn(form.errors, name)
  const touched = getIn(form.touched, name)

  return (
    <IonItemGroup>
      <FieldHeader label={label} error={touched && error} required={required} />

      <IonItem
        lines="full"
        mode="ios"
        className={clsx('item-interactive', {
          'item-has-focus': focused,
          'ion-invalid': error && touched,
        })}
      >
        <StyledInputMask
          mask={mask}
          name={name}
          value={value}
          onChange={e => form.setFieldValue(name, formatter(e.target.value))}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={e => {
            setFocused(false)

            onBlur(e)
          }}
          {...props}
        />

        {extraContent}
      </IonItem>
    </IonItemGroup>
  )
}

export default FormikInput
