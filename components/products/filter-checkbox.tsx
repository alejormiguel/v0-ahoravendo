"use client"

import React, { useState } from "react";
import { Icon } from "../icons/icon";

interface FilterCheckboxProps {
  id: string;
  type: string;
  expanded: boolean;
  category: string;
  label?: string;
  checked: boolean;
  minimum?: number;
  maximum?: number;
  onDataSend: (data: DataSend) => void;
}

interface DataSend {
  action: string;
  id: string;
  type: string;
  expanded: boolean;
  category: string;
  label?: string;
  checked: boolean;
  minimum?: number;
  maximum?: number;
}

export default function FilterCheckbox({ id, type, expanded, category, label, checked, minimum, maximum, onDataSend  }: FilterCheckboxProps) {
  const [checkedState, setCheckedState] = useState(checked);
  const [minimo, setMinimo] = useState(minimum);
  const [maximo, setMaximo] = useState(maximum);

  const handleCheckboxChange = () => {
    const newState = !checkedState; 
    setCheckedState(newState);
    const dataToSend = {
      action: "checkbox",
      id: id,
      type: type,
      expanded: expanded,
      category: category,
      label: label,
      checked: newState,
      minimum: minimo,
      maximum: maximo,
    };
    onDataSend(dataToSend); // Call the parent's function with data
  };

  const handleMinimumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinimo(Number(e.target.value));
    const dataToSend = {
      action: "minimum",
      id: id,
      type: type,
      expanded: expanded,
      category: category,
      label: label,
      checked: checkedState,
      minimum: minimo,
      maximum: maximo,
    };
    onDataSend(dataToSend); // Call the parent's function with data
  };

  const handleMaximumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaximo(Number(e.target.value));
    const dataToSend = {
      action: "maximum",
      id: id,
      type: type,
      expanded: expanded,
      category: category,
      label: label,
      checked: checkedState,
      minimum: minimo,
      maximum: maximo,
    };
    onDataSend(dataToSend); // Call the parent's function with data
  };

  return (
    <div>
    {type == "checkbox" ? (
    <div className="flex items-center gap-2">
      <button onClick={handleCheckboxChange}>
        <Icon 
          icon={checkedState ? "checkbox-checked" : "checkbox-unchecked"}
          size={24}
          color={checkedState ? "filter-fucsia-svg" : "filter-gris-medio-svg"}
        />
      </button>
      <div className="font-normal">
        <p>{label}</p>
      </div>
    </div>
    ) : type === "range" ? (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            id={id + "-minimum"}
            type="number"
            placeholder="Mínimo"
            className="p-2 focus:outline-none font-normal w-[100px]"
            value={minimo}
            onChange={handleMinimumChange}
          />
          -
          <input
            id={id + "-maximum"}
            type="number"
            placeholder="Máximo"
            className="p-2 focus:outline-none font-normal w-[100px]"
            value={maximo}
            onChange={handleMaximumChange}
          />
        </div>
      </div>
    ) : (
        <div>Radio</div>
    )}
    </div>
  );
}
