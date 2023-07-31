import React from 'react'
import "./styledHeader.css"
function StyledHeader({currentUser}) {
  return (
    <div className='styled-header'>
        <p>Text with fancy <span className="fancy">
            userName
        </span></p>
    </div>
  )
}

export default StyledHeader;