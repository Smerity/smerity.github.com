(function() {
  var N, context, cvs, plot, render, serp;

  cvs = document.getElementById("display");

  context = cvs.getContext('2d');

  N = cvs.width;

  serp = function(x, y, dist, depth, maxDepth) {
    var d2, fd2;
    if (depth == null) depth = 0;
    if (depth > maxDepth) return;
    fd2 = dist / 2;
    d2 = Math.round(fd2);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + dist, y + dist);
    context.lineTo(x - dist, y + dist);
    context.closePath();
    context.stroke();
    serp(x, y, fd2, depth + 1, maxDepth);
    serp(x + d2, y + d2, fd2, depth + 1, maxDepth);
    return serp(x - d2, y + d2, fd2, depth + 1, maxDepth);
  };

  plot = function(mD) {
    var maxDepth;
    return serp(N / 2, 0, N / 2, 0, maxDepth = mD);
  };

  render = function(depth) {
    var f, newDepth;
    context.clearRect(0, 0, N, N);
    plot(depth);
    newDepth = depth < 7 ? depth + 1 : 0;
    f = function() {
      return render(newDepth);
    };
    return setTimeout(f, 400);
  };

  render(0);

}).call(this);
