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
  
      var coordinates = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
      for (const [x, y] of coordinates) {
          var pl = new BABYLON.PointLight("pl", new BABYLON.Vector3(2*x, 0.5, 1*y), scene);
          pl.diffuse = new BABYLON.Vector3(0.1, 0.1, 0.1);
      }
  
      // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
      var room = BABYLON.MeshBuilder.CreateBox("room", {size:3, width:5,height:2, sideOrientation:1}, scene);
      var coordinates = [
          [0.5, 1.25, {width:1}], [1.5, 1.25, {width:1}],
          [2.25, 0.5, {depth:1}], [2.25, -0.5, {depth:1}],
          [1.5, -1.25, {width:1}], [0.5, -1.25, {width:1}],
          [0.75, 0, {depth:1}], [1.25, 0, {depth:1}]];
      for (const [x, y, opt] of coordinates) {
          opt['size'] = 0.5
          // opt['height'] = 1
          var room = BABYLON.MeshBuilder.CreateBox("desk", opt, scene);
          room.position = new BABYLON.Vector3(x, -0.75, y);
      }
      // var pillar = BABYLON.MeshBuilder.CreateBox('pillar', {size:0.5, height:2}, scene)
      // var pillar1 = BABYLON.MeshBuilder.CreateBox('pillar1', {size:0.5, height:2}, scene)
      // pillar1.position.x=-1.5
      const cylTable = BABYLON.MeshBuilder.CreateCylinder("cylTable", {diameter: 1.3, height: 1.2, tessellation: 16}, scene);
      cylTable.scaling=new BABYLON.Vector3(1.5, 0.5, 0.75);
      cylTable.position = new BABYLON.Vector3(-1.25, -0.75, 0.75);
  
      var door = BABYLON.MeshBuilder.CreateBox("door",{depth:0.05, height:1.5},scene)
      door.position = new BABYLON.Vector3(-1.5, -0.25, -1.475)
  
      // The first parameter can be used to specify which mesh to import. Here we import all meshes
      // const resultPromise = BABYLON.SceneLoader.ImportMeshAsync('', "https://sion908.github.io/try-babylon/model/", "fun.glb", scene);
      
      var duplicate = function(container, offset_x, offset_z) {
          let entries = container.instantiateModelsToScene();
  
          for (var node of entries.rootNodes) {
              if(!node.parent){
                  node.position.x = offset_x;
                  node.position.z = offset_z;
              }
          }
          for (var group of entries.animationGroups) {
              group.play(true);
          }
      }
      
      BABYLON.SceneLoader.LoadAssetContainer("https://sion908.github.io/try-babylon/model/", "fun.glb", scene, function (container) {
  
          for (var node of container.meshes) {
              if(!node.parent){
                  node.name="fan";
                  node.position.y = 0.85;
                  node.scaling=new BABYLON.Vector3(0.3,0.3,0.3);
                  console.log(node.rotation)
              }
          }
  
          duplicate(container,  1.0,  1.5);
          duplicate(container,  1.0, -1.5);
          duplicate(container,  2.5,    0);
          duplicate(container, -1.0,  1.5);
          duplicate(container, -1.0, -1.5);
          duplicate(container, -2.5,    0);
          
      });
    
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