import * as React from "react";
import type { SVGProps } from "react";
const SvgHeading = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11 21.5h10v-1H11v1ZM11 18.5h10v-1H11v1ZM15.822 10.191v1.96H13.42v-1.96h-.875V15h.875v-2.051h2.4V15h.876v-4.809h-.875ZM18.505 15h.868v-4.809h-.7l-1.35.917.356.616.826-.525V15Z"
    />
    <path
      fill="#313131"
      fillRule="evenodd"
      d="M6 4h20v23H6V4Zm1 1v21h18V5H7Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHeading;
