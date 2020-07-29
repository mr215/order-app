import React, { useState, useEffect, ReactElement } from 'react'
import { withFormik, FormikProps, Field, FormikBag } from 'formik'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import { Order, OrderThrough, MainOrderFormValues } from 'types'
import { FormikTextField } from 'components/formik'

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
  })
)

function MainOrderForm({
  defaultValues,

  // Formik
  handleSubmit,
}: MainOrderFormProps & FormikProps<MainOrderFormValues>): ReactElement {
  const classes = useStyles()
  const [values, setValues] = useState<Order>(defaultValues)

  const handleChange = (prop: keyof Order) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  useEffect(() => {
    setValues(defaultValues)
  }, [defaultValues])

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

        <FormControl component="fieldset" className={classes.field}>
          <FormLabel component="legend">Order through SupplyHound?</FormLabel>

          <RadioGroup
            row
            aria-label="Order through"
            name="orderThrough"
            value={values.orderThrough}
            onChange={handleChange('orderThrough')}
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
          </RadioGroup>
        </FormControl>

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

        <FormControl component="fieldset" className={classes.field}>
          <FormLabel component="legend">Vehicle Type</FormLabel>

          <Box mt={2}>
            <RadioGroup
              row
              aria-label="vehicleType"
              name="vehicleType"
              value={values.vehicleType}
              onChange={handleChange('vehicleType')}
            >
              <FormControlLabel
                value="car"
                control={<Radio />}
                label={<img src={carImg} alt="car" width={100} />}
              />
              <FormControlLabel
                value="truck"
                control={<Radio />}
                label={<img src={truckImg} alt="truck" width={100} />}
              />
            </RadioGroup>
          </Box>
        </FormControl>

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

      <Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
        >
          Continue
        </Button>
      </Box>
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
