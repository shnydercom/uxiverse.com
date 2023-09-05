import * as React from "react";
import type { SVGProps } from "react";
const SvgDatepicker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#373737"
      fillRule="evenodd"
      d="m20.207 22.5 4.293-4.293V9h-16v13.5h11.707ZM9.5 21.5V13h14v4.5h-4v4h-10Zm11-.707V18.5h2.293L20.5 20.793Z"
      clipRule="evenodd"
    />
    <path
      fill="#373737"
      d="M10.5 14.5h2v2h-2v-2ZM10.5 17.5h2v2h-2v-2ZM13.5 14.5h2v2h-2v-2ZM13.5 17.5h2v2h-2v-2ZM16.5 14.5h2v2h-2v-2ZM16.5 17.5h2v2h-2v-2ZM19.5 14.5h2v2h-2v-2Z"
    />
  </svg>
);
export default SvgDatepicker;
