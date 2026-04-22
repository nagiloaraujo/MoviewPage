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
        className="drop-shadow-[0_0_18px_rgba(120,155,255,0.25)]"
        style={{ width: "44px", height: "auto" }}
        priority={false}
      />

      {withText ? (
        <div className="leading-none">
          <div className="text-base font-semibold tracking-[0.14em]">MOVIEW</div>
          <div className="text-[11px] tracking-[0.22em] text-white/70">AUTOMAÇÃO</div>
        </div>
      ) : null}
    </div>
  );
}
