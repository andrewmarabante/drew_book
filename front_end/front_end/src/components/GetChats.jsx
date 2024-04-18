import { useEffect, useState } from "react";
import { v4 } from "uuid"
import GetMessages from "./GetMessages";

export default function GetChats({chatList, friendList, user, resetChat}){

    const [personalArray, setPersonalArray] = useState(null);
    const [groupArray, setGroupArray] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const [groupUsersArray, setGroupUsersArray] = useState([])

    useEffect(()=>{
        let personal = []
        let group = []
        let groupUsers = []


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
                for(let k = 0; k < chatList[i].users.length; k++){
                    if(!groupUsers.includes(chatList[i].users[k])){
                        groupUsers.push(chatList[i].users[k])
                    }
                }
            }
        }

        //I HAD A FRIEND LIST I PASSED IN WHEN I MADE THIS THE WHOLE DAMN TIME BRO ASDFFADSJKADSBNASDKJVB DSCVKNERINVER
        const body = {
            users : groupUsers
        }
        
        fetch('https://drewbook-backend.fly.dev/chats/group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
              },
            body: JSON.stringify(body),
            credentials: 'include'
        })
        .then(result => result.json())
        .then(result => {
            setGroupUsersArray(result)
        })
        .catch(err => console.log(err))


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

    function goBack(){
        setShowChat(false)
    }
    return(
        <div>
            {!showChat && <div className="flex flex-col justify-center bg-gradient-to-r from-blue-100 to-green-100 h-screen p-10 gap-5 rounded-xl">
                <div className="flex flex-col items-center bg-white rounded-lg h-1/2 shadow-lg overflow-auto w-full font-thin p-2 border relative">
                    <div className="border-b-2 text-2xl p-5 text-center font-serif w-full mb-5 sticky -top-3 bg-white z-10">Group Chats: </div>
                    {groupArray && groupArray.map((chat)=>{

                        let usersArray = []

                        for(let i=0; i < chat.users.length; i++){
                            for(let j=0; j < groupUsersArray.length; j++){
                                if(groupUsersArray[j]._id === chat.users[i]){
                                    usersArray.push(groupUsersArray[j])
                                }
                            }
                        }

                        return(
                            <div key={v4()} className="text-center p-4 text-xl border rounded-lg m-2 hover:bg-green-100 flex flex-col justify-center items-center gap-3 w-full " onClick={()=>openChat(chat)}>
                                <div className='text-3xl border-b-2 text-center w-3/12 pb-2'>{chat.chat_name}</div>
                                <div className="flex justify-center items-center gap-5 overflow-y-hidden overflow-x-auto w-11/12 h-10">
                                    {usersArray.map(user => {
                                        return(
                                            <div key={v4()} className="flex relative border rounded-md items-center">
                                                <img src={user.profile_pic} alt="profile pic" className="h-7 w-7 rounded-full absolute -left-2"/>
                                                <div className="text-sm pl-6 pr-2">{user.username}</div>
                                            </div> 
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg h-1/2 shadow-lg overflow-auto w-full font-thin p-2 border relative">
                    <div className="border-b-2 text-2xl p-5 text-center font-serif w-full mb-5 sticky -top-3 bg-white z-10">Personal Chats: </div>
                    {personalArray && personalArray.map((chat)=>{

                        let otherUser
                        for(let i=0; i < chat.users.length; i++){
                            for(let j=0; j < friendList.length; j++){
                                if(friendList[j]._id === chat.users[i] && friendList[j]._id !== user._id)
                                {
                                    otherUser = friendList[j]
                                }
                            }
                        }

                        return(
                            <div key={v4()} className="text-center p-2 text-xl border rounded-lg m-2 hover:bg-green-100 w-5/6" onClick={()=>openChat(chat)}>
                                <div className="relative flex justify-center items-center gap-2">
                                    <img src={otherUser.profile_pic} alt="profile pic" className="h-10 w-10 rounded-full"/>
                                    <div>{chat.chat_name}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}

            {showChat && <GetMessages chat={currentChat} user={user} toggleReset = {toggleReset} goBack= {goBack}></GetMessages>}
        </div>
    )
}