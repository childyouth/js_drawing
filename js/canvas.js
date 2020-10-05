window.onload = function(){
    var canvas = document.getElementById("canvas");
    var width = canvas.width;
    var height = canvas.height;
    var json = initjson(width,height);
    var gunimg = new Image();
    gunimg.src = "gun.png";
    console.log(JSON.stringify(json))
    draw(canvas,gunimg,json);

    for(var i = 0;i<10;i++){
        json = makeOutput(json);
    }
}
function draw(canvas,gunimg,json){

    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(0,0,width,height);
    gunimg.onload = function(){
        ctx.drawImage(gunimg, width-100,height/2-50,100,100);
        drawcircle(ctx,width-100,height/2,10,2)
        for(var i = 0;i<json.ballooninfo.hitnum;i++){
            drawcircle(ctx,json.ballooninfo.hit[i].x,json.ballooninfo.hit[i].y,20,true);
        }
        for(var i = 0;i<json.ballooninfo.num - json.ballooninfo.hitnum ;i++){
            drawcircle(ctx,json.ballooninfo.alive[i].x,json.ballooninfo.alive[i].y,20,false);
        }
        ctx.beginPath();
        ctx.moveTo(width-100,height/2);
        ctx.lineTo(0,height/2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red"
        ctx.stroke();
        ctx.closePath();
    }

}

function drawcircle(ctx, x, y, radius, hit){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    if(!hit)
        ctx.fillStyle = "#00FFF0";
    else
        ctx.fillStyle = "#FF0000";
    if(hit == 2)
        ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();
}

function drawrect(ctx, x, y, angle){
    var radian = angle * Math.PI / 180;
    ctx.save();
    ctx.beginPath();
    ctx.rotate()
    ctx.closePath();
    ctx.restore();
}


function initjson(width,height){
    var json = {}
    json.ballooninfo = {}
    json.ballooninfo.num = 10;
    json.ballooninfo.hitnum = 0;
    json.ballooninfo.hit = []
    json.ballooninfo.alive = []
    json.plateinfo = {}
    json.plateinfo.num = 0;
    json.plateinfo.plate = []

    for(var i = 0;i<json.ballooninfo.num;i++){
        json.ballooninfo.alive.push({x:randomInt(width),y:randomInt(height)})
    }

    return json;
}

function makeOutput(json){
    
}

function randomInt(limit){
    return Math.floor(Math.random()*limit);
}