import React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

interface State {
  pickupAddress: string
  deliveryAddress: string
  vehicleType: string
  lastestDeliverByTime: string
  jobName: string
  orderThrough: string
}

export default function Home() {
  const [values, setValues] = React.useState<State>({
    pickupAddress: '',
    deliveryAddress: '',
    vehicleType: 'car',
    lastestDeliverByTime: '2017-05-24T10:30',
    jobName: '',
    orderThrough: '',
  })

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = (event: React.MouseEvent) => {}

  console.log('values', values)

  return (
    <Box flexGrow={1} display="flex" flexDirection="column">
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

            <RadioGroup
              row
              aria-label="vehicleType"
              name="vehicleType"
              value={values.vehicleType}
              onChange={handleChange('vehicleType')}
            >
              <FormControlLabel value="car" control={<Radio />} label="Car" />
              <FormControlLabel
                value="truck"
                control={<Radio />}
                label="Truck"
              />
            </RadioGroup>
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
              aria-label="orderThrough"
              name="orderThrough"
              value={values.orderThrough}
              onChange={handleChange('orderThrough')}
            >
              <FormControlLabel
                value="SupplyHound"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel value="" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>

      <Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}
