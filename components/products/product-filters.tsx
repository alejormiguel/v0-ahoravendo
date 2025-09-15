"use client"

import { useState } from "react"
import Section from "@/components/products/section"
import FilterCheckbox from "@/components/products/filter-checkbox";
import Chip from "@/components/products/chip";

interface FilterProp {
  label: string;
  checked: boolean;
  minimum?: number;
  maximum?: number;
}

interface FiltersProp {
  category: string;
  type: string;
  expanded: boolean;
  filters: Array<FilterProp>;
}

interface DataSend {
  action: string;
  id: string;
  type: string;
  category: string;
  label?: string;
  checked: boolean;
  minimum?: number;
  maximum?: number;
}

function hasActiveFilters(category: FiltersProp) {
    // Checking if an element was found
    const hasActiveFilters = category.filters.find((option) => option.checked) !== undefined;
    return hasActiveFilters;
}

function getActiveFiltersLabels(filtersArray: Array<FiltersProp>) {
    // Generate an array with the labels of each checked filter
    const activeFiltersLabels = filtersArray.reduce((acc: string[], filter) => {
      const checkedFilters = filter.filters.filter((option) => option.checked);
      if (checkedFilters.length > 0) {
        checkedFilters.map((option) => acc.push(option.label));
      }
      return acc;
    }, []);
    return activeFiltersLabels;
}

export default function ProductFilters({filtersArray}:{filtersArray:Array<FiltersProp>}){
  const [activeFilters, setActiveFilters] = useState(filtersArray);

  const handleDataFromChild = (filterChecked: DataSend) => {
    // Set the activeFilters variable. In order to avoid the direct state mutation I have to create a new array instead of updating the values of the original array.
    setActiveFilters(prevActiveFilters => {
      return prevActiveFilters.map(filter => {
        if (filter.category === filterChecked.category) {
          return {
            ...filter,
            filters: filter.filters.map(option => {
              if (option.label === filterChecked.label) {
                return {
                  ...option,
                  checked: filterChecked.checked,
                  minimum: filterChecked.minimum,
                  maximum: filterChecked.maximum
                };
              }
              return option;
            })
          };
        }
        return filter;
      });
    });
  };

  return(
    <div className="py-4 md:py-6 lg:py-6 xl:py-12">
      <div className="flex-1 mb-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col font-['Montserrat:Bold',_sans-serif] font-bold justify-center text-[#000000] text-[20px] text-left text-nowrap">
            <p>Filtros ({getActiveFiltersLabels(activeFilters).length})</p>
          </div>
          <div className="flex flex-col font-['Montserrat:Medium',_sans-serif] font-medium justify-center text-[#bc00b8] text-[14px] text-left text-nowrap" data-node-id="2085:91164" style={{ left: "calc(16.667% + 95px)" }}>
            <p className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font]">Eliminar todos</p>
          </div>
        </div>
        <div className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[0] text-[#323232] text-[14px] text-left text-nowrap mb-4">
          <p className="block leading-[20px] whitespace-pre">470 resultados</p>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {/* Chips */}
          {getActiveFiltersLabels(activeFilters).map((filter, index) => (
            <Chip key={index} label={filter}/>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start p-0 pr-4 relative size-full font-['Montserrat:Bold',_sans-serif] font-bold text-[#000000] text-[16px]">
        {filtersArray.map((filter, index) => (
          <Section
            key={index}
            expanded={hasActiveFilters(filter)}
            title={filter.category}
            openIcon="agregar-circulo"
            closeIcon="cerrar-circulo"
            iconSize={24}
            iconColor="filter-fucsia-svg"
            fontSize={16}>
            <div className="flex flex-col gap-2">
              {filter.filters.map((option, filterIndex) => (
                <FilterCheckbox
                  key={index.toString()+"-"+filterIndex.toString()}
                  id={index.toString()+"-"+filterIndex.toString()}
                  type={filter.type}
                  expanded={filter.expanded}
                  category={filter.category}
                  label={option.label}
                  checked={option.checked}
                  minimum={option.minimum}
                  maximum={option.maximum}
                  onDataSend={handleDataFromChild}/>
              ))}
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}