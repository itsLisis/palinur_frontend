import { useState } from "react";
import Perfil from "./Panels/Perfil";
import Ajustes from "./Panels/Ajustes";
import Historial from "./Panels/Historial";
import Recomendaciones from "./Panels/Recomendaciones";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function LeftPanel() {
  const [tab, setTab] = useState("perfil");

  return (
    <div className="flex h-full">
      <div className="flex flex-col items-center w-[15%] pt-40 bg-[linear-gradient(to_bottom,rgba(235,130,105,0.8)_0%,rgba(235,130,105,0.8)_40%,rgba(26,43,86,0.8)_100%)]">
        <div className="w-full ">
          {tab === "perfil" ? (
            <button
              className="flex px-4 py-2 rounded-l-2xl w-full bg-white "
              onClick={() => setTab("perfil")}
            >
              <UserCircleIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
            </button>
          ) : (
            <button
              className="flex pl-4 pr-4 pt-2 pb-2"
              onClick={() => setTab("perfil")}
            >
              <UserCircleIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
            </button>
          )}
          {tab === "historial" ? (
            <button
              className="pl-4 pr-4 pt-2 pb-2 rounded-l-2xl w-full bg-white "
              onClick={() => setTab("historial")}
            >
              <ClockIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
            </button>
          ) : (
            <button
              className="pl-4 pr-4 pt-2 pb-2"
              onClick={() => setTab("historial")}
            >
              <ClockIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
            </button>
          )}
          {tab === "ajustes" ? (
            <button
              className="pl-4 pr-4 pt-2 pb-2 rounded-l-2xl w-full bg-white "
              onClick={() => setTab("ajustes")}
            >
              <Cog6ToothIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
            </button>
          ) : (
            <button
              className="pl-4 pr-4 pt-2 pb-2"
              onClick={() => setTab("ajustes")}
            >
              <Cog6ToothIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
            </button>
          )}
          {tab === "recomendaciones" ? (
            <button
              className="pl-4 pr-4 pt-2 pb-2 rounded-l-2xl w-full bg-white "
              onClick={() => setTab("recomendaciones")}
            >
              <ExclamationCircleIcon className="w-12 h-12 stroke-[2] text-[#1A2E53]" />
            </button>
          ) : (
            <button
              className="pl-4 pr-4 pt-2 pb-2"
              onClick={() => setTab("recomendaciones")}
            >
              <ExclamationCircleIcon className="w-12 h-12 stroke-[2] text-[#FFFFFF]" />
            </button>
          )}
        </div>
      </div>

      {/* Navegación (iconos de menú) */}
      <div className="flex flex-col w-[85%] gap-4 mb-6 overflow-y-auto">
        <div className="p-8">
          {tab === "perfil" && <Perfil />}
          {tab === "historial" && <Historial />}
          {tab === "ajustes" && <Ajustes />}
          {tab === "recomendaciones" && <Recomendaciones />}
        </div>
      </div>
    </div>
  );
}
