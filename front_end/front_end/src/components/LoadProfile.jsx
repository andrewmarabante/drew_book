import { useEffect, useState } from "react"
import {v4} from 'uuid'

export default function LoadProfile(){
    const [user, setUser] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [reset, setReset] = useState(null)

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

        console.log(profilePic)
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

    return(
        <div>
            {user && 
            <div>
                <div>profile pic</div>
                {profilePic && <img src={URL.createObjectURL(profilePic)} alt="" />}
                <input type="file" onChange={handlePicChange}/>
                <div>username</div>
                <div>age</div>
                <div>gender</div>
                <div>occupation</div>
                <div>hobbies</div>
                <div>school</div>
                <div>bio</div>
                <div>friends</div>
                <div>suggested</div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            }
        </div>
    )
}