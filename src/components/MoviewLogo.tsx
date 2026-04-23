import Image from "next/image";
import React from "react";

export default function MoviewLogo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <div className={className}>
      <Image
        src="/logo-moview.png"
        alt="Moview logo"
        width={44}
        height={44}
        className="h-auto w-11 drop-shadow-[0_0_18px_rgba(120,155,255,0.25)] max-[385px]:w-9"
        priority={false}
      />

      {withText ? (
        <div className="leading-none">
          <div className="text-base font-semibold tracking-[0.14em] max-[385px]:text-sm">MOVIEW</div>
          <div className="text-[11px] tracking-[0.22em] text-white/70 max-[385px]:text-[10px]">AUTOMAÇÃO</div>
        </div>
      ) : null}
    </div>
  );
}
