"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import ProductSearchModal from "./ProductSearchModal";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleOpenModal();
          }
        }}
      >
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </div>
      <ProductSearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default SearchBar;
