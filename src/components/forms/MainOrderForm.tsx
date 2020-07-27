import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import { Order, OrderThrough } from '../../types'
import carImg from '../../images/car.png'
import truckImg from '../../images/truck.png'

export interface MainOrderFormProps {
  defaultValues: Order
  onSubmit: (values: Order) => void
}

export default function MainOrderForm({
  defaultValues,
  onSubmit,
}: MainOrderFormProps) {
  const [values, setValues] = useState<Order>(defaultValues)

  const handleChange = (prop: keyof Order) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = (event: React.MouseEvent) => {
    onSubmit(values)
  }

  useEffect(() => {
    setValues(defaultValues)
  }, [defaultValues])

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" p={2}>
      <Box flexGrow={1}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Pickup Address"
            value={values.pickupAddress}
            onChange={handleChange('pickupAddress')}
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Delivery Address"
            value={values.deliveryAddress}
            onChange={handleChange('deliveryAddress')}
          />
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset">
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
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Latest Deliver By"
            type="datetime-local"
            value={values.lastestDeliverByTime}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange('lastestDeliverByTime')}
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Job Name"
            value={values.jobName}
            onChange={handleChange('jobName')}
          />
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset">
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
        </Box>
      </Box>

      <Box>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}
