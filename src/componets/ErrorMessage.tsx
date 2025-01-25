import React, { ReactNode } from 'react'

interface ErrorMessageProps {
    children: ReactNode  // el componente puede renderizar cualquier tipo de contenido
 
}
export default function ErrorMessage({children}:ErrorMessageProps) {
  return (
    <p className='bg-red-600 p-2 text-white font-bold text-sm text-center'>
      {children}
    </p>
  )
}
