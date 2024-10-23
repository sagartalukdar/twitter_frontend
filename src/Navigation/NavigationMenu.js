import { AccountCircle, Explore, Group, ListAltOutlined, Message, More, NotificationsActive, Verified } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

export const NavigationMenu=[
  {
    title:"Home",
    icon:<HomeIcon/>,
    path:"/"
  },
  {
    title:"Explore",
    icon:<Explore/>,
    path:"/explore"
  },
  {
    title:"Notifications",
    icon:<NotificationsActive/>,
    path:"/notification"
  },
  {
    title:"Messages",
    icon:<Message/>,
    path:"/message"
  },
  {
    title:"Lists",
    icon:<ListAltOutlined/>,
    path:"/lists"
  },
  {
    title:"Communities",
    icon:<Group/>,
    path:"/community"
  },
  {
    title:"Verified",
    icon:<Verified/>,
    path:"/verification"
  },
  {
    title:"Profile",
    icon:<AccountCircle/>,
    path:"/profile"
  },
  {
    title:"More",
    icon:<More/>,
    path:"/more"
  },
  
]