"use client";

import { Icon } from "@/components/icons/icon";
import React, { useState } from "react";

interface ProductRecommendationsCardProps {
  title: string;
  discount?: string;
  favorite?: boolean;
  image: string;
  sellerImage: string;
  seller: string;
  location: string;
  variants: number;
  price: string;
  oldPrice?: string;
  opinions: number;
  rating: number;
}

export default function ProductRecommendationsCard({
  title,
  discount,
  favorite,
  image,
  sellerImage,
  seller,
  location,
  variants,
  price,
  oldPrice,
  opinions,
  rating,
}: ProductRecommendationsCardProps) {
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
    
  return(
    <div className="bg-white rounded-2xl shadow border border-[#d8d8d8] flex flex-col p-4 text-[14px]">
      <div className="flex flex-row justify-between mb-4">
        {/* Discount tag */}
        <div className="bg-[#e6f3fe] text-[#008bf5] font-medium rounded px-2 w-fit">
          {discount}
        </div>
        {/* Heart icon */}
        {!favoriteState && (
        <button onClick={(e) => setFavoriteState(true)} className="">
          <img src="/images/common/heart-off.svg" alt="Favorito" className="w-6 h-6" />
        </button>
        )}
        {favoriteState && (
        <button onClick={(e) => setFavoriteState(false)} className="">
          <img src="/images/common/heart-on.svg" alt="Favorito" className="w-6 h-6" />
        </button>
        )}
      </div>
      {/* Product image */}
      <div className="flex items-center justify-center w-full h-[206px] mt-2">
        <img src={image} alt="" className="object-contain h-full rounded-xl" />
      </div>
      {/* Seller info */}
      <div className="flex items-center gap-3 mt-4">
        <img src={sellerImage} alt="" className="w-11 h-11 rounded-xl shadow" />
        <div className="">
          <p className="">Vendido por:</p>
          <p className="font-bold">{seller}</p>
        </div>
      </div>
      {/* Location */}
      <div className="mt-2 font-bold">{location}</div>
      {/* Product name */}
      <div className="mt-2 text-[20px] font-bold h-14 line-clamp-2 break-words">{title}</div>
      {/* Rating and opinions */}
      <div className="flex items-center mt-2">
        {renderStars(rating)}
        <span className="ml-2">({opinions} {opinions > 1 ? 'opiniones' : 'opinión'})</span>
      </div>
      {/* Variants */}
      <div className="mt-2">{variants} variante{variants > 1 ? 's' : ''}</div>
      {/* Price */}
      <div className="flex flex-col mt-2">
        <span className="line-through">{oldPrice}</span>
        <span className="text-[18px] font-bold text-[#323232]">{price}</span>
      </div>
    </div>
  )
};