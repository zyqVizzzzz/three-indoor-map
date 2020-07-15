import {
  AmbientLight,
  HemisphereLight,
  AxesHelper,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { store } from "index";

export default class Scaffold {
  public store = store;
  public scene = store.getState().scene;
  public camera = store.getState().camera;
  public renderer = store.getState().renderer;
  public orbit = store.getState().orbit;
  createLight() {
    let alight = new AmbientLight(0xffffff, 0.2);
    this.scene.add(alight);
    let hlight = new HemisphereLight(0xffffff, 0x000000, 0.9);
    this.scene.add(hlight);
  }
  createAxes() {
    let axesHelper = new AxesHelper(50);
    this.scene.add(axesHelper);
  }
  createOrbit() {
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
  }
}
