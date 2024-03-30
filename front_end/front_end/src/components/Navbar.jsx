import * as React from 'react';
  import Box from '@mui/material/Box';
  import Drawer from '@mui/material/Drawer';
  import Button from '@mui/material/Button';
  import List from '@mui/material/List';
  import Divider from '@mui/material/Divider';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import InboxIcon from '@mui/icons-material/MoveToInbox';
  import MailIcon from '@mui/icons-material/Mail';
  import '../index.css'
  import bars from '../assets/bars.svg'
  import Logout from '../assets/logout.svg'
  import Home from '../assets/home.svg'
  import Profile from '../assets/profile.svg'
  import Message from '../assets/message.svg'
  
  export default function Navbar() {
    const [open, setOpen] = React.useState(false);
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 280, fontFamily: 'monospace', padding:'10px'}} role="presentation" onClick={toggleDrawer(false)}>
        <div className='flex hover:bg-green-100 mt-10 rounded-md p-3' onClick={()=>window.location.href = '/'}>
            <img src={Home} alt="Home" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-4xl'>Home</div>
            </div>
        </div>

        <div className='flex hover:bg-green-100 mt-10 rounded-md p-3' onClick={()=>window.location.href = '/profiles'}>
            <img src={Profile} alt="Profile" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-4xl'>Profile</div>
            </div>
        </div>

        <div className='flex hover:bg-green-100 mt-10 mb-10 rounded-md p-3' onClick={()=>window.location.href = '/chats'}>
            <img src={Message} alt="Chat" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-4xl'>Chats</div>
            </div>
        </div>
        <Divider/>

        <div className='flex hover:bg-green-100 mt-10 rounded-md p-3' onClick={()=>window.location.href = '/login'}>
            <img src={Logout} alt="Logout" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-4xl'>Logout</div>
            </div>
        </div>
      </Box>
    );
  
    return (
      <div className='bg-green-100 p-5 flex shadow-lg select-none'>
        <img src={bars} alt='menu' onClick={toggleDrawer(true)} className='h-20 select-none'></img>
        <div className='flex justify-center items-center w-full'>
            <div className='text-6xl text-green-800'>Drewbook</div>
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    );
  }