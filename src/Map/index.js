import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import IndoorMapLoader from "../Utils/IndoorMapLoader";

function Map() {
  let scene = null;
  let camera = null;
  let renderer = null;
  let controls = null;
  const container = document.body;
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    _init();
  });

  const _init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      25,
      width / height,
      0.1,
      2000
    );
    camera.position.set(360, 250, 700);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    controls = new OrbitControls(camera, renderer.domElement);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', resize, false)

    loadMap("./data/map1.json");
    createLight();
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  const loadMap = (fileName) => {
    var loader = new IndoorMapLoader(true);
    loader.load(fileName, function (mall) {
      scene.add(mall.root);
      scene.mall = mall;
      renderer.setClearColor("#F2F2F2");
      mall.showAllFloors();
    });
  };

  //set up the lights
  const createLight = () => {
    let light = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(light);
    light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9);
    scene.add(light);
  };

  const resize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    controls.viewChanged = true;
  };

  return <div id="canvas" />;
}

export default Map;
