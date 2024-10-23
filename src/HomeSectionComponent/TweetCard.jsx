import { BarChart, ChatBubbleOutline, Favorite, FavoriteBorder, FavoriteBorderOutlined, FileUpload, MoreHoriz, MoreVert, Repeat, RepeatOutlined } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReplyModal from './ReplyModal';
import { useDispatch } from 'react-redux';
import { deleteTwit, likeTwit, replyTwit, reTwit } from '../Store/Twit/Action';
import { timeOfference } from '../Util/Utils';

const TweetCard = ({item}) => {
    const dispatch=useDispatch();

    const navigate=useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleDelete = () => {
      dispatch(deleteTwit(item?.id))
      handleClose();
    };
    const handleTwitDetails = () => {
      navigate(`/tweet/${item?.id}`);
      handleClose();
    };
    
    const [openReplyModal, setOpenReplyModal] = React.useState(false);
    const handleOpenReplyModal = () => {
      setCurrentTweet(item);
      setOpenReplyModal(true);
    }
    const handleCloseReplyModal = () =>{
      setCurrentTweet(null);
      setOpenReplyModal(false);
    }

    const [currentTweet,setCurrentTweet]=useState(null);

    const handleRetweet=()=>{
      dispatch(reTwit(item.id));
    }

    const handleLike=()=>{
      dispatch(likeTwit(item?.id))
    }

  return (
    <div>
      {item?.retwit && <div className="flex items-center font-semibold text-gray-700 py-2">
        <Repeat/>
        <p>you retweet</p>
      </div>}
      <div className="flex space-x-5">
        <Avatar
        className='cursor-pointer'
        src={item?.user.image}
        alt='user'
        onClick={()=>navigate(`/profile/${item?.user?.id}`)}
        />
        <div className="w-full">
            <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                    <div className="flex flex-col md:flex-row space-x-2 md:space-x-0">
                    <span className='font-semibold'>{item?.user?.fullName}</span>
                    <span className='opacity-70'>@{item?.user?.fullName.split(" ").join("_").toLowerCase()}</span>
                    </div>  
                    <div className='opacity-70 text-start text-sm'>
                      <span>
                      .{timeOfference(item?.createdAt)}
                      </span>
                    </div>
                    {item?.user.verified && <img
                     className='ml-2 w-5 h-5'
                     src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png" alt="" />}
                </div>
                <div>
                <MoreHoriz
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className='cursor-pointer'
                />
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                >
                {item?.user?.req_user ?
                  <div>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                  </div>
                  :
                  <div>
                    <MenuItem onClick={handleTwitDetails}>Details</MenuItem>
                  </div>
                }
                </Menu>
                </div>
            </div>
              
            <div className='mt-2'>
                <div onClick={()=>navigate(`/tweet/${item?.id}`)} className='cursor-pointer'>
                    <p className='text-justify mb-2 p-0'>{item?.content}</p>
                   { item?.image && <img 
                    className='w-full border border-gray-400 p-3 rounded-md' 
                    src={item?.image}
                    alt="" 
                    />}
                    {item?.video &&
                    <video 
                      controls
                      autoPlay={false}
                      className='h-[50vh] object-cover object-center w-full'
                      src={item?.video} alt="" 
                    />
                    }

                </div>
                <div className="py-5 flex flex-wrap justify-between items-center">
                  <div className="space-x-2 flex items-center text-gray-600">
                    <ChatBubbleOutline className='cursor-pointer' onClick={handleOpenReplyModal}/>
                    <p>{item?.totalReplies}</p>
                  </div>
                  <div className={` ${item?.retwit ? "text-pink-500":'text-gray-600'} space-x-2 flex items-center text-gray-600`}>
                    <RepeatOutlined className='cursor-pointer' onClick={handleRetweet}/>
                    <p>{item?.totalRetweets}</p>
                  </div>
                  <div className="space-x-2 flex items-center text-red-600">
                    {!item?.liked ?<FavoriteBorderOutlined className='cursor-pointer' onClick={handleLike}/>
                    : <Favorite className='cursor-pointer' onClick={handleLike}/>
                    }
                    <p>{item?.totalLikes}</p>
                  </div>                
                  <div className="space-x-2 flex items-center text-gray-600">
                    <BarChart className='cursor-pointer'/>
                    <p>14</p>
                  </div>
                  <div className=" text-gray-600">
                    <FileUpload className='cursor-pointer'/>
                  </div>
                </div>
            </div>   

        </div>   
      </div>

      <ReplyModal openReplyModal={openReplyModal} handleCloseReplyModal={handleCloseReplyModal} replyItem={currentTweet}/>

    </div>
  )
}

export default TweetCard
