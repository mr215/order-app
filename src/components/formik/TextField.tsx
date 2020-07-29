import React, { ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

function FormikTextField({
  field,
  form: { errors },
  ...props
}: FieldProps & TextFieldProps): ReactElement {
  const error = getIn(errors, field.name)

  return <TextField {...props} {...field} error={!!error} helperText={error} />
}

export default FormikTextField
