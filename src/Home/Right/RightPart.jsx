import { Brightness1, Brightness2Outlined, Brightness3Outlined, Light, Lightbulb, LightbulbOutlined, MoreHoriz, Search } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React from 'react'
import SubscriptionModal from '../../HomeSectionComponent/Subscription/SubscriptionModal';

const RightPart = () => {
  const [openSubscriptionModal, setOpenSubscriptionModal] = React.useState(false);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

  const handleChangeTheme=()=>{

  }
  return (
    <div className='py-5 sticky top-0'>
      <div className="relative flex items-center">
        <input type="text" className='outline py-3 rounded-full text-gray-500 w-full pl-12 pr-3' />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <Search className='text-gray-500'/>
        </div>
        <IconButton>
        <LightbulbOutlined className='ml-3 cursor-pointer' onClick={handleChangeTheme}/>
        </IconButton>
      </div>

      <section className='my-5'>
       <h1 className="text-xl font-bold">Get Verified</h1>
       <h1 className="my-2 font-bold opacity-60">subscribe to unlock new features</h1>
       <Button onClick={handleOpenSubscriptionModal} variant='contained' sx={{padding:'10px', paddingX:'20px', borderRadius:'25px'}}>
        get verified
       </Button>
      </section>

      <section className='mt-7 space-y-5'>
       <h1 className="font-bold text-2xl py-1">What's Happening</h1>
       <div>
        <p className="text-sm">fofa woprkls cguop 21024</p>
        <p className="text-sm font-semibold">team a VS team b</p>
       </div>
       {[111,1,1,1,1,1,0].map((item)=>
       (
        <div className="flex justify-between w-full">
        <div>
         <p>Entertainment - Trending</p>
         <p className="font-bold">#hastaggs</p>
         <p>10k tweets</p>
        </div>
        <MoreHoriz/>
        </div>
       )
      )}
      </section>

      <section>
        <SubscriptionModal openSubscriptionModal={openSubscriptionModal} handleCloseSubscriptionModal={handleCloseSubscriptionModal}/>
      </section>

    </div>
  )
}

export default RightPart
