import LoadProfile from "./components/LoadProfile";
import Navbar from "./components/Navbar";
import { useLocation } from 'react-router-dom';

export default function Profiles(){
    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const id = params.get('id');

    return(
        <div>
            <Navbar title='Profile'></Navbar>
            <div className="p-10 min-h-screen bg-cover" style={{backgroundImage: "url('/public/green_background.avif')"}}>
                <LoadProfile id={id}></LoadProfile>
            </div>
        </div>
    )
}