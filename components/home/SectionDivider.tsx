"use client";

import Image from "next/image";

export function SectionDivider() {
  return (
    <div className="relative h-6 mb-10">
      <div
        className="relative left-1/2 -translate-x-1/2 bottom-0 w-screen -ml-[calc((100vw-100%)/2)] pointer-events-none"
        
      >
        <Image
          src="/assets/divider.svg"
          alt="Section divider"
          width={1600}
          height={16}
          className="w-full"
          priority
        />
      </div>
    </div>
  );
}

