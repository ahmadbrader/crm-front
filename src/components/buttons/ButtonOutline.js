import React from 'react'

export default function ButtonOutline({children, type="primary", onClick=()=>{}, containerClass="", disabled=false}) {
  return (
    <button className={`btn btn-outline-${type} ${containerClass}`} {...{onClick}} disabled={disabled}>{children}</button>
  )
}
