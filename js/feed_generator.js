      var spotify_trigger = -9; //Z negative
      var x_neg_trigger = -9;
      var x_pos_trigger = 8
      var z_pos_trigger = 8;
      var x_pos_trigger2 = 11;
      var sidezp = 0;
      var sidezn = 0;
      var sidexp = 0;
      var sidexn = 0;
      var spotify_count = 0;
      var countXneg = 0;
      var countXpos = 0;
      var countXpos2 = 0;
      var countZpos = 0;

      var spotify_sample = ["sample_media/spotify/song1.png", "sample_media/spotify/song2.png",
          "sample_media/spotify/song3.png", "sample_media/spotify/song4.png"
      ];

      var amazon_sample = ["sample_media/amazon/amazon1.png", "sample_media/amazon/amazon2.png",
          "sample_media/amazon/amazon3.png", "sample_media/amazon/amazon4.png"
      ]

      var etsy_sample = ["sample_media/etsy/etsy1.png", "sample_media/etsy/etsy2.png",
          "sample_media/etsy/etsy3.png", "sample_media/etsy/etsy4.png"
      ]

      var twitter_sample = ["sample_media/tweet/tweet1.png", "sample_media/tweet/tweet2.png",
          "sample_media/tweet/tweet3.png", "sample_media/tweet/tweet4.png"
      ]

      var hypekills = ["sample_media/hypekills/hypekills1.jpg", "sample_media/hypekills/money_3d.gif",
          "sample_media/hypekills/hypekills2.jpg", "sample_media/hypekills/make_it_rain.gif",
          "sample_media/hypekills/hypekills3.jpg", "sample_media/hypekills/hypekills4.jpg",
          "sample_media/hypekills/hypekills5.jpg", "sample_media/hypekills/hypekills6.jpg",
          "sample_media/hypekills/hypekills7.jpg", "sample_media/hypekills/pow_3d.gif"
      ]



      function loadAll(){
        for(i = 0; i <hypekills.length; i++ ){
              createPanel(twitter_sample, countZpos, z_pos_trigger, 'zp')
              z_pos_trigger += 10;
              countZpos++;

              createPanel(spotify_sample, spotify_count, spotify_trigger, 'zn')
              spotify_trigger -= 10
              spotify_count++;

              createPanel(amazon_sample, countXneg, x_neg_trigger, 'xn')
              x_neg_trigger -= 10
              countXneg++;

              createPanel(etsy_sample, countXpos, x_pos_trigger, 'xp')
              x_pos_trigger += 10
              countXpos++;

              createPanel(hypekills, countXpos2, x_pos_trigger2, 'xp2')
              x_pos_trigger2 += 10
              countXpos2++;
        }

      }
      loadAll();

      function updateData() {





          requestAnimationFrame(updateData);
          var posZ = camera.position.z - 4;
          var posX = camera.position.x;
          /*    console.log("x : "+posX+ " z : "+ posZ)*/

         /* if (Math.floor(posZ) == z_pos_trigger && posX < 10 && posX > -10 && countZpos < twitter_sample.length) {
          
              createPanel(twitter_sample, countZpos, z_pos_trigger, 'zp')
              z_pos_trigger += 10;
              countZpos++;

          }

          if (Math.floor(posZ) == spotify_trigger && posX < 10 && posX > -10 && spotify_count < spotify_sample.length) {
          
              createPanel(spotify_sample, spotify_count, spotify_trigger, 'zn')
              spotify_trigger -= 10
              spotify_count++;
          }
          if (Math.floor(posX) == x_neg_trigger && posZ < 10 && posZ > -10 && countXneg < amazon_sample.length) {
          
              createPanel(amazon_sample, countXneg, x_neg_trigger, 'xn')
              x_neg_trigger -= 10
              countXneg++;
          }
          if (Math.floor(posX) == x_pos_trigger && posZ < 10 && posZ > -10 && countXpos < etsy_sample.length) {
          
              createPanel(etsy_sample, countXpos, x_pos_trigger, 'xp')
              x_pos_trigger += 10
              countXpos++;
          }

          if (Math.floor(posX) == x_pos_trigger2 && posZ < -40 && posZ > -60 && countXpos2 < hypekills.length) {
          
              createPanel(hypekills, countXpos2, x_pos_trigger2, 'xp2')
              x_pos_trigger2 += 10
              countXpos2++;
          }*/
      }

      function createPanel(arr, count, trigger, direction) {
          var plane = document.createElement('a-image');

          plane.setAttribute("color", "#FFF");
          var texture = arr[count];

          var image = new Image();
          image.src = texture;

          image.onload = function() {

              if (texture.includes('gif') == true) {

                  plane.setAttribute('src', "url(" + image.src + ")");
                  plane.setAttribute('shader', "gif");
                  plane.setAttribute('width', 5);
                  plane.setAttribute('height', 5);
                  var ratio = 1;
              } else {
                  plane.setAttribute("src", arr[count]);
                  var ratio = image.width / image.height;
                  plane.setAttribute('src', image.src)
                  plane.setAttribute('width', 5);
                  plane.setAttribute('height', 5 / ratio)
              }

              plane.setAttribute("animation", {
                  property: 'scale',
                  dir: 'normal',
                  dur: 1000,
                  easing: 'easeInSine',
                  loop: false,
                  to: '2 2 0'
              })
              if (direction == 'xp2') {
                  if (sidexp == 0) {
                      console.log("right")
                      plane.setAttribute("position", {
                          z: -4.5 - 50,
                          y: 5 / ratio + 0.3,
                          x: trigger + 20
                      });
                      plane.setAttribute("rotation", {
                          y: -75
                      });
                      side = 1;
                  } else if (sidexp == 1) {
                      console.log("left")
                      plane.setAttribute("position", {
                          z: 4.5 - 50,
                          y: 5 / ratio + 0.3,
                          x: trigger + 20
                      });
                      plane.setAttribute("rotation", {
                          y: -105
                      });
                      side = 0;
                  }
              } 


              else if (direction == 'xp') {
                  if (sidexn == 0) {
                      console.log("right")
                      plane.setAttribute("position", {
                          z: -4.5,
                          y: 5 / ratio + 0.3,
                          x: trigger + 20
                      });
                      plane.setAttribute("rotation", {
                          y: -75
                      });
                      sidexn = 1;
                  } else if (sidexn == 1) {
                      console.log("left")
                      plane.setAttribute("position", {
                          z: 4.5,
                          y: 5 / ratio + 0.3,
                          x: trigger + 20
                      });
                      plane.setAttribute("rotation", {
                          y: 105
                      });
                      sidexn = 0;
                  }
              }

              else if (direction == 'xn') {
                  if (sidexn == 0) {
                      console.log("right")
                      plane.setAttribute("position", {
                          z: -4.5,
                          y: 5 / ratio + 0.3,
                          x: trigger - 20
                      });
                      plane.setAttribute("rotation", {
                          y: 75
                      });
                      sidexn = 1;
                  } else if (sidexn == 1) {
                      console.log("left")
                      plane.setAttribute("position", {
                          z: 4.5,
                          y: 5 / ratio + 0.3,
                          x: trigger - 20
                      });
                      plane.setAttribute("rotation", {
                          y: 105
                      });
                      sidexn = 0;
                  }
              }
              if (direction == 'zp') {
                  if (sidezp == 0) {

                      plane.setAttribute("position", {
                          x: -4.5,
                          y: 5 / ratio + 0.3,
                          z: trigger + 20
                      });
                      plane.setAttribute("rotation", {
                          y: 165
                      });
                      sidezp = 1;
                  } else if (sidezp == 1) {
                      plane.setAttribute("position", {
                          x: 4.5,
                          y: 5 / ratio + 0.3,
                          z: trigger + 20
                      });
                      plane.setAttribute("rotation", {
                          y: 195
                      });
                      sidezp = 0;
                  }
              }
              if (direction == 'zn') {
                  if (sidezn == 0) {

                      plane.setAttribute("position", {
                          x: -4.5,
                          y: 5 / ratio + 0.3,
                          z: trigger - 20
                      });
                      plane.setAttribute("rotation", {
                          y: 15
                      });
                      sidezn = 1;
                  } else if (sidezn == 1) {
                      plane.setAttribute("position", {
                          x: 4.5,
                          y: 5 / ratio + 0.3,
                          z: trigger - 20
                      });
                      plane.setAttribute("rotation", {
                          y: -15
                      });
                      sidezn = 0;
                  }
              }
              //  plane.setAttribute("id", "image"+count) //it adds position animation
              sceneEl.appendChild(plane)

          } //End image onload
      }

      updateData();