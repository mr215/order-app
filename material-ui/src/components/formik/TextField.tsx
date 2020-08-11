import React, { ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

function FormikTextField({
  field,
  form,
  ...props
}: FieldProps & TextFieldProps): ReactElement {
  const error = getIn(form.errors, field.name)
  const touched = getIn(form.touched, field.name)

  return (
    <TextField
      {...props}
      {...field}
      error={touched && !!error}
      helperText={touched ? error : ''}
    />
  )
}

export default FormikTextField
