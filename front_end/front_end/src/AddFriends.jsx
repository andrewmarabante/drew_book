import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {v4} from 'uuid'
import addFriend from './assets/addFriend.svg'

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
                setSuggested(result)
            })
            .catch(err => console.log(err))


    }, [])
    return(
        <div>
        <Navbar title='Add Friends'></Navbar>
        <div className="p-10 pt-20 bg-cover" style={{backgroundImage: 'url(/public/green_background.avif)'}}>
            <div className="h-screen bg-green-100 flex justify-center items-center rounded-2xl">
                <div className="h-4/5 w-4/5 rounded-2xl bg-white shadow-lg flex flex-col justify-center items-center overflow-scroll pt-60 pb-16">
                    {suggested && suggested.map((suggested) => {
                        return(
                            <div key={v4()} className="flex justify-start border rounded-2xl w-1/2 relative shadow-xl m-7">
                                <img src={suggested.profile_pic} alt="Profile Pic" className="h-20 w-20 rounded-full border absolute -left-6 -top-2 border-black"/>
                                <div className="w-fit text-center text-4xl font-thin p-3 pl-20">{suggested.username}</div>
                                <img src={addFriend} alt="Add" className="h-7 p-1 border rounded-full border-black absolute -right-1 -top-2 bg-green-100 hover:bg-blue-100" onClick={()=>window.location.href = `/profiles?id=${suggested._id}`}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </div>
    )
}