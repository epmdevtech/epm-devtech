import { memo } from "react";

/** Gradientes SVG do logotipo (extraídos literalmente de EpmConstellation). */
const ConstellationDefs = ({ id: uniqueId }: { id: string }) => (
  <defs>
    {/* Gradiente primário para modo Dark */}
    <linearGradient id={`${uniqueId}-darkGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
      <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.4" />
    </linearGradient>

    {/* Gradiente primário para modo Light (alto contraste contra surface-anchor) */}
    <linearGradient id={`${uniqueId}-lightGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0F766E" stopOpacity="0.5" />
      <stop offset="50%" stopColor="#0D9488" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#115E59" stopOpacity="0.5" />
    </linearGradient>

    {/* Feixe ativo de dados */}
    <linearGradient id={`${uniqueId}-flowGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.1" />
      <stop offset="50%" stopColor="#2DD4BF" stopOpacity="1" />
      <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.1" />
    </linearGradient>

    {/* Radial glow central */}
    <radialGradient id={`${uniqueId}-coreGlow`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.35" />
      <stop offset="60%" stopColor="#2DD4BF" stopOpacity="0.08" />
      <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
    </radialGradient>
  </defs>
);

export default memo(ConstellationDefs);
