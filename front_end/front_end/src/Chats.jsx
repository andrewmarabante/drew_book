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
        fetch('http://localhost:3000/chats',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(result => result.json())
        .then(result => {
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
            <div className="pl-10 pr-10 pt-5 h-full bg-cover" style={{backgroundImage: "url('/public/green_background.avif')"}}>
                <div className="flex justify-around items-center p-10 font-serif pb-5 border-b-2 bg-white rounded-lg mb-5">
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