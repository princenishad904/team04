"use client"
import React from 'react'

const Input = ({className,label,name,type ="text",placeholder,icon,id}) => {
  return (
    <div>
        <label htmlFor={id}>
            {label}
        </label>

        <input 
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`outline-none  px-1.5 rounded ring-1 ring-gray-300 py-1 ${className}`}
        />

    </div>
  )
}

export default Input