import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import IndoorMapLoader from "utils/IndoorMapLoader";
import Scaffold from "objects/Scaffold"

const mapUrl = './data/map1.json'

function Map() {
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  const container: HTMLElement = document.body;
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

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

    loadMap(mapUrl);
    animate();
    makeScaffold();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  const loadMap = (fileName: string) => {
    var loader = new IndoorMapLoader();
    loader.load(fileName, (mall) => {
      scene.add(mall.root);
      scene.userData.mall = mall;
      renderer.setClearColor("#F2F2F2");
      mall.showAllFloors();
    });
  };

  const makeScaffold = () => {
    Scaffold.createLight(scene);
  }

  const resize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  return <div id="canvas" />;
}

export default Map;
