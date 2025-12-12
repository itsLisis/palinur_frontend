import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import ChatPanel from "./ChatPanel";
import { useState, useRef } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MainScreen() {
  const [index, setIndex] = useState(0); // 0 = tarjetas, 1 = chat
  const [animation, setAnimation] = useState();
  const [buttonFade, setButtonFade] = useState();
  const [matchData, setMatchData] = useState(null); // Info del match activo
  const loadNextProfileRef = useRef(null);
  const handleSwipeRef = useRef(null); // Para manejar swipes desde MainScreen

  // Callback para cuando hay match
  const onMatchFound = (matchInfo) => {
    setMatchData(matchInfo);
    setIndex(1); // Cambiar a vista de chat
  };

  const animateLeft = () => {
    setAnimation("animate-slide-left");
    setButtonFade("fade-away");
    setTimeout(() => {
      setAnimation("");
      setButtonFade("");
      // Hacer swipe con dislike
      if (handleSwipeRef.current) {
        handleSwipeRef.current(false); // false = dislike
      }
    }, 500);
  };

  const animateRight = () => {
    setAnimation("animate-slide-right");
    setButtonFade("fade-away");
    setTimeout(() => {
      setAnimation("");
      setButtonFade("");
      // Hacer swipe con like
      if (handleSwipeRef.current) {
        handleSwipeRef.current(true); // true = like
      }
    }, 500);
  };
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <div className="w-1/3 h-full overflow-y-auto bg-white shadow-xl">
        <LeftPanel />
      </div>

      <div
        className="flex-1 h-full relative flex items-center justify-center bg-[linear-gradient(to_bottom,rgba(235,130,105,0.8)_0%,rgba(235,130,105,0.8)_40%,rgba(26,43,86,0.8)_100%)] 
    "
      >
        {index === 0 && (
          <div
            className={`absolute pb-1 bottom-2 left-1/2 -translate-x-1/2 flex gap-10 z-20 transition-opacity duration-300 ${
              buttonFade === "fade-away" ? "opacity-0" : "opacity-100"
            }`}
          >
            <button
              onClick={animateLeft}
              className="bg-white p-6 rounded-full shadow-[0_4px_10px_rgba(125,125,125,1)] hover:shadow-[0_10px_25px_rgba(26,43,86,0.8)] hover:scale-110 transition-transform"
            >
              <XMarkIcon className="w-12 h-12 text-[#1A2E53] stroke-[4]" />
            </button>

            <button
              onClick={animateRight}
              className="bg-white p-6 rounded-full shadow-[0_4px_10px_rgba(125,130,125,1)] hover:scale-110 transition-transform hover:shadow-[0_4px_10px_rgba(235,130,105,0.8)]"
            >
              <HeartIcon className="w-12 h-12 text-[#FF8269]" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-center w-full h-full">
          <div className={`w-full h-full ${animation}`}>
            {index === 0 ? (
              <RightPanel 
                loadNextProfileRef={loadNextProfileRef} 
                handleSwipeRef={handleSwipeRef}
                onMatchFound={onMatchFound}
              />
            ) : (
              <ChatPanel matchData={matchData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
