     document.addEventListener('mousedown', function() {
            onDocumentMouseDown(event);

        }, false);

 var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        function onDocumentMouseDown(event) {

            //    event.preventDefault();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera.children[0]);


            //  var target = raycaster.intersectObjects(targets, true);
            var intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects && intersects[0]) {
                console.log(intersects[0])
                if(intersects[0].object.el.id.includes("image")==true){
                  intersects[0].object.el.setAttribute("animation__2", {property: 'rotation', dir: 'normal', dur: 1000, easing: 'easeInSine', loop: false, to: '0 0 0'});
                  intersects[0].object.el.setAttribute("animation__3", {property: 'position', dir: 'normal', dur: 1000, easing: 'easeInSine', loop: false, to: '0'});
                }
          
            }
        }
        
document.addEventListener("keydown", function() {
    var x = event.keyCode;
    if ((x == 87 || x == 38) && animations[choose].isPlaying == false) { //W || Up arrow --> walk forward
        animations[choose].play();
        animations[choose].timeScale = 1;
    } else if ((x == 83 || x == 40) && animations[choose].isPlaying == false) { //S || Down arrow --> walk backward
        animations[choose].play();
        animations[choose].loop = true;
        animations[choose].timeScale = -1;
        setTimeout(function() {
            animations[choose].loop = false;
        }, 50)
    } else if (x == 69) {
        if (animations[choose].isPlaying == false) { //E --> auto walk forward
            animations[choose].play();
            animations[choose].loop = true;
            animations[choose].timeScale = 1;

            //setTimeout(function(){animations[choose].loop=false;}, 50)
        } else if (animations[choose].isPlaying == true) {
            animations[choose].loop = false;

        }
    } else if ((x == 32) && animations[choose].isPlaying == false) { //SPACEBAR
        animationz[0].play();
        animationz[0].timeScale = 1;
    }
})

var mc = new Hammer(document);
mc.get('pinch').set({
    enable: true
});
mc.get('swipe').set({
    direction: Hammer.DIRECTION_VERTICAL
});
//swipe up &down get triggered also with mouse 

mc.on('pinchout', function(ev) {
    if (animations[choose].isPlaying == false) { //E --> auto walk forward
        animations[choose].play();
        animations[choose].loop = true;
        animations[choose].timeScale = 1;

        //setTimeout(function(){animations[choose].loop=false;}, 50)
    } else if (animations[choose].isPlaying == true) {
        animations[choose].loop = false;

    }

})
mc.on('pinchin', function(ev) {
    if (animations[choose].isPlaying == false) { //E --> auto walk forward
        animations[choose].play();
        animations[choose].loop = true;
        animations[choose].timeScale = 1;

        //setTimeout(function(){animations[choose].loop=false;}, 50)
    } else if (animations[choose].isPlaying == true) {
        animations[choose].loop = false;

    }


})
mc.on("swipeup", function(ev) {
    console.log(ev.type);
    animations[choose].play();
    animations[choose].timeScale = 1;
});
mc.on("swipedown", function(ev) {
    console.log(ev.type);
    animations[choose].play();
    animations[choose].loop = true;
    animations[choose].timeScale = -1;
    setTimeout(function() {
        animations[choose].loop = false;
    }, 50)
});
