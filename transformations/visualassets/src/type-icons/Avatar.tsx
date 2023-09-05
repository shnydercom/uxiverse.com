import * as React from "react";
import type { SVGProps } from "react";
const SvgAvatar = (props: SVGProps<SVGSVGElement>) => (
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
      d="M23.375 12a7.5 7.5 0 0 0-15 0h.917c-.11.482-.167.985-.167 1.5v.047a1.5 1.5 0 0 0 .19 2.942c.79 3.44 3.89 6.011 6.56 6.011 2.67 0 5.77-2.572 6.56-6.011a1.5 1.5 0 0 0 .19-2.942V13.5a6.77 6.77 0 0 0-.167-1.5h.917Zm-13.052 0h11.104c.13.478.198.981.198 1.5v.822l.75.194a.5.5 0 0 1-.062.98l-.696.085-.157.684c-.344 1.498-1.197 2.823-2.264 3.772-1.078.957-2.293 1.463-3.321 1.463s-2.243-.506-3.32-1.463c-1.068-.948-1.92-2.274-2.265-3.772l-.157-.684-.696-.085a.5.5 0 0 1-.063-.98l.751-.194V13.5c0-.519.069-1.022.198-1.5Z"
      clipRule="evenodd"
    />
    <path stroke="#000" strokeOpacity={0.8} d="M3 3h26v26H3z" />
    <path
      fill="#000"
      fillOpacity={0.8}
      d="M4.243 27.143 3.5 29h25l-.743-1.857A5 5 0 0 0 23.115 24H8.885a5 5 0 0 0-4.642 3.143Z"
    />
  </svg>
);
export default SvgAvatar;
