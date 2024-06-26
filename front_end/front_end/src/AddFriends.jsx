import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {v4} from 'uuid'
import GetFriends from "./components/GetFriends";

export default function(){
    const [suggested, setSuggested] = useState(null);

    useEffect(()=>{
        
        fetch('https://drewbook-backend.fly.dev/profiles/suggested', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => {
                if(result === '401' || result === '403'){
                    window.location.href = '/login'
                }
                setSuggested(result)
            })
            .catch(err => console.log(err))


    }, [])
    return(
        <div>
        <Navbar title='Add Friends'></Navbar>
        {suggested && <div className="p-10 pt-20 bg-cover h-screen" style={{backgroundImage: 'url(/public/green_background.avif)'}}>
            <div className="h-5/6">
                <GetFriends list={suggested} profile={false}></GetFriends>
            </div>
            </div>}
        </div>
    )
}