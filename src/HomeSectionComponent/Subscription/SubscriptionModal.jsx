import { CloseOutlined, FiberManualRecord } from '@mui/icons-material';
import { Box, IconButton, Modal } from '@mui/material'
import React, { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs:400,
      sm:700
    },
    height:'95vh',
    position:'relative',
    bgcolor: 'background.paper',
    outline:'none',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius:4
};

const SubscriptionModal = ({openSubscriptionModal,handleCloseSubscriptionModal}) => {
    const [plan,setPlan]=useState("Annually")
    const features=[ 
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, repellendus sequi. Atque." ,
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores alias animi error expedita.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum dicta laborum alias. Eligendi, dolorum architecto commodi expedita culpa quo sed quaerat atque veritatis."
    ]
  return (
    <div>
      <Modal
        open={openSubscriptionModal}
        onClose={handleCloseSubscriptionModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div>
                <IconButton onClick={handleCloseSubscriptionModal} aria-label='delete'>
                    <CloseOutlined/>                           
                </IconButton>
            </div>
            <div className="flex justify-center py-5 h-[70vh] hide-scroll-bar overflow-y-scroll">
                <div className="w-[80%] space-y-10">
                    <div className="p-5 bg-gray-200 rounded-md flex items-center justify-between shadow-lg">
                        <h1 className="text-xl pr-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus accusantium perferendis, nesciunt nulla eaque vero eligendi!</h1>
                        <img
                        className='w-24 h-24'
                        src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png" alt="" />
                    </div>
                    <div className="flex justify-between border border-gray-400 rounded-full px-5 py-3">
                        <div>
                         <span onClick={()=>setPlan("Annually")} className={`${plan==="Annually"?'text-black':'text-gray-400'} cursor-pointer font-semibold`}>Annually</span>
                         <span className='ml-3 text-sm text-green-600 font-semibold'>save 12%</span>
                        </div>
                        <p onClick={()=>setPlan("Monthly")} className={`${plan==="Monthly"?'text-black':'text-gray-400'} cursor-pointer font-semibold`}>
                            Monthly
                        </p>
                    </div>
                    <div className="space-y-3">
                      {features.map((item)=>
                        <div className="flex items-center space-x-5">
                        <FiberManualRecord sx={{width:'10px', height:'10px'}}/>
                        <p className='text-sm'>{item}</p>
                      </div>
                      )}
                    </div>
                    <div className='flex justify-center items-center bg-gray-900 cursor-pointer text-white rounded-full px-5 py-3  '>
                      <span className={`${plan==="Monthly"&&'line-through'} italic`}>$ 114/year</span>
                      <span className={`${plan==="Annually"&&'line-through'} px-5`}> $42/Month</span>
                    </div>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  )
}

export default SubscriptionModal
