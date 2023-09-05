import * as React from "react";
import type { SVGProps } from "react";
const SvgSubheading = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11 14.5h10v-1H11v1ZM11 11.5h10v-1H11v1ZM15.09 17.191v1.96h-2.4v-1.96h-.876V22h.875v-2.051h2.401V22h.875v-4.809h-.875ZM16.78 22h3.535v-.798h-2.177l1.008-.812c.826-.637 1.12-1.148 1.12-1.785 0-.889-.728-1.498-1.68-1.498-.777 0-1.358.343-1.813.938l.567.525c.35-.42.714-.679 1.218-.679.434 0 .819.28.819.735 0 .392-.217.756-.826 1.246l-1.771 1.414V22Z"
    />
    <path
      fill="#313131"
      fillRule="evenodd"
      d="M6.5 4.5h19v22h-19v-22Zm1 1v20h17v-20h-17Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSubheading;
