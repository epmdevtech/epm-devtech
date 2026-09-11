import React from "react";

interface BrandChipIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const BrandChipIcon: React.FC<BrandChipIconProps> = ({
  size = 15,
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#10B981"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Contorno central do chip / die */}
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
      {/* Chave esquerda { */}
      <path d="M 4.5 5.5 C 3 5.5 3 9.5 3 10.5 C 3 11.5 1.5 12 1.5 12 C 1.5 12 3 12.5 3 13.5 C 3 14.5 3 18.5 4.5 18.5" />
      {/* Chave direita } */}
      <path d="M 19.5 5.5 C 21 5.5 21 9.5 21 10.5 C 21 11.5 22.5 12 22.5 12 C 22.5 12 21 12.5 21 13.5 C 21 14.5 21 18.5 19.5 18.5" />
      {/* Barramento / pino superior */}
      <line x1="10.5" y1="2.5" x2="13.5" y2="2.5" />
      {/* Barramento / pino inferior */}
      <line x1="10.5" y1="21.5" x2="13.5" y2="21.5" />
    </svg>
  );
};

export default BrandChipIcon;
