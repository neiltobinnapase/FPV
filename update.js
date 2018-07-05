//Javascript file that updates information on screen and displays updating images for video stream
//Uses XMLHTTPRequest object to obtain information from file info.txt, obtaining information from
//file over specified interval of time.

//Variables used for determining image reading/loading offset
var starting = true;
var templabel = 0;

//Reads file and splits each line into different elements of array textarray. 
function readfile() {
    var info = new XMLHttpRequest();
    info.onreadystatechange = function(){
        if(info.readyState === 4){
            if(info.status === 200 || info.status === 0){
                var text = info.responseText;
                var textarray = [];
                textarray = text.split("\n");

                for(var i = 0; i < textarray.length; i++){
                    if(i == textarray.length - 1){
                        //If it is first reading from the file, determine which image to read first
                        //Saved in variable templabel, used in function updateframe()
                        //Also displays the initial value for templabel on display, display can be changed later
                        if(starting){
                            starting = false;
                            templabel = parseInt(textarray[i]);
                            //var placementstring = "#td" + i;
                            //document.querySelector(placementstring).innerHTML = textarray[i];
                        }
                        break;
                    }
                    var placementstring = "#td" + i;
                    document.querySelector(placementstring).innerHTML = textarray[i];
                }

            }
        }
    }

    info.open("GET", 'text/info.txt', false);
    info.send();
}


//Updates single image frame to display. 10 frames are saved with name temp<label>.jpg in image folder
//variable timeout indicates millisecond offset from updating display with next frame
//Image is loaded and then drawn to webpage through canvas object on HTML
var timeout = 85;
var img = new Image();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

//onload function is offset by 200ms before loading the image, ensuring the image is fully loaded before
//it is displayed
setTimeout(img.onload = function() {
    canvas.width = 480;
    canvas.height = 360;

    ctx.drawImage(img, 0, 0, 480, 360);
}, 200);

//Changes the source of the image object img to the according frame determined by (templabel + 8) % 10, giving us
//image 0-9 to read from. templabel is incremented and then updateframe is recursively called after period timeout
function updateframe() {
    var timestamp = (new Date()).getTime();
    newsrc = "image/temp" + ((templabel + 8) % 10).toString() + ".jpg" + "#" + timestamp;
    img.src = newsrc;

    templabel++;
    
    setTimeout(updateframe, timeout);
}

//Call function readfile every second
var dostuff = setInterval(readfile, 1000);

function start() {
    readfile();
    updateframe();
}

//Once window is loaded, calls readfile and updateframe
window.onload = start;