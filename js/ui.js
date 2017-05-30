$(document).ready(function(){


$("#toggleBackground").click(function(){
    
 var visible =  document.querySelector('#environment').getAttribute('visible');
 console.log(visible)
 if (visible==true){
    document.querySelector('#environment').setAttribute('visible', false);
} else if (visible == false){
    document.querySelector('#environment').setAttribute('visible', true);
}
})





})
