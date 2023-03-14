const bossPosX = 225;
const bossPosY = 80;
let pointsPos = [];
let trajectory = [];
let points = 1;
let counter = 0;
let switcherino = true;
let translation;
let boolTrans = true;

function setup() {
  translation = 0;
  createCanvas(450, 600);
  background(220, 10);
  angleMode(DEGREES);
  // pattern1c();
  setInterval(consLog,250);
  setInterval(pattern1e,10)
  // setInterval(pattern1c,1000)
}

function draw() {
  background(220);
  frameRate(60);
  circle(bossPosX, bossPosY, 30);
  // circle(mouseX, mouseY, 30);
  // console.log(frameCount)
  // pattern3();
  // pattern2();
  // pattern4();
  // pattern5();
  // pattern6();
  // pattern7();
  pattern8();
  
  colorMode(RGB);
  // noLoop();
}

function pattern1a() {
  let borderWidth = 150;
  strokeWeight(5)
  counter += 0.5;
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

function pattern1b() {
  strokeWeight(5)
  counter += 0.5;
  for(let i = 0; i < points; i++) {
    pointsPos.push([10+translation, 10]);
    trajectory.push([0, 0, i, switcherino]); 
  }
  if(switcherino == true) {
    switcherino = false;
    translation = width-20;
  } else {
    switcherino = true;
    translation = 0;
  }
}

function pattern1c() {
  strokeWeight(5)
  counter += 0.5;
  for(let i = 0; i < points; i++) {
    pointsPos.push([bossPosX, bossPosY]);
    trajectory.push([0, 0, i, 0]); 
  }
}

function pattern1d() {
  strokeWeight(10)
  counter += 0.5;
  for(let i = 0; i < points; i++) {
    pointsPos.push([bossPosX+i-points/2, bossPosY]);
    trajectory.push([(mouseX-bossPosX)/70, (mouseY-bossPosY)/70, i, 0]); 
  }
}

function pattern1e() {
  strokeWeight(5)
  let steps = 10
  for(let i = 0; i < points; i++) {
    pointsPos.push([mouseX+i-points/2, mouseY]);
    trajectory.push([(translation-mouseX)/100, height/3/100, i, 0]); 
  }
  if(switcherino == true && translation <= width) {
    translation += steps;
  } else {
    switcherino = false;
  }
  if(switcherino == false && translation >= 0) {
    translation -= steps;
  } else {
    switcherino = true;
  }
}

function pattern2() {
  strokeWeight(5)
  // counter += 0.1;
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



// 2 swirls gegengleich
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
  counter = counter%360;
}

// 2 swirls gegengleich besser oval
function pattern4() {
  let border = 50;
  strokeWeight(5)
  counter = counter+0.01;
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
      trajectory[i][0] = sin(360/points*(trajectory[i][2]+counter))
      trajectory[i][1] = cos(360/points*(trajectory[i][2]+counter))/1.2
    } else {
      trajectory[i][0] = sin(360/points*(trajectory[i][2]-counter))/1.5
      trajectory[i][1] = cos(360/points*(trajectory[i][2]-counter))
    }
    // trajectory[i][0] = sin(360/pointsPos.length*i+i)
  }
  counter = counter%360;
}

//oval swirls not able to stand still counter+=0.5
function pattern4() {
  let border = 50;
  strokeWeight(5)
  // counter = counter+0.01;
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
      trajectory[i][0] = sin(360/points*(trajectory[i][2]+counter)+counter)
      trajectory[i][1] = cos(360/points*(trajectory[i][2]+counter)+counter)/1.2
    } else {
      trajectory[i][0] = sin(360/points*(trajectory[i][2]-counter)-counter)/1.5
      trajectory[i][1] = cos(360/points*(trajectory[i][2]-counter)-counter)
    }
    // trajectory[i][0] = sin(360/pointsPos.length*i+i)
  }
  counter = counter%360;
}

// spawning at corners & rain effect
function pattern5() {
  let border = 50;
  strokeWeight(5)
  // counter = counter+0.01;
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
      trajectory[i][0] = sin((70/points*trajectory[i][2]))*sin(counter*3%80)
      trajectory[i][1] = cos((70/points*trajectory[i][2]))*cos(counter*3%80)
    } else {
      trajectory[i][0] = -sin((70/points*trajectory[i][2]))*sin(counter*3%80)
      trajectory[i][1] = cos((70/points*trajectory[i][2]))*cos(counter*3%80)
    }
    // trajectory[i][0] = sin(360/pointsPos.length*i+i)
  }
  counter = counter%360;
}

// homing circle beam points = 5-10 1000ms
function pattern6() {
  let border = 50;
  // strokeWeight(5)
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

    let factor = 1.5;
    if(trajectory[i][3] <= 60) {
      trajectory[i][0] = sin(360/points*(trajectory[i][2]))/2
      trajectory[i][1] = cos(360/points*(trajectory[i][2]))/2+1
    } else {
      trajectory[i][0] = sin(360/points*(trajectory[i][2])+trajectory[i][3]*factor)+(mouseX-pointsPos[i][0])/160
      trajectory[i][1] = cos(360/points*(trajectory[i][2])+trajectory[i][3]*factor)+1
      // console.log(trajectory[i][0])
    }
    trajectory[i][3] += 1;

  }
  counter = counter%360;
}

// homing beam bo brrr points=1 100ms
function pattern7() {
  let border = 50;
  // strokeWeight(5)
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
  }
}

function pattern8() {
  let border = 50;
  // strokeWeight(5)
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
  }
}

function consLog() {
  // console.log(pointsPos.length);
}
