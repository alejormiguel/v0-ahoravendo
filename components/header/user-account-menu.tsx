import React from "react";
import { Icon } from "../icons/icon";
import { signOut } from "next-auth/react";

const UserAccountMenu: React.FC = () => (
  <div
    className="bg-[#fbfbfb] box-border flex flex-col gap-2 items-start justify-start pl-[15px] pr-2 py-5 rounded-lg shadow-lg min-w-[220px] z-50">
    <div className="flex flex-row gap-2 h-6 items-center w-[204px]">
      <Icon icon="usuario" size={24} color="" />
      <div className="flex flex-col font-bold text-black text-[16px] text-left">
        <p>Perfil empresa</p>
      </div>
    </div>
    <div className="bg-white flex flex-row gap-2.5 items-center pl-2.5 pr-1 py-1.5 rounded-[10px] w-full relative mt-2 border border-[#d8d8d8] border-solid pointer-events-none">
      <div className="text-[#323232] text-[10px] w-[175px]">
        <p className="mb-0">¿Querés operar con otro tipo<br/>de cuenta?</p>
        <p className="underline text-[#bc00b8] text-[12px]">Seleccioná un perfil</p>
      </div>
      <Icon icon="chevron-adelante" size={16} color="filter-fucsia-svg" />
    </div>
    <hr className="border-black w-full"/>
    <div className="underline text-[14px] p-1">Configuración</div>
    <div className="underline text-[14px] p-1">Ayuda</div>
    <div 
      role="button" 
      onClick={() => signOut()} 
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") signOut() }}
      className="underline text-[14px] p-1">Cerrar sesión</div>
  </div>
);

export default UserAccountMenu;
