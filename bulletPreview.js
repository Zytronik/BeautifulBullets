const app = new PIXI.Application({
  resizeTo: window,
  autoDensity: true,
  antialias: true,
  autoStart: false,
  backgroundColor: 0x333333,
  resolution: window.devicePixelRatio
});
document.body.appendChild(app.view);

export const textureProperties = {
  radius: 17,
  mainColor: "f71313",
  outerBorderColor: "fc8888",
  outerBorderWidth: "3",
  innerBorderColor: "7f1616",
  innerborderWidth: "5",
}

let radius = textureProperties.radius;
let bOuterWidth = textureProperties.outerBorderWidth;
let bOuterColor = textureProperties.outerBorderColor;
let bInnerBWidth = textureProperties.innerborderWidth;
let bInnerColor = textureProperties.innerBorderColor;
const templateShape = new PIXI.Graphics()
  .lineStyle({ width: bOuterWidth, color: bOuterColor, alignment: 1 })
  .beginFill("FFFFFF00")
  .drawCircle(0, 0, radius - bOuterWidth)
  .lineStyle({ width: bInnerBWidth, color: bInnerColor, alignment: 1 })
  .beginFill(textureProperties.mainColor)
  .drawCircle(0, 0, (radius - bOuterWidth) - bInnerBWidth);

const { width, height } = templateShape;

const renderTexture = PIXI.RenderTexture.create({
  width,
  height,
  multisample: PIXI.MSAA_QUALITY.HIGH,
  resolution: window.devicePixelRatio
});
app.renderer.render(templateShape, {
  renderTexture,
  transform: new PIXI.Matrix(1, 0, 0, 1, width / 2, height / 2)
});

app.renderer.framebuffer.blit();

templateShape.destroy(true);

class Shape extends PIXI.Sprite {
  constructor(texture) {
    super(texture);
    this.speed = 0;
  }
}

const shapes = [];
for (let i = 0; i < 10000; i++) {
  const shape = new Shape(renderTexture);
  shapes[i] = shape;

  shape.anchor.set(0.5);
  shape.speed = 1 + Math.random() * 1.2;
  shape.position.x = app.screen.width * Math.random();
  shape.position.y = app.screen.height * Math.random();
}

const container = new PIXI.Container();
app.stage.addChild(...shapes);

const text = new PIXI.Text("", {
  fill: "white",
  fontWeight: "bold",
  fontSize: 16
});
text.position.set(10);
app.stage.addChild(text);

const redraw = () => {
  let startTime = performance.now();
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    shape.position.x += shape.speed;
    if (shape.position.x > app.screen.width + width) {
      shape.position.x -= app.screen.width + width + width;
    }
  }
  text.text =
    "Prepared: " +
    Math.round(performance.now() - startTime) +
    "ms, Points: n/a";
  app.render();

  requestAnimationFrame(redraw);
};

requestAnimationFrame(redraw);