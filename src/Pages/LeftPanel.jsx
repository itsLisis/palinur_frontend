import { useState } from "react";
import Perfil from "./Panels/Perfil";
import Fotos from "./Panels/Fotos";
import Ajustes from "./Panels/Ajustes";
import Historial from "./Panels/Historial";
import Recomendaciones from "./Panels/Recomendaciones"
import Notificaciones from "./Panels/Notificaciones";
import { UserCircleIcon, PhotoIcon, Cog6ToothIcon, ClockIcon, ExclamationCircleIcon, BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleIconSolid} from "@heroicons/react/24/solid";

export default function LeftPanel() {
  const [tab, setTab] = useState("perfil");

  return (
    <div className="flex h-full">
        <div className="flex flex-col items-center w-[15%] pt-40 bg-[linear-gradient(to_bottom,rgba(235,130,105,0.8)_0%,rgba(235,130,105,0.8)_40%,rgba(26,43,86,0.8)_100%)]">
          <div className="w-full " >
              {tab === "perfil" ? (
                <button className="flex px-4 py-2 rounded-l-2xl w-full bg-white " onClick={() => setTab("perfil")}>
                  <UserCircleIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
                </button>
              ) : (
                <button className="flex pl-4 pr-4 pt-2 pb-2" onClick={() => setTab("perfil")}>
                <UserCircleIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
                </button>
              )}
              {tab === "historial" ? (
                <button className="pl-4 pr-4 pt-2 pb-2 rounded-l-2xl w-full bg-white " onClick={() => setTab("historial")}>
                  <ClockIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
                </button>
              ) : (
                <button className="pl-4 pr-4 pt-2 pb-2" onClick={() => setTab("historial")}>
                <ClockIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
                </button>
              )}
              {tab === "ajustes" ? (
                <button className="pl-4 pr-4 pt-2 pb-2 rounded-l-2xl w-full bg-white " onClick={() => setTab("ajustes")}>
                  <Cog6ToothIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
                </button>
              ) : (
                <button className="pl-4 pr-4 pt-2 pb-2" onClick={() => setTab("ajustes")}>
                <Cog6ToothIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
                </button>
              )}
              {tab === "recomendaciones" ? (
                <button className="pl-4 pr-4 pt-2 pb-2 rounded-l-2xl w-full bg-white " onClick={() => setTab("recomendaciones")}>
                  <ExclamationCircleIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
                </button>
              ) : (
                <button className="pl-4 pr-4 pt-2 pb-2" onClick={() => setTab("recomendaciones")}>
                <ExclamationCircleIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
                </button>
              )}
              {tab === "notificaciones" ? (
                <button className="pl-4 pr-4 pt-2 pb-2 rounded-l-2xl w-full bg-white " onClick={() => setTab("notificaciones")}>
                  <BellIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
                </button>
              ) : (
                <button className="pl-4 pr-4 pt-2 pb-2" onClick={() => setTab("notificaciones")}>
                <BellIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
                </button>
              )}
            </div>
        </div>

        {/* Navegación (iconos de menú) */}
        <div className="flex flex-col p-8 w-[85%] gap-4 mb-6">
            {tab === "perfil" && <Perfil />}
            {tab === "historial" && <Historial/>}
            {tab === "ajustes" && <Ajustes />}
            {tab === "recomendaciones" && <Recomendaciones />}
            {tab === "notificaciones" && <Notificaciones />}
        </div>
    </div>
  );
}

