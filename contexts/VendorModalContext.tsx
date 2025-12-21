"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface VendorModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const VendorModalContext = createContext<VendorModalContextType | undefined>(undefined);

export function VendorModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <VendorModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </VendorModalContext.Provider>
  );
}

export function useVendorModal() {
  const context = useContext(VendorModalContext);
  if (context === undefined) {
    throw new Error("useVendorModal must be used within a VendorModalProvider");
  }
  return context;
}

