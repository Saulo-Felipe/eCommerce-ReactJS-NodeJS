import React from 'react'
// This file doesn't use context, but is a componente used in all application



const Toast = (props) => {

	const removeToast = () => {
	  document.querySelector('.toast').classList.remove('show')
		document.querySelector('.toast').classList.add('hide')
	}

	React.useEffect(() => {
		(() => {
			document.querySelector('.toast').classList.remove('hide')
			document.querySelector('.toast').classList.add('show')
			resetTime()
		})();
	}, [])

	function resetTime() {
		setTimeout(() => {
			removeToast()
		}, 5000)
	}

	return (
		<div className="position-fixed bottom-0 end-0 p-3" style={{Zindex: '11'}} onMouseEnter={() => resetTime()}>
		  <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
		    <div className="toast-header">
		      <img src="..." className="rounded me-2" alt="..." />
		      <strong className="me-auto">{props.title}</strong>
		      <small>{props.time}</small>
		      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => removeToast()}></button>
		    </div>
		    <div className="toast-body">
		      {props.content}
		    </div>
		  </div>
		</div>
	)
}


export { Toast }