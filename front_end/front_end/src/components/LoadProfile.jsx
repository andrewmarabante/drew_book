import { useEffect, useState } from "react"
import {v4} from 'uuid'
import Slider from '@mui/material/Slider';
import edit from '../assets/edit.svg';
import remove from '../assets/removeFriend.svg';
import add from '../assets/addFriend.svg';
import x from '../assets/x.svg'
import GetFriends from "./GetFriends";
import { useLocation } from 'react-router-dom';


export default function LoadProfile({id, friends}){
    const [user, setUser] = useState(null)

    //You are so lazy for this bro... but using this currentUser saves so much
    //time having to go back and change all user fetches and routes..
    //user is now either the currentUser OR if an id is passed in, it becomes
    //that id's information, currentUser is used to determine if they are in our
    //friend list or not... DO NOT DO THIS IF YOU WANT TO SCALE THE WEBSITE IM JUST SO DAMN LAZY
    const [currentUser, setCurrentUser] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [reset, setReset] = useState(null)
    const [editPhoto, setEditPhoto] = useState(false)
    const [left, setLeft] = useState('1/2')
    const [top, setTop] = useState('1/2')
    const [diameter, setDiameter] = useState(100)
    const [editInfo, setEditInfo] = useState(false)
    const [editBio, setEditBio] = useState(false)

    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const profile = params.get('profile');

    useEffect(()=>{
        

        if(id){
            fetch(`http://localhost:3000/profiles/:${id}`, {
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
                    setUser(result)
                })
                .catch(err => console.log(err))

        }

        fetch('http://localhost:3000/profiles', {
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
                    setCurrentUser(result)
                    if(!id){setUser(result)}
                })
                .catch(err => console.log(err))

    }, [reset])

    function handlePicChange(e){
        setProfilePic(e.target.files[0])
    }

    function handleSubmit(){
        
        if(!profilePic){
            return
        }

        const data = getRatios();   

        const formData = new FormData();

        formData.append('image', profilePic)
        formData.append('left', data.leftRatio)
        formData.append('top', data.topRatio)
        formData.append('height', data.cropHeight)
        formData.append('width', data.cropWidth)
        

        fetch('http://localhost:3000/profiles', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then(result => result.json())
            .then(()=>{
                if(result === '401' || result === '403'){
                    window.location.href = '/login'
                }
                window.location.href = '/profiles'
            })
            .catch(err => console.log(err))
    }

    function getRatios(){
        const picContainer = document.getElementById('picContainer');
        const image = document.getElementById('image');
        const circle = document.getElementById('circle');

        const picContainerRect = picContainer.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        const circleRect = circle.getBoundingClientRect();

        //need, crop width (circle width / image width)

        const cropWidth = circleRect.width / imageRect.width
        //crop height
        const cropHeight = circleRect.height / imageRect.height
        //top image percentage (circle top / image height)
        //Remember though, the circle top give top to screen, we need to subtract image top
        const topRatio = (circleRect.top - imageRect.top) / imageRect.height
        //left image percentage

        const leftRatio = (circleRect.left - imageRect.left) / imageRect.width

        return(
            {topRatio,leftRatio, cropHeight, cropWidth}
        )

    }

    function handleTopChange(e){
        let picContainer = document.getElementById('picContainer');
        let circle = document.getElementById('circle');
        let image = document.getElementById('image');

        const imageRect = image.getBoundingClientRect();
        const picContainerRect = picContainer.getBoundingClientRect();


        const TopBotGap = imageRect.top - picContainerRect.top

        const circleRadius = circle.clientHeight/2;
        

        let step = (picContainer.clientHeight - circleRadius*2-TopBotGap*2)/100
        

       const newTop = picContainer.clientHeight - TopBotGap - e.target.value*step - circleRadius

        circle.style.top = (newTop) +'px'

        setTop(newTop)
    }

    function handleLeftChange(e){
        let picContainer = document.getElementById('picContainer');
        let circle = document.getElementById('circle');
        const image = document.getElementById('image');


        const imageRect = image.getBoundingClientRect();
        const picContainerRect = picContainer.getBoundingClientRect();

        const RightLeftGap = picContainerRect.right - imageRect.right

        const circleRadius = circle.clientWidth/2;


        let step = (picContainer.clientWidth - circleRadius*2 - RightLeftGap*2)/100
        

        const newLeft = circleRadius + e.target.value*step + RightLeftGap;
        circle.style.left = (newLeft) +'px'

        setLeft(newLeft)
    }

    function handleDiameterChange(e){
        const image = document.getElementById('image')
        const circle = document.getElementById('circle');

        const imageRect = image.getBoundingClientRect();
        const circleRect = circle.getBoundingClientRect();

        if((circleRect.top - imageRect.top <=0) || (imageRect.right - circleRect.right <=0) || (circleRect.left - imageRect.left <= 0) || (imageRect.bottom - circleRect.bottom <= 0)){
            return
        }

        circle.style.height = e.target.value+'px'
        circle.style.width = e.target.value+'px'
        setDiameter(e.target.value)
    }

    function addFriend(){

        const body = {
            id : id
        }
        
        fetch(`http://localhost:3000/profiles/add`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            })
                .then(result => result.json())
                .then(result => {
                    setReset(v4())
                })
                .catch(err => console.log(err))
    }

    function removeFriend(){

        const body = {
            id : id
        }
        
        fetch(`http://localhost:3000/profiles/remove`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            })
                .then(result => result.json())
                .then(result => {
                    setReset(v4())
                })
                .catch(err => console.log(err))

    }

    function handleInfoSubmit(){
        const age = document.getElementById('age').value
        const gender = document.getElementById('gender').value
        const occupation = document.getElementById('occupation').value
        const school = document.getElementById('school').value
        const hobbies = document.getElementById('hobbies').value

        console.log(gender)

        const body = {
            age: age,
            gender: gender,
            occupation: occupation,
            school: school,
            hobbies: hobbies
        }

        fetch('http://localhost:3000/profiles/info', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
              },
            body: JSON.stringify(body),
            credentials: 'include'
        })
        .then(() => {
            setEditInfo(false)
            setReset(v4())
        })
        .catch(err => console.log(err))
    }

    function handleBioSubmit(){
        const bio = document.getElementById('bio').value

        const body = {
            bio: bio
        }

        fetch('http://localhost:3000/profiles/bio', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
              },
            body: JSON.stringify(body),
            credentials: 'include'
        })
        .then(() => {
            setEditBio(false)
            setReset(v4())
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="flex justify-center items-center min-h-screen h-auto p-10 bg-white rounded-2xl relative">
            {id && <img src={x} alt="back" className="h-16 absolute top-1 right-1" onClick={()=>{window.location.href= `${profile === 'true' ? '/profiles' : '/addFriends'}`}}></img>}
            {(user && !editPhoto && currentUser) &&
            <div className="flex flex-col items-center justify-center w-full">
                <div className="text-2xl">{user && user.username}</div>
                <div className="p-5 pt-10 border-b-2 w-full flex flex-col items-center justify-center h-full">
                    {user.profile_pic && <img src={user.profile_pic} alt="profile pic" className="h-60 w-60 rounded-full shadow-lg border border-black" />}
                    
                    {!id && <div className="text-center m-5 text-xs select-none flex justify-end items-center w-60">
                        <img src={edit} className="h-6" onClick={()=>setEditPhoto(true)}></img>
                    </div>}

                    {(id && currentUser.friends.includes(user._id)) && <div className="text-center m-5 text-xs select-none flex justify-end items-center w-60">
                        <div className="m-1">Remove Friend</div><img src={remove} className="h-7 p-1 border rounded-full border-black bg-green-100 hover:bg-blue-100" onClick={removeFriend}></img>
                    </div>}

                    {(id && !currentUser.friends.includes(user._id)) && <div className="text-center m-5 text-xs select-none flex justify-end items-center w-60">
                        <div className="mr-1">Add Friend</div><img src={add} className="h-7 p-1 border rounded-full border-black bg-green-100 hover:bg-blue-100" onClick={addFriend}></img>
                    </div>}

                </div>
                <div className="flex flex-col justify-around w-full h-96 border-b-2 pb-5">
                    <div className="flex justify-between items-center">
                        <div className="w-fit text-center text-2xl border-b-2">Personal Information: </div>
                        {!editInfo && <img src={edit} alt="edit" className="h-6" onClick={()=>{setEditInfo(true)}}/>}
                        {editInfo && <img src={x} alt="x" className="h-6" onClick={()=> setEditInfo(false)}></img>}
                    </div>
                    
                    <div className="flex justify-center gap-5">
                        <div className="w-40 text-xl font-mono">Age: </div>
                        {!editInfo && <div className="w-80 text-center text-xl font-thin p-1">{user.age ? user.age : 'empty'}</div>}
                        {editInfo && <input id="age" type="number" className="w-80 text-center text-xl font-thin border rounded-lg p-1" defaultValue={user.age ? user.age : 24}></input>}
                    </div>

                    <div className="flex justify-center gap-5">
                        <div className="w-40 text-xl font-mono">Gender: </div>
                        {!editInfo && <div className="w-80 text-center text-xl font-thin p-1">{user.gender ? user.gender : 'empty'}</div>}
                        {editInfo && <select id="gender" defaultValue={user.gender ? user.gender : 'Male'} className="w-80 text-center text-xl font-thin border rounded-lg p-1">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            </select>}
                    </div>

                    <div className="flex justify-center gap-5">
                        <div className="w-40 text-xl font-mono">Occupation: </div>
                        {!editInfo && <div className="w-80 text-center text-xl font-thin p-1">{user.occupation ? user.occupation : 'empty'}</div>}
                        {editInfo && <input id='occupation' type="text" className="w-80 text-center text-xl font-thin border rounded-lg p-1" defaultValue={user.occupation ? user.occupation : 'Teacher'}></input>}
                    </div>

                    <div className="flex justify-center gap-5">
                        <div className="w-40 text-xl font-mono">School: </div>
                        {!editInfo && <div className="w-80 text-center text-xl font-thin p-1">{user.school ? user.school : 'empty'}</div>}
                        {editInfo && <input id="school" type="text" className="w-80 text-center text-xl font-thin border rounded-lg p-1" defaultValue={user.school ? user.school : 'UCSB'}></input>}
                    </div>

                    <div className="flex justify-center gap-5">
                        <div className="w-40 text-xl font-mono">Hobbies: </div>
                        {!editInfo && <div className="w-80 text-center text-xl font-thin p-1">{user.hobbies ? user.hobbies : 'empty'}</div>}
                        {editInfo && <input id="hobbies" type="text" className="w-80 text-center text-xl font-thin border rounded-lg p-1" defaultValue={user.hobbies ? user.hobbies : 'Knitting'}></input>}
                    </div>

                    {editInfo && <button className="rounded-lg p-3 hover:bg-blue-50 w-full" onClick={handleInfoSubmit}>Submit</button>}

                </div>
                <div className="h-fit max-h-60 w-full border-b-2 overflow-auto pt-3 pb-5">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl w-full mt-2 mb-2"><div className="w-fit border-b-2">Bio:</div></div>
                        {!editBio && <img src={edit} alt="edit" className="h-6" onClick={()=>setEditBio(true)}/>}
                        {editBio && <img src={x} alt="x" className="h-6" onClick={()=>setEditBio(false)}/>}
                    </div>
                    {!editBio && <div className="text-lg font-thin pl-10 p-2">{user.bio ? user.bio : <div className="text-center mr-10">empty</div>}</div>}
                    {editBio && <textarea id="bio" className="text-lg font-thin p-2 border rounded-lg w-full" defaultValue={user.bio ? user.bio : 'Some really cool Bio!'}></textarea>}
                    {editBio && <button onClick={handleBioSubmit} className="rounded-lg p-3 hover:bg-blue-50 w-full">Submit</button>}
                </div>
                <div className="w-full pt-3">
                    <div className="text-2xl w-full mt-2 mb-2"><div className="w-fit border-b-2">Friends:</div></div>
                </div>
                <div className="w-5/6 h-96 mt-5">
                    <GetFriends list={friends} profile={true}></GetFriends>
                </div>
            </div>
            }
            {editPhoto &&
            <div className="pt-20 h-fit w-3/4 flex flex-col justify-around items-center border rounded-2xl shadow-lg bg-green-100 relative bg-gradient-to-r from-green-300 to-green-50">
                <img src={x} alt="x" onClick={()=>setEditPhoto(false)} className="absolute right-0 top-0 h-10"/>
                <div className="absolute top-5 text-2xl">Profile Picture: </div>
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="flex justify-end items-center h-3/4 w-3/4">
                        {profilePic && <div id="picContainer" className="relative border border-black h-5/6 w-5/6 flex justify-center items-center shadow-lg bg-white overflow-x-auto">
                            <div id="circle" className={`absolute top-1/2 left-1/2 transform: -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white bg-opacity-50 border border-black z-30`}></div>
                            <img id="image" src={URL.createObjectURL(profilePic)} className="max-h-96 border border-black"></img>
                        </div>}
                        <div className="flex justify-center items-center">
                            {profilePic &&<Slider
                                      sx={{
                                        '& input[type="range"]': {
                                          WebkitAppearance: 'slider-vertical',
                                        },
                                        height: '20em'
                                      }}
                                      step={1}
                                      orientation="vertical"
                                      defaultValue={50}
                                      min={0}
                                      max={100}
                                      aria-label="Temperature"
                                      valueLabelDisplay="auto"
                                      onChange={handleTopChange}
                                      />}
                        </div>
                    </div>
                    <div className="flex justify-center flex-col items-center">
                        {profilePic && <Slider
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        step={1}
                        defaultValue={50}
                        min={1}
                        max={100}
                        sx={{ width: '20em' }}
                        onChange={handleLeftChange}
                        />}
                        {profilePic && <Slider
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        step={1}
                        value={diameter}
                        min={50}
                        max={200}
                        sx={{ width: '20em' }}
                        onChange={handleDiameterChange}
                        />}
                    </div>
                </div>
                <div className="bg-white rounded-lg p-2"><input type="file" onChange={handlePicChange}/></div>
                <button className="p-2 m-2 bg-white rounded-lg select-none hover:bg-blue-100" onClick={handleSubmit}>Submit</button>
            </div>
            }
        </div>
    )
}