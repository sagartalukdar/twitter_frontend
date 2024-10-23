import { Button, Grid, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { loginUser } from '../../Store/Auth/Action'
import { useNavigate } from 'react-router-dom'

const validationSchema=Yup.object().shape({
  email:Yup.string().email("invalid email ").required("email is required"),
  password:Yup.string().required("password is required")
})

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      console.log("login value :",values);
      dispatch(loginUser(values));
      navigate("/")
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
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
            <Grid className='mt-20' item xs={12}>
              <Button sx={{borderRadius:'20px',py:'15px',bgcolor:blue[500]}}
               type='submit'
               fullWidth
               variant='contained'
               size='large'
              >
                Login
              </Button>
            </Grid>
        </Grid>
    </form>
  )
}

export default Login
