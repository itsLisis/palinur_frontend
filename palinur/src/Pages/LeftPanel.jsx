import { useState } from "react";
import Perfil from "./Panels/Perfil";
import Fotos from "./Panels/Fotos";
import Ajustes from "./Panels/Ajustes";
import { UserCircleIcon, PhotoIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid";

export default function LeftPanel() {
  const [tab, setTab] = useState("perfil");

  return (
    <div className="flex h-full">
        <div className="flex flex-col items-center w-[15%] pt-40 bg-gradient-to-b from-[#FF8269] to-[#1A2E53]">
              {tab === "perfil" ? (
                <button className="pt-3 pb-3 rounded-l-2xl bg-white " onClick={() => setTab("perfil")}>
                  <UserCircleIconSolid className="w-12 h-12 text-[#1A2E53]" />
                </button>
              ) : (
                <button className="p-3" onClick={() => setTab("perfil")}>
                <UserCircleIconSolid className="w-12 h-12 text-[#FFFFFF]" />
                </button>
              )}
            <button onClick={() => setTab("fotos")}><PhotoIcon className="justify-center w-12 h-12"/></button>
            <button onClick={() => setTab("ajustes")}><Cog6ToothIcon className="justify-center w-12 h-12"/></button>
        </div>

        {/* Navegación (iconos de menú) */}
        <div className="flex flex-col p-8 w-[85%] gap-4 mb-6">
            {tab === "perfil" && <Perfil />}
            {tab === "fotos" && <Fotos />}
            {tab === "ajustes" && <Ajustes />}
        </div>
    </div>
  );
}

