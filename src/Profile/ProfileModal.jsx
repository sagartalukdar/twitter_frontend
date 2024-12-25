import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, updateUser } from '../Store/Auth/Action';
import { uploadToCloudinary } from '../Util/Utils';
import { useParams } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs:400,
    sm:600
  },
  bgcolor: 'background.paper',
  outline:'none',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius:4
};

const validation=Yup.object().shape({
    fullName:Yup.string().required("This field is required !"),
    website:Yup.string().required("This field is required !"),
    location:Yup.string().required("This field is required !"),
    bio:Yup.string().required("This field is required !"),
})


const ProfileModal = ({openProfileModal,handleCloseProfileModal}) => {
    const dispatch=useDispatch();
    const {auth}=useSelector(selector=>selector);

    const [selectedImage,setSelectedImage]=useState("");
    const [selectedBackgroundImage,setSelectedBackgroundImage]=useState("");

    const [uploading,setUploading]=useState(false);

    const handleSubmit=(values,action)=>{
      console.log("edit profile value: ",values);
      dispatch(updateUser(values));
      setSelectedImage("");
      action.resetForm();
      handleCloseProfileModal();
    }

    // console.log(findUser?.fullName,findUser?.website,findUser?.location,findUser?.bio,findUser?.backgroundImage,findUser?.image)
    const formik=useFormik({
        initialValues:{
            fullName:auth.findUser?.fullName,
            website:auth.findUser?.website,
            location:auth.findUser?.location,
            bio:auth.findUser?.bio,
            backgroundImage:auth.findUser?.backgroundImage,
            image:auth.findUser?.image
        },
        enableReinitialize:true,
        onSubmit:handleSubmit,
        validationSchema:validation
    })

    const handleImageChange=async(e)=>{
        setUploading(true);
        const {name}=e.target;
        const file=e.target.files[0];
        if(file){
            const imgUrl=await uploadToCloudinary(file,"image");
            // const imgUrl= URL.createObjectURL(file);
            formik.setFieldValue(name,imgUrl);
            if(name==="image"){
                setSelectedImage(imgUrl);
            }else{
                setSelectedBackgroundImage(imgUrl);
            }
        
            setUploading(false);  
        }else{
            setSelectedBackgroundImage("");
            setSelectedImage("");          
        }
        setUploading(false);

    }

  return (
    <div>
     <Modal
        open={openProfileModal && auth.findUser}
        onClose={handleCloseProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                        <IconButton onClick={handleCloseProfileModal} aria-label='delete'>
                            <CloseOutlined/>                           
                        </IconButton>
                        <p className='text-sm'>Edit Profile</p>
                    </div>
                    <Button type='submit' variant='contained'>
                        save
                    </Button>
                </div>
                <div className="overflow-y-auto overflow-x-hidden h-[70vh] hide-scroll-bar">
                    <React.Fragment>
                        <div className="w-full">
                            <div className="relative">
                                <label htmlFor="backgroundImage">
                                <img 
                                className='w-full h-[12rem] object-center'
                                src={selectedBackgroundImage || auth.findUser?.backgroundImage || "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                                alt="" 
                                />    
                                </label>                              
                                <input type="file" className='hidden' name='backgroundImage' onChange={handleImageChange} id='backgroundImage' />
                            </div>                          
                        </div>
                        <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                            <div className="">

                                <Avatar
                                 src={selectedImage || auth.findUser?.image}
                                 sx={{width:'10rem', height:'10rem', border:'4px solid white'}}
                                />
                          
                                  <input type="file" className='absolute top-0 left-0 w-[10rem] h-[10rem] rounded-full opacity-0 cursor-pointer' name='image' onChange={handleImageChange} id='image' />
                            </div>
                        </div>
                    </React.Fragment>

                    <div className="space-y-3">
                        <TextField
                         fullWidth
                         id='fullName'
                         name='fullName'
                         label='Full Name'
                         value={formik.values.fullName}
                         onChange={formik.handleChange}
                         error={formik.touched.fullName && formik.errors.fullName}
                         helperText={formik.touched.fullName && formik.errors.fullName }
                        />
                        <TextField
                         fullWidth
                         multiline
                         rows={3}
                         id='bio'
                         name='bio'
                         label='Bio'
                         value={formik.values.bio}
                         onChange={formik.handleChange}
                         error={formik.touched.bio && formik.errors.bio}
                         helperText={formik.touched.bio && formik.errors.bio }
                        />    
                        <TextField
                         fullWidth
                         id='website'
                         name='website'
                         label='Website'
                         value={formik.values.website}
                         onChange={formik.handleChange}
                         error={formik.touched.website && formik.errors.website}
                         helperText={formik.touched.website && formik.errors.website }
                        />
                        <TextField
                         fullWidth
                         id='location'
                         name='location'
                         label='Location'
                         value={formik.values.location}
                         onChange={formik.handleChange}
                         error={formik.touched.location && formik.errors.location}
                         helperText={formik.touched.location && formik.errors.location }
                        />
                        <div className="my-3">
                            <p className="text-lg">Birth Date . Edit</p>
                            <p className="text-2xl">{auth.findUser?.birthDate}</p>
                        </div>
                        <p className='text-lg py-3'>Edit Professional Profile</p>
                    </div>

                </div>
            </form>        
        </Box>
      </Modal>
    </div>
  )
}

export default ProfileModal
