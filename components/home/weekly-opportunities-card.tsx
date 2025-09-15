"use client";

import { Icon } from "@/components/icons/icon";
import React, { useState } from "react";

interface WeeklyOpportunitiesCardProps {
  layout: string;
  title: string;
  discount?: string;
  dailyOffer?: boolean;
  favorite?: boolean;
  image: string;
  price: string;
  oldPrice?: string;
  opinions: string;
  rating: number;
}

export default function WeeklyOpportunitiesCard({layout, title, discount, dailyOffer, favorite, image, price, oldPrice, opinions, rating}: WeeklyOpportunitiesCardProps) {
  const [favoriteState, setFavoriteState] = useState(favorite);

  function renderStars(rating: number) {
    const listItems = [];
    for (let i = 0; i < rating; i++) {
      listItems.push(<Icon key={i} icon="star-on" size={16} color="filter-fucsia-svg" />);
    }
    for (let i = 0; i < (5-rating); i++) {
      listItems.push(<Icon key={i+5} icon="star-on" size={16} color="filter-gris-light-medium-svg" />);
    }
    return listItems;
  }

  let content;
  if (layout === 'square') {
    content = (
      <div className="bg-white rounded-lg border border-[#d8d8d8] w-full h-full flex flex-col overflow-hidden p-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {discount && <span className="bg-[#e6f3fe] text-[#008bf5] font-medium text-[14px] rounded px-2 py-0.5">{discount}</span>}
            {dailyOffer && <span className="bg-[#33cccc] text-white font-medium text-[14px] rounded px-2 py-0.5">OFERTA DEL DÍA</span>}
          </div>
          {!favoriteState && (
          <button onClick={(e) => setFavoriteState(true)}>
            <img src="/images/common/heart-off.svg" alt="Favorito" className="w-6 h-6" />
          </button>
          )}
          {favoriteState && (
          <button onClick={(e) => setFavoriteState(false)}>
            <img src="/images/common/heart-on.svg" alt="Favorito" className="w-6 h-6" />
          </button>
          )}
        </div>
        <div className="flex flex-row mt-4">
          <img src={image} alt="" className="object-cover w-[170px] h-[170px]" />
          <div className="flex flex-col justify-between pl-4 flex-1">
            <div>
              <div className="flex flex-col">
                <span className="text-[18px] font-normal text-black line-through">{oldPrice}</span>
                <span className="text-[28px] font-bold text-[#323232]">{price}</span>
              </div>
              <div className="text-[20px] font-bold text-black leading-[28px] mt-2">{title}</div>
              <div className="flex items-center mt-2">
                {renderStars(rating)}
                <span className="text-[14px] font-normal text-black ml-2">{opinions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    content = (
      <div className="bg-white rounded-lg border border-[#d8d8d8] w-full h-full flex flex-col overflow-hidden p-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {discount && <span className="bg-[#e6f3fe] text-[#008bf5] font-medium text-[14px] rounded px-2 py-0.5">{discount}</span>}
            {dailyOffer && <span className="bg-[#33cccc] text-white font-medium text-[14px] rounded px-2 py-0.5">OFERTA DEL DÍA</span>}
          </div>
          {!favoriteState && (
          <button onClick={(e) => setFavoriteState(true)}>
            <img src="/images/common/heart-off.svg" alt="Favorito" className="w-6 h-6" />
          </button>
          )}
          {favoriteState && (
          <button onClick={(e) => setFavoriteState(false)}>
            <img src="/images/common/heart-on.svg" alt="Favorito" className="w-6 h-6" />
          </button>
          )}
        </div>
        <div className="flex flex-col">
          <img src={image} alt="" className="object-none h-[240px] rounded-xl mt-6" />
          <div className="flex flex-col justify-between py-6 px-4 flex-1">
            <div>
              <div className="flex flex-col">
                <span className="text-[18px] font-normal text-black line-through">{oldPrice}</span>
                <span className="text-[28px] font-bold text-[#323232]">{price}</span>
              </div>
              <div className="text-[20px] font-bold text-black leading-[28px] mt-2">{title}</div>
              <div className="flex items-center mt-2">
                {renderStars(rating)}
                <span className="text-[14px] font-normal text-black ml-2">{opinions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(content);
};