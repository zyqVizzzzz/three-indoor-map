import React, { useEffect, useCallback } from "react";
import { MapState, useMappedState } from "reducers/Store";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import MapLoader from "map/MapLoader";
import Scaffold from "objects/Scaffold";
import { getChildByName } from "utils/Common";
import { CommonThemes } from "utils/Themes";

const mapUrl = "./data/map1.json";
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var raycasterList: any = [];

function Map() {
  let controls: OrbitControls;
  const {
    camera: cameraThemes,
    scene: sceneThemes,
    renderer: rendererThemes,
  } = CommonThemes;

  const { scene, camera, renderer } = useMappedState(
    useCallback(
      (state: MapState) => {
        const { x, y, z } = cameraThemes.position;
        const { width, height, container } = sceneThemes;
        const { clearColor } = rendererThemes;
        const scene = state.scene;
        const camera = state.camera;
        const renderer = state.renderer;

        camera.position.set(x, y, z);
        renderer.setSize(width, height);
        renderer.setClearColor(clearColor);
        container.appendChild(renderer.domElement);

        return { scene, camera, renderer };
      },
      [sceneThemes, cameraThemes, rendererThemes]
    )
  );

  useEffect(() => {
    _init();
  });

  const _init = () => {
    loadMap(mapUrl);
    createScaffold();
    createControls();
    createListeners();
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
  };

  const loadMap = (fileName: string) => {
    const loader = new MapLoader();
    loader.load(fileName, (mall) => {
      scene.add(mall.root);
      scene.userData.mall = mall;
      mall.showAllFloors();
      raycasterList = getChildByName(mall.root, "floor");
    });
  };

  const createControls = () => {
    controls = new OrbitControls(camera, renderer.domElement);
  };

  const createScaffold = () => {
    Scaffold.createLight(scene);
  };

  const createListeners = () => {
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClickFloor);
  };

  const resize = () => {
    const { width, height } = sceneThemes;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const onClickFloor = (event: any) => {
    const { container } = sceneThemes;
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    if (raycasterList.length) {
      let intersects = raycaster.intersectObjects(raycasterList);
      if (intersects.length) {
        // (intersects[0].object as THREE.Mesh).material
      }
    }
  };

  return <div id="canvas" />;
}

export default Map;
