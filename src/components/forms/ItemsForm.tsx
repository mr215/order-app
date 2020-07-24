import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'

import { Order } from '../../types'

export interface ItemsFormProps {
  defaultValues: Order
  onSubmit: (values: Order) => void
}

export default function ItemsForm({ defaultValues, onSubmit }: ItemsFormProps) {
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
            label="Item description"
            multiline
            fullWidth
            rowsMax={4}
            InputProps={{
              startAdornment: (
                <Box mr={1}>
                  <InputAdornment position="start">1</InputAdornment>
                </Box>
              ),
            }}
          />
        </Box>

        <Box mb={3}>
          <TextField
            label="Item description"
            multiline
            fullWidth
            rowsMax={4}
            InputProps={{
              startAdornment: (
                <Box mr={1}>
                  <InputAdornment position="start">2</InputAdornment>
                </Box>
              ),
            }}
          />
        </Box>

        <Box textAlign="right">
          <Button variant="contained" size="small">
            Add Item
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
