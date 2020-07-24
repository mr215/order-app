import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Order } from '../../types'

export interface ExternalOrderProps {
  defaultValues: Order
  onSubmit: (values: Order) => void
}

export default function ExternalOrder({
  defaultValues,
  onSubmit,
}: ExternalOrderProps) {
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
            label="Order/PO #"
            fullWidth
            value={values.externalOrderId}
            onChange={handleChange('externalOrderId')}
          />
        </Box>

        <Box>
          <Button variant="contained" size="small">
            Order Notes
          </Button>
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
          Submit
        </Button>
      </Box>
    </Box>
  )
}
