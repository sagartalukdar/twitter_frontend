import { FmdGood, Image, TagFaces, VideocamRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Modal } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { replyTwit } from '../Store/Twit/Action';
import EmojiPicker from 'emoji-picker-react';
import { uploadToCloudinary } from '../Util/Utils';

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

const validationSchema=Yup.object().shape({
    content:Yup.string().required("Reply text is required")
})

const ReplyModal = ({openReplyModal,handleCloseReplyModal,replyItem}) => {
  const navigate=useNavigate();
  const [uploadingReply,setUploadingReply]=useState(false);
  const [selectedReplyImage,setSelectedReplyImage]=useState("");
  const [selectedReplyVideo,setSelectedReplyVideo]=useState("");

  const [openEmojiPicer,setOpenEmojiPicer]=useState(false);
  const emojiPickerRef = useRef(null);
  // close emojipicker when outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setOpenEmojiPicer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);


  const dispatch=useDispatch();
  const {twit,auth}=useSelector(selector=>selector);

  const handleSubmit=(values,action)=>{
    console.log("reply values",values);
    dispatch(replyTwit(values));
    action.resetForm();

    setSelectedReplyImage("");
    setSelectedReplyVideo("");
    setUploadingReply(false);

    setOpenEmojiPicer(false);
    handleCloseReplyModal();
  }
  const formik=useFormik({
    initialValues:{
     content:"",
     image:"",
     video:'',
     twitId:replyItem?.id
    },
    enableReinitialize:true,
    onSubmit:handleSubmit,
    validationSchema
})


useEffect(()=>{
  if(replyItem){
    formik.setFieldValue('twitId',replyItem?.id);
  }
},[replyItem])

const handleEmojiClick = (event) => {
    const currentContent = formik.values.content || '';  // Safely handle undefined content
    formik.setFieldValue('content', currentContent + event.emoji); // The emoji is in event.emoji
  };

const handleSelectReplyFile= async (e)=>{
  setSelectedReplyImage("");
  setSelectedReplyVideo("");
  setUploadingReply(false);

  const {name}=e.target;
  const file=e.target.files[0];
  if(file){
    setUploadingReply(true);
    if(name==='imageReply'){  
    //const fileUrl= URL.createObjectURL(file);
     const fileUrl=await uploadToCloudinary(file,'image');
     formik.setFieldValue('image',fileUrl);
     setSelectedReplyImage(fileUrl);  
    }else if(name==='videoReply'){ 
      //const fileUrl= URL.createObjectURL(file);  
    const fileUrl=await uploadToCloudinary(file,'video');
    formik.setFieldValue('video',fileUrl);
    setSelectedReplyVideo(fileUrl); 
    }
  }
  setUploadingReply(false);
}

  return (
    <div>
      <Modal
        open={openReplyModal && replyItem}
        onClose={handleCloseReplyModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="flex space-x-5">
                <Avatar
                className='cursor-pointer'
                src={replyItem?.user.image}
                alt='user'
                onClick={()=>navigate(`/profile/${25}`)}
                />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex cursor-pointer items-center space-x-2">
                            <div className="flex flex-col md:flex-row">
                            <span className='font-semibold'>{replyItem?.user.fullName}</span>
                            <span className='opacity-70 ml-2'>@{replyItem?.user?.fullName.split(" ").join("_").toLowerCase()} .2m</span>
                            </div>
                            <img
                            className='ml-2 w-5 h-5'
                            src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png" alt="" />
                        </div>                        
                    </div>
                    
                    <div className='mt-2'>
                        <div onClick={()=>navigate(`/tweet/${1}`)} className='cursor-pointer'>
                            <p className='text-justify mb-2 p-0'>{replyItem?.content}</p>
                           
                        </div>                        
                    </div>   

                </div>   
            </div>
            <section className='py-5'>
            <div className='flex space-x-5'>
                <Avatar src={auth.user?.image} alt='user'/>
                <div className="w-full relative">
                <form onSubmit={formik.handleSubmit}>
                    <div className='w-full'>
                        <input type="text" name='content' placeholder='what`s happening'
                        className='border-none outline-none text-xl bg-transparent w-full'
                        {...formik.getFieldProps("content")}              
                        />
                        {formik.errors.content && formik.touched.content && (
                        <p className='text-sm text-red-600'>{formik.errors.content}</p>
                        )}
                    </div>
                    
                    {selectedReplyImage && <div className='pt-5'>
                      <img 
                        height={100}
                        width={50}
                        className='absolute top-10 left-80'
                        src={selectedReplyImage} alt="" 
                      />
                    </div>}
                    {selectedReplyVideo && <div className='pt-5'>
                      <video 
                        controls
                        autoPlay
                        className='h-[25vh] w-full'
                        src={selectedReplyVideo} alt="" 
                      />
                    </div>}

                    <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center text-[#1d9bf0]">
                      <label className='cursor-pointer' htmlFor="imageReplyFile">
                      <Image className='text-[#1d9bf0]' />             
                      </label>
                        <input id='imageReplyFile' type="file" name='imageReply' className='hidden' onChange={handleSelectReplyFile} />

                      <label className='cursor-pointer' htmlFor="videoReplyFile">
                        <VideocamRounded/>           
                      </label>
                      <input id='videoReplyFile' type="file" name='videoReply' className='hidden' onChange={handleSelectReplyFile} />
                        <FmdGood/>
                        <div className='relative'>
                            <TagFaces className='cursor-pointer' onClick={()=>setOpenEmojiPicer(!openEmojiPicer)}/> 
                            <div ref={emojiPickerRef} className='absolute bottom-20 -left-40 md:left-0 z-50'>
                                {openEmojiPicer && <EmojiPicker height={333} onEmojiClick={handleEmojiClick} />}
                            </div>                  
                        </div>
                    </div>
                    <div>
                        <Button 
                        type='submit'
                        sx={{
                        borderRadius:'29px', 
                        px:'20px',
                        py:'8px', 
                        bgcolor:'#1e88e5', 
                        color:'white'
                        }}>
                        reply
                        </Button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </section>
        </Box>
      </Modal>
    </div>
  )
}

export default ReplyModal
