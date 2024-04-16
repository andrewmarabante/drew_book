import { useEffect, useState } from "react"
import Navbar from "./components/Navbar.jsx"
import GetPosts from "./components/GetPosts.jsx"
import CreatePost from "./components/CreatePost.jsx"
import PostHeader from "./components/PostHeader.jsx"
import {v4} from 'uuid'

export default function App(){
    const[userPostsArray, setUserPostsArray] = useState(null)
    const[friendsPostsArray, setFriendspostsArray] = useState(null)
    const[userList, setUserList] = useState(null)
    const[reset, setReset] = useState(null)

    const [userPosts, setUserPosts] = useState(false)
    const [friendPosts, setFriendPosts] = useState(true)
    const [createPost, setCreatePost] = useState(false)

    useEffect(()=>{

        fetch('https://drewbook-backend.fly.dev/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then(result => result.json())
            .then(result => {
                if(result === '401' || result === '403'){
                    window.location.href = '/login'
                }
                setUserPostsArray(result.userPosts);
                setFriendspostsArray(result.friendsPosts);
                setUserList(result.friendList)
            })
            .catch(err => {
                console.log(err)
            })
    }, [userPosts, friendPosts, reset])

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

        function submitPost(e, images){

            e.preventDefault();
            const title = e.target.title.value
            const description = e.target.body.value;


            const formData = new FormData();

            formData.append('title', title)
            formData.append('description', description)


            if(images.length > 0){for(let i=0; i<images.length; i++)
            {
                formData.append('image', images[i])
            }}




            fetch('https://drewbook-backend.fly.dev/',{
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            .then(result => result.json())
            .then(result => {
                if(result === '401' || result === '403'){
                    window.location.href = '/login'
                }
                togglePosts('user')
            })
            .catch(err => console.log(err))


        }

        function toggleReset(){
            setReset(v4())
        }

    return(
        <div className="min-h-screen bg-cover" style={{backgroundImage: "url('/public/green_background.avif')"}}>
            <Navbar title='Posts'></Navbar>
            <div className="pl-10 pr-10 pt-5 h-full">
                <PostHeader togglePosts={togglePosts} userPosts={userPosts} friendPosts={friendPosts} createPost={createPost}></PostHeader>
                {createPost && <CreatePost submitPost={submitPost}></CreatePost>}
                {userPosts && <GetPosts posts={userPostsArray} userList={userList} toggleReset={toggleReset} isUser={true}></GetPosts>}
                {friendPosts && <GetPosts posts={friendsPostsArray} userList={userList} toggleReset={toggleReset}></GetPosts>}
            </div>
        </div>
    )
}