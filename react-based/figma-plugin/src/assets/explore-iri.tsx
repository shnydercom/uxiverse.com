import React from 'react'
import { SVGInterface } from './svgInterfaces'

export const ExploreIRI = ({ className }: SVGInterface) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="-0.5" x2="4" y2="-0.5" transform="matrix(0 1 1 0 9 3)" stroke="currentColor" />
            <path d="M11.5 10L8.5 7.5" stroke="currentColor" />
            <path d="M7.87874 7.51495L4.5 8.5" stroke="currentColor" />
            <circle cx="1.5" cy="1.5" r="1" transform="matrix(-1 0 0 1 10 1)" stroke="currentColor" />
            <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(-1 0 0 1 10 6)" fill="currentColor" />
            <circle cx="1.5" cy="1.5" r="1" transform="matrix(-1 0 0 1 14 9)" stroke="currentColor" />
            <circle cx="1.5" cy="1.5" r="1" transform="matrix(-1 0 0 1 5 7)" stroke="currentColor" />
        </svg>
    )
}