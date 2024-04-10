import { useEffect, useState } from "react";
import LoadProfile from "./components/LoadProfile";
import Navbar from "./components/Navbar";
import { useLocation } from 'react-router-dom';

export default function Profiles(){
    
    const [friends, setFriends] = useState([]);

    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const id = params.get('id');

    useEffect(()=>{

        fetch(`http://localhost:3000/profiles/:${id && id}/friends`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(result => result.json())
                .then(result => {
                    if(result === '401' || result === '403'){
                        window.location.href = '/login'
                    }
                    setFriends(result)
                })
                .catch(err => console.log(err))
    },[])

    return(
        <div>
            <Navbar title='Profile'></Navbar>
            <div className="p-10 min-h-screen bg-cover" style={{backgroundImage: "url('/public/green_background.avif')"}}>
                <LoadProfile id={id} friends={friends}></LoadProfile>
            </div>
        </div>
    )
}