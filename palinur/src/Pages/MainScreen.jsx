import { Link } from "react-router-dom"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"

export default function MainScreen() {   
    return (

    
    
    <div className="h-screen w-full flex overflow-hidden">

        
      
    <div className="w-1/3 h-full overflow-y-auto bg-white shadow-xl">
        <LeftPanel />
    </div>

        
    <div className="w-2/3 h-full flex items-center justify-center bg-[linear-gradient(to_bottom,rgba(235,130,105,0.8)_0%,rgba(235,130,105,0.8)_40%,rgba(26,43,86,0.8)_100%)]">
        <RightPanel />
    </div>

    </div>
    )
}