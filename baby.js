function main() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas);
    // ここから
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
    
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    
        // Our built-in 'sphere' shape.
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;
    
        for(var i=0;i<3;i++){
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.2, segments: 16}, scene);
            sphere.position.y = -1;
            sphere.position.x = i-1;
            
        }
    
        // Our built-in 'ground' shape.
        const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", "./img/ridge.png", {width:5, height :5, subdivisions: 10, maxHeight: 1});
    
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