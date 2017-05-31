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
			childs[index].position.y= 0.2;
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

function loadBot(model, model2, pos, rot) {


    var loader = new THREE.ColladaLoader();
    obj3D = new THREE.Object3D();

    loader.load(model, function(collada) {
    console.log(botIndex)

        cancelAnimationFrame(myReq);
        bots.push(collada);

        if (bots[botIndex].skins.length > 0) {
            child = bots[botIndex].skins[0];
            botChilds.push(child);
            
            botChilds[botIndex].position.set(pos.x,pos.y,pos.z);
            botChilds[botIndex].rotation.set(rot.x,rot.y,rot.z);
            //botChilds[0].position.set((Math.random() * (10))-5, 0, (Math.random() * (20)) -10);
            botChilds[botIndex].scale.set(0.5, 0.5, 0.5);
            obj3D.add(botChilds[botIndex])

            //childs[index].castShadow= true; doesn't work
            var animation = new THREE.Animation(botChilds[botIndex], botChilds[botIndex].geometry.animation);
            botAnimations.push(animation);
            botAnimations[botIndex].loop = false;
            botAnimations[botIndex].timeScale = 1;
            animation.play();
            //animate();
            myReq = requestAnimationFrame(animate);
            botAnimations[botIndex].play()

            botIndex++;

        }


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

function autoAvatar() {
    console.log("av loading")
    var den_pos = new THREE.Vector3(15, 0, -45);
    var den_rot = new THREE.Vector3(0, 0, 0);
    console.log(den_pos)
    var sree_pos = new THREE.Vector3(10, 0, 10);
    var sree_rot = new THREE.Vector3(0, -1.51, 0);
    loadBot('models/avatars/dennis/dennis_avatar_walk_matte.dae',null,den_pos, den_rot);
    loadBot('models/avatars/sree/sree_avatar_matte.dae',null, sree_pos, sree_rot);


    setInterval(function() {
        //var circle = 360 * Math.PI / 180;
        //	botChilds[0].rotation.y = Math.random() * circle;
      //  botChilds[botIndex].rotation.y += 90 * Math.PI / 180;

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