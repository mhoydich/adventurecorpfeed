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