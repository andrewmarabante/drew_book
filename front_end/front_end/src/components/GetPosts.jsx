import { v4 } from "uuid"
import thumbsUp from '../assets/thumbsUp.svg'
import thumbsDown from '../assets/thumbsDown.svg'
import up from '../assets/up.svg'

export default function GetPosts({posts, userList}){

    return(
        <div className="flex flex-col justify-center items-center pt-20 min-h-screen rounded-xl bg-gradient-to-r from-blue-100 to-green-100">
            {posts && posts.map((post) => {
                return(
                    <div key={v4()} className="mb-28 bg-white rounded-2xl shadow-lg w-3/4 h-fit p-10 relative flex flex-col justify-around">
                        {userList.map((user)=>{
                            return(
                                <div key={v4()} className="absolute top-0">{(user._id === post.owner) && <div className="flex justify-start items-center relative -top-5 bg-white rounded-xl"><img src={user.profile_pic} alt="Profile Pic" className="h-14 w-14 rounded-full absolute -left-5 -top-1 border"></img><div className="text-xl border rounded-lg p-2 pl-12 font-extralight shadow-lg pr-5">{user.username}</div></div>}</div>
                            )
                        })}
                        <div className="text-2xl pl-2">{post.title}</div>
                        <div className="flex justify-start overflow-scroll">
                            {post.images.length > 0 && post.images.map(url => {
                                return(
                                    <img key={v4()} src={url} alt="image"  className="h-52 w-auto"/>
                                )
                            })}
                        </div>
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