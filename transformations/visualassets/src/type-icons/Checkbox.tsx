import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckbox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#000"
      fillOpacity={0.8}
      fillRule="evenodd"
      d="M13.5 19h-6v6h6v-6Zm-7-1v8h8v-8h-8Z"
      clipRule="evenodd"
    />
    <path fill="#000" fillOpacity={0.8} d="M6.5 8h8v8h-8V8Z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M13.354 10.854 10 14.207l-2.354-2.353.708-.708L10 12.793l2.646-2.647.708.708Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillOpacity={0.8}
      fillRule="evenodd"
      d="M25.5 12.5H17v-1h8.5v1ZM25.5 22.5H17v-1h8.5v1Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckbox;
