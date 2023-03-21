const bossPosX = 333;
const bossPosY = 80;
let pointsPos = [];
let trajectory = [];
let points = 10;
let counter = 0;
let switcherino = true;
let translation;
let boolTrans = true;

function setup() {
  translation = 0;
  createCanvas(666, 1000);
  background(220);
  // angleMode(DEGREES);
  // pattern1h();
  setInterval(consLog,250);
  setInterval(pattern1a,1000)
  // setInterval(pattern1g,1000)
  noFill();
}

function draw() {
  background(220, 100);
  frameRate(60);
  stroke("blue");
  strokeWeight(5)
  circle(bossPosX, bossPosY, 30);
  // circle(mouseX, mouseY, 30);
  // console.log(frameCount)

  // pattern2();
  // pattern3();
  // pattern4();
  // pattern5();
  pattern6();
  // pattern7();
  // pattern8();
  // pattern9();
  // pattern10();
  // pattern11();
  
  colorMode(RGB);
  // noLoop();
}

function pattern1a() {
  let borderWidth = 150;
  strokeWeight(5)
  counter += 0.1;
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

// zigzag
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

//fireworks with random start flight speed (before Explosion)
function pattern1f() {
  strokeWeight(5)
  let random = Math.random();
  let random2 = Math.random();
  for(let i = 0; i < points; i++) {
    pointsPos.push([bossPosX, bossPosY]);
    trajectory.push([(random-0.5)*3, 1+random2, i, 0]); 
  }
}

//double (half) fireworks with random explosion timer + random speed (start)
function pattern1g() {
  strokeWeight(5)
  let random  = Math.random(),
      random2 = Math.random(),
      random3 = Math.random(),
      random4 = Math.random();
  const randomExplosionTimer = Math.random()*180+60;
  const randomExplosionTimer2 = Math.random()*180+60;
  for(let i = 0; i < points; i++) {
    if(i <= points/2) {
      pointsPos.push([bossPosX, bossPosY]);
      trajectory.push([(-random)*1.5, random3, i, 0, randomExplosionTimer]); 
    } else {
      pointsPos.push([bossPosX, bossPosY]);
      trajectory.push([(random2)*1.5, random4, i, 0, randomExplosionTimer2]); 
    }
  }
}


function pattern1h() {
  for(let i = 0; i < points; i++) {
      pointsPos.push([mouseX, mouseY]);
      trajectory.push([0, -20, i, 0, 0]); 
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

    let factor = 0.03;
    if(trajectory[i][3] <= 60) {
      trajectory[i][0] = sin(TWO_PI/points*(trajectory[i][2]))/2
      trajectory[i][1] = cos(TWO_PI/points*(trajectory[i][2]))/2+1
    } else {
      trajectory[i][0] = sin(TWO_PI/points*(trajectory[i][2])+trajectory[i][3]*factor)+(mouseX-pointsPos[i][0])/160
      trajectory[i][1] = cos(TWO_PI/points*(trajectory[i][2])+trajectory[i][3]*factor)+1      // console.log(trajectory[i][0])
    }
    trajectory[i][3] += 1;

  }
  counter = counter%360;
}

// homing beam bo brrr points=1 100ms
function pattern7() {
  let border = 50;
  strokeWeight(5)
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

//single fireworks
function pattern8() {
  let border = 50;
  strokeWeight(5)
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

    if (trajectory[i][3] <= 150) {
      noFill();
      strokeWeight(1);
      stroke("red");
      circle(pointsPos[i][0], pointsPos[i][1], (150-trajectory[i][3]));
    } else {
      strokeWeight(5);
      stroke("black");
      trajectory[i][0] = sin(360/points*(trajectory[i][2]+counter))
      trajectory[i][1] = cos(360/points*(trajectory[i][2]+counter))

    }

    trajectory[i][3] += 1;
  }
}

//half fireworks facing down, bit of randomness in the circle shape, 2 fireworks at the same time
function pattern9() {
  let border = 50;
  strokeWeight(5)
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

    if (trajectory[i][3] <= trajectory[i][4]) {
      noFill();
      strokeWeight(10);
      stroke("red");
      // circle(pointsPos[i][0], pointsPos[i][1], (150-trajectory[i][3]));
    } else {
      strokeWeight(5);
      stroke("black");
      trajectory[i][0] = sin(180/points*2*((trajectory[i][2]%(points/2))+counter)-90)
      trajectory[i][1] = cos(180/points*2*((trajectory[i][2]%(points/2))+counter)-90)

    }

    trajectory[i][3] += 1;
    if(Math.random() >= 0.5) {
      trajectory[i][3] += 1;
    }
  }
}

//challenger shooting 
function pattern10() {
  let border = 50;
  strokeWeight(5);
  stroke("black");
  for(let i = 0; i <= pointsPos.length-1; i++) {
    // console.log(pointsPos[i][0])
    point(pointsPos[i][0]+trajectory[i][0], pointsPos[i][1]+trajectory[i][1]);
    if (pointsPos[i][0] <= -border || pointsPos[i][0] >= width+border || pointsPos[i][1] <= -border || pointsPos[i][1] >= 2*height+border) {
      pointsPos.splice(i, 1);
      trajectory.splice(i, 1)
    } else {
      pointsPos[i][0] = pointsPos[i][0]+trajectory[i][0];
      pointsPos[i][1] = pointsPos[i][1]+trajectory[i][1];      
    }

    
    let angle = Math.atan2(bossPosY-pointsPos[i][1], bossPosX-pointsPos[i][0]),
        maxSpeed = 0.5,
        homingForce = 2;
    trajectory[i][0] += Math.cos(angle)*(maxSpeed*(homingForce+(homingForce/4)));
    trajectory[i][1] += Math.sin(angle)*(maxSpeed*(homingForce))/3;
  }
}


function pattern11() {
  let border = 50,
      c = PI/8,
      angle = 0;
  strokeWeight(5);
  stroke("black");
  for(let i = 0; i <= pointsPos.length-1; i++) {
    // console.log(pointsPos[i][0])
    point(pointsPos[i][0]+trajectory[i][0], pointsPos[i][1]+trajectory[i][1]);
    if (pointsPos[i][0] <= -border || pointsPos[i][0] >= width+border || pointsPos[i][1] <= -border || pointsPos[i][1] >= 2*height+border) {
      pointsPos.splice(i, 1);
      trajectory.splice(i, 1)
    } else {
      pointsPos[i][0] = pointsPos[i][0]+trajectory[i][0];
      pointsPos[i][1] = pointsPos[i][1]+trajectory[i][1];      
    }
    if (trajectory[i] == undefined) {
      break;
    }
    trajectory[i][0] = sin(c/(points-1)*trajectory[i][2]+PI-c/2)*10+trajectory[i][3];
    trajectory[i][1] = cos(c/(points-1)*trajectory[i][2]+PI-c/2)-20+trajectory[i][4]

    // if (points/2 > trajectory[i][2]) {
      angle = Math.atan2(bossPosY-pointsPos[i][1], bossPosX-pointsPos[i][0])-c/(points-1)*(trajectory[i][2])
    // } else if (points/2 == trajectory[i][2]) {
    //   angle = Math.atan2(bossPosY-pointsPos[i][1], bossPosX-pointsPos[i][0])
    // } else {
    //   angle = Math.atan2(bossPosY-pointsPos[i][1], bossPosX-pointsPos[i][0])-c/(points-1)*(trajectory[i][2])
    // }
    let maxSpeed = 0.5,
        homingForce = 2;
    trajectory[i][3] += Math.cos(angle+c/(points-1)*trajectory[i][2])*(maxSpeed*(homingForce+(homingForce/4)));
    trajectory[i][4] += Math.sin(angle+c/(points-1)*trajectory[i][2])*(maxSpeed*(homingForce))/3;
  }
}

function consLog() {
  // console.log(pointsPos.length);
}
