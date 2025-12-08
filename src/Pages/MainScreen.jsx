import { Link } from "react-router-dom"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MainScreen() {  
    const [animation, setAnimation] = useState();
    
    const animateLeft = () => {
        setAnimation("animate-slide-left");
        setTimeout(() => setAnimation(""), 500);
    };

    const animateRight = () => {
        setAnimation("animate-slide-right");
        setTimeout(() => setAnimation(""), 500);
    };
    return (

    
    
    <div className="h-screen w-full flex overflow-hidden">

        
      
    <div className="w-1/3 h-full overflow-y-auto bg-white shadow-xl">
        <LeftPanel />
    </div>

        
    <div className="w-2/3 h-full relative flex items-center justify-center bg-[linear-gradient(to_bottom,rgba(235,130,105,0.8)_0%,rgba(235,130,105,0.8)_40%,rgba(26,43,86,0.8)_100%)] 
    ">
        <div className={`absolute pb-1 bottom-2 left-1/2  -translate-x-1/2 flex gap-10 z-20 ${animation}`} >
            <button
              onClick={animateLeft}
              className="bg-white p-6 rounded-full shadow-[0_4px_10px_rgba(125,125,125,1)] hover:shadow-[0_10px_25px_rgba(26,43,86,0.8)] hover:scale-110 transition-transform ${animation}"
            >
              <XMarkIcon className="w-12 h-12 text-[#1A2E53] stroke-[4]" />
            </button>

            <button
              onClick={animateRight}
              className="bg-white p-6 rounded-full shadow-[0_4px_10px_rgba(125,130,125,1)] hover:scale-110 transition-transform hover:shadow-[0_4px_10px_rgba(235,130,105,0.8)] ${animation}"
            >
              <HeartIcon className="w-12 h-12 text-[#FF8269]" />
            </button>
        </div>
        <RightPanel animation={animation} />
    </div>

    </div>
    )
}