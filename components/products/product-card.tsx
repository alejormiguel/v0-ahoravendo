"use client";

import { Icon } from "@/components/icons/icon"
import React, { useState } from "react";

interface ProductCardProps {
  id: string,
  image: string;
  store: string;
  discount: string;
  seller: string;
  location: string;
  title: string;
  variants: string;
  price: number;
  oldPrice: number;
  opinions: number;
  rating: number;
  favorite: boolean;
}

export default function ProductCard({product, query}: {product: ProductCardProps, query: string}){
  const [favoriteState, setFavoriteState] = useState(product.favorite);

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

  const discountBackgroundClass = product.discount === "" ? "" : "bg-[#e6f3fe] ";

  return (
    <a href={"/products/" + product.id + "?q=" + query} className="font-montserrat border border-[#d8d8d8] border-solid rounded-2xl p-4">
      <div className="bg-white flex flex-row gap-2 items-center justify-start">
        <div className="flex flex-col gap-2 items-start justify-start">
          <div className="flex flex-row items-center justify-between w-full h-[28px]">
            <div className={discountBackgroundClass + "flex flex-row gap-1 items-center justify-center px-2 py-0.5 rounded"}>
              <span className="font-medium text-[#008bf5] text-[14px]">{product.discount}</span>
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
          <div className="flex items-center justify-center w-full aspect-square">
            <div className="flex-none w-full">
              <img className="bg-white rounded-xl w-full bg-center bg-contain bg-no-repeat" src={product.image} />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <div className="flex flex-row gap-4">
              <div className="bg-white ml-0 mt-0 rounded-xl shadow size-11 bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url('${product.store}')` }} />
              <div className="flex flex-col font-normal justify-center text-black text-[14px] text-left">
                <p className="mb-0">Vendido por: </p>
                <p>{product.seller}</p>
              </div>
            </div>
            <div className="font-bold min-w-full text-black text-[14px] text-left" style={{ width: "min-content" }}>
              <p>{product.location}</p>
            </div>
            <div className="font-bold text-black text-[20px] text-left w-full overflow-hidden">
              <p className="line-clamp-2 break-words">{product.title}</p>
            </div>
            <div className="flex flex-row gap-2 items-center h-[21px]">
              <div className="flex flex-row ml-0 place-items-start relative">
                {product.rating > 0 && renderStars(product.rating)}
              </div>
              <div className="font-normal text-black text-[14px] text-left">
                <p>{product.rating > 0 && "(" + product.opinions + " opiniones)"}</p>
              </div>
            </div>
            <div className="font-normal text-black text-[14px] text-left text-nowrap">
              <p className="">{product.variants}</p>
            </div>
            <div className="text-[#323232] text-left h-[48px] flex flex-col items-left justify-end">
              {product.oldPrice > 0 && (
                <div className="font-normal text-[14px]">
                  <p className="line-through">{product.oldPrice.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</p>
                </div>
              )}
              <div className="font-bold text-[18px]">
                <p>{product.price.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
