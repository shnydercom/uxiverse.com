import * as React from "react";
import type { SVGProps } from "react";
const SvgIcon = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule="evenodd"
      d="M6 27.5h21v-1h-6.874l-.625-3H29.5v-18h-26v18h10l-.626 3H6v1ZM19 26h-5l.417-2h4.166L19 26ZM4.5 6.5h24v13h-24v-13Zm0 14h24v2h-24v-2Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillOpacity={0.8}
      d="m16.5 8.5.955 3.346L20.83 11l-2.42 2.5 2.42 2.5-3.375-.846L16.5 18.5l-.955-3.346L12.17 16l2.42-2.5-2.42-2.5 3.375.846L16.5 8.5Z"
    />
  </svg>
);
export default SvgIcon;
