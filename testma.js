var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = 120,
    y = 120,
    radius = 10,
    innerRadius = 0.000,
    outerRadius = radius,
    gradient,
    lineGradient,
    step = 0.01,
    gradientPoints = [0, 1/3, 2/3, 3/3, 4/3, 5/3, 6/3, 7/3],
    mainColor = 'rgba(255, 0, 0, 1)',
    subColor = 'rgba(200, 123, 0, 0.3)',
    black = 'rgba(0, 0, 0, 0.5)',
    white = 'rgba(255, 255, 255, 0.5)',
    rotation = 0,
    rotationSteps = 0.1;


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);

    for (let i = 0; i < gradientPoints.length; i++) {
        let point = gradientPoints[i];
        point = (point + step > 8/3) ? point + step - (8/3) : point + step;
        let colorSelection = (Math.floor(i / 2) % 2) === 0;
        if (point <= 1 && colorSelection) {
            gradient.addColorStop(point, subColor);
        } else if (point <= 1 && !colorSelection) {
            gradient.addColorStop(point, mainColor);
        }
        gradientPoints[i] = point;
    }

    let amountBelowOne = 0;
    let subArray = []
    gradientPoints.forEach(point => {
        if (point > 1) {
            subArray.push(point);
        } else {
            amountBelowOne++;
        }
    });
    let firstNumberAboveOneIndex = gradientPoints.indexOf(Math.min(...subArray))

    let colorSelection = (Math.floor(firstNumberAboveOneIndex / 2) % 2) === 0;
    if (amountBelowOne === 3) {
        if (colorSelection) {
            gradient.addColorStop(1, subColor);
        } else {
            gradient.addColorStop(1, mainColor);
        }
    }

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    let xRot = Math.cos(rotation) - Math.sin(rotation);
    let yRot = Math.sin(rotation) + Math.cos(rotation);
    lineGradient = ctx.createLinearGradient(x - radius * xRot, y - radius * yRot, x + radius * xRot, y + radius * yRot);
    lineGradient.addColorStop("0", white);
    lineGradient.addColorStop("1.0", black);
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 1;
    ctx.stroke();
    rotation += rotationSteps;

    requestAnimationFrame(gameLoop);
}
gameLoop();
