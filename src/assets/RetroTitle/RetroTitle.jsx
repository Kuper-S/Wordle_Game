import React from 'react';
import "./RetroTitle.css"

function RetroTitle() {
  return (
	<div className='retro_continer'>
    <div id="image">
	<div id="top">
		<div id="sky"></div>
	</div>
	<div id="bottom">
		<div id="ground"></div>
	</div>
	<div id="text">
		<h1 className="retro_head">WORDLE</h1>
		<h2 className="retro_sub">LETS goooo!</h2>
	</div>
	</div>

	</div>
  )
}

export default RetroTitle