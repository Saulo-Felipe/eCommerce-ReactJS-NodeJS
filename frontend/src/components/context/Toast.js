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
		<div class="position-fixed bottom-0 end-0 p-3" style={{Zindex: '11'}} onMouseEnter={() => resetTime()}>
		  <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
		    <div class="toast-header">
		      <img src="..." class="rounded me-2" alt="..." />
		      <strong class="me-auto">{props.title}</strong>
		      <small>{props.time}</small>
		      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => removeToast()}></button>
		    </div>
		    <div class="toast-body">
		      {props.content}
		    </div>
		  </div>
		</div>
	)
}


export { Toast }