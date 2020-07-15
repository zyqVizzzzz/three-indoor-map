import React, { useEffect, useCallback } from "react";
import { MapState, useMappedState } from "reducers/Store";
import * as THREE from "three";
import MapLoader from "map/MapLoader";
import Scaffold from "objects/Scaffold";
import { getChildByName } from "utils/Common";
import { CommonThemes } from "utils/Themes";

const mapUrl = "./data/map1.json";
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let raycasterList: any = [];

function Map() {
  const {
    camera: cameraThemes,
    scene: sceneThemes,
    renderer: rendererThemes,
  } = CommonThemes;

  const { scene, camera, renderer, orbit } = useMappedState(
    useCallback(
      (state: MapState) => {
        const { x, y, z } = cameraThemes.position;
        const { width, height, container } = sceneThemes;
        const { clearColor } = rendererThemes;
        const scene = state.scene;
        const camera = state.camera;
        const renderer = state.renderer;
        const orbit = state.orbit;

        camera.position.set(x, y, z);
        renderer.setSize(width, height);
        renderer.setClearColor(clearColor);
        container.appendChild(renderer.domElement);

        return { scene, camera, renderer, orbit };
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
    createListeners();
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    orbit && orbit.update();
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

  const createScaffold = () => {
    const scaffold = new Scaffold();
    scaffold.createLight();
    scaffold.createAxes();
    scaffold.createOrbit();
  };

  const createListeners = () => {
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClickFloor);
  };

  const resize = () => {
    const { width, height } = sceneThemes;
    camera.aspect = window.innerWidth / window.innerHeight;
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
        switchFloor(intersects)
      }
    }
  };

  const switchFloor = (intersects: Array<any>) => {
    //@ts-ignore
    scene.getObjectByName("mall").children.forEach((item: any) => {
      if (
        item.userData._id !== (intersects[0].object as any).parent.userData._id
      ) {
        item.visible = false;
      } else {
        item.visible = true;
      }
    });
  };

  return <div id="canvas" />;
}

export default Map;
