const app = new PIXI.Application({ background: '#1099bb', resizeTo: document.body });
document.body.appendChild(app.view);

const manifest = {
  bundles: [
    {
      name: 'background',
      assets: [
        {
          name: 'bg',
          srcs: 'img/bg.jpg',
        },
      ],
    },
    {
      name: 'clouds',
      assets: [
        {
          name: 'cloud1',
          srcs: 'img/cloud1.png',
        },
        {
          name: 'cloud2',
          srcs: 'img/cloud2.png',
        },
        {
          name: 'cloud3',
          srcs: 'img/cloud3.png',
        },
        {
          name: 'cloud4',
          srcs: 'img/cloud4.png',
        },
        {
          name: 'cloud5',
          srcs: 'img/cloud5.png',
        },
      ],
    },
  ]
};

await PIXI.Assets.init({ manifest });

let background = await PIXI.Assets.loadBundle('background');
let clouds = await PIXI.Assets.loadBundle('clouds');

let cloudsArray = [];

var numberOfClouds = Object.keys(clouds).length;

let bg1 = PIXI.Sprite.from(background.bg);
let bg2 = PIXI.Sprite.from(background.bg);
let aspectRatio = bg1.width / bg1.height;

bg1.height = app.screen.height;
bg1.width = app.screen.height * aspectRatio;

bg2.height = bg1.height;
bg2.width = bg1.width;

bg1.x = 0;
bg1.y = 0;
bg2.x = 0;
bg2.y = bg1.y - bg1.height;

app.stage.addChild(bg1);
app.stage.addChild(bg2);

let filter = new PIXI.Filter(null,
  "precision mediump float;"+

  "varying vec2 vTextureCoord;"+
  "varying vec4 vColor;"+
  
  "uniform sampler2D uSampler;"+
  "uniform float customUniformY;"+
  "uniform float customUniformX;"+
  
  "void main(void)"+
  "{"+
     "vec2 uvs = vTextureCoord.xy;"+
     /* "uvs.y = (uvs.y + sin(customUniformY)) / 2.0;"+ */
     "vec4 fg = texture2D(uSampler, vTextureCoord);"+
     /* "fg.r = (uvs.x + sin(customUniformX)) / 2.0;"+ */
     "fg.r = -uvs.y + sin(customUniformY);"+
     "gl_FragColor = fg;"+
  "}", {
  customUniformY: 0.0,
  customUniformX: 0.0
});

app.stage.filters = [filter];

let counter = 1600;

app.ticker.add((delta) => {
  if (bg1.y < app.screen.height) {
    bg1.y = bg1.y + 0.8;
    bg2.y = bg1.y - bg1.height;
  } else {
    let temp = bg2;
    bg2 = bg1;
    bg1 = temp;
  }
console.log(delta);
  filter.uniforms.customUniformY += Math.random() * 0.01;
  filter.uniforms.customUniformX += Math.random() * 0.01;

  if (counter >= Math.floor(Math.random() * 1400) + 1000) {
    console.log("new cloud");
    counter = 0;
    let randomCloudIndex = Math.floor(Math.random() * numberOfClouds);
    let cloud = new PIXI.Sprite;
    cloud.texture = Object.values(clouds)[randomCloudIndex];
    let aspectRatioCloud = cloud.height / cloud.width;
    let width = Math.random() * app.screen.width / 1.2 + app.screen.width / 3;
    cloud.height = width * aspectRatioCloud;
    cloud.width = width;
    cloud.x = 0 - cloud.width / 2 + Math.random() * app.screen.width;
    cloud.y = 0 - cloud.height;
    cloudsArray.push(cloud);
    app.stage.addChild(cloud);
  }
  
  cloudsArray.forEach((c)=>{
    c.y = c.y + Math.random() * 0.5 + 0.1;
    if(c.y > app.screen.height){
      cloudsArray.splice(getIndexInCloudsArray(c), 1);
    }
  });
  counter++;
});

function getBoundsID(obj){
  return obj._boundsID;
}

function getIndexInCloudsArray(obj){
  let r = false;
  cloudsArray.forEach((c, i)=>{
    if(getBoundsID(c) === getBoundsID(obj)){
      r = i;
    }
  });
  return r;
}