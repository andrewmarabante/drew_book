import { useEffect, useState } from "react";
import { v4 } from "uuid"
import GetMessages from "./GetMessages";

export default function GetChats({chatList, friendList, user, resetChat}){

    const [personalArray, setPersonalArray] = useState(null);
    const [groupArray, setGroupArray] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(()=>{
        let personal = []
        let group = []
        for(let i=0; i<chatList.length; i++)
        {   
            if(chatList[i].users.length === 2)
            {
                let otherUserId;
                if(chatList[i].users[0] === user._id)
                {
                    otherUserId = chatList[i].users[1]
                }else{
                    otherUserId = chatList[i].users[0]
                }

                for(let j=0; j<friendList.length;j++)
                {
                    if(friendList[j]._id === otherUserId)
                    {
                        chatList[i].chat_name = friendList[j].username
                        personal.push(chatList[i])
                    }
                }
                
            }else if(chatList[i].users.length > 2){
                group.push(chatList[i])
            }
        }
        

        setPersonalArray(personal)
        setGroupArray(group)
    }, [])

    function openChat(chat){
        setShowChat(true)
        setCurrentChat(chat)
    }

    function toggleReset(){
        resetChat()
    }
    return(
        <div>
            {!showChat && <div className="flex justify-around bg-green-100 h-screen p-10">
                <div className="flex flex-col bg-white rounded-lg m-5 h-1/2 shadow-lg overflow-scroll w-2/6 font-thin p-2 border">
                    <div className="border-b-2 text-2xl p-5 text-center">Group Chats: </div>
                    {groupArray && groupArray.map((chat)=>{
                        return(
                            <div key={v4()} className="text-center p-2 text-xl border rounded-lg m-2 hover:bg-green-100" onClick={()=>openChat(chat)}>{chat.chat_name}</div>
                        )
                    })}
                </div>
                <div className="flex flex-col bg-white rounded-lg m-5 h-1/2 shadow-lg overflow-scroll w-2/6 font-thin p-2 border">
                    <div className="border-b-2 text-2xl p-5 text-center">Personal Chats: </div>
                    {personalArray && personalArray.map((chat)=>{
                        return(
                            <div key={v4()} className="text-center p-2 text-xl border rounded-lg m-2 hover:bg-green-100" onClick={()=>openChat(chat)}>{chat.chat_name}</div>
                        )
                    })}
                </div>
            </div>}

            {showChat && <GetMessages chat={currentChat} user={user} toggleReset = {toggleReset}></GetMessages>}
        </div>
    )
}