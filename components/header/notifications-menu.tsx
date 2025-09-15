import React from "react";
import { Icon } from "../icons/icon";

export function NotificationsMenu({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="absolute right-0 top-full mt-2 z-20">
      <div className="bg-grisxlight box-border flex flex-col gap-2 items-start justify-start p-4 rounded-[8px] shadow-[0px_4px_8px_0px_rgba(171,190,209,0.4)] w-[340px]">
        <div className="flex gap-2 h-6 items-center w-full">
          <Icon icon="notificacion" size={24} />
          <p className="font-bold">Avisos</p>
        </div>
        <hr className="border-black border-[1px] w-full"/>
        {/* Aviso 1 */}
        <div className="relative flex flex-row gap-2 items-end w-full p-2">
          <div className="bg-grislightmedium rounded-[4px] p-4">
            <Icon icon="anadir-tarjeta" size={24} color="filter-fucsia-svg" />
          </div>
          <div className="w-full text-grismediumdark">
            <div className="text-xs text-right">11/01/2025</div>
            <p>Cargar datos faltantes</p>
            <p className="text-sm">Ingresá a tu perfil y completá...</p>
          </div>
        </div>
        <hr className="border-black w-full"/>
        {/* Aviso 2 */}
        <div className="relative flex flex-row gap-2 items-end w-full p-2">
          <div className="bg-grislightmedium rounded-[4px] p-4">
            <Icon icon="ayuda" size={24} color="filter-fucsia-svg" />
          </div>
          <div className="w-full text-grismediumdark">
            <div className="text-xs text-right">11/01/2025</div>
            <p>Nueva pregunta</p>
            <p className="text-sm">Celular Samsung Galaxy Z Flip...</p>
          </div>
        </div>
        <div className="w-full mt-2">
          <a className="text-sm underline px-1" href="/notifications">Ver todos los avisos</a>
        </div>
      </div>
    </div>
  );
}
