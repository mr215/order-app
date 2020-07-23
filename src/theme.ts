import { createMuiTheme } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: amber,
  },
})

export default theme