"use client"


import React, { useState, useRef, useEffect } from "react";
import { Icon } from "../icons/icon";

export function MenuEmpresa() {
  const [openNegocio, setOpenNegocio] = useState(false);
  const [openOperaciones, setOpenOperaciones] = useState(false);
  const [openEmprendedores, setOpenEmprendedores] = useState(false);
  const [openFacturacion, setOpenFacturacion] = useState(false);
  const negocioRef = useRef<HTMLDivElement>(null);
  const operacionesRef = useRef<HTMLDivElement>(null);
  const emprendedoresRef = useRef<HTMLDivElement>(null);
  const facturacionRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (negocioRef.current && !negocioRef.current.contains(e.target as Node)) {
        setOpenNegocio(false);
      }
      if (operacionesRef.current && !operacionesRef.current.contains(e.target as Node)) {
        setOpenOperaciones(false);
      }
      if (emprendedoresRef.current && !emprendedoresRef.current.contains(e.target as Node)) {
        setOpenEmprendedores(false);
      }
      if (facturacionRef.current && !facturacionRef.current.contains(e.target as Node)) {
        setOpenFacturacion(false);
      }
    }
    if (openNegocio || openOperaciones || openEmprendedores || openFacturacion) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openNegocio, openOperaciones, openEmprendedores, openFacturacion]);

  return (
    <div className="relative w-full h-16 bg-black flex items-center justify-center border-t border-b border-gray-800">
      <div className="flex flex-row gap-8 items-center justify-center relative z-10">
        {/* Negocio Dropdown */}
        <div ref={negocioRef} className="relative flex flex-row items-center">
          <button
            className={`flex flex-row items-center px-4 py-1 h-16 transition-colors duration-150 focus:outline-none ${openNegocio ? "bg-white text-black shadow-lg" : "bg-transparent text-white"}`}
            onClick={() => {
              setOpenNegocio((v) => !v);
              setOpenOperaciones(false);
              setOpenFacturacion(false);
            }}
            aria-haspopup="true"
            aria-expanded={openNegocio}
          >
            <Icon icon="grafico" size={24} color={openNegocio ? "black" : "filter-blanco-svg"} />
            <Icon icon="expandir" size={16} color={openNegocio ? "black" : "filter-blanco-svg"} className="ml-1" />
          </button>
          {/* Dropdown menu for Negocio */}
          {openNegocio && (
            <div className="absolute left-0 top-full bg-white rounded-tr-[8px] rounded-br-[8px] shadow-[0px_8px_16px_0px_rgba(171,190,209,0.2)] w-[220px] flex flex-col gap-2 py-5 pl-[15px] pr-2 z-20">
              <div className="flex gap-2 h-6 items-center w-full">
                <Icon icon="grafico" size={24} color="black" />
                <span className="font-bold text-[16px] leading-5 font-montserrat text-black">Admin. de negocio</span>
              </div>
              <div className="flex gap-2.5 items-center px-1 py-1.5 rounded-[4px] w-full hover:bg-gray-100 cursor-pointer">
                <span className="underline text-[14px] leading-4 font-montserrat text-black">Gestión de publicaciones</span>
              </div>
            </div>
          )}
        </div>
        {/* Operaciones Dropdown */}
        <div ref={operacionesRef} className="relative flex flex-row items-center">
          <button
            id="operaciones"
            className={`flex flex-row items-center px-4 py-1 h-16 transition-colors duration-150 focus:outline-none ${openOperaciones ? "bg-white text-black shadow-lg" : "bg-transparent text-white"}`}
            onClick={() => {
              setOpenOperaciones((v) => !v);
              setOpenNegocio(false);
              setOpenFacturacion(false);
            }}
            aria-haspopup="true"
            aria-expanded={openOperaciones}
          >
            <Icon icon="tienda" size={24} color={openOperaciones ? "black" : "filter-blanco-svg"} />
            <Icon icon="expandir" size={16} color={openOperaciones ? "black" : "filter-blanco-svg"} className="ml-1" />
          </button>
          {/* Dropdown menu for Operaciones */}
          {openOperaciones && (
            <div className="absolute left-0 top-full bg-white rounded-tr-[8px] rounded-br-[8px] shadow-[0px_8px_16px_0px_rgba(171,190,209,0.2)] w-[220px] flex flex-col gap-2 py-5 pl-[15px] pr-2 z-20">
              <div className="flex gap-2 h-6 items-center w-full">
                <Icon icon="tienda" size={24} color="black" />
                <span className="font-bold text-[16px] leading-5 font-montserrat text-black">Mis operaciones</span>
              </div>
              <div className="flex gap-2.5 items-center px-1 py-1.5 rounded-[4px] w-full hover:bg-gray-100 cursor-pointer">
                <span className="underline text-[14px] leading-4 font-montserrat text-black">Ventas y envíos</span>
              </div>
              <div className="flex gap-2.5 items-center px-1 py-1.5 rounded-[4px] w-full hover:bg-gray-100 cursor-pointer">
                <span className="underline text-[14px] leading-4 font-montserrat text-black">Compras</span>
              </div>
            </div>
          )}
        </div>
        {/* Emprendedores Dropdown */}
        <div ref={emprendedoresRef} className="relative flex flex-row items-center">
          <button
            id="emprendedores"
            className={`flex flex-row items-center px-4 py-1 h-16 transition-colors duration-150 focus:outline-none ${openEmprendedores ? "bg-white text-black shadow-lg" : "bg-transparent text-white"}`}
            onClick={() => {
              setOpenOperaciones(false);
              setOpenNegocio(false);
              setOpenEmprendedores((v) => !v);
              setOpenFacturacion(false);
            }}
            aria-haspopup="true"
            aria-expanded={openEmprendedores}
          >
            <Icon icon="usuarios" size={24} color={openEmprendedores ? "black" : "filter-blanco-svg"} />
            <Icon icon="expandir" size={16} color={openEmprendedores ? "black" : "filter-blanco-svg"} className="ml-1" />
          </button>
          {/* Dropdown menu for Emprendedores */}
          {openEmprendedores && (
            <div className="absolute left-0 top-full bg-white rounded-tr-[8px] rounded-br-[8px] shadow-[0px_8px_16px_0px_rgba(171,190,209,0.2)] w-[220px] flex flex-col gap-2 py-5 pl-[15px] pr-2 z-20">
              <div className="flex gap-2 h-6 items-center w-full">
                <Icon icon="tienda" size={24} color="black" />
                <span className="font-bold text-[16px] leading-5 font-montserrat text-black">Emprendedores</span>
              </div>
              <div className="flex gap-2.5 items-center px-1 py-1.5 rounded-[4px] w-full hover:bg-gray-100 cursor-pointer">
                <span className="underline text-[14px] leading-4 font-montserrat text-black">Mis emprendedores</span>
              </div>
              <div className="flex gap-2.5 items-center px-1 py-1.5 rounded-[4px] w-full hover:bg-gray-100 cursor-pointer">
                <span className="underline text-[14px] leading-4 font-montserrat text-black">Comisiones</span>
              </div>
            </div>
          )}
        </div>
        {/* Facturacion Dropdown */}
        <div ref={facturacionRef} className="relative flex flex-row items-center">
          <button
            id="facturacion"
            className={`flex flex-row items-center px-4 py-1 h-16 transition-colors duration-150 focus:outline-none ${openFacturacion ? "bg-white text-black shadow-lg" : "bg-transparent text-white"}`}
            onClick={() => {
              setOpenFacturacion((v) => !v);
              setOpenNegocio(false);
              setOpenOperaciones(false);
            }}
            aria-haspopup="true"
            aria-expanded={openFacturacion}
          >
            {/* Use Figma SVG if available, else Icon */}
            <Icon icon="factura" size={24} color={openFacturacion ? "black" : "filter-blanco-svg"} />
            <Icon icon="expandir" size={16} color={openFacturacion ? "black" : "filter-blanco-svg"} className="ml-1" />
          </button>
          {/* Dropdown menu for Facturacion */}
          {openFacturacion && (
            <div
              className="absolute left-0 top-full bg-white rounded-tr-[8px] rounded-br-[8px] shadow-[0px_8px_16px_0px_rgba(171,190,209,0.2)] w-[220px] flex flex-col gap-2 py-5 pl-[15px] pr-2 z-20"
              data-name="Menú desplegado"
              data-node-id="6440:27953"
            >
              <div className="flex gap-2 h-6 items-center w-full">
                {/* Use Figma SVG if available, else Icon */}
                <Icon icon="factura" size={24} color="black" />
                <span className="font-bold text-[16px] leading-5 font-montserrat text-black">Facturación y liquidaciones</span>
              </div>
              <div className="flex gap-2.5 items-center px-1 py-1.5 rounded-[4px] w-full hover:bg-gray-100 cursor-pointer">
                <span className="underline text-[14px] leading-4 font-montserrat text-black">Facturación</span>
              </div>
              <div className="flex gap-2.5 items-center px-1 py-1.5 rounded-[4px] w-full hover:bg-gray-100 cursor-pointer">
                <span className="underline text-[14px] leading-4 font-montserrat text-black">Liquidaciones</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
