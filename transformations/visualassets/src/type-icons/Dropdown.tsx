import * as React from "react";
import type { SVGProps } from "react";
const SvgDropdown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillOpacity={0.8}
      d="M16 18H9v-8h14v5.429h1V9H8v10h8v-1Z"
    />
    <path
      fill="#000"
      fillOpacity={0.8}
      fillRule="evenodd"
      d="M24 22.5h-8v-1h8v1Zm0 3h-8v-1h8v1Z"
      clipRule="evenodd"
    />
    <path fill="#000" fillOpacity={0.8} d="m20 20 2.5-3h-5l2.5 3Z" />
  </svg>
);
export default SvgDropdown;
