import * as React from "react";
import type { SVGProps } from "react";
const SvgTooltip = (props: SVGProps<SVGSVGElement>) => (
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
      d="M21.622 1.5h-10.91a1 1 0 0 0-1 1v10.911a1 1 0 0 0 1 1h10.91a1 1 0 0 0 1-1V2.5a1 1 0 0 0-1-1Zm-10.91-1a2 2 0 0 0-2 2v10.911a2 2 0 0 0 2 2h10.91a2 2 0 0 0 2-2V2.5a2 2 0 0 0-2-2h-10.91Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillOpacity={0.8}
      fillRule="evenodd"
      d="M15.667 11.76V7.047h1v4.711h-1ZM16.167 6.087a.75.75 0 0 0 .75-.75V5.27a.75.75 0 0 0-1.5 0v.067c0 .415.335.75.75.75Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillOpacity={0.8}
      d="m14.642 18.8 1.525-2.033 1.525 2.033h6.641a2 2 0 0 1 2 2V29a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8.2a2 2 0 0 1 2-2h6.642Z"
    />
    <path
      fill="#fff"
      d="M10.84 27.689h.807v-4.744h1.808v-.752H9.04v.752h1.8v4.744ZM16.182 22.865a.485.485 0 0 0 .472-.48.484.484 0 0 0-.472-.472.48.48 0 0 0-.48.472c0 .256.208.48.48.48Zm-.4 4.824h.792v-4.136h-.792v4.136ZM21.455 23.457c-.64 0-1.152.304-1.472.808v-.712H19.2v5.512h.784v-2.096c.32.512.832.816 1.472.816 1.088 0 1.904-.896 1.904-2.168 0-1.264-.816-2.16-1.904-2.16Zm-.192 3.64c-.744 0-1.28-.616-1.28-1.48s.536-1.472 1.28-1.472c.76 0 1.296.608 1.296 1.472s-.536 1.48-1.296 1.48Z"
    />
  </svg>
);
export default SvgTooltip;
