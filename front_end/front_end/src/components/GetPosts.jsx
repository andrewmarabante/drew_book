import { v4 } from "uuid"
import thumbsUp from '../assets/thumbsUp.svg'
import thumbsDown from '../assets/thumbsDown.svg'
import up from '../assets/up.svg'
import down from '../assets/down.svg'
import { useEffect, useState } from "react"
import x from '../assets/x.svg'

export default function GetPosts({posts, userList, toggleReset, isUser}){
    const[showComment, setShowComment] = useState('');

    function toggleComments(postId){

        if(showComment === postId){
            setShowComment('')
        }else{
            setShowComment(postId)
        }
    }

    function handleEmote(emote, postId){
        

        const data = {
            emote : emote,
            postId : postId
        }

        

        fetch('https://drewbook-backend.fly.dev/likes',{
            method: 'POST',
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
            toggleReset();
        })
        .catch(err => console.log(err))
    }

    function deletePost(postId){

        const data = {
            postId : postId
        }

        fetch('https://drewbook-backend.fly.dev/',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(toggleReset())
        .catch(err => console.log(err))
    }

    return(
        <div className="flex flex-col justify-start items-center pt-20 min-h-screen rounded-xl bg-gradient-to-r from-blue-100 to-green-100">
            
            {(posts && posts.length === 0 && isUser) && <div className="bg-white rounded-2xl shadow-lg w-3/4 p-10 text-center">You Have No Posts! Make One!</div>}
            {(posts && posts.length === 0 && !isUser) && <div className="bg-white rounded-2xl shadow-lg w-3/4 p-10 text-center">No Friend Posts!</div>}
            {posts && posts.map((post) => {


                function sendComment(e)
                {
                   if(e.key === 'Enter' && e.target.value !== '')
                   {
                    const body = {
                        postId : post._id,
                        comment : e.target.value
                    }

                        fetch('https://drewbook-backend.fly.dev/comment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json', 
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': '*',
                              },
                            body: JSON.stringify(body),
                            credentials: 'include'
                        })
                        .then(() => {
                            toggleReset()
                            setTimeout(()=>{
                            let commentBox = document.getElementById('commentBox')
                            commentBox.scrollTop = commentBox.scrollHeight}, 500)
                        })
                        .catch(err => console.log(err))

                   }
                }


                return(
                    <div key={v4()} className="mb-28 bg-white rounded-2xl shadow-lg w-3/4 h-fit p-10 relative flex flex-col justify-around">
                        {isUser && <img src={x} alt="x" className="h-10 absolute top-2 right-2 hover:bg-red-100 rounded-lg" onClick={()=>deletePost(post._id)}></img>}
                        {userList.map((user)=>{
                            return(
                                <div key={v4()} className="absolute top-0">{(user._id === post.owner) && <div className="flex justify-start items-center relative -top-5 bg-white rounded-xl"><img src={user.profile_pic} alt="Profile Pic" className="h-14 w-14 rounded-full absolute -left-5 -top-1 border"></img><div className="text-xl border rounded-lg p-2 pl-12 font-extralight shadow-lg pr-5">{user.username}</div></div>}</div>
                            )
                        })}
                        <div className="text-2xl pl-2 pb-2">{post.title}</div>
                        {post.images.length > 0 && <div className="flex justify-start gap-5 p-5 border rounded-xl mb-2 overflow-x-auto h-fit">
                            {post.images.map(url => {
                                return(
                                    <img key={v4()} src={url} alt="image"  className={`${showComment ? 'h-10' : 'h-52'} w-auto rounded-lg`}/>
                                )
                            })}
                        </div>}
                        {(showComment !== post._id) && <div className={`rounded-xl ${post.images.length > 0 ? 'h-fit pl-4 font-extralight text-sm' : 'h-52 border p-2'}`}>{post.body}</div>}
                        {(showComment === post._id) && <div className="border h-48 rounded-xl flex flex-col p-1">
                            <div id="commentBox" className="w-full h-full overflow-y-auto p-2">
                                {post.comments.map(comment => {
                                    return(
                                        <div key={v4()} className="h-fit w-full border rounded-xl relative min-h-16 mb-5">
                                            <div className="relative pl-7 border rounded-lg w-fit pr-2 border-blue-200 -top-1 -left-1 bg-white">
                                                <img src={comment.senderPic} alt="profile pic" className="h-7 rounded-full absolute -top-1 -left-1 border border-green-200"></img>
                                                <div className="font-thin text-sm">{comment.senderName}</div>
                                            </div>
                                            <div className="ml-2">{comment.body}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <input className="w-full h-14 border rounded-xl pl-3 shadow-lg" placeholder="Comment" onKeyDown={sendComment} rows={1}/>
                            </div>}
                        <div className="flex justify-between p-2">
                            <div className="flex gap-1 relative">
                                <img src={thumbsUp} alt="like" className="h-7 hover:bg-blue-100 rounded-lg" onClick={()=>handleEmote('like', post._id)}/>
                                <img src={thumbsDown} alt="dislike" className="h-7 hover:bg-red-100 rounded-lg" onClick={()=>handleEmote('dislike', post._id)}/>
                                <div className="absolute text-xs font-normal -bottom-3 left-0">{post.likes.length}</div>
                                <div className="absolute text-xs font-normal -bottom-3 right-0">{post.dislikes.length}</div>
                            </div>
                            <div className="flex">
                                <div className="hover:text-green-700" onClick={()=>toggleComments(post._id)}>Comments</div>
                                {(showComment !== post._id) && <img src={up} alt="up" className="h-5"></img>}
                                {(showComment === post._id) && <img src={down} alt="down" className="h-5"></img>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}