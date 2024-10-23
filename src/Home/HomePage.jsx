import { Grid } from '@mui/material'
import React from 'react'
import Navigation from '../Navigation/Navigation'
import HomeSection from './HomeSection'
import RightPart from './Right/RightPart'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import TweetDetails from '../HomeSectionComponent/TweetDetails'

const HomePage = () => {
  return (
    <Grid container xs={12} className='px-5 lg:px-20 justify-between'>
     <Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative '>
      <Navigation/>
     </Grid>
     <Grid item xs={12} lg={6} className='w-full relative border'>
      <Routes>
        <Route path='/' element={<HomeSection/>}/>
        <Route path='/profile/:profileId' element={<Profile/>}/>
        <Route path='/tweet/:tweetId' element={<TweetDetails/>}/>
      </Routes>
     </Grid>
     <Grid item xs={0} lg={3} className='hidden lg:block w-full relative '>
       <RightPart/>
     </Grid>
    </Grid>
  )
}

export default HomePage
