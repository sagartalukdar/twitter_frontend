import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Modal } from '@mui/material';
import React from 'react'
import Login from './Login';
import { useLocation, useNavigate } from 'react-router-dom';
import Register from './Register';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs:400,
      sm:500
    },
    maxHeight:'90vh',
    position:'relative',
    bgcolor: 'background.paper',
    outline:'none',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius:4
};

const AuthModal = ({openAuthModal,handleCloseAuthModal}) => {
  const location=useLocation();
  const navigate=useNavigate();
  const handleNavigate=()=>{
    const path=location.pathname==="/signup"?"/login":"/signup";
    navigate(path);
  }
  return (
    <div>
     <Modal
        open={openAuthModal}
        onClose={handleCloseAuthModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="hide-scroll-bar overflow-y-auto">
            <IconButton onClick={handleCloseAuthModal} aria-label='delete'>
                <CloseOutlined/>                           
            </IconButton>
            <h1 className='text-center font-bold text-3xl pb-10'>           
              {location.pathname==="/signup"?"create your account":"login your account"}
            </h1>
            {location.pathname==="/signup"?<Register/>:<Login/>}

            <h1 className='text-center font-semibold text-lg text-gray-500 py-5'>
            {location.pathname==="/signup"?"already have account ?":"don't have account ?"}
            </h1>

            <Button fullWidth variant='outlined' onClick={handleNavigate}
             sx={{borderRadius:'29px', py:'15px' }}
            >
            {location.pathname!=="/signup"?"regsiter":"login"}
            </Button>

        </Box>
      </Modal>
    </div>
  )
}

export default AuthModal
