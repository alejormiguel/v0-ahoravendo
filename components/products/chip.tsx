import { Icon } from "@/components/icons/icon";

function IconsIcSolarCloseCircleBold() {
  return (
    <div className="relative size-full" data-name="icons/ic-solar:close-circle-bold">
      <div className="inset-[8.333%]" data-name="primary-shape">
        <Icon icon="cerrar-circulo" size={16} color="filter-blanco-svg" />
      </div>
    </div>
  );
}

export default function Chip({label}:{label:string}){
  return(
    <div className="bg-[#000000] flex flex-row gap-1 items-center pl-2 pr-1 py-1 rounded-lg">
      <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-[#ffffff] text-[13px] text-center text-nowrap">
        <p>{label}</p>
      </div>
      <div className="opacity-[0.48] w-4">
        <IconsIcSolarCloseCircleBold />
      </div>
    </div>
  );
}