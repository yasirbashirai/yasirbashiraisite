// AI sparkle, three-star cluster reminiscent of the Claude/AI mark.
// Inherits color via currentColor so it tints to any text color.

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

const AiSparkle = ({ size = 18, className = "", ...rest }: Props) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...rest}
  >
    {/* Big centre sparkle */}
    <path d="M21.5 6 L23.4 13 L30 15 L23.4 17 L21.5 24 L19.6 17 L13 15 L19.6 13 Z" />
    {/* Top-left small sparkle */}
    <path d="M9 3 L9.9 6 L13 7 L9.9 8 L9 11 L8.1 8 L5 7 L8.1 6 Z" />
    {/* Bottom-left tiny sparkle */}
    <path d="M6.5 19 L7.2 21.2 L9.5 22 L7.2 22.8 L6.5 25 L5.8 22.8 L3.5 22 L5.8 21.2 Z" />
  </svg>
);

export default AiSparkle;
