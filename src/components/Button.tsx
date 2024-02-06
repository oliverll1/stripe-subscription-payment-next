import React, { ReactNode } from 'react'

type ButtonProps = {
  text : string;
  onClick : React.MouseEventHandler<HTMLButtonElement>;
  icon? : ReactNode;
  disabled? : boolean;
}

export const Button = ({text, icon, onClick, disabled = false}: ButtonProps) => {
  console.log("button " +  disabled)
  return (
    <button
        onClick={onClick}
        className="flex gap-2 items-center align-middle justify-center bg-blue-600 p-4 px-6 text-lg rounded-lg hover:bg-blue-700 shadow-lg disabled:bg-gray-500 disabled:opacity-70"
        disabled={disabled}
    >
        {text}{icon}
    </button>
  )
}
