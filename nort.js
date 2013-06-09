var canvas = document.getElementById("nort");

var Cycle = function(p, color) {
  this.color = color;
  this.trailLen = 100;
  this.velocity = new p.PVector(1, 0);
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

  var blue = p.color(135, 255, 255);
  var orange = p.color(255, 238, 0);

  var cycles = [new Cycle(p, blue), new Cycle(p, orange)];

  p.draw = function() {
    p.background(0);
    for (var i = 0; i < cycles.length; ++i) {
      cycles[i].update();
      cycles[i].draw();
    }
  };



}

var p = new Processing(canvas, proc);