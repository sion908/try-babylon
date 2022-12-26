function main() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas);

    var createScene = function () {

        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
    
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero());
        // This targets the camera to scene origin
        // camera.setTarget(BABYLON.Vector3.Zero());
    
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
    
        const coordinates = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
        for (const [x, y] of coordinates) {
            var pl = new BABYLON.PointLight("pl", new BABYLON.Vector3(2*x, 1, 1*y), scene);
            pl.diffuse = new BABYLON.Vector3(0.5, 0.5, 0.5);
        }
    
        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var room = BABYLON.MeshBuilder.CreateBox("room", {size:3, width:5,height:2, sideOrientation:1}, scene);
        var room = BABYLON.MeshBuilder.CreateBox("desk", {size:0.5, width:1}, scene);
    
    
        // GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    
        var button = BABYLON.GUI.Button.CreateImageButton("but", "Click Me", "textures/grass.png");
        button.width = 0.2;
        button.height = "40px";
        button.color = "white";
        button.background = "green";
        button.left = 200;
        button.top = 300;
        advancedTexture.addControl(button);    
    
        return scene;
    
    };
    
    const scene = createScene();
    
    engine.runRenderLoop(() => {
      scene.render();
    });
    
    window.addEventListener('resize', () => {
      engine.resize();
    });
  }
  window.addEventListener('DOMContentLoaded', main);