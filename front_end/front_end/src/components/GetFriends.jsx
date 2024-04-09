import view from "../assets/view.svg"
import { v4 } from "uuid"

export default function GetFriends({list, profile}){
    return(
            <div className="h-full bg-gradient-to-r from-blue-100 to-green-100 flex justify-center items-center rounded-2xl">
                <div className="h-4/5 bg-white w-4/5 rounded-2xl shadow-lg flex flex-col justify-start items-center overflow-auto gap-5 pt-10 pb-16">
                    {list && list.map((user) => {
                        return(
                            <div key={v4()} className="flex justify-start border rounded-2xl w-1/2 relative shadow-xl m-7">
                                <img src={user.profile_pic} alt="Profile Pic" className="h-20 w-20 rounded-full border absolute -left-6 -top-2 border-black"/>
                                <div className="w-fit text-center text-4xl font-thin p-3 pl-20">{user.username}</div>
                                <img src={view} alt="Add" className="h-7 p-1 border rounded-full border-black absolute -right-1 -top-2 bg-white hover:bg-blue-100" onClick={()=>window.location.href = `/profiles?id=${user._id}&profile=${profile}`}/>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}