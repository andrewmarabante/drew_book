import * as React from 'react';
  import Box from '@mui/material/Box';
  import Drawer from '@mui/material/Drawer';
  import Divider from '@mui/material/Divider';
  import '../index.css'
  import bars from '../assets/bars.svg'
  import Logout from '../assets/logout.svg'
  import Home from '../assets/home.svg'
  import Profile from '../assets/profile.svg'
  import Message from '../assets/message.svg'
  import addFriend from '../assets/addFriend.svg'
  
  export default function Navbar({title}) {
    const [open, setOpen] = React.useState(false);
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    function handleLogout(){

      fetch('http://localhost:3000/login/logout',{
        method: 'GET',
        credentials: 'include'
    })
    .then(window.location.href = '/login')
    .catch(err => console.log(err))
    
    }
  
    const DrawerList = (
      <Box sx={{ width: 280, fontFamily: 'monospace', padding:'10px'}} role="presentation" onClick={toggleDrawer(false)}>
        <div className='flex hover:bg-green-100 mt-10 rounded-md p-3' onClick={()=>window.location.href = '/'}>
            <img src={Home} alt="Home" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-2xl'>Posts</div>
            </div>
        </div>

        <div className='flex hover:bg-green-100 mt-10 rounded-md p-3' onClick={()=>window.location.href = '/profiles'}>
            <img src={Profile} alt="Profile" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-2xl'>Profile</div>
            </div>
        </div>

        <div className='flex hover:bg-green-100 mt-10 mb-10 rounded-md p-3' onClick={()=>window.location.href = '/chats'}>
            <img src={Message} alt="Chat" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-2xl'>Chats</div>
            </div>
        </div>

        <div className='flex hover:bg-green-100 mt-10 mb-10 rounded-md p-3' onClick={()=>window.location.href = '/addFriends'}>
            <img src={addFriend} alt="Chat" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-2xl'>Add Friends</div>
            </div>
        </div>
        <Divider/>

        <div className='flex hover:bg-green-100 mt-10 rounded-md p-3' onClick={handleLogout}>
            <img src={Logout} alt="Logout" className='h-14'/>
            <div className='w-full flex justify-start items-center pl-5'>
                <div className='text-2xl'>Logout</div>
            </div>
        </div>
      </Box>
    );
  
    return (
      <div className='bg-green-100 p-10 flex shadow-lg select-none relative bg-gradient-to-b from-green-100 to-blue-100'>
        <img src={bars} alt='menu' onClick={toggleDrawer(true)} className='h-24 select-none absolute top-5 left-8'></img>
        <div className='flex justify-center items-center w-full'>
            <div className='text-6xl font-serif'>{title}</div>
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    );
  }