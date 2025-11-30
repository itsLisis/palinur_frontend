import { Link } from "react-router-dom"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"

export default function SplitScreen() {   
    return (

    
    
    <div className="h-screen w-full flex overflow-hidden">

        
      
    <div className="w-1/3 h-full overflow-y-auto bg-white shadow-xl">
        <LeftPanel />
    </div>

        
    <div className="w-2/3 h-full flex items-center justify-center bg-gradient-to-b from-[#FF8269] to-[#1A2E53]">
        <RightPanel />
    </div>

    </div>
    )
}