import React from 'react'

export default function ButtonPrimaryOutline({children, onClick=()=>{}, containerClass="", disabled=false}) {
  return (
    <button className={`btn btn-outline-primary ${containerClass}`} {...{onClick}} disabled={disabled}>{children}</button>
  )
}
