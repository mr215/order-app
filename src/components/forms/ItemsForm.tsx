import React, { ReactElement } from 'react'
import {
  withFormik,
  FormikProps,
  FormikBag,
  Form,
  FieldArray,
  Field,
} from 'formik'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as Yup from 'yup'

import { ItemsFormValues, OrderItem } from 'types'
import { FormikTextField } from 'components/formik'
import Button from 'components/Button'

interface ItemsFormProps {
  defaultValues: ItemsFormValues
  onSubmit: (values: ItemsFormValues) => void
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
      marginBottom: theme.spacing(2),
    },
  })
)

function ItemsForm({
  values,
  isValid,
  isSubmitting,
}: ItemsFormProps & FormikProps<ItemsFormValues>): ReactElement {
  const classes = useStyles()

  return (
    <Form className={classes.form} noValidate autoComplete="off">
      <Box flexGrow={1}>
        <FieldArray
          name="items"
          render={helpers => (
            <>
              {(values.items || []).map((item: OrderItem, index: number) => (
                <Field
                  key={index}
                  name={`items.${index}.description`}
                  component={FormikTextField}
                  className={classes.field}
                  multiline
                  fullWidth
                  variant="outlined"
                  label="Description"
                  rowsMax={4}
                  InputProps={{
                    startAdornment: (
                      <Box mr={1}>
                        <InputAdornment position="start">
                          {index + 1}
                        </InputAdornment>
                      </Box>
                    ),
                  }}
                />
              ))}

              <Box textAlign="right">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => helpers.push({ description: '' })}
                >
                  Add Item
                </Button>
              </Box>
            </>
          )}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        size="large"
        disabled={!isValid}
        loading={isSubmitting}
      >
        Submit
      </Button>
    </Form>
  )
}

export default withFormik<ItemsFormProps, ItemsFormValues>({
  displayName: 'ItemsForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    items: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string().required('Required'),
        })
      )
      .required('Must have items')
      .min(1, 'Must have mininum of 1 item'),
  }),

  mapPropsToValues({ defaultValues }: ItemsFormProps): ItemsFormValues {
    return defaultValues
  },

  handleSubmit(
    values: ItemsFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<ItemsFormProps, ItemsFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(ItemsForm)
