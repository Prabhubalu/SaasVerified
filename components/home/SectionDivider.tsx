"use client";

import Image from "next/image";

export function SectionDivider() {
  return (
    <div className="relative h-6 mb-10">
      <div className="relative left-0 right-0 bottom-0 w-full overflow-hidden pointer-events-none">
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

