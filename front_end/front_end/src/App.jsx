import { useEffect, useState } from "react"
import Navbar from "./components/Navbar.jsx"
import GetPosts from "./components/GetPosts.jsx"

export default function App(){
    const[userPostsArray, setUserPostsArray] = useState(null)
    const[friendsPostsArray, setFriendspostsArray] = useState(null)
    const[userList, setUserList] = useState(null)

    const [userPosts, setUserPosts] = useState(false)
    const [friendPosts, setFriendPosts] = useState(true)
    const [createPost, setCreatePost] = useState(false)

    useEffect(()=>{

        fetch('http://localhost:3000/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then(result => result.json())
            .then(result => {
                setUserPostsArray(result.userPosts);
                setFriendspostsArray(result.friendsPosts);
                setUserList(result.friendList)
            })
            .catch(err => console.log(err))
    }, [userPosts, friendPosts])

    function togglePosts(type){
        if(type === 'user'){
            setFriendPosts(false)
            setCreatePost(false)
            setUserPosts(true)
        }else if(type === 'friend'){
            setCreatePost(false)
            setUserPosts(false)
            setFriendPosts(true)
        }else if(type === 'create'){
            setUserPosts(false)
            setFriendPosts(false)
            setCreatePost(true)
        }}

        function submitPost(e){
            e.preventDefault();
            const title = e.target.title.value
            const formBody = e.target.body.value

            const body = {
                title : title,
                body : formBody
            }

            fetch('http://localhost:3000/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            })
            .then(togglePosts('user'))
            .catch(err => console.log(err))


        }

    return(
        <div className="min-h-screen bg-cover" style={{backgroundImage: "url('/public/green_background.avif')"}}>
            <Navbar title='Posts'></Navbar>
            <div className="pl-10 pr-10 pt-5 h-full">
                <div className="flex justify-around items-center p-5 font-serif border bg-white rounded-xl mb-5">
                    <div>
                        <button onClick={()=>{togglePosts('user')}}>Your Posts</button>
                        {userPosts && <div className="bg-green-500 h-1"></div>}
                    </div>
                    <div>
                        <button onClick={()=>{togglePosts('friend')}}>Friend Posts</button>
                        {friendPosts && <div className="bg-green-500 h-1"></div>}
                    </div>
                    <div>
                        <button onClick={()=>{togglePosts('create')}}>Create Post</button>
                        {createPost && <div className="bg-green-500 h-1"></div>}
                    </div>
                </div>
                {createPost && <div className="h-full p-10 bg-green-50 min-h-screen rounded-xl bg-gradient-to-r from-green-100 to-blue-100">
                    <form className="w-full h-full flex flex-col items-center" onSubmit={submitPost}>
                        <div className="text-left w-3/4">Title:</div>
                        <input type="text" className="border block w-3/4 m-1 pl-2 rounded-lg p-1" name="title"/>
                        <div className="w-3/4 text-left">Body:</div>
                        <textarea className="border h-2/6 w-3/4 m-1 mb-5 rounded-lg p-2" name="body"></textarea>
                        <button type="submit" className="border w-2/6 p-2 hover:bg-green-50 rounded-lg">Create Post</button>
                    </form>
                    </div>}
                {userPosts && <GetPosts posts={userPostsArray} userList={userList}></GetPosts>}
                {friendPosts && <GetPosts posts={friendsPostsArray} userList={userList}></GetPosts>}
            </div>
        </div>
    )
}