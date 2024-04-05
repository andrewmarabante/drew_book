import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {v4} from 'uuid'
import GetFriends from "./components/GetFriends";

export default function(){
    const [suggested, setSuggested] = useState(null);

    useEffect(()=>{
        
        fetch('http://localhost:3000/profiles/suggested', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => {
                console.log(result  )
                setSuggested(result)
            })
            .catch(err => console.log(err))


    }, [])
    return(
        <div>
        <Navbar title='Add Friends'></Navbar>
        {suggested && <div className="p-10 pt-20 bg-cover h-screen" style={{backgroundImage: 'url(/public/green_background.avif)'}}>
            <div className="h-5/6">
                <GetFriends list={suggested}></GetFriends>
            </div>
            </div>}
        </div>
    )
}