import React from "react";

interface GleetLogoProps {
  className?: string;
  size?: number | string;
  strokeColor?: string;
}

export default function GleetLogo({ className = "", size = 36, strokeColor = "#5c7564" }: GleetLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`inline-block select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal outline (Flat top and bottom, pointed left and right) with transparent background */}
      <polygon
        points="27,12 73,12 96,50 73,88 27,88 4,50"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      
      {/* Diagonal crossing lines forming 'X' starting exactly from vertices */}
      <line
        x1="27"
        y1="12"
        x2="73"
        y2="88"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="73"
        y1="12"
        x2="27"
        y2="88"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
