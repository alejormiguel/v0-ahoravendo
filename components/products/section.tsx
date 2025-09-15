"use client";
import React from "react";
import { Icon } from "@/components/icons/icon";

export default function Section({ expanded, title, openIcon, closeIcon, iconSize, iconColor, fontSize, children }: { expanded: boolean; title: string; openIcon?: string; closeIcon?: string; iconSize?: number; iconColor?: string; fontSize?:number; children: React.ReactNode }) {
  const [expandedState, setExpandedState] = React.useState(expanded);
  const openIconToUse = openIcon ? openIcon : "flecha-circulo-abajo";
  const closeIconToUse = closeIcon ? closeIcon : "flecha-circulo-arriba";
  const iconColorToUse = iconColor ? iconColor : "filter-gris-medio-svg";
  return (
    <div className="py-4 w-full">
      <div className="flex items-center justify-between">
        <span className={"font-montserrat font-bold text-[#222222] " + (fontSize ? "text-[" + fontSize + "px]" : "text-[18px]")}>{title}</span>
        <button onClick={() => setExpandedState((v) => !v)}>
          <Icon icon={expandedState ? closeIconToUse : openIconToUse} size={iconSize ? iconSize : 32} color={iconColorToUse} />
        </button>
      </div>
      <div className={expandedState ? "mt-4" : "mt-4 hidden"}>
        {children}
      </div>
    </div>
  );
}
