import { useState } from "react"
import GoogleIcon from '@mui/icons-material/Google';


export default function Login(){
    const [login, setLogin] = useState(true);
    const [loginMessage, setLoginMessage] = useState(null);
    const [signUpMessage, setSignUpMessage] = useState(null);

    const handleChange = () => {
        
        setLoginMessage(null);
        setSignUpMessage(null);
        if(login){
            setLogin(false)
        }else(setLogin(true))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value

        if(!login && username.length < 3)
        {
            setSignUpMessage('Invalid Username')
            return
        }
        if(!login && password.length < 3)
        {
            setSignUpMessage('Invalid Password')
            return
        }

        const data = {
            username: username,
            password: password
        }

        if(login){
            fetch('http://localhost:3000/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then(result => result.json())
            .then(answer => 
                {
                if(answer === 'google'){setLoginMessage('Sign In With Google')}
                else if(answer === 'Wrong Username'){setLoginMessage('Wrong Username')}
                else if(answer === 'Wrong Password!'){setLoginMessage('Wrong Password')}
                else if(answer === 'success'){window.location.href = '/'}})
            .catch(err => console.log(err))
        }else{
            fetch('http://localhost:3000/login/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then(result => result.json())
            .then(result => {
                if(result === 'Username Taken'){
                    setSignUpMessage(result)
                }else{
                    window.location.href = '/login'
                }
            })
            .catch(err => console.log(err))
        }

    }



    return(
    <div className="flex justify-center items-center p-32 bg-green-100 h-screen">
        <div className="flex justify-center items-center flex-col w-96 bg-white rounded-3xl shadow-lg">
            {login && <div className="text-center text-5xl mt-6">Login:</div>}
            {!login && <div className="text-center text-5xl mt-6">Sign-Up:</div>}
            <form onSubmit={handleSubmit} className="w-80 p-10 pt-5 text-center pb-3 relative">
                <label className="text-xl block p-3" htmlFor="username">Username:</label>
                <input className="border rounded-lg w-full p-2 text-2xl text-center" type="text" name="username" id="username" placeholder="Andrew"/>
                <label className='text-xl block p-2' htmlFor="password">Password:</label>
                <input className="border rounded-lg w-full p-2 text-2xl text-center" type="text" name="password" id="password" placeholder="password" />
                <div className="text-red-300 min-h-7">{login && loginMessage && loginMessage}{!login && signUpMessage && signUpMessage}</div>
                <div className="flex ">
                    {login && <button className="w-full border p-1 rounded-lg hover:bg-blue-50">Login</button>}
                    {!login && <button className="w-full border p-1 rounded-lg hover:bg-blue-50">Sign-Up</button>}
                </div>
            </form>
            {login && <div className="text-xs">Don't have an account?</div>}
            {!login && <div className="text-xs">Already have an account?</div>}
            {login && <button className="w-40 border p-1 rounded-lg hover:bg-blue-50 mb-6 mt-2" onClick={handleChange}>Sign Up</button>}
            {!login && <button className="w-40 border p-1 rounded-lg hover:bg-blue-50 mb-6 mt-2" onClick={handleChange}>Log In</button>}
            <form action="http://localhost:3000/login/google" method="GET" className="w-5/6 border-t-2 flex justify-center">
                <button type="submit" className="flex items-center justify-center h-10 bg-blue-100 border border-green-300 rounded-xl pl-4 pr-4 m-2">
                    <GoogleIcon></GoogleIcon>
                    Sign in with google</button>
            </form>
        </div>
    </div>
    )
}