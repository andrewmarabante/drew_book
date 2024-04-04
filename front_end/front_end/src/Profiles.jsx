import LoadProfile from "./components/LoadProfile";
import Navbar from "./components/Navbar";

export default function Profiles(){
    return(
        <div>
            <Navbar title='Profile'></Navbar>
            <div className="pl-10 pr-10 h-screen">
                <LoadProfile></LoadProfile>
            </div>
        </div>
    )
}