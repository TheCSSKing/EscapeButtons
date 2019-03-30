(function(){
	function addListenerByClass(classname, action, listener){
		let elements = document.getElementsByClassName(classname);
		for(let i=0;i<elements.length;i++){
			elements[i].addEventListener(action, listener);
		}
	}

	let modal = document.querySelector('.secret-modal');

	addListenerByClass('btn-escape', 'click', function(event){
		modal.style['display'] = 'block';
	})

	document.querySelector('.close').addEventListener('click', function(event){
		modal.style['display'] = 'none';
	})
})();
