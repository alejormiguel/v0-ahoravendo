"use client";

import React from "react";
import { Icon } from "../icons/icon";

// Dropdown component for 'ordenar'
export default function OrdenarDropdown() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');
  return (
    <div className="relative flex items-center w-48">
      <button
        className="flex justify-between items-center gap-2 w-full bg-white border border-[#d8d8d8] rounded-lg px-4 py-2 focus:outline-none"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <span className="font-montserrat text-[14px] text-[#323232]">
          {selected === 'relevance' && 'Más relevante'}
          {selected === 'price-asc' && 'Menor precio'}
          {selected === 'price-desc' && 'Mayor precio'}
        </span>
        <Icon icon="expandir" size={16} color="filter-gris-medio-svg" />
      </button>
      {open && (
        <div className="absolute top-[35px] left-0 mt-2 w-48 bg-white border border-[#d8d8d8] rounded-lg shadow-lg z-10">
          <ul className="py-1">
            <li>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-[#f3e8ff] font-montserrat ${selected === 'relevance' ? 'font-bold text-[#bc00b8]' : ''}`}
                onClick={() => { setSelected('relevance'); setOpen(false); }}
                type="button"
              >Más relevante</button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-[#f3e8ff] font-montserrat ${selected === 'price-asc' ? 'font-bold text-[#bc00b8]' : ''}`}
                onClick={() => { setSelected('price-asc'); setOpen(false); }}
                type="button"
              >Menor precio</button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-[#f3e8ff] font-montserrat ${selected === 'price-desc' ? 'font-bold text-[#bc00b8]' : ''}`}
                onClick={() => { setSelected('price-desc'); setOpen(false); }}
                type="button"
              >Mayor precio</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}