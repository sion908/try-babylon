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

        for(var i=0;i<2;i++){
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.2, segments: 16}, scene);
            sphere.position.y = 0.1;
            sphere.position.x = i-0.5;
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.2, segments: 16}, scene);
            sphere.position.y = 1;
            sphere.position.x = i-0.5;
        }

        for(var i=0;i<2;i++){
            var cylinder = BABYLON.MeshBuilder.CreateCylinder("sphere", {diameter: 0.1, height:1.9, segments: 16}, scene);
            cylinder.position.y = -1;
            cylinder.position.z = -2;
            cylinder.position.x = i-0.5;
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.2, segments: 16}, scene);
            sphere.position.y = -2;
            sphere.position.z = -2;
            sphere.position.x = i-0.5;
        }
    
        // Our built-in 'ground' shape.
        const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", "./texs/ridge.png", {width:5, height :5, subdivisions: 10, maxHeight: 0.2});
        gradientMaterial = new BABYLON.GradientMaterial("grad", scene)
        gradientMaterial.topColor = new BABYLON.Color3(0.95703125,0.5,0.21484375);
        gradientMaterial.bottomColor = new BABYLON.Color3(0.55, 0.27, 0.18);
        gradientMaterial.backFaceCulling = false;
        gradientMaterial.alpha = 0.5;
        ground.material = gradientMaterial;
    
        // skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./texs/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

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