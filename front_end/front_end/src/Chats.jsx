import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CreateChats from "./components/CreateChats";

export default function Chats(){
    const [showChats, setShowChats] = useState(true);
    const [chatList, setChatList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:3000/chats',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(result => result.json())
        .then(result => {
           setChatList(result.friendList)
           setFriendList(result.friendList)
        })
        .catch(err => console.log(err))
    }, [])

    function toggleChats(){
        if(showChats){
            setShowChats(false)
        }else{
            setShowChats(true)
        }
    }


    return(
        <div>
            <Navbar></Navbar>
            <div className="pl-10 pr-10 h-full">
                <div className="flex justify-around items-center p-10 font-serif pb-5 border-b-2">
                        <div>
                            <button onClick={toggleChats}>Your Chats</button>
                            {showChats && <div className="bg-green-500 h-1"></div>}
                        </div>
                        <div>
                            <button onClick={toggleChats}>Create Chat</button>
                            {!showChats && <div className="bg-green-500 h-1"></div>}
                        </div>
                </div>
                {!showChats && <CreateChats friendList={friendList}></CreateChats>}
            </div>
        </div>
    )
}