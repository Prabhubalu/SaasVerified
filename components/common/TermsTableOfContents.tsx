"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  title: string;
}

interface TermsTableOfContentsProps {
  sections: Section[];
}

export function TermsTableOfContents({ sections }: TermsTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240; // Offset for navbar

      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 160; // Account for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-40 h-[calc(100vh-10rem)] overflow-y-auto">
      <div className="relative border-l-2 border-gray-200 pl-6">
        <h3 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
          Table of Contents
        </h3>
        <nav className="space-y-3">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <div key={section.id} className="relative">
                {isActive && (
                  <div 
                    className="absolute w-2 h-2 rounded-full bg-gray-900 z-20" 
                    style={{ 
                      left: '-26px',
                      top: '8px',
                      transform: 'translateX(1px)'
                    }} 
                  />
                )}
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  className={`block text-sm transition-colors leading-relaxed ${
                    isActive
                      ? "text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className={isActive ? "font-medium" : ""}>
                    {section.title}
                  </span>
                </a>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

