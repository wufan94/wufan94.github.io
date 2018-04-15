function setup() {
  createCanvas(1500,500);
}

function draw() {
    background(0);
  for (var x=50;x<width-50;x+=20){
    for(var y=50;y<height-50;y+=20){
      noStroke();
      fill(255,0,100,200);
      ellipse(x,y,10,10);
      strokeWeight(0.4);
      stroke(0,255,200,100);
      line(mouseX,mouseY,x,y);
    }
  }
}