import React from 'react'
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

type ButtonProps = MuiButtonProps & {
  loading?: boolean
}

const PROGRESS_SIZE = {
  large: '1rem',
  medium: '0.875rem',
  small: '0.8125rem',
}

function Button({ children, loading, ...props }: ButtonProps) {
  const { size = 'medium' } = props
  const progressSize = PROGRESS_SIZE[size]

  return (
    <MuiButton {...props}>
      {children}
      &nbsp;
      {loading && <CircularProgress size={progressSize} color="inherit" />}
    </MuiButton>
  )
}

export default Button
