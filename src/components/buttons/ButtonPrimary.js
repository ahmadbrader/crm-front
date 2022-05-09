import React from 'react'

export default function ButtonPrimary({children, onClick=()=>{}, containerClass="", disabled=false}) {
  return (
    <button className={`btn btn-primary ${containerClass}`} {...{onClick}} disabled={disabled}>{children}</button>
  )
}
