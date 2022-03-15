var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  loader: {
    crossOrigin: "anonymous"
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var text;

function preload() {
  this.load.image("map", "./assets/isomap.avif");
}

function create() {
  
  var cam = this.cameras.main;
  // cam.zoom = 2;
  var map = this.add.image(0, 0, "map").setOrigin(0, 0);

  cam.setBounds(0, 0, map.displayWidth, map.displayHeight);
  cam.setZoom(1);

  text = this.add
    .text(400, 300, "", {
      font: "16px monospace",
      fill: "#0ff",
      backgroundColor: "#000c",
      fixedWidth: 200,
      fixedHeight: 300
    })
    .setScale(1 / cam.zoom)
    .setScrollFactor(0);

  this.input.on("pointermove", function (p) {

    // this condition is when we want to traverse the map by hovering the pointer in that direction
    if (!p.isDown){
      //we can update the conditions with config.width and config.height(depending on size of screen)
      // I have divided in some conditions by 100 so that traversal seems smooth and slow

      if(p.x < 24 && p.y  < 10){
        cam.scrollX -= (p.x) / (cam.zoom);
        cam.scrollY -= (p.y) / (cam.zoom);
      }
      else if(p.x > 776 && p.y < 10){
        cam.scrollX += (p.x/100) / (cam.zoom);
        cam.scrollY -= (p.y) / (cam.zoom);
      }
      else if(p.x > 776 && p.y > 576){
        cam.scrollX += (p.x/100) / (cam.zoom);
        cam.scrollY += (p.y/100) / (cam.zoom);
      }
      else if(p.x < 24 && p.y > 576){
        cam.scrollX -= (p.x) / (cam.zoom);
        cam.scrollY += (p.y/100) / (cam.zoom);
      }
      else if(p.y < 10){
        cam.scrollY -= (p.y) / (cam.zoom);
        // cam.scrollY -= (p.y) / (cam.zoom);
      }
      else if(p.y > 590){
        cam.scrollY += (p.y/100) / (cam.zoom);
        // cam.scrollY -= (p.y) / (cam.zoom);
      }
      else if(p.x < 24){
        cam.scrollX -= (p.x) / (cam.zoom);
        // cam.scrollY -= (p.y) / (cam.zoom);
      }
      else if(p.x > 790){
        cam.scrollX += (p.x/100) / (cam.zoom);
        // cam.scrollY -= (p.y) / (cam.zoom);
      }
    }
    //this is for holding the click and dragging the cursor
    else{
      cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
      cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
  
    }
    // console.log(p.x, p.y);
    

    
  });
}

// showing coordinates
function update() {
  text.setText(
    JSON.stringify(
      this.input.activePointer,
      [
        "isDown",
        "downX",
        "downY",
        "worldX",
        "worldY",
        "x",
        "y",
        "position",
        "prevPosition"
      ],
      2
    )
  );
}

// document.getElementById("version").textContent = "Phaser v" + Phaser.VERSION;

var game = new Phaser.Game(config);