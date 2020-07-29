import React, { ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'

function FormikRadioGroup({
  field,
  form: { errors },
  label,
  labelProps,
  radioGroupProps,
  children,
  ...props
}: FieldProps &
  FormControlProps & {
    label?: string
    labelProps: FormLabelProps
    radioGroupProps: RadioGroupProps
  }): ReactElement {
  const error = getIn(errors, field.name)

  return (
    <FormControl {...props} error={!!error}>
      {label && <FormLabel {...labelProps}>{label}</FormLabel>}

      <RadioGroup {...field} {...radioGroupProps}>
        {children}
      </RadioGroup>

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default FormikRadioGroup
