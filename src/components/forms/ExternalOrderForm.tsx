import React from 'react'
import { withFormik, FormikProps, Field, FormikBag } from 'formik'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { ExternalOrderFormValues } from 'types'
import { FormikTextField } from 'components/formik'

interface ExternalOrderFormProps {
  defaultValues: ExternalOrderFormValues
  onSubmit: (values: ExternalOrderFormValues) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },

    field: {
      marginBottom: theme.spacing(3),
    },
  })
)

function ExternalOrderForm({
  handleSubmit,
}: ExternalOrderFormProps & FormikProps<ExternalOrderFormValues>) {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Box flexGrow={1}>
        <Field
          component={FormikTextField}
          fullWidth
          type="text"
          name="externalOrderId"
          label="Order/PO #"
          className={classes.field}
        />

        <Box>
          <Button variant="contained" size="small">
            Order Notes
          </Button>
        </Box>
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
      >
        Submit
      </Button>
    </form>
  )
}

export default withFormik<ExternalOrderFormProps, ExternalOrderFormValues>({
  displayName: 'ExternalOrderForm',
  enableReinitialize: true,

  mapPropsToValues({
    defaultValues,
  }: ExternalOrderFormProps): ExternalOrderFormValues {
    return defaultValues
  },

  handleSubmit(
    values: ExternalOrderFormValues,
    {
      props: { onSubmit },
    }: FormikBag<ExternalOrderFormProps, ExternalOrderFormValues>
  ) {
    onSubmit(values)
  },
})(ExternalOrderForm)
