import { FmdGood, Image, TagFaces, VideoCall, VideocamRounded, VideoFile } from '@mui/icons-material'
import { Avatar, Backdrop, Button, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import TweetCard from '../HomeSectionComponent/TweetCard'
import { useDispatch, useSelector } from 'react-redux'
import { createTwit, getAllTweets } from '../Store/Twit/Action'
import { uploadToCloudinary } from '../Util/Utils'
import EmojiPicker from 'emoji-picker-react'
import { findUserById } from '../Store/Auth/Action'

const validationSchema=Yup.object().shape({
    content:Yup.string().required("Tweet text is required")
})

const HomeSection = () => {
  const [uploading,setUploading]=useState(false);
  const [selectedImage,setSelectedImage]=useState("");
  const [selectedVideo,setSelectedVideo]=useState("");

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
      console.log(values);
      dispatch(createTwit({...values}));
      setSelectedImage("");
      setSelectedVideo("");
      
      setOpenEmojiPicer(false);
      action.resetForm();
    }
    const formik=useFormik({
        initialValues:{
         content:"",
         image:"",
         video:''
        },
        onSubmit:handleSubmit,
        validationSchema
    })


    const handleSelectFile= async (e)=>{
      setSelectedImage("");
      setSelectedVideo("");
      setUploading(false);

      const {name}=e.target;
      const file=e.target.files[0];
      if(file){
        setUploading(true);
        if(name==='image'){  
        //const fileUrl= URL.createObjectURL(file);
         const fileUrl=await uploadToCloudinary(file,'image');
         formik.setFieldValue(name,fileUrl);
         setSelectedImage(fileUrl);  
        }else if(name==='video'){ 
          //const fileUrl= URL.createObjectURL(file);  
        const fileUrl=await uploadToCloudinary(file,'video');
        formik.setFieldValue(name,fileUrl);
        setSelectedVideo(fileUrl); 
        }
      }
      setUploading(false);
    }

    const handleEmojiClick = (event) => {
      const currentContent = formik.values.content || '';  // Safely handle undefined content
      formik.setFieldValue('content', currentContent + event.emoji); // The emoji is in event.emoji
    };

  useEffect(()=>{
    if(auth.user){
      dispatch(findUserById(auth.user?.id));
    }
  },[auth.user])

    useEffect(()=>{
      dispatch(getAllTweets());
    },[])

    useEffect(()=>{
      dispatch(getAllTweets());
    },[twit.likedTwit,twit.reTwit,twit.twit])

  return (
    <>
    <div className='space-y-5 w-full px-6'>
      <section>
        <h1 className="py-5 text-xl font-bold opacity-80">Home</h1>
      </section>
      <section className={`pb-10 border border-gray-400 p-3 rounded-md w-full`}>
        <div className='flex space-x-5'>
        <Avatar src={auth.user?.image}/>
        <div className="w-full">
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
           {selectedImage && <div className='pt-5'>
              <img src={selectedImage} alt="" />
            </div>}
            {selectedVideo && <div className='pt-5'>
              <video 
                controls
                autoPlay
                className='h-[50vh] object-cover object-center w-full'
                src={selectedVideo} alt="" 
              />
            </div>}

            <div className="flex justify-between items-center mt-5">
              <div className="flex space-x-5 items-center text-[#1d9bf0] ">
                <label className='cursor-pointer' htmlFor="imageFile">
                <Image className='text-[#1d9bf0]' />             
                </label>
                <input id='imageFile' type="file" name='image' className='hidden' onChange={handleSelectFile} />

                <label className='cursor-pointer' htmlFor="videoFile">
                <VideocamRounded/>           
                </label>
                <input id='videoFile' type="file" name='video' className='hidden' onChange={handleSelectFile} />
                <FmdGood/>
                <div className='relative'>
                   <TagFaces className='cursor-pointer' onClick={()=>setOpenEmojiPicer(!openEmojiPicer)}/> 
                   <div ref={emojiPickerRef} className='absolute top-8 -left-40 md:left-0 z-50'>
                     {openEmojiPicer && <EmojiPicker onEmojiClick={handleEmojiClick} />}
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
                  tweet
                </Button>
              </div>
            </div>
          </form>
        </div>
        </div>
      </section>
      <section>
        {twit.twits?.map((item)=>
        <TweetCard item={item}/>
        )}
      </section>
    
    </div>

    <Backdrop open={uploading} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
    <CircularProgress color='inherit'/>
    </Backdrop>  
    </>
  )
}

export default HomeSection
