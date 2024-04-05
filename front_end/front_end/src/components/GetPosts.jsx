import { v4 } from "uuid"
import thumbsUp from '../assets/thumbsUp.svg'
import thumbsDown from '../assets/thumbsDown.svg'
import up from '../assets/up.svg'

export default function GetPosts({posts, userList}){

    return(
        <div className="flex flex-col justify-center items-center pt-20 min-h-screen rounded-xl bg-gradient-to-r from-blue-100 to-green-100">
            {posts && posts.map((post) => {
                return(
                    <div key={v4()} className="mb-28 bg-white rounded-2xl shadow-lg w-3/4 h-96 p-10 relative flex flex-col justify-around">
                        {userList.map((user)=>{
                            return(
                                <div key={v4()} className="absolute top-0">{(user._id === post.owner) && user.username}</div>
                            )
                        })}
                        <div className="text-2xl pl-2">{post.title}</div>
                        <div className="border rounded-xl h-52 p-2">{post.body}</div>
                        <div className="flex justify-between p-2">
                            <div className="flex gap-1">
                                <img src={thumbsUp} alt="like" className="h-7 hover:bg-blue-100 rounded-lg"/>
                                <img src={thumbsDown} alt="dislike" className="h-7 hover:bg-red-100 rounded-lg"/>
                            </div>
                            <div className="flex">
                                <div className="hover:text-green-700">Comment</div>
                                <img src={up} alt="up" className="h-5"></img>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}