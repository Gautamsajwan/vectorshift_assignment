"use client";

import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "../store";

export const HamburgerButton = () => {
  const { isMenuOpen, toggleMenu } = useStore(
    (state) => ({
      isMenuOpen: state.isMenuOpen,
      toggleMenu: state.toggleMenu,
    })
  );

  return (
    <Button
      size="lg"
      className="lg:hidden bg-[#8B5DFF] hover:bg-[#9d78fa] border-none"
      onClick={toggleMenu}
    >
      {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
    </Button>
  );
};
