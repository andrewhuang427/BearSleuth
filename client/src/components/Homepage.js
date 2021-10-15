import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



function Homepage() {




  const steps = [
    'Fill out Personal Info',
    'Other Stuff',
    'More stuff',
  ];
   return (
    <Box id="Homepage" display="none" >
     <Box id="Stepper" sx={{ width: '100%' }} marginTop={3}>
     <Stepper activeStep={1} alternativeLabel>
       {steps.map((label) => (
         <Step key={label}>
           <StepLabel>{label}</StepLabel>
         </Step>
       ))}
    </Stepper>
    </Box>
    <Box id="Personal Info"  marginTop={3} marginLeft={4} maxWidth={400}>
      <Paper elevation={5}>
        <Box padding={2}>
          Stuff
        </Box>
      </Paper>
    </Box>
    </Box>
  );
}

export default Homepage;
