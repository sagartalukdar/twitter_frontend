import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { registerUser } from '../../Store/Auth/Action'
import { useNavigate } from 'react-router-dom'

const validationSchema=Yup.object().shape({
  email:Yup.string().email("invalid email ").required("email is required"),
  password:Yup.string().required("password is required"),
  fullName:Yup.string().required("Full Name is required"),
})

const currentYear=new Date().getFullYear();
const years=Array.from({length:100},(_,i)=>currentYear-i);
const days=Array.from({length:31},(_,i)=>i+1);
const months=[
  {value:"January",label:"jan"},
  {value:"February",label:"feb"},
  {value:"March",label:"mar"},
  {value:"April",label:"apr"},
  {value:"May",label:"may"},
  {value:"June",label:"jun"},
  {value:"July",label:"jul"},
  {value:"Auguest",label:"aug"},
  {value:"September",label:"sept"},
  {value:"October",label:"oct"},
  {value:"November",label:"nov"},
  {value:"December",label:"dec"},
]

const Register = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [dateOfBirth,setDateOfBirth]=useState({
    day:'',
    month:'',
    year:''
  })

  const formik=useFormik({
    initialValues:{
      email:"",
      password:"",
      fullName:'',
      birthDate:''
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      const {day,month,year}=dateOfBirth;
      const birthDate=`${month}-${year}-${day}`
      values.birthDate=birthDate;
      console.log("register value :",values);
      dispatch(registerUser(values));
      navigate("/");
    }
  })

  const handleDateChange=(name)=>(event)=>{
    const dob={
      ...dateOfBirth,
      [name]:event.target.value
    }
    setDateOfBirth(dob);
  }
  return (
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
               fullWidth
               label="Full Name"
               name='fullName'
               variant='outlined'
               size='large'
               value={formik.values.fullName}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.fullName && formik.errors.fullName}
               helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               fullWidth
               label="Email"
               name='email'
               variant='outlined'
               size='large'
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.email && formik.errors.email}
               helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               fullWidth
               label="Password"
               name='password'
               variant='outlined'
               size='large'
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.password && formik.errors.password}
               helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Date</InputLabel>
              <Select name='day' 
              fullWidth
              value={dateOfBirth.day} 
              onChange={handleDateChange("day")}
              onBlur={formik.handleBlur}
              >
                {days.map((day)=><MenuItem key={day} value={day}>{day}</MenuItem>)}
              </Select>
            </Grid>  
            <Grid item xs={4}>
              <InputLabel>Month</InputLabel>
              <Select name='month' 
              fullWidth
              value={dateOfBirth.month} 
              onChange={handleDateChange("month")}
              onBlur={formik.handleBlur}
              >
                {months.map((month)=><MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
              </Select>
            </Grid>  
            <Grid item xs={4}>
              <InputLabel>Year</InputLabel>
              <Select name='year' 
              fullWidth
              value={dateOfBirth.year} 
              onChange={handleDateChange("year")}
              onBlur={formik.handleBlur}
              >
                {years.map((year)=><MenuItem key={year} value={year}>{year}</MenuItem>)}
              </Select>
            </Grid>  
            <Grid className='mt-20' item xs={12}>
              <Button sx={{borderRadius:'20px',py:'15px',bgcolor:blue[500]}}
               type='submit'
               fullWidth
               variant='contained'
               size='large'
              >
                regsiter
              </Button>
            </Grid>
        </Grid>
    </form>
  )
}

export default Register
