function main() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas);
    // ここから
    const addLabel = (sphere,tag)=>{
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.idealWidth = 500;

        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.15;
        rect1.height = "20px";
        rect1.cornerRadius = 20;
        // rect1.color = "Orange";
        // rect1.thickness = 4;
        rect1.background = "green";
        advancedTexture.addControl(rect1);
        rect1.linkWithMesh(sphere);   
        rect1.linkOffsetY = -30;
        rect1.alpha = 0.5;
        rect1.isVisible = false;

        var label = new BABYLON.GUI.TextBlock();
        label.text = tag;
        rect1.addControl(label);

        var target = new BABYLON.GUI.Ellipse();
        target.width = "10px";
        target.height = "10px";
        // target.color = "Orange";
        // target.thickness = 4;
        target.background = "green";
        advancedTexture.addControl(target);
        target.linkWithMesh(sphere);   

        var line = new BABYLON.GUI.Line();
        line.lineWidth = 2;
        line.color = "Orange";
        line.y2 = 10;
        line.linkOffsetY = -5;
        advancedTexture.addControl(line);
        line.linkWithMesh(sphere); 
        line.connectedControl = rect1;
    
        sphere.pointerDownObservable.add(function() {
            // show the rectangle
            was_visible = rect1.isVisible;
            rect1.isVisible = !was_visible;
        });
    }
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

        for(var j=0;j<2;j++){
            for(var i=0;i<2;i++){
                var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.2, segments: 16, updatable: true}, scene);
                sphere.position.z = (j-0.5)*2;
                sphere.position.y = 0.1;
                sphere.position.x = (i-0.5)*2;
                addLabel(sphere,`temp-g${j*2+i}`)
                var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.2, segments: 16, updatable: true}, scene);
                sphere.position.z = (j-0.5)*2;
                sphere.position.y = 1;
                sphere.position.x = (i-0.5)*2;
                addLabel(sphere,`temp-a${j*2+i}`)
            }
        }

        for(var i=0;i<2;i++){
            var cylinder = BABYLON.MeshBuilder.CreateCylinder("sphere", {diameter: 0.05, height:1.9, segments: 16}, scene);
            cylinder.position.y = -1;
            cylinder.position.z = -2;
            cylinder.position.x = i-0.5;
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.2, segments: 16, updatable: true}, scene);
            sphere.position.y = -2;
            sphere.position.z = -2;
            sphere.position.x = i-0.5;
            addLabel(sphere, `water-${i}`)
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

        // .pointerDownObservable.add(function(mesh) {
        //     // show tag of clicked object
        //     alert(mesh.tags);
        // });

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