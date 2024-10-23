import { KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TweetCard from './TweetCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTwitsById } from '../Store/Twit/Action';

const TweetDetails = () => {
    const navigate=useNavigate();
    const handleBack=()=>{
      navigate(-1);
    }

    const dispatch=useDispatch();
    const {twit}=useSelector(se=>se);
    const {tweetId}=useParams("");
    useEffect(()=>{
      if(tweetId){
        dispatch(findTwitsById(tweetId));
      }
    },[])

    useEffect(()=>{
        dispatch(findTwitsById(tweetId));
    },[twit.reTwit,twit.likedTwit])

  return (
    <div className=' px-6'>
      <section className='z-50 flex items-center sticky top-0 bg-opacity-85 bg-white'>
        <KeyboardBackspace className='cursor-pointer' onClick={handleBack}/>
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">tweet details</h1>
      </section>
      <section>
        <TweetCard item={twit.twit}/>
        <Divider sx={{margin:'2rem 0rem'}}/>
      </section>
      <section>
        {twit.twit?.replyTwits?.map((item)=>
        <TweetCard item={item}/>
        )}
      </section>
      
    </div>
  )
}

export default TweetDetails
