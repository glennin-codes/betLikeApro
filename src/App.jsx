import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import Home from './Home'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#4caf50',
      },
    },
    typography: {
      fontFamily: 'Roboto',
    },
  });
  

  return (
    
   
        <ThemeProvider theme={theme}>
          <Home/>
          {/* your app code here */}
        </ThemeProvider>
     
   
    
  )
}

export default App
