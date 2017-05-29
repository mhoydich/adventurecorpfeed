      var z_neg_trigger =-2;
      var x_neg_trigger =-2;
      var x_pos_trigger=1
      var z_pos_trigger=1;
      var side=0;
      var count=0;
      var countXneg=0;
      var countXpos=0;
      var countZpos=0;
      var spotify_sample=["sample_media/spotify/song1.png","sample_media/spotify/song2.png","sample_media/spotify/song3.png","sample_media/spotify/song4.png"];
      var amazon_sample=["sample_media/amazon/amazon1.png","sample_media/amazon/amazon2.png","sample_media/amazon/amazon3.png","sample_media/amazon/amazon4.png"]
      var etsy_sample=["sample_media/etsy/etsy1.png","sample_media/etsy/etsy2.png","sample_media/etsy/etsy3.png","sample_media/etsy/etsy4.png"]
      var twitter_sample=["sample_media/tweet/tweet1.png","sample_media/tweet/tweet2.png","sample_media/tweet/tweet3.png","sample_media/tweet/tweet4.png"]

function updateData(){
        requestAnimationFrame(updateData);
        var posZ = camera.position.z-4;
        var posX = camera.position.x;
        console.log("z : "+ posZ+ " x : " + posX)
        console.log()
        if (Math.floor(posZ)==z_pos_trigger&&countZpos<twitter_sample.length){
            var plane= document.createElement('a-image');
         
            plane.setAttribute("color","#FFF");
            var image = new Image();
            image.src = twitter_sample[countZpos];
            image.onload = function(){
              plane.setAttribute('src',image.src)
              console.log(image)
            }
          
            var ratio = image.width / image.height; 
            plane.setAttribute('width', 5);
            plane.setAttribute('height', 5 / ratio)
            plane.setAttribute("animation", {property: 'scale', dir: 'normal', dur: 1000, easing: 'easeInSine', loop: false, to: '2 2 0'})
            if(side==0){

            plane.setAttribute("position",{x:-4.5, y:5/ratio+0.3, z:z_pos_trigger+20});
            plane.setAttribute("rotation",{y:165});
            side =1;
            } else if (side==1){
              plane.setAttribute("position",{x:4.5, y:5/ratio+0.3, z:z_pos_trigger+20});
              plane.setAttribute("rotation",{y:195});
              side =0;
            }
            sceneEl.appendChild(plane)
            z_pos_trigger +=10;
            countZpos++;
            console.log(z_pos_trigger)
        
            
        }       
        if (Math.floor(posZ)==z_neg_trigger&&count<spotify_sample.length){
            var plane= document.createElement('a-image');
         
            plane.setAttribute("color","#FFF");
           // plane.setAttribute("src",spotify_sample[count]);
            var image = new Image();
              image.src = spotify_sample[count];
            image.onload = function(){
              plane.setAttribute('src',image.src)
              console.log(image)
            }
          
            var ratio = image.width / image.height;
          //  
            plane.setAttribute('width', 5);
            plane.setAttribute('height', 5 / ratio)
            plane.setAttribute("animation", {property: 'scale', dir: 'normal', dur: 1000, easing: 'easeInSine', loop: false, to: '2 2 0'})
            if(side==0){

            plane.setAttribute("position",{x:-4.5, y:5/ratio+0.3, z:z_neg_trigger-20});
            plane.setAttribute("rotation",{y:15});
            side =1;
            } else if (side==1){
              plane.setAttribute("position",{x:4.5, y:5/ratio+0.3, z:z_neg_trigger-20});
              plane.setAttribute("rotation",{y:-15});
              side =0;
            }
            sceneEl.appendChild(plane)
            z_neg_trigger-=10
            count++;
            console.log(spotify_sample.length)
            console.log(count)
            
        }       
        if (Math.floor(posX)==x_neg_trigger&&countXneg<amazon_sample.length){
            var plane= document.createElement('a-image');
         
            plane.setAttribute("color","#FFF");
            plane.setAttribute("src",amazon_sample[countXneg]);
            var image = new Image();

            image.src = amazon_sample[countXneg];
            var ratio = image.width / image.height;
            plane.setAttribute('src',image.src)
            plane.setAttribute('width', 5);
            plane.setAttribute('height', 5 / ratio)
            plane.setAttribute("animation", {property: 'scale', dir: 'normal', dur: 1000, easing: 'easeInSine', loop: false, to: '2 2 0'})
            if(side==0){
            console.log("right")
            plane.setAttribute("position",{z:-4.5, y:5/ratio+0.3, x: x_neg_trigger-20});
            plane.setAttribute("rotation",{y:75});
            side =1;
          } else if (side==1){
            console.log("left")
              plane.setAttribute("position",{z:4.5, y:5/ratio+0.3, x: x_neg_trigger-20});
              plane.setAttribute("rotation",{y:105});
              side =0;
            }
            sceneEl.appendChild(plane)
            x_neg_trigger-=10
            countXneg++;
            console.log(countXneg)
        }       
        if (Math.floor(posX)==x_pos_trigger&&countXpos<etsy_sample.length){
            var plane= document.createElement('a-image');
         
            plane.setAttribute("color","#FFF");
            plane.setAttribute("src",etsy_sample[countXpos]);
            var image = new Image();

            image.src = etsy_sample[countXpos];
            var ratio = image.width / image.height;
            plane.setAttribute('src',image.src)
            plane.setAttribute('width', 5);
            plane.setAttribute('height', 5 / ratio)
            plane.setAttribute("animation", {property: 'scale', dir: 'normal', dur: 1000, easing: 'easeInSine', loop: false, to: '2 2 0'})
            if(side==0){
            console.log("right")
            plane.setAttribute("position",{z:-4.5, y:5/ratio+0.3, x:x_pos_trigger+20});
            plane.setAttribute("rotation",{y:-75});
            side =1;
          } else if (side==1){
            console.log("left")
              plane.setAttribute("position",{z:4.5, y:5/ratio+0.3, x:px_pos_trigger+20});
              plane.setAttribute("rotation",{y:-105});
              side =0;
            }
            sceneEl.appendChild(plane)
            x_pos_trigger+=10
            countXpos++;
            console.log(countXpos)
        }       
      }



updateData();