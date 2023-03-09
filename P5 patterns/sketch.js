const bossPosX = 225;
const bossPosY = 80;
let pointsPos = [];
let trajectory = [];
let points = 50;
let counter = 0.2;
let switcherino = true;
let translation;
let boolTrans = true;

function setup() {
  translation = 0;
  createCanvas(450, 600);
  background(220, 10);
  angleMode(DEGREES);
  pattern1();
  setInterval(consLog,250);
  setInterval(pattern1,500)
}

function draw() {
  background(220);
  circle(bossPosX+translation, bossPosY, 30);
  // circle(mouseX, mouseY, 30);
  // pattern2();
  pattern3();
  
  colorMode(RGB);
  // noLoop();
}

function pattern1() {
  let borderWidth = 150;
  strokeWeight(5)
  for(let i = 0; i < points; i++) {
    // pointsPos.push([(width-borderWidth*2)/points*i+borderWidth, sin(180/points*i)*20+100])
    pointsPos.push([bossPosX+translation, bossPosY]);
    // pointsPos.push([mouseX, mouseY]);
    trajectory.push([sin(360/(points+1)*i), cos(360/(points+1)*i), i, switcherino]);
    // trajectory[i][0] = sin(360/(pointsPos.length)%50*i-90);
    // trajectory[i][1] = cos(360/(pointsPos.length)%50*i-90);
    // point((width-borderWidth*2)/points*i+borderWidth, sin(180/points*i)*20+100);
    
  }
  if(switcherino == true) {
    switcherino = false;
  } else {
    switcherino = true;
  }

  // let steps = 10;
  // if (boolTrans == true) {
  //   translation += steps;
  // } else {
  //   translation -= steps
  // }

  // if(translation >= 100) {
  //   boolTrans = false;
  //   // console.log(boolTrans)
  // } else if (translation <= -100) {
  //   boolTrans = true;
  // }
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
  let border = 50;
  strokeWeight(5)
  counter += 0.1;
  // console.log(pointsPos);
  for(let i = 0; i <= pointsPos.length-1; i++) {
    // console.log(pointsPos[i][0])
    point(pointsPos[i][0]+trajectory[i][0], pointsPos[i][1]+trajectory[i][1]);
    if (pointsPos[i][0] <= -border || pointsPos[i][0] >= width+border || pointsPos[i][1] <= -border || pointsPos[i][1] >= height+border) {
      pointsPos.splice(i, 1);
      trajectory.splice(i, 1)
    } else {
      pointsPos[i][0] = pointsPos[i][0]+trajectory[i][0];
      pointsPos[i][1] = pointsPos[i][1]+trajectory[i][1];      
    }
    // console.log(trajectory.length, i);

    if(trajectory[i][3] == true) {
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

function pattern4() {
  
}

function consLog() {
  console.log(pointsPos.length);
}
