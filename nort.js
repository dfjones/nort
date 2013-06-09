var canvas = document.getElementById("nort");

var left = 0;
var right = 180;
var up = 90;
var down = 270;

var Cycle = function(p, image, color) {
  this.image = image;
  this.iRot = p.radians(right);
  this.iYO = 8;
  this.color = color;
  this.trailLen = 200;
  this.velocity = new p.PVector(2, 0);
  this.pos = new p.PVector(
    p.floor(p.random(p.width)),
    p.floor(p.random(p.height)));
  // list of vectors

  this.vertices = [new p.PVector(this.pos.x, this.pos.y), this.pos];

  this.draw = function() {
    p.noFill();
    p.stroke(this.color);
    p.strokeWeight(10.0);
    p.strokeJoin(p.ROUND);
    p.beginShape();
    for (var i = 0; i < this.vertices.length; ++i) {
      var v = this.vertices[i];
      p.vertex(v.x, v.y);
    }
    p.endShape();
    var v = this.vertices[this.vertices.length-1];
    p.pushMatrix();
    p.translate(v.x, v.y);
    p.rotate(this.iRot);
    p.image(this.image, -15, -8);
    p.popMatrix();
  };

  this.update = function() {
    var v = this.vertices[this.vertices.length-1];
    v.add(this.velocity);

    var len = this.length();
    if (len > this.trailLen) {
      var t = this.vertices[0];
      t.add(this.velocity);
    }
  };

  this.length = function() {
    // calculate the manhattan distance along vertices
    var len = 0;
    var a = this.vertices[0];
    for (var i = 1; i < this.vertices.length; ++i) {
      var v = this.vertices[i];
      var dist = p.PVector.dist(v, a);
      len += dist;
    }
    return len;
  };
};

function proc(p) {
  p.size(window.innerWidth, window.innerHeight);
  p.background(0);

  var blueImg = p.loadImage("blue.jpg");
  var orangeImg = p.loadImage("orange.jpg");
  var blue = p.color(36, 146, 255);
  var orange = p.color(255, 219, 0);

  var cycles = [
    new Cycle(p, blueImg, blue), 
    new Cycle(p, orangeImg, orange)
  ];

  p.draw = function() {
    p.background(0);
    for (var i = 0; i < cycles.length; ++i) {
      cycles[i].update();
      cycles[i].draw();
    }
  };



}

var p = new Processing(canvas, proc);