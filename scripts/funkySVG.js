/**
 * FunkySVG; 
 *	Concept version: finds object tags tagged with the funkySVG css class and converts them to a funky version,
 *	by adding SMIL animations.
 *
 *	author: Olaf Janssen <o.t.a.janssen@gmail.com>
 */
(function(){
	
	function funkThatSVG(e) {
				var frames = 3,
			    	delay = 200,
			    	maxAngle = 20,
			    	frame = 0;

			    var paths = [].slice.call(e.querySelectorAll("line, path, polygon, rect")); 
			    
			    function getRandomAngle() {
			    	return Math.random() * maxAngle - maxAngle/2;
			    }

			    function getBoundingBox(e) {
			    	try
    				{
			    		return e.getBBox();
    				}
    					catch(error)
    				{
    					return {left: 0, top: 0, width: 1, height: 1};
				    } 
			    }

			    function createAnimationTag(e, multiplier) {
			    	var values = '', b = getBoundingBox(e);
			    	for(var f=0;f<frames;f++) {
			    		values += (' '+ Math.round(multiplier * getRandomAngle()) +' '+ (b.x + b.width/2) +' '+ (b.y + b.height/2) +';');
			    	}

			    	var animate = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
			    	animate.setAttribute('type','rotate');
			    	animate.setAttribute('attributeName', 'transform');
			    	animate.setAttribute('begin','0s');
			    	animate.setAttribute('dur', (frames * delay) + 'ms');
			    	animate.setAttribute('values', values);
			    	animate.setAttribute('calcMode', 'discrete');
			    	animate.setAttribute('repeatCount','indefinite');
			    	e.appendChild(animate);
			    }

			    function getSurface(element) {
			    	var bbox = getBoundingBox(element);
			    	return Math.max(bbox.width, bbox.height);
			    }

			    var maxSurface = 1;
			    paths.forEach(function(e){
			    	var surface = getSurface(e);
			    	if (surface > maxSurface) {
			    		maxSurface = surface;
			    	}
			    });
			    
			    paths.forEach(function(e){
			    	createAnimationTag(e, 1.2 - getSurface(e)/maxSurface);
			    });
	}
	
	document.addEventListener("DOMContentLoaded", function(event) {
	    var svgs = [].slice.call(document.querySelectorAll('object.funkySVG')); 

		svgs.forEach(function(e){
			e.addEventListener('load', function(ev){
				funkThatSVG(e.contentDocument.querySelector('svg'));
			});
		});
  	});
	
	window.addEventListener('load',function(){
			var svgs = [].slice.call(document.querySelectorAll('svg.funkySVG')); 
			
			 svgs.forEach(function(e){
   				funkThatSVG(e);
			});
	});

 })();
