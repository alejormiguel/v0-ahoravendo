"use client";

import { Icon } from "@/components/icons/icon"
import React, { useState } from "react";
import { Key, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import Section from "@/components/products/section";

interface ProductReview {
  rating: number;
  createdAt: Date;
  comment: string;
}

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const [showModal, setShowModal] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState<number | null>(null); // null = Todas
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Filtered and sorted reviews for modal
  const filteredReviews = React.useMemo(() => {
    let result = selectedStars ? reviews.filter((r) => r.rating === selectedStars) : reviews.slice();
    result.sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
    });
    return result;
  }, [reviews, selectedStars, sortOrder]);

  function renderStars(rating: number) {
    const listItems = [];
    for (let i = 0; i < rating; i++) {
      listItems.push(<Icon key={i} icon="star-on" size={24} color="filter-fucsia-svg" />);
    }
    for (let i = 0; i < (5 - rating); i++) {
      listItems.push(<Icon key={i + 5} icon="star-on" size={24} color="filter-gris-light-medium-svg" />);
    }
    return listItems;
  }

  return (
    <>
      <Section title={`Opiniones del producto (${reviews.length})`} expanded={true}>
        <div className="space-y-8 mt-8">
          {reviews.length === 0 && (
            <p className="font-montserrat text-[14px] text-[#969696]">
              No hay opiniones para este producto.
            </p>
          )}
          {reviews.length > 0 && reviews.slice(0, 5).map((review, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center">
                {renderStars(review.rating)}
                <span className="ml-2 text-[#646464] text-[14px]">{review.createdAt.toLocaleDateString("es-AR")}</span>
              </div>
              <p className="font-montserrat text-[14px] text-[#323232]">
                {review.comment}
              </p>
            </div>
          ))}
          {/* Cargar más opiniones */}
          {reviews.length > 5 && (
            <div>
              <button
                id="more-reviews"
                className="font-montserrat font-medium text-[16px] text-[#bc00b8] underline underline-offset-2"
                onClick={() => setShowModal(true)}
              >
                Cargar más opiniones
              </button>
            </div>
          )}
        </div>
      </Section>
      {/* Modal for all reviews */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full h-[80vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-2 right-2 text-[#bc00b8] font-bold text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <h2 className="font-montserrat font-bold text-2xl mb-6">Opiniones del producto</h2>
            <div className="flex flex-row gap-4 mb-6 relative">
              {/* Ordenar dropdown */}
              <div className="relative">
                <button
                  id="sort-reviews"
                  className="bg-white cursor-pointer relative rounded-full border border-[#d8d8d8] px-4 py-2 flex items-center justify-between gap-2 w-[200px]"
                  style={{ minWidth: 140, minHeight: 44 }}
                  onClick={() => setSortMenuOpen((open) => !open)}
                >
                  <span className="font-montserrat font-bold text-[18px] leading-[28px] text-[#323232]">
                    Ordenar
                  </span>
                  <span className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 10l5 5 5-5" stroke="#969696" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                {sortMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-[#d8d8d8] rounded-lg shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <button
                          className={`w-full text-left px-4 py-2 hover:bg-[#f3e8ff] font-montserrat ${sortOrder === 'desc' ? 'font-bold text-[#bc00b8]' : ''}`}
                          onClick={() => { setSortOrder('desc'); setSortMenuOpen(false); }}
                        >
                          Más recientes
                        </button>
                      </li>
                      <li>
                        <button
                          className={`w-full text-left px-4 py-2 hover:bg-[#f3e8ff] font-montserrat ${sortOrder === 'asc' ? 'font-bold text-[#bc00b8]' : ''}`}
                          onClick={() => { setSortOrder('asc'); setSortMenuOpen(false); }}
                        >
                          Menos recientes
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Calificación dropdown */}
              <div className="relative">
                <button
                  id="filter-reviews"
                  className="bg-white cursor-pointer relative rounded-full border border-[#d8d8d8] px-4 py-2 flex items-center justify-between gap-2 w-[200px]"
                  style={{ minWidth: 140, minHeight: 44 }}
                  onClick={() => setFilterMenuOpen((open) => !open)}
                >
                  <span className="font-montserrat font-bold text-[18px] leading-[28px] text-[#323232]">
                    Calificación
                  </span>
                  <span className="ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 10l5 5 5-5" stroke="#969696" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                {filterMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-[#d8d8d8] rounded-lg shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <button
                          className={`w-full text-left px-4 py-2 hover:bg-[#f3e8ff] font-montserrat ${selectedStars === null ? 'font-bold text-[#bc00b8]' : ''}`}
                          onClick={() => { setSelectedStars(null); setFilterMenuOpen(false); }}
                        >
                          Todas
                        </button>
                      </li>
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <li key={stars}>
                          <button
                            className={`w-full text-left px-4 py-2 hover:bg-[#f3e8ff] font-montserrat ${selectedStars === stars ? 'font-bold text-[#bc00b8]' : ''}`}
                            onClick={() => { setSelectedStars(stars); setFilterMenuOpen(false); }}
                          >
                            {stars} estrella{stars > 1 ? 's' : ''}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              {filteredReviews.length === 0 && (
                <p className="font-montserrat text-[14px] text-[#969696]">No hay opiniones para este filtro.</p>
              )}
              {filteredReviews.map((review, index) => (
                <div key={index} className="flex flex-col gap-2 border-b pb-4">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-[#646464] text-[14px]">{review.createdAt.toLocaleDateString("es-AR")}</span>
                  </div>
                  <p className="font-montserrat text-[14px] text-[#323232]">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}