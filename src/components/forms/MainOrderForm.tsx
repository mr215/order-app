import React, { ReactElement } from 'react'
import { withFormik, FormikProps, Field, FormikBag } from 'formik'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'

import { OrderThrough, MainOrderFormValues } from 'types'
import { FormikTextField, FormikRadioGroup } from 'components/formik'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

interface MainOrderFormProps {
  defaultValues: MainOrderFormValues
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
  handleSubmit,
}: MainOrderFormProps & FormikProps<MainOrderFormValues>): ReactElement {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Box flexGrow={1}>
        <Field
          component={FormikTextField}
          fullWidth
          type="text"
          name="jobName"
          label="Job Name"
          className={classes.field}
        />

        <Field
          component={FormikRadioGroup}
          name="orderThrough"
          className={classes.field}
          label="Order through SupplyHound?"
          radioGroupProps={{ row: true, ariaLabel: 'Order through' }}
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
          component={FormikTextField}
          fullWidth
          type="text"
          name="pickupAddress"
          label="Pickup Address"
          className={classes.field}
        />

        <Field
          component={FormikTextField}
          fullWidth
          type="text"
          name="deliveryAddress"
          label="Delivery Address"
          className={classes.field}
        />

        <Field
          component={FormikRadioGroup}
          name="vehicleType"
          className={classes.field}
          label="Vehicle Type"
          radioGroupProps={{ row: true, ariaLabel: 'Vehicle type' }}
        >
          <FormControlLabel
            value="car"
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
            value="truck"
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
          component={FormikTextField}
          fullWidth
          type="datetime-local"
          name="lastestDeliverByTime"
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
      >
        Continue
      </Button>
    </form>
  )
}

export default withFormik<MainOrderFormProps, MainOrderFormValues>({
  displayName: 'MainOrderForm',
  enableReinitialize: true,

  mapPropsToValues({ defaultValues }: MainOrderFormProps): MainOrderFormValues {
    return defaultValues
  },

  handleSubmit(
    values: MainOrderFormValues,
    { props: { onSubmit } }: FormikBag<MainOrderFormProps, MainOrderFormValues>
  ) {
    onSubmit(values)
  },
})(MainOrderForm)
