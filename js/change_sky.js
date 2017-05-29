function changeSky(){
    var d = new Date();
    var h = d.getHours();
    console.log(h)
   var sky=   document.querySelector("a-sky")

if (h>10&&h<18){
   sky.setAttribute("color","#8ed5ff")
} else if (h>=18&&h<22){
   sky.setAttribute("color","#f9ed9d")
} else if (h>=22 ||h<6){
   sky.setAttribute("color","#3165ce")
} else if (h>=6&&h<10){
   sky.setAttribute("color", "#e5faff")
}
}
changeSky();