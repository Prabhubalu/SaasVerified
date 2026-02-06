"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SaaSRecommendationsModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SaaSRecommendationsModalContext = createContext<SaaSRecommendationsModalContextType | undefined>(undefined);

export function SaaSRecommendationsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SaaSRecommendationsModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </SaaSRecommendationsModalContext.Provider>
  );
}

export function useSaaSRecommendationsModal() {
  const context = useContext(SaaSRecommendationsModalContext);
  if (context === undefined) {
    throw new Error("useSaaSRecommendationsModal must be used within a SaaSRecommendationsModalProvider");
  }
  return context;
}



