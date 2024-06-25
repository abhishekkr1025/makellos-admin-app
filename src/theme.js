import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    MuiSwitch: {
        styleOverrides: {
          switchBase: {
            // Controls default (unchecked) color for the thumb
            color: "#ccc"
          },
          colorPrimary: {
            "&.Mui-checked": {
              // Controls checked color for the thumb
              color: "#006240"
            }
          },
          track: {
            // Controls default (unchecked) color for the track
            opacity: 0.2,
            backgroundColor: "#fff",
            ".Mui-checked.Mui-checked + &": {
              // Controls checked color for the track
              opacity: 0.7,
              backgroundColor: "#fff"
            }
          }
        }},
  typography: {
    fontFamily: 'Lato, Arial, sans-serif',
  },
});

export default theme;