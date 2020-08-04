import React, { ReactElement } from 'react'
import { withFormik, FormikProps, FormikBag, Form, Field } from 'formik'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import * as Yup from 'yup'

import { OrderThrough, VehicleType, Order, MainOrderFormValues } from 'types'
import { FormikTextField, FormikRadioGroup } from 'components/formik'
import Button from 'components/Button'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

interface MainOrderFormProps {
  order: Order
  onSubmit: (values: MainOrderFormValues) => void
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

    vehicleTypeImage: {
      width: 100,
      padding: theme.spacing(2, 0),
    },
  })
)

function MainOrderForm({
  isValid,
  isSubmitting,
}: MainOrderFormProps & FormikProps<MainOrderFormValues>): ReactElement {
  const classes = useStyles()

  return (
    <Form className={classes.form} noValidate autoComplete="off">
      <Box flexGrow={1}>
        <Field
          name="jobName"
          component={FormikTextField}
          required
          fullWidth
          type="text"
          label="Job Name"
          className={classes.field}
        />

        <Field
          name="orderThrough"
          component={FormikRadioGroup}
          required
          label="Order through SupplyHound?"
          radioGroupProps={{ row: true, 'aria-label': 'Order through' }}
        >
          <FormControlLabel
            value={OrderThrough.SupplyHound}
            control={<Radio />}
            label="Yes"
          />

          <FormControlLabel
            value={OrderThrough.Supplier}
            control={<Radio />}
            label="No"
          />
        </Field>

        <Field
          name="pickupAddress"
          component={FormikTextField}
          required
          fullWidth
          type="text"
          label="Pickup Address"
          className={classes.field}
        />

        <Field
          name="deliveryAddress"
          component={FormikTextField}
          required
          fullWidth
          type="text"
          label="Delivery Address"
          className={classes.field}
        />

        <Field
          name="vehicleType"
          component={FormikRadioGroup}
          required
          label="Vehicle Type"
          radioGroupProps={{ row: true, 'aria-label': 'Vehicle type' }}
        >
          <FormControlLabel
            value={VehicleType.Car}
            control={<Radio />}
            label={
              <img
                src={carImg}
                alt="car"
                className={classes.vehicleTypeImage}
              />
            }
          />
          <FormControlLabel
            value={VehicleType.Truck}
            control={<Radio />}
            label={
              <img
                src={truckImg}
                alt="truck"
                className={classes.vehicleTypeImage}
              />
            }
          />
        </Field>

        <Field
          name="lastestDeliverByTime"
          component={FormikTextField}
          required
          fullWidth
          type="datetime-local"
          label="Latest Deliver By"
          InputLabelProps={{ shrink: true }}
          className={classes.field}
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
        Continue
      </Button>
    </Form>
  )
}

export default withFormik<MainOrderFormProps, MainOrderFormValues>({
  displayName: 'MainOrderForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    jobName: Yup.string().required('Job name is required'),
    orderThrough: Yup.mixed()
      .required()
      .oneOf([OrderThrough.SupplyHound, OrderThrough.Supplier] as const),
    pickupAddress: Yup.string().required('Pickup address is required'),
    deliveryAddress: Yup.string().required('Delivery address is required'),
    vehicleType: Yup.mixed()
      .required()
      .oneOf([VehicleType.Car, VehicleType.Truck] as const),
    lastestDeliverByTime: Yup.string().required('Delivery time is required'),
  }),

  mapPropsToValues({ order }: MainOrderFormProps): MainOrderFormValues {
    return order as MainOrderFormValues
  },

  handleSubmit(
    values: MainOrderFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<MainOrderFormProps, MainOrderFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(MainOrderForm)
