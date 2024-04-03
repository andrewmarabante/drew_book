import { useEffect, useState } from "react"
import {v4} from 'uuid'
import Slider from '@mui/material/Slider';


export default function LoadProfile(){
    const [user, setUser] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [reset, setReset] = useState(null)
    const [editPhoto, setEditPhoto] = useState(false)
    const [left, setLeft] = useState('1/2')
    const [top, setTop] = useState('1/2')
    const [diameter, setDiameter] = useState(100)
    const [breakValue, setBreakValue] = useState(null   )

    useEffect(()=>{
        
        fetch('http://localhost:3000/profiles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => {
                setUser(result)
            })
            .catch(err => console.log(err))

    }, [])

    function handlePicChange(e){
        setProfilePic(e.target.files[0])
    }

    function handleSubmit(){
        
        if(!profilePic){
            return
        }


        const formData = new FormData();

        formData.append('image', profilePic)
        

        fetch('http://localhost:3000/profiles', {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }

    function handleTopChange(e){
        let picContainer = document.getElementById('picContainer');
        let circle = document.getElementById('circle');
        let image = document.getElementById('image');

        const imageRect = image.getBoundingClientRect();
        const picContainerRect = picContainer.getBoundingClientRect();

        console.log(imageRect)
        console.log('break')
        console.log(circle.getBoundingClientRect())

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

    return(
        <div className="flex justify-center items-center h-screen ">
            {(user && !editPhoto) &&
            <div className="flex flex-col items-center justify-center">
                <div className="p-5 pt-10 border-b-2 w-full flex flex-col items-center justify-center">
                    {user.profile_pic && <img src={user.profile_pic} alt="profile pic" className="h-60 w-60 rounded-full shadow-lg border border-black" />}
                    <div className="text-center m-5 text-xs select-none" onClick={()=>setEditPhoto(true)}>Edit photo</div>
                </div>
                <div>username</div>
                <div>age</div>
                <div>gender</div>
                <div>occupation</div>
                <div>hobbies</div>
                <div>school</div>
                <div>bio</div>
                <div>friends</div>
                <div>suggested</div>
            </div>
            }
            {editPhoto &&
            <div className="p-2 h-5/6 w-3/4 flex flex-col justify-around items-center border rounded-2xl shadow-lg bg-green-100 relative">
                <div className="absolute top-5 text-2xl">Profile Picture: </div>
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="flex justify-end items-center h-3/4 w-3/4">
                        <div id="picContainer" className="relative border border-black h-5/6 w-5/6 flex justify-center items-center shadow-lg bg-white overflow-x-auto">
                            <div id="circle" className={`absolute top-1/2 left-1/2 transform: -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white bg-opacity-50 border border-black z-30`}></div>
                            {profilePic && <img id="image" src={URL.createObjectURL(profilePic)} className="h-5/6 border border-black"></img>}
                        </div>
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
                        max={150}
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