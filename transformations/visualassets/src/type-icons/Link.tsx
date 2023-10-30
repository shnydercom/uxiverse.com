import * as React from "react";
import type { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Zm-.47-14.589 1.83-1.829a1.945 1.945 0 1 1 2.75 2.751l-1.829 1.829.707.707 1.829-1.829a2.945 2.945 0 1 0-4.165-4.165l-1.829 1.829.708.707Zm-3.948 6.699c-.76-.76-.76-1.991 0-2.75l1.944-1.944-.707-.707-1.944 1.943a2.945 2.945 0 1 0 4.165 4.165l1.944-1.943-.708-.707-1.943 1.943c-.76.76-1.991.76-2.75 0Zm6.926-6.219-4.617 4.617-.707-.707 4.617-4.617.707.707Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLink;
