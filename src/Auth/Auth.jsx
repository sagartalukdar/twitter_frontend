import { Button, Grid } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import AuthModal from './Components/AuthModal'
import { useLocation, useNavigate } from 'react-router-dom'

const Auth = () => {
  const location=useLocation();
  const navigate=useNavigate();

  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const handleCloseAuthModal = () => setOpenAuthModal(false);
  const handleOpenAuthModalToSignUp=()=>{
    navigate("/signup");
    setOpenAuthModal(true);
  }
  const handleOpenAuthModalToLogin=()=>{
    navigate("/login");
    setOpenAuthModal(true);
  }
  return (
    <div>
      <Grid className='overflow-y-hidden ' container>
        <Grid className='hidden lg:block' item lg={7}>
          <div className='w-full relative'>
            <img src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png" className='w-full h-screen' alt="" />
            <div className='absolute top-[20vh] left-[40vh]'>
            <svg viewBox="0 0 24 24" height={350} width={300} aria-hidden="true" 
              class="r-4qtqp9 r-yyyyoo r-dnmrzs
              r-bnwqim r-lrvibr r-m6rgpd r-k200y
              r-1nao33i r-5sfk15 r-kzbkwu"><g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 
                11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 
                2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
              </path></g>
            </svg>
            </div>
          </div>        
        </Grid>   
        <Grid className='px-10 mt-5' lg={5} xs={12} >
          <h1 className='font-bold text-5xl'>Happening Now</h1>
          <h1 className='font-bold text-3xl py-16'>Join Twitter Today</h1>
          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin width={330}></GoogleLogin>
              <p className='py-5 text-center'>Or</p>
              <Button onClick={handleOpenAuthModalToSignUp} fullWidth variant='contained' size='large' 
              sx={{borderRadius:'29px', py:'7px'}}>create account</Button>
              <p className='text-sm mt-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptatem dolorum repellat.</p>
            </div>
          </div>
          <h1 className='font-bold text-xl mb-5'>Already have account ?</h1>
          <Button onClick={handleOpenAuthModalToLogin} fullWidth variant='outlined' size='large' 
              sx={{borderRadius:'29px', py:'7px'}}>login
          </Button>
        </Grid>     
        <AuthModal openAuthModal={openAuthModal} handleCloseAuthModal={handleCloseAuthModal}/>
      </Grid>
    </div>

  )
}

export default Auth
