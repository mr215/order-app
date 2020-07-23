import React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

interface State {
  pickupAddress: string
  deliveryAddress: string
  jobName: string
  lastestDeliverByTime: string
}

export default function Home() {
  const [values, setValues] = React.useState<State>({
    pickupAddress: '',
    deliveryAddress: '',
    jobName: '',
    lastestDeliverByTime: '',
  })

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <div>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Pickup Address"
          onChange={handleChange('pickupAddress')}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Delivery Address"
          onChange={handleChange('deliveryAddress')}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Job Name"
          onChange={handleChange('jobName')}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Latest Deliver By"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange('lastestDeliverByTime')}
        />
      </Box>
    </div>
  )
}
