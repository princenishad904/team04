'use client'
import React from 'react'

const Form = ({children,className,onSubmit}) => {
    const handleForm = (e)=>{
        e.preventDefault();

        const form = new FormData(e.target);
        const values = Object.fromEntries(form.entries());

        return onSubmit(values)

    }
  return (
    <form className={className} onSubmit={handleForm}>
        {children}
    </form>
  )
}

export default Form