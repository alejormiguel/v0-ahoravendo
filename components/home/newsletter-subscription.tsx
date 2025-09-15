"use client"

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribing email:", email);
    // Reset form
    setEmail("");
    // Show success message or toast
    // TO-DO
  };
  return (
    <section className="relative flex items-center justify-center bg-[url('/images/home/registrate-background.png')] bg-contain">
      <div className="absolute inset-0 bg-gradient-to-r from-[#bc00b8]/80 to-[#33cccc]/80 opacity-80 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 py-10">
        <h3 className="text-white text-2xl md:text-3xl font-bold max-w-2xl drop-shadow-lg">
          Registrate en la plataforma y recibí antes que nadie las novedades
        </h3>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden h-12">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="flex-grow px-6 py-4 focus:outline-none text-gray-700 text-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#bc00b8] hover:bg-fuchsia-700 text-white px-8 flex items-center justify-center font-bold text-lg transition-colors rounded-xl"
          >
            <ArrowRight className="h-7 w-7" />
          </button>
        </form>
      </div>
    </section>
  );
}
