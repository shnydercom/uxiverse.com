import * as React from "react";
import type { SVGProps } from "react";
const SvgSwitch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#313131"
      fillRule="evenodd"
      d="M12 24h8a3 3 0 1 0 0-6h-8a3 3 0 1 0 0 6Zm8 1a4 4 0 0 0 0-8h-8a4 4 0 0 0 0 8h8Z"
      clipRule="evenodd"
    />
    <path fill="#313131" d="M20 17h-8a4 4 0 0 0 0 8h8a4 4 0 0 1 0-8Z" />
    <path
      fill="#313131"
      fillRule="evenodd"
      d="M23 21a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm-3 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8h-8a3 3 0 1 0 0 6h8a3 3 0 1 0 0-6Zm-8-1a4 4 0 1 0 0 8h8a4 4 0 0 0 0-8h-8Z"
      clipRule="evenodd"
    />
    <path
      fill="#313131"
      fillRule="evenodd"
      d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSwitch;
