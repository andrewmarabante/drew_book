import { useEffect, useState } from "react"
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import { v4 } from "uuid"

export default function CreateChats({friendList}){
    const [userList, setUserList] = useState(null)
    const [recipientIds, setRecipientIds] = useState([])
    const [recipientNames, setRecipientNames] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [chatName, setChatName] = useState('')
    const [reset,setReset] = useState('')

    function addRecipient(friendId, friendUsername){

        if(recipientIds.includes(friendId)){
            return
        }

        const recipientNameList = recipientNames;
        recipientNameList.push(friendUsername)
        const recipientIdList = recipientIds;
        recipientIdList.push(friendId);
        setRecipientNames(recipientNameList)
        setRecipientIds(recipientIdList);
        setReset(v4());
    }

    function toggleShowDetails(){
        if(showDetails){
            setShowDetails(false)
        }else{
            setShowDetails(true)
        }
    }

    function handleChatNameChange(e){
        setChatName(e.target.value)
    }

    function handleSubmit(e){

        const body = {
            users : recipientIds,
            chatName : chatName,
        }

        fetch('http://localhost:3000/chats',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })
        .then(window.location.href='/chats')
        .catch(err => console.log(err))
    }

    return(
        <div className="bg-green-50 flex flex-col justify-start items-center pt-20 h-screen">
            <div className="text-5xl p-10">Create New Chat</div>
            <div className="bg-white rounded-lg shadow-lg w-3/4 h-fit flex flex-col justify-start items-start p-5">
                <div className="flex w-full items-center pr-7">
                    <div className="border border-gray-300 rounded-lg w-full p-2 text-gray-300 flex gap-2 overflow-scroll">
                        {recipientNames.length>0 ? recipientNames.map((name)=>{
                            return(
                                <div key={v4()} className="border rounded-lg text-black p-2">
                                    {name}
                                </div>
                            )
                        }) : 'Recipients: '}
                    </div>
                    <img src={!showDetails ? plus : minus} alt="addOrSub" className="h-12 ml-2 hover:bg-blue-100 rounded-lg" onClick={toggleShowDetails}/>
                </div>
                {friendList && 
                <div className={`${showDetails ? 'flex' : 'hidden'} w-full h-full `}>
                    <div className="border border-gray-300 rounded-lg w-2/3 mt-5 h-5/6 overflow-scroll">
                        {friendList.map((friend)=>{
                            return(
                            <div key={v4()} className="border select-none p-2 rounded-lg text-black ml-5 mr-5 m-2 hover:bg-green-100 overflow-scroll" onClick={()=>{addRecipient(friend._id, friend.username)}}>{friend.username}</div>
                            )
                        })}
                    </div>
                    <div className="border border-gray-300 rounded-lg h-5/6 w-full m-5 p-5 flex flex-col justify-start items-center gap-5">
                        {recipientNames.length === 0 && <div className="text-center text-2xl">Add Friends!</div>}
                        {recipientNames.length >1 && <input type="text" placeholder="Chat Name: " className="border rounded-lg p-2 text-center" value={chatName} onChange={handleChatNameChange}/>}
                        {recipientNames.length === 1 || (recipientNames.length > 1 && chatName) && <button className="border rounded-lg p-2 pr-4 pl-4 hover:bg-blue-50" onClick={handleSubmit}>Create Chat</button>}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}