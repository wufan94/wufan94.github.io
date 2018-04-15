var speed=3;
var x=0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(204);
  fill(0,250,200);
  noStroke();
  ellipse(x,100,50,50);
  
  //第一种方法，让圆来回走
  
  /*
  if(x>width-25){
    speed=-8;
  }
  else if(x<=25){
    speed=3
  }
  x=x+speed;
  */
  
   //第二种方法，让圆来回走 
  
  if (x>width||x<0){
    speed=speed * -1;
  }
  
  x=x+speed;
}