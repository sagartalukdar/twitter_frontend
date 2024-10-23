import { BusinessCenter, CalendarMonth, CalendarViewDay, KeyboardBackspace, LocationCity, LocationOn } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import TweetCard from '../HomeSectionComponent/TweetCard';
import ProfileModal from './ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, followUser } from '../Store/Auth/Action';
import { useEffect } from 'react';
import { findTwitsByLikeContainUser, getAllUserTweets } from '../Store/Twit/Action';

const Profile = () => {
  const {auth,twit}=useSelector(se=>se);
  const dispatch=useDispatch();

  const navigate=useNavigate();
  const handleBack=()=>{
    navigate(-1);
  }

  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  const handleFollowUser=()=>{
    dispatch(followUser(auth.findUser?.id))
  }

  const [tabValue,setTabValue]=useState("1");

  const handleTabChange=(event,newValue)=>{
    setTabValue(newValue);
  }

  const {profileId}=useParams("");
  useEffect(()=>{
    if(profileId){
      dispatch(findUserById(profileId));
  
    }
  },[profileId])

  useEffect(()=>{
    if(auth.findUser){
      dispatch(getAllUserTweets(auth.findUser?.id))
      dispatch(findTwitsByLikeContainUser(auth.findUser?.id))
    }
  },[auth.findUser,twit.likedTwit])

  return (
    <div>
      <section className='z-50 flex items-center sticky top-0 bg-opacity-85 bg-white'>
        <KeyboardBackspace className='cursor-pointer' onClick={handleBack}/>
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Profile page</h1>
      </section>
      <section>
        <img
        className='w-[100%] h-[15rem] object-center'
        src={auth.findUser?.backgroundImage || "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" />
      </section>
      <section className='pl-6'>
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar 
          className='transform -translate-y-24'
          sx={{width:'10rem', height:'10rem', border:'4px solid white'}}
          src={auth.findUser?.image}/>
          {auth.findUser?.req_user ? <Button className='rounded-full' variant='outlined' sx={{borderRadius:'20px'}} onClick={handleOpenProfileModal}>
            edit profile 
          </Button> 
          :
          <Button className='rounded-full' variant='outlined' sx={{borderRadius:'20px'}} onClick={handleFollowUser}>
            {auth.findUser?.followed? 'unfollow':'follow'}
          </Button>}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {auth.findUser?.verified && (
               <img
               className='ml-2 w-5 h-5'
               src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png" alt="" />
            )}          
          </div>
          <h1 className="text-gray-600">@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{auth.findUser?.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenter/>
              <p className="ml-2">Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOn/>
              <p className="ml-2">{auth.findUser?.location}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonth/>
              <p className="ml-2">joined jun 2023</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followers?.length}</span>
              <span className='opacity-60'>followers</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.following?.length}</span>
              <span className='opacity-60'>followings</span>
            </div>
          </div>

        </div>
      </section>

      <section>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="Tweets" value="1" />
              <Tab label="Replies" value="2" />
              <Tab label="Media" value="3" />
              <Tab label="Likes" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {twit.twits?.map((item)=> 
            <TweetCard item={item}/>
            )}
          </TabPanel>
          <TabPanel value="2">
            {twit.twits?.map((item)=>               
                item.replyTwits?.map((item2)=>
                  <TweetCard item={item2}/>
                )              
            )}
          </TabPanel>
          <TabPanel value="3">
           
          </TabPanel>
          <TabPanel value="4">
           {twit.likedTwits?.map((item)=> 
            <TweetCard item={item}/>
            )}   
          </TabPanel>
        </TabContext>
      </Box>
      </section>

      <section>
        <ProfileModal openProfileModal={openProfileModal}  handleCloseProfileModal={handleCloseProfileModal} />
      </section>
    </div>
  )
}

export default Profile
