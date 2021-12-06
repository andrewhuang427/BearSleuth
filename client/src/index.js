import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material/styles";



const theme= createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2da866',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export const host = "http://localhost:5000/"
//export const host = "http://ec2-18-223-203-85.us-east-2.compute.amazonaws.com:5000/"



ReactDOM.render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
