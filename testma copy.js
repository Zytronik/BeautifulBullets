const app = new PIXI.Application({
    resizeTo: window,
    autoDensity: true,
    antialias: true,
    autoStart: false,
    backgroundColor: 0x333333,
    resolution: window.devicePixelRatio
  });
  document.body.appendChild(app.view);

const THE_BULLET = new PIXI.Graphics();
THE_BULLET.beginFill(0xDE3249);
THE_BULLET.drawCircle(0, 0, 3);
THE_BULLET.endFill();

let radius = 3;
let width = radius * 2;
let height = radius * 2;

const THE_BULLET_TEXTURE = PIXI.RenderTexture.create(width, height);
app.renderer.render(width, height, {
    THE_BULLET_TEXTURE,
    transform: new PIXI.Matrix(1, 0, 0, 1, width / 2, height / 2)
});
console.log("asf")
// Add a ticker callback to move the sprite back and forth
let bulletAmount = 1000
let t1, t2;
app.ticker.add((delta) => {
    console.log("delta", delta)
    t1 = performance.now()
    console.log(t1 - t2, "ms")
    for (let i = 0; i < bulletAmount; i++) {
        let x = Math.floor(Math.random() * 1240);
        let y = Math.floor(Math.random() * 800);
        THE_BULLET_TEXTURE.x = x;
        THE_BULLET_TEXTURE.y = y;
        app.stage.addChild(THE_BULLET_TEXTURE);
    }
    t2 = performance.now()
    // console.log(t2 - t1, "ms")
});

// var renderer = PIXI.autoDetectRenderer(480, 320, { antialias: true });
// document.body.appendChild(renderer.view);
// var stage = new PIXI.Container();

// // Render a circle to a texture
// var texture = new PIXI.RenderTexture(renderer, 16, 16);
// var graphics = new PIXI.Graphics();
// graphics.beginFill(0x44FFFF);
// graphics.drawCircle(8, 8, 8);
// graphics.endFill();
// texture.render(graphics);

// //Create some sprites
// for(var i=0; i<10; i++) {
//   var s = new PIXI.Sprite(texture);
//   s.position.x = Math.random() * renderer.width;
//   s.position.y = Math.random() * renderer.height;
//   stage.addChild(s);
// }
// renderer.render(stage);