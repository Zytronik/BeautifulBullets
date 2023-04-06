const app = new PIXI.Application({
  resizeTo: window,
  autoDensity: true,
  antialias: true,
  autoStart: false,
  backgroundColor: 0x333333,
  resolution: window.devicePixelRatio
});
document.body.appendChild(app.view);

const templateShape = new PIXI.Graphics()
  .lineStyle({ width: 2, color: "rgba(0, 0, 0, 1)", alignment: 0 })
  .beginFill("FFFFFF00")
  .drawCircle(0, 0, 8)
  .lineStyle({ width: 2, color: "rgba(255, 255, 255, 1)", alignment: 0 })
  .beginFill("rgba(255, 70, 70, 0.6)")
  .drawCircle(0, 0, 6)

const { width, height } = templateShape;

// Draw the circle to the RenderTexture
const renderTexture = PIXI.RenderTexture.create({
  width,
  height,
  multisample: PIXI.MSAA_QUALITY.HIGH,
  resolution: window.devicePixelRatio
});
// With the existing renderer, render texture
// make sure to apply a transform Matrix
app.renderer.render(templateShape, {
  renderTexture,
  transform: new PIXI.Matrix(1, 0, 0, 1, width / 2, height / 2)
});

// Required for MSAA, WebGL 2 only
app.renderer.framebuffer.blit();

// Discard the original Graphics
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

  shape.tint = parseInt(Math.floor(Math.random() * 16777215).toString(16), 16);
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