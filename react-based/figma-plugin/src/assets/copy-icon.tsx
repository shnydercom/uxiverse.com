import React from 'react'
import { SVGInterface } from './svgInterfaces'

export const CopyIcon = ({ className }: SVGInterface) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3.5" y="5.5" width="7" height="7" rx="1.5" stroke="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M8 3H12C12.5523 3 13 3.44772 13 4V8C13 8.55228 12.5523 9 12 9V10C13.1046 10 14 9.10457 14 8V4C14 2.89543 13.1046 2 12 2H8C6.89543 2 6 2.89543 6 4H7C7 3.44772 7.44772 3 8 3Z" fill="currentColor" />
        </svg>
    )
}