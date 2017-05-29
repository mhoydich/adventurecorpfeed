var clock = new THREE.Clock();

var models = [];
var childs = [];
var animations = [];
var animationz = [];
var index = 0;
var choose = 0;

var bots = [];
var botChilds = [];
var botAnimations = [];
var botIndex = 0;

var avatars = [] //entity elements

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



function loadCollada(model, model2) {
    $("#loading").show();

    var loader = new THREE.ColladaLoader();
    obj3D = new THREE.Object3D()

    loader.load(model, function(collada) {



        cancelAnimationFrame(myReq);
        models.push(collada);

        if (models[index].skins.length > 0) {
            child = models[index].skins[0];
            childs.push(child);
            //childs[index].position.set((Math.random() * (12))+20, 0, (Math.random() * (18)) +16);
            childs[index].scale.set(0.5, 0.5, 0.5);
            //scene.add(childs[index]);
            obj3D.add(childs[index])

            //childs[index].castShadow= true; doesn't work
            var animation = new THREE.Animation(childs[index], childs[index].geometry.animation);
            animations.push(animation);
            animations[index].loop = false;
            animations[index].timeScale = 1;
            //animation.play();

            myReq = requestAnimationFrame(animate);

        }

        choose = index;
        index++;
    })
    if (model2) {
        loader.load(model2, function(collada2) {

            anim_model = collada2;

            if (anim_model.skins.length > 0) {
                skin2 = collada2.skins[0];

                console.log(skin2)
                var animation = new THREE.Animation(childs[index - 1], skin2.geometry.animation);
                animationz.push(animation);
                animationz[0].loop = false;

                animate();
            }


        })
    }

    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('avatar', '');
    sceneEl.appendChild(entityEl);
}

function loadBot(model, model2) {


    var loader = new THREE.ColladaLoader();
    obj3D = new THREE.Object3D();

    loader.load(model, function(collada) {


        cancelAnimationFrame(myReq);
        bots.push(collada);

        if (bots[botIndex].skins.length > 0) {
            child = bots[botIndex].skins[botIndex];
            botChilds.push(child);
            //botChilds[botIndex].position.set(-5, 0, -10);
            //botChilds[0].position.set((Math.random() * (10))-5, 0, (Math.random() * (20)) -10);
            botChilds[botIndex].scale.set(0.5, 0.5, 0.5);
            obj3D.add(botChilds[botIndex])

            //childs[index].castShadow= true; doesn't work
            var animation = new THREE.Animation(botChilds[botIndex], botChilds[botIndex].geometry.animation);
            botAnimations.push(animation);
            botAnimations[botIndex].loop = true;
            botAnimations[botIndex].timeScale = 1;
            //animation.play();
            //animate();
            myReq = requestAnimationFrame(animate);


        }

        botAnimations[botIndex].play()

    })
    if (model2) {
        loader.load(model2, function(collada2) {

            anim_model = collada2

            if (anim_model.skins.length > 0) {
                skin2 = collada2.skins[0];

                console.log(skin2)
                animation = new THREE.Animation(botChilds[botIndex - 1], skin2.geometry.animation);
                animationz.push(animation);
                animationz[botIndex].loop = false;
                //animations[index].timeScale=1;
                //animation.play();
                animate();
            } else {
                console.log("Model has no skin!")

            }


        })
    }

    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('avatar', '');
    sceneEl.appendChild(entityEl);
    avatars.push(entityEl)
}


//AUTOMATED AVATARS
$(document).ready(function() {
    document.querySelector('a-scene').addEventListener('loaded', function() {
        //	autoAvatar()
    })
});

function autoAvatar() {
    loadBot('../models/avatars/collette/collette_avatar_matte.dae');


    setInterval(function() {
        //var circle = 360 * Math.PI / 180;
        //	botChilds[0].rotation.y = Math.random() * circle;
        botChilds[botIndex].rotation.y += 90 * Math.PI / 180;

    }, 5000);
}




AFRAME.registerComponent('avatar', {
    /* schema: {
     	position: {x:-5, y:0, z:-10}
     },*/
    init: function() {

        this.el.setObject3D('skin', obj3D);
        this.el.setAttribute('id', "avaId" + index);
        this.el.setAttribute('choose', index);
        //this.el.setAttribute('position', "-5, 0 -10");
        //this.el.setAttribute("animation__scale",{property: scale; dir: alternate; dur: 200; easing: easeInSine; loop: true; to: 1.2 1 1.2});

    }
});




var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
var myReq;
/*
function timer(delta){
delta = clock.getDelta();
	console.log(delta)
	THREE.AnimationHandler.update(delta);
var timerReq= requestAnimationFrame(timer)

}
timer()
*/
function animate() {

    var delta = clock.getDelta();
    THREE.AnimationHandler.update(delta);
    myReq = requestAnimationFrame(animate);

    //***BOT ANIMATION***
    // 	if(botAnimations[botIndex].isPlaying==true&&botAnimations[botIndex].timeScale==1){ 
    //     	botChilds[botIndex].translateZ(3*delta)

    //     	//avatars[botIndex].object3D.translateZ(3*delta)


    //     	var v1 = botChilds[botIndex].position;
    //     	var v2 = childs[choose].position;

    //     	var dist = new THREE.Vector3(3, 0.0, 3);
    //     	var dir = new THREE.Vector3(); // create once an reuse it
    // 		dir.subVectors( v2, v1 );

    // 		dir.addVectors(dir, dist)
    //     	console.log(dir)

    //     	botChilds[botIndex].position.add(dir)
    // } 
    //     	else if(botAnimations[0].isPlaying==true&&botAnimations[botIndex].timeScale==-1){ 
    //     	botChilds[botIndex].translateZ(-3*delta)

    // 	} 




    //AVATAR ANIMATION
    if (animations[choose]) {
        if (animations[choose].isPlaying == true && animations[choose].timeScale == 1) {
            childs[choose].translateZ(3 * delta)
        } else if (animations[choose].isPlaying == true && animations[choose].timeScale == -1) {
            childs[choose].translateZ(-3 * delta)

        }
        if (document.querySelector('#camera').getAttribute('camera').active == true) {
            var pos = document.querySelector('#camera').getAttribute('position');
            var rot = document.querySelector('#camera').getAttribute('rotation');

            childs[choose].rotation.y = rot.y * Math.PI / 180 + Math.PI
            camera.position.z = childs[choose].position.z + 4; //add the avatar to different layer?
            camera.position.x = childs[choose].position.x;

        } else if (document.querySelector('#camera2').getAttribute('camera').active == true) {
            var pos2 = document.querySelector('#camera2').getAttribute('position');
            var rot2 = document.querySelector('#camera2').getAttribute('rotation');

            childs[choose].rotation.y = rot2.y * Math.PI / 180 + Math.PI
            camera2.position.z = childs[choose].position.z; //add the avatar to different layer?
            camera2.position.x = childs[choose].position.x;

        }
    }



}