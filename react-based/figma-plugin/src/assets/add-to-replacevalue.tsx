import React from 'react'
import { SVGInterface } from './svgInterfaces'

export const AddToReplaceValue = ({ className }: SVGInterface) => {
  return (<svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="6" height="1" transform="matrix(-1 0 0 1 13 9)" fill="currentColor" />
    <rect width="1" height="10" transform="matrix(-1 0 0 1 6 3)" fill="currentColor" />
    <rect width="3" height="1" transform="matrix(-1 0 0 1 7 2)" fill="currentColor" />
    <rect width="5" height="1" transform="matrix(-1 0 0 1 15 3)" fill="currentColor" />
    <rect width="5" height="1" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 13 6)" fill="currentColor" />
    <rect width="3" height="1" transform="matrix(-1 0 0 1 7 13)" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7 7H13C14.1046 7 15 7.89543 15 9V10C15 11.1046 14.1046 12 13 12H7V11H13C13.5523 11 14 10.5523 14 10V9C14 8.44772 13.5523 8 13 8H7V7ZM4 11H3C2.44771 11 2 10.5523 2 10V9C2 8.44772 2.44771 8 3 8H4V7H3C1.89543 7 1 7.89543 1 9V10C1 11.1046 1.89543 12 3 12H4V11Z" fill="currentColor" />
  </svg>
  )
}