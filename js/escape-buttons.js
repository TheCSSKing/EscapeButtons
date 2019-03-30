(function(){

	// https://davidwalsh.name/add-rules-stylesheets
	let sheet = (function(){
		let style = document.createElement("style");
		style.appendChild(document.createTextNode(""));

		document.head.appendChild(style);

		return style.sheet;
	})();

	sheet.insertRule('.btn-escape { position: relative; top: 0px; bottom: 0px; left: 0px; right: 0px }');
	sheet.insertRule('.btn-jump { transition: .2s all; }');
	sheet.insertRule('.btn-push { transition: .15s all; }');
	sheet.insertRule('@keyframes fadein { 0% { opacity: 0; } 100% { opacity: 1; } }');
	sheet.insertRule('.fadein { animation: fadein 1.5s ease-in; }');
	sheet.insertRule('.btn-zip { transition: .3s ease-out all; }');
	sheet.insertRule('.btn-fakeout { transition: .2s all; }');
	sheet.insertRule('.btn-bug { transition: .1s all; }');

	// Not all browsers include "width" and "height" in getBoundingClientRect
	function getWidthHeight(coords){
		if(coords.width && coords.height) return coords;
		coords.height = coords.bottom-coords.top;
		coords.width = coords.right - coords.left;
		return coords;
	}

	function addListenerByClass(classname, action, listener){
		let elements = document.getElementsByClassName(classname);
		for(let i=0;i<elements.length;i++){
			elements[i].addEventListener(action, listener);
		}
	}

	addListenerByClass('btn-jump', 'mouseenter', function(event){
		let coords = getWidthHeight(this.getBoundingClientRect());
		let styles = window.getComputedStyle(this, null);

		let existingY = parseInt(styles['top'].substring(0, styles['top'].length-2));
		let newY = existingY + (sample([1,-1])*randomIntRange(coords.height, 2.5*coords.height))+'px';

		let existingX = parseInt(styles['left'].substring(0, styles['left'].length-2));
		let newX = existingX + (sample([1,-1]) * randomIntRange(coords.width*.8, 1.8*coords.width)) + 'px';

		this.style['top'] = newY;
		this.style['left'] = newX;
	});

	addListenerByClass('btn-push', 'mouseover', function(event){
		let coords = getWidthHeight(this.getBoundingClientRect());
		let styles = window.getComputedStyle(this, null);

		let existingY = parseInt(styles['top'].substring(0, styles['top'].length-2));
		let existingX = parseInt(styles['left'].substring(0, styles['left'].length-2));

		const tolerance = 15;
		const inc = 100;
		const hInc = 120;
		if(event.offsetX + tolerance > coords.width) {
			this.style['left'] = (existingX - hInc) + 'px'
		}
		else if(event.offsetX - tolerance < 0){
			this.style['left'] = (existingX + hInc) + 'px'
		}
		else if(event.offsetY + tolerance > coords.height){
			this.style['top'] = (existingY -inc) + 'px';
		}
		else if(event.offsetY - tolerance < 0){
			this.style['top'] = (existingY + inc) + 'px'
		}
		else {
			// When in doubt, go down
			this.style['top'] = (existingY + inc) + 'px'
		}
	})

	addListenerByClass('btn-warp', 'mouseover', function(event){
		let target = this;
		let coords = getWidthHeight(target.getBoundingClientRect());
		let styles = window.getComputedStyle(target, null);

		let existingY = parseInt(styles['top'].substring(0, styles['top'].length-2));
		let existingX = parseInt(styles['left'].substring(0, styles['left'].length-2));

		let pY = event.pageY;
		let pX = event.pageX;

		let dX = randomIntRange(0, window.innerWidth*.9);
		let dY = randomIntRange(0, window.innerHeight*.9);

		target.classList.remove('fadein')
		target.style['opacity'] = 0;
		target.style['top'] = existingY + (dY - pY) + 'px';
		target.style['left'] = existingX + (dX - pX) + 'px';

		window.setTimeout(function(){
			target.style['opacity'] = 1;
			target.classList.add('fadein')
		}, 0)
	});


	addListenerByClass('btn-zip', 'mouseover', function(event){
		let target = this;
		let coords = getWidthHeight(target.getBoundingClientRect());
		let styles = window.getComputedStyle(target, null);

		let existingY = parseInt(styles['top'].substring(0, styles['top'].length-2));
		let existingX = parseInt(styles['left'].substring(0, styles['left'].length-2));

		const tolerance = 10;
		const vTolerance = 5;

		function zipLeft(){
			target.style['left'] = existingX - coords.left + 'px';
		}
		function zipRight(){
			target.style['left'] = existingX + (window.innerWidth - coords.right -1) + 'px';
		}
		function zipUp(){
			target.style['top'] = existingY - coords.top + 'px'
		}
		function zipDown(){
			target.style['top'] = existingY + (window.innerHeight - coords.bottom -1) + 'px'
		}

		if(event.offsetX + tolerance > coords.width) {
			console.log('zip left')
			if(coords.left  - tolerance < 0) zipRight();
			else zipLeft();
		}
		else if(event.offsetX - tolerance < 0){
			console.log('zip right')
			if(coords.right + 30 > window.innerWidth) zipLeft();
			else zipRight();
		}
		else if(event.offsetY + vTolerance > coords.height ){
			console.log('zip up')
			if(coords.top - vTolerance < 0) zipDown();
			else zipUp();
		}
		else if(event.offsetY - vTolerance < 0){
			console.log('zip down')
			if(coords.bottom + vTolerance > window.innerHeight) zipUp();
			else zipDown();
		}
		else {
			console.log('No zip direction detected')
			sample([zipLeft, zipRight, zipUp, zipDown])();
		}
	});

	addListenerByClass('btn-fakeout', 'mouseover', function(event){
		let target = this;
		let coords = getWidthHeight(target.getBoundingClientRect());
		let styles = window.getComputedStyle(target, null);

		let existingY = parseInt(styles['top'].substring(0, styles['top'].length-2));
		let existingX = parseInt(styles['left'].substring(0, styles['left'].length-2));

		const tolerance = 15;
		const inc = 75;
		const hInc = 140;

		let leftCorrection = 0;
		let topCorrection = 0;
		if(event.offsetX + tolerance > coords.width) {
			target.style['left'] = (existingX - hInc) + 'px'
			leftCorrection = (existingX + 2 * hInc) + 'px';
		}
		else if(event.offsetX - tolerance < 0){
			target.style['left'] = (existingX + hInc) + 'px'
			leftCorrection = (existingX - 2 * hInc) + 'px';
		}
		else if(event.offsetY + tolerance > coords.height){
			target.style['top'] = (existingY -inc) + 'px';
			topCorrection = (existingY + 2 * inc) + 'px'
		}
		else if(event.offsetY - tolerance < 0){
			target.style['top'] = (existingY + inc) + 'px'
			topCorrection =  (existingY - 2 * inc) + 'px'
		}
		else {
			// When in doubt, go left
			target.style['left'] = (existingX + hInc) + 'px'
			leftCorrection = (existingX - 2 * hInc) + 'px';
		}

		window.setTimeout(function(){
			if(leftCorrection) target.style['left'] = leftCorrection;
			if(topCorrection) target.style['top'] = topCorrection;
		}, 200)
	})

	addListenerByClass('btn-bug', 'mouseover', function(event){
		let target = this;
		let coords = getWidthHeight(target.getBoundingClientRect());
		let styles = window.getComputedStyle(target, null);

		let existingY = parseInt(styles['top'].substring(0, styles['top'].length-2));
		let existingX = parseInt(styles['left'].substring(0, styles['left'].length-2));

		let pY = event.pageY;
		let pX = event.pageX;

		let xMax = .9 * (existingX + (window.innerWidth - pX));
		let xMin = .9 * (existingX - pX);

		let yMax = .9 * (existingY + (window.innerHeight - pY));
		let yMin = .9 * (existingY - pY);

		const iterations = 5;
		const transitionDuration = 100;
		for(let i=0; i<iterations;i++){
			window.setTimeout(function(){
				target.style['top'] = randomIntRange(yMin,yMax) + 'px';
				target.style['left'] = randomIntRange(xMin, xMax) +'px';
			}, 
			i * transitionDuration)
		}
	})
})();

function sample(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomIntRange(min, max) {
  return Math.floor(Math.random() * Math.floor(max-min)) + min;
}