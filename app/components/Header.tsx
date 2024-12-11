"use client";

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/icone_apolo.png"
            alt="Apolo Lab Logo" 
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold text-[#FF6B00]">Apolo Lab</h1>
        </div>
        <button onClick={() => setMenuAberto(prev => !prev)} className="md:hidden">
          <FaBars className="text-2xl" />
        </button>
        <nav className={`${menuAberto ? "block" : "hidden"} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}>
          <ul className="md:flex space-y-2 md:space-y-0 space-x-0 md:space-x-6 text-gray-600">
            <li className="cursor-pointer hover:text-[#FF6B00] transition-colors">
              Dashboard
            </li>
            <li className="cursor-pointer hover:text-[#FF6B00] transition-colors">
              Circuitos
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 