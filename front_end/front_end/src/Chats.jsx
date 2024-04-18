import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CreateChats from "./components/CreateChats";
import GetChats from "./components/GetChats";

export default function Chats(){
    const [showChats, setShowChats] = useState(true);
    const [chatList, setChatList] = useState(null);
    const [friendList, setFriendList] = useState(null);
    const [user, setUser] = useState(null)
    
    useEffect(()=>{
        fetch('https://drewbook-backend.fly.dev/chats',{
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
            
            const userInfo = result.friendList[result.friendList.length-1]
            result.friendList.pop()
           setUser(userInfo)
           setChatList(result.chatList)
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
            <Navbar title='Chats'></Navbar>
            <div className="pl-10 pr-10 pt-20 h-full bg-cover" style={{backgroundImage: "url('/public/green_background.avif')"}}>
                <div className="flex justify-around items-center p-5 font-serif border-b-2 bg-white rounded-lg mb-5">
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
                {(showChats && chatList) && <GetChats chatList={chatList} friendList={friendList} user={user}></GetChats>}
            </div>
        </div>
    )
}