import React, { ReactNode } from 'react'

type ButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
}

export const Button = ({text, icon, onClick}: ButtonProps) => {
  return (
    <button
        onClick={onClick}
        className="flex gap-2 items-center align-middle justify-center bg-blue-600 p-4 px-6 text-lg rounded-lg hover:bg-blue-700 shadow-lg"
    >
        {text}{icon}
    </button>
  )
}
