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
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import DeleteIcon from '@material-ui/icons/Delete'

import * as Yup from 'yup'

import {
  Order,
  OrderItemsFormValues,
  OrderItem,
  OrderThrough,
  DEFAULT_ORDER_ITEM,
} from 'types'
import { FormikTextField } from 'components/formik'
import Button from 'components/Button'

interface OrderItemsFormProps {
  order: Order
  onSubmit: (values: OrderItemsFormValues) => void
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

function OrderItemsForm({
  order,

  // Formik
  values,
  isValid,
  isSubmitting,
}: OrderItemsFormProps & FormikProps<OrderItemsFormValues>): ReactElement {
  const classes = useStyles()

  return (
    <Form className={classes.form} noValidate autoComplete="off">
      <Box flexGrow={1}>
        {order.orderThrough === OrderThrough.Supplier ? (
          <>
            <Field
              component={FormikTextField}
              fullWidth
              type="text"
              name="orderId"
              label="Order/PO #"
              className={classes.field}
            />

            <Box>
              <Button variant="contained" size="small">
                Order Notes
              </Button>
            </Box>
          </>
        ) : (
          <FieldArray
            name="items"
            render={helpers => (
              <>
                {(values.items || []).map((item: OrderItem, index: number) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Field
                      name={`items.${index}.description`}
                      component={FormikTextField}
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

                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        if (values.items.length > 1) {
                          helpers.remove(index)
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}

                <Box textAlign="right">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => helpers.push(DEFAULT_ORDER_ITEM)}
                  >
                    Add Item
                  </Button>
                </Box>
              </>
            )}
          />
        )}
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

export default withFormik<OrderItemsFormProps, OrderItemsFormValues>({
  displayName: 'OrderItemsForm',
  enableReinitialize: true,

  validationSchema: ({ order }: OrderItemsFormProps) => {
    const orderIdSchema = Yup.object().shape({
      orderId: Yup.string().required('Order No. is required'),
    })

    const itemsSchema = Yup.object().shape({
      items: Yup.array()
        .of(
          Yup.object().shape({
            description: Yup.string().required('Required'),
          })
        )
        .required('Must have items')
        .min(1, 'Must have mininum of 1 item'),
    })

    return order.orderThrough === OrderThrough.Supplier
      ? orderIdSchema
      : itemsSchema
  },

  mapPropsToValues({ order }: OrderItemsFormProps): OrderItemsFormValues {
    return order as OrderItemsFormValues
  },

  handleSubmit(
    values: OrderItemsFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<OrderItemsFormProps, OrderItemsFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(OrderItemsForm)
