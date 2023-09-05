import * as React from "react";
import type { SVGProps } from "react";
const SvgTitle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.5 26v.5h29v-21h-29V26Zm28-.5h-27V15h27v10.5Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillOpacity={0.8}
      fillRule="evenodd"
      d="M6 22.5h10v-1H6v1Zm0-3h10v-1H6v1Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      d="M8.048 13h.992V8.416h1.76v-.912H6.288v.912h1.76V13Zm4.07-4.76a.565.565 0 0 0 .552-.56.558.558 0 0 0-.552-.552.56.56 0 0 0-.56.552c0 .296.248.56.56.56ZM11.622 13h.976V8.864h-.976V13Zm4.119-.888a.59.59 0 0 1-.408.152c-.232 0-.408-.2-.408-.48V9.672h.936v-.808h-.936V7.728h-.952v1.136h-.6v.808h.6v2.232c0 .696.48 1.192 1.168 1.192.312 0 .648-.128.88-.328l-.28-.656Zm1.037.888h.976V7.408h-.976V13Zm3.983-.768c-.592 0-1.024-.4-1.144-.968h3.12c0-1.528-.744-2.496-2.024-2.496-1.176 0-2.104.912-2.104 2.152 0 1.272.976 2.176 2.16 2.176.6 0 1.32-.256 1.68-.64l-.616-.64c-.232.24-.688.416-1.072.416Zm-.008-2.6c.584 0 .936.368 1.048.888h-2.176c.144-.544.584-.888 1.128-.888Z"
    />
  </svg>
);
export default SvgTitle;
