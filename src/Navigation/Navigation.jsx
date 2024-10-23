import React from 'react'
import { NavigationMenu } from './NavigationMenu'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button } from '@mui/material';
import { MoreHoriz, MoreVert } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../Store/Auth/Action';

const Navigation = () => {
    const navigate=useNavigate();
    const {auth}=useSelector(selectoer=>selectoer);
    const dispatch=useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLogOut = () => {
      handleClose();
      dispatch(logoutAction())
    };

  return (
    <div className='h-screen sticky top-0 overflow-y-auto hide-scroll-bar w-full'>
      <div className="py-5">
      <svg viewBox="0 0 24 24" height={30} width={30} aria-hidden="true" 
       class="r-4qtqp9 r-yyyyoo r-dnmrzs
       r-bnwqim r-lrvibr r-m6rgpd r-k200y
       r-1nao33i r-5sfk15 r-kzbkwu"><g>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 
        11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 
        2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
       </path></g>
      </svg>
      </div>
      <div className="space-y-6">
        {NavigationMenu.map((menu,index)=>(
            <div key={index} 
            onClick={(()=>{menu.title==='Profile'?navigate(`/profile/${auth.user?.id}`):navigate(menu.path)})}
            className='cursor-pointer 
            space-x-3 
            items-center 
            text-center 
            flex'
            >
                {menu.icon}
                <p className="text-xl">{menu.title}</p>
            </div>
        ))}
      </div>
      <div className="py-10">
        <Button sx={{width:'100%', borderRadius:'29px', py:'15px', bgcolor:'#1e88e5', color:'white'}}>
          tweet 
        </Button>
      </div>

      <div className="flex items-center justify-between w-full mb-5">
        <div className="flex items-center space-x-3">
          <Avatar src={auth.user?.image}/>
          <div className="">
            <p>{auth.user?.fullName}</p>
            <span className='opacity-70'>@{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
          </div>     
        </div>
        <div className="">
        <MoreVert
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
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
        </div>
      </div>
    </div>

   
  )
}

export default Navigation
