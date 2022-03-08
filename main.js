video="";
status1="";
objects=[];
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(1366, 768);
    canvas.center();
}

function draw(){
 image(video, 0, 0, 1366, 768);   
 if(status1!=""){
     objectdetected.detect(video, gotresult);
     for(i=0; i<objects.length; i++){
     document.getElementById("status").innerHTML="Status: Objects Detected"
     document.getElementById("numberofobjects").innerHTML="Number of objects detected are: "+objects.length;
     fill("red");
     percent=floor(objects[i].confidence*100);
     text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
     noFill();
     stroke("red");
     rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }
    }
}
function start(){
    objectdetected=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelloaded(){
    console.log("model is loaded");
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}
function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}