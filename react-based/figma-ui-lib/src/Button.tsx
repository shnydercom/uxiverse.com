import React from 'react';
import { Button as FigmaButton, Textarea } from "react-figma-plugin-ds";
//import './button.css';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 * docs for figma comp: https://alexandrtovmach.github.io/react-figma-plugin-ds/#checkbox
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const mode = primary ? 'button--primary' : 'button--secondary';
  return (<>
    <FigmaButton
      className={['button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
    </FigmaButton>
    <Textarea placeholder={"asdf"} rows={5}></Textarea>
    </>
  );
};
