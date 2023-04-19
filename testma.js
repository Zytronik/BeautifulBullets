var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = 120,
    y = 120,
    radius = 10,
    innerRadius = 0.000,
    radius = radius,
    gradient,
    lineGradient,
    step = 0.01,
    gradientPoints = [0, 1/3, 2/3, 3/3, 4/3, 5/3, 6/3, 7/3],
    mainColor = 'rgba(255, 0, 0, 1)',
    subColor = 'rgba(200, 123, 0, 0.3)',
    black = 'rgba(0, 0, 0, 0.5)',
    white = 'rgba(255, 255, 255, 0.5)',
    rotation = 0,
    rotationSteps = 0.01;


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let xRot = Math.cos(rotation) - Math.sin(rotation);
    let yRot = Math.sin(rotation) + Math.cos(rotation);
    lineGradient = ctx.createLinearGradient(x - radius * xRot, y - radius * yRot, x + radius * xRot, y + radius * yRot);
    lineGradient.addColorStop("0", white);
    lineGradient.addColorStop("1.0", black);
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.stroke();
    rotation += rotationSteps;

    ctx.beginPath();
    ctx.fillStyle = mainColor;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = subColor;
    ctx.arc(x + 13*radius, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    requestAnimationFrame(gameLoop);
}
gameLoop();
