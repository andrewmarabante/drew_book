import { useEffect, useState } from "react"
import send from '../assets/send.svg'
import back from '../assets/back.svg'
import { v4 } from "uuid"
import trash from '../assets/trash.svg'
import x from '../assets/x.svg'


export default function LoadChat({chat, user, toggleReset, goBack}){
    const [message, setMessage] = useState('')
    const [showDelete, setShowDelete] = useState(false);
    const [reset, setReset] = useState(null)
    let timer;


    function handleTextChange(e){
        if(e.nativeEvent.inputType === 'insertLineBreak'){
            sendMessage()
        }
        setMessage(e.target.value)
    }

    function sendMessage(){

        const messageId = v4();

        chat.messages.push({
            message: message,
            sender : user._id,
            id : messageId
        })
        setTimeout(()=>{const element = document.getElementById('messageContainer')
        element.scrollTop = element.scrollHeight}, 200)

        if(message === ''){
            return
        }

        const data = {
            chatId : chat._id,
            message : message,
            sender : user._id,
            id : messageId
        }

        fetch('https://drewbook-backend.fly.dev/chats', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => {
                setMessage('')
            })
            .catch(err => console.log(err))

    }

    function handleMouseDown(){
        timer = setTimeout(()=>{setShowDelete(true)}, 500)
    }

    function handleMouseUp(){
        clearTimeout(timer)
    }

    function closeDelete(e){
        if(showDelete && e.target.alt !== 'delete'){
            setShowDelete(false)
        }
    }

    function handleDelete(messageId){


        for(let i=0; i < chat.messages.length; i++){
            if(chat.messages[i].id === messageId){
                chat.messages.splice(i, 1);
                setReset(v4())
            }
        }
        
        const data = {
            messageId : messageId
        }

        fetch('https://drewbook-backend.fly.dev/chats', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .catch(err => console.log(err))

       

    }
    return(
        <div className="bg-gradient-to-r from-blue-100 to-green-100 h-screen w-full flex justify-center items-center">
            <div onClick={closeDelete} className="h-3/4 w-3/4 bg-white flex flex-col border rounded-2xl relative p-2">
            <img src={x} alt="back" className="h-10 m-2 bg-red-200 rounded-full absolute -top-5 -right-5 z-30" onClick={goBack}></img>
                <div className="text-black w-full mb-2 relative overflow-scroll pb-5 overflow-y-auto h-full" id="messageContainer">
                    {chat && chat.messages.map(message => {
                        return(
                        <div key={v4()} className={`flex p-0 ${message.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`relative border rounded-md text-black p-3 mr-5 ml-5 mt-5 w-fit max-w-60 shadow-md select-none ${message.sender === user._id ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-50 hover:bg-gray-100'}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>{message.message}
                           {showDelete && <img src={trash} alt="delete" className="h-5 bg-white rounded-full border p-0.5 absolute -top-2 -right-2 hover:bg-red-200" onClick={()=>handleDelete(message.id)}></img>}
                            </div>
                        </div>)
                    })}
                </div>
                <div className="flex h-40 items-center">
                <textarea
                    className="w-full border rounded-xl pl-3 h-24 p-2 mr-3"
                    placeholder="Enter Message"
                    value={message}
                    onChange={handleTextChange}
                    rows={1}
                    />
                    <div className="flex flex-col ">
                        <img src={send} alt="send" className="h-20 hover:bg-blue-100 rounded-lg" onClick={sendMessage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}