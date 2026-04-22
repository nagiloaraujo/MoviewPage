"use client";

import React, { useState } from "react";

export default function BrandLogo({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className="moview-brand-image"
      loading="lazy"
      onError={() => {
        if (currentSrc !== "/processed/logo-moview.png") {
          setCurrentSrc("/processed/logo-moview.png");
        }
      }}
    />
  );
}
