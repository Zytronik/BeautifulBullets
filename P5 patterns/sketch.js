const bossPosX = 225;
const bossPosY = 80;
let pointsPos = [];
let trajectory = [];
let points = 100;
let counter = 0;

function setup() {
  createCanvas(450, 600);
  background(220, 10);
  angleMode(DEGREES);
  pattern1();
  setInterval(pattern1,1000)
}

function draw() {
  background(220);
  circle(bossPosX, bossPosY, 30)
  colorMode(RGB);
  noLoop();
  pattern2();
}

function pattern1() {
  let borderWidth = 150;
  strokeWeight(5)
  for(let i = 0; i <= points; i++) {
    // pointsPos.push([(width-borderWidth*2)/points*i+borderWidth, sin(180/points*i)*20+100])
    pointsPos.push([bossPosX, bossPosY]);
    trajectory.push([sin(360/points*i), cos(360/points*i), i]);
    // trajectory[i][0] = sin(360/(pointsPos.length)%50*i-90);
    // trajectory[i][1] = cos(360/(pointsPos.length)%50*i-90);
    // point((width-borderWidth*2)/points*i+borderWidth, sin(180/points*i)*20+100);

  }
  
}

function pattern2() {
  strokeWeight(5)
  counter += 0.1;
  // console.log(pointsPos);
  for(let i = 0; i <= pointsPos.length-1; i++) {
    // console.log(pointsPos[i][0])
    point(pointsPos[i][0]+trajectory[i][0], pointsPos[i][1]+trajectory[i][1]);
    if (pointsPos[i][0] <= -50 || pointsPos[i][0] >= width+50 || pointsPos[i][1] <= -50 || pointsPos[i][1] >= height+50) {
      pointsPos.splice(i, 1);
      trajectory.splice(i, 1)
    } else {
      pointsPos[i][0] = pointsPos[i][0]+trajectory[i][0];
      pointsPos[i][1] = pointsPos[i][1]+trajectory[i][1];
      
      // trajectory[i][1] = cos(360/pointsPos.length%50*i)
      
    }
    if(trajectory[i][2]%2 == 1) {
      trajectory[i][0] = sin(360/points*trajectory[i][2]+counter)
      trajectory[i][1] = cos(360/points*trajectory[i][2]+counter)
    } else {
      trajectory[i][0] = sin(360/points*trajectory[i][2]-counter)
      trajectory[i][1] = cos(360/points*trajectory[i][2]-counter)

    }
    // trajectory[i][0] = sin(360/pointsPos.length*i+i)
  }
  counter%0.1;
}

function pattern3() {
  strokeWeight(5)
  counter += 0.1;
  // console.log(pointsPos);
  for(let i = 0; i <= pointsPos.length-1; i++) {
    // console.log(pointsPos[i][0])
    point(pointsPos[i][0]+trajectory[i][0], pointsPos[i][1]+trajectory[i][1]);
    if (pointsPos[i][0] <= -50 || pointsPos[i][0] >= width+50 || pointsPos[i][1] <= -50 || pointsPos[i][1] >= height+50) {
      pointsPos.splice(i, 1);
      trajectory.splice(i, 1)
    } else {
      pointsPos[i][0] = pointsPos[i][0]+trajectory[i][0];
      pointsPos[i][1] = pointsPos[i][1]+trajectory[i][1];
      
      // trajectory[i][1] = cos(360/pointsPos.length%50*i)
      
    }
    if(trajectory[i][2]%2 == 1) {
      trajectory[i][0] = sin(360/points*trajectory[i][2]+counter)
      trajectory[i][1] = cos(360/points*trajectory[i][2]+counter)
    } else {
      trajectory[i][0] = sin(360/points*trajectory[i][2]-counter)
      trajectory[i][1] = cos(360/points*trajectory[i][2]-counter)

    }
    // trajectory[i][0] = sin(360/pointsPos.length*i+i)
  }
  counter%0.1;
}
