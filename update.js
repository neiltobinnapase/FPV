//Javascript file that updates information on screen
//Uses XMLHTTPRequest object to obtain information from file info.txt, obtaining information from
//file over specified interval of time.

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
                    var placementstring = "#td" + i;
                    document.querySelector(placementstring).innerHTML = textarray[i];
                }

            }
        }
    }

    info.open("GET", 'text/info.txt', false);
    info.send();
}

//Updates single image frame to display 
var timeout = 70;
var source = 'image/temp.jpg';
var img = new Image();

function updateframe() {
    var timestamp = (new Date()).getTime();
    var newsrc = source + '#' + timestamp;

    img.src = newsrc;

    setTimeout(updateframe, timeout);
}

//might not work??
function timer(funct, delayMs, times) {
    if(times === undefined)
        times = -1;

    if(delayMs === undefined)
        delayMs = 10;

    this.funct = funct;
    var times = times;
    var timesCount = 0;
    var ticks = (delayMs/10)|0;
    var count = 0;
    timer.instances.push(this);

    this.tick = function() {
        if(count  >= ticks){
            this.funct();
            count = 0;
            if(times > -1){
                timesCount++;
                if(timesCount >= times){
                    this.stop();
                }
            }
        }
        count++;
    };

    this.stop = function() {
        var index = timer.instances.indexOf(this);
        timer.instances.splice(index, 1);
    };
}

timer.instances = [];

timer.ontick = function() {
    for(var i in timer.instances){
        timer.instances[i].tick();
    }
};

//var timefun = setInterval(timer.ontick, 10);

//var reading = new timer(readfile, 1000, -1);
//var updating = new timer(updateframe, 70, -1);

var dostuff = setInterval(readfile, 1000);


function start() {
    readfile();
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");

    img.onload = function() {
        canvas.width = 480;
        canvas.height = 360;
        ctx.drawImage(img, 0, 0, 480, 360);
    };

    updateframe();
}

window.onload = start;