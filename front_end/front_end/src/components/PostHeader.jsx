export default function PostHeader({togglePosts, userPosts, friendPosts, createPost}){
            return(<div className="flex justify-around items-center p-5 font-serif border bg-white rounded-xl mb-5">
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
            </div>)
}